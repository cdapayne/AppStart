/**
 * Store Requirements - Contains all the media requirements for different app stores
 * This includes icon sizes, screenshot dimensions, video specs, and other assets
 */

const StoreRequirements = {
  apple: {
    name: 'Apple App Store',
    icon: {
      name: 'App Icon',
      sizes: [
        { width: 1024, height: 1024, name: 'App Store Icon', required: true },
        { width: 180, height: 180, name: 'iPhone App Icon @3x', required: true },
        { width: 120, height: 120, name: 'iPhone App Icon @2x', required: true },
        { width: 167, height: 167, name: 'iPad Pro App Icon @2x', required: true },
        { width: 152, height: 152, name: 'iPad App Icon @2x', required: true },
        { width: 76, height: 76, name: 'iPad App Icon @1x', required: false },
      ],
      format: ['PNG'],
      notes: 'No alpha channel, no rounded corners (system applies them)'
    },
    screenshots: {
      iphone: [
        { 
          width: 1290, height: 2796, 
          name: 'iPhone 15 Pro Max, 15 Plus, 14 Pro Max (6.7")', 
          required: true,
          devices: ['iPhone 15 Pro Max', 'iPhone 15 Plus', 'iPhone 14 Pro Max']
        },
        { 
          width: 1179, height: 2556, 
          name: 'iPhone 15 Pro, 15, 14 Pro (6.1")', 
          required: true,
          devices: ['iPhone 15 Pro', 'iPhone 15', 'iPhone 14 Pro']
        },
        { 
          width: 1284, height: 2778, 
          name: 'iPhone 14 Plus, 13 Pro Max, 12 Pro Max (6.7")', 
          required: false,
          devices: ['iPhone 14 Plus', 'iPhone 13 Pro Max', 'iPhone 12 Pro Max']
        },
        { 
          width: 1170, height: 2532, 
          name: 'iPhone 14, 13, 13 Pro, 12, 12 Pro (6.1")', 
          required: false,
          devices: ['iPhone 14', 'iPhone 13', 'iPhone 13 Pro', 'iPhone 12', 'iPhone 12 Pro']
        },
        { 
          width: 1242, height: 2688, 
          name: 'iPhone 11 Pro Max, XS Max (6.5")', 
          required: false,
          devices: ['iPhone 11 Pro Max', 'iPhone XS Max']
        },
        { 
          width: 1125, height: 2436, 
          name: 'iPhone X, XS, 11 Pro (5.8")', 
          required: false,
          devices: ['iPhone X', 'iPhone XS', 'iPhone 11 Pro']
        },
        { 
          width: 1242, height: 2208, 
          name: 'iPhone 8 Plus, 7 Plus, 6s Plus (5.5")', 
          required: false,
          devices: ['iPhone 8 Plus', 'iPhone 7 Plus', 'iPhone 6s Plus']
        },
      ],
      ipad: [
        { 
          width: 2048, height: 2732, 
          name: 'iPad Pro 12.9" (6th gen)', 
          required: true,
          devices: ['iPad Pro 12.9"']
        },
        { 
          width: 2388, height: 1668, 
          name: 'iPad Pro 11" (4th gen)', 
          required: true,
          devices: ['iPad Pro 11"']
        },
        { 
          width: 2360, height: 1640, 
          name: 'iPad Air (5th gen)', 
          required: false,
          devices: ['iPad Air']
        },
        { 
          width: 2160, height: 1620, 
          name: 'iPad (10th gen)', 
          required: false,
          devices: ['iPad']
        },
      ],
      count: { min: 1, max: 10 },
      format: ['PNG', 'JPEG'],
      notes: 'Screenshots must be in the exact dimensions specified'
    },
    video: {
      name: 'App Preview',
      specs: [
        { width: 1920, height: 1080, name: 'iPhone/iPad Landscape' },
        { width: 1080, height: 1920, name: 'iPhone Portrait' },
        { width: 1600, height: 1200, name: 'iPad Portrait' },
      ],
      duration: { min: 15, max: 30 },
      format: ['MOV', 'M4V', 'MP4'],
      fps: [24, 25, 30],
      notes: 'Audio must be in AAC, videos must not contain any iOS UI elements'
    },
    metadata: {
      appName: { max: 30 },
      subtitle: { max: 30 },
      keywords: { max: 100 },
      description: { max: 4000 },
      whatsNew: { max: 4000 },
      promoText: { max: 170 },
    }
  },

  google: {
    name: 'Google Play Store',
    icon: {
      name: 'App Icon',
      sizes: [
        { width: 512, height: 512, name: 'High-res Icon', required: true },
      ],
      format: ['PNG'],
      notes: '32-bit PNG with alpha channel'
    },
    featureGraphic: {
      name: 'Feature Graphic',
      size: { width: 1024, height: 500 },
      format: ['PNG', 'JPEG'],
      required: true,
      notes: 'No text in image as it may be cropped on different devices'
    },
    screenshots: {
      phone: [
        { 
          width: 1080, height: 1920, 
          name: 'Phone Screenshot (16:9)', 
          required: true,
          minDimension: 320,
          maxDimension: 3840,
        },
      ],
      tablet7: [
        { 
          width: 1200, height: 1920, 
          name: '7" Tablet Screenshot', 
          required: false,
        },
      ],
      tablet10: [
        { 
          width: 1600, height: 2560, 
          name: '10" Tablet Screenshot', 
          required: false,
        },
      ],
      chromebook: [
        { 
          width: 1920, height: 1080, 
          name: 'Chromebook Screenshot', 
          required: false,
        },
      ],
      count: { min: 2, max: 8 },
      format: ['PNG', 'JPEG'],
      notes: 'Minimum dimension: 320px, Maximum dimension: 3840px, Max file size: 8MB'
    },
    video: {
      name: 'Promo Video',
      type: 'YouTube URL',
      notes: 'Must be a public or unlisted YouTube video',
      required: false
    },
    tvBanner: {
      name: 'TV Banner',
      size: { width: 1280, height: 720 },
      format: ['PNG', 'JPEG'],
      required: false,
      notes: 'Required for Android TV apps'
    },
    metadata: {
      appName: { max: 50 },
      shortDescription: { max: 80 },
      description: { max: 4000 },
    }
  },

  amazon: {
    name: 'Amazon Appstore',
    icon: {
      name: 'App Icon',
      sizes: [
        { width: 512, height: 512, name: 'Large Icon', required: true },
        { width: 114, height: 114, name: 'Small Icon', required: true },
      ],
      format: ['PNG'],
      notes: 'PNG format, no rounded corners'
    },
    screenshots: {
      sizes: [
        { 
          width: 1920, height: 1080, 
          name: 'Screenshot (landscape)', 
          required: true 
        },
        { 
          width: 1080, height: 1920, 
          name: 'Screenshot (portrait)', 
          required: true 
        },
        { 
          width: 800, height: 480, 
          name: 'Screenshot (small)', 
          required: false 
        },
      ],
      count: { min: 3, max: 10 },
      format: ['PNG', 'JPEG'],
      notes: 'Minimum 3 screenshots required. Can be portrait or landscape.'
    },
    video: {
      name: 'Promotional Video',
      specs: [
        { width: 1920, height: 1080, name: 'Full HD' },
        { width: 1280, height: 720, name: 'HD' },
      ],
      duration: { min: 30, max: 120 },
      format: ['MP4', 'MOV'],
      required: false,
      notes: 'Video must show actual app usage'
    },
    promoGraphic: {
      name: 'Promotional Graphic',
      size: { width: 1024, height: 500 },
      format: ['PNG', 'JPEG'],
      required: false
    },
    metadata: {
      appName: { max: 250 },
      shortDescription: { max: 1200 },
      description: { max: 4000 },
      keywords: { max: 30, maxTotal: 249 },
    }
  },

  microsoft: {
    name: 'Microsoft Store',
    icon: {
      name: 'App Icon',
      sizes: [
        { width: 300, height: 300, name: 'Store Logo', required: true },
        { width: 150, height: 150, name: 'Medium Tile', required: true },
        { width: 71, height: 71, name: 'Small Tile', required: false },
        { width: 310, height: 150, name: 'Wide Tile', required: false },
        { width: 310, height: 310, name: 'Large Tile', required: false },
      ],
      format: ['PNG'],
      notes: 'Transparent background recommended'
    },
    screenshots: {
      desktop: [
        { 
          width: 1366, height: 768, 
          name: 'Desktop Screenshot (min)', 
          required: true 
        },
        { 
          width: 1920, height: 1080, 
          name: 'Desktop Screenshot (Full HD)', 
          required: false 
        },
        { 
          width: 3840, height: 2160, 
          name: 'Desktop Screenshot (4K)', 
          required: false 
        },
      ],
      mobile: [
        { 
          width: 768, height: 1280, 
          name: 'Mobile Screenshot', 
          required: false 
        },
      ],
      xbox: [
        { 
          width: 1920, height: 1080, 
          name: 'Xbox Screenshot (1080p)', 
          required: false 
        },
        { 
          width: 3840, height: 2160, 
          name: 'Xbox Screenshot (4K)', 
          required: false 
        },
      ],
      count: { min: 1, max: 10 },
      format: ['PNG', 'JPEG', 'GIF'],
      notes: 'At least one screenshot for each device family your app supports'
    },
    heroImage: {
      name: 'Hero Image',
      size: { width: 1920, height: 1080 },
      format: ['PNG'],
      required: false,
      notes: 'Used for featured placement in the store'
    },
    video: {
      name: 'Trailer',
      specs: [
        { width: 1920, height: 1080, name: 'Full HD' },
        { width: 3840, height: 2160, name: '4K' },
      ],
      duration: { min: 30, max: 120 },
      format: ['MP4', 'MOV', 'WMV'],
      required: false
    },
    metadata: {
      appName: { max: 256 },
      shortDescription: { max: 1000 },
      description: { max: 10000 },
      keywords: { max: 7, maxCharEach: 45 },
    }
  },

  linux: {
    name: 'Linux (Snap/Flatpak)',
    icon: {
      name: 'App Icon',
      sizes: [
        { width: 512, height: 512, name: 'Large Icon', required: true },
        { width: 256, height: 256, name: 'Medium Icon', required: true },
        { width: 128, height: 128, name: 'Small Icon', required: true },
        { width: 64, height: 64, name: 'XSmall Icon', required: false },
      ],
      format: ['PNG', 'SVG'],
      notes: 'SVG preferred for scalability'
    },
    screenshots: {
      sizes: [
        { 
          width: 1920, height: 1080, 
          name: 'Full HD Screenshot', 
          required: true 
        },
        { 
          width: 1280, height: 720, 
          name: 'HD Screenshot', 
          required: false 
        },
      ],
      count: { min: 1, max: 10 },
      format: ['PNG'],
      notes: 'Show the app in action with realistic content'
    },
    metadata: {
      appName: { max: 100 },
      summary: { max: 78 },
      description: { max: 5000 },
      categories: ['Development', 'Education', 'Games', 'Graphics', 'Network', 'Office', 'Science', 'System', 'Utility']
    }
  },

  xbox: {
    name: 'Xbox Store',
    icon: {
      name: 'Store Logo',
      sizes: [
        { width: 300, height: 300, name: 'Square Logo', required: true },
        { width: 584, height: 800, name: 'Poster Art', required: true },
        { width: 1920, height: 1080, name: 'Hero Art', required: true },
      ],
      format: ['PNG'],
      notes: 'No text on edges, will be cropped'
    },
    boxArt: {
      name: 'Box Art',
      size: { width: 584, height: 800 },
      format: ['PNG'],
      required: true,
      notes: 'Main visual representation of the game'
    },
    screenshots: {
      sizes: [
        { 
          width: 1920, height: 1080, 
          name: 'HD Screenshot', 
          required: true 
        },
        { 
          width: 3840, height: 2160, 
          name: '4K Screenshot', 
          required: false 
        },
      ],
      count: { min: 4, max: 10 },
      format: ['PNG', 'JPEG'],
      notes: 'Must be actual gameplay screenshots'
    },
    video: {
      name: 'Trailer',
      specs: [
        { width: 1920, height: 1080, name: 'Full HD' },
        { width: 3840, height: 2160, name: '4K UHD' },
      ],
      duration: { min: 30, max: 120 },
      format: ['MP4'],
      required: true,
      notes: 'Game trailer required'
    },
    metadata: {
      appName: { max: 100 },
      shortDescription: { max: 500 },
      description: { max: 10000 },
    }
  },

  steam: {
    name: 'Steam',
    icon: {
      name: 'Client Icon',
      sizes: [
        { width: 32, height: 32, name: 'Client Icon Small', required: true },
        { width: 64, height: 64, name: 'Client Icon Large', required: true },
      ],
      format: ['ICO', 'PNG'],
      notes: 'Used in the Steam client library'
    },
    capsule: {
      name: 'Capsule Images',
      sizes: [
        { width: 231, height: 87, name: 'Small Capsule', required: true },
        { width: 467, height: 181, name: 'Main Capsule', required: true },
        { width: 616, height: 353, name: 'Header Capsule', required: true },
        { width: 374, height: 448, name: 'Vertical Capsule', required: true },
      ],
      format: ['PNG', 'JPEG'],
      notes: 'Must contain game branding and key art'
    },
    libraryAssets: {
      name: 'Library Assets',
      sizes: [
        { width: 600, height: 900, name: 'Library Capsule', required: true },
        { width: 1920, height: 620, name: 'Library Hero', required: true },
        { width: 600, height: 600, name: 'Library Logo', required: true },
      ],
      format: ['PNG'],
      notes: 'Used in Steam library view'
    },
    screenshots: {
      sizes: [
        { 
          width: 1920, height: 1080, 
          name: 'Full HD Screenshot', 
          required: true 
        },
        { 
          width: 3840, height: 2160, 
          name: '4K Screenshot', 
          required: false 
        },
      ],
      count: { min: 5, max: 20 },
      format: ['PNG', 'JPEG'],
      notes: 'At least 5 screenshots showcasing gameplay and features'
    },
    video: {
      name: 'Trailer',
      specs: [
        { width: 1920, height: 1080, name: 'Full HD (recommended)' },
        { width: 1280, height: 720, name: 'HD' },
      ],
      duration: { min: 30, max: 180 },
      format: ['MOV', 'MP4', 'WMV', 'WEBM'],
      required: false,
      notes: 'Up to 2 trailers and 1 gameplay video'
    },
    pageBackground: {
      name: 'Page Background',
      size: { width: 1438, height: 810 },
      format: ['PNG', 'JPEG'],
      required: false,
      notes: 'Background for the store page'
    },
    metadata: {
      appName: { max: 100 },
      shortDescription: { max: 500 },
      description: { max: 20000 },
      tags: { max: 20 },
    }
  },

  'meta-quest': {
    name: 'Meta Quest Store',
    icon: {
      name: 'App Icon',
      sizes: [
        { width: 1024, height: 1024, name: 'Store Icon', required: true },
        { width: 512, height: 512, name: 'Square Icon', required: true },
        { width: 256, height: 256, name: 'Small Icon', required: false },
      ],
      format: ['PNG'],
      notes: 'Square format, no rounded corners'
    },
    coverArt: {
      name: 'Cover Art (Landscape)',
      size: { width: 2560, height: 1440 },
      format: ['PNG', 'JPEG'],
      required: true,
      notes: 'Main promotional image shown in store'
    },
    heroArt: {
      name: 'Hero Art',
      size: { width: 3000, height: 900 },
      format: ['PNG', 'JPEG'],
      required: true,
      notes: 'Wide banner image for featured placements'
    },
    screenshots: {
      sizes: [
        { 
          width: 2560, height: 1440, 
          name: 'Quest Screenshot (16:9)', 
          required: true 
        },
        { 
          width: 1920, height: 1080, 
          name: 'Quest Screenshot (HD)', 
          required: false 
        },
      ],
      count: { min: 3, max: 10 },
      format: ['PNG', 'JPEG'],
      notes: 'Must be actual in-VR screenshots showing gameplay. At least 3 required.'
    },
    video: {
      name: 'Trailer',
      specs: [
        { width: 2560, height: 1440, name: '2K (recommended)' },
        { width: 1920, height: 1080, name: 'Full HD' },
      ],
      duration: { min: 30, max: 180 },
      format: ['MP4'],
      required: true,
      notes: 'Video trailer is required. Show actual VR gameplay footage.'
    },
    metadata: {
      appName: { max: 50 },
      shortDescription: { max: 500 },
      description: { max: 4000 },
      comfortRating: ['Comfortable', 'Moderate', 'Intense'],
      playArea: ['Seated', 'Standing', 'Roomscale'],
      inputMethods: ['Touch Controllers', 'Hand Tracking', 'Gamepad'],
    }
  }
};

class StoreRequirementsService {
  static getRequirements(storeType) {
    const store = StoreRequirements[storeType];
    if (!store) {
      throw new Error(`Unknown store type: ${storeType}`);
    }
    return store;
  }

  static getAllRequirements() {
    return StoreRequirements;
  }

  static getStoreList() {
    return Object.entries(StoreRequirements).map(([key, value]) => ({
      id: key,
      name: value.name
    }));
  }

  static validateAsset(storeType, assetType, file) {
    const store = StoreRequirements[storeType];
    if (!store) return { valid: false, error: 'Unknown store type' };

    const requirements = store[assetType];
    if (!requirements) return { valid: false, error: 'Unknown asset type' };

    // Validation logic would go here
    // This would check dimensions, format, file size, etc.
    
    return { valid: true };
  }
}

module.exports = StoreRequirementsService;
