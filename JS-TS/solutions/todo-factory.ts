import { Todo, NewTodo, TodoStatus } from './types';

let nextId = 1;

const createTodo = (input: NewTodo): Todo  => {
  if(!input) throw new Error('createTodo: not implemented');
  return {
    ...input,
    id: nextId++,
    createdAt: new Date(),
    status:  TodoStatus.PENDING
  } as Todo;
}
export { createTodo }

