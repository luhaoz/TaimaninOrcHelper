import puppeteer from "puppeteer"

(async () => {
  const browser = await puppeteer.connect({
    browserURL: "http://127.0.0.1:7072",
    defaultViewport: null
});

  const page = await browser.pages();
  const _page = page[0];




  // 启用请求拦截
  await _page.setRequestInterception(true);

  // 监听请求事件
  _page.on('request', (request) => {
    console.log(`监控到目标请求：${request.url()}`);
    // 在这里检查请求是否是您要监控的请求
    if (request.url().includes('目标请求的URL部分')) {
     
      // 在这里可以执行适当的操作，例如记录请求或触发其他行为
    }

    // 允许请求继续
    request.continue();
  });

  // console.log(_page.url());
  // await _page.setViewport({ width: 1345, height: 800 });
  // _page.goto("https://pc-play.games.dmm.co.jp/play/taimanin_rpgx/", { waitUntil: "networkidle0" });
  // // let _gamePage = null;
  // // for(const _page of page){
  // //   await _page.setViewport({ width: 1345, height: 800 });
  // //   const _url = await _page.url()
  // //   console.log(_url);
  // //   if (_url === "https://pc-play.games.dmm.co.jp/play/taimanin_rpgx/"){
  // //       _gamePage = _page;
  // //   }
  // // }
  // // await _gamePage!.mouse.click(560, 530, { delay: 1000 });


})();