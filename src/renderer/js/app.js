/**
 * App Creator A to Z - Main Application JavaScript
 * A comprehensive desktop application for designing and creating apps
 */

// ==================== State Management ====================
const AppState = {
  currentPage: 'dashboard',
  currentProject: null,
  projects: [],
  settings: null,
  storeRequirements: null,
  isLoading: false,
};

// ==================== Categories Data ====================
const Categories = {
  'Games': [
    'Action', 'Adventure', 'Arcade', 'Board', 'Card', 'Casino', 'Casual',
    'Educational', 'Family', 'Music', 'Puzzle', 'Racing', 'Role Playing',
    'Simulation', 'Sports', 'Strategy', 'Trivia', 'Word'
  ],
  'Business': [
    'Analytics', 'CRM', 'Communication', 'E-commerce', 'Finance', 'HR',
    'Marketing', 'Operations', 'Project Management', 'Sales'
  ],
  'Education': [
    'Books', 'Courses', 'Kids', 'Languages', 'Reference', 'Test Prep',
    'Tutoring', 'Universities'
  ],
  'Entertainment': [
    'Books', 'Comics', 'Live Events', 'Movies', 'Music', 'News',
    'Podcasts', 'Social', 'Streaming', 'TV'
  ],
  'Finance': [
    'Banking', 'Budgeting', 'Cryptocurrency', 'Insurance', 'Investing',
    'Payment', 'Tax', 'Trading'
  ],
  'Health & Fitness': [
    'Diet', 'Exercise', 'Medical', 'Mental Health', 'Nutrition',
    'Sleep', 'Tracking', 'Wellness', 'Yoga'
  ],
  'Lifestyle': [
    'Dating', 'Events', 'Family', 'Fashion', 'Food', 'Home',
    'Parenting', 'Pets', 'Shopping', 'Travel'
  ],
  'Photo & Video': [
    'Camera', 'Editing', 'Effects', 'Filters', 'Gallery',
    'Sharing', 'Video Editing', 'Video Recording'
  ],
  'Productivity': [
    'Calendar', 'Document', 'Email', 'Notes', 'Organization',
    'PDF', 'Scanner', 'Task Management', 'Time Tracking'
  ],
  'Social Networking': [
    'Chat', 'Community', 'Dating', 'Forums', 'Microblogging',
    'Photo Sharing', 'Professional', 'Video Chat'
  ],
  'Utilities': [
    'Battery', 'Calculator', 'Cleaner', 'File Manager', 'Flashlight',
    'Keyboard', 'Launcher', 'Security', 'VPN', 'Weather', 'Widgets'
  ],
  'Developer Tools': [
    'API Testing', 'Code Editor', 'Database', 'Debugging', 'Design',
    'Documentation', 'Git', 'IDE', 'Terminal', 'Testing'
  ]
};

const Markets = [
  { id: 'north-america', name: 'North America', icon: '🌎' },
  { id: 'europe', name: 'Europe', icon: '🌍' },
  { id: 'asia-pacific', name: 'Asia Pacific', icon: '🌏' },
  { id: 'latin-america', name: 'Latin America', icon: '🌎' },
  { id: 'middle-east', name: 'Middle East', icon: '🌍' },
  { id: 'africa', name: 'Africa', icon: '🌍' },
  { id: 'global', name: 'Global', icon: '🌐' }
];

const MonetizationOptions = [
  { id: 'free', name: 'Free', description: 'No cost to download or use', icon: '🆓' },
  { id: 'paid', name: 'Paid', description: 'One-time purchase to download', icon: '💰' },
  { id: 'subscription', name: 'Subscription', description: 'Recurring payment for access', icon: '🔄' },
  { id: 'freemium', name: 'Freemium', description: 'Free with in-app purchases', icon: '⭐' },
  { id: 'ads', name: 'Ad-Supported', description: 'Free with advertisements', icon: '📺' }
];

const Stores = [
  { id: 'apple', name: 'Apple App Store', icon: '🍎', platforms: ['iOS', 'iPadOS', 'macOS'] },
  { id: 'google', name: 'Google Play Store', icon: '🤖', platforms: ['Android'] },
  { id: 'amazon', name: 'Amazon Appstore', icon: '📦', platforms: ['Android', 'Fire OS'] },
  { id: 'microsoft', name: 'Microsoft Store', icon: '🪟', platforms: ['Windows'] },
  { id: 'linux', name: 'Linux (Snap/Flatpak)', icon: '🐧', platforms: ['Linux'] },
  { id: 'xbox', name: 'Xbox Store', icon: '🎮', platforms: ['Xbox'] },
  { id: 'steam', name: 'Steam', icon: '🎯', platforms: ['Windows', 'macOS', 'Linux'] }
];

// ==================== Initialization ====================
document.addEventListener('DOMContentLoaded', async () => {
  await initializeApp();
});

async function initializeApp() {
  showLoading('Initializing App Creator A to Z...');
  
  try {
    // Load settings
    AppState.settings = await window.electronAPI.getSettings();
    
    // Apply theme
    applyTheme(AppState.settings?.theme || 'dark');
    
    // Update API status indicator
    updateApiStatus();
    
    // Load projects
    await loadProjects();
    
    // Load store requirements
    AppState.storeRequirements = await window.electronAPI.getAllStoreRequirements();
    
    // Get app version
    const version = await window.electronAPI.getVersion();
    document.getElementById('app-version').textContent = 'v' + version;
    
    // Navigate to dashboard
    navigateTo('dashboard');
    
  } catch (error) {
    console.error('Initialization error:', error);
    showToast('Failed to initialize application', 'error');
  } finally {
    hideLoading();
  }
}

// ==================== Navigation ====================
function navigateTo(page, data = null) {
  AppState.currentPage = page;
  
  // Update active nav link
  document.querySelectorAll('[data-page]').forEach(el => {
    el.classList.remove('nav-link-active');
    el.classList.add('nav-link');
  });
  
  const activeLink = document.querySelector('[data-page="' + page + '"]');
  if (activeLink) {
    activeLink.classList.remove('nav-link');
    activeLink.classList.add('nav-link-active');
  }
  
  // Update page title
  const titles = {
    'dashboard': 'Dashboard',
    'new-project': 'Create New Project',
    'project-view': data?.name || 'Project',
    'project-planning': 'AI Planning',
    'project-checklist': 'Development Checklist',
    'project-adjustments': 'Make Adjustments',
    'project-distribution': 'Distribution',
    'store-submission': 'Store Submission',
    'settings': 'Settings'
  };
  document.getElementById('page-title').textContent = titles[page] || 'App Creator A to Z';
  
  // Render page content
  const content = document.getElementById('content');
  
  switch (page) {
    case 'dashboard':
      renderDashboard(content);
      break;
    case 'new-project':
      renderNewProject(content);
      break;
    case 'project-view':
      renderProjectView(content, data);
      break;
    case 'project-planning':
      renderProjectPlanning(content, data);
      break;
    case 'project-checklist':
      renderProjectChecklist(content, data);
      break;
    case 'project-adjustments':
      renderProjectAdjustments(content, data);
      break;
    case 'project-distribution':
      renderProjectDistribution(content, data);
      break;
    case 'store-submission':
      renderStoreSubmission(content, data);
      break;
    case 'settings':
      renderSettings(content);
      break;
    default:
      content.innerHTML = '<p>Page not found</p>';
  }
}

// ==================== Dashboard ====================
function renderDashboard(container) {
  const projects = AppState.projects;
  
  container.innerHTML = ''+
    '<div class="max-w-7xl mx-auto animate-fade-in">' +
      '<!-- Welcome Section -->' +
      '<div class="card p-8 mb-8 bg-gradient-to-r from-primary-900/50 to-accent-900/50 border-none">' +
        '<div class="flex items-center justify-between">' +
          '<div>' +
            '<h2 class="text-3xl font-bold mb-2">Welcome to <span class="gradient-text">App Creator A to Z</span></h2>' +
            '<p class="text-surface-400 text-lg">Your AI-powered companion for creating amazing applications</p>' +
          '</div>' +
          '<button onclick="navigateTo(\'new-project\')" class="btn-primary text-lg px-8 py-4">' +
            '<span class="flex items-center gap-2">' +
              '<svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">' +
                '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />' +
              '</svg>' +
              'New Project' +
            '</span>' +
          '</button>' +
        '</div>' +
      '</div>' +
      
      '<!-- Stats Grid -->' +
      '<div class="grid grid-cols-4 gap-6 mb-8">' +
        '<div class="card p-6">' +
          '<div class="flex items-center gap-4">' +
            '<div class="w-12 h-12 rounded-xl bg-primary-500/20 flex items-center justify-center">' +
              '<svg class="w-6 h-6 text-primary-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">' +
                '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />' +
              '</svg>' +
            '</div>' +
            '<div>' +
              '<p class="text-2xl font-bold">' + projects.length + '</p>' +
              '<p class="text-surface-400 text-sm">Total Projects</p>' +
            '</div>' +
          '</div>' +
        '</div>' +
        '<div class="card p-6">' +
          '<div class="flex items-center gap-4">' +
            '<div class="w-12 h-12 rounded-xl bg-yellow-500/20 flex items-center justify-center">' +
              '<svg class="w-6 h-6 text-yellow-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">' +
                '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />' +
              '</svg>' +
            '</div>' +
            '<div>' +
              '<p class="text-2xl font-bold">' + projects.filter(function(p) { return p.status === 'planning'; }).length + '</p>' +
              '<p class="text-surface-400 text-sm">In Planning</p>' +
            '</div>' +
          '</div>' +
        '</div>' +
        '<div class="card p-6">' +
          '<div class="flex items-center gap-4">' +
            '<div class="w-12 h-12 rounded-xl bg-blue-500/20 flex items-center justify-center">' +
              '<svg class="w-6 h-6 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">' +
                '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />' +
              '</svg>' +
            '</div>' +
            '<div>' +
              '<p class="text-2xl font-bold">' + projects.filter(function(p) { return p.status === 'development'; }).length + '</p>' +
              '<p class="text-surface-400 text-sm">In Development</p>' +
            '</div>' +
          '</div>' +
        '</div>' +
        '<div class="card p-6">' +
          '<div class="flex items-center gap-4">' +
            '<div class="w-12 h-12 rounded-xl bg-green-500/20 flex items-center justify-center">' +
              '<svg class="w-6 h-6 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">' +
                '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />' +
              '</svg>' +
            '</div>' +
            '<div>' +
              '<p class="text-2xl font-bold">' + projects.filter(function(p) { return p.status === 'completed'; }).length + '</p>' +
              '<p class="text-surface-400 text-sm">Completed</p>' +
            '</div>' +
          '</div>' +
        '</div>' +
      '</div>' +
      
      '<!-- Projects Section -->' +
      '<div class="mb-6 flex items-center justify-between">' +
        '<h3 class="text-xl font-semibold">Your Projects</h3>' +
        '<div class="flex items-center gap-2">' +
          '<input type="text" id="project-search" placeholder="Search projects..." ' +
            'class="input w-64" oninput="filterProjects(this.value)">' +
        '</div>' +
      '</div>' +
      
      '<div id="projects-grid" class="grid grid-cols-3 gap-6">' +
        renderProjectCards(projects) +
      '</div>' +
      
      (projects.length === 0 ? 
        '<div class="text-center py-16">' +
          '<div class="w-24 h-24 rounded-full bg-surface-800 flex items-center justify-center mx-auto mb-6">' +
            '<svg class="w-12 h-12 text-surface-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">' +
              '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 13h6m-3-3v6m-9 1V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z" />' +
            '</svg>' +
          '</div>' +
          '<h3 class="text-xl font-semibold mb-2">No projects yet</h3>' +
          '<p class="text-surface-400 mb-6">Create your first project to get started</p>' +
          '<button onclick="navigateTo(\'new-project\')" class="btn-primary">' +
            'Create Your First Project' +
          '</button>' +
        '</div>' 
      : '') +
    '</div>';
}

