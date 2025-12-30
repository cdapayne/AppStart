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

const TechStackOptions = [
  { id: 'react', name: 'React', category: 'Frontend', icon: '⚛️' },
  { id: 'vue', name: 'Vue.js', category: 'Frontend', icon: '🎨' },
  { id: 'angular', name: 'Angular', category: 'Frontend', icon: '🅰️' },
  { id: 'svelte', name: 'Svelte', category: 'Frontend', icon: '🔥' },
  { id: 'nextjs', name: 'Next.js', category: 'Full Stack', icon: '🚀' },
  { id: 'nuxtjs', name: 'Nuxt.js', category: 'Full Stack', icon: '💚' },
  { id: 'electron', name: 'Electron', category: 'Desktop', icon: '💻' },
  { id: 'react-native', name: 'React Native', category: 'Mobile', icon: '📱' },
  { id: 'flutter', name: 'Flutter', category: 'Mobile', icon: '🐦' },
  { id: 'swift', name: 'Swift', category: 'Mobile', icon: '' },
  { id: 'kotlin', name: 'Kotlin', category: 'Mobile', icon: '🤖' },
  { id: 'nodejs', name: 'Node.js', category: 'Backend', icon: '⚙️' },
  { id: 'python', name: 'Python', category: 'Backend', icon: '🐍' },
  { id: 'ruby-on-rails', name: 'Ruby on Rails', category: 'Backend', icon: '💎' },
  { id: 'django', name: 'Django', category: 'Backend', icon: '🎸' },
  { id: 'laravel', name: 'Laravel', category: 'Backend', icon: '🐘' },
  { id: 'postgresql', name: 'PostgreSQL', category: 'Database', icon: '🐘' },
  { id: 'mongodb', name: 'MongoDB', category: 'Database', icon: '🍃' },
  { id: 'firebase', name: 'Firebase', category: 'Backend', icon: '🔥' },
  { id: 'aws', name: 'AWS', category: 'Cloud', icon: '☁️' },
  { id: 'gcp', name: 'Google Cloud', category: 'Cloud', icon: '☁️' },
  { id: 'azure', name: 'Azure', category: 'Cloud', icon: '☁️' },
  { id: 'html', name: 'HTML', category: 'Frontend', icon: '🌐' },
  { id: 'javascript', name: 'JavaScript', category: 'Frontend', icon: '📜' },
  { id: 'bootstrap', name: 'Bootstrap', category: 'Frontend', icon: '🅱️' },
  { id: 'android-java', name: 'Android (Java)', category: 'Mobile', icon: '☕' },
  { id: 'sqlite', name: 'SQLite', category: 'Database', icon: '💾' },
  { id: 'mysql', name: 'MySQL', category: 'Database', icon: '🐬' },
  { id: 'csharp', name: 'C#', category: 'Backend', icon: '💜' },
  { id: 'dotnet', name: '.NET', category: 'Backend', icon: '🔵' },
  { id: 'express', name: 'Express.js', category: 'Backend', icon: '🚂' },
  { id: 'iis', name: 'IIS', category: 'Backend', icon: '🖥️' },
  { id: 'asp-mvc', name: 'ASP.NET MVC', category: 'Backend', icon: '🌐' },
  { id: 'wpf', name: 'WPF', category: 'Desktop', icon: '🪟' },
  { id: 'winforms', name: 'WinForms', category: 'Desktop', icon: '📱' },
  { id: 'unity', name: 'Unity', category: 'Game Engine', icon: '🎮' },
  { id: 'unreal', name: 'Unreal Engine', category: 'Game Engine', icon: '🎯' },
  { id: 'openai', name: 'OpenAI API', category: 'API/Services', icon: '🤖' },
  { id: 'google-maps', name: 'Google Maps API', category: 'API/Services', icon: '🗺️' },
  { id: 'realm', name: 'Realm (MongoDB)', category: 'Database', icon: '🔮' },
  { id: 'typescript', name: 'TypeScript', category: 'Frontend', icon: '💙' },
  { id: 'css', name: 'CSS', category: 'Frontend', icon: '🎨' },
  { id: 'tailwind', name: 'Tailwind CSS', category: 'Frontend', icon: '💨' },
  { id: 'jquery', name: 'jQuery', category: 'Frontend', icon: '📚' },
  { id: 'swiftui', name: 'SwiftUI', category: 'Mobile', icon: '🍎' },
  { id: 'fastapi', name: 'FastAPI', category: 'Backend', icon: '⚡' },
  { id: 'php', name: 'PHP', category: 'Backend', icon: '🐘' },
  { id: 'java', name: 'Java', category: 'Backend', icon: '☕' },
  { id: 'spring-boot', name: 'Spring Boot', category: 'Backend', icon: '🍃' },
  { id: 'go', name: 'Go', category: 'Backend', icon: '🔵' },
  { id: 'rust', name: 'Rust', category: 'Backend', icon: '🦀' },
  { id: 'supabase', name: 'Supabase', category: 'Backend', icon: '⚡' },
  { id: 'redis', name: 'Redis', category: 'Database', icon: '🔴' },
  { id: 'godot', name: 'Godot', category: 'Game Engine', icon: '🤖' },
  { id: 'heroku', name: 'Heroku', category: 'Cloud', icon: '💜' },
  { id: 'vercel', name: 'Vercel', category: 'Cloud', icon: '▲' },
  { id: 'netlify', name: 'Netlify', category: 'Cloud', icon: '🌊' },
  { id: 'digitalocean', name: 'DigitalOcean', category: 'Cloud', icon: '🌊' },
  { id: 'docker', name: 'Docker', category: 'DevOps', icon: '🐳' },
  { id: 'kubernetes', name: 'Kubernetes', category: 'DevOps', icon: '☸️' },
  { id: 'graphql', name: 'GraphQL', category: 'API/Services', icon: '◬' },
  { id: 'rest-api', name: 'REST API', category: 'API/Services', icon: '🔌' },
  { id: 'stripe', name: 'Stripe API', category: 'API/Services', icon: '💳' },
  { id: 'twilio', name: 'Twilio', category: 'API/Services', icon: '📱' },
  { id: 'sendgrid', name: 'SendGrid', category: 'API/Services', icon: '📧' },
  { id: 'auth0', name: 'Auth0', category: 'API/Services', icon: '🔐' },
  { id: 'd3', name: 'D3.js', category: 'Data Visualization', icon: '📊' },
  { id: 'amcharts', name: 'amCharts', category: 'Data Visualization', icon: '📈' },
  { id: 'chartjs', name: 'Chart.js', category: 'Data Visualization', icon: '📉' },
  { id: 'highcharts', name: 'Highcharts', category: 'Data Visualization', icon: '📊' },
  { id: 'plotly', name: 'Plotly', category: 'Data Visualization', icon: '📈' },
  { id: 'recharts', name: 'Recharts', category: 'Data Visualization', icon: '📊' },
  { id: 'paypal', name: 'PayPal', category: 'Payments', icon: '💰' },
  { id: 'square', name: 'Square', category: 'Payments', icon: '⬛' },
  { id: 'braintree', name: 'Braintree', category: 'Payments', icon: '🌳' },
  { id: 'plaid', name: 'Plaid', category: 'Payments', icon: '🏦' },
  { id: 'razorpay', name: 'Razorpay', category: 'Payments', icon: '💳' },
];

const Stores = [
  { 
    id: 'apple', 
    name: 'Apple App Store', 
    icon: '🍎', 
    platforms: ['iOS', 'iPadOS', 'macOS'],
    distributionUrl: 'https://appstoreconnect.apple.com',
    fee: '$99/year',
    feeNote: 'Apple Developer Program membership required'
  },
  { 
    id: 'google', 
    name: 'Google Play Store', 
    icon: '🤖', 
    platforms: ['Android'],
    distributionUrl: 'https://play.google.com/console',
    fee: '$25 one-time',
    feeNote: 'One-time registration fee'
  },
  { 
    id: 'amazon', 
    name: 'Amazon Appstore', 
    icon: '📦', 
    platforms: ['Android', 'Fire OS'],
    distributionUrl: 'https://developer.amazon.com/apps-and-games',
    fee: 'Free',
    feeNote: 'No registration fee required'
  },
  { 
    id: 'microsoft', 
    name: 'Microsoft Store', 
    icon: '🪟', 
    platforms: ['Windows'],
    distributionUrl: 'https://partner.microsoft.com/dashboard',
    fee: '$19 one-time (Individual) / $99 one-time (Company)',
    feeNote: 'One-time registration fee'
  },
  { 
    id: 'linux', 
    name: 'Linux (Snap/Flatpak)', 
    icon: '🐧', 
    platforms: ['Linux'],
    distributionUrl: 'https://snapcraft.io/publisher',
    fee: 'Free',
    feeNote: 'Snap Store is free. Flathub: https://flathub.org'
  },
  { 
    id: 'xbox', 
    name: 'Xbox Store', 
    icon: '🎮', 
    platforms: ['Xbox'],
    distributionUrl: 'https://partner.microsoft.com/dashboard',
    fee: '$19 one-time (Individual) / $99 one-time (Company)',
    feeNote: 'Same as Microsoft Store - Xbox requires ID@Xbox program approval for games'
  },
  { 
    id: 'steam', 
    name: 'Steam', 
    icon: '🎯', 
    platforms: ['Windows', 'macOS', 'Linux'],
    distributionUrl: 'https://partner.steamgames.com',
    fee: '$100 per app',
    feeNote: 'Recoupable fee (returned after $1,000 in sales)'
  },
  { 
    id: 'meta-quest', 
    name: 'Meta Quest Store', 
    icon: '🥽', 
    platforms: ['Meta Quest', 'Quest 2', 'Quest 3', 'Quest Pro'],
    distributionUrl: 'https://developer.oculus.com',
    fee: 'Free (App Lab) / Invite Only (Main Store)',
    feeNote: 'App Lab is self-service. Main Quest Store requires approval from Meta.'
  }
];

