namespace ProxyPatternClient4 {
  interface IGamePlayer {
    // 登录游戏
    login(user: string, password: string): void;
    // 打怪
    killBoss(): void;
    // 升级
    upgrade(): void;
    // 每个人都可以找一下自己的代理
    getProxy(): IGamePlayer;
  }

  class GamePlayer implements IGamePlayer{
    private name: string = '';
    // 我的代理是谁
    private proxy: IGamePlayer = null;

    constructor(_name: string) {
      this.name = _name;
    }

    private isProxy(): boolean {
      if (this.proxy === null) {
        return false;
      } else {
        return true;
      }
    }

    // 找到自己的代理
    getProxy(): IGamePlayer {
      this.proxy = new GamePlayerProxy(this);
      return this.proxy;
    }

    killBoss(): void {
      if (this.isProxy()) {
        console.log(`${this.name} 在打怪`);
      } else {
        console.error(`请使用指定的代理访问`);
      }
    }

    login(user: string, password: string): void {
      if (this.isProxy()) {
        console.log(`登录名为 ${user} 的用户 ${this.name} 登录成功!`);
      } else {
        console.error(`请使用指定的代理访问`);
      }
    }

    upgrade(): void {
      if (this.isProxy()) {
        console.log(`${this.name} 又升了一级`);
      } else {
        console.error(`请使用指定的代理访问`);
      }
    }
  }

  class GamePlayerProxy implements IGamePlayer{
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
    }
    // 代理的代理暂时还没有,就是自己
    getProxy(): IGamePlayer {
      return this;
    }
  }

  class Client1 {
    static main(): void {
      // 定义一个游戏角色
      const player = new GamePlayer('张三');
      // 开始打游戏
      console.log(`开始时间是: 2022年10月03日18:18:45`);
      player.login("zhangSan", "123456");
      // 打怪
      player.killBoss();
      // 升级
      player.upgrade();
      // 记录结束游戏时间
      console.log(`结束时间是: 2022年10月03日18:19:52`);
    }
  }

  Client1.main();

  class Client2 {
    static main(): void {
      // 定义一个游戏角色
      const player = new GamePlayer('张三');
      // 然后再定义一个代练者
      const proxy = new GamePlayerProxy(player);
      // 开始打游戏
      console.log(`开始时间是: 2022年10月03日18:18:45`);
      proxy.login("zhangSan", "123456");
      // 打怪
      proxy.killBoss();
      // 升级
      proxy.upgrade();
      // 记录结束游戏时间
      console.log(`结束时间是: 2022年10月03日18:19:52`);
    }
  }

  Client2.main();

  class Client3 {
    static main(): void {
      // 定义一个游戏角色
      const player = new GamePlayer('张三');
      // 获得指定的代理
      const proxy = player.getProxy();
      // 开始打游戏
      console.log(`开始时间是: 2022年10月03日18:18:45`);
      proxy.login("zhangSan", "123456");
      // 打怪
      proxy.killBoss();
      // 升级
      proxy.upgrade();
      // 记录结束游戏时间
      console.log(`结束时间是: 2022年10月03日18:19:52`);
    }
  }

  Client3.main();
}