function renderProjectCards(projects) {
  if (projects.length === 0) return '';
  
  return projects.map(function(project) {
    var statusColors = {
      'planning': 'bg-yellow-500/20 text-yellow-400',
      'development': 'bg-blue-500/20 text-blue-400',
      'testing': 'bg-purple-500/20 text-purple-400',
      'distribution': 'bg-orange-500/20 text-orange-400',
      'completed': 'bg-green-500/20 text-green-400'
    };
    
    var statusColor = statusColors[project.status] || statusColors['planning'];
    var progress = calculateProjectProgress(project);
    
    return '' +
      '<div class="card-hover p-6" onclick="openProject(\'' + project.id + '\')">' +
        '<div class="flex items-start justify-between mb-4">' +
          '<div class="w-12 h-12 rounded-xl bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center text-white font-bold text-lg">' +
            (project.name ? project.name.charAt(0).toUpperCase() : 'P') +
          '</div>' +
          '<span class="badge ' + statusColor + '">' + (project.status || 'planning').charAt(0).toUpperCase() + (project.status || 'planning').slice(1) + '</span>' +
        '</div>' +
        '<h4 class="font-semibold text-lg mb-2 truncate">' + escapeHtml(project.name) + '</h4>' +
        '<p class="text-surface-400 text-sm mb-4 truncate-2">' + escapeHtml(project.description || project.appDescription || 'No description') + '</p>' +
        '<div class="flex items-center gap-2 mb-4">' +
          '<span class="badge badge-primary">' + escapeHtml(project.category || 'Uncategorized') + '</span>' +
          '<span class="text-surface-500 text-xs">' + escapeHtml(project.monetization || 'free') + '</span>' +
        '</div>' +
        '<div class="mb-2">' +
          '<div class="flex items-center justify-between text-xs text-surface-400 mb-1">' +
            '<span>Progress</span>' +
            '<span>' + progress + '%</span>' +
          '</div>' +
          '<div class="progress-bar">' +
            '<div class="progress-fill" style="width: ' + progress + '%"></div>' +
          '</div>' +
        '</div>' +
        '<div class="flex items-center justify-between text-xs text-surface-500 pt-4 border-t border-surface-700">' +
          '<span>Updated ' + formatDate(project.updatedAt) + '</span>' +
          '<div class="flex gap-2">' +
            '<button onclick="event.stopPropagation(); duplicateProject(\'' + project.id + '\')" class="p-1 hover:text-primary-400" title="Duplicate">' +
              '<svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>' +
            '</button>' +
            '<button onclick="event.stopPropagation(); confirmDeleteProject(\'' + project.id + '\')" class="p-1 hover:text-red-400" title="Delete">' +
              '<svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>' +
            '</button>' +
          '</div>' +
        '</div>' +
      '</div>';
  }).join('');
}

function filterProjects(query) {
  var filtered = AppState.projects.filter(function(p) {
    return p.name.toLowerCase().includes(query.toLowerCase()) ||
           (p.description && p.description.toLowerCase().includes(query.toLowerCase())) ||
           (p.category && p.category.toLowerCase().includes(query.toLowerCase()));
  });
  document.getElementById('projects-grid').innerHTML = renderProjectCards(filtered);
}

// ==================== New Project ====================
function renderNewProject(container) {
  container.innerHTML = ''+
    '<div class="max-w-4xl mx-auto animate-fade-in">' +
      '<!-- Progress Steps -->' +
      '<div class="mb-8">' +
        '<div class="flex items-center justify-between">' +
          '<div class="flex-1 step-indicator">' +
            '<div id="step-1" class="step step-active">1</div>' +
            '<div id="connector-1-2" class="step-connector"></div>' +
            '<div id="step-2" class="step step-pending">2</div>' +
            '<div id="connector-2-3" class="step-connector"></div>' +
            '<div id="step-3" class="step step-pending">3</div>' +
            '<div id="connector-3-4" class="step-connector"></div>' +
            '<div id="step-4" class="step step-pending">4</div>' +
          '</div>' +
        '</div>' +
        '<div class="flex justify-between mt-2 text-xs text-surface-400">' +
          '<span>Basic Info</span>' +
          '<span>Target Market</span>' +
          '<span>Monetization</span>' +
          '<span>Description</span>' +
        '</div>' +
      '</div>' +
      
      '<!-- Form Container -->' +
      '<div class="card p-8">' +
        '<form id="new-project-form" onsubmit="handleNewProjectSubmit(event)">' +
          '<!-- Step 1: Basic Info -->' +
          '<div id="form-step-1" class="form-step">' +
            '<h3 class="text-2xl font-bold mb-6">Basic Information</h3>' +
            '<div class="space-y-6">' +
              '<div>' +
                '<label class="label">Project Name *</label>' +
                '<input type="text" id="project-name" class="input" placeholder="My Amazing App" required>' +
              '</div>' +
              '<div>' +
                '<label class="label">Category *</label>' +
                '<select id="project-category" class="select" required onchange="updateSubcategories()">' +
                  '<option value="">Select a category</option>' +
                  Object.keys(Categories).map(function(cat) {
                    return '<option value="' + cat + '">' + cat + '</option>';
                  }).join('') +
                '</select>' +
              '</div>' +
              '<div>' +
                '<label class="label">Subcategory</label>' +
                '<select id="project-subcategory" class="select" disabled>' +
                  '<option value="">Select category first</option>' +
                '</select>' +
              '</div>' +
            '</div>' +
            '<div class="flex justify-end mt-8">' +
              '<button type="button" onclick="nextStep(2)" class="btn-primary">Next Step</button>' +
            '</div>' +
          '</div>' +
          
          '<!-- Step 2: Target Market -->' +
          '<div id="form-step-2" class="form-step hidden">' +
            '<h3 class="text-2xl font-bold mb-6">Target Market</h3>' +
            '<div class="space-y-6">' +
              '<div>' +
                '<label class="label">Target Markets (Select all that apply)</label>' +
                '<div class="grid grid-cols-2 gap-4">' +
                  Markets.map(function(market) {
                    return '' +
                      '<label class="flex items-center gap-3 p-4 rounded-lg border border-surface-700 hover:border-primary-500 cursor-pointer transition-colors">' +
                        '<input type="checkbox" name="markets" value="' + market.id + '" class="checkbox">' +
                        '<span class="text-2xl">' + market.icon + '</span>' +
                        '<span>' + market.name + '</span>' +
                      '</label>';
                  }).join('') +
                '</div>' +
              '</div>' +
              '<div>' +
                '<label class="label">Target Age Range</label>' +
                '<div class="flex items-center gap-4">' +
                  '<div class="flex-1">' +
                    '<label class="text-xs text-surface-400">Minimum Age</label>' +
                    '<select id="age-min" class="select">' +
                      '<option value="0">All Ages</option>' +
                      '<option value="4">4+</option>' +
                      '<option value="9">9+</option>' +
                      '<option value="12">12+</option>' +
                      '<option value="17">17+</option>' +
                      '<option value="18">18+</option>' +
                      '<option value="21">21+</option>' +
                    '</select>' +
                  '</div>' +
                  '<span class="text-surface-400">to</span>' +
                  '<div class="flex-1">' +
                    '<label class="text-xs text-surface-400">Maximum Age</label>' +
                    '<select id="age-max" class="select">' +
                      '<option value="99">No Limit</option>' +
                      '<option value="17">17</option>' +
                      '<option value="25">25</option>' +
                      '<option value="35">35</option>' +
                      '<option value="45">45</option>' +
                      '<option value="55">55</option>' +
                      '<option value="65">65</option>' +
                    '</select>' +
                  '</div>' +
                '</div>' +
              '</div>' +
            '</div>' +
            '<div class="flex justify-between mt-8">' +
              '<button type="button" onclick="prevStep(1)" class="btn-secondary">Previous</button>' +
              '<button type="button" onclick="nextStep(3)" class="btn-primary">Next Step</button>' +
            '</div>' +
          '</div>' +
          
          '<!-- Step 3: Monetization -->' +
          '<div id="form-step-3" class="form-step hidden">' +
            '<h3 class="text-2xl font-bold mb-6">Monetization Model</h3>' +
            '<div class="space-y-4">' +
              MonetizationOptions.map(function(option) {
                return '' +
                  '<label class="flex items-center gap-4 p-4 rounded-lg border border-surface-700 hover:border-primary-500 cursor-pointer transition-colors">' +
                    '<input type="radio" name="monetization" value="' + option.id + '" class="checkbox" ' + (option.id === 'free' ? 'checked' : '') + '>' +
                    '<span class="text-3xl">' + option.icon + '</span>' +
                    '<div>' +
                      '<p class="font-semibold">' + option.name + '</p>' +
                      '<p class="text-sm text-surface-400">' + option.description + '</p>' +
                    '</div>' +
                  '</label>';
              }).join('') +
            '</div>' +
            '<div class="flex justify-between mt-8">' +
              '<button type="button" onclick="prevStep(2)" class="btn-secondary">Previous</button>' +
              '<button type="button" onclick="nextStep(4)" class="btn-primary">Next Step</button>' +
            '</div>' +
          '</div>' +
          
          '<!-- Step 4: Description -->' +
          '<div id="form-step-4" class="form-step hidden">' +
            '<h3 class="text-2xl font-bold mb-6">Describe Your App</h3>' +
            '<div class="space-y-6">' +
              '<div>' +
                '<label class="label">What should your app do? *</label>' +
                '<textarea id="app-description" class="textarea min-h-[200px]" ' +
                  'placeholder="Describe your app idea in detail. What problem does it solve? What features should it have? Who is it for? The more detail you provide, the better the AI can help you plan your project." required></textarea>' +
                '<p class="text-xs text-surface-400 mt-2">Pro tip: Be as detailed as possible. Include features, user flows, and any specific requirements.</p>' +
              '</div>' +
              '<div>' +
                '<label class="label">Any additional notes or requirements?</label>' +
                '<textarea id="additional-notes" class="textarea" ' +
                  'placeholder="Optional: Tech stack preferences, design inspirations, competitors to analyze, etc."></textarea>' +
              '</div>' +
            '</div>' +
            '<div class="flex justify-between mt-8">' +
              '<button type="button" onclick="prevStep(3)" class="btn-secondary">Previous</button>' +
              '<button type="submit" class="btn-accent text-lg px-8">' +
                '<span class="flex items-center gap-2">' +
                  '<svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">' +
                    '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />' +
                  '</svg>' +
                  'Create & Generate Plan' +
                '</span>' +
              '</button>' +
            '</div>' +
          '</div>' +
        '</form>' +
      '</div>' +
    '</div>';
}

var currentStep = 1;

