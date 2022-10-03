namespace part4Client {
  abstract class AbstractClass {
    // 基本方法
    protected abstract doAnything(): void;
    // 基本方法
    protected abstract doSomething(): void;
    // 模板方法
    templateMethod(): void {
      /**
       * 调用基本方法，完成相关的逻辑
       */
      this.doSomething();
      this.doAnything();
    }
  }

  class ConcreteClass1 extends AbstractClass {
    protected doAnything(): void {
      // 业务处理逻辑
      console.log(`ConcreteClass1 doAnything`);
    }

    protected doSomething(): void {
      // 业务处理逻辑
      console.log(`ConcreteClass1 doSomething`);
    }
  }

  class ConcreteClass2 extends AbstractClass {
    protected doAnything(): void {
      // 业务逻辑
      console.log(`ConcreteClass2 doAnything`);
    }

    protected doSomething(): void {
      // 业务逻辑
      console.log(`ConcreteClass2 doSomething`);
    }
  }

  class Client {
    static main(): void {
      const class1 = new ConcreteClass1();
      const class2 = new ConcreteClass2();
      class1.templateMethod();
      class2.templateMethod();
    }
  }

  Client.main();
}
