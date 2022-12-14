# 抽象工厂模式（Abstract Factory Pattern）



## 女娲的失误

人是造出来了，世界也热闹了，可是低头一看，都是清一色的类型，缺少关爱、仇恨、喜怒哀乐等情绪，人类的生命太凭单了，女娲一想，猛然一拍脑袋，忘记给人类定义性别了，那怎么办？抹掉重来，于是人类经过一次大吸力，所有人中都消灭掉了，世界又空无一物，寂静而又寂寞。

由于女娲之前的准备工作话费了非常大的经历，比如准备黄土、八卦炉等，从头开始简历所有的事物也是不可能的，那就想在现有的条件下重新造人，尽可能旧物利用。人种（Product 产品类）应该怎么改造呢？怎么样才能让人类有爱有恨呢？定义互斥的性别，然后在每个个体中加入规则：异性相吸。

![1](../../assets/abstract-factory-pattern/1.png)

产品类分析完毕了，生产的工厂类（八卦炉）改怎么改造呢？只有一个生产设备，要么生产出来的全都是男性，要么都是女性。那不行呀，改造的目的是为了生产不同性别的人类。那就把目前已经有的生产设备——八卦炉拆开，于是女娲就使用了“八卦复制术”，吧原先的八卦炉一个变两个，并且略加修改，就成了女性八卦炉（只生产女性人种）和男性八卦炉（只生产男性人种），于是乎女娲就开始准备生产了。

![2](../../assets/abstract-factory-pattern/2.png)

这个类图虽然大，但是比较简单。一个借口，多个抽象类，然后是N个实现类，每个人中都有一个抽象类，性别是在各个实现类中实现的。特别需要说明的是 `HumanFactory` 接口，在这个接口中定义了三个方法，分别用来生产三个不同肤色的人种，也就是我们在上面看到的 Y 坐标，它的两个实现类分别是性别，也就是上面的 X 坐标。

- 人种的接口

```typescript
interface BasicHuman {
        // 每个人种都有颜色
        getColor(): void;
        // 人类会说话
        say(): void;
    }

interface Human extends BasicHuman{
    // 每个人都有性别
    getSex(): void;
}
```

人种有三个抽象类，负责人中的抽象属性定义。白色人种、黑色人种、黄色人种代码如下：

```typescript
abstract class AbstractWhiteHuman implements BasicHuman {
    getColor(): void {
        console.log(`白色人种的皮肤颜色是白色的！`);
    }

    say(): void {
        console.log(`白色人种会说话，一般说的都是单字节`);
    }
}

abstract class AbstractBlackHuman implements BasicHuman {
    getColor(): void {
        console.log(`黑色人种的皮肤颜色是黑色的！`);
    }

    say(): void {
        console.log(`黑人会说话, 一般人听不懂`);
    }
}

abstract class AbstractYellowHuman implements BasicHuman {
    getColor(): void {
        console.log(`黄色人种的皮肤颜色是黄色的！`);
    }

    say(): void {
        console.log(`黄色人种会说话，一般说的都是双字节`);
    }
}
```

每个抽象类都有两个实现类，分别实现公共的最细节、最具体的事物：肤色和语言。具体的实现类实现肤色、性别定义，以白色人种为例

```typescript
    class FemaleWhiteHuman extends AbstractWhiteHuman implements Human{
        getSex() {
            console.log("白人女性");
        }
    }

    class MaleWhiteHuman extends AbstractWhiteHuman implements Human {
        getSex() {
            console.log("白人男性");
        }
    }
```

其他人种代码类似，就不重复写了

- 八卦炉的定义

```typescript
 interface HumanFactory {
     createWhiteHuman(): Human;
     createYellowHuman(): Human;
     createBlackHuman(): Human;
 }
```

- 生产女性的八卦炉

```typescript
class FemaleFactory implements HumanFactory {
    public createYellowHuman(): Human {
        return new FemaleYellowHuman();
    }
    public createBlackHuman(): Human {
        return new FemaleBlackHuman();
    }
    public createWhiteHuman(): Human {
        return new FemaleWhiteHuman();
    }
}
```

- 生产男性的八卦炉

```typescript
class MaleFactory implements HumanFactory {
    public createYellowHuman(): Human {
        return new MaleYellowHuman();
    }
    public createBlackHuman(): Human {
        return new MaleBlackHuman();
    }
    public createWhiteHuman(): Human {
        return new MaleWhiteHuman();
    }
}
```

八卦炉有了，现在直接干活

```typescript
class NvWa {
    static main(): void {
        const maleHumanFactory = new MaleFactory();
        const femalteHumanFactory = new FemaleFactory();
        const maleWhiteHuman = maleHumanFactory.createWhiteHuman();
        maleWhiteHuman.say();
        maleWhiteHuman.getColor();
        maleWhiteHuman.getSex()
        const femaleWhiteHuman = femalteHumanFactory.createWhiteHuman();
        femaleWhiteHuman.say();
        femaleWhiteHuman.getColor();
        femaleWhiteHuman.getSex();
        // --- 后面省略
    }
}

NvWa.main();
```

