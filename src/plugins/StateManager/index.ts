import type { IBotPlugin } from '@plugins/typings';
import type { IBot } from '@bot/typings';
import type { CallbackQuery } from '@typings/CallbackQuery';
import type { Message } from '@typings/Message';

import { StateStorage } from './StateStorage';
import type { IStateObject, StateType } from './typings';

export class StateManager<State extends StateType> implements IBotPlugin {
    public readonly stateStorage = new StateStorage<State>();
    protected readonly stateList: Partial<Record<State['step'], IStateObject<State>>> = {};

    public constructor() {
        this.handleMessage = this.handleMessage.bind(this);
        this.handleCallbackQuery = this.handleCallbackQuery.bind(this);
    }

    protected async handleMessage(bot: IBot, message: Message): Promise<void> {
        const chat_id = message.chat.id;
        const state = this.stateStorage.getById(chat_id);
        const step = state.step as State['step'];

        const stepObject = this.stateList[step];

        if (!stepObject || !stepObject.handleMessage) return;

        const newState = await stepObject.handleMessage(message, state);
        this.stateStorage.setById(chat_id, newState);

        const newStep = newState.step as State['step'];
        const newStepObject = this.stateList[newStep];

        if (!newStepObject) return;

        if (newStepObject.afterMessage) {
            await newStepObject.afterMessage({
                state: newState,
                message,
                setState: (state: State) => this.stateStorage.setById(chat_id, state),
            });
        }
    }

    public async handleCallbackQuery(bot: IBot, query: CallbackQuery): Promise<void> {
        const chat_id = query.from.id;
        const state = this.stateStorage.getById(chat_id);
        const step = state.step as State['step'];

        const stepObject = this.stateList[step];

        if (!stepObject || !stepObject.handleCallbackQuery) return;

        const newState = await stepObject.handleCallbackQuery(query, state);
        this.stateStorage.setById(chat_id, newState);

        const newStep = newState.step as State['step'];
        const newStepObject = this.stateList[newStep];

        if (!newStepObject) return;

        if (newStepObject.afterCallbackQuery) {
            await newStepObject.afterCallbackQuery({
                state: newState,
                query,
                setState: (state: State) => this.stateStorage.setById(chat_id, state),
            });
        }
    }

    public register(bot: IBot) {
        bot.on('message', this.handleMessage.bind(this, bot));
        bot.on('callback_query', this.handleCallbackQuery.bind(this, bot));
    }

    public when<N extends State['step']>(name: N, obj: IStateObject<State, Extract<State, { step: N }>>): this {
        if (!obj.handleMessage && !obj.handleCallbackQuery) {
            throw new Error('handleMessage and handleCallback not set');
        }

        if (!obj.afterMessage && !obj.afterCallbackQuery) {
            throw new Error('afterMessage and afterCallbackQuery not set, required one of this');
        }

        this.stateList[name] = obj as IStateObject<State>;

        return this;
    }

    public otherwise(obj: IStateObject<State>): this {

        return this;
    }
}