function nextStep(step) {
  if (step === 2 && !document.getElementById('project-name').value) {
    showToast('Please enter a project name', 'warning');
    return;
  }
  if (step === 2 && !document.getElementById('project-category').value) {
    showToast('Please select a category', 'warning');
    return;
  }
  
  currentStep = step;
  updateStepUI();
}

function prevStep(step) {
  currentStep = step;
  updateStepUI();
}

function updateStepUI() {
  // Hide all steps
  document.querySelectorAll('.form-step').forEach(function(el) {
    el.classList.add('hidden');
  });
  
  // Show current step
  document.getElementById('form-step-' + currentStep).classList.remove('hidden');
  
  // Update step indicators
  for (var i = 1; i <= 4; i++) {
    var stepEl = document.getElementById('step-' + i);
    stepEl.classList.remove('step-active', 'step-complete', 'step-pending');
    
    if (i < currentStep) {
      stepEl.classList.add('step-complete');
      stepEl.innerHTML = '<svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" /></svg>';
    } else if (i === currentStep) {
      stepEl.classList.add('step-active');
      stepEl.textContent = i;
    } else {
      stepEl.classList.add('step-pending');
      stepEl.textContent = i;
    }
    
    if (i < 4) {
      var connector = document.getElementById('connector-' + i + '-' + (i + 1));
      if (i < currentStep) {
        connector.classList.add('step-connector-active');
      } else {
        connector.classList.remove('step-connector-active');
      }
    }
  }
}

function updateSubcategories() {
  var category = document.getElementById('project-category').value;
  var subcategorySelect = document.getElementById('project-subcategory');
  
  if (category && Categories[category]) {
    subcategorySelect.disabled = false;
    subcategorySelect.innerHTML = '<option value="">Select a subcategory</option>' +
      Categories[category].map(function(sub) {
        return '<option value="' + sub + '">' + sub + '</option>';
      }).join('');
  } else {
    subcategorySelect.disabled = true;
    subcategorySelect.innerHTML = '<option value="">Select category first</option>';
  }
}

async function handleNewProjectSubmit(event) {
  event.preventDefault();
  
  var selectedMarkets = Array.from(document.querySelectorAll('input[name="markets"]:checked')).map(function(el) {
    return el.value;
  });
  
  var projectData = {
    name: document.getElementById('project-name').value,
    category: document.getElementById('project-category').value,
    subcategory: document.getElementById('project-subcategory').value,
    targetMarkets: selectedMarkets,
    ageRangeMin: parseInt(document.getElementById('age-min').value),
    ageRangeMax: parseInt(document.getElementById('age-max').value),
    monetization: document.querySelector('input[name="monetization"]:checked').value,
    appDescription: document.getElementById('app-description').value,
    description: document.getElementById('additional-notes').value
  };
  
  try {
    showLoading('Creating project...');
    
    // Create the project
    var project = await window.electronAPI.createProject(projectData);
    
    // Generate AI plan if enabled
    if (AppState.settings.enableAiPlanning && AppState.settings.openaiApiKey) {
      showLoading('Generating AI-powered development plan...');
      
      try {
        var aiPlan = await window.electronAPI.generatePlan(project);
        
        // Update project with AI plan
        project = await window.electronAPI.updateProject(project.id, {
          aiPlan: aiPlan,
          agentInstructions: aiPlan.agentInstructions,
          checklist: aiPlan.checklist
        });
        
        showToast('Project created with AI plan!', 'success');
      } catch (aiError) {
        console.error('AI Plan generation failed:', aiError);
        showToast('Project created, but AI plan generation failed: ' + aiError.message, 'warning');
      }
    } else {
      showToast('Project created successfully!', 'success');
    }
    
    // Reload projects
    await loadProjects();
    
    // Navigate to project view
    AppState.currentProject = project;
    navigateTo('project-view', project);
    
  } catch (error) {
    console.error('Project creation error:', error);
    showToast('Failed to create project: ' + error.message, 'error');
  } finally {
    hideLoading();
  }
}

// ==================== Project View ====================
async function openProject(projectId) {
  showLoading('Loading project...');
  try {
    var project = await window.electronAPI.getProject(projectId);
    AppState.currentProject = project;
    navigateTo('project-view', project);
  } catch (error) {
    showToast('Failed to load project', 'error');
  } finally {
    hideLoading();
  }
}

function renderProjectView(container, project) {
  if (!project) {
    container.innerHTML = '<p>Project not found</p>';
    return;
  }
  
  AppState.currentProject = project;
  
  var statusColors = {
    'planning': 'bg-yellow-500/20 text-yellow-400 border-yellow-500/50',
    'development': 'bg-blue-500/20 text-blue-400 border-blue-500/50',
    'testing': 'bg-purple-500/20 text-purple-400 border-purple-500/50',
    'distribution': 'bg-orange-500/20 text-orange-400 border-orange-500/50',
    'completed': 'bg-green-500/20 text-green-400 border-green-500/50'
  };
  
  var progress = calculateProjectProgress(project);
  
  container.innerHTML = ''+
    '<div class="max-w-6xl mx-auto animate-fade-in">' +
      '<!-- Project Header -->' +
      '<div class="card p-8 mb-6">' +
        '<div class="flex items-start justify-between">' +
          '<div class="flex items-start gap-6">' +
            '<div class="w-20 h-20 rounded-2xl bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center text-white font-bold text-3xl shadow-glow">' +
              (project.name ? project.name.charAt(0).toUpperCase() : 'P') +
            '</div>' +
            '<div>' +
              '<div class="flex items-center gap-4 mb-2">' +
                '<h2 class="text-3xl font-bold">' + escapeHtml(project.name) + '</h2>' +
                '<span class="badge border ' + (statusColors[project.status] || statusColors['planning']) + '">' +
                  (project.status || 'planning').charAt(0).toUpperCase() + (project.status || 'planning').slice(1) +
                '</span>' +
              '</div>' +
              '<p class="text-surface-400 mb-4 max-w-2xl">' + escapeHtml(project.appDescription || 'No description') + '</p>' +
              '<div class="flex items-center gap-4 text-sm">' +
                '<span class="badge badge-primary">' + escapeHtml(project.category || 'Uncategorized') + '</span>' +
                '<span class="text-surface-500">•</span>' +
                '<span class="text-surface-400">' + escapeHtml(project.subcategory || '') + '</span>' +
                '<span class="text-surface-500">•</span>' +
                '<span class="text-surface-400">' + (project.monetization || 'free').charAt(0).toUpperCase() + (project.monetization || 'free').slice(1) + '</span>' +
              '</div>' +
            '</div>' +
          '</div>' +
          '<div class="flex gap-2">' +
            '<button onclick="editProjectBasics()" class="btn-secondary">' +
              '<svg class="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>' +
              'Edit' +
            '</button>' +
          '</div>' +
        '</div>' +
        
        '<!-- Progress Bar -->' +
        '<div class="mt-6 pt-6 border-t border-surface-700">' +
          '<div class="flex items-center justify-between text-sm mb-2">' +
            '<span class="text-surface-400">Overall Progress</span>' +
            '<span class="font-semibold">' + progress + '%</span>' +
          '</div>' +
          '<div class="progress-bar h-3">' +
            '<div class="progress-fill" style="width: ' + progress + '%"></div>' +
          '</div>' +
        '</div>' +
      '</div>' +
      
      '<!-- Quick Actions -->' +
      '<div class="grid grid-cols-4 gap-4 mb-6">' +
        '<button onclick="navigateTo(\'project-planning\', AppState.currentProject)" class="card-hover p-6 text-left">' +
          '<div class="w-12 h-12 rounded-xl bg-primary-500/20 flex items-center justify-center mb-4">' +
            '<svg class="w-6 h-6 text-primary-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>' +
          '</div>' +
          '<h4 class="font-semibold mb-1">AI Plan</h4>' +
          '<p class="text-sm text-surface-400">View development plan & instructions</p>' +
        '</button>' +
        '<button onclick="navigateTo(\'project-checklist\', AppState.currentProject)" class="card-hover p-6 text-left">' +
          '<div class="w-12 h-12 rounded-xl bg-green-500/20 flex items-center justify-center mb-4">' +
            '<svg class="w-6 h-6 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" /></svg>' +
          '</div>' +
          '<h4 class="font-semibold mb-1">Checklist</h4>' +
          '<p class="text-sm text-surface-400">Track development progress</p>' +
        '</button>' +
        '<button onclick="navigateTo(\'project-adjustments\', AppState.currentProject)" class="card-hover p-6 text-left">' +
          '<div class="w-12 h-12 rounded-xl bg-accent-500/20 flex items-center justify-center mb-4">' +
            '<svg class="w-6 h-6 text-accent-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" /></svg>' +
          '</div>' +
          '<h4 class="font-semibold mb-1">Adjustments</h4>' +
          '<p class="text-sm text-surface-400">Refine and tweak your plan</p>' +
        '</button>' +
        '<button onclick="navigateTo(\'project-distribution\', AppState.currentProject)" class="card-hover p-6 text-left">' +
          '<div class="w-12 h-12 rounded-xl bg-orange-500/20 flex items-center justify-center mb-4">' +
            '<svg class="w-6 h-6 text-orange-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" /></svg>' +
          '</div>' +
          '<h4 class="font-semibold mb-1">Distribution</h4>' +
          '<p class="text-sm text-surface-400">Package for app stores</p>' +
        '</button>' +
      '</div>' +
      
      '<!-- Project Details Grid -->' +
      '<div class="grid grid-cols-2 gap-6">' +
        '<!-- Target Info -->' +
        '<div class="card p-6">' +
          '<h4 class="font-semibold mb-4 flex items-center gap-2">' +
            '<svg class="w-5 h-5 text-primary-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>' +
            'Target Markets' +
          '</h4>' +
          '<div class="flex flex-wrap gap-2">' +
            ((project.targetMarkets || []).length > 0 ?
              project.targetMarkets.map(function(m) {
                var market = Markets.find(function(mk) { return mk.id === m; });
                return '<span class="badge bg-surface-700">' + (market ? market.icon + ' ' + market.name : m) + '</span>';
              }).join('') :
              '<span class="text-surface-500">No markets selected</span>'
            ) +
          '</div>' +
          '<div class="mt-4 pt-4 border-t border-surface-700">' +
            '<p class="text-sm text-surface-400 mb-1">Age Range</p>' +
            '<p class="font-semibold">' + (project.ageRangeMin || 0) + ' - ' + (project.ageRangeMax || 99) + ' years</p>' +
          '</div>' +
        '</div>' +
        
        '<!-- Key Features (from AI Plan) -->' +
        '<div class="card p-6">' +
          '<h4 class="font-semibold mb-4 flex items-center gap-2">' +
            '<svg class="w-5 h-5 text-accent-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>' +
            'Key Features' +
          '</h4>' +
          '<div class="space-y-2">' +
            (project.aiPlan && project.aiPlan.keyFeatures ?
              project.aiPlan.keyFeatures.slice(0, 5).map(function(feature) {
                return '<div class="flex items-start gap-2"><svg class="w-5 h-5 text-green-400 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" /></svg><span class="text-sm">' + escapeHtml(feature) + '</span></div>';
              }).join('') :
              '<p class="text-surface-500">Generate AI plan to see features</p>'
            ) +
          '</div>' +
        '</div>' +
      '</div>' +
    '</div>';
}

