const { app, BrowserWindow, ipcMain, dialog, shell } = require('electron');
const path = require('path');
const Database = require('../database/database');
const OpenAIService = require('../main/services/openai-service');
const StoreRequirements = require('../main/services/store-requirements');

// Keep a global reference of the window object
let mainWindow;
let database;
let openaiService;

function createWindow() {
  // Create the browser window
  mainWindow = new BrowserWindow({
    width: 1400,
    height: 900,
    minWidth: 1000,
    minHeight: 700,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      preload: path.join(__dirname, '../preload/preload.js')
    },
    titleBarStyle: 'hiddenInset',
    frame: process.platform === 'darwin' ? true : true,
    backgroundColor: '#0f172a',
    show: false,
    icon: path.join(__dirname, '../assets/icon.png')
  });

  // Load the index.html
  mainWindow.loadFile(path.join(__dirname, '../renderer/index.html'));

  // Show window when ready
  mainWindow.once('ready-to-show', () => {
    mainWindow.show();
  });

  // Open external links in default browser
  mainWindow.webContents.setWindowOpenHandler(({ url }) => {
    shell.openExternal(url);
    return { action: 'deny' };
  });

  // Emitted when the window is closed
  mainWindow.on('closed', () => {
    mainWindow = null;
  });

  // Open DevTools in development
  if (process.env.NODE_ENV === 'development') {
    mainWindow.webContents.openDevTools();
  }
}

// Initialize the application
async function initialize() {
  // Initialize database
  database = new Database();
  
  // Initialize OpenAI service (will be configured when API key is set)
  openaiService = new OpenAIService();
  
  // Load API key from settings if available
  const settings = database.getSettings();
  if (settings && settings.openaiApiKey) {
    openaiService.setApiKey(settings.openaiApiKey);
  }
}

