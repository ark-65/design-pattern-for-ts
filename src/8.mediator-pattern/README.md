# 中介者模式



## 进销存管理是这个样子的吗

大家都来自五湖四海，都要生存，于是都找到了个靠山——公司，就是给你发薪水的地方。公司要想尽办法盈利赚钱，盈利方法则不尽相同，但是各个公司都有相同的三个环节：采购、销售和库存。这个怎么说呢？比如我司，要开发软件，就需要购买开发环境，如云服务器、物理机、域名、代码托管等，这就是采购；开发完产品还要把产品推销出去；有产品就必然有库存，软件产品也有库存，虽然不需要占用库房空间，但也要占用硬盘，这也是库存。再比如做咨询服务的公司，它要采购什么？采购只是，采购经验，这是这类企业的生存之本，销售的也是只是和经验，库存同样是知识和经验。既然进销存是如此重要，我们今天来讲讲它的原理和设计，我相信很多人都已经开发过这种类型的软件，基本上都形成了固定套路，不管是单机版还是网络版，一般的做法都是通过数据库来完成相关产品的管理，相对来说这还是比较简单的项目，三个模块的示意如图：

![image-1](../../assets/mediator-pattern/1.png)

我们从这个示意图上可以看出，三个模块是相互依赖的。我们就以一个终端销售商（以服务最终客户为目标的企业，比如某某超市，某某商店等）为例，采购部门要采购 **四鹿奶粉（以下简称‘奶粉’）** ，它根据一下两个要素来决定采购数量。

- 销售情况

销售部门要反馈销售情况，畅销就多采购，滞销就不采购。

- 库存情况

即使是畅销产品，库存都有 1000 桶了，每天才卖出去 10 桶，也就不需要再采购了！

销售模块是企业的盈利核心，对其他两个模块也有影响：

1. 库存情况

库存有货，才能销售，空手套白狼是不行的（除了某夕夕）。

2. 督促采购

在特殊情况下，比如一个企业客户要一次性购买 100 桶作为年终福利，库存只有 80 桶，这是需要催促采购部门赶快采购！

同样地，库存管理也对其他两个模块有影响。库方式有容积限制的，不可能无限大，所以就有了清仓处理，那就要求采购部门停止采购，同时销售部门进行打折销售。

从以上分析来看，这三个模块都有自己的行为，并且与其他模块之间的行为产生关联，类似于我们办公室的同事，大家各干各的活，但是彼此之间还是有交叉的，于是彼此之间就产生紧耦合，也就是一个团队。我们先来实现这个进销存，类图如图。

![image-2](../../assets/mediator-pattern/2.png)

**Purchase** 负责采购管理，**buyMilkPowder** 指定了采购奶粉 ，**refuseBuyMilkPowder** 是指不再采购奶粉了。

```typescript
class Purchase {
  // 采购奶粉
  buyMilkPowder(num: number): void {
    // 访问库存
    const stock: Stock = new Stock();
    // 访问销售
    const sale: Sale = new Sale();
    // 奶粉销售情况
    const saleStatus: number = sale.getSaleStatus();
    if (saleStatus > 80) { // 销售情况良好
      console.log(`销售状况良好`)
      console.log(`采购奶粉 ${num} 桶`);
      stock.increase(num);
    } else { // 销售情况不好
      console.log(`销售状况不好`)
      // 折半采购(数量位 1,这样不会出现小数)
      const buyNumber: number = num >> 1;
      console.log(`采购奶粉 ${buyNumber} 桶`)
      stock.increase(buyNumber);
    }
  }

  // 不再采购
  refuseBuyMilkPowder(): void {
    console.log(`不再采购奶粉`);
  }
}
```

**Parchase** 定义了采购奶粉的标准：如果销售情况比较好，大于 80 分，你让我采购多少我就采购多少；销售情况不好，你让我采购 100 桶，我就采购 50 桶，对折采购。奶粉采购完毕，需要放到库房中，因此要调用库存的方法，增加库存奶粉数量。我们继续看库房 **Stock** 类：

````typescript
class Stock {
  // 刚开始有 100 桶奶粉
  private static MILK_POWDER_NUMBER: number = 100;

  // 库存增加
  increase(num: number): void {
    Stock.MILK_POWDER_NUMBER = Stock.MILK_POWDER_NUMBER + num;
    console.log(`库存数量为: ${Stock.MILK_POWDER_NUMBER}`);
  }

  // 库存降低
  decrease(num: number): void {
    Stock.MILK_POWDER_NUMBER = Stock.MILK_POWDER_NUMBER - num;
    console.log(`库存数量为: ${Stock.MILK_POWDER_NUMBER}`);
  }

  // 获取库存数量
  getStockNumber(): number {
    return Stock.MILK_POWDER_NUMBER;
  }

  // 库存压力大了,就要通知采购人员不要采购了,销售人员尽快销售
  clearStock() {
    const purchase: Purchase = new Purchase();
    const sale: Sale = new Sale();
    console.log(`清理存货数量为 ${Stock.MILK_POWDER_NUMBER}`);
    // 要求这家销售
    sale.offSale();
    // 要求采购人员不要采购
    purchase.refuseBuyMilkPowder();
  }
}
````



