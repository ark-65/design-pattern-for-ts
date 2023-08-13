abstract class Mediator {
  // 定义同事类
  protected _c1: ConcreteColleague1;
  protected _c2: ConcreteColleague2;
  // 通过 getter/setter 方法吧同事类注入进来
  set c1(c1: ConcreteColleague1) {
    this._c1 = c1;
  }

  get c1(): ConcreteColleague1 {
    return this._c1;
  }

  set c2(c2: ConcreteColleague2) {
    this._c2 = c2;
  }

  get c2(): ConcreteColleague2 {
    return this._c2;
  }

  // 中介者模式的业务逻辑
  public abstract doSomething1(): void;
  public abstract doSomething2(): void;
}

class ConcreteMediator extends Mediator {
  public doSomething1(): void {
    // 调用同事类的方法,只要是 public 方法都可以调用
    this.c1.selfMethod1();
    this.c2.selfMethod2();
  }

  public doSomething2(): void {
    this.c1.selfMethod1();
    this.c2.selfMethod2();
  }
}

abstract class Colleague {
  protected mediator: Mediator;

  protected constructor(_mediator: Mediator) {
    this.mediator = _mediator;
  }
}

class ConcreteColleague1 extends Colleague {
  // 通过构造函数传递中介者
  constructor(_mediator: Mediator) {
    super(_mediator);
  }

  // 自由方法 self-method
  public selfMethod1(): void {
    // 处理自己的业务逻辑
  }

  // 依赖方法 dep-method
  public depMethod1(): void {
    // 处理自己的业务逻辑
    // 自己不能处理的业务逻辑,委托给中介者处理
    this.mediator.doSomething1();
  }
}

class ConcreteColleague2 extends Colleague {
  // 通过构造函数传递中介者
  constructor(_mediator: Mediator) {
    super(_mediator);
  }

  // 自由方法 self-method
  public selfMethod2(): void {
    // 处理自己的业务逻辑
  }

  // 依赖方法 dep-method
  public depMethod2(): void {
    // 处理自己的业务逻辑
    // 自己不能处理的业务逻辑,委托给中介者处理
    this.mediator.doSomething2();
  }
}
