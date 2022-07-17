import { app, BrowserWindow } from "electron"
import { Application } from "./core";
import { session } from 'electron';

// app.disableHardwareAcceleration()
// app.commandLine.appendArgument("--disable-site-isolation-trials")
// console.log(Application.path().runtime)

console.log(Application.path().runtime)
app.setPath('userData', Application.path().runtime);
app.commandLine.appendSwitch('lang', 'ja')
app.commandLine.appendSwitch('disable-features', 'CalculateNativeWinOcclusion')
const createWindow = () => {
    const _mainWin = new BrowserWindow({
        title: "欧克很忙",
        useContentSize: true,
        height: 800,
        width: 1345,
        webPreferences: {
            backgroundThrottling: false
        }
    });
    _mainWin.webContents.openDevTools();



    const _pacScript = `function FindProxyForURL(url, host) {
        const direct_list = [
            // "cdn.syndication.twimg.com",
            "osapi.dmm.com",
            // ".i-mobile.co.jp",
            // ".cdn.idcfcloud.net",
            // "taimanin-rpg.com",
            // "fledge-asia.creativecdn.com",
        ];
        for(const _domain of direct_list){
            if(dnsDomainIs(host, _domain)){
                return 'DIRECT';
            }
        }
        return 'SOCKS5 127.0.0.1:7890';
    }`;

    const _pacFile = 'data:text/plain;base64,' + Buffer.from(_pacScript, 'utf8').toString('base64')

    _mainWin.webContents.session.setProxy({ pacScript: _pacFile });
    _mainWin.loadURL("https://pc-play.games.dmm.co.jp/play/taimanin_rpgx/")
    _mainWin.webContents.on('did-frame-finish-load', function (data) {
        _mainWin.webContents.insertCSS(`
       html, body {
           width:960;
           height:960;
           overflow: hidden;
       }
       .dmm-ntgnavi{
           display: none;
       }
       .area-naviapp{
           display: none;
       }
       #area-game{
           height:768px;
           overflow: hidden;
       }
       #foot{
           display: none;
       }
       .webgl-frame{
           display: none;
       }
   `)
    })


    
}

app.whenReady().then(createWindow)

//当所有窗口都被关闭后退出
app.on('window-all-closed', () => {
    // 在 macOS 上，除非用户用 Cmd + Q 确定地退出，
    // 否则绝大部分应用及其菜单栏会保持激活。
    if (process.platform !== 'darwin') {
        app.quit()
    }
})

app.on('activate', () => {
    // 在macOS上，当单击dock图标并且没有其他窗口打开时，
    // 通常在应用程序中重新创建一个窗口。
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow()
    }
})