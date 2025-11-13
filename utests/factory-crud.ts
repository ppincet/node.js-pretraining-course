import {  addTodo, updateTodo, removeTodo, getTodo  } from '../JS-TS/solutions/todo-crud';
import { createTodo } from '../JS-TS/solutions/todo-factory';
import { TodoStatus, Todo } from '../JS-TS/solutions/types';
let state : Todo[] = [];
const state1 : Todo[] = addTodo(state, createTodo({ title: 'Write tests' }))
const state2 = addTodo(state1, createTodo({ title: 'Update tests' }));
console.log(state2);
//const state3 = updateTodo(state2, todo.id, { status: TodoStatus.COMPLETED });