import type { CallbackQuery } from '@typings/CallbackQuery';
import type { Message } from '@typings/Message';

/**
 * Базовый тип состояния: имеет только название состояния
 */
export interface IStateBasic {
    step: string;
}

/**
 * Тип состояния: имеет всё что угодно и название
 */
export type StateType = Record<string, any> & IStateBasic;

/**
 * Объект отдельного состояния
 */
export interface IStateObject<
    AllStates,
    CurrentState extends AllStates = AllStates,
> {
    /**
     * Обработка нового сообщения: модифицируем состояние чата возвращаем его
     */
    handleMessage?: HandlerFunction<Message, AllStates, CurrentState>;
    /**
     * Действие, выполняемое после нового сообщения и изменения состояния
     */
    afterMessage?: ActionFunction<CurrentState, AllStates, 'message', Message>;


    /**
     * Обработка нового callbackQuery: модифицируем состояние чата и возвращаем его
     */
    handleCallbackQuery?: HandlerFunction<CallbackQuery, AllStates, CurrentState>;
    /**
     * Действие, выполняемое после callbackQuery и изменения состояния
     */
    afterCallbackQuery?: ActionFunction<CurrentState, AllStates, 'query', CallbackQuery>;
}

/**
 * Получает на вход сообщение и текущее состояние, возвращает новое состояние
 */
export type HandlerFunction<
    Object extends Message | CallbackQuery,
    AllStates,
    CurrentState extends AllStates,
    ReturnState extends AllStates = AllStates,
> = (object: Object, state: CurrentState) => ReturnState | Promise<ReturnState>;

/**
 * Делает какое-то дейстие на основании нового состояния
 */
export type ActionFunction<CurrentState, AllStates, SourceKey extends string, SourceType> = (args: {
    state: CurrentState;
    setState: (state: AllStates) => void;
} & {
    [S in SourceKey]: SourceType;
}) => void | Promise<void>;