库房中的货物数量肯定有增减，同时库房还有一个容量显示，打到一定的容量后就要求对一些商品进行折价处理，以腾出更多的控件容纳新产品。于是就有了 `clearStock` 方法，既然是清仓处理肯定就要折价销售了。于是在 **Sale** 类中就有了 `offSale` 方法，我们来看 **Sale** 代码：

````typescript
class Sale {
  // 销售奶粉
  sellMilkPowder(num: number): void {
    console.log(`销售出单 ${num} 桶`);
    // 访问库存
    const stock: Stock = new Stock();
    // 访问采购
    const purchase: Purchase = new Purchase();
    // 库存数量不够销售
    if (stock.getStockNumber() < num) {
      console.log(`库存不够,继续采购`);
      purchase.buyMilkPowder(num);
    }
    console.log(`销售奶粉 ${num} 桶`);
    stock.decrease(num);
  }

  // 反馈销售情况, 0 ~ 100 之间变化,0 代表根本就没人买,100 代表非常畅销,出一个卖一个
  getSaleStatus(): number {
    const saleStatus: number = getRandomNumberInRange(0, 100);
    console.log(`奶粉的销售情况为: ${saleStatus}`);
    return saleStatus;
  }

  // 折价处理
  offSale() {
    // 库存有多少卖多少
    const stock: Stock = new Stock();
    console.log(`折价销售奶粉 ${stock.getStockNumber()} 桶`)
  }
}
````



**Sale** 类中的 `getSaleStatus` 是获得销售情况，这个当然要出现在 **Sale** 类中了。销售情况只有销售人员才能反馈出来，通过百分制的机制来衡量销售情况。我们再来看场景类怎么运行的

```typescript
class Client {
  static main() {
    // 采购人员采购奶粉
    console.log(`------------采购人员采购奶粉-----------`);
    const purchase: Purchase = new Purchase();
    purchase.buyMilkPowder(100);
    // 销售人员销售奶粉
    console.log(`------------销售人员销售奶粉-----------`);
    const sale: Sale = new Sale();
    const saleNumber: number = getRandomNumberInRange(0, 200);
    sale.sellMilkPowder(saleNumber);
    // 库房管理人员管理库存
    console.log(`------------库房管理人员清库处理-----------`);
    const stock: Stock = new Stock();
    stock.clearStock();
  }
}

Client.main();
```

我们在场景类中模拟了三种人员的活动：采购人员采购奶粉，销售人员销售奶粉，库管员管理库存。运行结果如下：

```
------------采购人员采购奶粉-----------
奶粉的销售情况为: 41
销售状况不好
采购奶粉 50 桶
库存数量为: 150
------------销售人员销售奶粉-----------
销售出单 158 桶
库存不够,继续采购
奶粉的销售情况为: 26
销售状况不好
采购奶粉 79 桶
库存数量为: 229
销售奶粉 158 桶
库存数量为: 71
------------库房管理人员清库处理-----------
清理存货数量为 71
折价销售奶粉 71 桶
不再采购奶粉
```

运行结果也是我们期望的，三个不同类型的参与者完成了各自的活动。你有没有发现这三个类是彼此关联的？每个类都与其他两个类产生了关联关系。*迪米特法则* 认为“每个类只和朋友类交流”，这个朋友类并非越多越好，朋友类越多，耦合性越大，要想修改一个就得修改一片，这不是面向对象设计所期望的，况且这还是仅三个模块的情况，属于比较简单的一个小项目，我们把进销存扩展一下，如图：

![image-3](../../assets/mediator-pattern/3.png)

这是一个蜘蛛网的结构，别说是编写程序了，就是给人看估计也能让一大批人昏倒！每个对象都需要和其他几个对象交流，对象越多，每个对象要交流的成本也就越大了，只是维护这些对象的交流就能让一大批程序员望而却步！从这方面来说，我们已经发现设计的缺陷了，当然，我们发现缺陷就要想办法修改。

大家都学过网络的基本知识，网络拓扑有三种类型：总线型、环型、星型。星型网络拓扑如图：

![image-4](../../assets/mediator-pattern/4.png)

在星型网络拓扑中，每个计算机通过交换机和其他计算机进行数据交换，各个计算机之间并没有直接出现交互的情况。这种结构简单，而且稳定，只要中间那个交换机不瘫痪，整个网络就不会发生大的故障。公司和网吧一般都采用星型网络。我们是不是可以把这种星型结构引入到我们的设计中呢？我们先画一个示意图：

![image-5](../../assets/mediator-pattern/5.png)

​                                                                                修改后的进销存示意图

加入了一个中介者作为三个模块的交流核心，每个模块之间不再相互交流，要交流就通过中介者进行。每个模块只负责自己的业务逻辑，不属于自己的则丢给中介者来处理，简化了各模块之间的耦合关系：

![image-6](../../assets/mediator-pattern/6.png)

建立了两个抽象类 **AbstractMediator** 和 **AbstractColleague** ，每个对象只是与中介者 **Mediator** 之间产生依赖，与其他对象之间没有直接关系， **AbstractMediator** 的作用是实现中介者的抽象定义，定义了一个抽象方法 `execute` ，正如 `修改后的进销存示意图` 