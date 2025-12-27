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
      
      // Map models to Codex CLI compatible models
      // Codex CLI supports: gpt-5.1-codex, gpt-5.1-codex-max, gpt-5-codex, codex-mini-latest
      const codexModelMap = {
        'gpt-5.2': 'gpt-5.1-codex-max',
        'gpt-5': 'gpt-5.1-codex',
        'gpt-5-mini': 'gpt-5.1-codex-mini',
        'gpt-5-nano': 'codex-mini-latest',
        'o3': 'gpt-5.1-codex',
        'o4-mini': 'gpt-5.1-codex-mini',
        'o3-mini': 'codex-mini-latest',
        'gpt-4.1': 'gpt-5.1-codex',
        'gpt-4.1-mini': 'gpt-5.1-codex-mini',
        'gpt-4o': 'gpt-5-codex',
        'gpt-4o-mini': 'codex-mini-latest',
        'codex': 'gpt-5.1-codex'
      };
      const codexModel = codexModelMap[config.model] || config.model || 'gpt-5.1-codex';
      
      // Send progress about model
      if (mainWindow) {
        mainWindow.webContents.send('codex:progress', `🤖 Using Codex model: ${codexModel}\n`);
      }
      
      // Try to run codex CLI with correct arguments
      // Codex CLI: codex [OPTIONS] [PROMPT]
      // -m for model, --full-auto for automatic approval + sandboxed execution
      // -C to set working directory (though we also set cwd)
      const codexProcess = spawn('npx', [
        '@openai/codex',
        '-m', codexModel,
        '--full-auto',
        '-C', projectDir,
        'Read the INSTRUCTIONS.md file in this directory and implement all the steps described there. Create all necessary files and code.'
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

// Cloud Codex Build using OpenAI Chat API + GitHub API for commits
ipcMain.handle('codex:cloudBuild', async (event, config) => {
  const https = require('https');
  const settings = database.getSettings();
  
  if (!settings.openaiApiKey) {
    return { success: false, error: 'OpenAI API key not configured. Please set it in Settings.' };
  }
  
  if (!settings.githubToken) {
    return { success: false, error: 'GitHub token not configured. Please set it in Settings.' };
  }
  
  // Send progress updates
  const sendProgress = (message) => {
    if (mainWindow) {
      mainWindow.webContents.send('codex:progress', message + '\n');
    }
  };
  
  // Helper to make GitHub API requests
  const githubRequest = (method, path, body = null) => {
    return new Promise((resolve, reject) => {
      const options = {
        hostname: 'api.github.com',
        path: path,
        method: method,
        headers: {
          'Authorization': `Bearer ${settings.githubToken}`,
          'User-Agent': 'AppCreatorAtoZ',
          'Accept': 'application/vnd.github.v3+json',
          'Content-Type': 'application/json'
        }
      };
      
      const req = https.request(options, (res) => {
        let data = '';
        res.on('data', chunk => data += chunk);
        res.on('end', () => {
          try {
            resolve({ status: res.statusCode, data: data ? JSON.parse(data) : null });
          } catch (e) {
            resolve({ status: res.statusCode, data: data });
          }
        });
      });
      
      req.on('error', reject);
      if (body) req.write(JSON.stringify(body));
      req.end();
    });
  };
  
  // Helper to make OpenAI API requests
  const openaiRequest = (body) => {
    return new Promise((resolve, reject) => {
      const postData = JSON.stringify(body);
      const options = {
        hostname: 'api.openai.com',
        path: '/v1/chat/completions',
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${settings.openaiApiKey}`,
          'Content-Type': 'application/json',
          'Content-Length': Buffer.byteLength(postData)
        }
      };
      
      const req = https.request(options, (res) => {
        let data = '';
        res.on('data', chunk => data += chunk);
        res.on('end', () => {
          try {
            resolve({ status: res.statusCode, data: JSON.parse(data) });
          } catch (e) {
            reject(new Error('Failed to parse response'));
          }
        });
      });
      
      req.on('error', reject);
      req.setTimeout(300000, () => {
        req.destroy();
        reject(new Error('Request timed out'));
      });
      req.write(postData);
      req.end();
    });
  };

  try {
    sendProgress('🔄 Preparing cloud build request...');
    sendProgress(`📦 Repository: ${config.githubRepoName}`);
    
    // Parse repo owner and name
    const [owner, repo] = config.githubRepoName.split('/');
    if (!owner || !repo) {
      return { success: false, error: 'Invalid repository name format' };
    }
    
    // Step 1: Fetch current repository contents
    sendProgress('📂 Fetching repository structure...');
    const contentsResult = await githubRequest('GET', `/repos/${owner}/${repo}/contents`);
    
    let repoContext = '';
    if (contentsResult.status === 200 && Array.isArray(contentsResult.data)) {
      const files = contentsResult.data.map(f => `- ${f.path} (${f.type})`).join('\n');
      repoContext = `\n\nCurrent repository structure:\n${files}`;
      sendProgress(`📄 Found ${contentsResult.data.length} items in root`);
    }
    
    // Step 2: Generate code with OpenAI
    sendProgress('🤖 Generating code with AI...');
    
    // Map models - Codex models only work with Responses API, need chat-compatible models
    // For cloud builds, map codex models to their chat-compatible equivalents
    const cloudModelMap = {
      // Codex models -> Chat compatible equivalents
      'gpt-5.1-codex-max': 'gpt-5.2',
      'gpt-5.1-codex': 'gpt-5',
      'gpt-5.1-codex-mini': 'gpt-5-mini',
      'gpt-5-codex': 'gpt-5',
      'codex-mini-latest': 'gpt-5-nano',
      // Legacy mappings
      'codex': 'gpt-5',
      // Pass through chat-compatible models
      'gpt-5.2': 'gpt-5.2',
      'gpt-5': 'gpt-5',
      'gpt-5-mini': 'gpt-5-mini',
      'gpt-5-nano': 'gpt-5-nano',
      'gpt-4.1': 'gpt-4.1',
      'gpt-4o': 'gpt-4o',
      'gpt-4o-mini': 'gpt-4o-mini',
      'o3': 'o3',
      'o4-mini': 'o4-mini'
    };
    const model = cloudModelMap[config.model] || config.model || 'gpt-5';
    sendProgress(`🧠 Using model: ${model}`);
    
    // Check if using reasoning model (o-series or gpt-5 series need different handling)
    const isReasoningModel = model.startsWith('o1') || model.startsWith('o3') || model.startsWith('o4') || model.startsWith('gpt-5');
    
    const systemPrompt = `You are an expert software developer. Your task is to generate complete, working code for a project.

## Project Information
- **Repository**: ${config.githubRepoName}
- **Project Name**: ${config.appName}
- **Project Description**: ${config.appDescription || 'No description provided.'}

## Current Repository Structure
${repoContext || 'Empty repository'}

## Your Task
Analyze the project description and instructions carefully. Generate all necessary files to create a fully functional application that matches the description.

## Output Format
Respond ONLY with a valid JSON object (no markdown, no explanations):
{
  "files": [
    {
      "path": "path/to/file.ext",
      "content": "complete file content here",
      "action": "create"
    }
  ],
  "commit_message": "feat: Brief description of what was added",
  "summary": "Summary of the implementation"
}

## Important Guidelines
1. Generate COMPLETE, working code - not placeholders or TODOs
2. Include all necessary files (configs, dependencies, source code)
3. Follow best practices for the detected language/framework
4. Make sure the code is production-ready and well-structured`;

    // Build the user message with clear context
    const userMessage = `## Project Description
${config.appDescription || 'Build the application as described below.'}

## Implementation Instructions
${config.instructions}`;

    // Configure request based on model type
    // GPT-5 and reasoning models use max_completion_tokens, older models use max_tokens
    const usesNewTokenParam = model.startsWith('gpt-5') || model.startsWith('o1') || model.startsWith('o3') || model.startsWith('o4');
    
    const requestConfig = {
      model: model,
      messages: [
        { role: isReasoningModel ? 'user' : 'system', content: systemPrompt },
        { role: 'user', content: userMessage }
      ]
    };
    
    // Use correct token parameter based on model
    if (usesNewTokenParam) {
      requestConfig.max_completion_tokens = 16000;
    } else {
      requestConfig.max_tokens = 16000;
    }
    
    // Only add temperature for non-reasoning models
    if (!isReasoningModel) {
      requestConfig.temperature = 0.7;
    }

    const chatResult = await openaiRequest(requestConfig);
    
    if (chatResult.status !== 200) {
      const errorMsg = chatResult.data?.error?.message || 'API request failed';
      sendProgress(`\n❌ OpenAI Error: ${errorMsg}`);
      return { success: false, error: errorMsg };
    }
    
    const aiResponse = chatResult.data.choices?.[0]?.message?.content;
    if (!aiResponse) {
      return { success: false, error: 'No response from AI' };
    }
    
    sendProgress('📝 Parsing AI response...');
    
    // Parse the JSON response
    let codeChanges;
    try {
      // Try to extract JSON from the response (in case it's wrapped in markdown)
      let jsonStr = aiResponse;
      const jsonMatch = aiResponse.match(/```(?:json)?\s*([\s\S]*?)```/);
      if (jsonMatch) {
        jsonStr = jsonMatch[1];
      }
      codeChanges = JSON.parse(jsonStr.trim());
    } catch (parseError) {
      sendProgress('\n⚠️ AI response was not valid JSON. Showing raw response:');
      sendProgress('\n' + aiResponse.substring(0, 2000));
      return { success: false, error: 'Failed to parse AI response as JSON' };
    }
    
    if (!codeChanges.files || codeChanges.files.length === 0) {
      sendProgress('\n⚠️ No file changes generated');
      return { success: false, error: 'No file changes were generated' };
    }
    
    sendProgress(`\n✅ Generated ${codeChanges.files.length} file(s)`);
    codeChanges.files.forEach(f => sendProgress(`   📄 ${f.path}`));
    
    // Step 3: Commit files to GitHub
    if (config.autoCommit) {
      sendProgress('\n📤 Committing to GitHub...');
      
      // Get the default branch
      const repoResult = await githubRequest('GET', `/repos/${owner}/${repo}`);
      const defaultBranch = repoResult.data?.default_branch || 'main';
      
      // Get the current commit SHA
      const refResult = await githubRequest('GET', `/repos/${owner}/${repo}/git/refs/heads/${defaultBranch}`);
      if (refResult.status !== 200) {
        sendProgress('\n❌ Failed to get branch reference');
        return { success: false, error: 'Failed to get branch reference' };
      }
      const latestCommitSha = refResult.data.object.sha;
      
      // Get the tree SHA
      const commitResult = await githubRequest('GET', `/repos/${owner}/${repo}/git/commits/${latestCommitSha}`);
      const baseTreeSha = commitResult.data.tree.sha;
      
      // Create blobs for each file
      const treeItems = [];
      for (const file of codeChanges.files) {
        sendProgress(`   📝 Creating blob for ${file.path}...`);
        const blobResult = await githubRequest('POST', `/repos/${owner}/${repo}/git/blobs`, {
          content: Buffer.from(file.content).toString('base64'),
          encoding: 'base64'
        });
        
        if (blobResult.status !== 201) {
          sendProgress(`   ⚠️ Failed to create blob for ${file.path}`);
          continue;
        }
        
        treeItems.push({
          path: file.path,
          mode: '100644',
          type: 'blob',
          sha: blobResult.data.sha
        });
      }
      
      if (treeItems.length === 0) {
        return { success: false, error: 'Failed to create any file blobs' };
      }
      
      // Create tree
      sendProgress('   🌳 Creating tree...');
      const treeResult = await githubRequest('POST', `/repos/${owner}/${repo}/git/trees`, {
        base_tree: baseTreeSha,
        tree: treeItems
      });
      
      if (treeResult.status !== 201) {
        return { success: false, error: 'Failed to create tree' };
      }
      
      // Create commit
      sendProgress('   💾 Creating commit...');
      const newCommitResult = await githubRequest('POST', `/repos/${owner}/${repo}/git/commits`, {
        message: codeChanges.commit_message || `AppStart: ${config.appName} build`,
        tree: treeResult.data.sha,
        parents: [latestCommitSha]
      });
      
      if (newCommitResult.status !== 201) {
        return { success: false, error: 'Failed to create commit' };
      }
      
      // Update reference
      sendProgress('   🔄 Updating branch...');
      const updateRefResult = await githubRequest('PATCH', `/repos/${owner}/${repo}/git/refs/heads/${defaultBranch}`, {
        sha: newCommitResult.data.sha
      });
      
      if (updateRefResult.status !== 200) {
        return { success: false, error: 'Failed to update branch reference' };
      }
      
      const commitUrl = `https://github.com/${owner}/${repo}/commit/${newCommitResult.data.sha}`;
      sendProgress(`\n✅ Successfully committed to GitHub!`);
      sendProgress(`🔗 ${commitUrl}`);
      
      if (codeChanges.summary) {
        sendProgress(`\n📋 Summary: ${codeChanges.summary}`);
      }
      
      return {
        success: true,
        output: codeChanges.summary || 'Code generated and committed successfully',
        commitUrl: commitUrl
      };
      
    } else {
      // Just show what would be created
      sendProgress('\n📋 Generated files (not committed):');
      codeChanges.files.forEach(f => {
        sendProgress(`\n--- ${f.path} ---`);
        sendProgress(f.content.substring(0, 500) + (f.content.length > 500 ? '\n...(truncated)' : ''));
      });
      
      return {
        success: true,
        output: codeChanges.summary || 'Code generated successfully (not committed)',
        files: codeChanges.files
      };
    }
    
  } catch (error) {
    sendProgress('\n❌ Error: ' + error.message);
    return { success: false, error: error.message };
  }
});

// --- GitHub Integration ---
ipcMain.handle('github:validateToken', async (event, token) => {
  const https = require('https');
  
  return new Promise((resolve) => {
    const options = {
      hostname: 'api.github.com',
      path: '/user',
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'User-Agent': 'AppCreatorAtoZ',
        'Accept': 'application/vnd.github.v3+json'
      }
    };
    
    const req = https.request(options, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        if (res.statusCode === 200) {
          try {
            const user = JSON.parse(data);
            resolve({ valid: true, user: user.login });
          } catch (e) {
            resolve({ valid: false, error: 'Invalid response' });
          }
        } else {
          resolve({ valid: false, error: `HTTP ${res.statusCode}` });
        }
      });
    });
    
    req.on('error', (e) => {
      resolve({ valid: false, error: e.message });
    });
    
    req.end();
  });
});