// App lifecycle events
app.whenReady().then(async () => {
  await initialize();
  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('before-quit', () => {
  if (database) {
    database.close();
  }
});

// ==================== IPC HANDLERS ====================

// --- Settings ---
ipcMain.handle('settings:get', () => {
  return database.getSettings();
});

ipcMain.handle('settings:update', (event, settings) => {
  const result = database.updateSettings(settings);
  
  // Update OpenAI service if API key changed
  if (settings.openaiApiKey !== undefined) {
    openaiService.setApiKey(settings.openaiApiKey);
  }
  
  return result;
});

ipcMain.handle('settings:validate-api-key', async (event, apiKey) => {
  return await openaiService.validateApiKey(apiKey);
});

// --- Projects ---
ipcMain.handle('projects:getAll', () => {
  return database.getAllProjects();
});

ipcMain.handle('projects:get', (event, id) => {
  return database.getProject(id);
});

ipcMain.handle('projects:create', (event, projectData) => {
  return database.createProject(projectData);
});

ipcMain.handle('projects:update', (event, id, projectData) => {
  return database.updateProject(id, projectData);
});

ipcMain.handle('projects:delete', (event, id) => {
  return database.deleteProject(id);
});

ipcMain.handle('projects:duplicate', (event, id) => {
  return database.duplicateProject(id);
});

// --- Checklist ---
ipcMain.handle('checklist:get', (event, projectId) => {
  return database.getChecklist(projectId);
});

ipcMain.handle('checklist:update', (event, projectId, checklist) => {
  return database.updateChecklist(projectId, checklist);
});

ipcMain.handle('checklist:toggleItem', (event, projectId, itemIndex) => {
  return database.toggleChecklistItem(projectId, itemIndex);
});

// --- Store Submissions ---
ipcMain.handle('stores:getSubmissions', (event, projectId) => {
  return database.getStoreSubmissions(projectId);
});

ipcMain.handle('stores:createSubmission', (event, projectId, storeType) => {
  return database.createStoreSubmission(projectId, storeType);
});

ipcMain.handle('stores:updateSubmission', (event, submissionId, data) => {
  return database.updateStoreSubmission(submissionId, data);
});

ipcMain.handle('stores:deleteSubmission', (event, submissionId) => {
  return database.deleteStoreSubmission(submissionId);
});

ipcMain.handle('stores:getRequirements', (event, storeType) => {
  return StoreRequirements.getRequirements(storeType);
});

ipcMain.handle('stores:getAllRequirements', () => {
  return StoreRequirements.getAllRequirements();
});

// --- OpenAI Integration ---
ipcMain.handle('openai:generatePlan', async (event, projectData) => {
  const settings = database.getSettings();
  if (!settings.openaiApiKey) {
    throw new Error('OpenAI API key not configured. Please set it in Settings.');
  }
  
  return await openaiService.generateAppPlan(projectData);
});

ipcMain.handle('openai:generateAdjustments', async (event, projectData, adjustmentRequest) => {
  const settings = database.getSettings();
  if (!settings.openaiApiKey) {
    throw new Error('OpenAI API key not configured. Please set it in Settings.');
  }
  
  return await openaiService.generateAdjustments(projectData, adjustmentRequest);
});

ipcMain.handle('openai:generateStoreContent', async (event, projectData, storeType) => {
  const settings = database.getSettings();
  if (!settings.openaiApiKey) {
    throw new Error('OpenAI API key not configured. Please set it in Settings.');
  }
  
  return await openaiService.generateStoreContent(projectData, storeType);
});

ipcMain.handle('openai:generateKeywords', async (event, projectData) => {
  const settings = database.getSettings();
  if (!settings.openaiApiKey) {
    throw new Error('OpenAI API key not configured. Please set it in Settings.');
  }
  
  return await openaiService.generateKeywords(projectData);
});

ipcMain.handle('openai:generateTaglines', async (event, projectData) => {
  const settings = database.getSettings();
  if (!settings.openaiApiKey) {
    throw new Error('OpenAI API key not configured. Please set it in Settings.');
  }
  
  return await openaiService.generateTaglines(projectData);
});

// --- File Operations ---
ipcMain.handle('file:selectImage', async () => {
  const result = await dialog.showOpenDialog(mainWindow, {
    properties: ['openFile'],
    filters: [
      { name: 'Images', extensions: ['jpg', 'jpeg', 'png', 'gif', 'webp'] }
    ]
  });
  
  if (!result.canceled && result.filePaths.length > 0) {
    return result.filePaths[0];
  }
  return null;
});

ipcMain.handle('file:selectMultipleImages', async () => {
  const result = await dialog.showOpenDialog(mainWindow, {
    properties: ['openFile', 'multiSelections'],
    filters: [
      { name: 'Images', extensions: ['jpg', 'jpeg', 'png', 'gif', 'webp'] }
    ]
  });
  
  if (!result.canceled && result.filePaths.length > 0) {
    return result.filePaths;
  }
  return [];
});

ipcMain.handle('file:selectVideo', async () => {
  const result = await dialog.showOpenDialog(mainWindow, {
    properties: ['openFile'],
    filters: [
      { name: 'Videos', extensions: ['mp4', 'mov', 'avi', 'webm'] }
    ]
  });
  
  if (!result.canceled && result.filePaths.length > 0) {
    return result.filePaths[0];
  }
  return null;
});

ipcMain.handle('file:selectDirectory', async () => {
  const result = await dialog.showOpenDialog(mainWindow, {
    properties: ['openDirectory']
  });
  
  if (!result.canceled && result.filePaths.length > 0) {
    return result.filePaths[0];
  }
  return null;
});

// --- Window Controls ---
ipcMain.handle('window:minimize', () => {
  mainWindow.minimize();
});

ipcMain.handle('window:maximize', () => {
  if (mainWindow.isMaximized()) {
    mainWindow.unmaximize();
  } else {
    mainWindow.maximize();
  }
});

ipcMain.handle('window:close', () => {
  mainWindow.close();
});

// --- App Info ---
ipcMain.handle('app:getVersion', () => {
  return app.getVersion();
});

ipcMain.handle('app:getPlatform', () => {
  return process.platform;
});
