export class InMemoryRepository<T extends { id: number }> {
  // private storage
  private items: T[] = [];

  add(entity: T): T {
    //throw new Error('add: not implemented');
    this.items = [...this.items, entity];
    return entity;
  }

  update(id: number, patch: Partial<T>): T {
    let updated : T | undefined = undefined;
    //throw new Error('update: not implemented');
    this.items = this.items.map(item => {
      if(item.id === id) {
        const newEntity = { ...item, ...patch };  
        updated = newEntity;
        return newEntity;
      }
      return item;
    });
    return updated as T;
  }

  remove(id: number): void {
    //throw new Error('remove: not implemented');
    this.items = this.items.filter(item => item.id != id);
  }

  findById(id: number): T | undefined {
    //throw new Error('findById: not implemented');
    return this.items.find(item => item.id == id);
  }

  findAll(): T[] {
    //throw new Error('findAll: not implemented');

    /// strict using (for simple data only)
    return JSON.parse(JSON.stringify(this.items)) as T[];

    /// shallow copy
    return [...this.items];

    /// 3rd party solutions for deep copy (out of scope)
  }
}