ipcMain.handle('github:getUser', async () => {
  const https = require('https');
  const settings = database.getSettings();
  
  if (!settings.githubToken) {
    return { success: false, error: 'GitHub token not configured' };
  }
  
  return new Promise((resolve) => {
    const options = {
      hostname: 'api.github.com',
      path: '/user',
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${settings.githubToken}`,
        'User-Agent': 'AppCreatorAtoZ',
        'Accept': 'application/vnd.github.v3+json'
      }
    };
    
    const req = https.request(options, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        if (res.statusCode === 200) {
          try {
            const user = JSON.parse(data);
            resolve({ success: true, user: user });
          } catch (e) {
            resolve({ success: false, error: 'Invalid response' });
          }
        } else {
          resolve({ success: false, error: `HTTP ${res.statusCode}` });
        }
      });
    });
    
    req.on('error', (e) => {
      resolve({ success: false, error: e.message });
    });
    
    req.end();
  });
});

ipcMain.handle('github:createRepo', async (event, config) => {
  const https = require('https');
  const settings = database.getSettings();
  
  if (!settings.githubToken) {
    return { success: false, error: 'GitHub token not configured' };
  }
  
  return new Promise((resolve) => {
    // First, create the repository
    // GitHub limits description to 350 characters
    const truncatedDesc = (config.description || '').substring(0, 350);
    const repoData = JSON.stringify({
      name: config.name,
      description: truncatedDesc,
      private: config.private !== false,
      auto_init: config.initReadme
    });
    
    const createOptions = {
      hostname: 'api.github.com',
      path: '/user/repos',
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${settings.githubToken}`,
        'User-Agent': 'AppCreatorAtoZ',
        'Accept': 'application/vnd.github.v3+json',
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(repoData)
      }
    };
    
    const req = https.request(createOptions, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', async () => {
        if (res.statusCode === 201) {
          try {
            const repo = JSON.parse(data);
            
            // If addInstructions is true, create the INSTRUCTIONS.md file
            if (config.addInstructions && config.instructions) {
              await createGithubFile(
                settings.githubToken,
                repo.owner.login,
                repo.name,
                'INSTRUCTIONS.md',
                `# ${config.appName || config.name} - Build Instructions\n\n` +
                `This file contains AI agent instructions for building this project.\n\n` +
                `## Instructions\n\n${config.instructions}`
              );
            }
            
            resolve({ 
              success: true, 
              repoUrl: repo.html_url,
              repoName: repo.full_name,
              cloneCommand: `git clone ${repo.clone_url}`
            });
          } catch (e) {
            resolve({ success: false, error: 'Failed to parse response: ' + e.message });
          }
        } else {
          try {
            const errorData = JSON.parse(data);
            let errorMessage = errorData.message || `HTTP ${res.statusCode}`;
            
            // Provide helpful messages for common errors
            if (res.statusCode === 403 || errorMessage.includes('not accessible by personal access token')) {
              errorMessage = 'Token permission denied. Please ensure your GitHub token has the "repo" scope.\n\n' +
                'For Classic tokens: Enable the "repo" checkbox.\n' +
                'For Fine-grained tokens: Enable "Repository permissions" → "Administration" → "Read and write".\n\n' +
                'Generate a new token at: https://github.com/settings/tokens';
            } else if (res.statusCode === 401) {
              errorMessage = 'Invalid or expired GitHub token. Please check your token in Settings.';
            } else if (res.statusCode === 422 && errorData.errors) {
              // Handle validation errors (e.g., repo already exists)
              const errors = errorData.errors.map(e => e.message).join(', ');
              errorMessage = errors || errorMessage;
            }
            
            resolve({ success: false, error: errorMessage });
          } catch (e) {
            resolve({ success: false, error: `HTTP ${res.statusCode}` });
          }
        }
      });
    });
    
    req.on('error', (e) => {
      resolve({ success: false, error: e.message });
    });
    
    req.write(repoData);
    req.end();
  });
});

