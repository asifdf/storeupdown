const { app, BrowserWindow, Menu, shell, dialog } = require('electron');
const path = require('path');
const isDev = require('electron-is-dev');

let mainWindow;

function createWindow() {
  // 메인 윈도우 생성
  mainWindow = new BrowserWindow({
    width: 1400,
    height: 900,
    minWidth: 800,
    minHeight: 600,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      enableRemoteModule: false,
      webSecurity: true,
    },
    icon: path.join(__dirname, 'assets/icon.png'), // 아이콘 (선택사항)
    titleBarStyle: 'default',
    show: false, // 로딩 완료 후 표시
  });

  // React 앱 로드
  const startUrl = isDev 
    ? 'http://localhost:3000' 
    : `file://${path.join(__dirname, '../build/index.html')}`;
  
  mainWindow.loadURL(startUrl);

  // 윈도우가 준비되면 표시
  mainWindow.once('ready-to-show', () => {
    mainWindow.show();
    
    // 개발 모드에서는 DevTools 열기
    if (isDev) {
      mainWindow.webContents.openDevTools();
    }
  });

  // 윈도우가 닫힐 때
  mainWindow.on('closed', () => {
    mainWindow = null;
  });

  // 외부 링크는 기본 브라우저에서 열기
  mainWindow.webContents.setWindowOpenHandler(({ url }) => {
    shell.openExternal(url);
    return { action: 'deny' };
  });

  // 메뉴 설정
  createMenu();
}

function createMenu() {
  const template = [
    {
      label: 'UpDown',
      submenu: [
        {
          label: 'About UpDown',
          click: () => {
            dialog.showMessageBox(mainWindow, {
              type: 'info',
              title: 'About UpDown',
              message: 'UpDown 마켓플레이스',
              detail: '구매자 중심의 중고거래 경매 플랫폼\n버전: 1.0.0'
            });
          }
        },
        { type: 'separator' },
        {
          label: 'Quit',
          accelerator: process.platform === 'darwin' ? 'Cmd+Q' : 'Ctrl+Q',
          click: () => {
            app.quit();
          }
        }
      ]
    },
    {
      label: 'View',
      submenu: [
        { role: 'reload' },
        { role: 'forceReload' },
        { role: 'toggleDevTools' },
        { type: 'separator' },
        { role: 'resetZoom' },
        { role: 'zoomIn' },
        { role: 'zoomOut' },
        { type: 'separator' },
        { role: 'togglefullscreen' }
      ]
    },
    {
      label: 'Window',
      submenu: [
        { role: 'minimize' },
        { role: 'close' }
      ]
    }
  ];

  // macOS 메뉴 조정
  if (process.platform === 'darwin') {
    template[0].label = app.getName();
    template[0].submenu.unshift({
      label: 'About ' + app.getName(),
      role: 'about'
    });
  }

  const menu = Menu.buildFromTemplate(template);
  Menu.setApplicationMenu(menu);
}

// 앱이 준비되면 윈도우 생성
app.whenReady().then(createWindow);

// 모든 윈도우가 닫혔을 때
app.on('window-all-closed', () => {
  // macOS에서는 앱이 활성화되어 있어도 윈도우가 모두 닫힐 수 있음
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  // macOS에서 독 아이콘 클릭 시 윈도우 재생성
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

// 보안 설정
app.on('web-contents-created', (event, contents) => {
  contents.on('new-window', (navigationEvent, newUrl) => {
    navigationEvent.preventDefault();
    shell.openExternal(newUrl);
  });
});

// 개발 모드 감지
console.log('Electron running in', isDev ? 'development' : 'production', 'mode');
