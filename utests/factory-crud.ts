import {  addTodo, updateTodo, removeTodo, getTodo  } from '../JS-TS/solutions/todo-crud';
import { createTodo } from '../JS-TS/solutions/todo-factory';
import { TodoStatus, Todo } from '../JS-TS/solutions/types';
let state : Todo[] = [];
const state1 : Todo[] = addTodo(state, createTodo({ title: 'Write tests' }))
const state2 = addTodo(state1, createTodo({ title: 'Update tests' }));
const state3 = removeTodo(state2, 1);
console.log(state3);
console.log(getTodo(state2, 100));
//const state3 = updateTodo(state2, todo.id, { status: TodoStatus.COMPLETED });