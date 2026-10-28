package Message.Login;

import Message.PiranhaMessage;

public class LoginOk extends PiranhaMessage {

    @Override
    public int getMessageType() {
       
        return 20104;
    }

    @Override
    public void encode() {
        stream.WriteInt(0);
        stream.WriteInt(1);
        stream.WriteInt(0);
        stream.WriteInt(1);
        stream.WriteString("jopa");
        stream.WriteString(null);
        stream.WriteString(null);
        stream.WriteVInt(0);
        stream.WriteVInt(0);
        stream.WriteVInt(0);
        stream.WriteVInt(0);
        stream.WriteString("dev");
        stream.WriteVInt(0);
        stream.WriteVInt(0);
        stream.WriteVInt(0);
        stream.WriteString(null);
        stream.WriteString(null);
        stream.WriteString(null);
        stream.WriteVInt(0);
        stream.WriteString(null);
        stream.WriteString(null);
        stream.WriteString(null);
        stream.WriteString(null);
        stream.WriteString(null);
        stream.WriteVInt(0);
        stream.WriteVInt(0);
        stream.WriteVInt(0);
        stream.WriteVInt(0);

    }

}
