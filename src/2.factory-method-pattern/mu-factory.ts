namespace MuFactory {
  interface Human {
    // 每个人种的皮肤都有相应的颜色
    getColor(): void;
    // 人类会说话
    say(): void;
  }

  abstract class AbstractHumanFactory {
    abstract createHuman(): Human;
  }
  // 黑色人种
  class BlackHuman implements Human {
    getColor(): void {
      console.log(`黑色人种的皮肤颜色是黑色的！`);
    }

    say(): void {
      console.log(`黑人会说话, 一般人听不懂`);
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
  }

  // 白色人种
  class WhiteHuman implements Human {
    getColor(): void {
      console.log(`白色人种的皮肤颜色是白色的！`);
    }

    say(): void {
      console.log(`白色人种会说话，一般说的都是单字节`);
    }
  }

  // 黑色人种的创建工厂实现
  class BlackHumanFactory extends AbstractHumanFactory {
    createHuman(): Human {
      return new BlackHuman();
    }
  }

  // 黄色人种的创建工厂
  class YellowHumanFactory extends AbstractHumanFactory {
    createHuman(): Human {
      return new YellowHuman();
    }
  }
  // 白色人种的创建工厂
  class WhiteHumanFactory extends AbstractHumanFactory {
    createHuman(): Human {
      return new WhiteHuman();
    }
  }

  class NvWa {
    static main(): void {
      // 女娃第一次造人，火候不足，于是白人产生了
      console.log('--造出的第一批人是白色人种--');
      const white = new WhiteHumanFactory().createHuman();
      white.getColor();
      white.say();
      // 女娲第二次造人，火候国足，于是黑人产生了
      console.log('--造出的第一批人是黑色人种--');
      const black = new BlackHumanFactory().createHuman();
      black.getColor();
      black.say();
      // 第三次造人，火候刚刚好，于是黄色人种产生了
      console.log('--造出的第一批人是黄色人种--');
      const yellow = new YellowHumanFactory().createHuman();
      yellow.getColor();
      yellow.say();
    }
  }

  NvWa.main();

  class Singleton {
    private constructor() {}

    doSomething(): void {
      // 业务处理
    }
  }
}
