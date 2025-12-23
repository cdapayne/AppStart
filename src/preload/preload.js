const { contextBridge, ipcRenderer } = require('electron');

// Expose protected methods to the renderer process
contextBridge.exposeInMainWorld('electronAPI', {
  // Settings
  getSettings: () => ipcRenderer.invoke('settings:get'),
  updateSettings: (settings) => ipcRenderer.invoke('settings:update', settings),
  validateApiKey: (apiKey) => ipcRenderer.invoke('settings:validate-api-key', apiKey),

  // Projects
  getAllProjects: () => ipcRenderer.invoke('projects:getAll'),
  getProject: (id) => ipcRenderer.invoke('projects:get', id),
  createProject: (projectData) => ipcRenderer.invoke('projects:create', projectData),
  updateProject: (id, projectData) => ipcRenderer.invoke('projects:update', id, projectData),
  deleteProject: (id) => ipcRenderer.invoke('projects:delete', id),
  duplicateProject: (id) => ipcRenderer.invoke('projects:duplicate', id),

  // Checklist
  getChecklist: (projectId) => ipcRenderer.invoke('checklist:get', projectId),
  updateChecklist: (projectId, checklist) => ipcRenderer.invoke('checklist:update', projectId, checklist),
  toggleChecklistItem: (projectId, itemIndex) => ipcRenderer.invoke('checklist:toggleItem', projectId, itemIndex),

  // Store Submissions
  getStoreSubmissions: (projectId) => ipcRenderer.invoke('stores:getSubmissions', projectId),
  createStoreSubmission: (projectId, storeType) => ipcRenderer.invoke('stores:createSubmission', projectId, storeType),
  updateStoreSubmission: (submissionId, data) => ipcRenderer.invoke('stores:updateSubmission', submissionId, data),
  deleteStoreSubmission: (submissionId) => ipcRenderer.invoke('stores:deleteSubmission', submissionId),
  getStoreRequirements: (storeType) => ipcRenderer.invoke('stores:getRequirements', storeType),
  getAllStoreRequirements: () => ipcRenderer.invoke('stores:getAllRequirements'),

  // OpenAI Integration
  generatePlan: (projectData) => ipcRenderer.invoke('openai:generatePlan', projectData),
  generateAdjustments: (projectData, adjustmentRequest) => ipcRenderer.invoke('openai:generateAdjustments', projectData, adjustmentRequest),
  generateStoreContent: (projectData, storeType) => ipcRenderer.invoke('openai:generateStoreContent', projectData, storeType),
  generateKeywords: (projectData) => ipcRenderer.invoke('openai:generateKeywords', projectData),
  generateTaglines: (projectData) => ipcRenderer.invoke('openai:generateTaglines', projectData),

  // File Operations
  selectImage: () => ipcRenderer.invoke('file:selectImage'),
  selectMultipleImages: () => ipcRenderer.invoke('file:selectMultipleImages'),
  selectVideo: () => ipcRenderer.invoke('file:selectVideo'),
  selectDirectory: () => ipcRenderer.invoke('file:selectDirectory'),

  // Window Controls
  minimizeWindow: () => ipcRenderer.invoke('window:minimize'),
  maximizeWindow: () => ipcRenderer.invoke('window:maximize'),
  closeWindow: () => ipcRenderer.invoke('window:close'),

  // App Info
  getVersion: () => ipcRenderer.invoke('app:getVersion'),
  getPlatform: () => ipcRenderer.invoke('app:getPlatform'),
});