// ==================== Project Planning ====================
function renderProjectPlanning(container, project) {
  if (!project) {
    container.innerHTML = '<p>Project not found</p>';
    return;
  }
  
  var aiPlan = project.aiPlan;
  
  container.innerHTML = ''+
    '<div class="max-w-5xl mx-auto animate-fade-in">' +
      '<!-- Back Button -->' +
      '<button onclick="navigateTo(\'project-view\', AppState.currentProject)" class="btn-ghost mb-6">' +
        '<svg class="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" /></svg>' +
        'Back to Project' +
      '</button>' +
      
      (aiPlan ?
        // Show AI Plan
        '<div class="space-y-6">' +
          '<!-- Overview -->' +
          '<div class="card p-6">' +
            '<h3 class="text-xl font-bold mb-4 flex items-center gap-2">' +
              '<svg class="w-6 h-6 text-primary-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>' +
              'Project Overview' +
            '</h3>' +
            '<p class="text-surface-300 leading-relaxed">' + escapeHtml(aiPlan.overview || 'No overview available') + '</p>' +
          '</div>' +
          
          '<!-- Key Features -->' +
          '<div class="card p-6">' +
            '<h3 class="text-xl font-bold mb-4">Key Features</h3>' +
            '<div class="grid grid-cols-2 gap-4">' +
              ((aiPlan.keyFeatures || []).map(function(feature) {
                return '<div class="flex items-start gap-3 p-4 bg-surface-800/50 rounded-lg">' +
                  '<svg class="w-5 h-5 text-green-400 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" /></svg>' +
                  '<span>' + escapeHtml(feature) + '</span>' +
                '</div>';
              }).join('')) +
            '</div>' +
          '</div>' +
          
          '<!-- Tech Stack -->' +
          (aiPlan.techStack ? 
            '<div class="card p-6">' +
              '<h3 class="text-xl font-bold mb-4">Recommended Tech Stack</h3>' +
              '<div class="grid grid-cols-2 gap-6">' +
                (aiPlan.techStack.frontend ?
                  '<div>' +
                    '<h4 class="font-semibold text-primary-400 mb-2">Frontend</h4>' +
                    '<div class="flex flex-wrap gap-2">' +
                      aiPlan.techStack.frontend.map(function(tech) {
                        return '<span class="badge bg-primary-500/20 text-primary-300">' + escapeHtml(tech) + '</span>';
                      }).join('') +
                    '</div>' +
                  '</div>' : '') +
                (aiPlan.techStack.backend ?
                  '<div>' +
                    '<h4 class="font-semibold text-accent-400 mb-2">Backend</h4>' +
                    '<div class="flex flex-wrap gap-2">' +
                      aiPlan.techStack.backend.map(function(tech) {
                        return '<span class="badge bg-accent-500/20 text-accent-300">' + escapeHtml(tech) + '</span>';
                      }).join('') +
                    '</div>' +
                  '</div>' : '') +
                (aiPlan.techStack.database ?
                  '<div>' +
                    '<h4 class="font-semibold text-green-400 mb-2">Database</h4>' +
                    '<div class="flex flex-wrap gap-2">' +
                      aiPlan.techStack.database.map(function(tech) {
                        return '<span class="badge bg-green-500/20 text-green-300">' + escapeHtml(tech) + '</span>';
                      }).join('') +
                    '</div>' +
                  '</div>' : '') +
                (aiPlan.techStack.thirdParty ?
                  '<div>' +
                    '<h4 class="font-semibold text-orange-400 mb-2">Third-Party Services</h4>' +
                    '<div class="flex flex-wrap gap-2">' +
                      aiPlan.techStack.thirdParty.map(function(tech) {
                        return '<span class="badge bg-orange-500/20 text-orange-300">' + escapeHtml(tech) + '</span>';
                      }).join('') +
                    '</div>' +
                  '</div>' : '') +
              '</div>' +
            '</div>' : '') +
          
          '<!-- Agent Instructions -->' +
          '<div class="card p-6">' +
            '<h3 class="text-xl font-bold mb-4 flex items-center gap-2">' +
              '<svg class="w-6 h-6 text-accent-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>' +
              'AI Agent Instructions' +
            '</h3>' +
            '<div class="bg-surface-800 rounded-lg p-4 font-mono text-sm text-surface-300 whitespace-pre-wrap overflow-x-auto">' +
              escapeHtml(aiPlan.agentInstructions || project.agentInstructions || 'No agent instructions generated') +
            '</div>' +
            '<button onclick="copyToClipboard(AppState.currentProject.aiPlan.agentInstructions || AppState.currentProject.agentInstructions)" class="btn-secondary mt-4">' +
              '<svg class="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>' +
              'Copy Instructions' +
            '</button>' +
          '</div>' +
          
          '<!-- Timeline -->' +
          (aiPlan.timeline ?
            '<div class="card p-6">' +
              '<h3 class="text-xl font-bold mb-4">Development Timeline</h3>' +
              '<div class="space-y-4">' +
                ((aiPlan.timeline.phases || []).map(function(phase, index) {
                  return '<div class="flex items-start gap-4">' +
                    '<div class="w-10 h-10 rounded-full bg-primary-500/20 flex items-center justify-center shrink-0">' +
                      '<span class="font-bold text-primary-400">' + (index + 1) + '</span>' +
                    '</div>' +
                    '<div class="flex-1 pb-4 ' + (index < (aiPlan.timeline.phases.length - 1) ? 'border-b border-surface-700' : '') + '">' +
                      '<div class="flex items-center justify-between">' +
                        '<h4 class="font-semibold">' + escapeHtml(phase.name) + '</h4>' +
                        '<span class="text-sm text-surface-400">' + escapeHtml(phase.duration) + '</span>' +
                      '</div>' +
                      (phase.milestones ?
                        '<div class="mt-2 flex flex-wrap gap-2">' +
                          phase.milestones.map(function(m) {
                            return '<span class="badge bg-surface-700">' + escapeHtml(m) + '</span>';
                          }).join('') +
                        '</div>' : '') +
                    '</div>' +
                  '</div>';
                }).join('')) +
              '</div>' +
              (aiPlan.timeline.totalEstimate ?
                '<div class="mt-4 pt-4 border-t border-surface-700">' +
                  '<p class="text-sm text-surface-400">Total Estimated Time: <span class="font-semibold text-primary-400">' + escapeHtml(aiPlan.timeline.totalEstimate) + '</span></p>' +
                '</div>' : '') +
            '</div>' : '') +
          
          '<!-- Actions -->' +
          '<div class="flex gap-4">' +
            '<button onclick="regeneratePlan()" class="btn-secondary">' +
              '<svg class="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg>' +
              'Regenerate Plan' +
            '</button>' +
            '<button onclick="navigateTo(\'project-checklist\', AppState.currentProject)" class="btn-primary">' +
              'View Checklist' +
              '<svg class="w-4 h-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" /></svg>' +
            '</button>' +
          '</div>' +
        '</div>' :
        
        // No AI Plan - Show generate button
        '<div class="card p-8 text-center">' +
          '<div class="w-24 h-24 rounded-full bg-primary-500/20 flex items-center justify-center mx-auto mb-6">' +
            '<svg class="w-12 h-12 text-primary-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>' +
          '</div>' +
          '<h3 class="text-2xl font-bold mb-4">Generate AI Development Plan</h3>' +
          '<p class="text-surface-400 mb-8 max-w-md mx-auto">Let our AI analyze your project and create a comprehensive development plan with step-by-step instructions.</p>' +
          '<button onclick="generatePlan()" class="btn-accent text-lg px-8 py-4" ' + (!AppState.settings.openaiApiKey ? 'disabled title="Please configure your OpenAI API key in Settings"' : '') + '>' +
            '<svg class="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>' +
            'Generate Plan' +
          '</button>' +
          (!AppState.settings.openaiApiKey ?
            '<p class="text-yellow-400 text-sm mt-4">⚠️ Please configure your OpenAI API key in Settings first</p>' : '') +
        '</div>'
      ) +
    '</div>';
}

async function generatePlan() {
  if (!AppState.settings.openaiApiKey) {
    showToast('Please configure your OpenAI API key in Settings', 'warning');
    return;
  }
  
  showLoading('Generating AI development plan...');
  
  try {
    var aiPlan = await window.electronAPI.generatePlan(AppState.currentProject);
    
    var updatedProject = await window.electronAPI.updateProject(AppState.currentProject.id, {
      aiPlan: aiPlan,
      agentInstructions: aiPlan.agentInstructions,
      checklist: aiPlan.checklist
    });
    
    AppState.currentProject = updatedProject;
    showToast('AI plan generated successfully!', 'success');
    navigateTo('project-planning', updatedProject);
  } catch (error) {
    console.error('Plan generation error:', error);
    showToast('Failed to generate plan: ' + error.message, 'error');
  } finally {
    hideLoading();
  }
}

async function regeneratePlan() {
  if (confirm('This will replace your existing plan. Are you sure?')) {
    await generatePlan();
  }
}

// ==================== Project Checklist ====================
function renderProjectChecklist(container, project) {
  if (!project) {
    container.innerHTML = '<p>Project not found</p>';
    return;
  }
  
  var checklist = project.checklist;
  
  container.innerHTML = '' +
    '<div class="max-w-4xl mx-auto animate-fade-in">' +
      '<button onclick="navigateTo(\'project-view\', AppState.currentProject)" class="btn-ghost mb-6">' +
        '<svg class="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" /></svg>' +
        'Back to Project' +
      '</button>' +
      
      (checklist && checklist.items && checklist.items.length > 0 ?
        '<div class="space-y-4">' +
          '<div class="flex items-center justify-between mb-6">' +
            '<div>' +
              '<h3 class="text-xl font-bold">Development Checklist</h3>' +
              '<p class="text-surface-400 text-sm">' + getChecklistProgress(checklist) + '</p>' +
            '</div>' +
            '<button onclick="navigateTo(\'project-adjustments\', AppState.currentProject)" class="btn-secondary">' +
              'Make Adjustments' +
            '</button>' +
          '</div>' +
          checklist.items.map(function(item, index) {
            var priorityColors = {
              'high': 'border-l-red-500',
              'medium': 'border-l-yellow-500',
              'low': 'border-l-green-500'
            };
            return '<div class="card p-4 border-l-4 ' + (priorityColors[item.priority] || 'border-l-surface-500') + ' ' + (item.completed ? 'opacity-60' : '') + '">' +
              '<div class="flex items-start gap-4">' +
                '<input type="checkbox" class="checkbox mt-1" ' + (item.completed ? 'checked' : '') + ' onchange="toggleChecklistItem(' + index + ')">' +
                '<div class="flex-1">' +
                  '<div class="flex items-center justify-between mb-2">' +
                    '<h4 class="font-semibold ' + (item.completed ? 'line-through' : '') + '">' + escapeHtml(item.title) + '</h4>' +
                    '<div class="flex items-center gap-2">' +
                      '<span class="badge ' + (item.priority === 'high' ? 'badge-danger' : item.priority === 'medium' ? 'badge-warning' : 'badge-success') + '">' + (item.priority || 'medium') + '</span>' +
                      (item.estimatedTime ? '<span class="text-xs text-surface-400">' + escapeHtml(item.estimatedTime) + '</span>' : '') +
                    '</div>' +
                  '</div>' +
                  '<p class="text-sm text-surface-400 mb-3">' + escapeHtml(item.description || '') + '</p>' +
                  (item.subtasks && item.subtasks.length > 0 ?
                    '<div class="space-y-2 pl-4 border-l-2 border-surface-700">' +
                      item.subtasks.map(function(subtask) {
                        return '<div class="flex items-center gap-2 text-sm">' +
                          '<svg class="w-4 h-4 text-surface-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" /></svg>' +
                          '<span>' + escapeHtml(subtask) + '</span>' +
                        '</div>';
                      }).join('') +
                    '</div>' : '') +
                '</div>' +
              '</div>' +
            '</div>';
          }).join('') +
          '<div class="flex gap-4 mt-6">' +
            '<button onclick="navigateTo(\'project-distribution\', AppState.currentProject)" class="btn-primary">' +
              'Continue to Distribution' +
              '<svg class="w-4 h-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" /></svg>' +
            '</button>' +
          '</div>' +
        '</div>' :
        '<div class="card p-8 text-center">' +
          '<div class="w-24 h-24 rounded-full bg-surface-800 flex items-center justify-center mx-auto mb-6">' +
            '<svg class="w-12 h-12 text-surface-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" /></svg>' +
          '</div>' +
          '<h3 class="text-xl font-semibold mb-2">No Checklist Yet</h3>' +
          '<p class="text-surface-400 mb-6">Generate an AI plan first to create your development checklist</p>' +
          '<button onclick="navigateTo(\'project-planning\', AppState.currentProject)" class="btn-primary">Go to AI Planning</button>' +
        '</div>'
      ) +
    '</div>';
}