// Popular app store markets for translations
const TranslationCountries = [
  { code: 'es', name: 'Spanish', flag: '🇪🇸', region: 'Spain/Latin America' },
  { code: 'zh-CN', name: 'Chinese (Simplified)', flag: '🇨🇳', region: 'China' },
  { code: 'zh-TW', name: 'Chinese (Traditional)', flag: '🇹🇼', region: 'Taiwan/Hong Kong' },
  { code: 'ja', name: 'Japanese', flag: '🇯🇵', region: 'Japan' },
  { code: 'ko', name: 'Korean', flag: '🇰🇷', region: 'South Korea' },
  { code: 'de', name: 'German', flag: '🇩🇪', region: 'Germany/Austria/Switzerland' },
  { code: 'fr', name: 'French', flag: '🇫🇷', region: 'France/Canada/Belgium' },
  { code: 'pt-BR', name: 'Portuguese (Brazil)', flag: '🇧🇷', region: 'Brazil' },
  { code: 'pt-PT', name: 'Portuguese (Portugal)', flag: '🇵🇹', region: 'Portugal' },
  { code: 'it', name: 'Italian', flag: '🇮🇹', region: 'Italy' },
  { code: 'ru', name: 'Russian', flag: '🇷🇺', region: 'Russia' },
  { code: 'ar', name: 'Arabic', flag: '🇸🇦', region: 'Middle East/North Africa' },
  { code: 'hi', name: 'Hindi', flag: '🇮🇳', region: 'India' },
  { code: 'id', name: 'Indonesian', flag: '🇮🇩', region: 'Indonesia' },
  { code: 'th', name: 'Thai', flag: '🇹🇭', region: 'Thailand' },
  { code: 'vi', name: 'Vietnamese', flag: '🇻🇳', region: 'Vietnam' },
  { code: 'tr', name: 'Turkish', flag: '🇹🇷', region: 'Turkey' },
  { code: 'nl', name: 'Dutch', flag: '🇳🇱', region: 'Netherlands/Belgium' },
  { code: 'pl', name: 'Polish', flag: '🇵🇱', region: 'Poland' },
  { code: 'sv', name: 'Swedish', flag: '🇸🇪', region: 'Sweden' },
  { code: 'da', name: 'Danish', flag: '🇩🇰', region: 'Denmark' },
  { code: 'no', name: 'Norwegian', flag: '🇳🇴', region: 'Norway' },
  { code: 'fi', name: 'Finnish', flag: '🇫🇮', region: 'Finland' },
  { code: 'uk', name: 'Ukrainian', flag: '🇺🇦', region: 'Ukraine' },
  { code: 'he', name: 'Hebrew', flag: '🇮🇱', region: 'Israel' },
  { code: 'ms', name: 'Malay', flag: '🇲🇾', region: 'Malaysia' },
  { code: 'el', name: 'Greek', flag: '🇬🇷', region: 'Greece' },
  { code: 'cs', name: 'Czech', flag: '🇨🇿', region: 'Czech Republic' },
  { code: 'ro', name: 'Romanian', flag: '🇷🇴', region: 'Romania' }
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
    
    // Apply font size
    applyFontSize(AppState.settings?.fontSize || 16);
    
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
    'project-pitch': 'The Pitch',
    'project-checklist': 'Development Checklist',
    'project-adjustments': 'Make Adjustments',
    'project-distribution': 'Distribution',
    'project-marketing': 'Marketing',
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
    case 'project-pitch':
      renderProjectPitch(content, data);
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
    case 'project-marketing':
      renderProjectMarketing(content, data);
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
async function renderDashboard(container) {
  // Reload projects to get fresh data
  await loadProjects();
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
          '<button onclick="importProjectFile()" class="btn-secondary">' +
            '<svg class="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16V4a2 2 0 012-2h6a2 2 0 012 2v12m-4-4l-3 3m0 0l3 3m-3-3h12" /></svg>' +
            'Import Project' +
          '</button>' +
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
    
    // Render icon - use uploaded icon if available, otherwise show initial letter
    var iconHtml = project.iconPath ?
      '<img src="file://' + escapeHtml(project.iconPath) + '" class="w-12 h-12 rounded-xl object-cover" />' :
      '<div class="w-12 h-12 rounded-xl bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center text-white font-bold text-lg">' +
        (project.name ? project.name.charAt(0).toUpperCase() : 'P') +
      '</div>';
    
    return '' +
      '<div class="card-hover p-6" onclick="openProject(\'' + project.id + '\')">' +
        '<div class="flex items-start justify-between mb-4">' +
          iconHtml +
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
            '<div id="connector-4-5" class="step-connector"></div>' +
            '<div id="step-5" class="step step-pending">5</div>' +
          '</div>' +
        '</div>' +
        '<div class="flex justify-between mt-2 text-xs text-surface-400">' +
          '<span>Basic Info</span>' +
          '<span>Target Market</span>' +
          '<span>Monetization</span>' +
          '<span>Description</span>' +
          '<span>Tech Stack</span>' +
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
            '<h3 class="text-2xl font-bold mb-6">App Description</h3>' +
            '<div class="space-y-6">' +
              '<div>' +
                '<label class="label">Describe your app in a few sentences *</label>' +
                '<textarea id="app-description" class="textarea" rows="4" placeholder="e.g., A social network for pet owners to share photos and tips." required></textarea>' +
              '</div>' +
            '</div>' +
            '<div class="flex justify-between mt-8">' +
              '<button type="button" onclick="prevStep(3)" class="btn-secondary">Previous</button>' +
              '<button type="button" onclick="nextStep(5)" class="btn-primary">Next Step</button>' +
            '</div>' +
          '</div>' +
          
          '<!-- Step 5: Tech Stack -->' +
          '<div id="form-step-5" class="form-step hidden">' +
            '<h3 class="text-2xl font-bold mb-6">Tech Stack</h3>' +
            '<div class="space-y-6">' +
              '<div>' +
                '<label class="label">Choose the technology for your project</label>' +
                '<p class="text-sm text-surface-400 mb-4">Select your preferred tech stack, or let the AI decide what\'s best.</p>' +
                '<div class="mb-4">' +
                  '<button type="button" id="ai-decide-tech" class="btn-secondary">Let AI Decide</button>' +
                '</div>' +
                '<div id="project-tech-stack-container" class="max-h-96 overflow-y-auto border border-surface-700 rounded-lg">' +
                  renderTechStackCheckboxes(AppState.settings?.userTechStack || [], 'project-tech-stack-checkbox') +
                '</div>' +
              '</div>' +
            '</div>' +
            '<div class="flex justify-between mt-8">' +
              '<button type="button" onclick="prevStep(4)" class="btn-secondary">Previous</button>' +
              '<button type="submit" class="btn-primary">Create Project</button>' +
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

function clearTechStack() {
  document.querySelectorAll('#project-tech-stack-container .project-tech-stack-checkbox').forEach(function(checkbox) {
    checkbox.checked = false;
  });
  showToast('Tech stack cleared. AI will decide the best technologies.', 'success');
}

function updateStepUI() {
  // Hide all steps
  document.querySelectorAll('.form-step').forEach(function(el) {
    el.classList.add('hidden');
  });
  
  // Show current step
  document.getElementById('form-step-' + currentStep).classList.remove('hidden');
  
  // Update step indicators
  for (var i = 1; i <= 5; i++) {
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

async function handleNewProjectSubmit(event, generatePlan = false) {
  if (event) event.preventDefault();
  
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
    description: document.getElementById('app-description').value,
    projectTechStack: Array.from(document.querySelectorAll('#project-tech-stack-container .tech-stack-checkbox:checked')).map(el => el.value)
  };
  
  // Validate required fields
  if (!projectData.name) {
    showToast('Please enter a project name', 'warning');
    return;
  }
  if (!projectData.appDescription) {
    showToast('Please describe your app', 'warning');
    return;
  }
  
  try {
    showLoading('Creating project...');
    
    // Create the project
    var project = await window.electronAPI.createProject(projectData);
    
    // Generate AI plan only if requested and API is configured
    if (generatePlan && AppState.settings.openaiApiKey) {
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
    } else if (generatePlan && !AppState.settings.openaiApiKey) {
      showToast('Project created! Add OpenAI API key in Settings to generate AI plans.', 'info');
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
  
  // Render icon - use uploaded icon if available, otherwise show initial letter
  var projectIconHtml = project.iconPath ?
    '<img src="file://' + escapeHtml(project.iconPath) + '" class="w-20 h-20 rounded-2xl object-cover shadow-glow" />' :
    '<div class="w-20 h-20 rounded-2xl bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center text-white font-bold text-3xl shadow-glow">' +
      (project.name ? project.name.charAt(0).toUpperCase() : 'P') +
    '</div>';
  
  container.innerHTML = ''+
    '<div class="max-w-6xl mx-auto animate-fade-in">' +
      '<!-- Project Header -->' +
      '<div class="card p-8 mb-6">' +
        '<div class="flex items-start justify-between">' +
          '<div class="flex items-start gap-6">' +
            projectIconHtml +
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
            '<button onclick="exportCurrentProject()" class="btn-secondary">' +
              '<svg class="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m-9 7h12a2 2 0 002-2V7a2 2 0 00-2-2h-3m-4 0H5a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>' +
              'Export .az' +
            '</button>' +
          '</div>' +
        '</div>' +
        
        '<!-- Progress Bars -->' +
        '<div class="mt-6 pt-6 border-t border-surface-700 space-y-4">' +
          '<div>' +
            '<div class="flex items-center justify-between text-sm mb-2">' +
              '<span class="text-surface-400">Development Progress</span>' +
              '<span class="font-semibold">' + (project.developmentProgress || 0) + '%</span>' +
            '</div>' +
            '<div class="progress-bar h-3">' +
              '<div class="progress-fill bg-accent-500" style="width: ' + (project.developmentProgress || 0) + '%"></div>' +
            '</div>' +
            '<p class="text-xs text-surface-500 mt-1">Based on AI agent steps completed</p>' +
          '</div>' +
          '<div>' +
            '<div class="flex items-center justify-between text-sm mb-2">' +
              '<span class="text-surface-400">Checklist Progress</span>' +
              '<span class="font-semibold">' + progress + '%</span>' +
            '</div>' +
            '<div class="progress-bar h-3">' +
              '<div class="progress-fill" style="width: ' + progress + '%"></div>' +
            '</div>' +
            '<p class="text-xs text-surface-500 mt-1">Based on checklist items completed</p>' +
          '</div>' +
        '</div>' +
      '</div>' +
      
      '<!-- Quick Actions -->' +
      '<div class="flex flex-wrap gap-3 mb-6">' +
        '<button onclick="navigateTo(\'project-planning\', AppState.currentProject)" class="card-hover px-4 py-3 flex items-center gap-3">' +
          '<div class="w-9 h-9 rounded-lg bg-primary-500/20 flex items-center justify-center flex-shrink-0">' +
            '<svg class="w-5 h-5 text-primary-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>' +
          '</div>' +
          '<div class="text-left">' +
            '<h4 class="font-semibold text-sm">AI Plan</h4>' +
            '<p class="text-xs text-surface-400">View plan</p>' +
          '</div>' +
        '</button>' +
        '<button onclick="navigateTo(\'project-pitch\', AppState.currentProject)" class="card-hover px-4 py-3 flex items-center gap-3">' +
          '<div class="w-9 h-9 rounded-lg bg-purple-500/20 flex items-center justify-center flex-shrink-0">' +
            '<svg class="w-5 h-5 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" /></svg>' +
          '</div>' +
          '<div class="text-left">' +
            '<h4 class="font-semibold text-sm">The Pitch</h4>' +
            '<p class="text-xs text-surface-400">Sell it</p>' +
          '</div>' +
        '</button>' +
        '<button onclick="navigateTo(\'project-checklist\', AppState.currentProject)" class="card-hover px-4 py-3 flex items-center gap-3">' +
          '<div class="w-9 h-9 rounded-lg bg-green-500/20 flex items-center justify-center flex-shrink-0">' +
            '<svg class="w-5 h-5 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" /></svg>' +
          '</div>' +
          '<div class="text-left">' +
            '<h4 class="font-semibold text-sm">Checklist</h4>' +
            '<p class="text-xs text-surface-400">Track progress</p>' +
          '</div>' +
        '</button>' +
        '<button onclick="navigateTo(\'project-adjustments\', AppState.currentProject)" class="card-hover px-4 py-3 flex items-center gap-3">' +
          '<div class="w-9 h-9 rounded-lg bg-accent-500/20 flex items-center justify-center flex-shrink-0">' +
            '<svg class="w-5 h-5 text-accent-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" /></svg>' +
          '</div>' +
          '<div class="text-left">' +
            '<h4 class="font-semibold text-sm">Adjustments</h4>' +
            '<p class="text-xs text-surface-400">Refine plan</p>' +
          '</div>' +
        '</button>' +
        '<button onclick="navigateTo(\'project-distribution\', AppState.currentProject)" class="card-hover px-4 py-3 flex items-center gap-3">' +
          '<div class="w-9 h-9 rounded-lg bg-orange-500/20 flex items-center justify-center flex-shrink-0">' +
            '<svg class="w-5 h-5 text-orange-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" /></svg>' +
          '</div>' +
          '<div class="text-left">' +
            '<h4 class="font-semibold text-sm">Distribution</h4>' +
            '<p class="text-xs text-surface-400">App stores</p>' +
          '</div>' +
        '</button>' +
        '<button onclick="navigateTo(\'project-marketing\', AppState.currentProject)" class="card-hover px-4 py-3 flex items-center gap-3">' +
          '<div class="w-9 h-9 rounded-lg bg-pink-500/20 flex items-center justify-center flex-shrink-0">' +
            '<svg class="w-5 h-5 text-pink-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z" /></svg>' +
          '</div>' +
          '<div class="text-left">' +
            '<h4 class="font-semibold text-sm">Marketing</h4>' +
            '<p class="text-xs text-surface-400">Promote app</p>' +
          '</div>' +
        '</button>' +
      '</div>' +
      
      '<!-- Live Store Links (populated dynamically) -->' +
      '<div id="live-store-links-section"></div>' +
      
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
      
      '<!-- Project Tech Stack -->' +
      (project.projectTechStack && project.projectTechStack.length > 0 ?
        '<div class="card p-6 mb-6 mt-6">' +
          '<h4 class="font-semibold mb-4 flex items-center gap-2">' +
            '<svg class="w-5 h-5 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" /></svg>' +
            'Selected Tech Stack' +
          '</h4>' +
          '<div class="flex flex-wrap gap-2">' +
            project.projectTechStack.map(function(techId) {
              var tech = TechStackOptions.find(function(t) { return t.id === techId; });
              if (tech) {
                return '<span class="badge bg-surface-700 text-surface-200">' + tech.icon + ' ' + escapeHtml(tech.name) + '</span>';
              }
              return '';
            }).join('') +
          '</div>' +
        '</div>' : '') +
      
      '<div class="grid grid-cols-2 gap-6">' +
      '</div>' +
    '</div>';
  
  // Load and display live store links
  loadLiveStoreLinks(project.id);
}

function getProjectExportFilename(projectName) {
  var baseName = (projectName || 'project')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
  if (!baseName) {
    baseName = 'project';
  }
  return baseName + '.az';
}

function buildProjectExportData(project, storeSubmissions) {
  return {
    format: 'appstart-project',
    formatVersion: 1,
    exportedAt: new Date().toISOString(),
    project: project,
    storeSubmissions: storeSubmissions || []
  };
}

async function exportCurrentProject() {
  var project = AppState.currentProject;
  if (!project) {
    showToast('No project selected', 'error');
    return;
  }
  
  showLoading('Preparing export...');
  
  try {
    var submissions = await window.electronAPI.getStoreSubmissions(project.id);
    var exportData = buildProjectExportData(project, submissions);
    var filename = getProjectExportFilename(project.name);
    var savedPath = await window.electronAPI.saveProjectFile(filename, JSON.stringify(exportData, null, 2));
    if (savedPath) {
      showToast('Project exported!', 'success');
    }
  } catch (error) {
    showToast('Export failed: ' + error.message, 'error');
  } finally {
    hideLoading();
  }
}

async function importProjectFile() {
  showLoading('Importing project...');
  
  try {
    var result = await window.electronAPI.openProjectFile();
    if (!result || !result.content) {
      return;
    }
    
    var data = null;
    try {
      data = JSON.parse(result.content);
    } catch (error) {
      showToast('Invalid project file: ' + error.message, 'error');
      return;
    }
    
    var projectData = data.project || data;
    if (!projectData || !projectData.name) {
      showToast('Project file is missing required data', 'error');
      return;
    }
    
    var created = await window.electronAPI.createProject({
      name: projectData.name,
      description: projectData.description || '',
      targetMarkets: projectData.targetMarkets || [],
      ageRangeMin: projectData.ageRangeMin || 0,
      ageRangeMax: projectData.ageRangeMax || 99,
      category: projectData.category || '',
      subcategory: projectData.subcategory || '',
      monetization: projectData.monetization || 'free',
      appDescription: projectData.appDescription || ''
    });
    
    var updated = await window.electronAPI.updateProject(created.id, {
      status: projectData.status,
      aiPlan: projectData.aiPlan,
      agentInstructions: projectData.agentInstructions,
      checklist: projectData.checklist,
      adjustments: projectData.adjustments,
      currentStep: projectData.currentStep,
      iconPath: projectData.iconPath,
      marketingData: projectData.marketingData,
      pitch: projectData.pitch,
      projectTechStack: projectData.projectTechStack,
      developmentProgress: projectData.developmentProgress,
      completedSteps: projectData.completedSteps,
      githubRepo: projectData.githubRepo,
      githubRepoName: projectData.githubRepoName,
      githubConnectedCodex: projectData.githubConnectedCodex
    });
    
    var storeSubmissions = data.storeSubmissions || [];
    for (var i = 0; i < storeSubmissions.length; i++) {
      var submission = storeSubmissions[i];
      if (!submission || !submission.storeType) {
        continue;
      }
      
      var createdSubmission = await window.electronAPI.createStoreSubmission(updated.id, submission.storeType);
      await window.electronAPI.updateStoreSubmission(createdSubmission.id, {
        appName: submission.appName,
        category: submission.category,
        keywords: submission.keywords,
        shortDescription: submission.shortDescription,
        longDescription: submission.longDescription,
        tagline: submission.tagline,
        privacyPolicyUrl: submission.privacyPolicyUrl,
        supportUrl: submission.supportUrl,
        marketingUrl: submission.marketingUrl,
        iconPath: submission.iconPath,
        screenshots: submission.screenshots,
        phoneScreenshots: submission.phoneScreenshots,
        tabletScreenshots: submission.tabletScreenshots,
        promoVideoPath: submission.promoVideoPath,
        featureGraphicPath: submission.featureGraphicPath,
        status: submission.status,
        metadata: submission.metadata,
        liveStoreUrl: submission.liveStoreUrl,
        translations: submission.translations
      });
    }
    
    await loadProjects();
    AppState.currentProject = updated;
    showToast('Project imported!', 'success');
    navigateTo('project-view', updated);
  } catch (error) {
    showToast('Import failed: ' + error.message, 'error');
  } finally {
    hideLoading();
  }
}

// Load live store links for the project overview
async function loadLiveStoreLinks(projectId) {
  var container = document.getElementById('live-store-links-section');
  if (!container) return;
  
  try {
    var submissions = await window.electronAPI.getStoreSubmissions(projectId);
    var liveLinks = submissions.filter(function(s) { return s.liveStoreUrl; });
    
    if (liveLinks.length === 0) {
      container.innerHTML = '';
      return;
    }
    
    container.innerHTML = '' +
      '<div class="card p-6 mb-6 bg-gradient-to-r from-green-900/20 to-emerald-900/20 border-green-500/30">' +
        '<div class="flex items-center justify-between mb-4">' +
          '<h4 class="font-semibold flex items-center gap-2">' +
            '<svg class="w-5 h-5 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>' +
            '🎉 Live on App Stores' +
          '</h4>' +
          '<button onclick="editLiveStoreLinks()" class="btn-ghost text-sm">' +
            '<svg class="w-4 h-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>' +
            'Edit Links' +
          '</button>' +
        '</div>' +
        '<div class="flex flex-wrap gap-3">' +
          liveLinks.map(function(submission) {
            var store = Stores.find(function(s) { return s.id === submission.storeType; });
            return '<a href="' + escapeHtml(submission.liveStoreUrl) + '" target="_blank" class="flex items-center gap-3 px-4 py-3 bg-surface-800/50 rounded-xl hover:bg-surface-700/50 transition-colors group">' +
              '<span class="text-2xl">' + (store ? store.icon : '📱') + '</span>' +
              '<div>' +
                '<p class="font-semibold text-sm group-hover:text-green-400 transition-colors">' + (store ? store.name : submission.storeType) + '</p>' +
                '<p class="text-xs text-surface-400">View listing →</p>' +
              '</div>' +
            '</a>';
          }).join('') +
        '</div>' +
      '</div>';
  } catch (error) {
    console.error('Failed to load live store links:', error);
  }
}

// Edit live store links modal
async function editLiveStoreLinks() {
  var project = AppState.currentProject;
  if (!project) return;
  
  try {
    var submissions = await window.electronAPI.getStoreSubmissions(project.id);
    
    // Get list of stores that have submissions
    var existingStoreTypes = submissions.map(function(s) { return s.storeType; });
    
    // Build form with existing submissions
    var formHtml = '<form id="edit-store-links-form" class="space-y-4">' +
      '<p class="text-surface-400 text-sm mb-4">Add the live store URLs for your published app. These will be displayed on the project overview.</p>';
    
    if (submissions.length > 0) {
      formHtml += '<div class="space-y-3">' +
        submissions.map(function(submission) {
          var store = Stores.find(function(s) { return s.id === submission.storeType; });
          return '<div class="flex items-center gap-4">' +
            '<div class="flex items-center gap-2 w-40">' +
              '<span class="text-xl">' + (store ? store.icon : '📱') + '</span>' +
              '<span class="font-medium text-sm">' + (store ? store.name : submission.storeType) + '</span>' +
            '</div>' +
            '<input type="url" id="store-url-' + submission.id + '" class="input flex-1" ' +
              'placeholder="https://apps.apple.com/..." ' +
              'value="' + escapeHtml(submission.liveStoreUrl || '') + '">' +
          '</div>';
        }).join('') +
      '</div>';
    } else {
      formHtml += '<p class="text-surface-500 text-center py-4">No store submissions yet.</p>';
    }
    
    // Add option to add new store
    var availableStores = Stores.filter(function(s) { return existingStoreTypes.indexOf(s.id) === -1; });
    if (availableStores.length > 0) {
      formHtml += '<div class="pt-4 border-t border-surface-700">' +
        '<p class="text-sm font-medium mb-2">Add a new store link:</p>' +
        '<div class="flex items-center gap-3">' +
          '<select id="new-store-select" class="select flex-1">' +
            '<option value="">Select a store...</option>' +
            availableStores.map(function(store) {
              return '<option value="' + store.id + '">' + store.icon + ' ' + store.name + '</option>';
            }).join('') +
          '</select>' +
          '<button type="button" onclick="addNewStoreLink()" class="btn-secondary">' +
            '<svg class="w-4 h-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" /></svg>' +
            'Add' +
          '</button>' +
        '</div>' +
      '</div>';
    }
    
    formHtml += '</form>';
    
    showModal(
      'Edit Live Store Links',
      formHtml,
      [
        { text: 'Cancel', class: 'btn-secondary', onclick: 'closeModal()' },
        { text: 'Save Links', class: 'btn-primary', onclick: 'saveLiveStoreLinks()' }
      ]
    );
  } catch (error) {
    showToast('Failed to load store submissions: ' + error.message, 'error');
  }
}

// Add a new store link
async function addNewStoreLink() {
  var project = AppState.currentProject;
  if (!project) return;
  
  var storeSelect = document.getElementById('new-store-select');
  var storeType = storeSelect ? storeSelect.value : '';
  
  if (!storeType) {
    showToast('Please select a store', 'warning');
    return;
  }
  
  try {
    showLoading('Adding store...');
    await window.electronAPI.createStoreSubmission(project.id, storeType);
    closeModal();
    showToast('Store added! You can now enter the URL.', 'success');
    // Re-open the modal with the new store
    setTimeout(function() {
      editLiveStoreLinks();
    }, 100);
  } catch (error) {
    showToast('Failed to add store: ' + error.message, 'error');
  } finally {
    hideLoading();
  }
}

// Save live store links
async function saveLiveStoreLinks() {
  var project = AppState.currentProject;
  if (!project) return;
  
  showLoading('Saving store links...');
  
  try {
    var submissions = await window.electronAPI.getStoreSubmissions(project.id);
    
    for (var i = 0; i < submissions.length; i++) {
      var submission = submissions[i];
      var urlInput = document.getElementById('store-url-' + submission.id);
      if (urlInput) {
        var newUrl = urlInput.value.trim();
        if (newUrl !== (submission.liveStoreUrl || '')) {
          await window.electronAPI.updateStoreSubmission(submission.id, { liveStoreUrl: newUrl || null });
        }
      }
    }
    
    closeModal();
    showToast('Store links saved!', 'success');
    
    // Refresh the live store links section
    loadLiveStoreLinks(project.id);
  } catch (error) {
    showToast('Failed to save store links: ' + error.message, 'error');
  } finally {
    hideLoading();
  }
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
              '<button onclick="toggleInstructionView()" class="ml-auto btn-ghost text-sm" id="instruction-view-toggle">' +
                '<svg class="w-4 h-4 mr-1 inline" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 10h16M4 14h16M4 18h16" /></svg>' +
                '<span id="instruction-view-text">Full View</span>' +
              '</button>' +
            '</h3>' +
            
            '<!-- Full Instructions View (hidden by default) -->' +
            '<div id="full-instructions-view" class="hidden">' +
              '<div class="bg-surface-800 rounded-lg p-4 font-mono text-sm text-surface-300 whitespace-pre-wrap overflow-x-auto max-h-96 overflow-y-auto">' +
                escapeHtml(aiPlan.agentInstructions || project.agentInstructions || 'No agent instructions generated') +
              '</div>' +
            '</div>' +
            
            '<!-- Step-by-Step Instructions View (shown by default) -->' +
            '<div id="step-instructions-view">' +
              renderStepByStepInstructions(aiPlan.agentInstructions || project.agentInstructions || '') +
            '</div>' +
            
            '<!-- Development Progress Tracker -->' +
            '<div class="mt-6 p-4 bg-surface-800/50 rounded-lg border border-surface-700">' +
              '<div class="flex items-center justify-between mb-3">' +
                '<label class="font-semibold text-sm">Development Progress</label>' +
                '<span id="dev-progress-value" class="text-lg font-bold text-accent-400">' + (project.developmentProgress || 0) + '%</span>' +
              '</div>' +
              '<input type="range" id="dev-progress-slider" class="w-full" min="0" max="100" step="5" value="' + (project.developmentProgress || 0) + '" oninput="updateDevProgressDisplay(this.value)">' +
              '<div class="flex justify-between text-xs text-surface-500 mt-2">' +
                '<span>Not Started</span>' +
                '<span>In Progress</span>' +
                '<span>Complete</span>' +
              '</div>' +
              '<button onclick="saveDevelopmentProgress()" class="btn-primary w-full mt-3">Save Progress</button>' +
              '<p class="text-xs text-surface-400 mt-2">Track your progress as you complete the AI agent steps above</p>' +
            '</div>' +
            
            '<div class="flex flex-wrap gap-3 mt-4">' +
              '<button onclick="copyToClipboard(AppState.currentProject.aiPlan.agentInstructions || AppState.currentProject.agentInstructions)" class="btn-secondary">' +
                '<svg class="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>' +
                'Copy All Instructions' +
              '</button>' +
              '<button onclick="showCreateGithubRepoModal()" class="btn-secondary">' +
                '<svg class="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>' +
                'Create GitHub Repo' +
              '</button>' +
              (AppState.settings.experimentalCodex ? 
                '<button onclick="buildWithCodex()" class="btn-primary bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600">' +
                  '<svg class="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>' +
                  'Build with Codex' +
                  '<span class="ml-2 text-xs bg-white/20 px-1.5 py-0.5 rounded">BETA</span>' +
                '</button>' : '') +
            '</div>' +
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
        
        // No AI Plan - Show options to generate or create manually
        '<div class="card p-8">' +
          '<h3 class="text-2xl font-bold mb-6">Development Plan</h3>' +
          '<p class="text-surface-400 mb-8">Choose how you want to create your development plan:</p>' +
          
          '<div class="grid grid-cols-2 gap-6 mb-8">' +
            '<!-- AI Generation Option -->' +
            '<div class="card-hover p-6 border-2 border-surface-700 hover:border-primary-500 cursor-pointer" onclick="generatePlan()">' +
              '<div class="w-16 h-16 rounded-full bg-primary-500/20 flex items-center justify-center mx-auto mb-4">' +
                '<svg class="w-8 h-8 text-primary-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>' +
              '</div>' +
              '<h4 class="text-lg font-semibold text-center mb-2">Generate with AI</h4>' +
              '<p class="text-surface-400 text-sm text-center">Let AI analyze your project and create a comprehensive development plan automatically.</p>' +
              (!AppState.settings.openaiApiKey ? '<p class="text-yellow-400 text-xs text-center mt-2">⚠️ Requires API key</p>' : '') +
            '</div>' +
            
            '<!-- Manual Entry Option -->' +
            '<div class="card-hover p-6 border-2 border-surface-700 hover:border-accent-500 cursor-pointer" onclick="showManualPlanForm()">' +
              '<div class="w-16 h-16 rounded-full bg-accent-500/20 flex items-center justify-center mx-auto mb-4">' +
                '<svg class="w-8 h-8 text-accent-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>' +
              '</div>' +
              '<h4 class="text-lg font-semibold text-center mb-2">Create Manually</h4>' +
              '<p class="text-surface-400 text-sm text-center">Write your own development plan with custom overview, features, and instructions.</p>' +
            '</div>' +
          '</div>' +
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
  const planContainer = document.getElementById('content');
  planContainer.innerHTML = `
    <div class="max-w-5xl mx-auto animate-fade-in">
      <div class="card p-8">
        <h3 class="text-2xl font-bold mb-4">Generating AI Plan...</h3>
        <p class="text-surface-400 mb-6">The AI is analyzing your project. This may take a few moments. Please wait while the plan is being generated.</p>
        <div class="bg-surface-800 rounded-lg p-4 font-mono text-sm text-surface-300 whitespace-pre-wrap overflow-auto min-h-[300px]" id="streaming-plan"></div>
      </div>
    </div>
  `;

  const streamingPlanEl = document.getElementById('streaming-plan');
  let fullPlan = '';

  const chunkListener = (chunk) => {
    fullPlan += chunk;
    streamingPlanEl.textContent = fullPlan;
  };

  const errorListener = (error) => {
    showToast(`Failed to generate plan: ${error}`, 'error');
    hideLoading();
    // Clean up listeners
    window.electronAPI.removeListener('openai:plan-chunk', chunkListener);
    window.electronAPI.removeListener('openai:plan-error', errorListener);
    window.electronAPI.removeListener('openai:plan-finished', finishedListener);
  };

  const finishedListener = async () => {
    try {
      const aiPlan = JSON.parse(fullPlan);
      const updatedProject = await window.electronAPI.updateProject(AppState.currentProject.id, {
        aiPlan: aiPlan,
        agentInstructions: aiPlan.agentInstructions,
        checklist: aiPlan.checklist
      });
      
      AppState.currentProject = updatedProject;
      showToast('AI plan generated successfully!', 'success');
      navigateTo('project-planning', updatedProject);
    } catch (parseError) {
      console.error('Plan parsing error:', parseError);
      showToast('Failed to parse the generated plan. The response might be incomplete.', 'error');
    } finally {
      hideLoading();
      // Clean up listeners
      window.electronAPI.removeListener('openai:plan-chunk', chunkListener);
      window.electronAPI.removeListener('openai:plan-error', errorListener);
      window.electronAPI.removeListener('openai:plan-finished', finishedListener);
    }
  };

  window.electronAPI.on('openai:plan-chunk', chunkListener);
  window.electronAPI.on('openai:plan-error', errorListener);
  window.electronAPI.on('openai:plan-finished', finishedListener);

  try {
    // This call now just initiates the streaming
    await window.electronAPI.generatePlan(AppState.currentProject);
  } catch (error) {
    // Error is handled by the 'openai:plan-error' listener
    console.error('Plan generation initiation error:', error);
  }
}

async function regeneratePlan() {
  if (confirm('This will replace your existing plan. Are you sure?')) {
    await generatePlan();
  }
}

function showManualPlanForm() {
  var content = document.getElementById('content');
  content.innerHTML = '' +
    '<div class="max-w-5xl mx-auto animate-fade-in">' +
      '<button onclick="navigateTo(\'project-planning\', AppState.currentProject)" class="btn-ghost mb-6">' +
        '<svg class="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" /></svg>' +
        'Back' +
      '</button>' +
      
      '<form onsubmit="saveManualPlan(event)" class="space-y-6">' +
        '<div class="card p-6">' +
          '<h3 class="text-xl font-bold mb-4">Create Your Development Plan</h3>' +
          
          '<div class="mb-6">' +
            '<label class="label">Project Overview *</label>' +
            '<textarea id="manual-overview" class="textarea min-h-[120px]" placeholder="Describe the overall vision and goals for your app..." required></textarea>' +
          '</div>' +
          
          '<div class="mb-6">' +
            '<label class="label">Key Features (one per line)</label>' +
            '<textarea id="manual-features" class="textarea min-h-[100px]" placeholder="User authentication\\nPush notifications\\nOffline mode\\netc..."></textarea>' +
          '</div>' +
          
          '<div class="grid grid-cols-2 gap-4 mb-6">' +
            '<div>' +
              '<label class="label">Frontend Technologies</label>' +
              '<input type="text" id="manual-frontend" class="input" placeholder="React, Vue, Swift, etc.">' +
            '</div>' +
            '<div>' +
              '<label class="label">Backend Technologies</label>' +
              '<input type="text" id="manual-backend" class="input" placeholder="Node.js, Python, etc.">' +
            '</div>' +
            '<div>' +
              '<label class="label">Database</label>' +
              '<input type="text" id="manual-database" class="input" placeholder="PostgreSQL, MongoDB, etc.">' +
            '</div>' +
            '<div>' +
              '<label class="label">Third-Party Services</label>' +
              '<input type="text" id="manual-thirdparty" class="input" placeholder="Firebase, Stripe, etc.">' +
            '</div>' +
          '</div>' +
          
          '<div class="mb-6">' +
            '<label class="label">Development Instructions / Notes</label>' +
            '<textarea id="manual-instructions" class="textarea min-h-[150px]" placeholder="Add any development instructions, coding guidelines, or notes for building this app..."></textarea>' +
          '</div>' +
          
          '<div class="flex gap-4">' +
            '<button type="submit" class="btn-primary">Save Plan</button>' +
            '<button type="button" onclick="navigateTo(\'project-planning\', AppState.currentProject)" class="btn-secondary">Cancel</button>' +
          '</div>' +
        '</div>' +
      '</form>' +
    '</div>';
}

async function saveManualPlan(event) {
  event.preventDefault();
  
  var overview = document.getElementById('manual-overview').value;
  var featuresText = document.getElementById('manual-features').value;
  var features = featuresText ? featuresText.split('\\n').map(function(f) { return f.trim(); }).filter(function(f) { return f; }) : [];
  
  var frontend = document.getElementById('manual-frontend').value;
  var backend = document.getElementById('manual-backend').value;
  var database = document.getElementById('manual-database').value;
  var thirdparty = document.getElementById('manual-thirdparty').value;
  var instructions = document.getElementById('manual-instructions').value;
  
  var aiPlan = {
    overview: overview,
    keyFeatures: features,
    techStack: {
      frontend: frontend ? frontend.split(',').map(function(t) { return t.trim(); }) : [],
      backend: backend ? backend.split(',').map(function(t) { return t.trim(); }) : [],
      database: database ? database.split(',').map(function(t) { return t.trim(); }) : [],
      thirdParty: thirdparty ? thirdparty.split(',').map(function(t) { return t.trim(); }) : []
    },
    agentInstructions: instructions,
    timeline: null,
    checklist: null
  };
  
  try {
    showLoading('Saving plan...');
    var updatedProject = await window.electronAPI.updateProject(AppState.currentProject.id, {
      aiPlan: aiPlan,
      agentInstructions: instructions
    });
    
    AppState.currentProject = updatedProject;
    showToast('Plan saved successfully!', 'success');
    navigateTo('project-planning', updatedProject);
  } catch (error) {
    showToast('Failed to save plan: ' + error.message, 'error');
  } finally {
    hideLoading();
  }
}

function editProjectPlan() {
  var aiPlan = AppState.currentProject.aiPlan || {};
  var content = document.getElementById('content');
  
  content.innerHTML = '' +
    '<div class="max-w-5xl mx-auto animate-fade-in">' +
      '<button onclick="navigateTo(\'project-adjustments\', AppState.currentProject)" class="btn-ghost mb-6">' +
        '<svg class="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" /></svg>' +
        'Back' +
      '</button>' +
      
      '<form onsubmit="saveEditedPlan(event)" class="space-y-6">' +
        '<div class="card p-6">' +
          '<h3 class="text-xl font-bold mb-4">Edit Development Plan</h3>' +
          
          '<div class="mb-6">' +
            '<label class="label">Project Overview</label>' +
            '<textarea id="edit-overview" class="textarea min-h-[120px]">' + escapeHtml(aiPlan.overview || '') + '</textarea>' +
          '</div>' +
          
          '<div class="mb-6">' +
            '<label class="label">Key Features (one per line)</label>' +
            '<textarea id="edit-features" class="textarea min-h-[100px]">' + (aiPlan.keyFeatures || []).join('\\n') + '</textarea>' +
          '</div>' +
          
          '<div class="grid grid-cols-2 gap-4 mb-6">' +
            '<div>' +
              '<label class="label">Frontend Technologies</label>' +
              '<input type="text" id="edit-frontend" class="input" value="' + escapeHtml((aiPlan.techStack?.frontend || []).join(', ')) + '">' +
            '</div>' +
            '<div>' +
              '<label class="label">Backend Technologies</label>' +
              '<input type="text" id="edit-backend" class="input" value="' + escapeHtml((aiPlan.techStack?.backend || []).join(', ')) + '">' +
            '</div>' +
            '<div>' +
              '<label class="label">Database</label>' +
              '<input type="text" id="edit-database" class="input" value="' + escapeHtml((aiPlan.techStack?.database || []).join(', ')) + '">' +
            '</div>' +
            '<div>' +
              '<label class="label">Third-Party Services</label>' +
              '<input type="text" id="edit-thirdparty" class="input" value="' + escapeHtml((aiPlan.techStack?.thirdParty || []).join(', ')) + '">' +
            '</div>' +
          '</div>' +
          
          '<div class="mb-6">' +
            '<label class="label">Development Instructions / Notes</label>' +
            '<textarea id="edit-instructions" class="textarea min-h-[150px]">' + escapeHtml(aiPlan.agentInstructions || AppState.currentProject.agentInstructions || '') + '</textarea>' +
          '</div>' +
          
          '<div class="flex gap-4">' +
            '<button type="submit" class="btn-primary">Save Changes</button>' +
            '<button type="button" onclick="navigateTo(\'project-adjustments\', AppState.currentProject)" class="btn-secondary">Cancel</button>' +
          '</div>' +
        '</div>' +
      '</form>' +
    '</div>';
}

async function saveEditedPlan(event) {
  event.preventDefault();
  
  var overview = document.getElementById('edit-overview').value;
  var featuresText = document.getElementById('edit-features').value;
  var features = featuresText ? featuresText.split('\\n').map(function(f) { return f.trim(); }).filter(function(f) { return f; }) : [];
  
  var frontend = document.getElementById('edit-frontend').value;
  var backend = document.getElementById('edit-backend').value;
  var database = document.getElementById('edit-database').value;
  var thirdparty = document.getElementById('edit-thirdparty').value;
  var instructions = document.getElementById('edit-instructions').value;
  
  var existingPlan = AppState.currentProject.aiPlan || {};
  
  var aiPlan = {
    overview: overview,
    keyFeatures: features,
    techStack: {
      frontend: frontend ? frontend.split(',').map(function(t) { return t.trim(); }) : [],
      backend: backend ? backend.split(',').map(function(t) { return t.trim(); }) : [],
      database: database ? database.split(',').map(function(t) { return t.trim(); }) : [],
      thirdParty: thirdparty ? thirdparty.split(',').map(function(t) { return t.trim(); }) : []
    },
    agentInstructions: instructions,
    timeline: existingPlan.timeline || null,
    checklist: existingPlan.checklist || null
  };
  
  try {
    showLoading('Saving changes...');
    var updatedProject = await window.electronAPI.updateProject(AppState.currentProject.id, {
      aiPlan: aiPlan,
      agentInstructions: instructions
    });
    
    AppState.currentProject = updatedProject;
    showToast('Plan updated successfully!', 'success');
    navigateTo('project-planning', updatedProject);
  } catch (error) {
    showToast('Failed to save changes: ' + error.message, 'error');
  } finally {
    hideLoading();
  }
}

// ==================== Project Pitch ====================
function renderProjectPitch(container, project) {
  if (!project) {
    container.innerHTML = '<p>Project not found</p>';
    return;
  }
  
  AppState.currentProject = project;
  var pitch = project.pitch || null;
  
  container.innerHTML = 
    '<div class="max-w-4xl mx-auto">' +
      '<!-- Back Navigation -->' +
      '<button onclick="navigateTo(\'project-view\', AppState.currentProject)" class="btn-ghost mb-6">' +
        '<svg class="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>' +
        'Back to Project' +
      '</button>' +
      
      '<div class="card p-8">' +
        '<!-- Header -->' +
        '<div class="flex items-center gap-4 mb-6">' +
          '<div class="w-16 h-16 rounded-full bg-purple-500/20 flex items-center justify-center">' +
            '<svg class="w-8 h-8 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" /></svg>' +
          '</div>' +
          '<div>' +
            '<h2 class="text-2xl font-bold">The Pitch</h2>' +
            '<p class="text-surface-400">Your Shark Tank meets TED Talk moment</p>' +
          '</div>' +
        '</div>' +
        
        (pitch ? 
          // Show existing pitch
          '<div class="space-y-6">' +
            '<!-- Pitch Content -->' +
            '<div class="bg-gradient-to-br from-purple-900/30 to-surface-800 rounded-xl p-6 border border-purple-500/20 max-h-[60vh] overflow-y-auto">' +
              '<div class="prose prose-invert max-w-none">' +
                '<div id="pitch-content" class="text-lg leading-relaxed whitespace-pre-wrap">' + escapeHtml(pitch.content || '') + '</div>' +
              '</div>' +
            '</div>' +
            
            '<!-- Pitch Meta -->' +
            (pitch.generatedAt ? 
              '<p class="text-xs text-surface-500 text-center">Generated on ' + new Date(pitch.generatedAt).toLocaleDateString() + ' • ' + (pitch.content ? pitch.content.split(/\\s+/).length : 0) + ' words</p>' : '') +
            
            '<!-- Actions -->' +
            '<div class="flex flex-wrap gap-4 justify-center">' +
              '<button onclick="regeneratePitch()" class="btn-secondary">' +
                '<svg class="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg>' +
                'Regenerate Pitch' +
              '</button>' +
              '<button onclick="exportPitch()" class="btn-secondary">' +
                '<svg class="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>' +
                'Export' +
              '</button>' +
              '<button onclick="copyPitch()" class="btn-secondary">' +
                '<svg class="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>' +
                'Copy to Clipboard' +
              '</button>' +
              '<button onclick="navigateTo(\'project-checklist\', AppState.currentProject)" class="btn-primary">' +
                'View Checklist' +
                '<svg class="w-4 h-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" /></svg>' +
              '</button>' +
            '</div>' +
          '</div>' :
          
          // No pitch yet - show generate option
          '<div class="text-center py-8">' +
            '<div class="w-24 h-24 rounded-full bg-purple-500/10 flex items-center justify-center mx-auto mb-6">' +
              '<svg class="w-12 h-12 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" /></svg>' +
            '</div>' +
            '<h3 class="text-xl font-semibold mb-3">Ready to Pitch Your Idea?</h3>' +
            '<p class="text-surface-400 mb-6 max-w-lg mx-auto">' +
              'Generate a comprehensive Shark Tank meets TED Talk style presentation (2000+ words) that captures your app vision, market opportunity, and potential impact.' +
            '</p>' +
            '<div class="bg-surface-800/50 rounded-lg p-4 mb-6 max-w-lg mx-auto text-left">' +
              '<p class="text-sm text-surface-400 mb-2">Your pitch will be based on:</p>' +
              '<ul class="text-sm space-y-1">' +
                '<li class="flex items-center gap-2"><span class="text-purple-400">✓</span> <strong>Name:</strong> ' + escapeHtml(project.name) + '</li>' +
                '<li class="flex items-center gap-2"><span class="text-purple-400">✓</span> <strong>Category:</strong> ' + escapeHtml(project.category || 'General') + ' / ' + escapeHtml(project.subcategory || 'Apps') + '</li>' +
                '<li class="flex items-center gap-2"><span class="text-purple-400">✓</span> <strong>Description:</strong> ' + (project.appDescription ? '✓ Provided' : '⚠️ Not set') + '</li>' +
                '<li class="flex items-center gap-2"><span class="text-purple-400">✓</span> <strong>Target:</strong> ' + escapeHtml((project.targetMarkets || []).join(', ') || 'Global') + '</li>' +
                '<li class="flex items-center gap-2"><span class="text-purple-400">✓</span> <strong>Age Range:</strong> ' + (project.ageRangeMin || '4') + ' - ' + (project.ageRangeMax || '99') + ' years</li>' +
                '<li class="flex items-center gap-2"><span class="text-purple-400">✓</span> <strong>Monetization:</strong> ' + escapeHtml(project.monetization || 'Free') + '</li>' +
                '<li class="flex items-center gap-2"><span class="text-purple-400">✓</span> <strong>AI Plan:</strong> ' + (project.aiPlan ? '✓ Generated' : '⚠️ Not yet generated') + '</li>' +
                '<li class="flex items-center gap-2"><span class="text-purple-400">✓</span> <strong>Notes:</strong> ' + (project.additionalNotes ? '✓ Provided' : '○ None') + '</li>' +
              '</ul>' +
              (!project.appDescription || !project.aiPlan ? 
                '<p class="text-yellow-400/80 text-xs mt-3">💡 Tip: Add a description and generate an AI Plan first for a more comprehensive pitch!</p>' : '') +
            '</div>' +
            '<button onclick="generatePitch()" class="btn-primary text-lg px-8 py-3">' +
              '<svg class="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>' +
              'Generate My Pitch' +
            '</button>' +
            (!AppState.settings.openaiApiKey ? '<p class="text-yellow-400 text-sm mt-4">⚠️ Requires OpenAI API key in Settings</p>' : '') +
          '</div>'
        ) +
      '</div>' +
    '</div>';
}

// Generate pitch
async function generatePitch() {
  if (!AppState.settings.openaiApiKey) {
    showToast('Please add your OpenAI API key in Settings first', 'warning');
    navigateTo('settings');
    return;
  }
  
  var project = AppState.currentProject;
  if (!project) {
    showToast('No project selected', 'error');
    return;
  }
  
  showLoading('Crafting your pitch...');
  
  try {
    var pitchContent = await window.electronAPI.generatePitch({
      name: project.name,
      description: project.appDescription,
      category: project.category,
      subcategory: project.subcategory,
      targetMarkets: project.targetMarkets,
      ageRangeMin: project.ageRangeMin,
      ageRangeMax: project.ageRangeMax,
      monetization: project.monetization,
      additionalNotes: project.additionalNotes,
      aiPlan: project.aiPlan,
      agentInstructions: project.agentInstructions
    });
    
    var pitch = {
      content: pitchContent.pitch,
      generatedAt: new Date().toISOString()
    };
    
    // Save to project
    var updatedProject = await window.electronAPI.updateProject(project.id, { pitch: pitch });
    AppState.currentProject = updatedProject;
    
    // Update in projects list
    var idx = AppState.projects.findIndex(function(p) { return p.id === project.id; });
    if (idx !== -1) {
      AppState.projects[idx] = updatedProject;
    }
    
    showToast('Pitch generated successfully!', 'success');
    renderProjectPitch(document.getElementById('content'), updatedProject);
  } catch (error) {
    console.error('Pitch generation error:', error);
    showToast('Failed to generate pitch: ' + error.message, 'error');
  } finally {
    hideLoading();
  }
}

// Regenerate pitch
async function regeneratePitch() {
  await generatePitch();
}

// Copy pitch to clipboard
function copyPitch() {
  var pitchContent = document.getElementById('pitch-content');
  if (pitchContent) {
    navigator.clipboard.writeText(pitchContent.textContent).then(function() {
      showToast('Pitch copied to clipboard!', 'success');
    }).catch(function(err) {
      showToast('Failed to copy: ' + err.message, 'error');
    });
  }
}

// Export pitch to file
async function exportPitch() {
  var project = AppState.currentProject;
  if (!project || !project.pitch) {
    showToast('No pitch to export', 'warning');
    return;
  }
  
  var pitch = project.pitch;
  var wordCount = pitch.content ? pitch.content.split(/\s+/).length : 0;
  
  var content = '═══════════════════════════════════════════════════════════════════\n' +
    '                         THE PITCH\n' +
    '═══════════════════════════════════════════════════════════════════\n\n' +
    'App: ' + (project.name || 'Untitled') + '\n' +
    'Generated: ' + (pitch.generatedAt ? new Date(pitch.generatedAt).toLocaleString() : 'Unknown') + '\n' +
    'Word Count: ' + wordCount + ' words\n\n' +
    '───────────────────────────────────────────────────────────────────\n\n' +
    pitch.content + '\n\n' +
    '───────────────────────────────────────────────────────────────────\n' +
    'Generated by App Creator A to Z\n';
  
  var filename = (project.name || 'App').replace(/[^a-z0-9]/gi, '_') + '_pitch.txt';
  
  try {
    await window.electronAPI.saveFile(filename, content);
    showToast('Pitch exported!', 'success');
  } catch (error) {
    showToast('Export failed: ' + error.message, 'error');
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
            '<div class="flex gap-2">' +
              '<button onclick="showAddChecklistItemForm()" class="btn-secondary">' +
                '<svg class="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" /></svg>' +
                'Add Item' +
              '</button>' +
              '<button onclick="navigateTo(\'project-adjustments\', AppState.currentProject)" class="btn-secondary">' +
                'Make Adjustments' +
              '</button>' +
            '</div>' +
          '</div>' +
          '<div id="checklist-items">' +
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
                      '<button onclick="deleteChecklistItem(' + index + ')" class="text-red-400 hover:text-red-300 p-1" title="Delete">' +
                        '<svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>' +
                      '</button>' +
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
          '</div>' +
          '<div class="flex gap-4 mt-6">' +
            '<button onclick="navigateTo(\'project-distribution\', AppState.currentProject)" class="btn-primary">' +
              'Continue to Distribution' +
              '<svg class="w-4 h-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" /></svg>' +
            '</button>' +
          '</div>' +
        '</div>' :
        '<div class="card p-8">' +
          '<h3 class="text-2xl font-bold mb-6 text-center">Development Checklist</h3>' +
          '<p class="text-surface-400 mb-8 text-center">Create your checklist to track development progress:</p>' +
          
          '<div class="grid grid-cols-2 gap-6 mb-8 max-w-2xl mx-auto">' +
            '<!-- Generate from AI Plan -->' +
            '<div class="card-hover p-6 border-2 border-surface-700 hover:border-primary-500 cursor-pointer" onclick="navigateTo(\'project-planning\', AppState.currentProject)">' +
              '<div class="w-12 h-12 rounded-full bg-primary-500/20 flex items-center justify-center mx-auto mb-4">' +
                '<svg class="w-6 h-6 text-primary-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>' +
              '</div>' +
              '<h4 class="text-lg font-semibold text-center mb-2">Generate with AI</h4>' +
              '<p class="text-surface-400 text-sm text-center">Create an AI plan to auto-generate checklist items.</p>' +
            '</div>' +
            
            '<!-- Manual Entry -->' +
            '<div class="card-hover p-6 border-2 border-surface-700 hover:border-accent-500 cursor-pointer" onclick="showAddChecklistItemForm()">' +
              '<div class="w-12 h-12 rounded-full bg-accent-500/20 flex items-center justify-center mx-auto mb-4">' +
                '<svg class="w-6 h-6 text-accent-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" /></svg>' +
              '</div>' +
              '<h4 class="text-lg font-semibold text-center mb-2">Add Manually</h4>' +
              '<p class="text-surface-400 text-sm text-center">Create your own checklist items one by one.</p>' +
            '</div>' +
          '</div>' +
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

function showAddChecklistItemForm() {
  showModal(
    'Add Checklist Item',
    '<form id="add-checklist-form" class="space-y-4">' +
      '<div>' +
        '<label class="label">Title *</label>' +
        '<input type="text" id="checklist-item-title" class="input" placeholder="What needs to be done?" required>' +
      '</div>' +
      '<div>' +
        '<label class="label">Description</label>' +
        '<textarea id="checklist-item-desc" class="textarea" placeholder="Add more details..."></textarea>' +
      '</div>' +
      '<div class="grid grid-cols-2 gap-4">' +
        '<div>' +
          '<label class="label">Priority</label>' +
          '<select id="checklist-item-priority" class="select">' +
            '<option value="low">Low</option>' +
            '<option value="medium" selected>Medium</option>' +
            '<option value="high">High</option>' +
          '</select>' +
        '</div>' +
        '<div>' +
          '<label class="label">Estimated Time</label>' +
          '<input type="text" id="checklist-item-time" class="input" placeholder="e.g. 2 hours">' +
        '</div>' +
      '</div>' +
    '</form>',
    [
      { text: 'Cancel', class: 'btn-secondary', onclick: 'closeModal()' },
      { text: 'Add Item', class: 'btn-primary', onclick: 'addChecklistItem()' }
    ]
  );
}

async function addChecklistItem() {
  var title = document.getElementById('checklist-item-title').value;
  if (!title.trim()) {
    showToast('Please enter a title', 'warning');
    return;
  }
  
  var newItem = {
    title: title,
    description: document.getElementById('checklist-item-desc').value,
    priority: document.getElementById('checklist-item-priority').value,
    estimatedTime: document.getElementById('checklist-item-time').value,
    completed: false,
    subtasks: []
  };
  
  var checklist = AppState.currentProject.checklist || { items: [] };
  checklist.items = checklist.items || [];
  checklist.items.push(newItem);
  
  try {
    var updatedProject = await window.electronAPI.updateProject(AppState.currentProject.id, { checklist: checklist });
    AppState.currentProject = updatedProject;
    closeModal();
    showToast('Checklist item added!', 'success');
    renderProjectChecklist(document.getElementById('content'), AppState.currentProject);
  } catch (error) {
    showToast('Failed to add item: ' + error.message, 'error');
  }
}

async function deleteChecklistItem(index) {
  if (!confirm('Delete this checklist item?')) return;
  
  var checklist = AppState.currentProject.checklist;
  checklist.items.splice(index, 1);
  
  try {
    var updatedProject = await window.electronAPI.updateProject(AppState.currentProject.id, { checklist: checklist });
    AppState.currentProject = updatedProject;
    showToast('Item deleted', 'success');
    renderProjectChecklist(document.getElementById('content'), AppState.currentProject);
  } catch (error) {
    showToast('Failed to delete item: ' + error.message, 'error');
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
        '<p class="text-surface-400 mb-6">Make changes to your project plan, checklist, or notes.</p>' +
        
        '<div class="grid grid-cols-3 gap-4 mb-8">' +
          '<!-- Edit Plan -->' +
          '<div class="card-hover p-4 border-2 border-surface-700 hover:border-primary-500 cursor-pointer text-center" onclick="editProjectPlan()">' +
            '<svg class="w-8 h-8 text-primary-400 mx-auto mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>' +
            '<p class="font-semibold">Edit Plan</p>' +
          '</div>' +
          
          '<!-- Add Checklist Items -->' +
          '<div class="card-hover p-4 border-2 border-surface-700 hover:border-accent-500 cursor-pointer text-center" onclick="navigateTo(\'project-checklist\', AppState.currentProject)">' +
            '<svg class="w-8 h-8 text-accent-400 mx-auto mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" /></svg>' +
            '<p class="font-semibold">Edit Checklist</p>' +
          '</div>' +
          
          '<!-- Edit Description -->' +
          '<div class="card-hover p-4 border-2 border-surface-700 hover:border-green-500 cursor-pointer text-center" onclick="editProjectBasics()">' +
            '<svg class="w-8 h-8 text-green-400 mx-auto mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>' +
            '<p class="font-semibold">Edit Details</p>' +
          '</div>' +
        '</div>' +
        
        '<div class="border-t border-surface-700 pt-6">' +
          '<h4 class="font-semibold mb-4">AI-Powered Adjustments</h4>' +
          '<p class="text-surface-400 text-sm mb-4">Describe changes and let AI analyze the impact on your plan.</p>' +
          '<form onsubmit="handleAdjustmentSubmit(event)">' +
            '<div class="mb-4">' +
              '<textarea id="adjustment-request" class="textarea min-h-[120px]" placeholder="Example: I want to add social login with Google and Facebook. Also, I need to include a dark mode option."></textarea>' +
            '</div>' +
            '<button type="submit" class="btn-accent" ' + (!AppState.settings.openaiApiKey ? 'disabled title="Requires API key"' : '') + '>' +
              '<svg class="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>' +
              'Analyze with AI' +
            '</button>' +
            (!AppState.settings.openaiApiKey ? '<span class="text-yellow-400 text-xs ml-3">⚠️ Requires API key</span>' : '') +
          '</form>' +
        '</div>' +
      '</div>' +
      
      (project.adjustments && project.adjustments.length > 0 ?
        '<div class="mt-6 space-y-4">' +
          '<h4 class="font-semibold">Previous AI Adjustments</h4>' +
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
      
      '<!-- Common Distribution Info -->' +
      '<div class="card p-8 mb-6">' +
        '<div class="flex items-center justify-between mb-6">' +
          '<div>' +
            '<h3 class="text-2xl font-bold">📋 Common Distribution Info</h3>' +
            '<p class="text-surface-400">Fill this out once and populate all stores</p>' +
          '</div>' +
          '<button type="button" onclick="toggleDistributionInfo()" class="btn-ghost text-sm" id="toggle-dist-info-btn">' +
            '<svg class="w-4 h-4 mr-1 transition-transform" id="dist-info-chevron" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" /></svg>' +
            '<span id="toggle-dist-info-text">Show</span>' +
          '</button>' +
        '</div>' +
        
        '<div id="common-dist-info" class="hidden space-y-6">' +
          '<!-- Basic Info -->' +
          '<div class="grid grid-cols-2 gap-6">' +
            '<div>' +
              '<label class="label">App Name *</label>' +
              '<input type="text" id="common-app-name" class="input" placeholder="Your App Name" value="' + escapeHtml(project.name || '') + '">' +
            '</div>' +
            '<div>' +
              '<label class="label">Category</label>' +
              '<input type="text" id="common-category" class="input" placeholder="e.g., Productivity" value="' + escapeHtml(project.category || '') + '">' +
            '</div>' +
          '</div>' +
          
          '<div>' +
            '<label class="label">Tagline / Subtitle</label>' +
            '<input type="text" id="common-tagline" class="input" placeholder="A short catchy tagline">' +
            '<p class="text-xs text-surface-400 mt-1">Max 30 characters recommended for most stores</p>' +
          '</div>' +
          
          '<div>' +
            '<label class="label">Short Description</label>' +
            '<textarea id="common-short-desc" class="textarea" rows="2" placeholder="Brief description (80 chars recommended)"></textarea>' +
          '</div>' +
          
          '<div>' +
            '<label class="label">Full Description</label>' +
            '<textarea id="common-long-desc" class="textarea min-h-[150px]" placeholder="Detailed description with features, benefits, and call-to-action"></textarea>' +
          '</div>' +
          
          '<div>' +
            '<label class="label">Keywords (comma-separated)</label>' +
            '<input type="text" id="common-keywords" class="input" placeholder="app, productivity, tool, ...">' +
          '</div>' +
          
          '<!-- URLs -->' +
          '<div class="grid grid-cols-3 gap-6">' +
            '<div>' +
              '<label class="label">Privacy Policy URL *</label>' +
              '<input type="url" id="common-privacy" class="input" placeholder="https://...">' +
            '</div>' +
            '<div>' +
              '<label class="label">Support URL</label>' +
              '<input type="url" id="common-support" class="input" placeholder="https://...">' +
            '</div>' +
            '<div>' +
              '<label class="label">Marketing URL</label>' +
              '<input type="url" id="common-marketing" class="input" placeholder="https://...">' +
            '</div>' +
          '</div>' +
          
          '<!-- App Icon -->' +
          '<div class="border-t border-surface-700 pt-6">' +
            '<h4 class="text-lg font-semibold mb-4">App Icon</h4>' +
            '<div class="flex items-start gap-6">' +
              '<div id="common-icon-preview" class="w-24 h-24 rounded-xl bg-surface-800 border-2 border-dashed border-surface-600 flex items-center justify-center overflow-hidden">' +
                (project.iconPath ? 
                  '<img src="file://' + escapeHtml(project.iconPath) + '" class="w-full h-full object-cover" />' :
                  '<svg class="w-8 h-8 text-surface-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>'
                ) +
              '</div>' +
              '<div>' +
                '<input type="hidden" id="common-icon-path" value="' + escapeHtml(project.iconPath || '') + '">' +
                '<button type="button" onclick="uploadCommonIcon()" class="btn-secondary mb-2">' +
                  '<svg class="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" /></svg>' +
                  'Upload Icon' +
                '</button>' +
                '<p class="text-xs text-surface-400">Recommended: 1024x1024 PNG</p>' +
              '</div>' +
            '</div>' +
          '</div>' +
          
          '<!-- Screenshots -->' +
          '<div class="border-t border-surface-700 pt-6">' +
            '<h4 class="text-lg font-semibold mb-4">📱 Phone Screenshots</h4>' +
            '<p class="text-xs text-surface-400 mb-3">Portrait orientation recommended (e.g., 1080x1920, 1290x2796)</p>' +
            '<div class="mb-4">' +
              '<button type="button" onclick="uploadCommonPhoneScreenshots()" class="btn-secondary">' +
                '<svg class="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" /></svg>' +
                'Upload Phone Screenshots' +
              '</button>' +
              '<span class="text-sm text-surface-400 ml-4">Select multiple images at once</span>' +
            '</div>' +
            '<div id="common-phone-screenshots-grid" class="grid grid-cols-6 gap-3"></div>' +
            '<input type="hidden" id="common-phone-screenshots-data" value="[]">' +
          '</div>' +
          
          '<div class="border-t border-surface-700 pt-6">' +
            '<h4 class="text-lg font-semibold mb-4">📲 Tablet Screenshots</h4>' +
            '<p class="text-xs text-surface-400 mb-3">Larger resolution for tablets/iPads (e.g., 2048x2732, 2388x1668)</p>' +
            '<div class="mb-4">' +
              '<button type="button" onclick="uploadCommonTabletScreenshots()" class="btn-secondary">' +
                '<svg class="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" /></svg>' +
                'Upload Tablet Screenshots' +
              '</button>' +
              '<span class="text-sm text-surface-400 ml-4">Select multiple images at once</span>' +
            '</div>' +
            '<div id="common-tablet-screenshots-grid" class="grid grid-cols-6 gap-3"></div>' +
            '<input type="hidden" id="common-tablet-screenshots-data" value="[]">' +
          '</div>' +
          
          '<!-- AI Generation -->' +
          '<div class="border-t border-surface-700 pt-6">' +
            '<div class="flex flex-wrap gap-4">' +
              '<button type="button" onclick="generateCommonContent()" class="btn-secondary" ' + (!AppState.settings.openaiApiKey ? 'disabled' : '') + '>' +
                '<svg class="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>' +
                'AI Generate Content' +
              '</button>' +
              '<button type="button" onclick="processAndExportImages()" class="btn-secondary">' +
                '<svg class="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>' +
                'Process & Export Images for All Stores' +
              '</button>' +
            '</div>' +
            '<p class="text-xs text-surface-400 mt-2">Resizes icons and screenshots to match each store\'s requirements</p>' +
          '</div>' +
        '</div>' +
      '</div>' +
      
      '<div class="card p-8 mb-6">' +
        '<h3 class="text-2xl font-bold mb-4">Package for Distribution</h3>' +
        '<p class="text-surface-400 mb-6">Select the platforms where you want to distribute your app. We will guide you through the requirements for each store.</p>' +
        
        '<div class="grid grid-cols-2 gap-4 mb-8">' +
          Stores.map(function(store) {
            return '<label class="flex items-start gap-4 p-4 rounded-lg border border-surface-700 hover:border-primary-500 cursor-pointer transition-colors">' +
              '<input type="checkbox" class="checkbox mt-1" value="' + store.id + '" name="stores">' +
              '<span class="text-3xl">' + store.icon + '</span>' +
              '<div class="flex-1">' +
                '<div class="flex items-center justify-between">' +
                  '<p class="font-semibold">' + store.name + '</p>' +
                  '<span class="text-xs font-medium px-2 py-1 rounded bg-surface-700 text-primary-400">' + store.fee + '</span>' +
                '</div>' +
                '<p class="text-sm text-surface-400">' + store.platforms.join(', ') + '</p>' +
                '<p class="text-xs text-surface-500 mt-1">' + store.feeNote + '</p>' +
                '<a href="' + store.distributionUrl + '" target="_blank" onclick="event.stopPropagation()" class="text-xs text-primary-400 hover:text-primary-300 inline-flex items-center gap-1 mt-1">' +
                  '<svg class="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>' +
                  'Developer Console' +
                '</a>' +
              '</div>' +
            '</label>';
          }).join('') +
        '</div>' +
        
        '<div class="flex gap-4">' +
          '<button onclick="populateAllStores()" class="btn-secondary">' +
            '<svg class="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>' +
            'Populate All Selected Stores' +
          '</button>' +
          '<button onclick="startStoreSubmission()" class="btn-primary">' +
            'Continue with Selected Stores' +
            '<svg class="w-4 h-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" /></svg>' +
          '</button>' +
        '</div>' +
      '</div>' +
      
      '<div id="store-submissions-list"></div>' +
    '</div>';
  
  loadStoreSubmissions();
}

// Toggle distribution info section
function toggleDistributionInfo() {
  var infoSection = document.getElementById('common-dist-info');
  var chevron = document.getElementById('dist-info-chevron');
  var text = document.getElementById('toggle-dist-info-text');
  
  if (infoSection.classList.contains('hidden')) {
    infoSection.classList.remove('hidden');
    chevron.style.transform = 'rotate(180deg)';
    text.textContent = 'Hide';
  } else {
    infoSection.classList.add('hidden');
    chevron.style.transform = 'rotate(0deg)';
    text.textContent = 'Show';
  }
}

// Upload common icon
async function uploadCommonIcon() {
  try {
    var result = await window.electronAPI.selectImage();
    if (result) {
      document.getElementById('common-icon-path').value = result;
      document.getElementById('common-icon-preview').innerHTML = 
        '<img src="file://' + escapeHtml(result) + '" class="w-full h-full object-cover" />';
    }
  } catch (error) {
    showToast('Failed to upload icon', 'error');
  }
}

// Upload phone screenshots
async function uploadCommonPhoneScreenshots() {
  try {
    var results = await window.electronAPI.selectMultipleImages();
    if (results && results.length > 0) {
      var existing = [];
      try {
        existing = JSON.parse(document.getElementById('common-phone-screenshots-data').value) || [];
      } catch (e) {}
      
      var combined = existing.concat(results);
      document.getElementById('common-phone-screenshots-data').value = JSON.stringify(combined);
      renderCommonPhoneScreenshots(combined);
    }
  } catch (error) {
    showToast('Failed to upload screenshots', 'error');
  }
}

// Upload tablet screenshots
async function uploadCommonTabletScreenshots() {
  try {
    var results = await window.electronAPI.selectMultipleImages();
    if (results && results.length > 0) {
      var existing = [];
      try {
        existing = JSON.parse(document.getElementById('common-tablet-screenshots-data').value) || [];
      } catch (e) {}
      
      var combined = existing.concat(results);
      document.getElementById('common-tablet-screenshots-data').value = JSON.stringify(combined);
      renderCommonTabletScreenshots(combined);
    }
  } catch (error) {
    showToast('Failed to upload screenshots', 'error');
  }
}

function renderCommonPhoneScreenshots(screenshots) {
  var grid = document.getElementById('common-phone-screenshots-grid');
  if (!screenshots || screenshots.length === 0) {
    grid.innerHTML = '<p class="text-surface-500 text-sm col-span-6">No phone screenshots uploaded</p>';
    return;
  }
  
  grid.innerHTML = screenshots.map(function(path, index) {
    return '<div class="relative group">' +
      '<img src="file://' + escapeHtml(path) + '" class="w-full h-20 object-cover rounded-lg border border-surface-600" />' +
      '<button type="button" onclick="removeCommonPhoneScreenshot(' + index + ')" class="absolute -top-2 -right-2 w-6 h-6 bg-red-500 hover:bg-red-600 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">' +
        '<svg class="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" /></svg>' +
      '</button>' +
    '</div>';
  }).join('');
}

function renderCommonTabletScreenshots(screenshots) {
  var grid = document.getElementById('common-tablet-screenshots-grid');
  if (!screenshots || screenshots.length === 0) {
    grid.innerHTML = '<p class="text-surface-500 text-sm col-span-6">No tablet screenshots uploaded</p>';
    return;
  }
  
  grid.innerHTML = screenshots.map(function(path, index) {
    return '<div class="relative group">' +
      '<img src="file://' + escapeHtml(path) + '" class="w-full h-20 object-cover rounded-lg border border-surface-600" />' +
      '<button type="button" onclick="removeCommonTabletScreenshot(' + index + ')" class="absolute -top-2 -right-2 w-6 h-6 bg-red-500 hover:bg-red-600 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">' +
        '<svg class="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" /></svg>' +
      '</button>' +
    '</div>';
  }).join('');
}

function removeCommonPhoneScreenshot(index) {
  var screenshots = JSON.parse(document.getElementById('common-phone-screenshots-data').value) || [];
  screenshots.splice(index, 1);
  document.getElementById('common-phone-screenshots-data').value = JSON.stringify(screenshots);
  renderCommonPhoneScreenshots(screenshots);
}

function removeCommonTabletScreenshot(index) {
  var screenshots = JSON.parse(document.getElementById('common-tablet-screenshots-data').value) || [];
  screenshots.splice(index, 1);
  document.getElementById('common-tablet-screenshots-data').value = JSON.stringify(screenshots);
  renderCommonTabletScreenshots(screenshots);
}

// Process and export images for all stores
async function processAndExportImages() {
  var iconPath = document.getElementById('common-icon-path').value;
  var phoneScreenshots = [];
  var tabletScreenshots = [];
  
  try {
    phoneScreenshots = JSON.parse(document.getElementById('common-phone-screenshots-data').value || '[]');
  } catch (e) {}
  try {
    tabletScreenshots = JSON.parse(document.getElementById('common-tablet-screenshots-data').value || '[]');
  } catch (e) {}
  
  if (!iconPath && phoneScreenshots.length === 0 && tabletScreenshots.length === 0) {
    showToast('Please upload an icon or screenshots first', 'warning');
    return;
  }
  
  // Select output directory
  var outputDir = await window.electronAPI.selectOutputDirectory();
  if (!outputDir) {
    return; // User cancelled
  }
  
  var appName = document.getElementById('common-app-name').value || AppState.currentProject.name;
  var selectedStores = Array.from(document.querySelectorAll('input[name="stores"]:checked')).map(function(el) {
    return el.value;
  });
  
  // If no stores selected, process for all stores
  if (selectedStores.length === 0) {
    selectedStores = Stores.map(function(s) { return s.id; });
  }
  
  showToast('Processing images for ' + selectedStores.length + ' store(s)...', 'info');
  
  var results = {
    icons: [],
    phoneScreenshots: [],
    tabletScreenshots: []
  };
  
  try {
    for (var i = 0; i < selectedStores.length; i++) {
      var storeType = selectedStores[i];
      
      // Process icon
      if (iconPath) {
        var iconResult = await window.electronAPI.processIcon(iconPath, outputDir, storeType, appName);
        if (iconResult.success) {
          results.icons.push({ store: storeType, icons: iconResult.icons });
        }
      }
      
      // Process phone screenshots
      if (phoneScreenshots.length > 0) {
        var phoneResult = await window.electronAPI.processScreenshots(phoneScreenshots, outputDir, storeType, appName, 'phone');
        if (phoneResult.success) {
          results.phoneScreenshots.push({ store: storeType, screenshots: phoneResult.screenshots });
        }
      }
      
      // Process tablet screenshots
      if (tabletScreenshots.length > 0) {
        var tabletResult = await window.electronAPI.processScreenshots(tabletScreenshots, outputDir, storeType, appName, 'tablet');
        if (tabletResult.success) {
          results.tabletScreenshots.push({ store: storeType, screenshots: tabletResult.screenshots });
        }
      }
    }
    
    var totalIcons = results.icons.reduce(function(sum, r) { return sum + r.icons.length; }, 0);
    var totalPhoneScreenshots = results.phoneScreenshots.reduce(function(sum, r) { 
      return sum + r.screenshots.reduce(function(s, sc) { return s + sc.resized.length; }, 0); 
    }, 0);
    var totalTabletScreenshots = results.tabletScreenshots.reduce(function(sum, r) { 
      return sum + r.screenshots.reduce(function(s, sc) { return s + sc.resized.length; }, 0); 
    }, 0);
    
    showToast('Processed ' + totalIcons + ' icons, ' + totalPhoneScreenshots + ' phone screenshots, ' + totalTabletScreenshots + ' tablet screenshots!', 'success');
    
    // Open the output directory
    await window.electronAPI.openFile(outputDir);
    
  } catch (error) {
    showToast('Failed to process images: ' + error.message, 'error');
    console.error(error);
  }
}

// Generate common content with AI
async function generateCommonContent() {
  if (!AppState.settings.openaiApiKey) {
    showToast('Please configure your OpenAI API key in settings', 'warning');
    return;
  }
  
  showToast('Generating content...', 'info');
  
  try {
    var result = await window.electronAPI.generateStoreContent({
      name: AppState.currentProject.name,
      description: AppState.currentProject.description,
      category: AppState.currentProject.category,
      targetAudience: AppState.currentProject.targetAudience,
      problemSolving: AppState.currentProject.problemSolving
    }, 'common');
    
    if (result) {
      if (result.tagline) document.getElementById('common-tagline').value = result.tagline;
      if (result.shortDescription) document.getElementById('common-short-desc').value = result.shortDescription;
      if (result.longDescription) document.getElementById('common-long-desc').value = result.longDescription;
      if (result.keywords) document.getElementById('common-keywords').value = result.keywords;
      showToast('Content generated!', 'success');
    }
  } catch (error) {
    showToast('Failed to generate content: ' + error.message, 'error');
  }
}

// Populate all selected stores with common info
async function populateAllStores() {
  var selectedStores = Array.from(document.querySelectorAll('input[name="stores"]:checked')).map(function(el) {
    return el.value;
  });
  
  if (selectedStores.length === 0) {
    showToast('Please select at least one store to populate', 'warning');
    return;
  }
  
  // Gather common info
  var phoneScreenshots = [];
  var tabletScreenshots = [];
  try {
    phoneScreenshots = JSON.parse(document.getElementById('common-phone-screenshots-data').value || '[]');
  } catch (e) {}
  try {
    tabletScreenshots = JSON.parse(document.getElementById('common-tablet-screenshots-data').value || '[]');
  } catch (e) {}
  
  // Combine all screenshots for stores that don't differentiate
  var allScreenshots = phoneScreenshots.concat(tabletScreenshots);
  
  var commonData = {
    appName: document.getElementById('common-app-name').value,
    category: document.getElementById('common-category').value,
    tagline: document.getElementById('common-tagline').value,
    shortDescription: document.getElementById('common-short-desc').value,
    longDescription: document.getElementById('common-long-desc').value,
    keywords: document.getElementById('common-keywords').value,
    privacyPolicyUrl: document.getElementById('common-privacy').value,
    supportUrl: document.getElementById('common-support').value,
    marketingUrl: document.getElementById('common-marketing').value,
    iconPath: document.getElementById('common-icon-path').value,
    screenshots: allScreenshots,
    phoneScreenshots: phoneScreenshots,
    tabletScreenshots: tabletScreenshots,
    status: 'draft'
  };
  
  if (!commonData.appName) {
    showToast('Please enter an app name', 'warning');
    return;
  }
  
  try {
    // Get existing submissions
    var existingSubmissions = await window.electronAPI.getStoreSubmissions(AppState.currentProject.id);
    var existingStoreTypes = existingSubmissions.map(function(s) { return s.storeType; });
    
    var created = 0;
    var updated = 0;
    
    for (var i = 0; i < selectedStores.length; i++) {
      var storeType = selectedStores[i];
      var existingSubmission = existingSubmissions.find(function(s) { return s.storeType === storeType; });
      
      if (existingSubmission) {
        // Update existing submission
        await window.electronAPI.updateStoreSubmission(existingSubmission.id, commonData);
        updated++;
      } else {
        // Create new submission and then update it with common data
        await window.electronAPI.createStoreSubmission(AppState.currentProject.id, storeType);
        var newSubmissions = await window.electronAPI.getStoreSubmissions(AppState.currentProject.id);
        var newSubmission = newSubmissions.find(function(s) { return s.storeType === storeType; });
        if (newSubmission) {
          await window.electronAPI.updateStoreSubmission(newSubmission.id, commonData);
        }
        created++;
      }
    }
    
    // Also update project icon if set
    if (commonData.iconPath) {
      await window.electronAPI.updateProject(AppState.currentProject.id, { iconPath: commonData.iconPath });
      AppState.currentProject.iconPath = commonData.iconPath;
    }
    
    var message = '';
    if (created > 0) message += created + ' store(s) created. ';
    if (updated > 0) message += updated + ' store(s) updated.';
    showToast(message || 'Stores populated!', 'success');
    
    loadStoreSubmissions();
  } catch (error) {
    showToast('Failed to populate stores: ' + error.message, 'error');
    console.error(error);
  }
}

async function loadStoreSubmissions() {
  try {
    var submissions = await window.electronAPI.getStoreSubmissions(AppState.currentProject.id);
    var listEl = document.getElementById('store-submissions-list');
    
    // Pre-fill common info from first submission if exists
    if (submissions && submissions.length > 0) {
      var firstSub = submissions[0];
      var commonAppName = document.getElementById('common-app-name');
      var commonCategory = document.getElementById('common-category');
      var commonTagline = document.getElementById('common-tagline');
      var commonShortDesc = document.getElementById('common-short-desc');
      var commonLongDesc = document.getElementById('common-long-desc');
      var commonKeywords = document.getElementById('common-keywords');
      var commonPrivacy = document.getElementById('common-privacy');
      var commonSupport = document.getElementById('common-support');
      var commonMarketing = document.getElementById('common-marketing');
      var commonIconPath = document.getElementById('common-icon-path');
      var commonPhoneScreenshotsData = document.getElementById('common-phone-screenshots-data');
      var commonTabletScreenshotsData = document.getElementById('common-tablet-screenshots-data');
      
      // Only fill if fields are empty
      if (commonTagline && !commonTagline.value && firstSub.tagline) commonTagline.value = firstSub.tagline;
      if (commonShortDesc && !commonShortDesc.value && firstSub.shortDescription) commonShortDesc.value = firstSub.shortDescription;
      if (commonLongDesc && !commonLongDesc.value && firstSub.longDescription) commonLongDesc.value = firstSub.longDescription;
      if (commonKeywords && !commonKeywords.value && firstSub.keywords) commonKeywords.value = firstSub.keywords;
      if (commonPrivacy && !commonPrivacy.value && firstSub.privacyPolicyUrl) commonPrivacy.value = firstSub.privacyPolicyUrl;
      if (commonSupport && !commonSupport.value && firstSub.supportUrl) commonSupport.value = firstSub.supportUrl;
      if (commonMarketing && !commonMarketing.value && firstSub.marketingUrl) commonMarketing.value = firstSub.marketingUrl;
      
      // Pre-fill icon if not set
      if (commonIconPath && !commonIconPath.value && firstSub.iconPath) {
        commonIconPath.value = firstSub.iconPath;
        document.getElementById('common-icon-preview').innerHTML = 
          '<img src="file://' + escapeHtml(firstSub.iconPath) + '" class="w-full h-full object-cover" />';
      }
      
      // Pre-fill phone screenshots if empty
      if (commonPhoneScreenshotsData && commonPhoneScreenshotsData.value === '[]' && firstSub.phoneScreenshots && firstSub.phoneScreenshots.length > 0) {
        commonPhoneScreenshotsData.value = JSON.stringify(firstSub.phoneScreenshots);
        renderCommonPhoneScreenshots(firstSub.phoneScreenshots);
      }
      
      // Pre-fill tablet screenshots if empty
      if (commonTabletScreenshotsData && commonTabletScreenshotsData.value === '[]' && firstSub.tabletScreenshots && firstSub.tabletScreenshots.length > 0) {
        commonTabletScreenshotsData.value = JSON.stringify(firstSub.tabletScreenshots);
        renderCommonTabletScreenshots(firstSub.tabletScreenshots);
      }
      
      var readyCount = submissions.filter(function(s) { return s.status === 'ready'; }).length;
      var submittedCount = submissions.filter(function(s) { return s.status === 'submitted'; }).length;
      
      listEl.innerHTML = '' +
        '<div class="flex items-center justify-between mb-4">' +
          '<h4 class="text-lg font-semibold">Existing Store Submissions</h4>' +
          (readyCount > 0 ? 
            '<div class="flex items-center gap-4">' +
              '<span class="text-sm text-surface-400">' + readyCount + ' ready for submission</span>' +
              '<button onclick="markAllSubmitted()" class="btn-primary">' +
                'Mark All as Submitted' +
                '<svg class="w-4 h-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" /></svg>' +
              '</button>' +
            '</div>' : '') +
        '</div>' +
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

async function markAllSubmitted() {
  try {
    var submissions = await window.electronAPI.getStoreSubmissions(AppState.currentProject.id);
    var readySubmissions = submissions.filter(function(s) { return s.status === 'ready'; });
    
    for (var i = 0; i < readySubmissions.length; i++) {
      await window.electronAPI.updateStoreSubmission(readySubmissions[i].id, { status: 'submitted' });
    }
    
    // Update project status to completed
    await window.electronAPI.updateProject(AppState.currentProject.id, { status: 'completed' });
    AppState.currentProject.status = 'completed';
    
    // Update the project in AppState.projects array
    var projectIndex = AppState.projects.findIndex(function(p) { return p.id === AppState.currentProject.id; });
    if (projectIndex !== -1) {
      AppState.projects[projectIndex].status = 'completed';
    }
    
    // Update sidebar
    updateProjectList();
    
    showToast('All ready submissions marked as submitted! Project completed! 🎉', 'success');
    loadStoreSubmissions();
  } catch (error) {
    showToast('Failed to update submissions: ' + error.message, 'error');
  }
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

// ==================== Project Marketing ====================
const MarketingChannels = [
  {
    category: '🆓 Free Marketing (Start Here!)',
    description: 'These cost nothing but your time. Perfect for beginners!',
    items: [
      {
        name: 'App Store Optimization (ASO)',
        cost: 'Free',
        difficulty: 'Easy',
        timeToResult: '2-4 weeks',
        description: 'Optimize your app title, description, keywords, and screenshots to rank higher in app store search results.',
        tips: [
          'Use relevant keywords in your app title and description',
          'Create eye-catching screenshots that show your app in action',
          'Write a compelling first sentence - it shows in search results',
          'Update your app regularly to stay relevant',
          'Respond to all reviews (good and bad)'
        ],
        link: 'https://developer.apple.com/app-store/search/',
        linkLabel: 'Apple ASO Guide'
      },
      {
        name: 'Social Media Presence',
        cost: 'Free',
        difficulty: 'Easy',
        timeToResult: '1-3 months',
        description: 'Create accounts on major platforms to build an audience and share updates about your app.',
        tips: [
          'Start with 2-3 platforms you can manage consistently',
          'Post screenshots, behind-the-scenes, and tips 3-5x per week',
          'Engage with your followers - respond to comments',
          'Use relevant hashtags (#indiedev, #gamedev, #appdev)',
          'Share your journey - people love origin stories'
        ],
        platforms: ['Twitter/X', 'Instagram', 'TikTok', 'LinkedIn', 'Facebook'],
        link: null
      },
      {
        name: 'Reddit Marketing',
        cost: 'Free',
        difficulty: 'Medium',
        timeToResult: '1-2 months',
        description: 'Share your app in relevant subreddits. Reddit users hate obvious ads, so be genuine!',
        tips: [
          'Be an active member first - don\'t just drop links',
          'Share your dev journey in r/IndieGaming, r/gamedev, r/androiddev, r/iOSProgramming',
          'Ask for feedback genuinely - Redditors love to help',
          'Never be spammy - you will get banned',
          'AMAs (Ask Me Anything) can work great for launches'
        ],
        link: 'https://reddit.com',
        linkLabel: 'Reddit'
      },
      {
        name: 'Product Hunt Launch',
        cost: 'Free',
        difficulty: 'Medium',
        timeToResult: '1-7 days',
        description: 'Launch on Product Hunt to get featured and gain early adopters. Great for productivity/utility apps.',
        tips: [
          'Launch on Tuesday, Wednesday, or Thursday for best visibility',
          'Prepare your hunter (someone with followers to post for you)',
          'Have friends ready to upvote and leave genuine comments',
          'Create a compelling tagline and first comment',
          'Offer a special deal for Product Hunt users'
        ],
        link: 'https://producthunt.com',
        linkLabel: 'Product Hunt'
      },
      {
        name: 'Press Kit & Media Outreach',
        cost: 'Free',
        difficulty: 'Medium',
        timeToResult: '2-4 weeks',
        description: 'Create a press kit and reach out to bloggers, journalists, and YouTubers in your niche.',
        tips: [
          'Create a simple press kit: logo, screenshots, description, trailer link',
          'Use presskit.html or notion.so to host it',
          'Research journalists who cover apps in your category',
          'Personalize every email - no mass blasts',
          'Follow up once after 1 week if no response'
        ],
        link: 'https://dopresskit.com',
        linkLabel: 'Press Kit Guide'
      },
      {
        name: 'YouTube & Video Content',
        cost: 'Free',
        difficulty: 'Medium',
        timeToResult: '2-6 months',
        description: 'Create video tutorials, dev logs, or app showcases to reach users searching for solutions.',
        tips: [
          'Screen recordings with voiceover work great',
          'Tutorial videos: "How to [solve problem your app solves]"',
          'Keep videos under 10 minutes for better retention',
          'Use Shorts/Reels for quick demos',
          'Add your app link in the description and pinned comment'
        ],
        link: 'https://youtube.com',
        linkLabel: 'YouTube'
      }
    ]
  },
  {
    category: '💰 Paid Advertising',
    description: 'When you have budget to invest, these platforms can accelerate growth.',
    items: [
      {
        name: 'Apple Search Ads',
        cost: '$0.50 - $5.00 per tap',
        difficulty: 'Easy',
        timeToResult: 'Immediate',
        description: 'Show your app at the top of App Store search results. Best ROI for iOS apps.',
        tips: [
          'Start with Search Match to discover keywords users search',
          'Set a daily budget of $10-20 to start',
          'Target your competitors\' app names (yes, this is allowed!)',
          'Negative keywords: exclude irrelevant searches',
          'Test different ad variations with Custom Product Pages'
        ],
        link: 'https://searchads.apple.com',
        linkLabel: 'Apple Search Ads'
      },
      {
        name: 'Google Ads (App Campaigns)',
        cost: '$0.20 - $3.00 per install',
        difficulty: 'Easy',
        timeToResult: 'Immediate',
        description: 'Google automatically places your ads across Search, Play Store, YouTube, and Display Network.',
        tips: [
          'Let Google\'s AI optimize - provide multiple headlines and descriptions',
          'Start with $20-50 daily budget',
          'Set a target CPI (cost per install) you\'re comfortable with',
          'Upload video assets for YouTube placements',
          'Give campaigns 2+ weeks to optimize before judging'
        ],
        link: 'https://ads.google.com/home/campaigns/app-campaigns/',
        linkLabel: 'Google App Campaigns'
      },
      {
        name: 'Meta Ads (Facebook/Instagram)',
        cost: '$1.00 - $5.00 per install',
        difficulty: 'Medium',
        timeToResult: 'Immediate',
        description: 'Highly targeted ads based on interests, behaviors, and demographics.',
        tips: [
          'Use video ads - they perform much better than static',
          'Target lookalike audiences based on your existing users',
          'Install Meta Pixel/SDK for conversion tracking',
          'Start broad, then narrow based on what works',
          'Test multiple ad creatives simultaneously'
        ],
        link: 'https://business.facebook.com',
        linkLabel: 'Meta Business Suite'
      },
      {
        name: 'TikTok Ads',
        cost: '$1.00 - $4.00 per install',
        difficulty: 'Medium',
        timeToResult: 'Immediate',
        description: 'Great for reaching younger audiences. Native-feeling video ads work best.',
        tips: [
          'Make your ads look like organic TikToks, not polished commercials',
          'Hook viewers in first 2 seconds',
          'Use trending sounds and formats',
          'Partner with creators through Spark Ads',
          'Minimum campaign budget: $50'
        ],
        link: 'https://ads.tiktok.com',
        linkLabel: 'TikTok Ads'
      },
      {
        name: 'Influencer Marketing',
        cost: '$50 - $10,000+ per post',
        difficulty: 'Medium',
        timeToResult: '1-7 days',
        description: 'Partner with content creators to showcase your app to their audience.',
        tips: [
          'Micro-influencers (10K-100K followers) often have best ROI',
          'Provide them with a unique promo code to track',
          'Let them create content in their own style',
          'Negotiate usage rights for repurposing content in ads',
          'Platforms: AspireIQ, Grin, or reach out directly on Instagram'
        ],
        link: null
      },
      {
        name: 'App Review Sites & Features',
        cost: '$50 - $500 per review',
        difficulty: 'Easy',
        timeToResult: '1-4 weeks',
        description: 'Get your app reviewed on popular tech blogs and app review sites.',
        tips: [
          'AppAdvice, 148Apps, TouchArcade (games), AppStorm',
          'Some offer free reviews, others charge for expedited/guaranteed coverage',
          'Provide promo codes for premium features',
          'Time it with your launch or major update'
        ],
        link: null
      }
    ]
  },
  {
    category: '🔧 Tools & Services',
    description: 'Helpful tools to manage and improve your marketing efforts.',
    items: [
      {
        name: 'App Annie / data.ai',
        cost: 'Free tier available, Pro from $99/mo',
        difficulty: 'Easy',
        timeToResult: 'Ongoing',
        description: 'Track your app\'s rankings, reviews, and competitor insights.',
        tips: [
          'Monitor keyword rankings',
          'Track competitor updates and strategies',
          'Set up alerts for ranking changes',
          'Use market data to find opportunities'
        ],
        link: 'https://data.ai',
        linkLabel: 'data.ai (App Annie)'
      },
      {
        name: 'Sensor Tower',
        cost: 'Free tier, Pro pricing varies',
        difficulty: 'Easy',
        timeToResult: 'Ongoing',
        description: 'App store intelligence, keyword research, and ad intelligence.',
        tips: [
          'Research competitors\' ad strategies',
          'Find high-volume, low-competition keywords',
          'Track category rankings over time'
        ],
        link: 'https://sensortower.com',
        linkLabel: 'Sensor Tower'
      },
      {
        name: 'AppFollow',
        cost: 'Free tier, from $79/mo',
        difficulty: 'Easy',
        timeToResult: 'Ongoing',
        description: 'Review management, ASO tools, and competitor tracking.',
        tips: [
          'Reply to reviews from one dashboard',
          'Get notified of new reviews instantly',
          'Track ASO changes and their impact'
        ],
        link: 'https://appfollow.io',
        linkLabel: 'AppFollow'
      },
      {
        name: 'Adjust / AppsFlyer',
        cost: 'From $0.01 per attribution',
        difficulty: 'Medium',
        timeToResult: 'Ongoing',
        description: 'Track where your users come from and which campaigns perform best.',
        tips: [
          'Essential if running paid ads on multiple platforms',
          'Deep linking to specific app content',
          'Fraud prevention',
          'Free tiers available for small apps'
        ],
        link: 'https://adjust.com',
        linkLabel: 'Adjust'
      }
    ]
  }
];

function renderProjectMarketing(container, project) {
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
      
      '<div class="card p-8 mb-6 bg-gradient-to-r from-pink-900/30 to-purple-900/30 border-pink-500/30">' +
        '<div class="flex items-center gap-4 mb-4">' +
          '<div class="w-16 h-16 rounded-2xl bg-pink-500/20 flex items-center justify-center">' +
            '<svg class="w-8 h-8 text-pink-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z" /></svg>' +
          '</div>' +
          '<div>' +
            '<h2 class="text-2xl font-bold">📣 Marketing Your App</h2>' +
            '<p class="text-surface-400">A complete guide to promoting <span class="text-pink-400">' + escapeHtml(project.name) + '</span></p>' +
          '</div>' +
        '</div>' +
        '<div class="bg-surface-800/50 rounded-xl p-6">' +
          '<h4 class="font-semibold text-lg mb-3">🎯 Quick Start Guide</h4>' +
          '<ol class="space-y-2 text-surface-300">' +
            '<li class="flex items-start gap-3"><span class="bg-pink-500/20 text-pink-400 rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0 text-sm font-bold">1</span><span><strong>Start with ASO</strong> - Optimize your app store listing first. It\'s free and has lasting impact.</span></li>' +
            '<li class="flex items-start gap-3"><span class="bg-pink-500/20 text-pink-400 rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0 text-sm font-bold">2</span><span><strong>Build social presence</strong> - Pick 2 platforms and post consistently. Share your journey!</span></li>' +
            '<li class="flex items-start gap-3"><span class="bg-pink-500/20 text-pink-400 rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0 text-sm font-bold">3</span><span><strong>Launch on Product Hunt</strong> - Great way to get initial users and press coverage.</span></li>' +
            '<li class="flex items-start gap-3"><span class="bg-pink-500/20 text-pink-400 rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0 text-sm font-bold">4</span><span><strong>Try paid ads with small budget</strong> - Start with $10-20/day on Apple Search Ads or Google.</span></li>' +
            '<li class="flex items-start gap-3"><span class="bg-pink-500/20 text-pink-400 rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0 text-sm font-bold">5</span><span><strong>Iterate based on data</strong> - Double down on what works, cut what doesn\'t.</span></li>' +
          '</ol>' +
        '</div>' +
      '</div>' +
      
      MarketingChannels.map(function(category) {
        return '<div class="card p-6 mb-6">' +
          '<h3 class="text-xl font-bold mb-2">' + category.category + '</h3>' +
          '<p class="text-surface-400 mb-6">' + category.description + '</p>' +
          '<div class="space-y-4">' +
            category.items.map(function(item) {
              return '<div class="bg-surface-800/50 rounded-xl p-5 border border-surface-700">' +
                '<div class="flex items-start justify-between mb-3">' +
                  '<div>' +
                    '<h4 class="font-semibold text-lg">' + item.name + '</h4>' +
                    '<div class="flex items-center gap-4 mt-1">' +
                      '<span class="text-sm px-2 py-1 rounded bg-green-500/20 text-green-400">' + item.cost + '</span>' +
                      '<span class="text-sm text-surface-400">Difficulty: <span class="text-surface-200">' + item.difficulty + '</span></span>' +
                      '<span class="text-sm text-surface-400">Results: <span class="text-surface-200">' + item.timeToResult + '</span></span>' +
                    '</div>' +
                  '</div>' +
                  (item.link ? '<a href="' + item.link + '" target="_blank" class="btn-secondary text-sm">' +
                    '<svg class="w-4 h-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>' +
                    (item.linkLabel || 'Visit') +
                  '</a>' : '') +
                '</div>' +
                '<p class="text-surface-300 mb-4">' + item.description + '</p>' +
                '<div class="bg-surface-900/50 rounded-lg p-4">' +
                  '<h5 class="text-sm font-semibold text-primary-400 mb-2">💡 Tips & Tricks</h5>' +
                  '<ul class="space-y-1">' +
                    item.tips.map(function(tip) {
                      return '<li class="text-sm text-surface-300 flex items-start gap-2">' +
                        '<span class="text-primary-500 mt-1">•</span>' +
                        '<span>' + tip + '</span>' +
                      '</li>';
                    }).join('') +
                  '</ul>' +
                '</div>' +
                (item.platforms ? '<div class="mt-3 flex flex-wrap gap-2">' +
                  item.platforms.map(function(p) {
                    return '<span class="text-xs px-2 py-1 rounded bg-surface-700 text-surface-300">' + p + '</span>';
                  }).join('') +
                '</div>' : '') +
              '</div>';
            }).join('') +
          '</div>' +
        '</div>';
      }).join('') +
      
      '<!-- Marketing Budget Calculator -->' +
      '<div class="card p-6 mb-6">' +
        '<h3 class="text-xl font-bold mb-4">💵 Budget Calculator</h3>' +
        '<p class="text-surface-400 mb-6">Estimate your marketing spend based on your goals.</p>' +
        '<div class="grid grid-cols-3 gap-4 mb-6">' +
          '<div>' +
            '<label class="label">Monthly Budget</label>' +
            '<select id="marketing-budget" class="input" onchange="saveMarketingSettings()">' +
              '<option value="0">$0 (Free only)</option>' +
              '<option value="100">$100/month</option>' +
              '<option value="500">$500/month</option>' +
              '<option value="1000">$1,000/month</option>' +
              '<option value="5000">$5,000/month</option>' +
            '</select>' +
          '</div>' +
          '<div>' +
            '<label class="label">Target Platform</label>' +
            '<select id="marketing-platform" class="input" onchange="saveMarketingSettings()">' +
              '<option value="ios">iOS (App Store)</option>' +
              '<option value="android">Android (Google Play)</option>' +
              '<option value="both">Both iOS & Android</option>' +
              '<option value="desktop">Desktop (Steam/Windows)</option>' +
              '<option value="vr">VR (Meta Quest)</option>' +
            '</select>' +
          '</div>' +
          '<div>' +
            '<label class="label">App Type</label>' +
            '<select id="marketing-type" class="input" onchange="saveMarketingSettings()">' +
              '<option value="free">Free App</option>' +
              '<option value="paid">Paid App</option>' +
              '<option value="freemium">Freemium</option>' +
              '<option value="subscription">Subscription</option>' +
            '</select>' +
          '</div>' +
        '</div>' +
        '<div id="marketing-recommendation" class="bg-surface-800/50 rounded-xl p-6">' +
          '<p class="text-surface-400">Select your options above to get personalized recommendations.</p>' +
        '</div>' +
      '</div>' +
      
      '<!-- Marketing Checklist -->' +
      '<div class="card p-6">' +
        '<div class="flex items-center justify-between mb-4">' +
          '<h3 class="text-xl font-bold">✅ Pre-Launch Marketing Checklist</h3>' +
          '<button onclick="saveAllMarketingData()" class="btn-primary">' +
            '<svg class="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" /></svg>' +
            'Save Progress' +
          '</button>' +
        '</div>' +
        '<div id="marketing-checklist-container" class="space-y-3">' +
          getMarketingChecklistItems().map(function(item, index) {
            var priorityColors = {
              'High': 'bg-red-500/20 text-red-400',
              'Medium': 'bg-yellow-500/20 text-yellow-400',
              'Low': 'bg-blue-500/20 text-blue-400'
            };
            return '<label class="flex items-center gap-3 p-3 rounded-lg bg-surface-800/30 hover:bg-surface-800/50 cursor-pointer">' +
              '<input type="checkbox" class="checkbox" id="marketing-check-' + index + '" onchange="saveMarketingChecklist()">' +
              '<span class="flex-1">' + item.task + '</span>' +
              '<span class="text-xs px-2 py-1 rounded ' + priorityColors[item.priority] + '">' + item.priority + '</span>' +
            '</label>';
          }).join('') +
        '</div>' +
      '</div>' +
    '</div>';
  
  // Load saved marketing data and initialize
  loadMarketingData(project);
}

function getMarketingChecklistItems() {
  return [
    { task: 'Create social media accounts (Twitter, Instagram, etc.)', priority: 'High' },
    { task: 'Build a simple landing page or website', priority: 'High' },
    { task: 'Prepare press kit (screenshots, logo, description)', priority: 'High' },
    { task: 'Write compelling app store description', priority: 'High' },
    { task: 'Create 5-10 high-quality screenshots', priority: 'High' },
    { task: 'Record an app preview video (30-60 seconds)', priority: 'Medium' },
    { task: 'Identify 10-20 journalists/bloggers to reach out to', priority: 'Medium' },
    { task: 'Prepare launch day posts for all social platforms', priority: 'Medium' },
    { task: 'Set up App Store Connect / Play Console analytics', priority: 'Medium' },
    { task: 'Create email list and landing page for beta signups', priority: 'Low' },
    { task: 'Schedule Product Hunt launch', priority: 'Low' },
    { task: 'Set up basic ad accounts (Apple Search Ads, Google)', priority: 'Low' }
  ];
}

function loadMarketingData(project) {
  var marketingData = project.marketingData || {};
  
  // Load budget calculator settings
  var budgetSelect = document.getElementById('marketing-budget');
  var platformSelect = document.getElementById('marketing-platform');
  var typeSelect = document.getElementById('marketing-type');
  
  if (budgetSelect && marketingData.budget !== undefined) {
    budgetSelect.value = marketingData.budget;
  }
  if (platformSelect && marketingData.platform) {
    platformSelect.value = marketingData.platform;
  }
  if (typeSelect && marketingData.appType) {
    typeSelect.value = marketingData.appType;
  }
  
  // Load checklist states
  var checkedItems = marketingData.checklist || [];
  checkedItems.forEach(function(index) {
    var checkbox = document.getElementById('marketing-check-' + index);
    if (checkbox) {
      checkbox.checked = true;
    }
  });
  
  // Calculate recommendations with loaded values
  calculateMarketingPlan();
}

async function saveMarketingSettings() {
  var budgetSelect = document.getElementById('marketing-budget');
  var platformSelect = document.getElementById('marketing-platform');
  var typeSelect = document.getElementById('marketing-type');
  
  var project = AppState.currentProject;
  if (!project) return;
  
  var marketingData = project.marketingData || {};
  marketingData.budget = budgetSelect ? budgetSelect.value : '0';
  marketingData.platform = platformSelect ? platformSelect.value : 'ios';
  marketingData.appType = typeSelect ? typeSelect.value : 'free';
  
  // Save to database
  try {
    var updated = await window.electronAPI.updateProject(project.id, { marketingData: marketingData });
    AppState.currentProject = updated;
    // Update in projects list
    var idx = AppState.projects.findIndex(function(p) { return p.id === project.id; });
    if (idx !== -1) {
      AppState.projects[idx] = updated;
    }
  } catch (error) {
    console.error('Failed to save marketing settings:', error);
  }
  
  // Recalculate recommendations
  calculateMarketingPlan();
}

// Save all marketing data with feedback
async function saveAllMarketingData() {
  var project = AppState.currentProject;
  if (!project) return;
  
  var budgetSelect = document.getElementById('marketing-budget');
  var platformSelect = document.getElementById('marketing-platform');
  var typeSelect = document.getElementById('marketing-type');
  
  var marketingData = project.marketingData || {};
  
  // Save budget settings
  marketingData.budget = budgetSelect ? budgetSelect.value : '0';
  marketingData.platform = platformSelect ? platformSelect.value : 'ios';
  marketingData.appType = typeSelect ? typeSelect.value : 'free';
  
  // Save checklist items
  var checkedItems = [];
  var items = getMarketingChecklistItems();
  items.forEach(function(item, index) {
    var checkbox = document.getElementById('marketing-check-' + index);
    if (checkbox && checkbox.checked) {
      checkedItems.push(index);
    }
  });
  marketingData.checklist = checkedItems;
  
  // Save to database
  try {
    var updated = await window.electronAPI.updateProject(project.id, { marketingData: marketingData });
    AppState.currentProject = updated;
    // Update in projects list
    var idx = AppState.projects.findIndex(function(p) { return p.id === project.id; });
    if (idx !== -1) {
      AppState.projects[idx] = updated;
    }
    showToast('Marketing progress saved! (' + checkedItems.length + '/' + items.length + ' tasks completed)', 'success');
  } catch (error) {
    console.error('Failed to save marketing data:', error);
    showToast('Failed to save marketing data', 'error');
  }
}

async function saveMarketingChecklist() {
  var project = AppState.currentProject;
  if (!project) return;
  
  var marketingData = project.marketingData || {};
  var checkedItems = [];
  
  // Gather all checked items
  var items = getMarketingChecklistItems();
  items.forEach(function(item, index) {
    var checkbox = document.getElementById('marketing-check-' + index);
    if (checkbox && checkbox.checked) {
      checkedItems.push(index);
    }
  });
  
  marketingData.checklist = checkedItems;
  
  // Save to database
  try {
    var updated = await window.electronAPI.updateProject(project.id, { marketingData: marketingData });
    AppState.currentProject = updated;
    // Update in projects list
    var idx = AppState.projects.findIndex(function(p) { return p.id === project.id; });
    if (idx !== -1) {
      AppState.projects[idx] = updated;
    }
  } catch (error) {
    console.error('Failed to save marketing checklist:', error);
  }
}

function calculateMarketingPlan() {
  var budget = parseInt(document.getElementById('marketing-budget').value) || 0;
  var platform = document.getElementById('marketing-platform').value;
  var appType = document.getElementById('marketing-type').value;
  var container = document.getElementById('marketing-recommendation');
  
  var recommendations = [];
  
  if (budget === 0) {
    recommendations = [
      { channel: 'App Store Optimization', allocation: 'Focus 40% of time', reason: 'Free and essential for discoverability' },
      { channel: 'Social Media', allocation: 'Focus 30% of time', reason: 'Build audience and community' },
      { channel: 'Reddit/Communities', allocation: 'Focus 20% of time', reason: 'Engage with potential users' },
      { channel: 'Product Hunt Launch', allocation: 'Focus 10% of time', reason: 'One-time effort with big potential' }
    ];
  } else if (budget <= 100) {
    if (platform === 'ios' || platform === 'both') {
      recommendations.push({ channel: 'Apple Search Ads', allocation: '$' + Math.min(budget, 50) + '/mo', reason: 'Best ROI for iOS apps - start here' });
    }
    if (platform === 'android' || platform === 'both') {
      recommendations.push({ channel: 'Google App Campaigns', allocation: '$' + Math.min(budget, 50) + '/mo', reason: 'Reaches Play Store and YouTube' });
    }
    recommendations.push({ channel: 'ASO Tools (AppFollow)', allocation: '$0-20/mo', reason: 'Track reviews and keywords' });
  } else if (budget <= 500) {
    if (platform === 'ios' || platform === 'both') {
      recommendations.push({ channel: 'Apple Search Ads', allocation: '$' + Math.round(budget * 0.4) + '/mo', reason: 'Primary acquisition channel for iOS' });
    }
    if (platform === 'android' || platform === 'both') {
      recommendations.push({ channel: 'Google App Campaigns', allocation: '$' + Math.round(budget * 0.3) + '/mo', reason: 'Broad reach across Google properties' });
    }
    recommendations.push({ channel: 'Social Ads Test', allocation: '$' + Math.round(budget * 0.2) + '/mo', reason: 'Test Meta/TikTok with small budget' });
    recommendations.push({ channel: 'Tools & Analytics', allocation: '$' + Math.round(budget * 0.1) + '/mo', reason: 'AppFollow or Sensor Tower free tier' });
  } else {
    recommendations.push({ channel: 'Apple Search Ads', allocation: '$' + Math.round(budget * 0.35) + '/mo', reason: 'Scale what works on iOS' });
    recommendations.push({ channel: 'Google App Campaigns', allocation: '$' + Math.round(budget * 0.25) + '/mo', reason: 'Scale Android acquisition' });
    recommendations.push({ channel: 'Meta/TikTok Ads', allocation: '$' + Math.round(budget * 0.25) + '/mo', reason: 'Expand reach with social' });
    recommendations.push({ channel: 'Influencer Marketing', allocation: '$' + Math.round(budget * 0.1) + '/mo', reason: '1-2 micro-influencers per month' });
    recommendations.push({ channel: 'Analytics & Tools', allocation: '$' + Math.round(budget * 0.05) + '/mo', reason: 'Attribution and ASO tools' });
  }
  
  var estimatedCPI = platform === 'ios' ? 2.50 : platform === 'android' ? 1.50 : 2.00;
  var estimatedInstalls = budget > 0 ? Math.round((budget * 0.7) / estimatedCPI) : 0;
  
  container.innerHTML = '' +
    '<h4 class="font-semibold text-lg mb-4">📊 Recommended Budget Allocation</h4>' +
    '<div class="grid grid-cols-2 gap-6">' +
      '<div>' +
        '<h5 class="text-sm font-semibold text-surface-400 mb-3">Channel Breakdown</h5>' +
        '<div class="space-y-2">' +
          recommendations.map(function(r) {
            return '<div class="flex items-center justify-between p-2 rounded bg-surface-700/50">' +
              '<span class="text-sm font-medium">' + r.channel + '</span>' +
              '<span class="text-sm text-primary-400">' + r.allocation + '</span>' +
            '</div>';
          }).join('') +
        '</div>' +
      '</div>' +
      '<div>' +
        '<h5 class="text-sm font-semibold text-surface-400 mb-3">Expected Results</h5>' +
        '<div class="space-y-3">' +
          '<div class="p-3 rounded bg-green-500/10 border border-green-500/30">' +
            '<p class="text-sm text-surface-400">Estimated Monthly Installs</p>' +
            '<p class="text-2xl font-bold text-green-400">' + (estimatedInstalls > 0 ? estimatedInstalls.toLocaleString() + '+' : 'Varies (organic)') + '</p>' +
          '</div>' +
          '<div class="p-3 rounded bg-primary-500/10 border border-primary-500/30">' +
            '<p class="text-sm text-surface-400">Average Cost Per Install</p>' +
            '<p class="text-2xl font-bold text-primary-400">' + (budget > 0 ? '$' + estimatedCPI.toFixed(2) : 'Free') + '</p>' +
          '</div>' +
        '</div>' +
        '<p class="text-xs text-surface-500 mt-3">* Estimates based on industry averages. Actual results vary.</p>' +
      '</div>' +
    '</div>';
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
          
          '<!-- App Icon Upload -->' +
          '<div class="border-t border-surface-700 pt-6">' +
            '<h4 class="text-lg font-semibold mb-4 flex items-center gap-2">' +
              '<svg class="w-5 h-5 text-primary-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>' +
              'App Icon' +
            '</h4>' +
            '<div class="flex items-start gap-6">' +
              '<div id="app-icon-preview" class="w-24 h-24 rounded-xl bg-surface-800 border-2 border-dashed border-surface-600 flex items-center justify-center overflow-hidden">' +
                (submission?.iconPath ? 
                  '<img src="file://' + escapeHtml(submission.iconPath) + '" class="w-full h-full object-cover" />' :
                  '<svg class="w-8 h-8 text-surface-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>'
                ) +
              '</div>' +
              '<div>' +
                '<input type="hidden" id="app-icon-path" value="' + escapeHtml(submission?.iconPath || '') + '">' +
                '<button type="button" onclick="uploadAppIcon()" class="btn-secondary mb-2">' +
                  '<svg class="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" /></svg>' +
                  'Upload Icon' +
                '</button>' +
                '<p class="text-xs text-surface-400">Recommended: 1024x1024 PNG</p>' +
                '<p class="text-xs text-surface-500">This icon will also appear on your dashboard</p>' +
              '</div>' +
            '</div>' +
          '</div>' +
          
          '<!-- Screenshots Upload -->' +
          '<div class="border-t border-surface-700 pt-6">' +
            '<h4 class="text-lg font-semibold mb-4 flex items-center gap-2">' +
              '<svg class="w-5 h-5 text-accent-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>' +
              'Screenshots' +
            '</h4>' +
            '<div class="mb-4">' +
              '<button type="button" onclick="uploadScreenshots()" class="btn-secondary">' +
                '<svg class="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" /></svg>' +
                'Upload Screenshots' +
              '</button>' +
              '<span class="text-sm text-surface-400 ml-4">Select multiple images at once</span>' +
            '</div>' +
            '<div id="screenshots-grid" class="grid grid-cols-5 gap-4">' +
              renderScreenshotPreviews(submission?.screenshots || []) +
            '</div>' +
            '<input type="hidden" id="screenshots-data" value="' + escapeHtml(JSON.stringify(submission?.screenshots || [])) + '">' +
          '</div>' +
          
          '<!-- AI Content Generation -->' +
          '<div class="border-t border-surface-700 pt-6">' +
            '<h4 class="text-lg font-semibold mb-4">AI Content Generation</h4>' +
            '<div class="flex gap-4">' +
              '<button type="button" onclick="generateStoreContent(\'' + storeType + '\')" class="btn-secondary" ' + (!AppState.settings.openaiApiKey ? 'disabled' : '') + '>' +
                '<svg class="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>' +
                'Generate Store Content & Taglines' +
              '</button>' +
            '</div>' +
            '<p class="text-xs text-surface-400 mt-2">Generates descriptions, keywords, and taglines all at once</p>' +
          '</div>' +
          
          '<!-- AI Translation Section -->' +
          '<div class="border-t border-surface-700 pt-6">' +
            '<h4 class="text-lg font-semibold mb-4 flex items-center gap-2">' +
              '<svg class="w-5 h-5 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" /></svg>' +
              'AI Translations' +
            '</h4>' +
            '<p class="text-surface-400 text-sm mb-4">Translate your app listing to reach international markets.</p>' +
            '<div class="flex items-end gap-4 mb-4">' +
              '<div class="flex-1">' +
                '<label class="label">Select Language</label>' +
                '<select id="translation-language" class="select">' +
                  '<option value="">Choose a language...</option>' +
                  TranslationCountries.map(function(c) {
                    return '<option value="' + c.code + '">' + c.flag + ' ' + c.name + ' (' + c.region + ')</option>';
                  }).join('') +
                '</select>' +
              '</div>' +
              '<button type="button" onclick="translateStoreListing()" class="btn-secondary" ' + (!AppState.settings.openaiApiKey ? 'disabled' : '') + '>' +
                '<svg class="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" /></svg>' +
                'Translate' +
              '</button>' +
              '<button type="button" onclick="exportAllTranslations()" class="btn-ghost" title="Export all translations">' +
                '<svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>' +
              '</button>' +
            '</div>' +
            '<div id="translations-list" class="space-y-3 max-h-64 overflow-y-auto">' +
              renderExistingTranslations(submission?.translations || {}) +
            '</div>' +
            '<input type="hidden" id="translations-data" value="' + escapeHtml(JSON.stringify(submission?.translations || {})) + '">' +
          '</div>' +
          
          '<!-- Actions -->' +
          '<div class="flex justify-between pt-6 border-t border-surface-700">' +
            '<div class="flex gap-2">' +
              '<button type="button" onclick="navigateTo(\'project-distribution\', AppState.currentProject)" class="btn-secondary">Cancel</button>' +
              '<button type="button" onclick="generateDistributionReport(\'' + storeType + '\')" class="btn-ghost">' +
                '<svg class="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>' +
                'Export Report' +
              '</button>' +
            '</div>' +
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

// Render existing translations
function renderExistingTranslations(translations) {
  if (!translations || Object.keys(translations).length === 0) {
    return '<p class="text-surface-500 text-sm py-4 text-center border border-dashed border-surface-700 rounded-lg">No translations yet. Select a language above to translate your listing.</p>';
  }
  
  var html = '';
  Object.keys(translations).forEach(function(langCode) {
    var country = TranslationCountries.find(function(c) { return c.code === langCode; });
    var trans = translations[langCode];
    
    html += '<div class="bg-surface-800/50 rounded-lg p-4 border border-surface-700">' +
      '<div class="flex items-center justify-between mb-3">' +
        '<div class="flex items-center gap-2">' +
          '<span class="text-xl">' + (country ? country.flag : '🌐') + '</span>' +
          '<span class="font-semibold">' + (country ? country.name : langCode) + '</span>' +
          '<span class="text-xs text-surface-400">(' + (country ? country.region : '') + ')</span>' +
        '</div>' +
        '<div class="flex items-center gap-2">' +
          '<button type="button" onclick="viewTranslation(\'' + langCode + '\')" class="btn-ghost text-xs">' +
            '<svg class="w-3 h-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>' +
            'View' +
          '</button>' +
          '<button type="button" onclick="removeTranslation(\'' + langCode + '\')" class="btn-ghost text-xs text-red-400 hover:text-red-300">' +
            '<svg class="w-3 h-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>' +
            'Remove' +
          '</button>' +
        '</div>' +
      '</div>' +
      '<div class="grid grid-cols-2 gap-3 text-sm">' +
        '<div>' +
          '<p class="text-surface-400 text-xs">App Name</p>' +
          '<p class="truncate">' + escapeHtml(trans.appName || '-') + '</p>' +
        '</div>' +
        '<div>' +
          '<p class="text-surface-400 text-xs">Tagline</p>' +
          '<p class="truncate">' + escapeHtml(trans.tagline || '-') + '</p>' +
        '</div>' +
      '</div>' +
    '</div>';
  });
  
  return html;
}

// Translate store listing
async function translateStoreListing() {
  var langSelect = document.getElementById('translation-language');
  var langCode = langSelect ? langSelect.value : '';
  
  if (!langCode) {
    showToast('Please select a language to translate to', 'warning');
    return;
  }
  
  var country = TranslationCountries.find(function(c) { return c.code === langCode; });
  if (!country) {
    showToast('Invalid language selected', 'error');
    return;
  }
  
  // Get current content to translate
  var appName = document.getElementById('store-app-name').value;
  var tagline = document.getElementById('store-tagline').value;
  var shortDesc = document.getElementById('store-short-desc').value;
  var longDesc = document.getElementById('store-long-desc').value;
  var keywords = document.getElementById('store-keywords').value;
  
  if (!appName && !tagline && !shortDesc && !longDesc) {
    showToast('Please fill in some content to translate first', 'warning');
    return;
  }
  
  showLoading('Translating to ' + country.name + '...');
  
  try {
    var content = {
      appName: appName,
      tagline: tagline,
      shortDescription: shortDesc,
      longDescription: longDesc,
      keywords: keywords
    };
    
    var translation = await window.electronAPI.translateContent(content, country.name, country.region);
    
    // Update translations data
    var translationsData = document.getElementById('translations-data');
    var translations = {};
    try {
      translations = JSON.parse(translationsData.value || '{}');
    } catch (e) {
      translations = {};
    }
    
    translations[langCode] = {
      appName: translation.appName || appName,
      tagline: translation.tagline || tagline,
      shortDescription: translation.shortDescription || shortDesc,
      longDescription: translation.longDescription || longDesc,
      keywords: translation.keywords || keywords,
      translatedAt: new Date().toISOString()
    };
    
    translationsData.value = JSON.stringify(translations);
    
    // Update the translations list display
    document.getElementById('translations-list').innerHTML = renderExistingTranslations(translations);
    
    // Auto-save translation to database
    var submissionId = document.getElementById('submission-id').value;
    if (submissionId) {
      try {
        await window.electronAPI.updateStoreSubmission(submissionId, { translations: translations });
      } catch (saveError) {
        console.error('Failed to auto-save translation:', saveError);
      }
    }
    
    // Reset the dropdown
    langSelect.value = '';
    
    showToast(country.flag + ' Translation to ' + country.name + ' complete and saved!', 'success');
    
  } catch (error) {
    console.error('Translation error:', error);
    showToast('Translation failed: ' + error.message, 'error');
  } finally {
    hideLoading();
  }
}

// View translation details
function viewTranslation(langCode) {
  var translationsData = document.getElementById('translations-data');
  var translations = {};
  try {
    translations = JSON.parse(translationsData.value || '{}');
  } catch (e) {
    translations = {};
  }
  
  var trans = translations[langCode];
  if (!trans) {
    showToast('Translation not found', 'error');
    return;
  }
  
  var country = TranslationCountries.find(function(c) { return c.code === langCode; });
  
  var modalContent = '' +
    '<div class="space-y-4 overflow-y-auto">' +
      '<div class="flex items-center gap-2 mb-4">' +
        '<span class="text-2xl">' + (country ? country.flag : '🌐') + '</span>' +
        '<span class="text-xl font-semibold">' + (country ? country.name : langCode) + '</span>' +
      '</div>' +
      '<div>' +
        '<label class="label">App Name</label>' +
        '<p class="bg-surface-800 p-3 rounded-lg">' + escapeHtml(trans.appName || '-') + '</p>' +
      '</div>' +
      '<div>' +
        '<label class="label">Tagline</label>' +
        '<p class="bg-surface-800 p-3 rounded-lg">' + escapeHtml(trans.tagline || '-') + '</p>' +
      '</div>' +
      '<div>' +
        '<label class="label">Short Description</label>' +
        '<p class="bg-surface-800 p-3 rounded-lg whitespace-pre-wrap">' + escapeHtml(trans.shortDescription || '-') + '</p>' +
      '</div>' +
      '<div>' +
        '<label class="label">Full Description</label>' +
        '<div class="bg-surface-800 p-3 rounded-lg max-h-64 overflow-y-auto">' +
          '<pre class="text-sm whitespace-pre-wrap font-sans">' + escapeHtml(trans.longDescription || '-') + '</pre>' +
        '</div>' +
      '</div>' +
      '<div>' +
        '<label class="label">Keywords</label>' +
        '<p class="bg-surface-800 p-3 rounded-lg text-sm">' + escapeHtml(trans.keywords || '-') + '</p>' +
      '</div>' +
      '<p class="text-xs text-surface-500">Translated: ' + (trans.translatedAt ? new Date(trans.translatedAt).toLocaleString() : 'Unknown') + '</p>' +
    '</div>';
  
  showModal(
    country.flag + ' ' + country.name + ' Translation',
    modalContent,
    [
      { text: 'Close', class: 'btn-secondary', onclick: 'closeModal()' },
      { text: 'Export', class: 'btn-secondary', onclick: 'exportTranslation(\'' + langCode + '\')' },
      { text: 'Copy All', class: 'btn-primary', onclick: 'copyTranslation(\'' + langCode + '\')' }
    ]
  );
}

// Copy translation to clipboard
function copyTranslation(langCode) {
  var translationsData = document.getElementById('translations-data');
  var translations = {};
  try {
    translations = JSON.parse(translationsData.value || '{}');
  } catch (e) {
    translations = {};
  }
  
  var trans = translations[langCode];
  if (!trans) return;
  
  var country = TranslationCountries.find(function(c) { return c.code === langCode; });
  
  var text = '=== ' + (country ? country.name : langCode) + ' Translation ===\n\n' +
    'App Name: ' + (trans.appName || '') + '\n\n' +
    'Tagline: ' + (trans.tagline || '') + '\n\n' +
    'Short Description:\n' + (trans.shortDescription || '') + '\n\n' +
    'Full Description:\n' + (trans.longDescription || '') + '\n\n' +
    'Keywords: ' + (trans.keywords || '');
  
  navigator.clipboard.writeText(text).then(function() {
    showToast('Translation copied to clipboard!', 'success');
  }).catch(function() {
    showToast('Failed to copy', 'error');
  });
}

// Export translation as text file
async function exportTranslation(langCode) {
  var translationsData = document.getElementById('translations-data');
  var translations = {};
  try {
    translations = JSON.parse(translationsData.value || '{}');
  } catch (e) {
    translations = {};
  }
  
  var trans = translations[langCode];
  if (!trans) return;
  
  var country = TranslationCountries.find(function(c) { return c.code === langCode; });
  var appName = document.getElementById('store-app-name').value || 'App';
  
  var content = '========================================\n' +
    (country ? country.name : langCode).toUpperCase() + ' TRANSLATION\n' +
    '========================================\n\n' +
    'App: ' + appName + '\n' +
    'Language: ' + (country ? country.name : langCode) + ' (' + langCode + ')\n' +
    'Exported: ' + new Date().toLocaleString() + '\n\n' +
    '----------------------------------------\n' +
    'APP NAME\n' +
    '----------------------------------------\n' +
    (trans.appName || '-') + '\n\n' +
    '----------------------------------------\n' +
    'TAGLINE\n' +
    '----------------------------------------\n' +
    (trans.tagline || '-') + '\n\n' +
    '----------------------------------------\n' +
    'SHORT DESCRIPTION\n' +
    '----------------------------------------\n' +
    (trans.shortDescription || '-') + '\n\n' +
    '----------------------------------------\n' +
    'FULL DESCRIPTION\n' +
    '----------------------------------------\n' +
    (trans.longDescription || '-') + '\n\n' +
    '----------------------------------------\n' +
    'KEYWORDS\n' +
    '----------------------------------------\n' +
    (trans.keywords || '-') + '\n';
  
  var filename = appName.replace(/[^a-z0-9]/gi, '_') + '_' + langCode + '_translation.txt';
  
  try {
    await window.electronAPI.saveFile(filename, content);
    showToast('Translation exported!', 'success');
  } catch (error) {
    showToast('Export failed: ' + error.message, 'error');
  }
}

// Export all translations
async function exportAllTranslations() {
  var translationsData = document.getElementById('translations-data');
  var translations = {};
  try {
    translations = JSON.parse(translationsData.value || '{}');
  } catch (e) {
    translations = {};
  }
  
  var langCodes = Object.keys(translations);
  if (langCodes.length === 0) {
    showToast('No translations to export', 'warning');
    return;
  }
  
  var appName = document.getElementById('store-app-name').value || 'App';
  var content = '========================================\n' +
    'ALL TRANSLATIONS - ' + appName.toUpperCase() + '\n' +
    '========================================\n' +
    'Exported: ' + new Date().toLocaleString() + '\n' +
    'Total Languages: ' + langCodes.length + '\n\n';
  
  langCodes.forEach(function(langCode) {
    var trans = translations[langCode];
    var country = TranslationCountries.find(function(c) { return c.code === langCode; });
    
    content += '\n========================================\n' +
      (country ? country.flag + ' ' + country.name : langCode).toUpperCase() + '\n' +
      '========================================\n\n' +
      'APP NAME:\n' + (trans.appName || '-') + '\n\n' +
      'TAGLINE:\n' + (trans.tagline || '-') + '\n\n' +
      'SHORT DESCRIPTION:\n' + (trans.shortDescription || '-') + '\n\n' +
      'FULL DESCRIPTION:\n' + (trans.longDescription || '-') + '\n\n' +
      'KEYWORDS:\n' + (trans.keywords || '-') + '\n';
  });
  
  var filename = appName.replace(/[^a-z0-9]/gi, '_') + '_all_translations.txt';
  
  try {
    await window.electronAPI.saveFile(filename, content);
    showToast('All translations exported!', 'success');
  } catch (error) {
    showToast('Export failed: ' + error.message, 'error');
  }
}

// Remove translation
function removeTranslation(langCode) {
  var country = TranslationCountries.find(function(c) { return c.code === langCode; });
  
  showModal(
    'Remove Translation',
    '<p class="text-surface-300">Are you sure you want to remove the ' + (country ? country.flag + ' ' + country.name : langCode) + ' translation?</p>',
    [
      { text: 'Cancel', class: 'btn-secondary', onclick: 'closeModal()' },
      { text: 'Remove', class: 'btn-danger', onclick: 'confirmRemoveTranslation(\'' + langCode + '\')' }
    ]
  );
}

async function confirmRemoveTranslation(langCode) {
  var translationsData = document.getElementById('translations-data');
  var translations = {};
  try {
    translations = JSON.parse(translationsData.value || '{}');
  } catch (e) {
    translations = {};
  }
  
  delete translations[langCode];
  translationsData.value = JSON.stringify(translations);
  
  // Update display
  document.getElementById('translations-list').innerHTML = renderExistingTranslations(translations);
  
  // Auto-save to database
  var submissionId = document.getElementById('submission-id').value;
  if (submissionId) {
    try {
      await window.electronAPI.updateStoreSubmission(submissionId, { translations: translations });
    } catch (saveError) {
      console.error('Failed to save after removing translation:', saveError);
    }
  }
  
  closeModal();
  showToast('Translation removed', 'success');
}

async function saveStoreSubmission(status) {
  var submissionId = document.getElementById('submission-id').value;
  var storeType = document.getElementById('store-type').value;
  
  // Parse translations
  var translations = {};
  try {
    translations = JSON.parse(document.getElementById('translations-data').value || '{}');
  } catch (e) {
    translations = {};
  }
  
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
    iconPath: document.getElementById('app-icon-path').value,
    screenshots: JSON.parse(document.getElementById('screenshots-data').value || '[]'),
    translations: translations,
    status: status
  };
  
  try {
    if (submissionId) {
      await window.electronAPI.updateStoreSubmission(submissionId, data);
    } else {
      var submission = await window.electronAPI.createStoreSubmission(AppState.currentProject.id, storeType);
      await window.electronAPI.updateStoreSubmission(submission.id, data);
    }
    
    // Also update the project's icon if one was uploaded
    if (data.iconPath) {
      await window.electronAPI.updateProject(AppState.currentProject.id, { iconPath: data.iconPath });
      AppState.currentProject.iconPath = data.iconPath;
      
      // Update the project in AppState.projects array
      var projectIndex = AppState.projects.findIndex(function(p) { return p.id === AppState.currentProject.id; });
      if (projectIndex !== -1) {
        AppState.projects[projectIndex].iconPath = data.iconPath;
      }
      
      // Update sidebar
      updateProjectList();
    }
    
    showToast('Store submission saved!', 'success');
    navigateTo('project-distribution', AppState.currentProject);
  } catch (error) {
    showToast('Failed to save: ' + error.message, 'error');
  }
}

function renderScreenshotPreviews(screenshots) {
  if (!screenshots || screenshots.length === 0) {
    return '<div class="col-span-5 text-center py-8 text-surface-500 border-2 border-dashed border-surface-700 rounded-lg">No screenshots uploaded yet</div>';
  }
  
  return screenshots.map(function(path, index) {
    return '' +
      '<div class="relative group">' +
        '<img src="file://' + escapeHtml(path) + '" class="w-full h-32 object-cover rounded-lg border border-surface-700" />' +
        '<button type="button" onclick="removeScreenshot(' + index + ')" class="absolute top-1 right-1 w-6 h-6 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">' +
          '<svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" /></svg>' +
        '</button>' +
        '<span class="absolute bottom-1 left-1 text-xs bg-surface-900/80 px-2 py-0.5 rounded">' + (index + 1) + '</span>' +
      '</div>';
  }).join('');
}

async function generateDistributionReport(storeType) {
  var store = Stores.find(function(s) { return s.id === storeType; });
  var storeName = store ? store.name : storeType;
  
  // Gather all form data
  var screenshotsValue = document.getElementById('screenshots-data').value;
  var screenshots = [];
  try {
    screenshots = screenshotsValue ? JSON.parse(screenshotsValue) : [];
  } catch (e) {
    screenshots = [];
  }
  
  var translations = {};
  try {
    translations = JSON.parse(document.getElementById('translations-data').value || '{}');
  } catch (e) {
    translations = {};
  }
  
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
    iconPath: document.getElementById('app-icon-path').value,
    screenshots: screenshots,
    translations: translations
  };
  
  // Generate HTML report
  var html = '<!DOCTYPE html>\n<html lang="en">\n<head>\n';
  html += '<meta charset="UTF-8">\n';
  html += '<meta name="viewport" content="width=device-width, initial-scale=1.0">\n';
  html += '<title>' + storeName + ' Distribution Report - ' + escapeHtml(AppState.currentProject.name) + '</title>\n';
  html += '<style>\n';
  html += 'body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; max-width: 900px; margin: 0 auto; padding: 40px 20px; background: #0f172a; color: #e2e8f0; }\n';
  html += 'h1 { color: #a78bfa; border-bottom: 2px solid #6366f1; padding-bottom: 10px; }\n';
  html += 'h2 { color: #818cf8; margin-top: 30px; }\n';
  html += 'h3 { color: #c4b5fd; }\n';
  html += '.meta { color: #94a3b8; margin-bottom: 20px; }\n';
  html += '.section { background: #1e293b; border-radius: 12px; padding: 20px; margin: 20px 0; }\n';
  html += '.label { color: #a78bfa; font-weight: 600; }\n';
  html += '.value { background: #334155; padding: 12px; border-radius: 8px; margin: 8px 0; white-space: pre-wrap; font-family: monospace; }\n';
  html += '.copyable { position: relative; cursor: pointer; }\n';
  html += '.copyable:hover { background: #475569; }\n';
  html += '.copyable::after { content: "Click to copy"; position: absolute; right: 10px; top: 10px; font-size: 12px; color: #6366f1; opacity: 0; transition: opacity 0.2s; }\n';
  html += '.copyable:hover::after { opacity: 1; }\n';
  html += '.url-link { color: #60a5fa; text-decoration: none; }\n';
  html += '.url-link:hover { text-decoration: underline; }\n';
  html += '.file-path { background: #334155; padding: 8px 12px; border-radius: 6px; display: inline-block; margin: 4px 0; font-family: monospace; font-size: 13px; }\n';
  html += '.icon-preview { width: 100px; height: 100px; border-radius: 20px; object-fit: cover; border: 2px solid #475569; }\n';
  html += '.screenshot-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); gap: 16px; margin-top: 16px; }\n';
  html += '.screenshot-item img { width: 100%; border-radius: 8px; border: 2px solid #475569; }\n';
  html += '.screenshot-item p { font-size: 12px; color: #94a3b8; margin-top: 8px; word-break: break-all; }\n';
  html += '.warning { color: #fbbf24; }\n';
  html += 'hr { border: none; border-top: 1px solid #334155; margin: 30px 0; }\n';
  html += '</style>\n';
  html += '<script>\n';
  html += 'function copyText(text) { navigator.clipboard.writeText(text).then(function() { alert("Copied to clipboard!"); }); }\n';
  html += '</script>\n';
  html += '</head>\n<body>\n';
  
  html += '<h1>' + (store ? store.icon + ' ' : '') + storeName + ' Distribution Report</h1>\n';
  html += '<p class="meta"><strong>Project:</strong> ' + escapeHtml(AppState.currentProject.name) + ' &nbsp;|&nbsp; <strong>Generated:</strong> ' + new Date().toLocaleString() + '</p>\n';
  
  html += '<div class="section">\n';
  html += '<h2>📱 App Information</h2>\n';
  html += '<p><span class="label">App Name:</span></p>\n';
  html += '<div class="value copyable" onclick="copyText(this.innerText)">' + escapeHtml(data.appName || '(not set)') + '</div>\n';
  html += '<p><span class="label">Category:</span> ' + escapeHtml(data.category || '(not set)') + '</p>\n';
  html += '<p><span class="label">Tagline/Subtitle:</span></p>\n';
  html += '<div class="value copyable" onclick="copyText(this.innerText)">' + escapeHtml(data.tagline || '(not set)') + '</div>\n';
  html += '</div>\n';
  
  html += '<div class="section">\n';
  html += '<h2>📝 Descriptions</h2>\n';
  html += '<h3>Short Description</h3>\n';
  html += '<div class="value copyable" onclick="copyText(this.innerText)">' + escapeHtml(data.shortDescription || '(not set)') + '</div>\n';
  html += '<h3>Full Description</h3>\n';
  html += '<div class="value copyable" onclick="copyText(this.innerText)">' + escapeHtml(data.longDescription || '(not set)') + '</div>\n';
  html += '</div>\n';
  
  html += '<div class="section">\n';
  html += '<h2>🔑 Keywords</h2>\n';
  html += '<div class="value copyable" onclick="copyText(this.innerText)">' + escapeHtml(data.keywords || '(not set)') + '</div>\n';
  html += '</div>\n';
  
  html += '<div class="section">\n';
  html += '<h2>🔗 URLs</h2>\n';
  html += '<p><span class="label">Privacy Policy:</span> ';
  if (data.privacyPolicyUrl) {
    html += '<a href="' + escapeHtml(data.privacyPolicyUrl) + '" class="url-link" target="_blank">' + escapeHtml(data.privacyPolicyUrl) + '</a>';
  } else {
    html += '<span class="warning">(not set)</span>';
  }
  html += '</p>\n';
  html += '<p><span class="label">Support URL:</span> ';
  if (data.supportUrl) {
    html += '<a href="' + escapeHtml(data.supportUrl) + '" class="url-link" target="_blank">' + escapeHtml(data.supportUrl) + '</a>';
  } else {
    html += '<span class="warning">(not set)</span>';
  }
  html += '</p>\n';
  html += '<p><span class="label">Marketing URL:</span> ';
  if (data.marketingUrl) {
    html += '<a href="' + escapeHtml(data.marketingUrl) + '" class="url-link" target="_blank">' + escapeHtml(data.marketingUrl) + '</a>';
  } else {
    html += '<span class="warning">(not set)</span>';
  }
  html += '</p>\n';
  html += '</div>\n';
  
  html += '<hr>\n';
  html += '<div class="section">\n';
  html += '<h2>🖼️ Media Assets</h2>\n';
  html += '<h3>App Icon</h3>\n';
  if (data.iconPath) {
    html += '<img src="file://' + escapeHtml(data.iconPath) + '" class="icon-preview" alt="App Icon" />\n';
    html += '<p class="file-path copyable" onclick="copyText(\'' + escapeHtml(data.iconPath).replace(/'/g, "\\'") + '\')">' + escapeHtml(data.iconPath) + '</p>\n';
  } else {
    html += '<p class="warning">⚠️ No icon uploaded</p>\n';
  }
  
  html += '<h3>Screenshots (' + data.screenshots.length + ')</h3>\n';
  if (data.screenshots && data.screenshots.length > 0) {
    html += '<div class="screenshot-grid">\n';
    data.screenshots.forEach(function(path, index) {
      html += '<div class="screenshot-item">\n';
      html += '<img src="file://' + escapeHtml(path) + '" alt="Screenshot ' + (index + 1) + '" />\n';
      html += '<p class="copyable" onclick="copyText(\'' + escapeHtml(path).replace(/'/g, "\\'") + '\')">' + escapeHtml(path) + '</p>\n';
      html += '</div>\n';
    });
    html += '</div>\n';
  } else {
    html += '<p class="warning">⚠️ No screenshots uploaded</p>\n';
  }
  html += '</div>\n';
  
  // Translations section
  var translationKeys = Object.keys(data.translations || {});
  if (translationKeys.length > 0) {
    html += '<hr>\n';
    html += '<div class="section">\n';
    html += '<h2>🌍 Translations (' + translationKeys.length + ' languages)</h2>\n';
    
    translationKeys.forEach(function(langCode) {
      var country = TranslationCountries.find(function(c) { return c.code === langCode; });
      var trans = data.translations[langCode];
      
      html += '<div style="background: #1a2332; padding: 16px; border-radius: 8px; margin: 16px 0; border-left: 4px solid #6366f1;">\n';
      html += '<h3>' + (country ? country.flag + ' ' : '') + (country ? country.name : langCode) + '</h3>\n';
      
      html += '<p><span class="label">App Name:</span></p>\n';
      html += '<div class="value copyable" onclick="copyText(\'' + escapeHtml(trans.appName || '').replace(/'/g, "\\'").replace(/\n/g, '\\n') + '\')">' + escapeHtml(trans.appName || '-') + '</div>\n';
      
      html += '<p><span class="label">Tagline:</span></p>\n';
      html += '<div class="value copyable" onclick="copyText(\'' + escapeHtml(trans.tagline || '').replace(/'/g, "\\'").replace(/\n/g, '\\n') + '\')">' + escapeHtml(trans.tagline || '-') + '</div>\n';
      
      html += '<p><span class="label">Short Description:</span></p>\n';
      html += '<div class="value copyable" onclick="copyText(\'' + escapeHtml(trans.shortDescription || '').replace(/'/g, "\\'").replace(/\n/g, '\\n') + '\')">' + escapeHtml(trans.shortDescription || '-') + '</div>\n';
      
      html += '<p><span class="label">Full Description:</span></p>\n';
      html += '<div class="value copyable" style="max-height: 200px; overflow-y: auto;" onclick="copyText(\'' + escapeHtml(trans.longDescription || '').replace(/'/g, "\\'").replace(/\n/g, '\\n') + '\')">' + escapeHtml(trans.longDescription || '-') + '</div>\n';
      
      html += '<p><span class="label">Keywords:</span></p>\n';
      html += '<div class="value copyable" onclick="copyText(\'' + escapeHtml(trans.keywords || '').replace(/'/g, "\\'").replace(/\n/g, '\\n') + '\')">' + escapeHtml(trans.keywords || '-') + '</div>\n';
      
      html += '</div>\n';
    });
    
    html += '</div>\n';
  }
  
  html += '</body>\n</html>';
  
  // Save report directly
  try {
    var filename = AppState.currentProject.name.replace(/[^a-z0-9]/gi, '-') + '-' + storeType + '-distribution-report.html';
    var savedPath = await window.electronAPI.saveFileHtml(filename, html);
    if (savedPath) {
      showToast('Report saved! Opening...', 'success');
      // Open the file
      await window.electronAPI.openFile(savedPath);
    }
  } catch (error) {
    showToast('Failed to save report: ' + error.message, 'error');
  }
}

function copyReportToClipboard() {
  if (window.currentDistributionReport) {
    navigator.clipboard.writeText(window.currentDistributionReport).then(function() {
      showToast('Report copied to clipboard!', 'success');
    }).catch(function(err) {
      showToast('Failed to copy: ' + err.message, 'error');
    });
  }
}

async function saveReportAsFile() {
  if (window.currentDistributionReport) {
    try {
      var result = await window.electronAPI.saveFile(
        AppState.currentProject.name + '-distribution-report.md',
        window.currentDistributionReport
      );
      if (result) {
        showToast('Report saved successfully!', 'success');
      }
    } catch (error) {
      showToast('Failed to save report: ' + error.message, 'error');
    }
  }
}

async function uploadAppIcon() {
  try {
    var iconPath = await window.electronAPI.selectImage();
    if (iconPath) {
      document.getElementById('app-icon-path').value = iconPath;
      document.getElementById('app-icon-preview').innerHTML = '<img src="file://' + escapeHtml(iconPath) + '" class="w-full h-full object-cover" />';
      showToast('Icon uploaded!', 'success');
    }
  } catch (error) {
    showToast('Failed to upload icon: ' + error.message, 'error');
  }
}

async function uploadScreenshots() {
  try {
    var newScreenshots = await window.electronAPI.selectMultipleImages();
    if (newScreenshots && newScreenshots.length > 0) {
      var existingScreenshots = JSON.parse(document.getElementById('screenshots-data').value || '[]');
      var allScreenshots = existingScreenshots.concat(newScreenshots);
      document.getElementById('screenshots-data').value = JSON.stringify(allScreenshots);
      document.getElementById('screenshots-grid').innerHTML = renderScreenshotPreviews(allScreenshots);
      showToast(newScreenshots.length + ' screenshot(s) added!', 'success');
    }
  } catch (error) {
    showToast('Failed to upload screenshots: ' + error.message, 'error');
  }
}

function removeScreenshot(index) {
  var screenshots = JSON.parse(document.getElementById('screenshots-data').value || '[]');
  screenshots.splice(index, 1);
  document.getElementById('screenshots-data').value = JSON.stringify(screenshots);
  document.getElementById('screenshots-grid').innerHTML = renderScreenshotPreviews(screenshots);
  showToast('Screenshot removed', 'success');
}

async function generateStoreContent(storeType) {
  showLoading('Generating store content with taglines...');
  try {
    var content = await window.electronAPI.generateStoreContent(AppState.currentProject, storeType);
    
    if (content.appName) document.getElementById('store-app-name').value = content.appName;
    if (content.tagline) document.getElementById('store-tagline').value = content.tagline;
    if (content.shortDescription) document.getElementById('store-short-desc').value = content.shortDescription;
    if (content.longDescription) document.getElementById('store-long-desc').value = content.longDescription;
    if (content.keywords) document.getElementById('store-keywords').value = content.keywords.join(', ');
    if (content.category) document.getElementById('store-category').value = content.category;
    
    // Show taglines in a modal if generated
    if (content.mainTaglines || content.screenshotTaglines) {
      showGeneratedTaglinesModal(content);
    }
    
    showToast('Content generated with taglines!', 'success');
  } catch (error) {
    showToast('Failed to generate content: ' + error.message, 'error');
  } finally {
    hideLoading();
  }
}

function showGeneratedTaglinesModal(content) {
  var modalContent = '<div class="space-y-4 max-h-96 overflow-y-auto">';
  
  if (content.mainTaglines && content.mainTaglines.length > 0) {
    modalContent += '<div><h4 class="font-semibold mb-2 text-primary-400">Main Taglines</h4><div class="space-y-2">' +
      content.mainTaglines.map(function(t) {
        return '<div class="flex items-center justify-between p-2 bg-surface-700 rounded"><span>' + escapeHtml(t) + '</span><button onclick="useTagline(\'' + escapeJsString(t) + '\')" class="btn-ghost text-sm">Use</button></div>';
      }).join('') + '</div></div>';
  }
  
  if (content.subtitles && content.subtitles.length > 0) {
    modalContent += '<div><h4 class="font-semibold mb-2 text-accent-400">Subtitles</h4><div class="space-y-2">' +
      content.subtitles.map(function(t) {
        return '<div class="flex items-center justify-between p-2 bg-surface-700 rounded"><span>' + escapeHtml(t) + '</span><button onclick="useTagline(\'' + escapeJsString(t) + '\')" class="btn-ghost text-sm">Use</button></div>';
      }).join('') + '</div></div>';
  }
  
  if (content.screenshotTaglines && content.screenshotTaglines.length > 0) {
    modalContent += '<div><h4 class="font-semibold mb-2 text-green-400">Screenshot Taglines</h4><div class="space-y-3">';
    content.screenshotTaglines.forEach(function(item) {
      modalContent += '<div class="p-3 bg-surface-800 rounded"><p class="text-sm text-surface-400 mb-2">' + escapeHtml(item.feature) + '</p><div class="space-y-1">' +
        item.taglines.map(function(t) {
          return '<div class="text-sm pl-2 border-l-2 border-surface-600">' + escapeHtml(t) + '</div>';
        }).join('') + '</div></div>';
    });
    modalContent += '</div></div>';
  }
  
  if (content.socialMediaTaglines) {
    modalContent += '<div><h4 class="font-semibold mb-2 text-yellow-400">Social Media Taglines</h4><div class="space-y-2">';
    Object.keys(content.socialMediaTaglines).forEach(function(platform) {
      modalContent += '<div class="p-2 bg-surface-700 rounded"><span class="text-xs text-surface-400 uppercase">' + platform + '</span><p class="mt-1">' + escapeHtml(content.socialMediaTaglines[platform]) + '</p></div>';
    });
    modalContent += '</div></div>';
  }
  
  modalContent += '</div>';
  
  showModal('Generated Taglines', modalContent, [
    { text: 'Close', class: 'btn-secondary', onclick: 'closeModal()' }
  ]);
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
                  '<option value="gpt-5.2"' + (settings.aiModel === 'gpt-5.2' ? ' selected' : '') + '>GPT-5.2 - $1.75 in / $14 out per 1M tokens</option>' +
                  '<option value="gpt-5.2-pro"' + (settings.aiModel === 'gpt-5.2-pro' ? ' selected' : '') + '>GPT-5.2 Pro - $21 in / $168 out per 1M tokens</option>' +
                  '<option value="gpt-5.1-codex-max"' + (settings.aiModel === 'gpt-5.1-codex-max' ? ' selected' : '') + '>GPT-5.1 Codex Max (Coding)</option>' +
                  '<option value="gpt-5-mini"' + (settings.aiModel === 'gpt-5-mini' ? ' selected' : '') + '>GPT-5 Mini - $0.25 in / $2 out per 1M tokens</option>' +
                  '<option value="gpt-5-nano"' + (settings.aiModel === 'gpt-5-nano' ? ' selected' : '') + '>GPT-5 Nano (High Throughput)</option>' +
                  '<option value="gpt-4o"' + (settings.aiModel === 'gpt-4o' ? ' selected' : '') + '>GPT-4o (Multimodal Legacy)</option>' +
                  '<option value="gpt-4"' + (settings.aiModel === 'gpt-4' ? ' selected' : '') + '>GPT-4 (Legacy)</option>' +
                  '<option value="gpt-4-turbo-preview"' + (settings.aiModel === 'gpt-4-turbo-preview' ? ' selected' : '') + '>GPT-4 Turbo (Legacy)</option>' +
                  '<option value="gpt-3.5-turbo"' + (settings.aiModel === 'gpt-3.5-turbo' ? ' selected' : '') + '>GPT-3.5 Turbo (Legacy)</option>' +
                '</select>' +
                '<div class="mt-2 p-3 bg-surface-800/50 rounded-lg">' +
                  '<p class="text-xs font-semibold text-primary-400 mb-1">💰 Pricing Information</p>' +
                  '<p class="text-xs text-surface-300 mb-2">Prices shown are per 1 million tokens. Most API calls use 1,000-10,000 tokens.</p>' +
                  '<div class="grid grid-cols-2 gap-2 text-xs">' +
                    '<div>' +
                      '<span class="font-medium text-surface-200">Best Value:</span>' +
                      '<p class="text-surface-400">GPT-5 Mini for most tasks</p>' +
                    '</div>' +
                    '<div>' +
                      '<span class="font-medium text-surface-200">Best Quality:</span>' +
                      '<p class="text-surface-400">GPT-5.2 for complex work</p>' +
                    '</div>' +
                    '<div>' +
                      '<span class="font-medium text-surface-200">Best for Code:</span>' +
                      '<p class="text-surface-400">GPT-5.1 Codex Max</p>' +
                    '</div>' +
                    '<div>' +
                      '<span class="font-medium text-surface-200">Premium:</span>' +
                      '<p class="text-surface-400">GPT-5.2 Pro for hardest tasks</p>' +
                    '</div>' +
                  '</div>' +
                  '<p class="text-xs text-surface-500 mt-2">💡 Tip: Cached inputs are 90% cheaper! <a href="https://openai.com/api/pricing/" target="_blank" class="text-primary-400 hover:underline">View full pricing</a></p>' +
                '</div>' +
              '</div>' +
              '<div>' +
                '<label class="label">Reasoning Effort</label>' +
                '<select id="reasoning-effort" class="select">' +
                  '<option value="none"' + (settings.reasoningEffort === 'none' || !settings.reasoningEffort ? ' selected' : '') + '>None (Fastest, Default for GPT-5.2)</option>' +
                  '<option value="low"' + (settings.reasoningEffort === 'low' ? ' selected' : '') + '>Low (Quick thinking)</option>' +
                  '<option value="medium"' + (settings.reasoningEffort === 'medium' ? ' selected' : '') + '>Medium (Balanced)</option>' +
                  '<option value="high"' + (settings.reasoningEffort === 'high' ? ' selected' : '') + '>High (Thorough reasoning)</option>' +
                  '<option value="xhigh"' + (settings.reasoningEffort === 'xhigh' ? ' selected' : '') + '>X-High (Maximum reasoning)</option>' +
                '</select>' +
                '<p class="text-xs text-surface-400 mt-1">💡 Higher reasoning = more thorough but slower. Use "none" for speed, increase for complex problems</p>' +
              '</div>' +
              '<div>' +
                '<label class="label">Output Verbosity</label>' +
                '<select id="output-verbosity" class="select">' +
                  '<option value="low"' + (settings.outputVerbosity === 'low' ? ' selected' : '') + '>Low (Concise answers)</option>' +
                  '<option value="medium"' + (settings.outputVerbosity === 'medium' || !settings.outputVerbosity ? ' selected' : '') + '>Medium (Default)</option>' +
                  '<option value="high"' + (settings.outputVerbosity === 'high' ? ' selected' : '') + '>High (Detailed explanations)</option>' +
                '</select>' +
                '<p class="text-xs text-surface-400 mt-1">💡 Controls output length. Use "low" for concise code, "high" for thorough docs</p>' +
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
          
          '<!-- General Settings -->' +
          '<div class="border-b border-surface-700 pb-6">' +
            '<h4 class="font-semibold mb-4 flex items-center gap-2">' +
              '<svg class="w-5 h-5 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>' +
              'General' +
            '</h4>' +
            '<div class="space-y-4">' +
              renderToggle('auto-save', 'Auto Save', 'Automatically save changes', settings.autoSave !== false) +
              renderToggle('notifications', 'Notifications', 'Show desktop notifications', settings.notificationEnabled !== false) +
              '<div>' +
                '<label class="label">Font Size</label>' +
                '<div class="flex items-center gap-4">' +
                  '<span class="text-sm text-surface-400">Small</span>' +
                  '<input type="range" id="font-size" class="flex-1" min="12" max="20" step="1" value="' + (settings.fontSize || 16) + '" oninput="applyFontSizeInstantly(this.value)">' +
                  '<span class="text-sm text-surface-400">Large</span>' +
                  '<span id="font-size-value" class="text-sm font-semibold text-primary-400 min-w-[3rem] text-center">' + (settings.fontSize || 16) + 'px</span>' +
                '</div>' +
                '<p class="text-xs text-surface-400 mt-1">Adjust the base font size for the entire application</p>' +
              '</div>' +
            '</div>' +
          '</div>' +
          
          '<!-- GitHub Integration -->' +
          '<div class="border-b border-surface-700 pb-6">' +
            '<h4 class="font-semibold mb-4 flex items-center gap-2">' +
              '<svg class="w-5 h-5 text-gray-400" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>' +
              'GitHub Integration' +
            '</h4>' +
            '<div class="space-y-4">' +
              '<div>' +
                '<label class="label">GitHub Personal Access Token</label>' +
                '<div class="flex gap-2">' +
                  '<input type="password" id="github-token" class="input flex-1" placeholder="ghp_xxxxxxxxxxxx" value="' + (settings.githubToken || '') + '">' +
                  '<button type="button" onclick="toggleGithubTokenVisibility()" class="btn-ghost">' +
                    '<svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>' +
                  '</button>' +
                  '<button type="button" onclick="validateGithubToken()" class="btn-secondary">Validate</button>' +
                '</div>' +
                '<div class="mt-2 p-3 bg-surface-800/50 rounded-lg">' +
                  '<p class="text-xs text-surface-300 mb-2"><strong>Token Requirements:</strong></p>' +
                  '<ul class="text-xs text-surface-400 list-disc list-inside space-y-1">' +
                    '<li><strong>Classic Token:</strong> Enable the <code class="text-primary-400">repo</code> scope</li>' +
                    '<li><strong>Fine-grained Token:</strong> Set Repository permissions → Administration → Read and write</li>' +
                  '</ul>' +
                  '<p class="text-xs text-surface-400 mt-2">Generate at <a href="https://github.com/settings/tokens?type=beta" class="text-primary-400 hover:underline" target="_blank">GitHub Settings → Fine-grained tokens</a> or <a href="https://github.com/settings/tokens/new" class="text-primary-400 hover:underline" target="_blank">Classic tokens</a></p>' +
                '</div>' +
              '</div>' +
              '<div>' +
                '<label class="label">Default Repository Visibility</label>' +
                '<select id="github-visibility" class="select">' +
                  '<option value="private"' + (settings.githubVisibility === 'private' || !settings.githubVisibility ? ' selected' : '') + '>Private</option>' +
                  '<option value="public"' + (settings.githubVisibility === 'public' ? ' selected' : '') + '>Public</option>' +
                '</select>' +
              '</div>' +
            '</div>' +
          '</div>' +
          
          '<!-- Tech Stack Preferences -->' +
          '<div class="border-b border-surface-700 pb-6">' +
            '<h4 class="font-semibold mb-4 flex items-center gap-2">' +
              '<svg class="w-5 h-5 text-primary-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" /></svg>' +
              'My Preferred Tech Stack' +
            '</h4>' +
            '<p class="text-sm text-surface-400 mb-4">Select your favorite technologies. The AI will prioritize these when generating project plans.</p>' +
            '<div id="tech-stack-container" class="max-h-96 overflow-y-auto border border-surface-700 rounded-lg">' +
              renderTechStackCheckboxes(settings.userTechStack || []) +
            '</div>' +
          '</div>' +
          
          '<!-- Codex/AI Agent Integration -->' +
          '<div class="border-b border-surface-700 pb-6">' +
            '<h4 class="font-semibold mb-4 flex items-center gap-2">' +
              '<svg class="w-5 h-5 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>' +
              'AI Agent & Codex Integration' +
            '</h4>' +
            '<div class="space-y-4">' +
              '<div>' +
                '<label class="label">Preferred AI Agent Provider</label>' +
                '<select id="ai-agent-provider" class="select">' +
                  '<option value="codex"' + (settings.aiAgentProvider === 'codex' || !settings.aiAgentProvider ? ' selected' : '') + '>OpenAI Codex CLI</option>' +
                  '<option value="claude"' + (settings.aiAgentProvider === 'claude' ? ' selected' : '') + '>Claude (Anthropic)</option>' +
                  '<option value="cursor"' + (settings.aiAgentProvider === 'cursor' ? ' selected' : '') + '>Cursor AI</option>' +
                  '<option value="copilot"' + (settings.aiAgentProvider === 'copilot' ? ' selected' : '') + '>GitHub Copilot</option>' +
                  '<option value="manual"' + (settings.aiAgentProvider === 'manual' ? ' selected' : '') + '>Manual (Copy Instructions)</option>' +
                '</select>' +
                '<p class="text-xs text-surface-400 mt-1">Choose your preferred AI agent for building projects from instructions.</p>' +
              '</div>' +
              '<div>' +
                '<label class="label">Default AI Model</label>' +
                '<select id="codex-default-model" class="select">' +
                  '<optgroup label="Codex Optimized (Local + Cloud)">' +
                    '<option value="gpt-5.1-codex-max"' + (settings.codexDefaultModel === 'gpt-5.1-codex-max' ? ' selected' : '') + '>GPT-5.1 Codex Max (Most Intelligent)</option>' +
                    '<option value="gpt-5.1-codex"' + (settings.codexDefaultModel === 'gpt-5.1-codex' || settings.codexDefaultModel === 'codex' || !settings.codexDefaultModel ? ' selected' : '') + '>GPT-5.1 Codex (Recommended)</option>' +
                    '<option value="gpt-5.1-codex-mini"' + (settings.codexDefaultModel === 'gpt-5.1-codex-mini' ? ' selected' : '') + '>GPT-5.1 Codex Mini (Fast)</option>' +
                    '<option value="gpt-5-codex"' + (settings.codexDefaultModel === 'gpt-5-codex' ? ' selected' : '') + '>GPT-5 Codex (Previous Gen)</option>' +
                  '</optgroup>' +
                  '<optgroup label="Frontier Models (Cloud Only)">' +
                    '<option value="gpt-5.2"' + (settings.codexDefaultModel === 'gpt-5.2' ? ' selected' : '') + '>GPT-5.2 (Best Overall)</option>' +
                    '<option value="gpt-5"' + (settings.codexDefaultModel === 'gpt-5' ? ' selected' : '') + '>GPT-5 (Reasoning + Coding)</option>' +
                    '<option value="gpt-5-mini"' + (settings.codexDefaultModel === 'gpt-5-mini' ? ' selected' : '') + '>GPT-5 Mini (Affordable)</option>' +
                    '<option value="gpt-5-nano"' + (settings.codexDefaultModel === 'gpt-5-nano' ? ' selected' : '') + '>GPT-5 Nano (Fastest)</option>' +
                  '</optgroup>' +
                  '<optgroup label="Reasoning Models (Cloud Only)">' +
                    '<option value="o3"' + (settings.codexDefaultModel === 'o3' ? ' selected' : '') + '>o3 (Complex Reasoning)</option>' +
                    '<option value="o4-mini"' + (settings.codexDefaultModel === 'o4-mini' ? ' selected' : '') + '>o4-mini (Fast Reasoning)</option>' +
                  '</optgroup>' +
                  '<optgroup label="GPT-4 Series (Legacy)">' +
                    '<option value="gpt-4.1"' + (settings.codexDefaultModel === 'gpt-4.1' ? ' selected' : '') + '>GPT-4.1 (Non-Reasoning)</option>' +
                    '<option value="gpt-4o"' + (settings.codexDefaultModel === 'gpt-4o' ? ' selected' : '') + '>GPT-4o</option>' +
                    '<option value="gpt-4o-mini"' + (settings.codexDefaultModel === 'gpt-4o-mini' ? ' selected' : '') + '>GPT-4o Mini</option>' +
                  '</optgroup>' +
                '</select>' +
                '<p class="text-xs text-surface-400 mt-1">Codex models for Local CLI. Others for Cloud builds.</p>' +
              '</div>' +
              renderToggle('auto-create-github-repo', 'Auto-Create GitHub Repository', 'Automatically create a GitHub repository when starting a Codex build', settings.autoCreateGithubRepo === true) +
              renderToggle('live-codex-sync', 'Live Codex Sync', 'Push Codex changes to GitHub repository in real-time', settings.liveCodexSync === true) +
            '</div>' +
          '</div>' +
          
          '<!-- Experimental Features -->' +
          '<div class="pb-6">' +
            '<h4 class="font-semibold mb-4 flex items-center gap-2">' +
              '<svg class="w-5 h-5 text-pink-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" /></svg>' +
              'Experimental Features' +
              '<span class="badge bg-pink-500/20 text-pink-400 text-xs">BETA</span>' +
            '</h4>' +
            '<div class="bg-surface-800/50 rounded-lg p-4 mb-4">' +
              '<p class="text-sm text-surface-400">These features are experimental and may change or be removed. Use at your own risk!</p>' +
            '</div>' +
            '<div class="space-y-4">' +
              renderToggle('experimental-codex', 'Codex Build Integration', 'Enable "Build with Codex" button to generate project code from AI instructions using OpenAI Codex CLI', settings.experimentalCodex === true) +
              renderToggle('step-by-step-instructions', 'Step-by-Step Agent Instructions', 'Break down AI agent instructions into individual steps with copy buttons', settings.stepByStepInstructions !== false) +
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

function renderTechStackCheckboxes(selectedStack, checkboxClass) {
  selectedStack = selectedStack || [];
  checkboxClass = checkboxClass || 'tech-stack-checkbox';
  var searchId = 'tech-search-' + checkboxClass;
  var containerId = 'tech-list-' + checkboxClass;
  
  // Sort technologies alphabetically by name
  var sortedTech = TechStackOptions.slice().sort(function(a, b) {
    return a.name.localeCompare(b.name);
  });
  
  // Sort: checked items first, then unchecked (both alphabetically)
  sortedTech.sort(function(a, b) {
    var aChecked = selectedStack.includes(a.id);
    var bChecked = selectedStack.includes(b.id);
    if (aChecked && !bChecked) return -1;
    if (!aChecked && bChecked) return 1;
    return 0;
  });
  
  var html = '' +
    '<div class="sticky top-0 bg-surface-800 p-3 border-b border-surface-700 z-10">' +
      '<input type="text" id="' + searchId + '" class="input text-sm" placeholder="🔍 Search technologies..." onkeyup="filterTechStack(\'' + searchId + '\', \'' + containerId + '\')">' +
    '</div>' +
    '<div id="' + containerId + '" class="grid grid-cols-3 gap-2 p-3">';
  
  sortedTech.forEach(function(tech) {
    var isChecked = selectedStack.includes(tech.id);
    html += '' +
      '<label class="tech-stack-item flex items-center gap-2 p-2 rounded-lg border border-surface-700 hover:bg-surface-800 transition-colors cursor-pointer" data-name="' + tech.name.toLowerCase() + '" data-category="' + tech.category.toLowerCase() + '">' +
        '<input type="checkbox" class="checkbox ' + checkboxClass + '" value="' + tech.id + '" ' + (isChecked ? 'checked' : '') + ' onchange="reorderTechStack(\'' + containerId + '\')">' +
        '<span class="text-lg">' + tech.icon + '</span>' +
        '<div class="flex-1 min-w-0">' +
          '<span class="font-medium text-xs block truncate">' + tech.name + '</span>' +
          '<p class="text-xs text-surface-400 truncate">' + tech.category + '</p>' +
        '</div>' +
      '</label>';
  });
  
  html += '</div>';
  return html;
}

function filterTechStack(searchId, containerId) {
  var searchValue = document.getElementById(searchId).value.toLowerCase();
  var container = document.getElementById(containerId);
  var items = container.getElementsByClassName('tech-stack-item');
  
  Array.from(items).forEach(function(item) {
    var name = item.getAttribute('data-name');
    var category = item.getAttribute('data-category');
    if (name.includes(searchValue) || category.includes(searchValue)) {
      item.style.display = '';
    } else {
      item.style.display = 'none';
    }
  });
}

function reorderTechStack(containerId) {
  var container = document.getElementById(containerId);
  var items = Array.from(container.getElementsByClassName('tech-stack-item'));
  
  // Sort items: checked first, then unchecked
  items.sort(function(a, b) {
    var aChecked = a.querySelector('input[type="checkbox"]').checked;
    var bChecked = b.querySelector('input[type="checkbox"]').checked;
    if (aChecked && !bChecked) return -1;
    if (!aChecked && bChecked) return 1;
    return 0;
  });
  
  // Re-append items in sorted order
  items.forEach(function(item) {
    container.appendChild(item);
  });
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
    '<label class="cursor-pointer" onclick="applyThemeInstantly(\'' + value + '\')">' +
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
    reasoningEffort: document.getElementById('reasoning-effort').value,
    outputVerbosity: document.getElementById('output-verbosity').value,
    enableAiPlanning: document.getElementById('enable-planning').classList.contains('toggle-active'),
    enableAiAdjustments: document.getElementById('enable-adjustments').classList.contains('toggle-active'),
    enableAiStoreContent: document.getElementById('enable-store-content').classList.contains('toggle-active'),
    enableAiKeywords: document.getElementById('enable-keywords').classList.contains('toggle-active'),
    enableAiTaglines: document.getElementById('enable-taglines').classList.contains('toggle-active'),
    theme: 'dark',
    branding: 'default',
    autoSave: document.getElementById('auto-save').classList.contains('toggle-active'),
    notificationEnabled: document.getElementById('notifications').classList.contains('toggle-active'),
    experimentalCodex: document.getElementById('experimental-codex').classList.contains('toggle-active'),
    // GitHub Integration
    githubToken: document.getElementById('github-token').value,
    githubVisibility: document.getElementById('github-visibility').value,
    // Codex/AI Agent Integration
    aiAgentProvider: document.getElementById('ai-agent-provider').value,
    codexDefaultModel: document.getElementById('codex-default-model').value,
    autoCreateGithubRepo: document.getElementById('auto-create-github-repo').classList.contains('toggle-active'),
    liveCodexSync: document.getElementById('live-codex-sync').classList.contains('toggle-active'),
    stepByStepInstructions: document.getElementById('step-by-step-instructions').classList.contains('toggle-active'),
    // Tech Stack Preferences
    userTechStack: Array.from(document.querySelectorAll('.tech-stack-checkbox:checked')).map(el => el.value),
    // Font Size
    fontSize: parseInt(document.getElementById('font-size').value)
  };
  
  try {
    AppState.settings = await window.electronAPI.updateSettings(settings);
    applyTheme(settings.theme);
    applyFontSize(settings.fontSize);
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
    var iconHtml = p.iconPath ?
      '<img src="file://' + escapeHtml(p.iconPath) + '" class="w-6 h-6 rounded object-cover" />' :
      '<div class="w-6 h-6 rounded bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center text-white text-xs font-bold">' +
        (p.name ? p.name.charAt(0).toUpperCase() : 'P') +
      '</div>';
    
    return '<a href="#" class="nav-link text-sm" onclick="openProject(\'' + p.id + '\')">' +
      iconHtml +
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

// Update the display value as slider moves
function updateDevProgressDisplay(value) {
  var displayEl = document.getElementById('dev-progress-value');
  if (displayEl) {
    displayEl.textContent = value + '%';
  }
}

// Save development progress to database
async function saveDevelopmentProgress() {
  var slider = document.getElementById('dev-progress-slider');
  if (!slider || !AppState.currentProject) return;
  
  var newProgress = parseInt(slider.value);
  await updateDevelopmentProgress(AppState.currentProject, newProgress);
  
  // Update the progress bars in the overview
  renderProjects();
  
  showToast('Development progress saved!', 'success');
}

async function updateDevelopmentProgress(project, newProgress) {
  try {
    await window.electronAPI.updateProject(project.id, { developmentProgress: newProgress });
    project.developmentProgress = newProgress;
    AppState.currentProject = project;
    
    // Update project in the list
    var projectIndex = AppState.projects.findIndex(function(p) { return p.id === project.id; });
    if (projectIndex !== -1) {
      AppState.projects[projectIndex].developmentProgress = newProgress;
    }
  } catch (error) {
    console.error('Failed to update development progress:', error);
  }
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
  const project = AppState.currentProject;
  if (!project) return;

  const categoryOptions = Object.keys(Categories).map(cat => 
    `<option value="${escapeHtml(cat)}" ${project.category === cat ? 'selected' : ''}>${escapeHtml(cat)}</option>`
  ).join('');

  const subcategorySelect = (category) => {
    if (category && Categories[category]) {
      return Categories[category].map(sub => 
        `<option value="${escapeHtml(sub)}" ${project.subcategory === sub ? 'selected' : ''}>${escapeHtml(sub)}</option>`
      ).join('');
    }
    return '<option value="">Select category first</option>';
  };

  const iconPreview = project.iconPath ?
    `<img src="file://${escapeHtml(project.iconPath)}" class="w-full h-full object-cover" />` :
    `<div class="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary-500 to-accent-500 text-white font-bold text-2xl">${project.name ? project.name.charAt(0).toUpperCase() : 'P'}</div>`;

  const modalContent = `
    <form id="edit-project-form" class="space-y-6">
      <div class="flex items-start gap-6">
        <div>
          <label class="label mb-2">App Icon</label>
          <div id="edit-icon-preview" class="w-20 h-20 rounded-xl overflow-hidden border-2 border-surface-600">
            ${iconPreview}
          </div>
          <input type="hidden" id="edit-icon-path" value="${escapeHtml(project.iconPath || '')}">
          <button type="button" onclick="uploadEditProjectIcon()" class="btn-ghost text-sm mt-2">
            <svg class="w-4 h-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" /></svg>
            Change Icon
          </button>
        </div>
        <div class="flex-1">
          <label class="label">Project Name *</label>
          <input type="text" id="edit-project-name" class="input" value="${escapeHtml(project.name)}" required>
        </div>
      </div>
      <div>
        <label class="label">App Description *</label>
        <textarea id="edit-app-description" class="textarea min-h-[150px]" required>${escapeHtml(project.appDescription || '')}</textarea>
      </div>
      <div class="grid grid-cols-2 gap-4">
        <div>
          <label class="label">Category *</label>
          <select id="edit-project-category" class="select" required onchange="updateEditSubcategories(this.value)">
            <option value="">Select a category</option>
            ${categoryOptions}
          </select>
        </div>
        <div>
          <label class="label">Subcategory</label>
          <select id="edit-project-subcategory" class="select">
            ${subcategorySelect(project.category)}
          </select>
        </div>
      </div>
      <div>
        <label class="label">Additional Notes & Requirements</label>
        <textarea id="edit-additional-notes" class="textarea" placeholder="Tech stack preferences, design inspirations, competitors to analyze, etc.">${escapeHtml(project.description || '')}</textarea>
      </div>
      <div>
        <label class="label">Project Tech Stack</label>
        <p class="text-sm text-surface-400 mb-4">Select the technologies you want to use for this project.</p>
        <div id="edit-tech-stack-container" class="grid grid-cols-1 gap-4 max-h-64 overflow-y-auto p-4 bg-surface-800/50 rounded-lg">
          <!-- Tech stack checkboxes will be rendered here -->
        </div>
      </div>
      <div class="pt-4 border-t border-surface-700">
        <button type="button" onclick="closeModal(); editLiveStoreLinks();" class="btn-ghost w-full justify-center">
          <svg class="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" /></svg>
          Manage Live Store Links
        </button>
      </div>
    </form>
  `;

  showModal(
    'Edit Project',
    modalContent,
    [
      { text: 'Cancel', class: 'btn-secondary', onclick: 'closeModal()' },
      { text: 'Save Changes', class: 'btn-primary', onclick: 'handleProjectUpdate()' }
    ]
  );
  
  // Render tech stack checkboxes after modal is shown
  setTimeout(() => {
    const container = document.getElementById('edit-tech-stack-container');
    if (container) {
      container.innerHTML = renderTechStackCheckboxes(project.projectTechStack || [], 'edit-tech-stack-checkbox');
    }
  }, 0);
}

async function uploadEditProjectIcon() {
  try {
    var iconPath = await window.electronAPI.selectImage();
    if (iconPath) {
      document.getElementById('edit-icon-path').value = iconPath;
      document.getElementById('edit-icon-preview').innerHTML = '<img src="file://' + escapeHtml(iconPath) + '" class="w-full h-full object-cover" />';
      showToast('Icon selected!', 'success');
    }
  } catch (error) {
    showToast('Failed to select icon: ' + error.message, 'error');
  }
}

function updateEditSubcategories(category) {
  const subcategorySelectEl = document.getElementById('edit-project-subcategory');
  if (category && Categories[category]) {
    subcategorySelectEl.innerHTML = '<option value="">Select a subcategory</option>' +
      Categories[category].map(sub => `<option value="${escapeHtml(sub)}">${escapeHtml(sub)}</option>`).join('');
  } else {
    subcategorySelectEl.innerHTML = '<option value="">Select category first</option>';
  }
}

async function handleProjectUpdate() {
  const project = AppState.currentProject;
  if (!project) return;

  const iconPath = document.getElementById('edit-icon-path').value;

  const updatedData = {
    name: document.getElementById('edit-project-name').value,
    appDescription: document.getElementById('edit-app-description').value,
    category: document.getElementById('edit-project-category').value,
    subcategory: document.getElementById('edit-project-subcategory').value,
    description: document.getElementById('edit-additional-notes').value,
    iconPath: iconPath || project.iconPath || null,
    projectTechStack: Array.from(document.querySelectorAll('.edit-tech-stack-checkbox:checked')).map(el => el.value)
  };

  if (!updatedData.name || !updatedData.appDescription || !updatedData.category) {
    showToast('Please fill all required fields', 'warning');
    return;
  }

  showLoading('Saving changes...');
  try {
    const updatedProject = await window.electronAPI.updateProject(project.id, updatedData);
    AppState.currentProject = updatedProject;
    
    // Update in AppState.projects array
    var projectIndex = AppState.projects.findIndex(function(p) { return p.id === project.id; });
    if (projectIndex !== -1) {
      AppState.projects[projectIndex] = updatedProject;
    }
    
    // Update sidebar
    updateProjectList();
    
    closeModal();
    showToast('Project updated successfully!', 'success');
    navigateTo('project-view', updatedProject);
  } catch (error) {
    showToast('Failed to update project: ' + error.message, 'error');
  } finally {
    hideLoading();
  }
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

function applyFontSize(fontSize) {
  fontSize = fontSize || 16;
  document.documentElement.style.fontSize = fontSize + 'px';
}

function applyFontSizeInstantly(fontSize) {
  fontSize = parseInt(fontSize) || 16;
  applyFontSize(fontSize);
  
  // Update the display value
  var display = document.getElementById('font-size-value');
  if (display) {
    display.textContent = fontSize + 'px';
  }
}

function applyThemeInstantly(theme) {
  applyTheme(theme);
  
  // Update the selected theme in the UI
  var themeInputs = document.querySelectorAll('input[name="theme"]');
  themeInputs.forEach(function(input) {
    input.checked = input.value === theme;
    var label = input.closest('label');
    var themeBox = label.querySelector('div.rounded-lg');
    if (input.checked) {
      themeBox.classList.remove('border-surface-700', 'hover:border-surface-600');
      themeBox.classList.add('border-primary-500');
    } else {
      themeBox.classList.remove('border-primary-500');
      themeBox.classList.add('border-surface-700', 'hover:border-surface-600');
    }
  });
  
  window.electronAPI.updateSettings({ theme: theme }).then(function(settings) {
    AppState.settings = settings;
    showToast('Theme applied!', 'success');
  }).catch(function(error) {
    showToast('Failed to save theme', 'error');
  });
}

function applyBrandingInstantly(branding) {
  window.electronAPI.updateSettings({ branding: branding }).then(function(settings) {
    AppState.settings = settings;
    showToast('Branding applied!', 'success');
  }).catch(function(error) {
    showToast('Failed to save branding', 'error');
  });
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
      '<div class="modal max-w-2xl w-full" onclick="event.stopPropagation()">' +
        '<div class="p-6 border-b border-surface-700">' +
          '<h3 class="text-xl font-bold">' + title + '</h3>' +
        '</div>' +
        '<div class="p-6 max-h-[70vh] overflow-y-auto">' + content + '</div>' +
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
var FunnyLoadingMessages = [
  "Convincing the AI that your app is the next big thing...",
  "Teaching robots to appreciate good UX...",
  "Brewing artisanal algorithms...",
  "Consulting the silicon oracle...",
  "Negotiating with the cloud spirits...",
  "Spinning up hamster wheels in the data center...",
  "Converting caffeine to code...",
  "Asking ChatGPT's cooler cousin for help...",
  "Warming up the neural networks...",
  "Downloading more RAM... just kidding",
  "Making the bits and bytes play nice...",
  "Politely asking the servers to hurry up...",
  "Doing the robot dance internally...",
  "Consulting Stack Overflow... autonomously",
  "Pretending to be a 10x developer...",
  "Running AI on vibes and dreams...",
  "Generating synergy at scale...",
  "Teaching AI the meaning of 'ASAP'...",
  "Refactoring the multiverse...",
  "Deploying to the cloud (the fluffy kind)...",
  "Turning your idea into something amazing...",
  "Making your app dreams come true...",
  "Sprinkling some AI magic dust...",
  "Summoning the code wizards...",
  "Channeling Steve Jobs energy...",
  "Thinking different... very different...",
  "Calculating the meaning of life (it's 42)...",
  "Asking the AI to be creative (pray for us)...",
  "Generating lorem ipsum... wait, real content...",
  "Compiling hopes and dreams..."
];

var loadingJokeInterval = null;

function showLoading(text, showStream) {
  document.getElementById('loading-text').textContent = text || 'Loading...';
  var overlay = document.getElementById('loading-overlay');
  var jokeEl = document.getElementById('loading-joke');
  var streamEl = document.getElementById('loading-stream');
  var streamTextEl = document.getElementById('loading-stream-text');
  
  // Show random funny message
  jokeEl.textContent = FunnyLoadingMessages[Math.floor(Math.random() * FunnyLoadingMessages.length)];
  
  // Cycle through jokes every 3 seconds
  if (loadingJokeInterval) clearInterval(loadingJokeInterval);
  loadingJokeInterval = setInterval(function() {
    jokeEl.style.opacity = '0';
    setTimeout(function() {
      jokeEl.textContent = FunnyLoadingMessages[Math.floor(Math.random() * FunnyLoadingMessages.length)];
      jokeEl.style.opacity = '1';
    }, 300);
  }, 3000);
  
  // Handle streaming display
  if (showStream) {
    streamEl.classList.remove('hidden');
    streamTextEl.textContent = '';
  } else {
    streamEl.classList.add('hidden');
  }
  
  jokeEl.style.transition = 'opacity 0.3s';
  overlay.classList.remove('hidden');
  overlay.classList.add('flex');
}

function updateLoadingStream(text) {
  var streamTextEl = document.getElementById('loading-stream-text');
  var streamEl = document.getElementById('loading-stream');
  if (streamTextEl) {
    streamTextEl.textContent = text;
    // Auto-scroll to bottom
    streamEl.scrollTop = streamEl.scrollHeight;
  }
}

function hideLoading() {
  var overlay = document.getElementById('loading-overlay');
  overlay.classList.add('hidden');
  overlay.classList.remove('flex');
  
  if (loadingJokeInterval) {
    clearInterval(loadingJokeInterval);
    loadingJokeInterval = null;
  }
  
  // Hide stream
  document.getElementById('loading-stream').classList.add('hidden');
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

// ==================== Step-by-Step Instructions ====================
function renderStepByStepInstructions(instructions) {
  if (!instructions || instructions.trim().length === 0) {
    return '<p class="text-surface-400 text-center py-4">No instructions available</p>';
  }
  
  // Parse instructions into steps
  var steps = parseInstructionsToSteps(instructions);
  
  // Restore completed steps from database if available
  if (AppState.currentProject && AppState.currentProject.completedSteps) {
    var completedIndices = AppState.currentProject.completedSteps;
    completedIndices.forEach(function(index) {
      if (steps[index]) {
        steps[index].completed = true;
      }
    });
  }
  
  if (steps.length === 0) {
    return '<div class="bg-surface-800 rounded-lg p-4 font-mono text-sm text-surface-300 whitespace-pre-wrap">' +
      escapeHtml(instructions) +
    '</div>';
  }
  
  // Progress bar
  var completedCount = steps.filter(function(s) { return s.completed; }).length;
  var progressPercent = Math.round((completedCount / steps.length) * 100);
  
  var html = '' +
    '<div class="mb-4 p-4 bg-surface-800 rounded-lg">' +
      '<div class="flex items-center justify-between mb-2">' +
        '<span class="text-sm font-medium">Progress: ' + completedCount + ' / ' + steps.length + ' steps</span>' +
        '<span class="text-sm text-primary-400">' + progressPercent + '%</span>' +
      '</div>' +
      '<div class="w-full bg-surface-700 rounded-full h-2">' +
        '<div class="bg-gradient-to-r from-primary-500 to-accent-500 h-2 rounded-full transition-all duration-300" style="width: ' + progressPercent + '%"></div>' +
      '</div>' +
    '</div>' +
    '<div class="space-y-4">';
  
  steps.forEach(function(step, index) {
    var stepId = 'step-' + index;
    var isCompleted = step.completed;
    var statusClass = isCompleted ? 'border-blue-500/30 bg-blue-500/10' : 'border-surface-700 bg-surface-800/50';
    var statusIcon = isCompleted ? 
      '<svg class="w-6 h-6 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>' :
      '<span class="w-7 h-7 rounded-full bg-primary-500/20 text-primary-400 font-bold text-sm flex items-center justify-center">' + (index + 1) + '</span>';
    
    // Parse step content for special sections
    var goalMatch = step.content.match(/\*\*Goal:\*\*\s*([^\n*]+)/i);
    var verificationMatch = step.content.match(/\*\*Verification:\*\*\s*([^\n]+(?:\n(?!\*\*)[^\n]+)*)/i);
    var filesMatch = step.content.match(/\*\*Files to create\/modify:\*\*\s*([\s\S]*?)(?=\*\*|$)/i);
    
    var goalHtml = goalMatch ? 
      '<div class="mb-3 p-2 bg-blue-500/10 border border-blue-500/20 rounded">' +
        '<span class="text-xs text-blue-400 font-semibold">GOAL:</span> ' +
        '<span class="text-sm text-blue-300">' + escapeHtml(goalMatch[1].trim()) + '</span>' +
      '</div>' : '';
    
    var verificationHtml = verificationMatch ?
      '<div class="mt-3 p-3 bg-yellow-500/10 border border-yellow-500/20 rounded">' +
        '<div class="flex items-start gap-2">' +
          '<svg class="w-4 h-4 text-yellow-400 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>' +
          '<div>' +
            '<span class="text-xs text-yellow-400 font-semibold block mb-1">HOW TO VERIFY:</span>' +
            '<span class="text-sm text-yellow-200">' + escapeHtml(verificationMatch[1].trim()) + '</span>' +
          '</div>' +
        '</div>' +
      '</div>' : '';
    
    // Clean content - remove the special sections for display
    var cleanContent = step.content
      .replace(/\*\*Goal:\*\*\s*[^\n]+\n?/gi, '')
      .replace(/\*\*Verification:\*\*\s*[^\n]+(?:\n(?!\*\*)[^\n]+)*/gi, '')
      .trim();
    
    // Expand first incomplete step, or first step if all complete
    var isExpanded = false;
    var firstIncompleteIndex = steps.findIndex(function(s) { return !s.completed; });
    if (firstIncompleteIndex === -1) firstIncompleteIndex = 0;
    isExpanded = (index === firstIncompleteIndex);
    
    var expandedClass = isExpanded ? '' : 'hidden';
    var rotateClass = isExpanded ? 'rotate-180' : '';
    
    html += '' +
      '<div class="border rounded-lg ' + statusClass + ' overflow-hidden transition-all duration-200" id="' + stepId + '">' +
        '<div class="flex items-center justify-between p-4 border-b border-surface-700/50 cursor-pointer" onclick="toggleStepExpand(' + index + ')">' +
          '<div class="flex items-center gap-3">' +
            statusIcon +
            '<div>' +
              '<h4 class="font-semibold ' + (isCompleted ? 'text-blue-400' : '') + '">' + escapeHtml(step.title || 'Step ' + (index + 1)) + '</h4>' +
              (goalMatch ? '<p class="text-xs text-surface-400 mt-0.5">' + escapeHtml(goalMatch[1].trim().substring(0, 80)) + (goalMatch[1].length > 80 ? '...' : '') + '</p>' : '') +
            '</div>' +
          '</div>' +
          '<div class="flex items-center gap-2">' +
            '<button onclick="event.stopPropagation(); runStepWithCodex(' + index + ')" class="btn-ghost text-sm px-3 py-1.5 text-pink-400 hover:bg-pink-500/10" title="Run this step with Codex">' +
              '<svg class="w-4 h-4 mr-1 inline" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>' +
              'Run' +
            '</button>' +
            '<button onclick="event.stopPropagation(); copyStepToClipboard(' + index + ')" class="btn-ghost text-sm px-3 py-1.5">' +
              '<svg class="w-4 h-4 mr-1 inline" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>' +
              'Copy' +
            '</button>' +
            '<button onclick="event.stopPropagation(); toggleStepComplete(' + index + ')" class="btn-ghost text-sm px-3 py-1.5 ' + (isCompleted ? 'text-blue-400 bg-blue-500/10' : '') + '">' +
              '<svg class="w-4 h-4 mr-1 inline" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" /></svg>' +
              (isCompleted ? 'Done ✓' : 'Mark Done') +
            '</button>' +
            '<svg class="w-5 h-5 transform transition-transform text-surface-400 ' + rotateClass + '" fill="none" viewBox="0 0 24 24" stroke="currentColor" id="expand-icon-' + index + '"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" /></svg>' +
          '</div>' +
        '</div>' +
        '<div class="p-4 ' + expandedClass + '" id="step-content-' + index + '">' +
          goalHtml +
          '<div class="font-mono text-sm text-surface-300 whitespace-pre-wrap">' +
            escapeHtml(cleanContent) +
          '</div>' +
          verificationHtml +
        '</div>' +
      '</div>';
  });
  
  html += '</div>';
  
  // Store steps in global state for later use
  window.currentInstructionSteps = steps;
  
  return html;
}

function parseInstructionsToSteps(instructions) {
  var steps = [];
  var lines = instructions.split('\n');
  var currentStep = null;
  
  // Patterns to match step headers (in order of priority)
  var stepPatterns = [
    /^##\s*Step\s*(\d+)[.:)]\s*(.+)$/i,        // ## Step 1: Title
    /^###\s*Step\s*(\d+)[.:)]\s*(.+)$/i,       // ### Step 1: Title  
    /^##?\s*(?:Step\s*)?(\d+)[.:)]\s*(.*)$/i,  // ## 1. Title or Step 1: Title
    /^(\d+)[.:)]\s+(.+)$/,                      // 1. Title or 1) Title
    /^\*\*Step\s*(\d+)[.:)?\s]*(.*)?\*\*$/i,   // **Step 1: Title**
    /^###?\s+(.+)$/                             // ### Title (generic heading)
  ];
  
  lines.forEach(function(line) {
    var matched = false;
    
    for (var i = 0; i < stepPatterns.length; i++) {
      var match = line.match(stepPatterns[i]);
      if (match) {
        // Save previous step if exists
        if (currentStep) {
          // Clean up content - trim trailing whitespace
          currentStep.content = currentStep.content.trim();
          steps.push(currentStep);
        }
        
        // Start new step
        var title = match[2] || match[1] || 'Step ' + (steps.length + 1);
        currentStep = {
          title: title.trim(),
          content: '',
          completed: false
        };
        matched = true;
        break;
      }
    }
    
    if (!matched && currentStep) {
      currentStep.content += (currentStep.content ? '\n' : '') + line;
    } else if (!matched && !currentStep && line.trim()) {
      // First content before any step heading - could be an overview
      // Skip if it's just the "AI Agent Instructions" header
      if (!line.match(/^#?\s*AI Agent Instructions/i)) {
        currentStep = {
          title: 'Overview',
          content: line,
          completed: false
        };
      }
    }
  });
  
  // Don't forget the last step
  if (currentStep) {
    currentStep.content = currentStep.content.trim();
    steps.push(currentStep);
  }
  
  // If no steps were parsed, create a single step with all content
  if (steps.length === 0 && instructions.trim()) {
    steps.push({
      title: 'Instructions',
      content: instructions,
      completed: false
    });
  }
  
  return steps;
}

function copyStepToClipboard(stepIndex) {
  var steps = window.currentInstructionSteps || [];
  if (stepIndex < steps.length) {
    var step = steps[stepIndex];
    var text = '## ' + step.title + '\n\n' + step.content;
    copyToClipboard(text);
  }
}

function toggleStepComplete(stepIndex) {
  var steps = window.currentInstructionSteps || [];
  if (stepIndex < steps.length) {
    steps[stepIndex].completed = !steps[stepIndex].completed;
    var isCompleted = steps[stepIndex].completed;
    
    // Update the step card styling
    var stepEl = document.getElementById('step-' + stepIndex);
    if (stepEl) {
      if (isCompleted) {
        stepEl.classList.remove('border-surface-700', 'bg-surface-800/50');
        stepEl.classList.add('border-blue-500/30', 'bg-blue-500/10');
      } else {
        stepEl.classList.remove('border-blue-500/30', 'bg-blue-500/10');
        stepEl.classList.add('border-surface-700', 'bg-surface-800/50');
      }
      
      // Update the title color
      var titleEl = stepEl.querySelector('h4');
      if (titleEl) {
        if (isCompleted) {
          titleEl.classList.add('text-blue-400');
        } else {
          titleEl.classList.remove('text-blue-400');
        }
      }
      
      // Update the button styling
      var buttonEls = stepEl.querySelectorAll('button');
      buttonEls.forEach(function(btn) {
        if (btn.textContent.includes('Done') || btn.textContent.includes('Mark Done')) {
          if (isCompleted) {
            btn.classList.add('text-blue-400', 'bg-blue-500/10');
            btn.innerHTML = '<svg class="w-4 h-4 mr-1 inline" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" /></svg>Done ✓';
          } else {
            btn.classList.remove('text-blue-400', 'bg-blue-500/10');
            btn.innerHTML = '<svg class="w-4 h-4 mr-1 inline" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" /></svg>Mark Done';
          }
        }
      });
      
      // Update the status icon
      var iconContainer = stepEl.querySelector('.flex.items-center.gap-3');
      if (iconContainer) {
        var iconEl = iconContainer.children[0];
        if (iconEl) {
          if (isCompleted) {
            iconEl.outerHTML = '<svg class="w-6 h-6 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>';
          } else {
            iconEl.outerHTML = '<span class="w-7 h-7 rounded-full bg-primary-500/20 text-primary-400 font-bold text-sm flex items-center justify-center">' + (stepIndex + 1) + '</span>';
          }
        }
      }
    }
    
    // Update progress bar
    var completedCount = steps.filter(function(s) { return s.completed; }).length;
    var progressPercent = Math.round((completedCount / steps.length) * 100);
    
    var progressContainer = document.querySelector('.mb-4.p-4.bg-surface-800.rounded-lg');
    if (progressContainer) {
      var progressText = progressContainer.querySelector('.flex.items-center.justify-between span:first-child');
      var progressPercentText = progressContainer.querySelector('.flex.items-center.justify-between .text-primary-400');
      var progressBar = progressContainer.querySelector('.bg-gradient-to-r');
      
      if (progressText) progressText.textContent = 'Progress: ' + completedCount + ' / ' + steps.length + ' steps';
      if (progressPercentText) progressPercentText.textContent = progressPercent + '%';
      if (progressBar) progressBar.style.width = progressPercent + '%';
    }
    
    // Update development progress slider if it exists
    var devProgressSlider = document.getElementById('dev-progress-slider');
    if (devProgressSlider) {
      devProgressSlider.value = progressPercent;
      updateDevProgressDisplay(progressPercent);
    }
    
    // Save the development progress to database
    if (AppState.currentProject) {
      updateDevelopmentProgress(AppState.currentProject, progressPercent);
      
      // Save the completed steps state
      var completedStepIndices = steps.map(function(step, index) {
        return step.completed ? index : -1;
      }).filter(function(index) { return index !== -1; });
      
      window.electronAPI.updateProject(AppState.currentProject.id, {
        completedSteps: completedStepIndices
      });
    }
  }
}

function toggleStepExpand(stepIndex) {
  var contentEl = document.getElementById('step-content-' + stepIndex);
  var iconEl = document.getElementById('expand-icon-' + stepIndex);
  if (contentEl) {
    if (contentEl.classList.contains('hidden')) {
      contentEl.classList.remove('hidden');
      iconEl.classList.add('rotate-180');
    } else {
      contentEl.classList.add('hidden');
      iconEl.classList.remove('rotate-180');
    }
  }
}

async function runStepWithCodex(stepIndex) {
  var steps = window.currentInstructionSteps || [];
  if (stepIndex >= steps.length) {
    showToast('Step not found', 'error');
    return;
  }
  
  var step = steps[stepIndex];
  var stepNumber = stepIndex + 1;
  var projectName = AppState.currentProject?.name || 'project';
  
  // Check if GitHub repo exists
  var repoUrl = AppState.currentProject?.aiPlan?.githubRepoUrl;
  if (!repoUrl) {
    showToast('No GitHub repository linked. Please create one first.', 'warning');
    return;
  }
  
  // Build the step prompt
  var stepPrompt = 'Step ' + stepNumber + ': ' + step.title + '\n\n' + step.content;
  
  showModal({
    title: 'Run Step ' + stepNumber + ' with Codex',
    message: '' +
      '<div class="space-y-4">' +
        '<p class="text-surface-300">This will execute <strong>Step ' + stepNumber + '</strong> using the Codex CLI with your connected GitHub repository.</p>' +
        '<div class="bg-surface-800 rounded-lg p-3 max-h-40 overflow-y-auto">' +
          '<p class="text-sm font-medium text-primary-400 mb-2">' + escapeHtml(step.title) + '</p>' +
          '<p class="text-xs text-surface-400 font-mono">' + escapeHtml(step.content.substring(0, 200)) + (step.content.length > 200 ? '...' : '') + '</p>' +
        '</div>' +
        '<div class="flex items-center gap-3 p-3 bg-blue-500/10 border border-blue-500/20 rounded">' +
          '<svg class="w-5 h-5 text-blue-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>' +
          '<p class="text-sm text-blue-300">Changes will be made to your local repository. You can review and commit them after.</p>' +
        '</div>' +
      '</div>',
    buttons: [
      { text: 'Cancel', class: 'btn-outline', onClick: closeModal },
      { text: 'Run Step', class: 'btn-primary bg-pink-500 hover:bg-pink-600', onClick: async function() {
        closeModal();
        await executeStepWithCodex(stepIndex, stepPrompt);
      }}
    ]
  });
}

async function executeStepWithCodex(stepIndex, prompt) {
  var stepNumber = stepIndex + 1;
  var projectName = AppState.currentProject?.name || 'project';
  
  // Get Codex settings
  var settings = await window.electronAPI.getSettings();
  var model = settings?.codex_default_model || 'gpt-5.1-codex';
  
  // Get project folder path - we'll use ~/Projects/{projectName} as default
  var projectPath = settings?.projects_folder 
    ? settings.projects_folder + '/' + projectName.toLowerCase().replace(/[^a-z0-9]/gi, '-')
    : '~/Projects/' + projectName.toLowerCase().replace(/[^a-z0-9]/gi, '-');
  
  showLoading('Running Step ' + stepNumber + ' with Codex...');
  
  try {
    var result = await window.electronAPI.runCodexBuild(prompt, model, projectPath);
    hideLoading();
    
    if (result.success) {
      // Mark step as complete
      var steps = window.currentInstructionSteps || [];
      if (stepIndex < steps.length) {
        steps[stepIndex].completed = true;
      }
      
      // Re-render instructions
      var instructions = AppState.currentProject?.aiPlan?.agentInstructions || AppState.currentProject?.agentInstructions || '';
      document.getElementById('step-instructions-view').innerHTML = renderStepByStepInstructions(instructions);
      
      showToast('Step ' + stepNumber + ' completed successfully!', 'success');
      
      // Show result modal with verification reminder
      var step = steps[stepIndex];
      var verificationMatch = step?.content.match(/\*\*Verification:\*\*\s*([^\n]+(?:\n(?!\*\*)[^\n]+)*)/i);
      
      showModal({
        title: 'Step ' + stepNumber + ' Complete!',
        message: '' +
          '<div class="space-y-4">' +
            '<div class="flex items-center gap-3 p-3 bg-green-500/10 border border-green-500/20 rounded">' +
              '<svg class="w-6 h-6 text-green-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>' +
              '<p class="text-green-300">Codex has completed this step.</p>' +
            '</div>' +
            (verificationMatch ? '' +
              '<div class="p-3 bg-yellow-500/10 border border-yellow-500/20 rounded">' +
                '<p class="text-sm font-semibold text-yellow-400 mb-2">📋 Verification Checklist:</p>' +
                '<p class="text-sm text-yellow-200">' + escapeHtml(verificationMatch[1].trim()) + '</p>' +
              '</div>'
            : '') +
            '<p class="text-sm text-surface-400">Review the changes in your project folder and run any tests to verify this step works correctly.</p>' +
          '</div>',
        buttons: [
          { text: 'View Output', class: 'btn-outline', onClick: function() {
            closeModal();
            // Could show terminal output here
          }},
          { text: 'Continue', class: 'btn-primary', onClick: closeModal }
        ]
      });
    } else {
      showToast('Codex error: ' + (result.error || 'Unknown error'), 'error');
    }
  } catch (err) {
    hideLoading();
    showToast('Error running step: ' + err.message, 'error');
  }
}

function toggleInstructionView() {
  var fullView = document.getElementById('full-instructions-view');
  var stepView = document.getElementById('step-instructions-view');
  var toggleText = document.getElementById('instruction-view-text');
  
  if (fullView.classList.contains('hidden')) {
    fullView.classList.remove('hidden');
    stepView.classList.add('hidden');
    toggleText.textContent = 'Step-by-Step View';
  } else {
    fullView.classList.add('hidden');
    stepView.classList.remove('hidden');
    toggleText.textContent = 'Full View';
  }
}

// ==================== GitHub Integration ====================
function toggleGithubTokenVisibility() {
  var input = document.getElementById('github-token');
  input.type = input.type === 'password' ? 'text' : 'password';
}

async function validateGithubToken() {
  var token = document.getElementById('github-token').value;
  if (!token) {
    showToast('Please enter a GitHub token', 'warning');
    return;
  }
  
  showLoading('Validating GitHub token...');
  try {
    var result = await window.electronAPI.validateGithubToken(token);
    if (result.valid) {
      showToast('GitHub token is valid! User: ' + result.user, 'success');
    } else {
      showToast('Invalid GitHub token: ' + (result.error || 'Unknown error'), 'error');
    }
  } catch (error) {
    showToast('Validation failed: ' + error.message, 'error');
  } finally {
    hideLoading();
  }
}

function showCreateGithubRepoModal() {
  var project = AppState.currentProject;
  if (!project) {
    showToast('No project selected', 'error');
    return;
  }
  
  var settings = AppState.settings || {};
  if (!settings.githubToken) {
    showToast('Please configure GitHub token in Settings first', 'warning');
    navigateTo('settings');
    return;
  }
  
  var repoName = project.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
  
  var modalContent = '' +
    '<div class="space-y-4">' +
      '<div class="bg-surface-800/50 rounded-lg p-4">' +
        '<div class="flex items-center gap-2 mb-2">' +
          '<svg class="w-5 h-5 text-gray-400" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>' +
          '<span class="font-semibold">Create GitHub Repository</span>' +
        '</div>' +
        '<p class="text-sm text-surface-400">Create a new repository for your project and optionally connect it to Codex for live builds.</p>' +
      '</div>' +
      
      '<div>' +
        '<label class="label">Repository Name</label>' +
        '<input type="text" id="github-repo-name" class="input" value="' + escapeHtml(repoName) + '">' +
        '<p class="text-xs text-surface-400 mt-1">Lowercase letters, numbers, and hyphens only</p>' +
      '</div>' +
      
      '<div>' +
        '<label class="label">Description</label>' +
        '<textarea id="github-repo-desc" class="input" rows="2">' + escapeHtml(project.appDescription || project.description || '') + '</textarea>' +
      '</div>' +
      
      '<div>' +
        '<label class="label">Visibility</label>' +
        '<select id="github-repo-visibility" class="select">' +
          '<option value="private"' + (settings.githubVisibility !== 'public' ? ' selected' : '') + '>Private</option>' +
          '<option value="public"' + (settings.githubVisibility === 'public' ? ' selected' : '') + '>Public</option>' +
        '</select>' +
      '</div>' +
      
      '<div class="flex items-center gap-3 p-3 bg-surface-800/50 rounded-lg">' +
        '<input type="checkbox" id="github-init-readme" class="checkbox" checked>' +
        '<div>' +
          '<label for="github-init-readme" class="font-medium cursor-pointer">Initialize with README</label>' +
          '<p class="text-xs text-surface-400">Include project description and AI agent instructions</p>' +
        '</div>' +
      '</div>' +
      
      '<div class="flex items-center gap-3 p-3 bg-surface-800/50 rounded-lg">' +
        '<input type="checkbox" id="github-add-instructions" class="checkbox" checked>' +
        '<div>' +
          '<label for="github-add-instructions" class="font-medium cursor-pointer">Add INSTRUCTIONS.md</label>' +
          '<p class="text-xs text-surface-400">Include AI agent build instructions in a separate file</p>' +
        '</div>' +
      '</div>' +
      
      (settings.experimentalCodex ? 
        '<div class="flex items-center gap-3 p-3 bg-gradient-to-r from-pink-500/10 to-purple-500/10 border border-pink-500/20 rounded-lg">' +
          '<input type="checkbox" id="github-connect-codex" class="checkbox">' +
          '<div>' +
            '<label for="github-connect-codex" class="font-medium cursor-pointer">Connect to Codex</label>' +
            '<p class="text-xs text-surface-400">Allow AI agent to make live changes to this repository</p>' +
          '</div>' +
        '</div>' : '') +
      
      '<div class="flex gap-3 pt-2">' +
        '<button type="button" onclick="closeModal()" class="btn-secondary flex-1">Cancel</button>' +
        '<button type="button" onclick="createGithubRepo()" class="btn-primary flex-1">' +
          '<svg class="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>' +
          'Create Repository' +
        '</button>' +
      '</div>' +
    '</div>';
  
  showModal('Create GitHub Repository', modalContent, []);
}

async function createGithubRepo() {
  var project = AppState.currentProject;
  var repoName = document.getElementById('github-repo-name').value.trim();
  var description = document.getElementById('github-repo-desc').value.trim();
  var visibility = document.getElementById('github-repo-visibility').value;
  var initReadme = document.getElementById('github-init-readme').checked;
  var addInstructions = document.getElementById('github-add-instructions').checked;
  var connectCodex = document.getElementById('github-connect-codex')?.checked || false;
  
  if (!repoName) {
    showToast('Please enter a repository name', 'warning');
    return;
  }
  
  // Validate repo name
  if (!/^[a-z0-9][a-z0-9-]*[a-z0-9]$|^[a-z0-9]$/.test(repoName)) {
    showToast('Repository name must contain only lowercase letters, numbers, and hyphens', 'warning');
    return;
  }
  
  closeModal();
  showLoading('Creating GitHub repository...');
  
  try {
    var instructions = project.aiPlan?.agentInstructions || project.agentInstructions || '';
    
    var result = await window.electronAPI.createGithubRepo({
      name: repoName,
      description: description,
      private: visibility === 'private',
      initReadme: initReadme,
      addInstructions: addInstructions,
      instructions: instructions,
      appName: project.name,
      connectCodex: connectCodex
    });
    
    if (result.success) {
      // Update project with GitHub repo info
      await window.electronAPI.updateProject(project.id, {
        ...project,
        githubRepo: result.repoUrl,
        githubRepoName: result.repoName,
        githubConnectedCodex: connectCodex
      });
      
      // Refresh project
      AppState.currentProject = await window.electronAPI.getProject(project.id);
      
      showToast('Repository created successfully!', 'success');
      
      // Show success modal with repo link
      showModal('Repository Created! 🎉', '' +
        '<div class="space-y-4">' +
          '<div class="flex items-center gap-3 p-4 bg-green-500/10 border border-green-500/20 rounded-lg">' +
            '<svg class="w-8 h-8 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>' +
            '<div>' +
              '<p class="font-semibold text-green-400">Repository Created!</p>' +
              '<p class="text-sm text-surface-300">' + escapeHtml(result.repoName) + '</p>' +
            '</div>' +
          '</div>' +
          '<div>' +
            '<label class="label">Repository URL</label>' +
            '<div class="flex gap-2">' +
              '<input type="text" class="input flex-1" value="' + escapeHtml(result.repoUrl) + '" readonly>' +
              '<button onclick="copyToClipboard(\'' + escapeJsString(result.repoUrl) + '\')" class="btn-secondary">Copy</button>' +
            '</div>' +
          '</div>' +
          (result.cloneCommand ? 
            '<div>' +
              '<label class="label">Clone Command</label>' +
              '<div class="flex gap-2">' +
                '<input type="text" class="input flex-1 font-mono text-sm" value="' + escapeHtml(result.cloneCommand) + '" readonly>' +
                '<button onclick="copyToClipboard(\'' + escapeJsString(result.cloneCommand) + '\')" class="btn-secondary">Copy</button>' +
              '</div>' +
            '</div>' : '') +
          (connectCodex ? 
            '<div class="p-4 bg-gradient-to-r from-pink-500/10 to-purple-500/10 border border-pink-500/20 rounded-lg">' +
              '<p class="text-sm text-surface-300">' +
                '<span class="text-pink-400 font-semibold">Codex Connected!</span> ' +
                'You can now use "Build with Codex" to push changes directly to this repository.' +
              '</p>' +
            '</div>' : '') +
          '<div class="flex gap-3">' +
            '<button onclick="closeModal()" class="btn-secondary flex-1">Close</button>' +
            '<a href="' + escapeHtml(result.repoUrl) + '" target="_blank" class="btn-primary flex-1 text-center">' +
              'Open in GitHub' +
            '</a>' +
          '</div>' +
        '</div>',
        []
      );
    } else {
      showToast('Failed to create repository: ' + result.error, 'error');
    }
  } catch (error) {
    showToast('Error creating repository: ' + error.message, 'error');
  } finally {
    hideLoading();
  }
}

// ==================== Codex Integration ====================
async function buildWithCodex() {
  var project = AppState.currentProject;
  if (!project) {
    showToast('No project selected', 'error');
    return;
  }
  
  var instructions = project.aiPlan?.agentInstructions || project.agentInstructions;
  if (!instructions) {
    showToast('No agent instructions available. Generate an AI plan first.', 'warning');
    return;
  }
  
  var settings = AppState.settings || {};
  var hasGithubRepo = project.githubRepo && project.githubRepoName;
  var hasGithubToken = settings.githubToken;
  var defaultModel = settings.codexDefaultModel || 'codex';
  
  // Show modal to configure Codex build
  var modalContent = '' +
    '<div class="space-y-4">' +
      '<div class="bg-gradient-to-r from-pink-500/10 to-purple-500/10 border border-pink-500/20 rounded-lg p-4">' +
        '<div class="flex items-center gap-2 mb-2">' +
          '<svg class="w-5 h-5 text-pink-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" /></svg>' +
          '<span class="font-semibold text-pink-400">Experimental Feature</span>' +
        '</div>' +
        '<p class="text-sm text-surface-300">This will use OpenAI Codex CLI to generate your project code based on the AI agent instructions.</p>' +
      '</div>' +
      
      '<div>' +
        '<label class="label">Project Output Directory</label>' +
        '<div class="flex gap-2">' +
          '<input type="text" id="codex-output-dir" class="input flex-1" placeholder="Select output directory..." readonly>' +
          '<button type="button" onclick="selectCodexOutputDir()" class="btn-secondary">Browse</button>' +
        '</div>' +
        '<p class="text-xs text-surface-400 mt-1">Where should the generated project be created?</p>' +
      '</div>' +
      
      '<div>' +
        '<label class="label">Project Name</label>' +
        '<input type="text" id="codex-project-name" class="input" value="' + escapeHtml(project.name.toLowerCase().replace(/[^a-z0-9]+/g, '-')) + '">' +
      '</div>' +
      
      '<div>' +
        '<label class="label">AI Model</label>' +
        '<select id="codex-model" class="select">' +
          '<optgroup label="Codex Optimized (Local + Cloud)">' +
            '<option value="gpt-5.1-codex-max"' + (defaultModel === 'gpt-5.1-codex-max' || defaultModel === 'gpt-5.2' ? ' selected' : '') + '>GPT-5.1 Codex Max (Most Intelligent)</option>' +
            '<option value="gpt-5.1-codex"' + (defaultModel === 'gpt-5.1-codex' || defaultModel === 'gpt-5' || defaultModel === 'codex' || !defaultModel ? ' selected' : '') + '>GPT-5.1 Codex (Recommended)</option>' +
            '<option value="gpt-5.1-codex-mini"' + (defaultModel === 'gpt-5.1-codex-mini' || defaultModel === 'gpt-5-mini' ? ' selected' : '') + '>GPT-5.1 Codex Mini (Fast)</option>' +
            '<option value="gpt-5-codex"' + (defaultModel === 'gpt-5-codex' ? ' selected' : '') + '>GPT-5 Codex (Previous Gen)</option>' +
          '</optgroup>' +
          '<optgroup label="Frontier Models (Cloud Only)">' +
            '<option value="gpt-5.2"' + (defaultModel === 'gpt-5.2-cloud' ? ' selected' : '') + '>GPT-5.2 (Best Overall)</option>' +
            '<option value="gpt-5"' + (defaultModel === 'gpt-5-cloud' ? ' selected' : '') + '>GPT-5 (Reasoning + Coding)</option>' +
            '<option value="gpt-5-mini"' + (defaultModel === 'gpt-5-mini-cloud' ? ' selected' : '') + '>GPT-5 Mini (Affordable)</option>' +
            '<option value="gpt-5-nano"' + (defaultModel === 'gpt-5-nano' ? ' selected' : '') + '>GPT-5 Nano (Fastest)</option>' +
          '</optgroup>' +
          '<optgroup label="Reasoning Models (Cloud Only)">' +
            '<option value="o3"' + (defaultModel === 'o3' ? ' selected' : '') + '>o3 (Complex Reasoning)</option>' +
            '<option value="o4-mini"' + (defaultModel === 'o4-mini' ? ' selected' : '') + '>o4-mini (Fast Reasoning)</option>' +
          '</optgroup>' +
          '<optgroup label="GPT-4 Series (Legacy)">' +
            '<option value="gpt-4.1"' + (defaultModel === 'gpt-4.1' ? ' selected' : '') + '>GPT-4.1 (Non-Reasoning)</option>' +
            '<option value="gpt-4o"' + (defaultModel === 'gpt-4o' ? ' selected' : '') + '>GPT-4o</option>' +
            '<option value="gpt-4o-mini"' + (defaultModel === 'gpt-4o-mini' ? ' selected' : '') + '>GPT-4o Mini</option>' +
          '</optgroup>' +
        '</select>' +
        '<p class="text-xs text-surface-400 mt-1">Codex models work with Local CLI. Other models use Cloud API.</p>' +
      '</div>' +
      
      // Processing Mode Selection
      '<div class="border border-surface-700 rounded-lg overflow-hidden">' +
        '<div class="bg-surface-800/50 p-3 flex items-center gap-2">' +
          '<svg class="w-5 h-5 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" /></svg>' +
          '<span class="font-semibold">Processing Mode</span>' +
        '</div>' +
        '<div class="p-3 space-y-3">' +
          '<div class="flex items-center gap-3">' +
            '<input type="radio" name="codex-mode" id="codex-mode-local" value="local" class="radio" checked>' +
            '<label for="codex-mode-local" class="cursor-pointer flex-1">' +
              '<span class="font-medium">Local (Codex CLI)</span>' +
              '<p class="text-xs text-surface-400">Run Codex CLI locally on your machine</p>' +
            '</label>' +
          '</div>' +
          '<div class="flex items-center gap-3">' +
            '<input type="radio" name="codex-mode" id="codex-mode-cloud" value="cloud" class="radio" ' + (!hasGithubRepo ? 'disabled' : '') + '>' +
            '<label for="codex-mode-cloud" class="cursor-pointer flex-1 ' + (!hasGithubRepo ? 'opacity-50' : '') + '">' +
              '<span class="font-medium flex items-center gap-2">' +
                'Cloud (OpenAI Plus)' +
                '<span class="text-xs bg-gradient-to-r from-pink-500 to-purple-500 text-white px-2 py-0.5 rounded-full">Pro</span>' +
              '</span>' +
              '<p class="text-xs text-surface-400">' + (hasGithubRepo ? 'Process in OpenAI\'s cloud with your GitHub repo' : 'Requires a connected GitHub repository') + '</p>' +
            '</label>' +
          '</div>' +
          '<div id="cloud-options" class="hidden ml-6 mt-2 p-3 bg-surface-900 rounded-lg space-y-3">' +
            '<p class="text-xs text-surface-300">The cloud will clone your GitHub repo and apply changes directly.</p>' +
            '<div class="flex items-center gap-3">' +
              '<input type="checkbox" id="codex-cloud-auto-commit" class="checkbox" checked>' +
              '<label for="codex-cloud-auto-commit" class="cursor-pointer text-sm">' +
                'Auto-commit changes to GitHub' +
              '</label>' +
            '</div>' +
            '<div class="flex items-center gap-3">' +
              '<input type="checkbox" id="codex-cloud-create-pr" class="checkbox">' +
              '<label for="codex-cloud-create-pr" class="cursor-pointer text-sm">' +
                'Create pull request instead of direct commit' +
              '</label>' +
            '</div>' +
          '</div>' +
        '</div>' +
      '</div>' +
      
      // GitHub Integration Section
      (hasGithubToken ? 
        '<div class="border border-surface-700 rounded-lg overflow-hidden">' +
          '<div class="bg-surface-800/50 p-3 flex items-center gap-2">' +
            '<svg class="w-5 h-5 text-gray-400" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>' +
            '<span class="font-semibold">GitHub Integration</span>' +
          '</div>' +
          '<div class="p-3 space-y-3">' +
            (hasGithubRepo ?
              '<div class="flex items-center gap-2 p-2 bg-green-500/10 border border-green-500/20 rounded">' +
                '<svg class="w-4 h-4 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" /></svg>' +
                '<span class="text-sm text-green-400">Connected to: ' + escapeHtml(project.githubRepoName) + '</span>' +
              '</div>' +
              '<div class="flex items-center gap-3">' +
                '<input type="checkbox" id="codex-push-github" class="checkbox" ' + (settings.liveCodexSync ? 'checked' : '') + '>' +
                '<label for="codex-push-github" class="cursor-pointer">' +
                  '<span class="font-medium">Push changes to GitHub</span>' +
                  '<p class="text-xs text-surface-400">Automatically commit and push to repository after build</p>' +
                '</label>' +
              '</div>'
            :
              '<div class="flex items-center justify-between">' +
                '<div>' +
                  '<span class="text-sm text-surface-300">No repository connected</span>' +
                  '<p class="text-xs text-surface-400">Create a GitHub repo to enable live sync</p>' +
                '</div>' +
                '<button type="button" onclick="closeModal(); showCreateGithubRepoModal();" class="btn-secondary text-sm">Create Repo</button>' +
              '</div>'
            ) +
          '</div>' +
        '</div>' : '') +
      
      '<div class="bg-surface-800 rounded-lg p-4">' +
        '<div class="flex items-center justify-between mb-2">' +
          '<label class="label mb-0">Instructions <span class="text-surface-400 font-normal">(Editable)</span></label>' +
          '<button type="button" onclick="toggleCodexInstructionsView()" class="btn-ghost text-xs">Toggle Step View</button>' +
        '</div>' +
        '<div id="codex-instructions-full">' +
          '<textarea id="codex-instructions" class="input font-mono text-sm h-64 overflow-y-auto resize-y" style="min-height: 200px; max-height: 400px;">' +
            escapeHtml(instructions) +
          '</textarea>' +
        '</div>' +
        '<div id="codex-instructions-steps" class="hidden max-h-96 overflow-y-auto">' +
          renderCodexStepInstructions(instructions) +
        '</div>' +
        '<p class="text-xs text-surface-400 mt-1">Review and edit the instructions that will be sent to Codex</p>' +
      '</div>' +
      
      '<div class="bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-3">' +
        '<p class="text-sm text-yellow-400"><strong>Requirements:</strong></p>' +
        '<ul class="text-sm text-surface-300 list-disc list-inside mt-1">' +
          '<li>OpenAI Codex CLI must be installed (<code class="text-pink-400">npm install -g @openai/codex</code>)</li>' +
          '<li>Valid OpenAI API key configured</li>' +
          '<li>This may take several minutes and use API credits</li>' +
        '</ul>' +
      '</div>' +
      
      '<div class="flex gap-3 pt-2">' +
        '<button type="button" onclick="closeModal()" class="btn-secondary flex-1">Cancel</button>' +
        '<button type="button" onclick="startCodexBuild()" class="btn-primary bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 flex-1 py-3 text-lg font-bold">' +
          '<span class="flex items-center justify-center gap-2">' +
            '<svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>' +
            'Start Building' +
          '</span>' +
        '</button>' +
      '</div>' +
    '</div>';
  
  showModal(
    '🚀 Build with Codex',
    modalContent,
    []
  );
  
  // Add event listener for processing mode toggle
  setTimeout(function() {
    var cloudRadio = document.getElementById('codex-mode-cloud');
    var localRadio = document.getElementById('codex-mode-local');
    var cloudOptions = document.getElementById('cloud-options');
    var outputDirSection = document.querySelector('#codex-output-dir')?.closest('div')?.parentElement;
    
    if (cloudRadio && localRadio && cloudOptions) {
      cloudRadio.addEventListener('change', function() {
        if (this.checked) {
          cloudOptions.classList.remove('hidden');
          if (outputDirSection) outputDirSection.classList.add('hidden');
        }
      });
      localRadio.addEventListener('change', function() {
        if (this.checked) {
          cloudOptions.classList.add('hidden');
          if (outputDirSection) outputDirSection.classList.remove('hidden');
        }
      });
    }
  }, 100);
}

function renderCodexStepInstructions(instructions) {
  var steps = parseInstructionsToSteps(instructions);
  
  if (steps.length === 0) {
    return '<p class="text-surface-400 text-center py-4">No structured steps found</p>';
  }
  
  var html = '<div class="space-y-3">';
  steps.forEach(function(step, index) {
    html += '' +
      '<div class="bg-surface-900 rounded-lg p-3 border border-surface-700">' +
        '<div class="flex items-center justify-between mb-2">' +
          '<div class="flex items-center gap-2">' +
            '<span class="w-6 h-6 rounded-full bg-primary-500/20 text-primary-400 font-bold text-xs flex items-center justify-center">' + (index + 1) + '</span>' +
            '<span class="font-medium text-sm">' + escapeHtml(step.title) + '</span>' +
          '</div>' +
          '<button onclick="copyCodexStep(' + index + ')" class="btn-ghost text-xs px-2 py-1">' +
            '<svg class="w-3 h-3 mr-1 inline" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>' +
            'Copy' +
          '</button>' +
        '</div>' +
        '<div class="text-xs text-surface-400 font-mono whitespace-pre-wrap max-h-24 overflow-y-auto">' +
          escapeHtml(step.content.substring(0, 300)) + (step.content.length > 300 ? '...' : '') +
        '</div>' +
      '</div>';
  });
  html += '</div>';
  
  // Store for copying
  window.codexSteps = steps;
  return html;
}

function toggleCodexInstructionsView() {
  var fullView = document.getElementById('codex-instructions-full');
  var stepView = document.getElementById('codex-instructions-steps');
  
  if (fullView.classList.contains('hidden')) {
    fullView.classList.remove('hidden');
    stepView.classList.add('hidden');
  } else {
    fullView.classList.add('hidden');
    stepView.classList.remove('hidden');
  }
}

function copyCodexStep(index) {
  var steps = window.codexSteps || [];
  if (index < steps.length) {
    var step = steps[index];
    copyToClipboard('## ' + step.title + '\n\n' + step.content);
  }
}

async function selectCodexOutputDir() {
  try {
    var dir = await window.electronAPI.selectDirectory();
    if (dir) {
      document.getElementById('codex-output-dir').value = dir;
    }
  } catch (error) {
    showToast('Failed to select directory: ' + error.message, 'error');
  }
}

var codexProgressListener = null;

async function startCodexBuild() {
  var outputDir = document.getElementById('codex-output-dir').value;
  var projectName = document.getElementById('codex-project-name').value;
  var model = document.getElementById('codex-model').value;
  var instructions = document.getElementById('codex-instructions').value;
  var pushToGithub = document.getElementById('codex-push-github')?.checked || false;
  var processingMode = document.querySelector('input[name="codex-mode"]:checked')?.value || 'local';
  var cloudAutoCommit = document.getElementById('codex-cloud-auto-commit')?.checked || false;
  var cloudCreatePR = document.getElementById('codex-cloud-create-pr')?.checked || false;
  
  var project = AppState.currentProject;
  
  // Cloud mode validation
  if (processingMode === 'cloud') {
    if (!project.githubRepo || !project.githubRepoName) {
      showToast('Cloud mode requires a connected GitHub repository', 'warning');
      return;
    }
    if (!instructions || instructions.trim().length === 0) {
      showToast('Instructions cannot be empty', 'warning');
      return;
    }
    
    closeModal();
    await startCloudCodexBuild({
      projectName: projectName,
      model: model,
      instructions: instructions,
      githubRepo: project.githubRepo,
      githubRepoName: project.githubRepoName,
      autoCommit: cloudAutoCommit,
      createPR: cloudCreatePR,
      appName: project.name,
      appDescription: project.appDescription
    });
    return;
  }
  
  // Local mode validation
  if (!outputDir) {
    showToast('Please select an output directory', 'warning');
    return;
  }
  
  if (!projectName) {
    showToast('Please enter a project name', 'warning');
    return;
  }
  
  if (!instructions || instructions.trim().length === 0) {
    showToast('Instructions cannot be empty', 'warning');
    return;
  }
  
  closeModal();
  
  // Show streaming output modal
  showCodexStreamingModal(projectName, model);
  
  // Set up progress listener for real-time streaming
  if (codexProgressListener) {
    codexProgressListener(); // Remove old listener
  }
  codexProgressListener = window.electronAPI.on('codex:progress', function(data) {
    appendCodexOutput(data);
  });
  
  try {
    var result = await window.electronAPI.runCodexBuild({
      outputDir: outputDir,
      projectName: projectName,
      instructions: instructions,
      model: model,
      appName: project.name,
      appDescription: project.appDescription
    });
    
    if (result.success) {
      if (result.instructionsOnly) {
        appendCodexOutput('\n\n✅ ' + result.output);
      } else {
        appendCodexOutput('\n\n✅ Build completed successfully!');
      }
      
      // Push to GitHub if requested
      if (pushToGithub && project.githubRepo) {
        appendCodexOutput('\n\n📤 Pushing changes to GitHub...');
        try {
          var pushResult = await window.electronAPI.pushToGithub({
            projectDir: result.projectDir,
            repoUrl: project.githubRepo,
            message: 'Build update from Codex - ' + new Date().toISOString()
          });
          
          if (pushResult.success) {
            appendCodexOutput('\n✅ Successfully pushed to GitHub!');
          } else {
            appendCodexOutput('\n⚠️ Failed to push: ' + pushResult.error);
          }
        } catch (pushError) {
          appendCodexOutput('\n⚠️ Push error: ' + pushError.message);
        }
      }
      
      showCodexComplete(true, result.projectDir, pushToGithub && project.githubRepo);
    } else {
      appendCodexOutput('\n\n❌ Error: ' + result.error);
      showCodexComplete(false, null, false);
    }
  } catch (error) {
    console.error('Codex build error:', error);
    appendCodexOutput('\n\n❌ Error: ' + error.message);
    showCodexComplete(false, null, false);
  } finally {
    if (codexProgressListener) {
      codexProgressListener();
      codexProgressListener = null;
    }
  }
}

// Cloud Codex Build Function
async function startCloudCodexBuild(config) {
  // Show cloud streaming modal
  showCloudCodexStreamingModal(config.projectName, config.model, config.githubRepoName);
  
  // Set up progress listener for real-time streaming
  if (codexProgressListener) {
    codexProgressListener(); // Remove old listener
  }
  codexProgressListener = window.electronAPI.on('codex:progress', function(data) {
    appendCodexOutput(data);
  });
  
  try {
    var result = await window.electronAPI.runCloudCodexBuild({
      projectName: config.projectName,
      model: config.model,
      instructions: config.instructions,
      githubRepo: config.githubRepo,
      githubRepoName: config.githubRepoName,
      autoCommit: config.autoCommit,
      createPR: config.createPR,
      appName: config.appName,
      appDescription: config.appDescription
    });
    
    if (result.success) {
      appendCodexOutput('\n\n✅ Cloud build completed successfully!');
      if (result.prUrl) {
        appendCodexOutput('\n📝 Pull Request: ' + result.prUrl);
      }
      if (result.commitUrl) {
        appendCodexOutput('\n📦 Commit: ' + result.commitUrl);
      }
      showCodexComplete(true, null, true, result.prUrl || result.commitUrl);
    } else {
      appendCodexOutput('\n\n❌ Error: ' + result.error);
      showCodexComplete(false, null, false);
    }
  } catch (error) {
    console.error('Cloud Codex build error:', error);
    appendCodexOutput('\n\n❌ Error: ' + error.message);
    showCodexComplete(false, null, false);
  } finally {
    if (codexProgressListener) {
      codexProgressListener();
      codexProgressListener = null;
    }
  }
}

function showCloudCodexStreamingModal(projectName, model, repoName) {
  var modalContent = '' +
    '<div class="space-y-4">' +
      '<div class="flex items-center gap-3 mb-4">' +
        '<div class="animate-spin rounded-full h-6 w-6 border-2 border-blue-500 border-t-transparent" id="codex-spinner"></div>' +
        '<span class="text-lg font-semibold">Cloud Building <span class="text-blue-400">' + escapeHtml(projectName) + '</span>...</span>' +
      '</div>' +
      
      '<div class="flex items-center gap-2 p-2 bg-blue-500/10 border border-blue-500/20 rounded mb-2">' +
        '<svg class="w-4 h-4 text-blue-400" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>' +
        '<span class="text-sm text-blue-400">Processing with GitHub: ' + escapeHtml(repoName) + '</span>' +
      '</div>' +
      
      '<div class="bg-surface-900 rounded-lg border border-surface-700">' +
        '<div class="flex items-center gap-2 px-4 py-2 border-b border-surface-700 bg-surface-800 rounded-t-lg">' +
          '<div class="flex gap-1.5">' +
            '<div class="w-3 h-3 rounded-full bg-red-500"></div>' +
            '<div class="w-3 h-3 rounded-full bg-yellow-500"></div>' +
            '<div class="w-3 h-3 rounded-full bg-green-500"></div>' +
          '</div>' +
          '<span class="text-sm text-surface-400 ml-2">OpenAI Cloud Output</span>' +
        '</div>' +
        '<div id="codex-output" class="p-4 font-mono text-sm text-green-400 h-96 overflow-y-auto whitespace-pre-wrap" style="background: #0d1117;">' +
          '<span class="text-surface-500">☁️ OpenAI Cloud - Model: ' + escapeHtml(model || 'codex') + '</span>\n' +
          '<span class="text-blue-400">Connecting to OpenAI Responses API...</span>\n' +
          '<span class="text-blue-400">Repository: ' + escapeHtml(repoName) + '</span>\n\n' +
        '</div>' +
      '</div>' +
      
      '<div id="codex-status" class="text-center text-surface-400">' +
        '<span class="animate-pulse">☁️ Processing in OpenAI Cloud. This may take several minutes...</span>' +
      '</div>' +
      
      '<div id="codex-actions" class="hidden">' +
        '<button type="button" onclick="closeModal()" class="btn-primary w-full bg-gradient-to-r from-blue-500 to-purple-500">Close</button>' +
      '</div>' +
    '</div>';
  
  showModal('☁️ Cloud Build with OpenAI', modalContent, []);
}

function showCodexStreamingModal(projectName, model) {
  var modalContent = '' +
    '<div class="space-y-4">' +
      '<div class="flex items-center gap-3 mb-4">' +
        '<div class="animate-spin rounded-full h-6 w-6 border-2 border-pink-500 border-t-transparent" id="codex-spinner"></div>' +
        '<span class="text-lg font-semibold">Building <span class="text-pink-400">' + escapeHtml(projectName) + '</span>...</span>' +
      '</div>' +
      
      '<div class="bg-surface-900 rounded-lg border border-surface-700">' +
        '<div class="flex items-center gap-2 px-4 py-2 border-b border-surface-700 bg-surface-800 rounded-t-lg">' +
          '<div class="flex gap-1.5">' +
            '<div class="w-3 h-3 rounded-full bg-red-500"></div>' +
            '<div class="w-3 h-3 rounded-full bg-yellow-500"></div>' +
            '<div class="w-3 h-3 rounded-full bg-green-500"></div>' +
          '</div>' +
          '<span class="text-sm text-surface-400 ml-2">Codex Output</span>' +
        '</div>' +
        '<div id="codex-output" class="p-4 font-mono text-sm text-green-400 h-96 overflow-y-auto whitespace-pre-wrap" style="background: #0d1117;">' +
          '<span class="text-surface-500">$ codex --model ' + escapeHtml(model || 'codex') + ' --approval-mode full-auto</span>\n' +
          '<span class="text-pink-400">Initializing Codex CLI...</span>\n\n' +
        '</div>' +
      '</div>' +
      
      '<div id="codex-status" class="text-center text-surface-400">' +
        '<span class="animate-pulse">⏳ This may take several minutes. Codex is generating your project...</span>' +
      '</div>' +
      
      '<div id="codex-actions" class="hidden">' +
        '<button type="button" onclick="closeModal()" class="btn-primary w-full bg-gradient-to-r from-pink-500 to-purple-500">Close</button>' +
      '</div>' +
    '</div>';
  
  showModal('🔨 Codex Building...', modalContent, []);
}

function appendCodexOutput(text) {
  var outputEl = document.getElementById('codex-output');
  if (outputEl) {
    outputEl.textContent += text;
    outputEl.scrollTop = outputEl.scrollHeight;
  }
}

function showCodexComplete(success, projectDir, pushedToGithub, cloudUrl) {
  var spinnerEl = document.getElementById('codex-spinner');
  var statusEl = document.getElementById('codex-status');
  var actionsEl = document.getElementById('codex-actions');
  
  if (spinnerEl) {
    spinnerEl.classList.remove('animate-spin');
    spinnerEl.innerHTML = success ? '✅' : '❌';
    spinnerEl.classList.add('text-2xl');
  }
  
  if (statusEl) {
    if (success) {
      var statusHtml = '<span class="text-green-400">✅ Build complete!</span>';
      if (projectDir) {
        statusHtml += '<br><span class="text-sm text-surface-400">Project created at: ' + escapeHtml(projectDir) + '</span>';
      }
      if (pushedToGithub) {
        statusHtml += '<br><span class="text-sm text-primary-400">📤 Changes pushed to GitHub</span>';
      }
      if (cloudUrl) {
        statusHtml += '<br><a href="' + escapeHtml(cloudUrl) + '" target="_blank" class="text-sm text-blue-400 hover:underline">🔗 View changes on GitHub</a>';
      }
      statusEl.innerHTML = statusHtml;
    } else {
      statusEl.innerHTML = '<span class="text-red-400">❌ Build failed. Check the output above for details.</span>';
    }
  }
  
  if (actionsEl) {
    actionsEl.classList.remove('hidden');
    
    // Add GitHub link if repo exists or cloud URL provided
    var githubUrl = cloudUrl || AppState.currentProject?.githubRepo;
    if (success && githubUrl) {
      actionsEl.innerHTML = '' +
        '<div class="flex gap-3">' +
          '<button type="button" onclick="closeModal()" class="btn-secondary flex-1">Close</button>' +
          '<a href="' + escapeHtml(githubUrl) + '" target="_blank" class="btn-primary flex-1 text-center bg-gradient-to-r from-pink-500 to-purple-500">' +
            '<svg class="w-4 h-4 mr-2 inline" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>' +
            'View on GitHub' +
          '</a>' +
        '</div>';
    } else {
      actionsEl.innerHTML = '<button type="button" onclick="closeModal()" class="btn-primary w-full bg-gradient-to-r from-pink-500 to-purple-500">Close</button>';
    }
  }
}