输出结果：

```shell
白色人种会说话，一般说的都是单字节
白色人种的皮肤颜色是白色的！      
白人男性
白色人种会说话，一般说的都是单字节
白色人种的皮肤颜色是白色的！      
白人女性
```

## 抽象工厂模式的定义

抽象工厂模式（Abstract Factory Pattern） 是一种比较常用的模式，其定义如下：

**Provide an interface for creating families of related of dependent objects without specifying their concrete classes. (为创建一组相关或相互依赖的对象提供一个接口，而且无需指定它们的具体类)**

抽象工厂模式的通用类图：

![3](../../assets/abstract-factory-pattern/3.png)

抽象工厂模式是工厂方法模式的升级版本，在有多个业务品种、业务分类时，通过抽象工厂模式产生需要的对象是一种非常好的解决方式。我们来看看抽象工厂的通用源代码，首先有两个互相影响的产品线（也叫作产品族），例如制造汽车的左侧门和右侧门，这两个应该是数量相等的——两个对象之间的约束，每个信号的车门都是不一样的，这是产品等级结构约束的，我们先看看两个产品族的类图：

![4](../../assets/abstract-factory-pattern/4.png)

注意类图上的圈圈、框框相对应，两个抽象的产品类可以有关系，例如共同继承或实现一个抽象类或接口，其源代码如下：

```typescript
 // 抽象产品类
abstract class AbstractProductA {
    // 每个产品的共有方法
    shareMethod(): void {
        console.log(`我是iphone 14， 叹号屏, 1200尼特， A16+6G内存(DDR5), 4800万三摄， 最高1T`)
    }

    // 每个产品相同的方法，不同的实现
    abstract doSomething(): void;
}

abstract class AbstractProductB {
    // 每个产品的共有方法
    shareMethod(): void {
        console.log(`我是 iphone14, 刘海屏， 1000尼特， A15+6G内存(DDR4+), 1200万双摄， 最高512G`)
    }

    // 每个产品相同的方法，不同的实现
    abstract doSomething(): void;
}
```



两个具体的产品实现类：

```typescript
// 产品A1的实现类
class ProductA1 extends AbstractProductA {
    doSomething() {
        console.log(`我是 iphone 14 Pro Max 2778*1284， 255g手术级不锈钢`)
    }
}

// 产品A2的实现类
class ProductA2 extends AbstractProductA {
    doSomething() {
        console.log(`我是 iphone 14 Pro 2532*1170, 215g手术级不锈钢`)
    }
}

// 产品B1的实现类
class ProductB1 extends AbstractProductB {
    doSomething() {
        console.log(`我是 iphone 14, 2532*1170, 173g手术级不锈钢`)
    }
}

// 产品B2的实现类
class ProductB2 extends AbstractProductB {
    doSomething() {
        console.log(`我是 iphone 14 + ,2778*1284, 245g手术级不锈钢`)
    }
}
```



抽象工厂类 `AbstractCreator` 的职责是定义每个工厂要实现的功能，在通用代码中，抽象工厂类定义了两个产品族的产品创建。

```typescript
 // 抽象工厂类
abstract class AbstractCreator {
    // 创建A产品家族
    abstract createProductA(): AbstractProductA;
    // 创建B产品家族
    abstract createProductB(): AbstractProductB;
}
```



> 注意：有N个产品族，在抽象工厂类中就应该有N个创建方法。

如何创建一个产品，则是由具体的实现类来完成的， Creator1 和 Creator2:

```typescript
// 产品等级1的实现类
class Creator1 extends AbstractCreator {
    createProductA(): AbstractProductA {
        return new ProductA1();
    }
    createProductB(): AbstractProductB {
        return new ProductB1();
    }
}

// 产品等级2的实现类
class Creator2 extends AbstractCreator {
    createProductA(): AbstractProductA {
        return new ProductA2();
    }
    createProductB(): AbstractProductB {
        return new ProductB2();
    }
}
```



> 注意：有M个产品等级就应该有M个实现工厂类，在每个实现工厂中，实现不同产品族的生产任务。



在具体的业务中如何产生一个与实现类无关的对象呢：

```typescript
// 场景类
class Client {
    static main(): void {
        // 定义两个工厂
        const creator1 = new Creator1();
        const creator2 = new Creator2();
        // 产生 A1 对象
        const a1 = creator1.createProductA();
        // 产生 A2 对象
        const a2 = creator2.createProductA();
        // 产生 B1 对象
        const b1 = creator1.createProductB();
        // 产生 B2 对象
        const b2 = creator2.createProductB();
        /**
             * 然后看看我们生产出来的...iphone！
             */
        a1.shareMethod();
        a1.doSomething();
        console.log(`-----分割线----`)
        a2.shareMethod();
        a2.doSomething();
        console.log(`-----分割线----`)
        b1.shareMethod();
        b1.doSomething();
        console.log(`-----分割线----`)
        b2.shareMethod();
        b2.doSomething();
    }
}

Client.main();
```

