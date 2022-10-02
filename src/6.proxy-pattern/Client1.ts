namespace ProxyPatternClient1 {
  interface IGamePlayer {
    // 登录游戏
    login(user: string, password: string): void;

    // 打怪,网络游戏的主要特色
    killBoss(): void;

    // 升级
    upgrade(): void;
  }

  class GamePlayer implements IGamePlayer {
    private readonly name: string = '';
    // 通过构造函数传递名称
    constructor(_name: string) {
      this.name = _name;
    }

    // 打怪, 最期望的就是打怪
    killBoss(): void {
      console.log(this.name + '在打怪');
    }
    // 进游戏之前你肯定要登录吧,这是一个必要条件
    login(user: string, password: string): void {
      console.log('登录名为' + user + '的用户' + this.name + '登录成功');
    }
    // 升级,升级有很多方法,花钱买是一种,做任务也是一种
    upgrade(): void {
      console.log(this.name + '又升了一级!');
    }
  }

  class Client {
    static main(): void {
      // 定义一个痴迷的玩家
      const player: IGamePlayer = new GamePlayer('张三');
    }
  }
}