function getChecklistProgress(checklist) {
  if (!checklist || !checklist.items) return '0 of 0 completed';
  var completed = checklist.items.filter(function(item) { return item.completed; }).length;
  return completed + ' of ' + checklist.items.length + ' completed';
}

async function toggleChecklistItem(index) {
  try {
    var result = await window.electronAPI.toggleChecklistItem(AppState.currentProject.id, index);
    AppState.currentProject = await window.electronAPI.getProject(AppState.currentProject.id);
    renderProjectChecklist(document.getElementById('content'), AppState.currentProject);
  } catch (error) {
    showToast('Failed to update checklist', 'error');
  }
}

// ==================== Project Adjustments ====================
function renderProjectAdjustments(container, project) {
  if (!project) {
    container.innerHTML = '<p>Project not found</p>';
    return;
  }
  
  container.innerHTML = '' +
    '<div class="max-w-4xl mx-auto animate-fade-in">' +
      '<button onclick="navigateTo(\'project-view\', AppState.currentProject)" class="btn-ghost mb-6">' +
        '<svg class="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" /></svg>' +
        'Back to Project' +
      '</button>' +
      
      '<div class="card p-8">' +
        '<h3 class="text-2xl font-bold mb-4">Make Adjustments</h3>' +
        '<p class="text-surface-400 mb-6">Describe the changes or tweaks you want to make to your app plan. Our AI will analyze your request and update the development plan accordingly.</p>' +
        
        '<form onsubmit="handleAdjustmentSubmit(event)">' +
          '<div class="mb-6">' +
            '<label class="label">What adjustments would you like to make?</label>' +
            '<textarea id="adjustment-request" class="textarea min-h-[200px]" placeholder="Example: I want to add social login with Google and Facebook. Also, I need to include a dark mode option and reduce the number of initial features to focus on core functionality."></textarea>' +
          '</div>' +
          '<button type="submit" class="btn-accent" ' + (!AppState.settings.openaiApiKey ? 'disabled' : '') + '>' +
            '<svg class="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>' +
            'Generate Adjustments' +
          '</button>' +
        '</form>' +
      '</div>' +
      
      (project.adjustments && project.adjustments.length > 0 ?
        '<div class="mt-6 space-y-4">' +
          '<h4 class="font-semibold">Previous Adjustments</h4>' +
          project.adjustments.map(function(adj, index) {
            return '<div class="card p-4">' +
              '<div class="flex items-start justify-between">' +
                '<div>' +
                  '<p class="text-sm text-surface-400 mb-2">' + formatDate(adj.date) + '</p>' +
                  '<p class="font-medium">' + escapeHtml(adj.request) + '</p>' +
                '</div>' +
                '<button onclick="viewAdjustment(' + index + ')" class="btn-ghost text-sm">View Details</button>' +
              '</div>' +
            '</div>';
          }).join('') +
        '</div>' : '') +
    '</div>';
}

async function handleAdjustmentSubmit(event) {
  event.preventDefault();
  
  var request = document.getElementById('adjustment-request').value;
  if (!request.trim()) {
    showToast('Please describe your adjustments', 'warning');
    return;
  }
  
  showLoading('Analyzing your adjustments...');
  
  try {
    var adjustments = await window.electronAPI.generateAdjustments(AppState.currentProject, request);
    
    var existingAdjustments = AppState.currentProject.adjustments || [];
    existingAdjustments.push({
      date: new Date().toISOString(),
      request: request,
      response: adjustments
    });
    
    var updatedProject = await window.electronAPI.updateProject(AppState.currentProject.id, {
      adjustments: existingAdjustments
    });
    
    AppState.currentProject = updatedProject;
    showToast('Adjustments analyzed!', 'success');
    
    showAdjustmentResults(adjustments);
  } catch (error) {
    showToast('Failed to generate adjustments: ' + error.message, 'error');
  } finally {
    hideLoading();
  }
}

function showAdjustmentResults(adjustments) {
  showModal(
    'Adjustment Analysis',
    '<div class="space-y-4">' +
      '<div>' +
        '<h4 class="font-semibold mb-2">Updated Overview</h4>' +
        '<p class="text-surface-300">' + escapeHtml(adjustments.adjustedOverview || 'No changes to overview') + '</p>' +
      '</div>' +
      (adjustments.newSteps && adjustments.newSteps.length > 0 ?
        '<div>' +
          '<h4 class="font-semibold mb-2 text-green-400">New Steps Added</h4>' +
          '<ul class="space-y-2">' +
            adjustments.newSteps.map(function(step) {
              return '<li class="flex items-start gap-2">' +
                '<svg class="w-5 h-5 text-green-400 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" /></svg>' +
                '<span>' + escapeHtml(step.title) + '</span>' +
              '</li>';
            }).join('') +
          '</ul>' +
        '</div>' : '') +
      (adjustments.modifiedSteps && adjustments.modifiedSteps.length > 0 ?
        '<div>' +
          '<h4 class="font-semibold mb-2 text-yellow-400">Modified Steps</h4>' +
          '<ul class="space-y-2">' +
            adjustments.modifiedSteps.map(function(step) {
              return '<li class="flex items-start gap-2">' +
                '<svg class="w-5 h-5 text-yellow-400 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>' +
                '<span>' + escapeHtml(step.originalTitle) + ' → ' + escapeHtml(step.newTitle) + '</span>' +
              '</li>';
            }).join('') +
          '</ul>' +
        '</div>' : '') +
      '<div>' +
        '<h4 class="font-semibold mb-2">Impact Analysis</h4>' +
        '<p class="text-surface-300">' + escapeHtml(adjustments.impactAnalysis || 'No significant impact') + '</p>' +
      '</div>' +
    '</div>',
    [
      { text: 'Apply Changes', class: 'btn-primary', onclick: 'applyAdjustments()' },
      { text: 'Close', class: 'btn-secondary', onclick: 'closeModal()' }
    ]
  );
}

async function applyAdjustments() {
  closeModal();
  showToast('Adjustments applied to your project', 'success');
  navigateTo('project-checklist', AppState.currentProject);
}

// ==================== Project Distribution ====================
function renderProjectDistribution(container, project) {
  if (!project) {
    container.innerHTML = '<p>Project not found</p>';
    return;
  }
  
  container.innerHTML = '' +
    '<div class="max-w-5xl mx-auto animate-fade-in">' +
      '<button onclick="navigateTo(\'project-view\', AppState.currentProject)" class="btn-ghost mb-6">' +
        '<svg class="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" /></svg>' +
        'Back to Project' +
      '</button>' +
      
      '<div class="card p-8 mb-6">' +
        '<h3 class="text-2xl font-bold mb-4">Package for Distribution</h3>' +
        '<p class="text-surface-400 mb-6">Select the platforms where you want to distribute your app. We will guide you through the requirements for each store.</p>' +
        
        '<div class="grid grid-cols-2 gap-4 mb-8">' +
          Stores.map(function(store) {
            return '<label class="flex items-center gap-4 p-4 rounded-lg border border-surface-700 hover:border-primary-500 cursor-pointer transition-colors">' +
              '<input type="checkbox" class="checkbox" value="' + store.id + '" name="stores">' +
              '<span class="text-3xl">' + store.icon + '</span>' +
              '<div>' +
                '<p class="font-semibold">' + store.name + '</p>' +
                '<p class="text-sm text-surface-400">' + store.platforms.join(', ') + '</p>' +
              '</div>' +
            '</label>';
          }).join('') +
        '</div>' +
        
        '<button onclick="startStoreSubmission()" class="btn-primary">' +
          'Continue with Selected Stores' +
          '<svg class="w-4 h-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" /></svg>' +
        '</button>' +
      '</div>' +
      
      '<div id="store-submissions-list"></div>' +
    '</div>';
  
  loadStoreSubmissions();
}

async function loadStoreSubmissions() {
  try {
    var submissions = await window.electronAPI.getStoreSubmissions(AppState.currentProject.id);
    var listEl = document.getElementById('store-submissions-list');
    
    if (submissions && submissions.length > 0) {
      listEl.innerHTML = '' +
        '<h4 class="text-lg font-semibold mb-4">Existing Store Submissions</h4>' +
        '<div class="space-y-4">' +
          submissions.map(function(sub) {
            var store = Stores.find(function(s) { return s.id === sub.storeType; });
            var statusColors = {
              'draft': 'badge-warning',
              'ready': 'badge-primary',
              'submitted': 'badge-success',
              'rejected': 'badge-danger'
            };
            return '<div class="card p-4 flex items-center justify-between">' +
              '<div class="flex items-center gap-4">' +
                '<span class="text-2xl">' + (store ? store.icon : '📱') + '</span>' +
                '<div>' +
                  '<p class="font-semibold">' + (store ? store.name : sub.storeType) + '</p>' +
                  '<p class="text-sm text-surface-400">' + escapeHtml(sub.appName || 'Not configured') + '</p>' +
                '</div>' +
              '</div>' +
              '<div class="flex items-center gap-4">' +
                '<span class="badge ' + (statusColors[sub.status] || 'badge-warning') + '">' + sub.status + '</span>' +
                '<button onclick="editStoreSubmission(\'' + sub.id + '\', \'' + sub.storeType + '\')" class="btn-secondary text-sm">Edit</button>' +
                '<button onclick="deleteStoreSubmission(\'' + sub.id + '\')" class="btn-ghost text-sm text-red-400 hover:text-red-300">Delete</button>' +
              '</div>' +
            '</div>';
          }).join('') +
        '</div>';
    }
  } catch (error) {
    console.error('Failed to load store submissions:', error);
  }
}

