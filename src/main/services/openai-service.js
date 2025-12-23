const OpenAI = require('openai');

class OpenAIService {
  constructor() {
    this.client = null;
    this.model = 'gpt-4';
  }

  setApiKey(apiKey) {
    if (apiKey) {
      this.client = new OpenAI({ apiKey });
    } else {
      this.client = null;
    }
  }

  setModel(model) {
    this.model = model || 'gpt-4';
  }

  async validateApiKey(apiKey) {
    try {
      const testClient = new OpenAI({ apiKey });
      await testClient.models.list();
      return { valid: true };
    } catch (error) {
      return { valid: false, error: error.message };
    }
  }

  async generateAppPlan(projectData) {
    if (!this.client) {
      throw new Error('OpenAI client not initialized. Please set your API key in Settings.');
    }

    const prompt = this._buildPlanPrompt(projectData);

    try {
      const completion = await this.client.chat.completions.create({
        model: this.model,
        messages: [
          {
            role: 'system',
            content: `You are an expert app development consultant and project manager. You provide detailed, actionable plans for creating applications. Your plans are comprehensive, covering all aspects from design to deployment. You respond in JSON format only.`
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        temperature: 0.7,
        max_tokens: 4000,
        response_format: { type: 'json_object' }
      });

      const response = JSON.parse(completion.choices[0].message.content);
      return response;
    } catch (error) {
      console.error('OpenAI API Error:', error);
      throw new Error(`Failed to generate app plan: ${error.message}`);
    }
  }

  async generateAdjustments(projectData, adjustmentRequest) {
    if (!this.client) {
      throw new Error('OpenAI client not initialized. Please set your API key in Settings.');
    }

    const prompt = `
Based on the following app project and the user's adjustment request, provide updated recommendations and checklist items.

**Current Project:**
- Name: ${projectData.name}
- Description: ${projectData.appDescription}
- Category: ${projectData.category} / ${projectData.subcategory}
- Target Markets: ${(projectData.targetMarkets || []).join(', ')}
- Monetization: ${projectData.monetization}

**Current Plan:**
${JSON.stringify(projectData.aiPlan, null, 2)}

**User's Adjustment Request:**
${adjustmentRequest}

Please provide a JSON response with the following structure:
{
  "adjustedOverview": "Updated overview based on the adjustments",
  "newSteps": [
    {
      "title": "Step title",
      "description": "Step description",
      "priority": "high/medium/low",
      "estimatedTime": "time estimate"
    }
  ],
  "modifiedSteps": [
    {
      "originalTitle": "Original step title",
      "newTitle": "Updated title",
      "newDescription": "Updated description",
      "reason": "Why this was changed"
    }
  ],
  "removedSteps": [
    {
      "title": "Removed step title",
      "reason": "Why this was removed"
    }
  ],
  "additionalRecommendations": "Any additional recommendations",
  "impactAnalysis": "How these changes affect the overall project"
}
`;

    try {
      const completion = await this.client.chat.completions.create({
        model: this.model,
        messages: [
          {
            role: 'system',
            content: 'You are an expert app development consultant. Analyze adjustment requests and provide structured recommendations. Respond only in JSON format.'
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        temperature: 0.7,
        max_tokens: 3000,
        response_format: { type: 'json_object' }
      });

      const response = JSON.parse(completion.choices[0].message.content);
      return response;
    } catch (error) {
      console.error('OpenAI API Error:', error);
      throw new Error(`Failed to generate adjustments: ${error.message}`);
    }
  }

  async generateStoreContent(projectData, storeType) {
    if (!this.client) {
      throw new Error('OpenAI client not initialized. Please set your API key in Settings.');
    }

    const storeNames = {
      apple: 'Apple App Store',
      google: 'Google Play Store',
      amazon: 'Amazon Appstore',
      microsoft: 'Microsoft Store',
      linux: 'Linux App Stores (Snap, Flatpak)',
      xbox: 'Xbox Store',
      steam: 'Steam'
    };

    const prompt = `
Generate optimized store listing content for the ${storeNames[storeType] || storeType} for the following app:

**App Details:**
- Name: ${projectData.name}
- Description: ${projectData.appDescription}
- Category: ${projectData.category} / ${projectData.subcategory}
- Target Markets: ${(projectData.targetMarkets || []).join(', ')}
- Age Range: ${projectData.ageRangeMin} - ${projectData.ageRangeMax}
- Monetization: ${projectData.monetization}

Please provide a JSON response with store-optimized content:
{
  "appName": "Optimized app name (within store limits)",
  "shortDescription": "Brief description optimized for ${storeType} (usually 80-170 chars)",
  "longDescription": "Full description with formatting, features, and call-to-action",
  "tagline": "Catchy tagline/subtitle",
  "keywords": ["keyword1", "keyword2", "keyword3", ...],
  "screenshotCaptions": [
    "Caption for screenshot 1 highlighting key feature",
    "Caption for screenshot 2 highlighting benefit",
    ...
  ],
  "whatsNew": "Template for what's new section",
  "promoText": "Promotional text for featuring",
  "category": "Recommended store category",
  "contentRating": "Suggested content rating",
  "tips": ["Tip 1 for this store", "Tip 2", ...]
}
`;

    try {
      const completion = await this.client.chat.completions.create({
        model: this.model,
        messages: [
          {
            role: 'system',
            content: `You are an expert app store optimization (ASO) specialist with deep knowledge of ${storeNames[storeType] || storeType} requirements and best practices. You create compelling, SEO-optimized store listings that maximize visibility and downloads.`
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        temperature: 0.8,
        max_tokens: 2500,
        response_format: { type: 'json_object' }
      });

      const response = JSON.parse(completion.choices[0].message.content);
      return response;
    } catch (error) {
      console.error('OpenAI API Error:', error);
      throw new Error(`Failed to generate store content: ${error.message}`);
    }
  }

  async generateKeywords(projectData) {
    if (!this.client) {
      throw new Error('OpenAI client not initialized. Please set your API key in Settings.');
    }

    const prompt = `
Generate comprehensive keywords for app store optimization for the following app:

**App Details:**
- Name: ${projectData.name}
- Description: ${projectData.appDescription}
- Category: ${projectData.category} / ${projectData.subcategory}
- Target Markets: ${(projectData.targetMarkets || []).join(', ')}
- Monetization: ${projectData.monetization}

Provide keywords in JSON format:
{
  "primaryKeywords": ["high-volume, highly relevant keywords"],
  "secondaryKeywords": ["medium-volume, relevant keywords"],
  "longTailKeywords": ["specific, lower competition phrases"],
  "competitorKeywords": ["keywords competitors might rank for"],
  "trendingKeywords": ["currently trending related keywords"],
  "localizedKeywords": {
    "en": ["English keywords"],
    "es": ["Spanish keywords"],
    "fr": ["French keywords"],
    "de": ["German keywords"]
  },
  "keywordStrategy": "Explanation of keyword strategy",
  "avoidKeywords": ["keywords to avoid and why"]
}
`;

    try {
      const completion = await this.client.chat.completions.create({
        model: this.model,
        messages: [
          {
            role: 'system',
            content: 'You are an expert in App Store Optimization (ASO) and keyword research. You understand how different app stores rank apps and what keywords drive downloads.'
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        temperature: 0.8,
        max_tokens: 2000,
        response_format: { type: 'json_object' }
      });

      const response = JSON.parse(completion.choices[0].message.content);
      return response;
    } catch (error) {
      console.error('OpenAI API Error:', error);
      throw new Error(`Failed to generate keywords: ${error.message}`);
    }
  }

  async generateTaglines(projectData) {
    if (!this.client) {
      throw new Error('OpenAI client not initialized. Please set your API key in Settings.');
    }

    const prompt = `
Generate compelling taglines and screenshot captions for the following app:

**App Details:**
- Name: ${projectData.name}
- Description: ${projectData.appDescription}
- Category: ${projectData.category} / ${projectData.subcategory}
- Target Markets: ${(projectData.targetMarkets || []).join(', ')}
- Monetization: ${projectData.monetization}

Provide creative content in JSON format:
{
  "mainTaglines": [
    "Primary tagline option 1",
    "Primary tagline option 2",
    "Primary tagline option 3"
  ],
  "subtitles": [
    "App Store subtitle option 1 (30 chars max)",
    "App Store subtitle option 2"
  ],
  "screenshotTaglines": [
    {
      "feature": "Onboarding/Welcome",
      "taglines": ["Option 1", "Option 2"]
    },
    {
      "feature": "Main Feature 1",
      "taglines": ["Option 1", "Option 2"]
    },
    {
      "feature": "Main Feature 2",
      "taglines": ["Option 1", "Option 2"]
    },
    {
      "feature": "Social Proof/Reviews",
      "taglines": ["Option 1", "Option 2"]
    },
    {
      "feature": "Call to Action",
      "taglines": ["Option 1", "Option 2"]
    }
  ],
  "promoVideoTaglines": [
    "Video intro tagline",
    "Video outro/CTA tagline"
  ],
  "socialMediaTaglines": {
    "twitter": "Short punchy tagline for Twitter",
    "instagram": "Engaging Instagram caption",
    "facebook": "Facebook post tagline"
  }
}
`;

    try {
      const completion = await this.client.chat.completions.create({
        model: this.model,
        messages: [
          {
            role: 'system',
            content: 'You are a creative copywriter specializing in app marketing. You create punchy, memorable taglines that capture attention and drive downloads. Your taglines are concise, benefit-focused, and emotionally engaging.'
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        temperature: 0.9,
        max_tokens: 2000,
        response_format: { type: 'json_object' }
      });

      const response = JSON.parse(completion.choices[0].message.content);
      return response;
    } catch (error) {
      console.error('OpenAI API Error:', error);
      throw new Error(`Failed to generate taglines: ${error.message}`);
    }
  }

  _buildPlanPrompt(projectData) {
    return `
Create a comprehensive app development plan for the following project:

**App Name:** ${projectData.name || 'Untitled App'}

**App Description:**
${projectData.appDescription || 'No description provided'}

**Target Markets:** ${(projectData.targetMarkets || []).join(', ') || 'Not specified'}

**Target Age Range:** ${projectData.ageRangeMin || 0} - ${projectData.ageRangeMax || 99} years

**Category:** ${projectData.category || 'Not specified'}
**Subcategory:** ${projectData.subcategory || 'Not specified'}

**Monetization Model:** ${projectData.monetization || 'Free'}

Please provide a detailed development plan in the following JSON structure:
{
  "overview": "A comprehensive overview of the app and what it will achieve",
  "keyFeatures": ["Feature 1", "Feature 2", ...],
  "techStack": {
    "frontend": ["Recommended frontend technologies"],
    "backend": ["Recommended backend technologies"],
    "database": ["Recommended database solutions"],
    "hosting": ["Recommended hosting/deployment options"],
    "thirdParty": ["Third-party services/APIs to integrate"]
  },
  "agentInstructions": "Detailed instructions for AI coding agents to build this app",
  "checklist": {
    "items": [
      {
        "title": "Step title",
        "description": "Detailed description of what needs to be done",
        "category": "planning/design/development/testing/deployment",
        "priority": "high/medium/low",
        "estimatedTime": "Estimated time to complete",
        "completed": false,
        "subtasks": ["Subtask 1", "Subtask 2", ...]
      }
    ]
  },
  "timeline": {
    "phases": [
      {
        "name": "Phase name",
        "duration": "Duration",
        "milestones": ["Milestone 1", "Milestone 2"]
      }
    ],
    "totalEstimate": "Total estimated time"
  },
  "risks": [
    {
      "risk": "Risk description",
      "mitigation": "How to mitigate this risk",
      "impact": "high/medium/low"
    }
  ],
  "marketingStrategy": {
    "prelaunch": ["Pre-launch activity 1", ...],
    "launch": ["Launch activity 1", ...],
    "postlaunch": ["Post-launch activity 1", ...]
  },
  "monetizationDetails": {
    "strategy": "Detailed monetization strategy",
    "pricingTiers": ["Tier 1", "Tier 2", ...],
    "revenueProjections": "Potential revenue considerations"
  },
  "successMetrics": ["Metric 1", "Metric 2", ...],
  "additionalRecommendations": "Any additional advice for making this app successful"
}
`;
  }
}

module.exports = OpenAIService;
