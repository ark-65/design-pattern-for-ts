namespace Many {
  class Emperor {
    // 定义最多能产生的实例数量
    private static maxNumOfEmperor = 2;
    // 每个皇帝都有名字，使用一个 数组 来容纳，每个对象的私有属性
    private static nameList: string[] = [];
    // 定义一个列表，容纳所有的皇帝实例
    private static emperorList: Emperor[] = [];
    // 当前皇帝的索引序号
    private static countNumOfEmperor = 0;
    // 产生所有的对象
    static {
      console.log(this.emperorList);
      this.emperorList.push(new Emperor('太上皇'));
      this.emperorList.push(new Emperor('皇帝'));
    }
    // 传入皇帝的名称，简历一个皇帝对象
    private constructor(name: string) {
      Emperor.nameList.push(name);
    }
    // 随机获取一个皇帝对象
    static getInstance(): Emperor {
      const random = Math.random();
      this.countNumOfEmperor = random < 0.5 ? 0 : 1;
      return this.emperorList[this.countNumOfEmperor];
    }
    // 皇帝发话了
    public static say(): void {
      console.log(this.nameList[this.countNumOfEmperor]);
    }
  }

  class Minister {
    public static main(): void {
      //
      const ministerNum = 5;
      for (let i = 0; i < ministerNum; i++) {
        const emperor = Emperor.getInstance();
        console.log(`第${i}个大臣拜见的是：`);
        // emperor.say();
        Emperor.say();
      }
    }
  }

  Minister.main();
}
