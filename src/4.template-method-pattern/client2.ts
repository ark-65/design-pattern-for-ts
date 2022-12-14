namespace Part4Client2 {
  abstract class BananaPhoneModel {
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
      // 先开机
      this.powerOn();
      // 打个电话试试
      this.call();
      // 听个音乐试试
      this.music();
      // 发条信息试试
      this.sendMsg();
      // 试完了 关机
      if (this.isPowerOff()) {
        this.powerOff();
      } else {
        console.log(`不关机 继续运行`);
      }
    }
    // 狗子方法
    protected isPowerOff(): boolean {
      return true;
    }
  }

  class BPhoneModel extends BananaPhoneModel {
    // 默认关机
    private powerOffFlag = true;

    protected call(): void {
      console.log(`能打电话，支持4G`);
    }
    protected music(): void {
      console.log(`能听音乐，但是需要开会员`);
    }
    protected powerOff(): void {
      console.log(`关机动画...一个香蕉`);
    }
    protected powerOn(): void {
      console.log(`开机动画...一个香蕉`);
    }
    protected sendMsg(): void {
      console.log(`只能给联系人发短信，一条2毛`);
    }
    protected isPowerOff(): boolean {
      return this.powerOffFlag;
    }
    // 要不要关机用户决定
    setPowerOff(isPowerOff: boolean) {
      this.powerOffFlag = isPowerOff;
    }
  }

  class BPhoneProModel extends BananaPhoneModel {
    protected call(): void {
      console.log(`能打电话，支持5G`);
    }
    protected music(): void {
      console.log(`能听音乐，自带网抑云会员`);
    }
    protected powerOff(): void {
      console.log(`关机动画...两个香蕉`);
    }
    protected powerOn(): void {
      console.log(`开机动画...两个香蕉`);
    }
    protected sendMsg(): void {
      console.log(`给所有人发短信，一条1毛`);
    }
    // 默认不关机
    protected isPowerOff(): boolean {
      return false;
    }
  }

  class Client {
    static main(): void {
      // 用户订购了一台普通型号的 BPhone
      const bp1 = new BPhoneModel();
      // 用户想让他自动关机
      bp1.setPowerOff(true);
      // 用户又订购了一台普通型号的 BPhone
      const bp2 = new BPhoneModel();
      // 用户想让他不关机
      bp2.setPowerOff(false);
      // 最后用户订购了一台 pro
      const bPro = new BPhoneProModel();
      // 最后开始演示功能
      console.log(`-----分割线---bp1 想让它自动关机--`);
      bp1.run();
      console.log(`-----分割线---bp2 不想让它自动关机--`);
      bp2.run();
      console.log(`-----分割线---bPro 不能关机--`);
      bPro.run();
    }
  }

  Client.main();
}
