namespace Part3AbstractFactoryPattern {
  interface BasicHuman {
    // 每个人种都有颜色
    getColor(): void
    // 人类会说话
    say(): void
  }

  interface Human extends BasicHuman {
    // 每个人都有性别
    getSex(): void
  }

  abstract class AbstractWhiteHuman implements BasicHuman {
    getColor(): void {
      console.log(`白色人种的皮肤颜色是白色的！`)
    }

    say(): void {
      console.log(`白色人种会说话，一般说的都是单字节`)
    }
  }

  class AbstractBlackHuman implements BasicHuman {
    getColor(): void {
      console.log(`黑色人种的皮肤颜色是黑色的！`)
    }

    say(): void {
      console.log(`黑人会说话, 一般人听不懂`)
    }
  }

  class AbstractYellowHuman implements BasicHuman {
    getColor(): void {
      console.log(`黄色人种的皮肤颜色是黄色的！`)
    }

    say(): void {
      console.log(`黄色人种会说话，一般说的都是双字节`)
    }
  }

  class FemaleYellowHuman extends AbstractYellowHuman implements Human {
    getSex() {
      console.log('黄人女性')
    }
  }
  class MaleYellowHuman extends AbstractYellowHuman implements Human {
    getSex() {
      console.log('黄人男性')
    }
  }

  class FemaleBlackHuman extends AbstractBlackHuman implements Human {
    getSex() {
      console.log('黑人女性')
    }
  }
  class MaleBlackHuman extends AbstractBlackHuman implements Human {
    getSex() {
      console.log('黑人男性')
    }
  }

  class FemaleWhiteHuman extends AbstractWhiteHuman implements Human {
    getSex() {
      console.log('白人女性')
    }
  }

  class MaleWhiteHuman extends AbstractWhiteHuman implements Human {
    getSex() {
      console.log('白人男性')
    }
  }

  interface HumanFactory {
    createWhiteHuman(): Human
    createYellowHuman(): Human
    createBlackHuman(): Human
  }

  class FemaleFactory implements HumanFactory {
    public createYellowHuman(): Human {
      return new FemaleYellowHuman()
    }
    public createBlackHuman(): Human {
      return new FemaleBlackHuman()
    }
    public createWhiteHuman(): Human {
      return new FemaleWhiteHuman()
    }
  }

  class MaleFactory implements HumanFactory {
    public createYellowHuman(): Human {
      return new MaleYellowHuman()
    }
    public createBlackHuman(): Human {
      return new MaleBlackHuman()
    }
    public createWhiteHuman(): Human {
      return new MaleWhiteHuman()
    }
  }

  class NvWa {
    static main(): void {
      const maleHumanFactory = new MaleFactory()
      const femalteHumanFactory = new FemaleFactory()
      const maleWhiteHuman = maleHumanFactory.createWhiteHuman()
      maleWhiteHuman.say()
      maleWhiteHuman.getColor()
      maleWhiteHuman.getSex()
      const femaleWhiteHuman = femalteHumanFactory.createWhiteHuman()
      femaleWhiteHuman.say()
      femaleWhiteHuman.getColor()
      femaleWhiteHuman.getSex()
    }
  }

  NvWa.main()
}
