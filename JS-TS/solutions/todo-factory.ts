import { Todo, NewTodo, TodoStatus } from './types';

let nextId = 1;

export function createTodo(input: NewTodo): Todo {
  if(!input) throw new Error('createTodo: not implemented');
  return {
    ...input,
    id: nextId++,
    createdAt: new Date(),
    status:  TodoStatus.PENDING
  } as Todo;
}

