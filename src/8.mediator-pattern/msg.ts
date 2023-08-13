namespace Msg {
  // 中介者接口
  interface Mediator {
    sendMessage(message: string, user: User): void;
    addUser(user: User): void;
  }

// 具体中介者
  class ChatRoom implements Mediator {
    private users: User[] = [];

    addUser(user: User) {
      this.users.push(user);
    }

    sendMessage(message: string, user: User) {
      console.log(`服务端:[${user.getName()}] 发送消息: ${message}`);
      for (const u of this.users) {
        if (u !== user) {
          u.receive(message); // 调用其他用户的接收方法
        }
      }
    }
  }

// 用户类
  class User {
    private readonly name: string;
    private mediator: Mediator;

    constructor(name: string, mediator: Mediator) {
      this.name = name;
      this.mediator = mediator;
      this.mediator.addUser(this); // 注册用户到中介者
    }

    getName(): string {
      return this.name;
    }

    send(message: string) {
      console.log(`客户端:[${this.name}] 发送消息: ${message}`);
      this.mediator.sendMessage(message, this);
    }

    receive(message: string) {
      console.log(`客户端:[${this.name}] 收到消息: ${message}`);
    }
  }

// 创建中介者和用户
  const chatRoom = new ChatRoom();
  const user1 = new User("User1", chatRoom);
  const user2 = new User("User2", chatRoom);

// 用户发送消息
  user1.send("你好吗？");
  user2.send("我很好，谢谢！");

}
