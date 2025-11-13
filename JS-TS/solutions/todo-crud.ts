import { todo } from 'node:test';
import { Todo } from './types';

const addTodo = (state: Todo[], todo: Todo): Todo[] => {
  //throw new Error('addTodo: not implemented');
  return [...state, todo];

}

function updateTodo(state: Todo[], id: number, update: Partial<Omit<Todo, 'id' | 'createdAt'>>): Todo[] {
  //throw new Error('updateTodo: not implemented');
  return state.map(todo => {
    if(todo.id == id) {
      return {...todo, ...update };
    } 
    return todo;
  });
}

const removeTodo = (state: Todo[], id: number): Todo[] => {
  //throw new Error('removeTodo: not implemented');
  return state.filter(todo => todo.id != id);
}

const getTodo = (state: Todo[], id: number): Todo | undefined => {
  //throw new Error('getTodo: not implemented');
  return state.find(todo => todo.id == id);
}

export { addTodo,updateTodo, removeTodo, getTodo }
