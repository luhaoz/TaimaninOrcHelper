import { app, BrowserWindow } from "electron"
import { Application } from "./core";
import { session } from 'electron';
import puppeteer from "puppeteer"
// app.disableHardwareAcceleration()
// app.commandLine.appendArgument("--disable-site-isolation-trials")
// console.log(Application.path().runtime)

console.log(Application.path().runtime)
app.setPath('userData', Application.path().runtime);
app.commandLine.appendSwitch('lang', 'ja')
app.commandLine.appendSwitch('disable-features', 'CalculateNativeWinOcclusion')
app.commandLine.appendSwitch('remote-debugging-port', '7072')
app.commandLine.appendSwitch('--auto-open-devtools-for-tabs')


    // ; (async () => {


    //     const page = await browser.pages();

    //     //   let _gamePage = null;
    //     //   for(const _page of page){
    //     //     await _page.setViewport({ width: 1345, height: 800 });
    //     //     const _url = await _page.url()
    //     //     console.log(_url);
    //     //     if (_url === "https://pc-play.games.dmm.co.jp/play/taimanin_rpgx/"){
    //     //         _gamePage = _page;
    //     //     }
    //     //   }
    //     //   await _gamePage!.mouse.click(560, 530, { delay: 1000 });


    // })();


const createWindow = async () => {
    const _mainWin = new BrowserWindow({
        title: "欧克很忙",
        useContentSize: true,
        height: 800,
        width: 1345,
        webPreferences: {
            backgroundThrottling: false
        }
    });


    //bgm405 bgm601s
    const _pacScript = `function FindProxyForURL(url, host) {
        const direct_list = [
            "pc-play.games.dmm.co.jp",
            "www.dmm.co.jp",
            "gtm.games.dmm.co.jp"
            "accounts.dmm.co.jp",
            "special.dmm.co.jp",
            "user-space.cdn.idcfcloud.net"
        ];
        for(const _domain of direct_list){
            if(dnsDomainIs(host, _domain)){
                return 'PROXY 127.0.0.1:10809';
            }
        }
        // return 'PROXY 127.0.0.1:10809';
        return  "DIRECT"
    }`;
    // return 'DIRECT';
    const _pacFile = 'data:text/plain;base64,' + Buffer.from(_pacScript, 'utf8').toString('base64')

    // _mainWin.webContents.session.setProxy({ pacScript: _pacFile });
    _mainWin.webContents.session.setProxy({ proxyRules: "http://127.0.0.1:10809" });
    _mainWin.loadURL("about:blank")
    _mainWin.webContents.on('did-frame-finish-load',  async (data) =>{

        const _current = _mainWin.webContents.getURL();
        if (_current === "about:blank"){
            const browser = await puppeteer.connect({
                browserURL: "http://127.0.0.1:7072",
                defaultViewport: null
            });
    
            const pages = await browser.pages();
            const _page = pages[0];


            _page.emulateTimezone('Asia/Tokyo');

            console.log(_page.goto("https://pc-play.games.dmm.co.jp/play/taimanin_rpgx/", ));
            _mainWin.webContents.openDevTools();
    
        }

        if (_current === "https://pc-play.games.dmm.co.jp/play/taimanin_rpgx/"){
             
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
        }
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