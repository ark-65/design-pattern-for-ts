namespace Part5Client2 {
  abstract class PhoneBuilder {
    // 建造一个模型，你要给我一个顺序要求，就是组装顺序
    abstract setSequence(sequence: string[]): void
    // 设置完毕顺序后就可以直接拿到这个手机模型
    abstract getPhoneModel(): PhoneModel
  }

  class Phone15Builder extends PhoneBuilder {
    private p15 = new Phone15Model()
    getPhoneModel(): PhoneModel {
      return this.p15
    }

    setSequence(sequence: string[]): void {
      this.p15.setSequence(sequence)
    }
  }

  class Phone15ProBuilder extends PhoneBuilder {
    private p15Pro = new Phone15ProModel()
    getPhoneModel(): PhoneModel {
      return this.p15Pro
    }

    setSequence(sequence: string[]): void {
      this.p15Pro.setSequence(sequence)
    }
  }

  abstract class PhoneModel {
    private sequence: string[] = []
    // 能开机
    protected abstract powerOn(): void
    // 能打电话
    protected abstract call(): void
    // 能听音乐
    protected abstract music(): void
    // 能发信息
    protected abstract sendMsg(): void
    // 能关机
    protected abstract powerOff(): void
    // 运行起来
    run(): void {
      // 循环一遍，谁在前，先执行谁
      for (const actionName of this.sequence) {
        if (actionName === 'power on') {
          this.powerOn()
        } else if (actionName === 'power off') {
          this.powerOff()
        } else if (actionName === 'call') {
          this.call()
        } else if (actionName === 'music') {
          this.music()
        } else if (actionName === 'send msg') {
          this.sendMsg()
        }
      }
    }
    // 吧传递过来的值传到类内
    setSequence(sequence: string[]): void {
      this.sequence = sequence
    }
  }

  class Phone15Model extends PhoneModel {
    protected call(): void {
      console.log(`phone15 能打电话，支持4G`)
    }
    protected music(): void {
      console.log(`phone15 能听音乐，但是需要开会员`)
    }
    protected powerOff(): void {
      console.log(`phone15 关机动画...一个香蕉`)
    }
    protected powerOn(): void {
      console.log(`phone15 开机动画...一个香蕉`)
    }
    protected sendMsg(): void {
      console.log(`phone15 只能给联系人发短信，一条2毛`)
    }
  }

  class Phone15ProModel extends PhoneModel {
    protected call(): void {
      console.log(`phone15Pro 能打电话，支持5G`)
    }
    protected music(): void {
      console.log(`phone15Pro 能听音乐，自带网抑云会员`)
    }
    protected powerOff(): void {
      console.log(`phone15Pro 关机动画...两个香蕉`)
    }
    protected powerOn(): void {
      console.log(`phone15Pro 开机动画...两个香蕉`)
    }
    protected sendMsg(): void {
      console.log(`phone15Pro 给所有人发短信，一条1毛`)
    }
  }

  class Client {
    static main(): void {
      // 存放 run的顺序
      const sequence: string[] = []
      // 先开机、然后听音乐、然后打电话、关机, 不需要发信息
      sequence.push('power on')
      sequence.push('music')
      sequence.push('call')
      sequence.push('power off')
      // 要一个 phone15Pro
      const p15ProBuilder = new Phone15ProBuilder()
      // 吧顺序给这个 builder 类，制造出一个这样的手机来
      p15ProBuilder.setSequence(sequence)
      // 制造一个 phone15pro
      const p15Pro = p15ProBuilder.getPhoneModel()
      p15Pro.run()
      console.log(`--------------分割线--------------`)
      // 相同顺序再来造一个 phone15
      const p15Builder = new Phone15Builder()
      p15Builder.setSequence(sequence)
      // 生产 phone15
      const p15 = p15Builder.getPhoneModel()
      p15.run()
    }
  }

  Client.main()
}