async function startStoreSubmission() {
  var selectedStores = Array.from(document.querySelectorAll('input[name="stores"]:checked')).map(function(el) {
    return el.value;
  });
  
  if (selectedStores.length === 0) {
    showToast('Please select at least one store', 'warning');
    return;
  }
  
  try {
    for (var i = 0; i < selectedStores.length; i++) {
      await window.electronAPI.createStoreSubmission(AppState.currentProject.id, selectedStores[i]);
    }
    showToast('Store submissions created!', 'success');
    navigateTo('store-submission', { projectId: AppState.currentProject.id, storeType: selectedStores[0] });
  } catch (error) {
    showToast('Failed to create store submissions', 'error');
  }
}

function editStoreSubmission(submissionId, storeType) {
  navigateTo('store-submission', { submissionId: submissionId, storeType: storeType });
}

async function deleteStoreSubmission(submissionId) {
  if (confirm('Are you sure you want to delete this store submission?')) {
    try {
      await window.electronAPI.deleteStoreSubmission(submissionId);
      showToast('Store submission deleted', 'success');
      loadStoreSubmissions();
    } catch (error) {
      showToast('Failed to delete store submission', 'error');
    }
  }
}

// ==================== Store Submission Form ====================
async function renderStoreSubmission(container, data) {
  var storeType = data.storeType;
  var store = Stores.find(function(s) { return s.id === storeType; });
  var requirements = AppState.storeRequirements[storeType];
  
  var submission = null;
  if (data.submissionId) {
    var submissions = await window.electronAPI.getStoreSubmissions(AppState.currentProject.id);
    submission = submissions.find(function(s) { return s.id === data.submissionId; });
  }
  
  container.innerHTML = '' +
    '<div class="max-w-4xl mx-auto animate-fade-in">' +
      '<button onclick="navigateTo(\'project-distribution\', AppState.currentProject)" class="btn-ghost mb-6">' +
        '<svg class="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" /></svg>' +
        'Back to Distribution' +
      '</button>' +
      
      '<div class="card p-8">' +
        '<div class="flex items-center gap-4 mb-6">' +
          '<span class="text-4xl">' + (store ? store.icon : '📱') + '</span>' +
          '<div>' +
            '<h3 class="text-2xl font-bold">' + (store ? store.name : storeType) + ' Submission</h3>' +
            '<p class="text-surface-400">Configure your app listing for this store</p>' +
          '</div>' +
        '</div>' +
        
        '<form id="store-submission-form" class="space-y-6">' +
          '<input type="hidden" id="submission-id" value="' + (data.submissionId || '') + '">' +
          '<input type="hidden" id="store-type" value="' + storeType + '">' +
          
          '<!-- Basic Info -->' +
          '<div class="grid grid-cols-2 gap-6">' +
            '<div>' +
              '<label class="label">App Name *</label>' +
              '<input type="text" id="store-app-name" class="input" placeholder="Your App Name" value="' + escapeHtml(submission?.appName || AppState.currentProject.name || '') + '">' +
              (requirements?.metadata?.appName ? '<p class="text-xs text-surface-400 mt-1">Max ' + requirements.metadata.appName.max + ' characters</p>' : '') +
            '</div>' +
            '<div>' +
              '<label class="label">Category</label>' +
              '<input type="text" id="store-category" class="input" placeholder="e.g., Productivity" value="' + escapeHtml(submission?.category || AppState.currentProject.category || '') + '">' +
            '</div>' +
          '</div>' +
          
          '<div>' +
            '<label class="label">Tagline / Subtitle</label>' +
            '<input type="text" id="store-tagline" class="input" placeholder="A short catchy tagline" value="' + escapeHtml(submission?.tagline || '') + '">' +
          '</div>' +
          
          '<div>' +
            '<label class="label">Short Description</label>' +
            '<textarea id="store-short-desc" class="textarea" rows="2" placeholder="Brief description of your app">' + escapeHtml(submission?.shortDescription || '') + '</textarea>' +
            (requirements?.metadata?.shortDescription ? '<p class="text-xs text-surface-400 mt-1">Max ' + requirements.metadata.shortDescription.max + ' characters</p>' : '') +
          '</div>' +
          
          '<div>' +
            '<label class="label">Full Description</label>' +
            '<textarea id="store-long-desc" class="textarea min-h-[200px]" placeholder="Detailed description with features, benefits, and call-to-action">' + escapeHtml(submission?.longDescription || '') + '</textarea>' +
            (requirements?.metadata?.description ? '<p class="text-xs text-surface-400 mt-1">Max ' + requirements.metadata.description.max + ' characters</p>' : '') +
          '</div>' +
          
          '<div>' +
            '<label class="label">Keywords (comma-separated)</label>' +
            '<input type="text" id="store-keywords" class="input" placeholder="app, productivity, tool, ..." value="' + escapeHtml(submission?.keywords || '') + '">' +
            '<button type="button" onclick="generateStoreKeywords()" class="btn-ghost text-sm mt-2" ' + (!AppState.settings.openaiApiKey ? 'disabled' : '') + '>' +
              '<svg class="w-4 h-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>' +
              'AI Generate Keywords' +
            '</button>' +
          '</div>' +
          
          '<!-- URLs -->' +
          '<div class="grid grid-cols-3 gap-6">' +
            '<div>' +
              '<label class="label">Privacy Policy URL</label>' +
              '<input type="url" id="store-privacy" class="input" placeholder="https://..." value="' + escapeHtml(submission?.privacyPolicyUrl || '') + '">' +
            '</div>' +
            '<div>' +
              '<label class="label">Support URL</label>' +
              '<input type="url" id="store-support" class="input" placeholder="https://..." value="' + escapeHtml(submission?.supportUrl || '') + '">' +
            '</div>' +
            '<div>' +
              '<label class="label">Marketing URL</label>' +
              '<input type="url" id="store-marketing" class="input" placeholder="https://..." value="' + escapeHtml(submission?.marketingUrl || '') + '">' +
            '</div>' +
          '</div>' +
          
          '<!-- Media Requirements -->' +
          '<div class="border-t border-surface-700 pt-6">' +
            '<h4 class="text-lg font-semibold mb-4">Media Requirements</h4>' +
            renderMediaRequirements(requirements) +
          '</div>' +
          
          '<!-- AI Content Generation -->' +
          '<div class="border-t border-surface-700 pt-6">' +
            '<h4 class="text-lg font-semibold mb-4">AI Content Generation</h4>' +
            '<div class="flex gap-4">' +
              '<button type="button" onclick="generateStoreContent(\'' + storeType + '\')" class="btn-secondary" ' + (!AppState.settings.openaiApiKey ? 'disabled' : '') + '>' +
                '<svg class="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>' +
                'Generate Store Content' +
              '</button>' +
              '<button type="button" onclick="generateStoreTaglines()" class="btn-secondary" ' + (!AppState.settings.openaiApiKey ? 'disabled' : '') + '>' +
                '<svg class="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" /></svg>' +
                'Generate Taglines' +
              '</button>' +
            '</div>' +
          '</div>' +
          
          '<!-- Actions -->' +
          '<div class="flex justify-between pt-6 border-t border-surface-700">' +
            '<button type="button" onclick="navigateTo(\'project-distribution\', AppState.currentProject)" class="btn-secondary">Cancel</button>' +
            '<div class="flex gap-4">' +
              '<button type="button" onclick="saveStoreSubmission(\'draft\')" class="btn-secondary">Save as Draft</button>' +
              '<button type="button" onclick="saveStoreSubmission(\'ready\')" class="btn-primary">Mark as Ready</button>' +
            '</div>' +
          '</div>' +
        '</form>' +
      '</div>' +
    '</div>';
}

function renderMediaRequirements(requirements) {
  if (!requirements) {
    return '<p class="text-surface-400">No specific requirements available</p>';
  }
  
  var html = '<div class="space-y-6">';
  
  // Icon requirements
  if (requirements.icon) {
    html += '<div class="bg-surface-800/50 rounded-lg p-4">' +
      '<h5 class="font-semibold mb-3 flex items-center gap-2">' +
        '<svg class="w-5 h-5 text-primary-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>' +
        requirements.icon.name +
      '</h5>' +
      '<div class="grid grid-cols-3 gap-2 text-sm">';
    
    requirements.icon.sizes.forEach(function(size) {
      html += '<div class="flex items-center gap-2 ' + (size.required ? 'text-surface-200' : 'text-surface-400') + '">' +
        (size.required ? '<span class="w-2 h-2 rounded-full bg-red-500"></span>' : '<span class="w-2 h-2 rounded-full bg-surface-600"></span>') +
        '<span>' + size.width + 'x' + size.height + '</span>' +
        '<span class="text-xs">(' + size.name + ')</span>' +
      '</div>';
    });
    
    html += '</div>' +
      '<p class="text-xs text-surface-400 mt-3">Format: ' + requirements.icon.format.join(', ') + '</p>' +
      (requirements.icon.notes ? '<p class="text-xs text-surface-500 mt-1">' + requirements.icon.notes + '</p>' : '') +
    '</div>';
  }
  
  // Screenshot requirements
  if (requirements.screenshots) {
    html += '<div class="bg-surface-800/50 rounded-lg p-4">' +
      '<h5 class="font-semibold mb-3">Screenshots</h5>' +
      '<p class="text-sm text-surface-400 mb-3">Required: ' + requirements.screenshots.count.min + '-' + requirements.screenshots.count.max + ' screenshots</p>';
    
    var screenshotTypes = Object.keys(requirements.screenshots).filter(function(k) {
      return k !== 'count' && k !== 'format' && k !== 'notes';
    });
    
    screenshotTypes.forEach(function(type) {
      var sizes = requirements.screenshots[type];
      if (Array.isArray(sizes)) {
        html += '<div class="mb-3">' +
          '<p class="text-sm font-medium text-primary-300 mb-1">' + type.charAt(0).toUpperCase() + type.slice(1) + '</p>' +
          '<div class="flex flex-wrap gap-2">';
        sizes.forEach(function(size) {
          html += '<span class="badge ' + (size.required ? 'bg-primary-500/20 text-primary-300' : 'bg-surface-700') + '">' + size.width + 'x' + size.height + '</span>';
        });
        html += '</div></div>';
      }
    });
    
    html += '<p class="text-xs text-surface-400">Format: ' + requirements.screenshots.format.join(', ') + '</p>' +
      (requirements.screenshots.notes ? '<p class="text-xs text-surface-500 mt-1">' + requirements.screenshots.notes + '</p>' : '') +
    '</div>';
  }
  
  // Video requirements
  if (requirements.video) {
    html += '<div class="bg-surface-800/50 rounded-lg p-4">' +
      '<h5 class="font-semibold mb-3">' + requirements.video.name + '</h5>';
    
    if (requirements.video.specs) {
      html += '<div class="flex flex-wrap gap-2 mb-2">';
      requirements.video.specs.forEach(function(spec) {
        html += '<span class="badge bg-surface-700">' + spec.width + 'x' + spec.height + ' (' + spec.name + ')</span>';
      });
      html += '</div>';
    }
    
    if (requirements.video.duration) {
      html += '<p class="text-sm text-surface-400">Duration: ' + requirements.video.duration.min + '-' + requirements.video.duration.max + ' seconds</p>';
    }
    
    if (requirements.video.format) {
      html += '<p class="text-xs text-surface-400 mt-2">Format: ' + requirements.video.format.join(', ') + '</p>';
    }
    
    html += '</div>';
  }
  
  html += '</div>';
  return html;
}

