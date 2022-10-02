namespace FactoryMethod {
  interface Human {
    // 每个人种的皮肤都有相应的颜色
    getColor(): void;
    // 人类会说话
    say(): void;
  }

  // 黑色人种
  class BlackHuman implements Human {
    getColor(): void {
      console.log(`黑色人种的皮肤颜色是黑色的！`);
    }

    say(): void {
      console.log(`黑人会说话, 一般人听不懂`);
    }

    static newInstance(): BlackHuman {
      return new BlackHuman();
    }
  }

  // 黄色人种
  class YellowHuman implements Human {
    getColor(): void {
      console.log(`黄色人种的皮肤颜色是黄色的！`);
    }

    say(): void {
      console.log(`黄色人种会说话，一般说的都是双字节`);
    }
    static newInstance(): YellowHuman {
      return new YellowHuman();
    }
  }

  // 白色人种
  class WhiteHuman implements Human {
    getColor(): void {
      console.log(`白色人种的皮肤颜色是白色的！`);
    }

    say(): void {
      console.log(`白色人种会说话，一般说的都是单字节`);
    }
    static newInstance(): WhiteHuman {
      return new WhiteHuman();
    }
  }

  type humanType = 'white' | 'yellow' | 'black';
  // 抽象人类创建工厂
  abstract class AbstractHumanFactory {
    abstract createHuman<T extends Human>(c: T): T;
  }

  class HumanFactory extends AbstractHumanFactory {
    // createHuman(type: humanType): Human {
    //     if (type === 'white') {
    //         return new WhiteHuman();
    //     } else if (type === 'black') {
    //         return new BlackHuman();
    //     } else if (type === 'yellow') {
    //         return new YellowHuman();
    //     } else {
    //         return new YellowHuman();
    //     }
    // }
    createHuman<T extends Human>(c: T): T {
      return c;
    }
  }

  class NvWa {
    static main(): void {
      // 声明阴阳八卦炉
      const magicFurnace = new HumanFactory();
      // 女娃第一次造人，火候不足，于是白人产生了
      console.log('--造出的第一批人是白色人种--');
      const white = magicFurnace.createHuman(WhiteHuman.newInstance());
      white.getColor();
      white.say();
      // 女娲第二次造人，火候国足，于是黑人产生了
      console.log('--造出的第一批人是黑色人种--');
      const black = magicFurnace.createHuman(BlackHuman.newInstance());
      black.getColor();
      black.say();
      // 第三次造人，火候刚刚好，于是黄色人种产生了
      console.log('--造出的第一批人是黄色人种--');
      const yellow = magicFurnace.createHuman(YellowHuman.newInstance());
      yellow.getColor();
      yellow.say();
    }
  }

  NvWa.main();

  // 抽象产品类
  abstract class Product {
    // 产品类公共方法
    public method1(): void {
      // 业务逻辑
    }

    public abstract method2(): void;
  }
  // 具体产品类
  class ConcreteProduct1 extends Product {
    method2(): void {}
    static newInstance(): Product {
      return new ConcreteProduct1();
    }
  }

  class ConcreteProduct2 extends Product {
    method2(): void {}
    static newInstance(): Product {
      return new ConcreteProduct2();
    }
  }
  // 抽象工厂类
  abstract class Creator {
    abstract createProduct<T extends Product>(c: T): T;
  }
  // 具体工厂类
  class ConcreteCreator extends Creator {
    createProduct<T extends Product>(c: T): T {
      return c;
    }
  }
  // 场景类
  class Client {
    static main(): void {
      const creator = new ConcreteCreator();
      const product = creator.createProduct(ConcreteProduct1.newInstance());
      /**
       * 继续业务处理
       */
    }
  }
}
