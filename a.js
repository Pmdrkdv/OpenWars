// Clash of Clans v11 ARM64 — static offset port, not device-verified.
const Settings = {
    globalLib: null
}

function init() {
    Settings.globalLib = 'libg.so'

    Patch.ret(0x4E0900); // AntiHack flags

    Patch.jump(0x5465C0, 0x133A68); // g_createGameInstance
    Patch.jump(0x5B029C, 0x5CB750); // GameMain constructor
    Patch.jump(0x10B8B0, 0x10C90C); // InputSystem::update
    Patch.jump(0x4303E8, 0x43128C); // TcpSocket::create
    Patch.jump(0x46C0A4, 0x46E2C8); // TcpSocket::read
   Patch.jump(0x51C760, 0x51E3D8);
    Patch.jump(0x755354, 0x756170); // LoginMessage::decode
    Patch.jump(0x565178, 0x566400); // LoginMessage::encode
    Patch.ret(0x71C4CC); // AntiCheat constructor
    Patch.ret(0x61FDBC); // thread callback

    Interceptor.attach(Module.findGlobalExportByName('getaddrinfo'), {
        onEnter(args) {
            this.host = Memory.allocUtf8String('192.168.0.106')
            args[0] = this.host
            this.port = Memory.allocUtf8String('9339')
            args[1] = this.port
        }
    })



    Server.Messaging.socketChecks([0x4DA234, 0x4DA23C, 0x4DA250, 0x4DA25C])
    Server.Messaging.reloadFix([0x670118, 0x67011C, 0x67012C, 0x670130])
    Server.Messaging.pepperKiller([0x301A5C, 0x4EA6EC])
    Server.Messaging.sendPepperAuthentication(0x43B98C, 0x254, 5)
    Server.Messaging.encryptAndWrite(0x32A0CC, 0x2774)
    Process.getModuleByName(Settings.globalLib).base.add(0xDA7979).writeUtf8String("ReversedOfClans");
}

const Patch = {
    jump(OFFSET, JUMP) {
        const base = Process.getModuleByName(Settings.globalLib).base
        const address = base.add(OFFSET)
        Memory.patchCode(address, 4, code => {
            const writer = new Arm64Writer(code, { pc: address })
            writer.putBranchAddress(base.add(JUMP))
            writer.flush()
        })
    },
    nop(OFFSET) {
        const address = Process.getModuleByName(Settings.globalLib).base.add(OFFSET)
        Memory.patchCode(address, 4, code => {
            const writer = new Arm64Writer(code, { pc: address })
            writer.putNop()
            writer.flush()
        })
    },
    ret(OFFSET) {
        const address = Process.getModuleByName(Settings.globalLib).base.add(OFFSET)
        Memory.patchCode(address, 4, code => {
            const writer = new Arm64Writer(code, { pc: address })
            writer.putRet()
            writer.flush()
        })
    },
    retZero(OFFSET) {
        const address = Process.getModuleByName(Settings.globalLib).base.add(OFFSET)
        Memory.patchCode(address, 8, code => {
            const writer = new Arm64Writer(code, { pc: address })
            writer.putInstruction(0x52800000) // MOV W0, #0
            writer.putRet()
            writer.flush()
        })
    },
    export(NAME, TYPE) {
        Interceptor.replace(Module.findGlobalExportByName(NAME), new NativeCallback(function () {
            return TYPE
        }, 'int', []))
    }
}

const Server = {
    Messaging: {
        socketChecks(OFFSETS) {
            OFFSETS.forEach(OFFSET => Patch.nop(OFFSET))
        },
        reloadFix(OFFSETS) {
            OFFSETS.forEach(OFFSET => Patch.nop(OFFSET))
        },
        pepperKiller(OFFSETS) {
            OFFSETS.forEach(OFFSET => Patch.nop(OFFSET))
        },
        sendPepperAuthentication(OFFSET, ADD, INT) {
            Interceptor.attach(Process.getModuleByName(Settings.globalLib).base.add(OFFSET), {
                onEnter(args) {
                    this.a1 = args[0]
                    this.a1.add(ADD).writeInt(INT)
                    args[1] = args[2]
                },
                onLeave() {
                    this.a1.add(ADD).writeInt(INT)
                }
            })
        },
        skipClientHello(){
            
        }
        encryptAndWrite(OFFSET, PTR) {
            Interceptor.attach(Process.getModuleByName(Settings.globalLib).base.add(OFFSET), {
                onEnter() {
                    this.context.x0 = ptr(PTR)
                }
            })
        }
    }
}

setImmediate(init)
