import type { StateType } from './typings';

interface StateItem<State> {
    chatId: number;
    state: State;
}

/**
 * Хранилище состояний для каждого чата
 */
export class StateStorage<State extends StateType> {
    protected readonly states = new Map<number, State>();

    public constructor() {
        this.getById = this.getById.bind(this);
        this.setById = this.setById.bind(this);
    }

    /**
     * Возвращает состояние по идентификатору чата.
     * В случае, если состояние не найдено, создаётся и сохраняется стандартное.
     * @param chatId Идентификатор чата
     */
    public getById(chatId: number): State {
        let state = this.states.get(chatId);

        if (!state) {
            state = { step: 'entry' } as State;
            this.setById(chatId, state);
        }

        return state;
    }

    /**
     * Сохраняет состояние для чата
     * @param chatId Идентификатор чата
     * @param state Новое состояние
     */
    public setById(chatId: number, state: State): void {
        this.states.set(chatId, state);
    }

    /**
     * Возвращает массив отфильтрованных по состоянию и некоторому условию состояний
     * @param filter Фильтр
     * @returns
     */
    public filter(filter: (state: State, chatId: number) => boolean): StateItem<State>[] {
        const result: StateItem<State>[] = [];

        this.states.forEach((state, chatId) => {
            if (filter(state, chatId)) {
                result.push({ chatId, state });
            }
        });

        return result;
    }
}
