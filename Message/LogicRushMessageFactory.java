package Message;

import Message.Home.StartMissionMessage;
import Message.Keep.KeepAliveMessage;
import Message.Login.LoginMessage;

public class LogicRushMessageFactory {

    public static PiranhaMessage CreateMessageByType(int type) {
        switch (type) {
            case 10101:
                return new LoginMessage();
            case 10108:
                return new KeepAliveMessage();
            case 14104:
                return new StartMissionMessage();
            default:
                return null;
        }

    }
}
