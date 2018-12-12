// ExpressJS调用方式
require('chromedriver'); //导入chrome浏览器 driver
const express = require('express');
const debug = require('debug')('demo:server');
const http = require('http');
const log4js = require('log4js');
const logger = log4js.getLogger()
const {
  Builder,
  By,
  Key,
  until
} = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');

var app = express();
var port = 3016;

// 引入NodeJS的子进程模块
var child_process = require('child_process');

app.get('/*', async function(req, res){
    // 完整URL
    var url = req.protocol + '://'+ req.hostname + req.originalUrl;
    logger.info('---seo start:'+url);
    logger.info('req header: '+req.header('User-Agent'));
    //console.log('---seo start:'+url+' time:'+ new Date());
    // var url='http://www.kbjbuy.com'

    // 预渲染后的页面字符串容器
    var content = '';

    let driver = await new Builder().forBrowser('chrome').
    setChromeOptions(new chrome.Options().
    addArguments("--headless").
    addArguments("disable-infobars").
    addArguments("--disable-extensions").
    addArguments("--disable-gpu").
    addArguments("--disable-dev-shm-usage").
    addArguments("--no-sandbox").
    addArguments("start-maximized")).build();
  try {
    let capabilities = await driver.getCapabilities();
    capabilities['map_'].set('timeouts', { implicit: 4000 });
    await driver.get(url);
    content = await driver.getPageSource();
  } finally {
    await driver.quit();
    res.send(content);
  }
});

app.set('port', port);
var server = http.createServer(app);

server.listen(port);
server.on('error', onError);
server.on('listening', onListening);

/**
 * Event listener for HTTP server "error" event.
 */

function onError(error) {
    if (error.syscall !== 'listen') {
        throw error;
    }

    var bind = typeof port === 'string' ?
        'Pipe ' + port :
        'Port ' + port;

    // handle specific listen errors with friendly messages
    switch (error.code) {
        case 'EACCES':
            console.error(bind + ' requires elevated privileges');
            process.exit(1);
            break;
        case 'EADDRINUSE':
            console.error(bind + ' is already in use');
            process.exit(1);
            break;
        default:
            throw error;
    }
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
    console.log("services running on port " + port)
    var addr = server.address();
    var bind = typeof addr === 'string' ?
        'pipe ' + addr :
        'port ' + addr.port;
    debug('Listening on ' + bind);
}
