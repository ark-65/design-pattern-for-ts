namespace ProxyPattern {
  interface Subject {
    // 定义一个方法
    request(): void;
  }

  class RealSubject implements Subject {
    // 实现方法
    request(): void {
      // 业务逻辑处理
    }
  }

  class Proxy implements Subject {
    // 要代理哪个实现类, 默认被代理者
    private subject: Subject = new RealSubject();
    // 通过构造函数传递代理者
    constructor(_subject: Subject) {
      this.subject = _subject;
    }
    // 实现接口中定义的方法
    request(): void {
      this.before()
      this.subject.request();
      this.after();
    }
    // 预处理
    private before(): void {
      // do something
    }
    // 善后处理
    private after(): void {
      // do something
    }
  }
}
