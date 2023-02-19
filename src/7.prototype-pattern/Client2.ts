import {generateRandomString} from "../utils";

namespace PrototypePatternClient2{
  interface Cloneable<T> {
    clone(): T
  }

  class AdvTemplate {
    // 广告信名称
    private advSubject: string = 'XX银行清明节信用卡抽奖活动';

    // 广告信内容
    private advContext: string = '清明节抽奖活动通知: 只要刷卡就送你 100 达不溜';

    // 取得公告信名称
    public getAdvSubject(): string {
      return this.advSubject;
    }

    // 取得广告信内容
    public getAdvContext(): string {
      return this.advContext;
    }
  }

  class Mail implements Cloneable<Mail>{
    // 收件人
    private _receiver: string;

    // 邮件名称
    private _subject: string;

    // 称谓
    private _appellation: string;

    // 邮件内容
    private _context: string;

    // 邮件的尾部,一般都是加上"XXX 版权所有"等信息
    private _tail: string;

    constructor(advTemplate: AdvTemplate) {
      this._context = advTemplate.getAdvContext();
      this._subject = advTemplate.getAdvSubject();
    }


    clone(): Mail {
      let mail: Mail = null;
      // es5
      mail = Object.create(this)
      // es6
      // let mail = {};
      // mail = Object.setPrototypeOf(mail, this);
      return mail;
    }


    get receiver(): string {
      return this._receiver;
    }

    set receiver(value: string) {
      this._receiver = value;
    }

    get subject(): string {
      return this._subject;
    }

    set subject(value: string) {
      this._subject = value;
    }

    get appellation(): string {
      return this._appellation;
    }

    set appellation(value: string) {
      this._appellation = value;
    }

    get context(): string {
      return this._context;
    }

    set context(value: string) {
      this._context = value;
    }

    get tail(): string {
      return this._tail;
    }

    set tail(value: string) {
      this._tail = value;
    }
  }

  class Client {
    // 发送账单的数量,这个值是从数据库中获得
    private static MAX_COUNT: number = 6;
    static main(): void {
      // 模拟发送邮件
      let i: number = 0;
      // 把模板定义出来,这个是从数据库中获得
      const mail = new Mail(new AdvTemplate());
      mail.tail = 'XX 银行版权所有';
      while (i < this.MAX_COUNT) {
        // 以下是每封邮件不同的地方
        const cloneMail = mail.clone();
        cloneMail.appellation = `${generateRandomString(5)} 先生(女士)`
        cloneMail.receiver = `${generateRandomString(5)}@${generateRandomString(8)}.com`;
        // 然后发送邮件
        sendMail(cloneMail);
        i++;
      }
    }
  }

  function sendMail(mail: Mail) {
    console.log(`标题: ${mail.subject} \t 收件人: ${mail.receiver} \t ...发送成功`);
  }

  Client.main();
}
