# App Creator A to Z

A cutting-edge, state-of-the-art desktop application for designing and creating apps, powered by AI.

## Features

### 🎯 Project Management
- Create and manage multiple app projects
- Track development progress with checklists
- Duplicate and organize projects

### 🤖 AI-Powered Planning
- Generate comprehensive development plans using OpenAI GPT-4
- Get detailed agent instructions for AI coding assistants
- Receive tech stack recommendations
- Auto-generate development timelines

### ✅ Development Checklist
- Step-by-step development guidance
- Track progress on each task
- Priority-based task organization
- Subtasks for complex items

### 🔄 Adjustments & Iterations
- Request AI-powered adjustments to your plan
- Track all modifications made
- Impact analysis for changes

### 📦 Multi-Platform Distribution
Support for packaging and submitting to:
- 🍎 Apple App Store
- 🤖 Google Play Store
- 📦 Amazon Appstore
- 🪟 Microsoft Store
- 🐧 Linux (Snap/Flatpak)
- 🎮 Xbox Store
- 🎯 Steam

### 📱 Store Submission Assistance
- Store-specific asset requirements (icons, screenshots, videos)
- AI-generated store descriptions
- SEO-optimized keywords
- Marketing taglines

### ⚙️ Settings & Customization
- Multiple themes (Dark, Light, Midnight, Sunset)
- Branding options
- Feature toggles for AI capabilities
- OpenAI API key management

## Tech Stack

- **Frontend**: Electron + HTML/CSS/JavaScript
- **Styling**: Tailwind CSS
- **Backend**: Node.js
- **Database**: SQLite (better-sqlite3)
- **AI**: OpenAI API (GPT-4)

## Getting Started

### Prerequisites
- Node.js 18 or higher
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/cdapayne/AppStart.git
cd AppStart

# Install dependencies
npm install

# Build CSS
npm run build:css

# Start the application
npm start
```

### Development

```bash
# Run in development mode
npm run dev

# Watch CSS changes
npm run watch:css
```

### Building for Distribution

```bash
# Build for all platforms
npm run build:all

# Build for specific platform
npm run build:win    # Windows
npm run build:mac    # macOS
npm run build:linux  # Linux
```

## Configuration

### OpenAI API Key

1. Get your API key from [OpenAI Platform](https://platform.openai.com/api-keys)
2. Open the app and go to Settings
3. Enter your API key in the API Configuration section
4. Click "Validate" to verify the key works

## Project Structure

```
src/
├── main/                 # Main process (Electron)
│   ├── main.js          # Application entry point
│   └── services/        # Backend services
│       ├── openai-service.js
│       └── store-requirements.js
├── preload/             # Preload scripts
│   └── preload.js       # IPC bridge
├── renderer/            # Renderer process (UI)
│   ├── index.html       # Main HTML
│   ├── js/
│   │   └── app.js       # Application JavaScript
│   └── styles/
│       ├── input.css    # Tailwind input
│       └── output.css   # Compiled CSS
├── database/            # Database module
│   └── database.js      # SQLite operations
└── assets/              # Static assets
```

## License

Apache License 2.0 - See [LICENSE](LICENSE) for details.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.
