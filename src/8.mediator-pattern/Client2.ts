import { getRandomNumberInRange } from '../utils';

namespace Client2 {
  /**
   * 抽象中介者
   */
  abstract class AbstractMediator {
    protected purchase: Purchase;
    protected sale: Sale;
    protected stock: Stock;

    constructor() {
      this.purchase = new Purchase(this);
      this.sale = new Sale(this);
      this.stock = new Stock(this);
    }

    // 中介者最重要的方法叫做事件方法,处理多个对象之间的关系
    public abstract execute(str: string, ...args: any[]): void;
  }

  /**
   * 具体中介者
   */
  class Mediator extends AbstractMediator {
    // 中介者最重要的方法
    public execute(str: string, ...args: any[]) {
      if (str === 'purchase.buy') {
        // 采购奶粉
        this.buyMilkPowder(args[0]);
      } else if (str === 'sale.sell') {
        // 销售奶粉
        this.sellMilkPowder(args[0])
      } else if (str === 'sale.offSale') {
        // 折价销售
        this.offSale()
      } else if (str === 'stock.clear') {
        // 清仓处理
        this.clearStock();
      }
    }

    private buyMilkPowder(num: number): void {
      const saleStatus = this.sale.getSaleStatus();
      if (saleStatus > 80) {
        // 销售状况良好
        console.log(`采购奶粉 ${num} 桶`);
        this.stock.increase(num);
      } else {
        // 销售状况不好
        const buyNumber = num >> 1;
        console.log(`采购奶粉 ${buyNumber} 桶`);
        this.stock.increase(buyNumber);
      }
    }

    // 销售奶粉
    private sellMilkPowder(num: number): void {
      if (this.stock.getStockNumber() < num) {
        // 库存数量不够销售
        console.log(`库存不够,继续采购`);
        this.purchase.buyMilkPowder(num);
      }
      this.stock.decrease(num);
    }

    // 折价处理
    private offSale(): void {
      console.log(`折价销售奶粉 ${this.stock.getStockNumber()} 桶`);
    }

    // 清仓
    private clearStock(): void {
      // 要求清仓销售
      this.sale.offSale();
      // 要求采购人员不要采购
      this.purchase.refuseBuyMilkPowder();
    }
  }

  /**
   * 抽象同事类
   */
  abstract class AbstractColleague {
    protected mediator: AbstractMediator;

    protected constructor(_mediator: AbstractMediator) {
      this.mediator = _mediator;
    }
  }

  /**
   * 采购管理
   */
  class Purchase extends AbstractColleague {
    constructor(_mediator: AbstractMediator) {
      super(_mediator);
    }

    // 采购奶粉
    public buyMilkPowder(num: number): void {
      this.mediator.execute('purchase.buy', num);
    }

    // 不再采购
    refuseBuyMilkPowder(): void {
      console.log(`不再采购奶粉`);
    }
  }

  /**
   * 库存管理
   */
  class Stock extends AbstractColleague {
    private static MILK_POWDER_NUMBER: number = 100;

    constructor(_mediator: AbstractMediator) {
      super(_mediator);
    }

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
      console.log(`清理存货数量为 ${Stock.MILK_POWDER_NUMBER}`);
      this.mediator.execute('stock.clear');
    }
  }

  /**
   * 销售管理
   */
  class Sale extends AbstractColleague {
    constructor(_mediator: AbstractMediator) {
      super(_mediator);
    }

    // 销售奶粉
    sellMilkPowder(num: number): void {
      console.log(`销售奶粉 ${num} 桶`);
      this.mediator.execute('sale.sell', num);
    }

    // 反馈销售情况, 0 ~ 100 之间变化,0 代表根本就没人买,100 代表非常畅销,出一个卖一个
    getSaleStatus(): number {
      const saleStatus: number = getRandomNumberInRange(0, 100);
      console.log(`奶粉的销售情况为: ${saleStatus}, 销售状况 ${saleStatus > 80 ? '良好': '不好'} *注:良好全量采购,不好半量采购`);
      return saleStatus;
    }

    // 折价处理
    offSale() {
      this.mediator.execute('sale.offSale');
    }
  }

  class Client {
    static main() {
      const mediator: AbstractMediator = new Mediator();
      // 采购人员采购奶粉
      console.log(`------------采购人员采购奶粉-----------`);
      const purchase: Purchase = new Purchase(mediator);
      purchase.buyMilkPowder(100);
      // 销售人员销售奶粉
      console.log(`------------销售人员销售奶粉-----------`);
      const sale: Sale = new Sale(mediator);
      const saleNumber: number = getRandomNumberInRange(0, 200);
      sale.sellMilkPowder(saleNumber);
      // 库房管理人员管理库存
      console.log(`------------库房管理人员清库处理-----------`);
      const stock: Stock = new Stock(mediator);
      stock.clearStock();
    }
  }

  Client.main();
}
