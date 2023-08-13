import {getRandomNumberInRange} from "../utils";

namespace Client1 {
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
}
