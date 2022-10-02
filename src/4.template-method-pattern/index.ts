namespace BananaPhone {
  abstract class BananaPhoneModel {
    // 能开机
    abstract powerOn(): void
    // 能打电话
    abstract call(): void
    // 能听音乐
    abstract music(): void
    // 能发信息
    abstract sendMsg(): void
    // 能关机
    abstract powerOff(): void
    // 运行起来
    run(): void {
      // 先开机
      this.powerOn()
      // 打个电话试试
      this.call()
      // 听个音乐试试
      this.music()
      // 发条信息试试
      this.sendMsg()
      // 试完了 关机
      this.powerOff()
    }
  }

  class BPhoneModel extends BananaPhoneModel {
    call(): void {
      console.log(`能打电话，支持4G`)
    }
    music(): void {
      console.log(`能听音乐，但是需要开会员`)
    }
    powerOff(): void {
      console.log(`关机动画...一个香蕉`)
    }
    powerOn(): void {
      console.log(`开机动画...一个香蕉`)
    }
    sendMsg(): void {
      console.log(`只能给联系人发短信，一条2毛`)
    }
  }

  class BPhoneProModel extends BananaPhoneModel {
    call(): void {
      console.log(`能打电话，支持5G`)
    }
    music(): void {
      console.log(`能听音乐，自带网抑云会员`)
    }
    powerOff(): void {
      console.log(`关机动画...两个香蕉`)
    }
    powerOn(): void {
      console.log(`开机动画...两个香蕉`)
    }
    sendMsg(): void {
      console.log(`给所有人发短信，一条1毛`)
    }
  }

  class Clinet {
    // 我们把两部手机都展示出来，方便用户对比
    static main(): void {
      // 先用一般机型做个抛砖引玉
      const bp1 = new BPhoneModel()
      // 功能演示
      bp1.run()
      console.log(`-----分割线-----`)
      // 然后把我们的高端机 Pro 拿出来
      const bp2 = new BPhoneProModel()
      // 功能演示
      bp2.run()
    }
  }

  Clinet.main()
}
