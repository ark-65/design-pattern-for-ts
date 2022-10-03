namespace Part3Client {
  // 抽象产品类
  abstract class AbstractProductA {
    // 每个产品的共有方法
    shareMethod(): void {
      console.log(
        `我是iphone 14， 叹号屏, 1200尼特， A16+6G内存(DDR5), 4800万三摄， 最高1T`
      );
    }

    // 每个产品相同的方法，不同的实现
    abstract doSomething(): void;
  }

  abstract class AbstractProductB {
    // 每个产品的共有方法
    shareMethod(): void {
      console.log(
        `我是 iphone14, 刘海屏， 1000尼特， A15+6G内存(DDR4+), 1200万双摄， 最高512G`
      );
    }

    // 每个产品相同的方法，不同的实现
    abstract doSomething(): void;
  }

  // 产品A1的实现类
  class ProductA1 extends AbstractProductA {
    doSomething() {
      console.log(`我是 iphone 14 Pro Max 2778*1284， 255g手术级不锈钢`);
    }
  }

  // 产品A2的实现类
  class ProductA2 extends AbstractProductA {
    doSomething() {
      console.log(`我是 iphone 14 Pro 2532*1170, 215g手术级不锈钢`);
    }
  }

  // 产品B1的实现类
  class ProductB1 extends AbstractProductB {
    doSomething() {
      console.log(`我是 iphone 14, 2532*1170, 173g手术级不锈钢`);
    }
  }

  // 产品B2的实现类
  class ProductB2 extends AbstractProductB {
    doSomething() {
      console.log(`我是 iphone 14 + ,2778*1284, 245g手术级不锈钢`);
    }
  }

  // 抽象工厂类
  abstract class AbstractCreator {
    //创建A产品家族
    abstract createProductA(): AbstractProductA;
    // 创建B产品家族
    abstract createProductB(): AbstractProductB;
  }

  // 产品等级1的实现类
  class Creator1 extends AbstractCreator {
    createProductA(): AbstractProductA {
      return new ProductA1();
    }
    createProductB(): AbstractProductB {
      return new ProductB1();
    }
  }

  // 产品等级2的实现类
  class Creator2 extends AbstractCreator {
    createProductA(): AbstractProductA {
      return new ProductA2();
    }
    createProductB(): AbstractProductB {
      return new ProductB2();
    }
  }

  // 场景类
  class Client {
    static main(): void {
      // 定义两个工厂
      const creator1 = new Creator1();
      const creator2 = new Creator2();
      // 产生 A1 对象
      const a1 = creator1.createProductA();
      // 产生 A2 对象
      const a2 = creator2.createProductA();
      // 产生 B1 对象
      const b1 = creator1.createProductB();
      // 产生 B2 对象
      const b2 = creator2.createProductB();
      /**
       * 然后看看我们生产出来的...iphone！
       */
      a1.shareMethod();
      a1.doSomething();
      console.log(`-----分割线----`);
      a2.shareMethod();
      a2.doSomething();
      console.log(`-----分割线----`);
      b1.shareMethod();
      b1.doSomething();
      console.log(`-----分割线----`);
      b2.shareMethod();
      b2.doSomething();
    }
  }

  Client.main();
}
