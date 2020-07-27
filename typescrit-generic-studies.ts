export class Animal {}

export class TestClass<E, D> {
  createInstance<A extends Animal>(c: new () => A): A {
    return new c();
  }

  createInstance2(c: new (e: E) => D, e: E): D {
    return new c(e);
  }

  private instanciate(type: new () => E): E {
    return new type();
  }
}

   abstract entityToDto(entity: E): D;

    private entitiesToDtos(entities: E[]): D[] {
        const dtos = [];
        entities.forEach(entity => {
            dtos.push(this.entityToDto(entity));
        });
        return dtos;
    }
