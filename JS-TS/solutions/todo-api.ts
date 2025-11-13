import { InMemoryRepository } from './repository';
import { Todo, NewTodo } from './types';

export class TodoApi {
  private repo = new InMemoryRepository<Todo>();

  async getAll(): Promise<Todo[]> {
    //throw new Error('getAll: not implemented');
    return new Promise<Todo[]>((resolve, reject) => {
        setTimeout(resolve = () => {
          let tempo = this.repo.findAll();
          
          console.log('getAll');
        }, 300);
    })
  }

  async add(newTodo: NewTodo): Promise<Todo> {
    throw new Error('add: not implemented');
  }

  async update(id: number, update: Partial<Omit<Todo, 'id' | 'createdAt'>>): Promise<Todo> {
    throw new Error('update: not implemented');
  }

  async remove(id: number): Promise<void> {
    throw new Error('remove: not implemented');
  }
} 
