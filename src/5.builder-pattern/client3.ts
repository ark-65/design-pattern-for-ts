namespace Part5Client3 {
  abstract class PhoneBuilder {
    // 建造一个模型，你要给我一个顺序要求，就是组装顺序
    abstract setSequence(sequence: string[]): void;
    // 设置完毕顺序后就可以直接拿到这个手机模型
    abstract getPhoneModel(): PhoneModel;
  }

  class Phone15Builder extends PhoneBuilder {
    private p15 = new Phone15Model();
    getPhoneModel(): PhoneModel {
      return this.p15;
    }

    setSequence(sequence: string[]): void {
      this.p15.setSequence(sequence);
    }
  }

  class Phone15ProBuilder extends PhoneBuilder {
    private p15Pro = new Phone15ProModel();
    getPhoneModel(): PhoneModel {
      return this.p15Pro;
    }

    setSequence(sequence: string[]): void {
      this.p15Pro.setSequence(sequence);
    }
  }

  abstract class PhoneModel {
    private sequence: string[] = [];
    // 能开机
    protected abstract powerOn(): void;
    // 能打电话
    protected abstract call(): void;
    // 能听音乐
    protected abstract music(): void;
    // 能发信息
    protected abstract sendMsg(): void;
    // 能关机
    protected abstract powerOff(): void;
    // 运行起来
    run(): void {
      // 循环一遍，谁在前，先执行谁
      for (const actionName of this.sequence) {
        if (actionName === 'power on') {
          this.powerOn();
        } else if (actionName === 'power off') {
          this.powerOff();
        } else if (actionName === 'call') {
          this.call();
        } else if (actionName === 'music') {
          this.music();
        } else if (actionName === 'send msg') {
          this.sendMsg();
        }
      }
    }
    // 吧传递过来的值传到类内
    setSequence(sequence: string[]): void {
      this.sequence = sequence;
    }
  }

  class Phone15Model extends PhoneModel {
    protected call(): void {
      console.log(`phone15 能打电话，支持4G`);
    }
    protected music(): void {
      console.log(`phone15 能听音乐，但是需要开会员`);
    }
    protected powerOff(): void {
      console.log(`phone15 关机动画...一个香蕉`);
    }
    protected powerOn(): void {
      console.log(`phone15 开机动画...一个香蕉`);
    }
    protected sendMsg(): void {
      console.log(`phone15 只能给联系人发短信，一条2毛`);
    }
  }

  class Phone15ProModel extends PhoneModel {
    protected call(): void {
      console.log(`phone15Pro 能打电话，支持5G`);
    }
    protected music(): void {
      console.log(`phone15Pro 能听音乐，自带网抑云会员`);
    }
    protected powerOff(): void {
      console.log(`phone15Pro 关机动画...两个香蕉`);
    }
    protected powerOn(): void {
      console.log(`phone15Pro 开机动画...两个香蕉`);
    }
    protected sendMsg(): void {
      console.log(`phone15Pro 给所有人发短信，一条1毛`);
    }
  }

  class Director {
    private sequence: string[] = [];
    private phone15Builder = new Phone15Builder();
    private phone15ProBuilder = new Phone15ProBuilder();

    /**
     * A型号 Phone15 手机模型，其过程为只有开机（powerOn）、打电话（call）方法，其他的听音乐，发信息和关机都没有
     */
    getAPhone15Model(): PhoneModel {
      // 清理执行场景
      this.sequence = [];
      this.sequence.push('power on');
      this.sequence.push('call');
      this.phone15Builder.setSequence(this.sequence);
      return this.phone15Builder.getPhoneModel();
    }

    /**
     * B型号 Phone15 手机模型，其过程为只有开机（powerOn）、发信息（sendMsg）方法，其他的听音乐，打电话和关机都没有
     */
    getBPhone15Model(): PhoneModel {
      // 清理执行场景
      this.sequence = [];
      this.sequence.push('power on');
      this.sequence.push('send msg');
      this.phone15Builder.setSequence(this.sequence);
      return this.phone15Builder.getPhoneModel();
    }

    /**
     * A型号 Phone15Pro 手机模型，其过程为只有开机（powerOn）、打电话（call）、听音乐（music）方法，其他的发信息，关机都没有
     */
    getAPhone15ProModel(): PhoneModel {
      // 清理执行场景
      this.sequence = [];
      this.sequence.push('power on');
      this.sequence.push('call');
      this.sequence.push('music');
      this.phone15ProBuilder.setSequence(this.sequence);
      return this.phone15ProBuilder.getPhoneModel();
    }
    /**
     * B型号 Phone15Pro 手机模型，其过程有开机（powerOn）、打电话（call）、听音乐（music）、发信息（sendMsg）、关机（powerOff）
     */
    getBPhone15ProModel(): PhoneModel {
      // 清理执行场景
      this.sequence = [];
      this.sequence.push('power on');
      this.sequence.push('call');
      this.sequence.push('music');
      this.sequence.push('send msg');
      this.sequence.push('power off');
      this.phone15ProBuilder.setSequence(this.sequence);
      return this.phone15ProBuilder.getPhoneModel();
    }

    /**
     * 这里还可以有很多方法，很多方法，随意排列组合
     * 导演类嘛，按照什么顺序还是导演说了算
     */
  }

  class Client {
    static main(): void {
      const director = new Director();
      //  A 类型的 10000 部
      for (let i = 0; i < 10000; i++) {
        director.getAPhone15Model().run();
      }
      // B类型的 1000 部
      for (let i = 0; i < 1000; i++) {
        director.getBPhone15Model().run();
      }
      // C类型500部
      for (let i = 0; i < 500; i++) {
        director.getAPhone15ProModel().run();
      }
      // D类型的100部
      for (let i = 0; i < 100; i++) {
        director.getBPhone15ProModel().run();
      }
    }
  }

  Client.main();
}
