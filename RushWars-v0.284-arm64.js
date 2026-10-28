//script by @pmdrkdv

const base = Process.getModuleByName('libg.so').base;

const Armceptor = {
    jumpout: function (addr, target) {
        Memory.patchCode(addr, 4, (code) => {
            const writer = new Arm64Writer(code, {
                pc: addr
            });

            writer.putBranchAddress(target);
            writer.flush();
        });
    },
    ret: function (addr) {
        Memory.patchCode(addr, 4, (code) => {
            const writer = new Arm64Writer(code, {
                pc: addr
            });

            writer.putRet();
            writer.flush();
        });
    },
    nop: function (addr) {
        Memory.patchCode(addr, 4, (code) => {
            const writer = new Arm64Writer(code, {
                pc: addr
            });

            writer.putNop();
            writer.flush();
        });
    },
    replace: function (address, newInsn) {
        Memory.protect(address, newInsn.length, 'rwx');
        address.writeByteArray(newInsn);
        Memory.protect(address, newInsn.length, 'rx');
    }
}

const ArhanKilled = {
    Init() {
        Armceptor.ret(base.add(0x28A358)); // AntiCheat::AntiHackFlags
        Armceptor.jumpout(base.add(0x210548), base.add(0x4EB874)); // g_createGameInstance -> GameMain::getInstance
        Armceptor.jumpout(base.add(0x241CD4), base.add(0x242B90)); // InputSystem::update
        Armceptor.jumpout(base.add(0x1031A0), base.add(0x104EB4)); // Messaging::connect
        Armceptor.jumpout(base.add(0xEA188), base.add(0xEAEDC)); // TcpSocket::create
        Armceptor.jumpout(base.add(0x503F44), base.add(0x5067B8)); // TcpSocket::read
        Armceptor.ret(base.add(0x2BCDA8)); // AntiCheat::AntiCheat
        Armceptor.ret(base.add(0x177EFC)); // AntiCheat::deepScanThreadFunc
    }
}
const ServerConnect = {
    init() {
        Interceptor.attach(Module.findGlobalExportByName('getaddrinfo'), {
            onEnter(args) {
                this.host = Memory.allocUtf8String("192.168.0.106")
                args[0] = this.host
                this.port = Memory.allocUtf8String("9339")
                args[1] = this.port
            }
        })
    }
}

const Messaging = {

    init() {
        this.socketChecks();
        this.reloadFix();
        this.skipClientHello();
        this.pepperKiller();
        this.sendPepperAuthentication();
        this.encryptAndWrite();
    },
    socketChecks() {
        Armceptor.nop(base.add(0x53EEE8));
        Armceptor.nop(base.add(0x53EEDC));
        Armceptor.nop(base.add(0x53EEFC));
        Armceptor.nop(base.add(0x53EF0C));
    },
    reloadFix() {
        Armceptor.nop(base.add(0x3EF1D8));
        Armceptor.nop(base.add(0x3EF1DC));
        Armceptor.nop(base.add(0x3EF1EC));
        Armceptor.nop(base.add(0x3EF1F0));
    },
    pepperKiller() {
        Armceptor.nop(base.add(0x184A30));
        Armceptor.nop(base.add(0x423418));
    },
    sendPepperAuthentication() {
        Interceptor.attach(base.add(0xD6EE0), {
            onEnter(args) {
                this.state = args[0].add(0x254);
                this.state.writeInt(5);
                args[2] = ptr(0);
            },
            onLeave() {
                this.state.writeInt(5)
            }
        });
    },
    skipClientHello() {
        Armceptor.jumpout(base.add(0x4CD3C4), base.add(0x4CD57C));
        Armceptor.jumpout(base.add(0x47205C), base.add(0xD6EE0));
        Armceptor.nop(base.add(0xD6F84));
        Armceptor.jumpout(base.add(0x59F298), base.add(0xBB7C0));
    },
    encryptAndWrite() {
        Interceptor.attach(base.add(0x514F38), {
            onEnter() {
                this.context.x0 = ptr(0x2774);
            }
        });
    }
}

function init() {
    ArhanKilled.Init();
    ServerConnect.init();
    Messaging.init();
}
setImmediate(init);
