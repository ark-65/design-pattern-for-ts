namespace PrototypePatternClient3 {
  interface Cloneable<T> {
    clone(): T;
  }
  class Thing implements Cloneable<Thing> {
    constructor() {
      console.log(`构造函数执行了...`);
    }
    clone(): Thing {
      return Object.create(this);
    }
  }

  class Client {
    static main(): void {
      // 产生一个对象
      const thing: Thing = new Thing();
      // 拷贝一个对象
      const cloneThing = thing.clone();
    }
  }

  Client.main();
}
