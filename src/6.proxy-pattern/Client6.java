import java.lang.reflect.InvocationHandler;
import java.lang.reflect.Method;
import java.lang.reflect.Proxy;

interface IGamePlayer {
    // 登录游戏
    void login(String user, String password);

    // 打怪
    void killBoss();

    // 升级
    void upgrade();
}

class GamePlayer implements IGamePlayer {
    private String name = null;

    public GamePlayer(String _name) {
        this.name = _name;
    }

    @Override
    public void login(String user, String password) {
        System.out.println("登录名为" + user + "的用户" + this.name + "登录成功");
    }

    @Override
    public void killBoss() {
        System.out.println(this.name + "在打怪");
    }

    @Override
    public void upgrade() {
        System.out.println(this.name + "又升了一级!");
    }
}

class GamePlayerIH implements InvocationHandler {
    // 被代理者
    Class cls = null;

    // 被代理的实例
    Object obj = null;

    // 我要代理谁
    public GamePlayerIH(Object _obj) {
        this.obj = _obj;
    }

    @Override
    public Object invoke(Object proxy, Method method, Object[] args) throws Throwable {
        Object result = method.invoke(this.obj, args);
        return result;
    }
}

class Client6 {
    public static void main(String[] args) {
        // 定义一个玩家
        IGamePlayer player = new GamePlayer("张三");
        // 定义一个handler
        InvocationHandler handler = new GamePlayerIH(player);
        // 获得类的 class loader
        ClassLoader c1 = player.getClass().getClassLoader();
        // 动态产生一个代理者
        IGamePlayer proxy = (IGamePlayer) Proxy.newProxyInstance(c1, new Class[]{IGamePlayer.class}, handler);
        // 开始打游戏,记下时间戳
        System.out.println("开始时间是: 2022年10月02日22:55:51");
        // 登录
        proxy.login("zhangSan", "123456");
        // 打怪
        proxy.killBoss();
        // 升级
        proxy.upgrade();
        // 记录结束游戏时间
        System.out.println("结束时间是: 2022年10月02日22:57:07");
    }
}