async function saveStoreSubmission(status) {
  var submissionId = document.getElementById('submission-id').value;
  var storeType = document.getElementById('store-type').value;
  
  var data = {
    appName: document.getElementById('store-app-name').value,
    category: document.getElementById('store-category').value,
    tagline: document.getElementById('store-tagline').value,
    shortDescription: document.getElementById('store-short-desc').value,
    longDescription: document.getElementById('store-long-desc').value,
    keywords: document.getElementById('store-keywords').value,
    privacyPolicyUrl: document.getElementById('store-privacy').value,
    supportUrl: document.getElementById('store-support').value,
    marketingUrl: document.getElementById('store-marketing').value,
    status: status
  };
  
  try {
    if (submissionId) {
      await window.electronAPI.updateStoreSubmission(submissionId, data);
    } else {
      var submission = await window.electronAPI.createStoreSubmission(AppState.currentProject.id, storeType);
      await window.electronAPI.updateStoreSubmission(submission.id, data);
    }
    showToast('Store submission saved!', 'success');
    navigateTo('project-distribution', AppState.currentProject);
  } catch (error) {
    showToast('Failed to save: ' + error.message, 'error');
  }
}

async function generateStoreContent(storeType) {
  showLoading('Generating store content...');
  try {
    var content = await window.electronAPI.generateStoreContent(AppState.currentProject, storeType);
    
    if (content.appName) document.getElementById('store-app-name').value = content.appName;
    if (content.tagline) document.getElementById('store-tagline').value = content.tagline;
    if (content.shortDescription) document.getElementById('store-short-desc').value = content.shortDescription;
    if (content.longDescription) document.getElementById('store-long-desc').value = content.longDescription;
    if (content.keywords) document.getElementById('store-keywords').value = content.keywords.join(', ');
    if (content.category) document.getElementById('store-category').value = content.category;
    
    showToast('Content generated!', 'success');
  } catch (error) {
    showToast('Failed to generate content: ' + error.message, 'error');
  } finally {
    hideLoading();
  }
}

async function generateStoreKeywords() {
  showLoading('Generating keywords...');
  try {
    var keywords = await window.electronAPI.generateKeywords(AppState.currentProject);
    var allKeywords = [].concat(
      keywords.primaryKeywords || [],
      keywords.secondaryKeywords || [],
      keywords.longTailKeywords || []
    ).slice(0, 30);
    document.getElementById('store-keywords').value = allKeywords.join(', ');
    showToast('Keywords generated!', 'success');
  } catch (error) {
    showToast('Failed to generate keywords: ' + error.message, 'error');
  } finally {
    hideLoading();
  }
}

async function generateStoreTaglines() {
  showLoading('Generating taglines...');
  try {
    var taglines = await window.electronAPI.generateTaglines(AppState.currentProject);
    
    showModal(
      'Generated Taglines',
      '<div class="space-y-4">' +
        '<div>' +
          '<h4 class="font-semibold mb-2">Main Taglines</h4>' +
          '<div class="space-y-2">' +
            (taglines.mainTaglines || []).map(function(t, i) {
              return '<div class="flex items-center justify-between p-2 bg-surface-700 rounded">' +
                '<span>' + escapeHtml(t) + '</span>' +
                '<button onclick="useTagline(\'' + escapeJsString(t) + '\')" class="btn-ghost text-sm">Use</button>' +
              '</div>';
            }).join('') +
          '</div>' +
        '</div>' +
        '<div>' +
          '<h4 class="font-semibold mb-2">Subtitles</h4>' +
          '<div class="space-y-2">' +
            (taglines.subtitles || []).map(function(t, i) {
              return '<div class="flex items-center justify-between p-2 bg-surface-700 rounded">' +
                '<span>' + escapeHtml(t) + '</span>' +
                '<button onclick="useTagline(\'' + escapeJsString(t) + '\')" class="btn-ghost text-sm">Use</button>' +
              '</div>';
            }).join('') +
          '</div>' +
        '</div>' +
      '</div>',
      [{ text: 'Close', class: 'btn-secondary', onclick: 'closeModal()' }]
    );
  } catch (error) {
    showToast('Failed to generate taglines: ' + error.message, 'error');
  } finally {
    hideLoading();
  }
}

function useTagline(tagline) {
  document.getElementById('store-tagline').value = tagline;
  closeModal();
  showToast('Tagline applied!', 'success');
}

// ==================== Settings ====================
function renderSettings(container) {
  var settings = AppState.settings || {};
  
  container.innerHTML = '' +
    '<div class="max-w-3xl mx-auto animate-fade-in">' +
      '<div class="card p-8">' +
        '<h3 class="text-2xl font-bold mb-6">Settings</h3>' +
        
        '<form id="settings-form" class="space-y-8">' +
          '<!-- API Configuration -->' +
          '<div class="border-b border-surface-700 pb-6">' +
            '<h4 class="font-semibold mb-4 flex items-center gap-2">' +
              '<svg class="w-5 h-5 text-primary-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" /></svg>' +
              'OpenAI API Configuration' +
            '</h4>' +
            '<div class="space-y-4">' +
              '<div>' +
                '<label class="label">API Key</label>' +
                '<div class="flex gap-2">' +
                  '<input type="password" id="api-key" class="input flex-1" placeholder="sk-..." value="' + (settings.openaiApiKey || '') + '">' +
                  '<button type="button" onclick="toggleApiKeyVisibility()" class="btn-ghost">' +
                    '<svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>' +
                  '</button>' +
                  '<button type="button" onclick="validateApiKey()" class="btn-secondary">Validate</button>' +
                '</div>' +
                '<p class="text-xs text-surface-400 mt-1">Get your API key from <a href="https://platform.openai.com/api-keys" class="text-primary-400 hover:underline" target="_blank">OpenAI Platform</a></p>' +
              '</div>' +
              '<div>' +
                '<label class="label">AI Model</label>' +
                '<select id="ai-model" class="select">' +
                  '<option value="gpt-4"' + (settings.aiModel === 'gpt-4' ? ' selected' : '') + '>GPT-4 (Best quality)</option>' +
                  '<option value="gpt-4-turbo-preview"' + (settings.aiModel === 'gpt-4-turbo-preview' ? ' selected' : '') + '>GPT-4 Turbo (Faster)</option>' +
                  '<option value="gpt-3.5-turbo"' + (settings.aiModel === 'gpt-3.5-turbo' ? ' selected' : '') + '>GPT-3.5 Turbo (Budget)</option>' +
                '</select>' +
              '</div>' +
            '</div>' +
          '</div>' +
          
          '<!-- AI Features -->' +
          '<div class="border-b border-surface-700 pb-6">' +
            '<h4 class="font-semibold mb-4 flex items-center gap-2">' +
              '<svg class="w-5 h-5 text-accent-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>' +
              'AI Feature Toggles' +
            '</h4>' +
            '<div class="space-y-4">' +
              renderToggle('enable-planning', 'AI Project Planning', 'Generate comprehensive development plans', settings.enableAiPlanning !== false) +
              renderToggle('enable-adjustments', 'AI Adjustments', 'Get AI recommendations for project changes', settings.enableAiAdjustments !== false) +
              renderToggle('enable-store-content', 'AI Store Content', 'Generate app store descriptions and metadata', settings.enableAiStoreContent !== false) +
              renderToggle('enable-keywords', 'AI Keywords', 'Generate SEO-optimized keywords', settings.enableAiKeywords !== false) +
              renderToggle('enable-taglines', 'AI Taglines', 'Generate marketing taglines and captions', settings.enableAiTaglines !== false) +
            '</div>' +
          '</div>' +
          
          '<!-- Appearance -->' +
          '<div class="border-b border-surface-700 pb-6">' +
            '<h4 class="font-semibold mb-4 flex items-center gap-2">' +
              '<svg class="w-5 h-5 text-yellow-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" /></svg>' +
              'Appearance' +
            '</h4>' +
            '<div class="space-y-4">' +
              '<div>' +
                '<label class="label">Theme</label>' +
                '<div class="grid grid-cols-4 gap-4">' +
                  renderThemeOption('dark', 'Dark', settings.theme === 'dark' || !settings.theme) +
                  renderThemeOption('light', 'Light', settings.theme === 'light') +
                  renderThemeOption('midnight', 'Midnight', settings.theme === 'midnight') +
                  renderThemeOption('sunset', 'Sunset', settings.theme === 'sunset') +
                '</div>' +
              '</div>' +
              '<div>' +
                '<label class="label">Branding</label>' +
                '<select id="branding" class="select">' +
                  '<option value="default"' + (settings.branding === 'default' ? ' selected' : '') + '>Default (Blue/Purple)</option>' +
                  '<option value="ocean"' + (settings.branding === 'ocean' ? ' selected' : '') + '>Ocean (Teal/Cyan)</option>' +
                  '<option value="forest"' + (settings.branding === 'forest' ? ' selected' : '') + '>Forest (Green/Emerald)</option>' +
                  '<option value="sunset"' + (settings.branding === 'sunset' ? ' selected' : '') + '>Sunset (Orange/Red)</option>' +
                  '<option value="royal"' + (settings.branding === 'royal' ? ' selected' : '') + '>Royal (Purple/Indigo)</option>' +
                '</select>' +
              '</div>' +
            '</div>' +
          '</div>' +
          
          '<!-- General Settings -->' +
          '<div class="pb-6">' +
            '<h4 class="font-semibold mb-4 flex items-center gap-2">' +
              '<svg class="w-5 h-5 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>' +
              'General' +
            '</h4>' +
            '<div class="space-y-4">' +
              renderToggle('auto-save', 'Auto Save', 'Automatically save changes', settings.autoSave !== false) +
              renderToggle('notifications', 'Notifications', 'Show desktop notifications', settings.notificationEnabled !== false) +
            '</div>' +
          '</div>' +
          
          '<!-- Save Button -->' +
          '<div class="flex justify-end">' +
            '<button type="submit" class="btn-primary">' +
              '<svg class="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" /></svg>' +
              'Save Settings' +
            '</button>' +
          '</div>' +
        '</form>' +
      '</div>' +
    '</div>';
  
  // Add form submit handler
  document.getElementById('settings-form').addEventListener('submit', handleSettingsSave);
}

function renderToggle(id, label, description, checked) {
  return '' +
    '<div class="flex items-center justify-between">' +
      '<div>' +
        '<p class="font-medium">' + label + '</p>' +
        '<p class="text-sm text-surface-400">' + description + '</p>' +
      '</div>' +
      '<button type="button" id="' + id + '" onclick="toggleSetting(\'' + id + '\')" class="' + (checked ? 'toggle-active' : 'toggle') + '">' +
        '<span class="toggle-knob ' + (checked ? 'translate-x-5' : 'translate-x-1') + '"></span>' +
      '</button>' +
    '</div>';
}

