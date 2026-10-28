

// Rush Wars
// 0.2.284 ARMv8
// Frida 17.24.3
// /home/fmznk/0.2.284_ARMv8.js

const Settings = {
    globalLib: null
}

function init() {
    Settings.globalLib = 'libg.so'

    Patch.export("openat", -1)
    Patch.ret(0x28A358) /* AntiCheat::AntiHackFlags */
    Patch.jump(0x210548, 0x4EB874) /* g_createGameInstance -> GameMain::getInstance */
   // Patch.jump(0x1AE68C, 0x1B3E10) /* GameMain::GameMain */
    Patch.jump(0x241CD4, 0x242B90) /* InputSystem::update */
    Patch.jump(0x1031A0, 0x104EB4) /* Messaging::connect */
    Patch.jump(0xEA188, 0xEAEDC) /* TcpSocket::create */
    Patch.jump(0x503F44, 0x5067B8) /* TcpSocket::read */
    Patch.ret(0x2BCDA8) /* AntiCheat::AntiCheat */
    Patch.ret(0x177EFC) /* AntiCheat::deepScanThreadFunc */


    Interceptor.attach(Module.findGlobalExportByName('getaddrinfo'), {
        onEnter(args) {
            this.host = Memory.allocUtf8String('192.168.0.106')
            args[0] = this.host
            this.port = Memory.allocUtf8String('9339')
            args[1] = this.port
        }
    })

    Server.Messaging.socketChecks([0x53EEE8, 0x53EEDC, 0x53EEFC, 0x53EF0C])
    Server.Messaging.reloadFix([0x3EF1D8, 0x3EF1DC, 0x3EF1EC, 0x3EF1F0])
    Patch.jump(0x4CD3C4, 0x4CD57C)
    Patch.jump(0x47205C, 0xD6EE0)
    Patch.nop(0xD6F84)
    Patch.jump(0x59F298, 0xBB7C0)
    Server.Messaging.pepperKiller([0x184A30, 0x423418])
    Server.Messaging.sendPepperAuthentication(0xD6EE0, 0x254, 5)
    Server.Messaging.encryptAndWrite(0x514F38, 0x2774)
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
                    this.state = args[0].add(ADD)
                    this.state.writeInt(INT)
                    args[2] = ptr(0)
                },
                onLeave() {
                    this.state.writeInt(INT)
                }
            })
        },
        encryptAndWrite(OFFSET, PTR) {
            Interceptor.attach(Process.getModuleByName(Settings.globalLib).base.add(OFFSET), {
                onEnter() {
                    this.context.x0 = ptr(PTR)
                }
            })
        }
    }
}


const Patch = {
    jump(OFFSET, JUMP) {
        Memory.patchCode(Process.getModuleByName(Settings.globalLib).base.add(OFFSET), Process.pageSize, (code) => {
            const writer = new Arm64Writer(code, {
                pc: Process.getModuleByName(Settings.globalLib).base.add(OFFSET)
            })
            writer.putBranchAddress(Process.getModuleByName(Settings.globalLib).base.add(JUMP))
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
        Memory.patchCode(Process.getModuleByName(Settings.globalLib).base.add(OFFSET), Process.pageSize, (code) => {
            const writer = new Arm64Writer(code, {
                pc: Process.getModuleByName(Settings.globalLib).base.add(OFFSET)
            })
            writer.putRet()
            writer.flush()
        })
    },

    export(NAME, TYPE) {
        Interceptor.replace(Module.findGlobalExportByName(NAME), new NativeCallback(function () {
            return TYPE
        }, 'int', []))
    },
}


setImmediate(init)
