const { app, BrowserWindow, Menu, MenuItem } = require('electron')
const userDataPath = app.getPath('userData');
const { webContents } = require('electron')
const rootPath = require('electron-root-path').rootPath;
const path = require('path');
const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
const {Application} = require("./core/runtime");



app.setPath('userData', Application.path().runtime);
app.commandLine.appendSwitch('disable-site-isolation-trials')
let createWindow = ()=> {
    // 创建浏览器窗口
    const _mainWin = new BrowserWindow({
        title:"欧克很忙",
        width: 1060,
        height: 790,
        useContentSize:true,
        webPreferences: {   
            webSecurity:false,
            webviewTag: true,
            nodeIntegration: true
        }
    });

    let _menu = new Menu();
    _menu.append(new MenuItem({ 
        label: '设置代理', 
        click() {
            _proxy.show();
        } 
    }))


    //porxy
    const _proxy = new BrowserWindow({
        title:"设置代理",
        width: 300,
        height: 300,
        useContentSize:true,
        webPreferences: {
            webSecurity:false,
            webviewTag: true,
            nodeIntegration: true
        },
        show: false,
        parent:_mainWin
    }); 
    _proxy.removeMenu();
    _proxy.on('close',(event)=>{
        event.preventDefault();
        _proxy.hide();
    });
    _proxy.loadFile(path.join(Application.path().root,"electron","view","proxy.html"))





    // 并且为你的应用加载index.html
    //   win.loadFile('main.html')
    
    // 打开开发者工具
    _mainWin.webContents.openDevTools();
    _mainWin.setMenu(_menu);
    // win.webContents.on('new-window', (event, url, frameName, disposition, options) => {
    //     console.log(event, url, frameName, disposition, options)
    // })
    console.log(__dirname);
    _mainWin.webContents.session.setProxy({proxyRules:"socks5://127.0.0.1:10808"});
    _mainWin.loadURL("http://pc-play.games.dmm.co.jp/play/taimanin_rpgx/")
    // _mainWin.loadURL("https://panopticlick.eff.org/")
    // win.loadURL('https://www.baidu.com/');
    // win.loadFile(path.join(Application.path().root,"electron","view","proxy.html"))
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
        // win.webContents.executeJavaScript(`
        //     let _frame = document.getElementById('game_frame');
        //     console.log(_frame)
        //     let _window = _frame.contentDocument.getElementById('game_window')
        //     let _window_contentDocument = _window.contentDocument
        //     _window_contentDocument.querySelector('.webgl-frame').style.display = "none";
        // `);
    });


}

// Electron会在初始化完成并且准备好创建浏览器窗口时调用这个方法
// 部分 API 在 ready 事件触发后才能使用。
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