function renderThemeOption(value, label, selected) {
  var colors = {
    'dark': 'from-surface-800 to-surface-900',
    'light': 'from-surface-100 to-surface-200',
    'midnight': 'from-blue-900 to-indigo-900',
    'sunset': 'from-orange-900 to-red-900'
  };
  
  return '' +
    '<label class="cursor-pointer">' +
      '<input type="radio" name="theme" value="' + value + '" class="hidden" ' + (selected ? 'checked' : '') + '>' +
      '<div class="p-4 rounded-lg border-2 transition-all ' + (selected ? 'border-primary-500' : 'border-surface-700 hover:border-surface-600') + '">' +
        '<div class="h-12 rounded bg-gradient-to-br ' + colors[value] + ' mb-2"></div>' +
        '<p class="text-center text-sm font-medium">' + label + '</p>' +
      '</div>' +
    '</label>';
}

function toggleSetting(id) {
  var btn = document.getElementById(id);
  var knob = btn.querySelector('.toggle-knob');
  var isActive = btn.classList.contains('toggle-active');
  
  if (isActive) {
    btn.classList.remove('toggle-active');
    btn.classList.add('toggle');
    knob.classList.remove('translate-x-5');
    knob.classList.add('translate-x-1');
  } else {
    btn.classList.remove('toggle');
    btn.classList.add('toggle-active');
    knob.classList.remove('translate-x-1');
    knob.classList.add('translate-x-5');
  }
}

function toggleApiKeyVisibility() {
  var input = document.getElementById('api-key');
  input.type = input.type === 'password' ? 'text' : 'password';
}

async function validateApiKey() {
  var apiKey = document.getElementById('api-key').value;
  if (!apiKey) {
    showToast('Please enter an API key', 'warning');
    return;
  }
  
  showLoading('Validating API key...');
  try {
    var result = await window.electronAPI.validateApiKey(apiKey);
    if (result.valid) {
      showToast('API key is valid!', 'success');
    } else {
      showToast('Invalid API key: ' + (result.error || 'Unknown error'), 'error');
    }
  } catch (error) {
    showToast('Validation failed: ' + error.message, 'error');
  } finally {
    hideLoading();
  }
}

async function handleSettingsSave(event) {
  event.preventDefault();
  
  var settings = {
    openaiApiKey: document.getElementById('api-key').value,
    aiModel: document.getElementById('ai-model').value,
    enableAiPlanning: document.getElementById('enable-planning').classList.contains('toggle-active'),
    enableAiAdjustments: document.getElementById('enable-adjustments').classList.contains('toggle-active'),
    enableAiStoreContent: document.getElementById('enable-store-content').classList.contains('toggle-active'),
    enableAiKeywords: document.getElementById('enable-keywords').classList.contains('toggle-active'),
    enableAiTaglines: document.getElementById('enable-taglines').classList.contains('toggle-active'),
    theme: document.querySelector('input[name="theme"]:checked').value,
    branding: document.getElementById('branding').value,
    autoSave: document.getElementById('auto-save').classList.contains('toggle-active'),
    notificationEnabled: document.getElementById('notifications').classList.contains('toggle-active')
  };
  
  try {
    AppState.settings = await window.electronAPI.updateSettings(settings);
    applyTheme(settings.theme);
    updateApiStatus();
    showToast('Settings saved successfully!', 'success');
  } catch (error) {
    showToast('Failed to save settings: ' + error.message, 'error');
  }
}

// ==================== Utility Functions ====================
async function loadProjects() {
  try {
    AppState.projects = await window.electronAPI.getAllProjects();
    updateProjectList();
  } catch (error) {
    console.error('Failed to load projects:', error);
    AppState.projects = [];
  }
}

function updateProjectList() {
  var listEl = document.getElementById('project-list');
  if (!listEl) return;
  
  if (AppState.projects.length === 0) {
    listEl.innerHTML = '<p class="text-sm text-surface-500 px-4">No projects yet</p>';
    return;
  }
  
  listEl.innerHTML = AppState.projects.slice(0, 10).map(function(p) {
    return '<a href="#" class="nav-link text-sm" onclick="openProject(\'' + p.id + '\')">' +
      '<div class="w-6 h-6 rounded bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center text-white text-xs font-bold">' +
        (p.name ? p.name.charAt(0).toUpperCase() : 'P') +
      '</div>' +
      '<span class="truncate">' + escapeHtml(p.name) + '</span>' +
    '</a>';
  }).join('');
}

function calculateProjectProgress(project) {
  if (!project.checklist || !project.checklist.items || project.checklist.items.length === 0) {
    return 0;
  }
  var completed = project.checklist.items.filter(function(item) { return item.completed; }).length;
  return Math.round((completed / project.checklist.items.length) * 100);
}

async function duplicateProject(projectId) {
  try {
    showLoading('Duplicating project...');
    await window.electronAPI.duplicateProject(projectId);
    await loadProjects();
    showToast('Project duplicated!', 'success');
    navigateTo('dashboard');
  } catch (error) {
    showToast('Failed to duplicate project', 'error');
  } finally {
    hideLoading();
  }
}

function confirmDeleteProject(projectId) {
  showModal(
    'Delete Project',
    '<p class="text-surface-300">Are you sure you want to delete this project? This action cannot be undone.</p>',
    [
      { text: 'Cancel', class: 'btn-secondary', onclick: 'closeModal()' },
      { text: 'Delete', class: 'btn-danger', onclick: 'deleteProject(\'' + projectId + '\')' }
    ]
  );
}

async function deleteProject(projectId) {
  closeModal();
  try {
    await window.electronAPI.deleteProject(projectId);
    await loadProjects();
    showToast('Project deleted', 'success');
    navigateTo('dashboard');
  } catch (error) {
    showToast('Failed to delete project', 'error');
  }
}

function editProjectBasics() {
  showToast('Edit functionality - navigate to project settings', 'info');
}

function viewAdjustment(index) {
  var adj = AppState.currentProject.adjustments[index];
  showModal(
    'Adjustment Details',
    '<div class="space-y-4">' +
      '<div>' +
        '<p class="text-sm text-surface-400">Request:</p>' +
        '<p class="mt-1">' + escapeHtml(adj.request) + '</p>' +
      '</div>' +
      '<div>' +
        '<p class="text-sm text-surface-400">AI Response:</p>' +
        '<pre class="mt-1 p-4 bg-surface-800 rounded text-sm overflow-auto">' + escapeHtml(JSON.stringify(adj.response, null, 2)) + '</pre>' +
      '</div>' +
    '</div>',
    [{ text: 'Close', class: 'btn-secondary', onclick: 'closeModal()' }]
  );
}

// ==================== Theme Functions ====================
function applyTheme(theme) {
  var root = document.documentElement;
  root.classList.remove('dark', 'light', 'midnight', 'sunset');
  
  if (theme === 'light') {
    root.classList.remove('dark');
    root.classList.add('light');
  } else if (theme === 'midnight') {
    root.classList.add('dark', 'midnight');
  } else if (theme === 'sunset') {
    root.classList.add('dark', 'sunset');
  } else {
    root.classList.add('dark');
  }
  
  updateThemeIcon(theme);
}

function toggleTheme() {
  var currentTheme = AppState.settings?.theme || 'dark';
  var newTheme = currentTheme === 'dark' ? 'light' : 'dark';
  
  applyTheme(newTheme);
  
  window.electronAPI.updateSettings({ theme: newTheme }).then(function(settings) {
    AppState.settings = settings;
  });
}

function updateThemeIcon(theme) {
  var icon = document.getElementById('theme-icon');
  if (icon) {
    if (theme === 'light') {
      icon.innerHTML = '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />';
    } else {
      icon.innerHTML = '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />';
    }
  }
}

// ==================== API Status ====================
function updateApiStatus() {
  var statusDot = document.getElementById('api-status');
  var statusText = document.getElementById('api-status-text');
  
  if (AppState.settings && AppState.settings.openaiApiKey) {
    statusDot.classList.remove('bg-red-500');
    statusDot.classList.add('bg-green-500');
    statusText.textContent = 'API Connected';
  } else {
    statusDot.classList.remove('bg-green-500');
    statusDot.classList.add('bg-red-500');
    statusText.textContent = 'API Not Configured';
  }
}

// ==================== Modal Functions ====================
function showModal(title, content, buttons) {
  var modalContainer = document.getElementById('modal-container');
  modalContainer.innerHTML = '' +
    '<div class="modal-overlay" onclick="closeModal()">' +
      '<div class="modal" onclick="event.stopPropagation()">' +
        '<div class="p-6 border-b border-surface-700">' +
          '<h3 class="text-xl font-bold">' + title + '</h3>' +
        '</div>' +
        '<div class="p-6 max-h-96 overflow-y-auto">' + content + '</div>' +
        '<div class="p-4 border-t border-surface-700 flex justify-end gap-2">' +
          buttons.map(function(btn) {
            return '<button class="' + btn.class + '" onclick="' + btn.onclick + '">' + btn.text + '</button>';
          }).join('') +
        '</div>' +
      '</div>' +
    '</div>';
  modalContainer.classList.remove('hidden');
}

function closeModal() {
  document.getElementById('modal-container').classList.add('hidden');
}

// ==================== Loading Functions ====================
function showLoading(text) {
  document.getElementById('loading-text').textContent = text || 'Loading...';
  var overlay = document.getElementById('loading-overlay');
  overlay.classList.remove('hidden');
  overlay.classList.add('flex');
}

function hideLoading() {
  var overlay = document.getElementById('loading-overlay');
  overlay.classList.add('hidden');
  overlay.classList.remove('flex');
}

// ==================== Toast Functions ====================
function showToast(message, type) {
  type = type || 'info';
  
  var colors = {
    'success': 'bg-green-500',
    'error': 'bg-red-500',
    'warning': 'bg-yellow-500',
    'info': 'bg-primary-500'
  };
  
  var icons = {
    'success': '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />',
    'error': '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />',
    'warning': '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />',
    'info': '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />'
  };
  
  var toast = document.createElement('div');
  toast.className = 'flex items-center gap-3 px-4 py-3 rounded-lg shadow-lg text-white animate-slide-up ' + colors[type];
  toast.innerHTML = '' +
    '<svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">' + icons[type] + '</svg>' +
    '<span>' + escapeHtml(message) + '</span>';
  
  document.getElementById('toast-container').appendChild(toast);
  
  setTimeout(function() {
    toast.classList.add('opacity-0', 'transition-opacity');
    setTimeout(function() {
      toast.remove();
    }, 300);
  }, 4000);
}

// ==================== Helper Functions ====================
function escapeHtml(text) {
  if (!text) return '';
  var div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

function escapeJsString(text) {
  if (!text) return '';
  return text
    .replace(/\\/g, '\\\\')
    .replace(/'/g, "\\'")
    .replace(/"/g, '\\"')
    .replace(/\n/g, '\\n')
    .replace(/\r/g, '\\r')
    .replace(/\t/g, '\\t');
}

function formatDate(dateStr) {
  if (!dateStr) return 'Unknown';
  var date = new Date(dateStr);
  var now = new Date();
  var diff = now - date;
  
  if (diff < 60000) return 'Just now';
  if (diff < 3600000) return Math.floor(diff / 60000) + 'm ago';
  if (diff < 86400000) return Math.floor(diff / 3600000) + 'h ago';
  if (diff < 604800000) return Math.floor(diff / 86400000) + 'd ago';
  
  return date.toLocaleDateString();
}

function copyToClipboard(text) {
  navigator.clipboard.writeText(text).then(function() {
    showToast('Copied to clipboard!', 'success');
  }).catch(function() {
    showToast('Failed to copy', 'error');
  });
}
