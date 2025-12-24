const OpenAI = require('openai');

class OpenAIService {
  constructor() {
    this.client = null;
    this.model = 'gpt-5.2';
    this.reasoningEffort = 'none';
    this.outputVerbosity = 'medium';
  }

  setApiKey(apiKey) {
    if (apiKey) {
      this.client = new OpenAI({ apiKey });
    } else {
      this.client = null;
    }
  }

  setModel(model) {
    this.model = model || 'gpt-5.2';
  }

  setReasoningEffort(effort) {
    this.reasoningEffort = effort || 'none';
  }

  setOutputVerbosity(verbosity) {
    this.outputVerbosity = verbosity || 'medium';
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

  async generateAppPlan(projectData, webContents) {
    if (!this.client) {
      throw new Error('OpenAI client not initialized. Please set your API key in Settings.');
    }

    const prompt = this._buildPlanPrompt(projectData);

    try {
      // Build request options based on model
      const isGPT5Family = this.model.startsWith('gpt-5');
      const isO1OrO3 = this.model.startsWith('o1') || this.model.startsWith('o3');
      
      const requestOptions = {
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
        response_format: { type: 'json_object' }
      };

      // Use max_completion_tokens for GPT-5 family and o-series models
      if (isGPT5Family || isO1OrO3) {
        requestOptions.max_completion_tokens = 16000;
      } else {
        // Use max_tokens for older models (GPT-4, GPT-3.5)
        requestOptions.max_tokens = 4000;
        requestOptions.temperature = 0.7;
      }

      const stream = await this.client.chat.completions.create({ ...requestOptions, stream: true });

      let fullResponse = '';
      for await (const chunk of stream) {
        const content = chunk.choices[0]?.delta?.content || '';
        fullResponse += content;
        if (webContents) {
          webContents.send('openai:plan-chunk', content);
        }
      }

      if (webContents) {
        webContents.send('openai:plan-finished');
      }
      
      const response = JSON.parse(fullResponse);
      return response;
    } catch (error) {
      console.error('OpenAI API Error:', error);
      if (webContents) {
        webContents.send('openai:plan-error', error.message);
      }
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
      const isGPT5Family = this.model.startsWith('gpt-5');
      const isO1OrO3 = this.model.startsWith('o1') || this.model.startsWith('o3');

      const requestOptions = {
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
        response_format: { type: 'json_object' }
      };

      if (isGPT5Family || isO1OrO3) {
        requestOptions.max_completion_tokens = 3000;
      } else {
        requestOptions.max_tokens = 3000;
        requestOptions.temperature = 0.7;
      }

      const completion = await this.client.chat.completions.create(requestOptions);

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

Please provide a JSON response with store-optimized content including taglines:
{
  "appName": "Optimized app name (within store limits)",
  "shortDescription": "Brief description optimized for ${storeType} (usually 80-170 chars)",
  "longDescription": "Full description with formatting, features, and call-to-action",
  "tagline": "Catchy tagline/subtitle",
  "keywords": ["keyword1", "keyword2", "keyword3", ...],
  "screenshotCaptions": [
    "Caption for screenshot 1 highlighting key feature",
    "Caption for screenshot 2 highlighting benefit",
    "Caption for screenshot 3",
    "Caption for screenshot 4",
    "Caption for screenshot 5"
  ],
  "whatsNew": "Template for what's new section",
  "promoText": "Promotional text for featuring",
  "category": "Recommended store category",
  "contentRating": "Suggested content rating",
  "tips": ["Tip 1 for this store", "Tip 2", ...],
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
    {"feature": "Onboarding/Welcome", "taglines": ["Option 1", "Option 2"]},
    {"feature": "Main Feature 1", "taglines": ["Option 1", "Option 2"]},
    {"feature": "Main Feature 2", "taglines": ["Option 1", "Option 2"]},
    {"feature": "Social Proof/Reviews", "taglines": ["Option 1", "Option 2"]},
    {"feature": "Call to Action", "taglines": ["Option 1", "Option 2"]}
  ],
  "promoVideoTaglines": ["Video intro tagline", "Video outro/CTA tagline"],
  "socialMediaTaglines": {
    "twitter": "Short punchy tagline for Twitter",
    "instagram": "Engaging Instagram caption",
    "facebook": "Facebook post tagline"
  }
}
`;

    try {
      const isGPT5Family = this.model.startsWith('gpt-5');
      const isO1OrO3 = this.model.startsWith('o1') || this.model.startsWith('o3');

      const requestOptions = {
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
        response_format: { type: 'json_object' }
      };

      if (isGPT5Family || isO1OrO3) {
        requestOptions.max_completion_tokens = 12000;
      } else {
        requestOptions.max_tokens = 6000;
        requestOptions.temperature = 0.8;
      }

      const completion = await this.client.chat.completions.create(requestOptions);

      // Check if the response was cut off
      if (completion.choices[0].finish_reason === 'length') {
        throw new Error('Response was cut off due to length. Please try again.');
      }

      const content = completion.choices[0].message.content;
      if (!content) {
        throw new Error('Received empty response from OpenAI.');
      }

      const response = JSON.parse(content);
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
      const isGPT5Family = this.model.startsWith('gpt-5');
      const isO1OrO3 = this.model.startsWith('o1') || this.model.startsWith('o3');

      const requestOptions = {
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
        response_format: { type: 'json_object' }
      };

      if (isGPT5Family || isO1OrO3) {
        requestOptions.max_completion_tokens = 8000;
      } else {
        requestOptions.max_tokens = 4000;
        requestOptions.temperature = 0.8;
      }

      const completion = await this.client.chat.completions.create(requestOptions);

      // Check if the response was cut off
      if (completion.choices[0].finish_reason === 'length') {
        throw new Error('Response was cut off due to length. Please try again.');
      }

      const content = completion.choices[0].message.content;
      if (!content) {
        throw new Error('Received empty response from OpenAI.');
      }

      const response = JSON.parse(content);
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
      const isGPT5Family = this.model.startsWith('gpt-5');
      const isO1OrO3 = this.model.startsWith('o1') || this.model.startsWith('o3');

      const requestOptions = {
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
        response_format: { type: 'json_object' }
      };

      if (isGPT5Family || isO1OrO3) {
        requestOptions.max_completion_tokens = 8000;
      } else {
        requestOptions.max_tokens = 4000;
        requestOptions.temperature = 0.9;
      }

      const completion = await this.client.chat.completions.create(requestOptions);

      // Check if the response was cut off
      if (completion.choices[0].finish_reason === 'length') {
        throw new Error('Response was cut off due to length. Please try again.');
      }

      const content = completion.choices[0].message.content;
      if (!content) {
        throw new Error('Received empty response from OpenAI.');
      }

      const response = JSON.parse(content);
      return response;
    } catch (error) {
      console.error('OpenAI API Error:', error);
      throw new Error(`Failed to generate taglines: ${error.message}`);
    }
  }

  async generatePitch(projectData) {
    if (!this.client) {
      throw new Error('OpenAI client not initialized. Please set your API key in Settings.');
    }

    // Extract key features and tech stack from AI plan if available
    const aiPlan = projectData.aiPlan || {};
    const keyFeatures = aiPlan.keyFeatures ? aiPlan.keyFeatures.join('\n- ') : 'Not yet defined';
    const techStack = aiPlan.techStack ? JSON.stringify(aiPlan.techStack, null, 2) : 'Not yet defined';
    const timeline = aiPlan.timeline ? JSON.stringify(aiPlan.timeline, null, 2) : 'Not yet defined';
    const risks = aiPlan.risks ? aiPlan.risks.map(r => `${r.risk} (Impact: ${r.impact})`).join('\n- ') : 'Not yet analyzed';
    const marketingStrategy = aiPlan.marketingStrategy ? JSON.stringify(aiPlan.marketingStrategy, null, 2) : 'Not yet defined';
    const overview = aiPlan.overview || '';

    const prompt = `
You are a world-class pitch expert combining the persuasive brilliance of the greatest Shark Tank pitches with the inspirational storytelling mastery of legendary TED Talks. You are about to create the most compelling, comprehensive, and memorable pitch for an app that will captivate investors, inspire teams, and move audiences to action.

══════════════════════════════════════════════════════════════
                    APP PROJECT DETAILS
══════════════════════════════════════════════════════════════

**App Name:** ${projectData.name || 'Untitled App'}

**Category:** ${projectData.category || 'General'} / ${projectData.subcategory || 'Apps'}

**Full App Description:**
${projectData.description || 'No description provided'}

**Target Markets:** ${(projectData.targetMarkets || []).join(', ') || 'Global'}

**Target Age Range:** ${projectData.ageRangeMin || '4'} - ${projectData.ageRangeMax || '99'} years

**Monetization Strategy:** ${projectData.monetization || 'Free'}

**Additional Requirements & Notes:**
${projectData.additionalNotes || 'None provided'}

**Agent/Development Instructions:**
${projectData.agentInstructions || 'None provided'}

══════════════════════════════════════════════════════════════
                    AI-GENERATED PLAN INSIGHTS
══════════════════════════════════════════════════════════════

**Project Overview:**
${overview}

**Key Features:**
- ${keyFeatures}

**Technology Stack:**
${techStack}

**Development Timeline:**
${timeline}

**Identified Risks:**
- ${risks}

**Marketing Strategy:**
${marketingStrategy}

══════════════════════════════════════════════════════════════
                    YOUR MISSION
══════════════════════════════════════════════════════════════

Create an EXTENSIVE, COMPREHENSIVE pitch presentation script that could be delivered as a 15-20 minute keynote. This should be a complete, polished pitch that covers every angle. The pitch must be AT LEAST 2000-3000 words.

**STRUCTURE YOUR PITCH WITH THESE SECTIONS:**

## 1. THE HOOK (200-300 words)
- Open with a powerful, attention-grabbing story, statistic, or question
- Paint a vivid picture of the problem or opportunity
- Make it personal and relatable
- Create emotional resonance immediately

## 2. THE PROBLEM (300-400 words)
- Deep dive into the pain points users face
- Use specific examples and scenarios
- Quantify the problem where possible
- Show you truly understand the frustration
- Build empathy and urgency

## 3. THE SOLUTION - YOUR APP (400-500 words)
- Introduce the app as the hero of the story
- Explain exactly how it works
- Walk through the key features with enthusiasm
- Show the transformation from problem to solution
- Use vivid, sensory language to help them "see" the app

## 4. THE MARKET OPPORTUNITY (300-400 words)
- Define the target audience clearly
- Discuss market size and growth potential
- Explain why now is the perfect time
- Address the competitive landscape
- Show your unique positioning

## 5. THE BUSINESS MODEL (200-300 words)
- Explain how the app makes money
- Discuss pricing strategy
- Project potential revenue
- Show the path to profitability
- Address scalability

## 6. THE JOURNEY AHEAD (300-400 words)
- Acknowledge the challenges honestly
- Show your roadmap and milestones
- Discuss what you've already accomplished
- Share your development approach
- Build confidence in execution

## 7. THE VISION (300-400 words)
- Paint the picture of success
- Describe the impact on users' lives
- Share your bigger mission
- Inspire with possibility
- Connect to something larger than the app itself

## 8. THE CALL TO ACTION (200-300 words)
- Summarize the opportunity
- Create urgency without being pushy
- End with a memorable, quotable statement
- Leave them wanting to be part of this journey

**STYLE REQUIREMENTS:**
- Write in first person as the passionate founder/creator
- Be authentic, enthusiastic, and genuine - not corporate or salesy
- Use vivid metaphors and analogies
- Include specific details that bring the vision to life
- Vary sentence rhythm - short punchy statements mixed with flowing descriptions
- Include 5-10 "quotable" lines that could stand alone as memorable statements
- Use rhetorical questions to engage the audience
- Build emotional momentum throughout
- Reference real-world scenarios and use cases
- Show vulnerability alongside confidence
- End STRONG - the closing should be powerful and memorable

**TONE:**
Imagine you're presenting to:
- A room of investors who could fund your dream
- A TED audience hungry for inspiration
- Future users who need to believe in your solution
- A team you want to inspire to build something amazing

Return your response as JSON:
{
  "pitch": "Your complete, extensive pitch monologue here with all sections..."
}
`;

    try {
      const isGPT5Family = this.model.startsWith('gpt-5');
      const isO1OrO3 = this.model.startsWith('o1') || this.model.startsWith('o3');

      const requestOptions = {
        model: this.model,
        messages: [
          {
            role: 'system',
            content: 'You are a legendary pitch expert and storyteller. You have written pitches for the most successful startups in history. You combine the persuasive genius of Steve Jobs product launches, the emotional storytelling of the best TED speakers, and the business acumen of top Shark Tank contestants. Your pitches are comprehensive, compelling, and unforgettable. You write LONG, DETAILED pitches that leave no stone unturned. Never write a short pitch - always go deep and comprehensive.'
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        response_format: { type: 'json_object' }
      };

      if (isGPT5Family || isO1OrO3) {
        requestOptions.max_completion_tokens = 10000;
      } else {
        requestOptions.max_tokens = 8000;
        requestOptions.temperature = 0.85;
      }

      const completion = await this.client.chat.completions.create(requestOptions);

      const content = completion.choices[0].message.content;
      if (!content) {
        throw new Error('Received empty response from OpenAI.');
      }

      const response = JSON.parse(content);
      return response;
    } catch (error) {
      console.error('OpenAI API Error:', error);
      throw new Error(`Failed to generate pitch: ${error.message}`);
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

  async translateContent(content, targetLanguage, targetRegion) {
    if (!this.client) {
      throw new Error('OpenAI client not initialized. Please set your API key in Settings.');
    }

    const prompt = `You are a professional app store localization expert. Translate the following app store listing content from English to ${targetLanguage}.

Important guidelines:
- Maintain the marketing tone and appeal
- Adapt cultural references appropriately for ${targetRegion}
- Keep app-specific terms and brand names unchanged if appropriate
- Ensure keywords are commonly searched terms in ${targetLanguage}
- Maintain formatting and line breaks

Content to translate:

APP NAME: ${content.appName || '(not provided)'}

TAGLINE: ${content.tagline || '(not provided)'}

SHORT DESCRIPTION: ${content.shortDescription || '(not provided)'}

FULL DESCRIPTION:
${content.longDescription || '(not provided)'}

KEYWORDS: ${content.keywords || '(not provided)'}

Return your translation as a JSON object with these exact keys:
{
  "appName": "translated app name",
  "tagline": "translated tagline",
  "shortDescription": "translated short description",
  "longDescription": "translated full description",
  "keywords": "translated keywords"
}

Only return the JSON, no other text.`;

    try {
      const isGPT5Family = this.model.startsWith('gpt-5');
      const isO1OrO3 = this.model.startsWith('o1') || this.model.startsWith('o3');

      const requestOptions = {
        model: this.model,
        messages: [
          {
            role: 'system',
            content: 'You are an expert app store localization specialist. Translate content accurately while maintaining marketing appeal. Respond only in JSON format.'
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        response_format: { type: 'json_object' }
      };

      if (isGPT5Family || isO1OrO3) {
        requestOptions.max_completion_tokens = 4000;
      } else {
        requestOptions.max_tokens = 4000;
        requestOptions.temperature = 0.7;
      }

      const completion = await this.client.chat.completions.create(requestOptions);

      const responseContent = completion.choices[0].message.content;
      if (!responseContent) {
        throw new Error('Received empty response from OpenAI.');
      }

      const response = JSON.parse(responseContent);
      return response;
    } catch (error) {
      console.error('OpenAI API Error:', error);
      throw new Error(`Failed to translate content: ${error.message}`);
    }
  }
}

module.exports = OpenAIService;