结果如下：

```shell
我是iphone 14， 叹号屏, 1200尼特， A16+6G内存(DDR5), 4800万三摄， 最高1T
我是 iphone 14 Pro Max 2778*1284， 255g手术级不锈钢
-----分割线----
我是iphone 14， 叹号屏, 1200尼特， A16+6G内存(DDR5), 4800万三摄， 最高1T   
我是 iphone 14 Pro 2532*1170, 215g手术级不锈钢
-----分割线----
我是 iphone14, 刘海屏， 1000尼特， A15+6G内存(DDR4+), 1200万双摄， 最高512G
我是 iphone 14, 2532*1170, 173g手术级不锈钢
-----分割线----
我是 iphone14, 刘海屏， 1000尼特， A15+6G内存(DDR4+), 1200万双摄， 最高512G
我是 iphone 14 + ,2778*1284, 245g手术级不锈钢
```





在场景类中，没有任何一个方法与实现类有关系，对于一个产品来说，我们只要知道它的工厂方法就可以直接产生一个产品对象，无须关心它的实现类。





## 抽象工厂模式的应用

### 抽象工厂模式的优点

- 封装性，每个产品的实现类不是搞成模块要关心的，它要关心什么？是接口，是抽象，它不关心对象是如何创建出来，这由谁负责呢？工厂类，只要知道工厂类是谁，我就能创建出一个需要的对象，省时省力，优秀设计就应该如此。
- 产品族内的约束为非公开状态。例如生产男女比例的问题上，猜想女娲娘娘肯定是有自己的打算，不能让女生男衰，否则女性的优点不就体现不出来了吗？那在抽象工厂模式，就应该有这样的一个约束：没生产1个女性，就同时生产出1.2个男性，这样的生产过程对调用工厂类的高层模块来说就是透明的，它不需要知道这个约束，我就是要创建一个黄色男性产品就可以了，具体的产品族内的约束是在工厂内实现的。



### 抽象工厂模式的缺点

抽象工厂模式的最大缺点就是产品族的扩展非常困难，为什么这么说呢？我们以通过代码为例，如果要增加一个产品C，也就是说产品家族由原来的2个增加到3个，看看我们的程序有多大改动吧！抽象类 `AbstractCreator` 要增加一个方法 `createProductC()` ，然后两个实现类都要修改，想想看，这严重喂饭了开闭原则，而且我们一直说明抽象类和接口是一个契约。改变契约，所有与契约有关系的代码都需要修改，那么这段代码叫什么？ 叫“有毒代码”，——只要与这段代码有关系，就可能产生侵害性的危险！



### 抽象工厂模式的使用场景

抽象工厂模式的使用场景定义非常简单：一个对象族（或是一组没有任何关系的对象）都有相同的约束，则可以使用抽象工厂模式。什么意思呢？例如一个文本编辑器和一个图片处理器，都是软件实体，但是 *nix 下的文本编辑器和 Windows 下的文本编辑器虽然功能和界面都相同，但是代码实现是不同的，图片处理器也有类似的情况。也就是具有了共同的约束条件：操作系统类型。于是我们可以使用抽象工厂模式，产生不同操作系统下的编辑器和图片处理器。



### 抽象工厂模式的注意事项

在抽象工厂模式的缺点中，我们提到抽象工厂模式的产品族扩展比较困难，但是一定要清楚，是产品族扩展困难，而不是产品等级。在该模式下，产品等级非常容易扩展，增加一个产品等级，只要增加一个工厂类负责新增加出来的产品生产任务即可。也就是说横向扩展容易，纵向扩展困难。以人类为例子，产品等级中只有男、女两个性别，实现世界还有一种性别：双性人，既是男人也是女人（俗称阴阳人），那我们扩展这个产品等级也是非常容易的，增加三个产品类，分别对应不同的肤色，然后再创建一个工厂类，专门负责不同肤色的双性人的创建任务，完全通过扩展来实现需求的变更，从这一点上看，抽象工厂模式是符合开闭原则的。



## 小结

抽象工厂模式使用的场景非常多，例如一个应用，需要在三个不同的平台（Windows、Linux、Android）上运行，可以通过抽象工厂模式屏蔽掉操作系统对应用的影响。三个不同操作系统上的软件功能、应用逻辑、Ui都应该是非常类似的，唯一不同的是调用不同的工厂方法，由不同的产品类去处理与操作系统交互的信息。