// Helper function to create a file in a GitHub repo
async function createGithubFile(token, owner, repo, path, content) {
  const https = require('https');
  
  return new Promise((resolve, reject) => {
    const fileData = JSON.stringify({
      message: `Add ${path}`,
      content: Buffer.from(content).toString('base64')
    });
    
    const options = {
      hostname: 'api.github.com',
      path: `/repos/${owner}/${repo}/contents/${path}`,
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${token}`,
        'User-Agent': 'AppCreatorAtoZ',
        'Accept': 'application/vnd.github.v3+json',
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(fileData)
      }
    };
    
    const req = https.request(options, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        if (res.statusCode === 201 || res.statusCode === 200) {
          resolve(JSON.parse(data));
        } else {
          reject(new Error(`Failed to create file: HTTP ${res.statusCode}`));
        }
      });
    });
    
    req.on('error', reject);
    req.write(fileData);
    req.end();
  });
}

ipcMain.handle('github:push', async (event, config) => {
  const { spawn } = require('child_process');
  const fs = require('fs');
  const path = require('path');
  const settings = database.getSettings();
  
  if (!settings.githubToken) {
    return { success: false, error: 'GitHub token not configured' };
  }
  
  return new Promise((resolve) => {
    try {
      const projectDir = config.projectDir;
      
      if (!fs.existsSync(projectDir)) {
        resolve({ success: false, error: 'Project directory does not exist' });
        return;
      }
      
      // Initialize git if not already
      const gitDir = path.join(projectDir, '.git');
      const commands = [];
      
      if (!fs.existsSync(gitDir)) {
        commands.push(['git', ['init']]);
        commands.push(['git', ['remote', 'add', 'origin', config.repoUrl]]);
      }
      
      commands.push(['git', ['add', '.']]);
      commands.push(['git', ['commit', '-m', config.message || 'Update from Codex']]);
      commands.push(['git', ['push', '-u', 'origin', 'main']]);
      
      let currentIndex = 0;
      
      function runNextCommand() {
        if (currentIndex >= commands.length) {
          resolve({ success: true });
          return;
        }
        
        const [cmd, args] = commands[currentIndex];
        const proc = spawn(cmd, args, {
          cwd: projectDir,
          env: {
            ...process.env,
            GIT_ASKPASS: 'echo',
            GIT_USERNAME: 'x-access-token',
            GIT_PASSWORD: settings.githubToken
          }
        });
        
        proc.on('close', (code) => {
          if (code === 0 || (cmd === 'git' && args[0] === 'init')) {
            currentIndex++;
            runNextCommand();
          } else {
            resolve({ success: false, error: `Command failed: ${cmd} ${args.join(' ')}` });
          }
        });
        
        proc.on('error', (err) => {
          resolve({ success: false, error: err.message });
        });
      }
      
      runNextCommand();
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
