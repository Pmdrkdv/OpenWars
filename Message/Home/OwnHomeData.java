package Message.Home;

import Logic.LogicClientAvatar;
import Logic.LogicClientHome;
import Message.PiranhaMessage;

public class OwnHomeData extends PiranhaMessage {

   

    @Override
    public void encode() {
        new LogicClientHome().Encode(stream);
        new LogicClientAvatar().Encode(stream);
        stream.WriteVInt(0);
        stream.WriteVInt(0);
        stream.WriteVInt(0);
        stream.WriteVInt(1);
        stream.WriteVInt(0);
        stream.WriteBoolean(false);
    }

    @Override
    public int getMessageType() {
        return 24101;
    }
}
