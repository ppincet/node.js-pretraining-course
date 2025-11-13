export class InMemoryRepository<T extends { id: number }> {
  // private storage
  private items: T[] = [];

  add(entity: T): T {
    //throw new Error('add: not implemented');
    this.items.push(entity);
  }

  update(id: number, patch: Partial<T>): T {
    throw new Error('update: not implemented');
  }

  remove(id: number): void {
    //throw new Error('remove: not implemented');
    this.items.filter(item => item.id != id);
  }

  findById(id: number): T | undefined {
    //throw new Error('findById: not implemented');
    return this.items.find(item => item.id == id);
  }

  findAll(): T[] {
    //throw new Error('findAll: not implemented');
    return [...this.items];
  }
}
