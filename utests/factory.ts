import { createTodo } from '../JS-TS/solutions/todo-factory';
const a = createTodo({ title: 'Learn TypeScript', description: '' });
const b = createTodo({ title: 'Refactor code' });

console.log(`${a.id} : ${a.createdAt}`); // 1
console.log(`${b.id} : ${b.createdAt}`); // 2