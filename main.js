'use strict';

const {app, Menu, Tray, BrowserWindow, nativeImage} = require('electron');
const fs = require('fs');

const setWin = require("./setWin.json");
const path = require('path').join(__dirname, 'setWin.json');

let mainWindow = null;
let tray = null;

const icon = __dirname + '/icon.png';

app.on('window-all-closed', function () {
  if (process.platform != 'darwin')
    app.quit();
});

app.on('ready', function () {
    tray = new Tray(nativeImage.createFromPath(__dirname + "/icon.png"));

    // �^�X�N�g���C�ɉE�N���b�N���j���[��ǉ�
    var contextMenu = Menu.buildFromTemplate([
        { label: "�\��", click: function () { mainWindow.focus(); } },
        { label: "�I��", click: function () { mainWindow.close(); } }
    ]);
    tray.setContextMenu(contextMenu);

    // �^�X�N�g���C�̃c�[���`�b�v���A�v������
    tray.setToolTip(app.getName());

    // �^�X�N�g���C�����N���b�N���ꂽ�ꍇ�A�A�v���̃E�B���h�E���A�N�e�B�u��
    tray.on("clicked", function () {
        mainWindow.focus();
    });


  mainWindow = new BrowserWindow({
    width: 400,
    height: 60,
    maxWidth: 400,
    maxHeight: 80,
    minWidth: 150,
    minHeight: 60,
    resizable: true,
    frame: false,
    transparent: true,
    alwaysOnTop: true,
    skipTaskbar: true
   });

  mainWindow.loadURL('file://' + __dirname + '/app/index.html');

  mainWindow.setPosition(setWin["x"], setWin["y"]);
  mainWindow.setSize(setWin["width"], setWin["height"]);

  mainWindow.on('close', function () {
    let item = JSON.stringify(mainWindow.getBounds());
    fs.writeFile(path, item);;
  });

  mainWindow.on('closed', function () {
    mainWindow = null;
  });

});
