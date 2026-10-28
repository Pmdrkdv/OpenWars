package Message.Home;

import Message.PiranhaMessage;

public class StartMissionMessage extends PiranhaMessage{
     
    @Override
    public int getMessageType() {
        return 14104;
    }
}