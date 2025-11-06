import { Todo } from './types';
 
function addTodo(state: Todo[], todo: Todo): Todo[] {
  //throw new Error('addTodo: not implemented');
  let result : Todo[] = [...state];
  result.push(todo);
  return result

}

function updateTodo(state: Todo[], id: number, update: Partial<Omit<Todo, 'id' | 'createdAt'>>): Todo[] {
  throw new Error('updateTodo: not implemented');
}

function removeTodo(state: Todo[], id: number): Todo[] {
  return [...state].splice(state.findIndex(todo => todo.id == id), 1);
  throw new Error('removeTodo: not implemented');
}

function getTodo(state: Todo[], id: number): Todo | undefined {
  return [...state].find(todo => todo.id == id);
  //throw new Error('getTodo: not implemented');
}

export { addTodo,updateTodo, removeTodo, getTodo }
