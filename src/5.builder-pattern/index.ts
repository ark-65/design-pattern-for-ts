namespace Part5Index {
  class Product {
    doSomething(): void {
      // 独立业务处理
    }
  }

  abstract class Builder {
    // 设置产品不同的部分，以获得不同的产品
    abstract setPart(): void
    // 建造产品
    abstract buildProduct(): Product
  }

  class ConcreteBuilder extends Builder {
    private product = new Product()
    // 设置产品零件
    setPart(): void {
      /*
       * 产品类内的逻辑处理
       */
    }

    buildProduct(): Product {
      return this.product
    }
  }

  class Director {
    private builder = new ConcreteBuilder()
    // 构建不同的产品
    getAProduct() {
      this.builder.setPart()
      /**
       * 设置不同的零件，产生不同的产品
       */
      return this.builder.buildProduct()
    }
  }
}
