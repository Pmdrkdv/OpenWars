package Logic;

import net.Stream.ByteStream;

public class LogicClientAvatar {
    public void Encode(ByteStream stream) {
        stream.WriteVLong(1);
        stream.WriteVLong(1);

        stream.WriteString("pmdrkdv");
        stream.WriteVInt(1);
        stream.WriteBoolean(true);
        stream.WriteVInt(1);//stars
        stream.WriteVInt(1);

        stream.WriteVInt(21);

        stream.WriteVInt(1);
        stream.WriteDataReference(5, 1);
        stream.WriteVInt(1337);

        stream.WriteVInt(0);
        stream.WriteVInt(0);
        stream.WriteVInt(0);

        stream.WriteVInt(1);
        stream.WriteDataReference(7, 1);
        stream.WriteVInt(4);

        stream.WriteVInt(0);
        stream.WriteVInt(0);
        stream.WriteVInt(0);
        stream.WriteVInt(0);
        stream.WriteVInt(0);
        stream.WriteVInt(0);
        stream.WriteVInt(0);
        stream.WriteVInt(0);

        stream.WriteVInt(32);
        stream.WriteDataReference(24, 0);
        stream.WriteVInt(1);
        stream.WriteDataReference(24, 1);
        stream.WriteVInt(1);
        stream.WriteDataReference(24, 2);
        stream.WriteVInt(1);
        stream.WriteDataReference(24, 3);
        stream.WriteVInt(1);
        stream.WriteDataReference(24, 4);
        stream.WriteVInt(1);
        stream.WriteDataReference(24, 5);
        stream.WriteVInt(1);
        stream.WriteDataReference(24, 6);
        stream.WriteVInt(1);
        stream.WriteDataReference(24, 7);
        stream.WriteVInt(1);
        stream.WriteDataReference(24, 8);
        stream.WriteVInt(1);
        stream.WriteDataReference(24, 9);
        stream.WriteVInt(1);
        stream.WriteDataReference(24, 10);
        stream.WriteVInt(1);
        stream.WriteDataReference(24, 11);
        stream.WriteVInt(1);
        stream.WriteDataReference(24, 12);
        stream.WriteVInt(1);
        stream.WriteDataReference(24, 13);
        stream.WriteVInt(1);
        stream.WriteDataReference(24, 14);
        stream.WriteVInt(1);
        stream.WriteDataReference(24, 15);
        stream.WriteVInt(1);
        stream.WriteDataReference(24, 16);
        stream.WriteVInt(1);
        stream.WriteDataReference(24, 17);
        stream.WriteVInt(1);
        stream.WriteDataReference(24, 18);
        stream.WriteVInt(1);
        stream.WriteDataReference(24, 19);
        stream.WriteVInt(1);
        stream.WriteDataReference(24, 20);
        stream.WriteVInt(1);
        stream.WriteDataReference(24, 21);
        stream.WriteVInt(1);
        stream.WriteDataReference(25, 0);
        stream.WriteVInt(1);
        stream.WriteDataReference(25, 1);
        stream.WriteVInt(1);
        stream.WriteDataReference(25, 2);
        stream.WriteVInt(1);
        stream.WriteDataReference(25, 3);
        stream.WriteVInt(1);
        stream.WriteDataReference(25, 4);
        stream.WriteVInt(1);
        stream.WriteDataReference(25, 5);
        stream.WriteVInt(1);
        stream.WriteDataReference(25, 6);
        stream.WriteVInt(1);
        stream.WriteDataReference(25, 7);
        stream.WriteVInt(1);
        stream.WriteDataReference(25, 8);
        stream.WriteVInt(1);
        stream.WriteDataReference(25, 9);
        stream.WriteVInt(1);

        stream.WriteVInt(0);
        stream.WriteVInt(0);
        stream.WriteVInt(0);
        stream.WriteVInt(0);
        stream.WriteVInt(0);
        stream.WriteVInt(0);
        stream.WriteVInt(0);

        stream.WriteVInt(1488);//gems
        stream.WriteVInt(5);
        stream.WriteVInt(0);
        stream.WriteVInt(2); //lvl
        stream.WriteVInt(0); //upgrade
        stream.WriteBoolean(true);
        stream.WriteBoolean(true);
        stream.WriteBoolean(false);//вроде бы кланы как в кое хз не буду чекать 

        stream.WriteVInt(50);
        stream.WriteVInt(100000000);
        stream.WriteVInt(9999999);
        stream.WriteVInt(0);
        stream.WriteVInt(0);
        stream.WriteVInt(0);
        stream.WriteVInt(0);
        stream.WriteVInt(0);
        stream.WriteVInt(0);
        stream.WriteVInt(0);
        stream.WriteVInt(0);
        stream.WriteVInt(0);
        stream.WriteVInt(0);
        stream.WriteVInt(0);
        stream.WriteVInt(0);
        stream.WriteVInt(0);

        stream.WriteDataReference(0);
        stream.WriteVInt(0);
    }
}
