class Emperor {
    private static emperor: Emperor;
    private count: number = 0;
    private constructor() {
    }
    // static 会将他挂载到类上  而不是实例上
    static getInstance(): Emperor {
        if (!this.emperor) {
            this.emperor = new Emperor();
        }
        return this.emperor;
    }

    say(): void {
        console.log(`爱卿平身`);
    }

    see(): void {
        this.count++;
        console.log(`你是朕见过的第${this.count}个臣子, 退下吧`);
    }
}

class Minister {
    emperor: Emperor;
    constructor(private name: string) {
        // 确定臣子的第一件事就是知道皇帝是谁
        this.emperor = Emperor.getInstance();
    }

    // 面见圣上
    formalVisit(): void {
        console.log(`臣 ${this.name},拜见陛下,吾皇万岁万岁万万岁`);
        this.emperor.say();
        this.emperor.see();
    }
}

const minister1 = new Minister('王钢蛋');
const minister2 = new Minister('张铁锤');
const minister3 = new Minister('赵四');

minister1.formalVisit();
minister3.formalVisit();
minister2.formalVisit();

// class Singleton {
//     private static singleton = new Singleton();
//     // 限制产生多个对象
//     private constructor() {
//     }
//     // 通过该方法获得实例对象
//     static getSingleton(): Singleton {
//         return this.singleton;
//     }
//     // 类中其他方法，尽量是 static
//     static doSomething(): void {
//         // 其他逻辑
//     }
// }

// class Singleton {
//     private static singleton: Singleton;
//     // 限制产生多个对象
//     private constructor() {
//     }
//     // 通过该方法获得实例对象
//     static getSingleton(): Singleton {
//         if (!this.singleton) {
//             this.singleton = new Singleton();
//         }
//         return this.singleton;
//     }
//     // 类中其他方法，尽量是 static
//     static doSomething(): void {
//         // 其他逻辑
//     }
// }

// const emperor = Emperor.getInstance();
// emperor.say();
// emperor.add();
//
// const emperor1 = Emperor.getInstance();
// emperor1.say();
// emperor1.add();
//
// const emperor2 = Emperor.getInstance();
// emperor2.say();
// emperor2.add();
//
//
// class Test1 {
//     print() {
//         console.log('test1');
//         const emperor = Emperor.getInstance();
//         emperor.say();
//         emperor.add();
//     }
// }
//
// class Test2 {
//     print() {
//         console.log('test2');
//         const emperor = Emperor.getInstance();
//         emperor.say();
//         emperor.add();
//     }
// }
//
// const test1 = new Test1();
// test1.print();
//
// const test2 = new Test2();
// test2.print();
