namespace ProxyPatternClient3 {
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
    // 构造函数限制谁能创建对象,并同时传递姓名
    constructor(_gamePlayer: IGamePlayer, _name: string) {
      if (_gamePlayer === null) {
        throw new Error(`不能创建真实角色`);
      } else {
        this.name = _name;
      }
    }
    // 打怪
    killBoss(): void {
      console.log(`${this.name} 在打怪`);
    }
    // 登录
    login(user: string, password: string): void {
      console.log(`登录名为 ${user} 的用户 ${this.name} 登录成功`);
    }
    // 升级
    upgrade(): void {
      console.log(`${this.name} 又升了一级`);
    }
  }

  class GamePlayerProxy implements IGamePlayer{
    private gamePlayer: IGamePlayer = null;
    // 通过构造函数传递要对谁进行代练
    constructor(name: string) {
      try {
        this.gamePlayer = new GamePlayer(this, name);
      } catch (e) {
        console.error(e);
      }
    }

    killBoss(): void {
      this.gamePlayer.killBoss();
    }

    login(user: string, password: string): void {
      this.gamePlayer.login(user, password);
    }

    upgrade(): void {
      this.gamePlayer.upgrade();
    }
  }

  class Client {
    static main(): void {
      // 定义一个代练者
      const proxy = new GamePlayerProxy("张三");
      // 开始打游戏,记下时间戳
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

  Client.main();
}
