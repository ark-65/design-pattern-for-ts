namespace ProxyPatternClient5 {
  interface IGamePlayer {
    // 登录游戏
    login(user: string, password: string): void;
    // 打怪
    killBoss(): void;
    // 升级
    upgrade(): void;
  }


  interface IProxy {
    // 计算费用
    count(): void;
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

  class GamePlayerProxy implements IGamePlayer, IProxy{
    private gamePlayer: IGamePlayer = null
    // 通过构造函数传递要对谁进行代练
    constructor(_gamePlayer: IGamePlayer) {
      this.gamePlayer = _gamePlayer;
    }
    // 代理打怪
    killBoss(): void {
      this.gamePlayer.killBoss();
    }
    // 代理登录
    login(user: string, password: string): void {
      this.gamePlayer.login(user, password);
    }
    // 代理升级
    upgrade(): void {
      this.gamePlayer.upgrade();
      this.count();
    }
    // 计算费用
    count(): void {
      console.log(`升级总费用是: 150 元`);
    }
  }

  class Client {
    static main(): void {
      // 定义一个痴迷的玩家
      const player: IGamePlayer = new GamePlayer('张三');
      // 定义一个代练者
      const proxy = new GamePlayerProxy(player);
      // 开始打游戏,记下时间戳
      console.log('开始时间是: 2022年10月02日22:55:51');
      proxy.login('zhangSan', '123456');
      // 开始杀怪
      proxy.killBoss();
      // 升级
      proxy.upgrade();
      // 记录结束游戏时间
      console.log('结束时间是: 2022年10月02日22:57:07');
    }
  }

  Client.main();
}
