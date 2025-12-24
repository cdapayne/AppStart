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

  // Set Content Security Policy to allow Google Fonts
  mainWindow.webContents.session.webRequest.onHeadersReceived((details, callback) => {
    callback({
      responseHeaders: {
        ...details.responseHeaders,
        'Content-Security-Policy': [
          "default-src 'self'; " +
          "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; " +
          "font-src 'self' https://fonts.gstatic.com; " +
          "script-src 'self' 'unsafe-inline'; " +
          "img-src 'self' data: https:; " +
          "connect-src 'self' https://api.openai.com https://platform.openai.com"
        ]
      }
    });
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
  
  // Load settings and configure OpenAI service
  const settings = database.getSettings();
  if (settings) {
    if (settings.openaiApiKey) {
      openaiService.setApiKey(settings.openaiApiKey);
    }
    if (settings.aiModel) {
      openaiService.setModel(settings.aiModel);
    }
    if (settings.reasoningEffort) {
      openaiService.setReasoningEffort(settings.reasoningEffort);
    }
    if (settings.outputVerbosity) {
      openaiService.setOutputVerbosity(settings.outputVerbosity);
    }
  }
}

// App lifecycle events
app.whenReady().then(async () => {
  await initialize();
  createWindow();
  
  // Set dock icon on macOS
  if (process.platform === 'darwin' && app.dock) {
    const iconPath = path.join(__dirname, '../assets/icon.png');
    app.dock.setIcon(iconPath);
  }

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
  
  // Update OpenAI service with new settings
  if (settings.openaiApiKey !== undefined) {
    openaiService.setApiKey(settings.openaiApiKey);
  }
  if (settings.aiModel !== undefined) {
    openaiService.setModel(settings.aiModel);
  }
  if (settings.reasoningEffort !== undefined) {
    openaiService.setReasoningEffort(settings.reasoningEffort);
  }
  if (settings.outputVerbosity !== undefined) {
    openaiService.setOutputVerbosity(settings.outputVerbosity);
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
  
  const webContents = event.sender;
  return await openaiService.generateAppPlan(projectData, webContents);
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

ipcMain.handle('openai:generatePitch', async (event, projectData) => {
  const settings = database.getSettings();
  if (!settings.openaiApiKey) {
    throw new Error('OpenAI API key not configured. Please set it in Settings.');
  }
  
  return await openaiService.generatePitch(projectData);
});

ipcMain.handle('openai:translateContent', async (event, content, targetLanguage, targetRegion) => {
  const settings = database.getSettings();
  if (!settings.openaiApiKey) {
    throw new Error('OpenAI API key not configured. Please set it in Settings.');
  }
  
  return await openaiService.translateContent(content, targetLanguage, targetRegion);
});

// --- Codex Integration ---
ipcMain.handle('codex:build', async (event, config) => {
  const { spawn } = require('child_process');
  const fs = require('fs');
  const path = require('path');
  
  const settings = database.getSettings();
  if (!settings.openaiApiKey) {
    throw new Error('OpenAI API key not configured. Please set it in Settings.');
  }
  
  return new Promise((resolve) => {
    try {
      const projectDir = path.join(config.outputDir, config.projectName);
      
      // Create project directory
      if (!fs.existsSync(projectDir)) {
        fs.mkdirSync(projectDir, { recursive: true });
      }
      
      // Create INSTRUCTIONS.md with the agent instructions
      const instructionsPath = path.join(projectDir, 'INSTRUCTIONS.md');
      const instructionsContent = `# ${config.appName}

## Project Overview
${config.appDescription || 'No description provided.'}

## Build Instructions

${config.instructions}
`;
      fs.writeFileSync(instructionsPath, instructionsContent, 'utf-8');
      
      // Create a codex prompt file
      const promptPath = path.join(projectDir, '.codex-prompt');
      fs.writeFileSync(promptPath, config.instructions, 'utf-8');
      
      // Try to run codex CLI
      const codexProcess = spawn('npx', [
        '@openai/codex',
        '--model', config.model || 'codex',
        '--approval-mode', 'full-auto',
        '--quiet',
        config.instructions.substring(0, 4000) // Limit prompt length
      ], {
        cwd: projectDir,
        env: {
          ...process.env,
          OPENAI_API_KEY: settings.openaiApiKey
        },
        shell: true
      });
      
      let output = '';
      let errorOutput = '';
      
      codexProcess.stdout.on('data', (data) => {
        output += data.toString();
        // Send progress to renderer
        if (mainWindow) {
          mainWindow.webContents.send('codex:progress', data.toString());
        }
      });
      
      codexProcess.stderr.on('data', (data) => {
        errorOutput += data.toString();
        // Also stream stderr so user can see conversation/errors
        if (mainWindow) {
          mainWindow.webContents.send('codex:progress', data.toString());
        }
      });
      
      codexProcess.on('close', (code) => {
        if (code === 0) {
          resolve({ success: true, output: output, projectDir: projectDir });
        } else {
          // If codex CLI fails, at least we created the instructions file
          resolve({ 
            success: true, 
            output: 'Codex CLI not available or failed. Instructions saved to ' + instructionsPath,
            projectDir: projectDir,
            instructionsOnly: true,
            error: errorOutput || 'Codex CLI exited with code ' + code
          });
        }
      });
      
      codexProcess.on('error', (err) => {
        // If codex is not installed, still save the instructions
        resolve({ 
          success: true, 
          output: 'Codex CLI not found. Instructions saved to ' + instructionsPath + '. Install with: npm install -g @openai/codex',
          projectDir: projectDir,
          instructionsOnly: true
        });
      });
      
      // Timeout after 5 minutes
      setTimeout(() => {
        codexProcess.kill();
        resolve({ 
          success: true, 
          output: 'Build timed out. Instructions saved to ' + instructionsPath,
          projectDir: projectDir,
          instructionsOnly: true
        });
      }, 300000);
      
    } catch (error) {
      resolve({ success: false, error: error.message });
    }
  });
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
    properties: ['openDirectory', 'createDirectory']
  });
  
  if (!result.canceled && result.filePaths.length > 0) {
    return result.filePaths[0];
  }
  return null;
});

ipcMain.handle('file:saveFile', async (event, filename, content) => {
  const result = await dialog.showSaveDialog(mainWindow, {
    defaultPath: filename,
    filters: [
      { name: 'Markdown', extensions: ['md'] },
      { name: 'Text', extensions: ['txt'] },
      { name: 'All Files', extensions: ['*'] }
    ]
  });
  
  if (!result.canceled && result.filePath) {
    const fs = require('fs');
    fs.writeFileSync(result.filePath, content, 'utf-8');
    return result.filePath;
  }
  return null;
});

ipcMain.handle('file:saveFileHtml', async (event, filename, content) => {
  const result = await dialog.showSaveDialog(mainWindow, {
    defaultPath: filename,
    filters: [
      { name: 'HTML', extensions: ['html'] },
      { name: 'All Files', extensions: ['*'] }
    ]
  });
  
  if (!result.canceled && result.filePath) {
    const fs = require('fs');
    fs.writeFileSync(result.filePath, content, 'utf-8');
    return result.filePath;
  }
  return null;
});

ipcMain.handle('file:openFile', async (event, filePath) => {
  const { shell } = require('electron');
  return shell.openExternal('file://' + filePath);
});

// --- Image Processing ---
ipcMain.handle('image:processIcon', async (event, sourcePath, outputDir, storeType, appName) => {
  const fs = require('fs');
  const path = require('path');
  const sharp = require('sharp');
  
  const requirements = StoreRequirements.getRequirements(storeType);
  if (!requirements || !requirements.icon || !requirements.icon.sizes) {
    return { success: false, error: 'No icon requirements found for this store' };
  }
  
  // Create output directory if it doesn't exist
  const iconDir = path.join(outputDir, 'icons', storeType);
  if (!fs.existsSync(iconDir)) {
    fs.mkdirSync(iconDir, { recursive: true });
  }
  
  const results = [];
  const safeName = appName.replace(/[^a-z0-9]/gi, '-').toLowerCase();
  
  for (const size of requirements.icon.sizes) {
    const outputFilename = `${safeName}-icon-${size.width}x${size.height}.png`;
    const outputPath = path.join(iconDir, outputFilename);
    
    try {
      await sharp(sourcePath)
        .resize(size.width, size.height, { fit: 'cover' })
        .png()
        .toFile(outputPath);
      
      results.push({
        size: `${size.width}x${size.height}`,
        name: size.name,
        path: outputPath,
        required: size.required
      });
    } catch (err) {
      console.error(`Failed to resize icon to ${size.width}x${size.height}:`, err);
    }
  }
  
  return { success: true, icons: results, sourceIcon: sourcePath };
});

ipcMain.handle('image:processScreenshots', async (event, sourcePaths, outputDir, storeType, appName, screenshotType) => {
  const fs = require('fs');
  const path = require('path');
  const sharp = require('sharp');
  
  const requirements = StoreRequirements.getRequirements(storeType);
  if (!requirements || !requirements.screenshots) {
    return { success: false, error: 'No screenshot requirements found for this store' };
  }
  
  // Determine target sizes based on screenshot type and store
  let targetSizes = [];
  const screenshots = requirements.screenshots;
  
  if (screenshotType === 'phone') {
    if (screenshots.iphone) targetSizes = targetSizes.concat(screenshots.iphone);
    if (screenshots.phone) targetSizes = targetSizes.concat(screenshots.phone);
    if (screenshots.mobile) targetSizes = targetSizes.concat(screenshots.mobile);
  } else if (screenshotType === 'tablet') {
    if (screenshots.ipad) targetSizes = targetSizes.concat(screenshots.ipad);
    if (screenshots.tablet7) targetSizes = targetSizes.concat(screenshots.tablet7);
    if (screenshots.tablet10) targetSizes = targetSizes.concat(screenshots.tablet10);
    if (screenshots.desktop) targetSizes = targetSizes.concat(screenshots.desktop);
  }
  
  // Fallback to generic sizes if none found
  if (targetSizes.length === 0 && screenshots.sizes) {
    targetSizes = screenshots.sizes;
  }
  
  // Create output directory
  const screenshotDir = path.join(outputDir, 'screenshots', storeType, screenshotType);
  if (!fs.existsSync(screenshotDir)) {
    fs.mkdirSync(screenshotDir, { recursive: true });
  }
  
  const results = [];
  const safeName = appName.replace(/[^a-z0-9]/gi, '-').toLowerCase();
  
  for (let i = 0; i < sourcePaths.length; i++) {
    const sourcePath = sourcePaths[i];
    const sourceResults = [];
    
    // Get source image dimensions
    const metadata = await sharp(sourcePath).metadata();
    const sourceWidth = metadata.width;
    const sourceHeight = metadata.height;
    const sourceAspectRatio = sourceWidth / sourceHeight;
    
    // Find best matching target size based on aspect ratio
    let bestMatch = targetSizes[0];
    let bestDiff = Infinity;
    
    for (const size of targetSizes) {
      const targetAspectRatio = size.width / size.height;
      const diff = Math.abs(sourceAspectRatio - targetAspectRatio);
      if (diff < bestDiff) {
        bestDiff = diff;
        bestMatch = size;
      }
    }
    
    // Resize to all relevant sizes
    for (const size of targetSizes) {
      const outputFilename = `${safeName}-${screenshotType}-${i + 1}-${size.width}x${size.height}.png`;
      const outputPath = path.join(screenshotDir, outputFilename);
      
      try {
        await sharp(sourcePath)
          .resize(size.width, size.height, { fit: 'cover', position: 'center' })
          .png()
          .toFile(outputPath);
        
        sourceResults.push({
          size: `${size.width}x${size.height}`,
          name: size.name,
          path: outputPath,
          required: size.required
        });
      } catch (err) {
        console.error(`Failed to resize screenshot to ${size.width}x${size.height}:`, err);
      }
    }
    
    results.push({
      source: sourcePath,
      resized: sourceResults
    });
  }
  
  return { success: true, screenshots: results };
});

ipcMain.handle('image:selectOutputDirectory', async () => {
  const result = await dialog.showOpenDialog(mainWindow, {
    properties: ['openDirectory', 'createDirectory'],
    title: 'Select Output Directory for Resized Images'
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
