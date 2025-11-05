import { createTodo } from '../JS-TS/solutions/todo-factory';
const a = createTodo({ title: 'Learn TypeScript', description: '' });
const b = createTodo({ title: 'Refactor code' });

console.log(a.id); // 1
console.log(b.id); // 2