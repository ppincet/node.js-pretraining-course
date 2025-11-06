import { addTodo,updateTodo, removeTodo, getTodo } from '../JS-TS/solutions/todo-crud';
import { createTodo } from '../JS-TS/solutions/todo-factory';
import { TodoStatus, Todo } from '../JS-TS/solutions/types';
let state : Todo[] = [];
const todo = createTodo({ title: 'Write tests' });
state = addTodo(state, createTodo({ title: 'Write tests' }))
    .addTodo(state, createTodo({ title: 'Update tests' }));

const state3 = updateTodo(state2, todo.id, { status: TodoStatus.COMPLETED });