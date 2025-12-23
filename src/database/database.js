const Database = require('better-sqlite3');
const path = require('path');
const { app } = require('electron');
const { v4: uuidv4 } = require('uuid');

class AppDatabase {
  constructor() {
    // Get the user data path for storing the database
    const userDataPath = app.getPath('userData');
    const dbPath = path.join(userDataPath, 'app-creator.db');
    
    this.db = new Database(dbPath);
    this.db.pragma('journal_mode = WAL');
    
    this.initialize();
  }

  initialize() {
    // Create settings table
    this.db.exec(`
      CREATE TABLE IF NOT EXISTS settings (
        id INTEGER PRIMARY KEY CHECK (id = 1),
        openai_api_key TEXT,
        theme TEXT DEFAULT 'dark',
        branding TEXT DEFAULT 'default',
        ai_model TEXT DEFAULT 'gpt-4',
        enable_ai_planning INTEGER DEFAULT 1,
        enable_ai_adjustments INTEGER DEFAULT 1,
        enable_ai_store_content INTEGER DEFAULT 1,
        enable_ai_keywords INTEGER DEFAULT 1,
        enable_ai_taglines INTEGER DEFAULT 1,
        auto_save INTEGER DEFAULT 1,
        notification_enabled INTEGER DEFAULT 1,
        created_at TEXT DEFAULT CURRENT_TIMESTAMP,
        updated_at TEXT DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Create projects table
    this.db.exec(`
      CREATE TABLE IF NOT EXISTS projects (
        id TEXT PRIMARY KEY,
        name TEXT NOT NULL,
        description TEXT,
        status TEXT DEFAULT 'planning',
        target_markets TEXT,
        age_range_min INTEGER,
        age_range_max INTEGER,
        category TEXT,
        subcategory TEXT,
        monetization TEXT,
        app_description TEXT,
        ai_plan TEXT,
        agent_instructions TEXT,
        checklist TEXT,
        adjustments TEXT,
        current_step TEXT DEFAULT 'planning',
        created_at TEXT DEFAULT CURRENT_TIMESTAMP,
        updated_at TEXT DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Create store_submissions table
    this.db.exec(`
      CREATE TABLE IF NOT EXISTS store_submissions (
        id TEXT PRIMARY KEY,
        project_id TEXT NOT NULL,
        store_type TEXT NOT NULL,
        app_name TEXT,
        category TEXT,
        keywords TEXT,
        short_description TEXT,
        long_description TEXT,
        tagline TEXT,
        privacy_policy_url TEXT,
        support_url TEXT,
        marketing_url TEXT,
        icon_path TEXT,
        screenshots TEXT,
        promo_video_path TEXT,
        feature_graphic_path TEXT,
        status TEXT DEFAULT 'draft',
        metadata TEXT,
        created_at TEXT DEFAULT CURRENT_TIMESTAMP,
        updated_at TEXT DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (project_id) REFERENCES projects(id) ON DELETE CASCADE
      )
    `);

    // Insert default settings if not exists
    const settingsExist = this.db.prepare('SELECT COUNT(*) as count FROM settings').get();
    if (settingsExist.count === 0) {
      this.db.prepare(`
        INSERT INTO settings (id) VALUES (1)
      `).run();
    }
  }

  // ==================== Settings ====================
  getSettings() {
    const row = this.db.prepare('SELECT * FROM settings WHERE id = 1').get();
    if (row) {
      return {
        openaiApiKey: row.openai_api_key,
        theme: row.theme,
        branding: row.branding,
        aiModel: row.ai_model,
        enableAiPlanning: !!row.enable_ai_planning,
        enableAiAdjustments: !!row.enable_ai_adjustments,
        enableAiStoreContent: !!row.enable_ai_store_content,
        enableAiKeywords: !!row.enable_ai_keywords,
        enableAiTaglines: !!row.enable_ai_taglines,
        autoSave: !!row.auto_save,
        notificationEnabled: !!row.notification_enabled,
      };
    }
    return null;
  }

  updateSettings(settings) {
    const updates = [];
    const params = {};

    if (settings.openaiApiKey !== undefined) {
      updates.push('openai_api_key = @openaiApiKey');
      params.openaiApiKey = settings.openaiApiKey;
    }
    if (settings.theme !== undefined) {
      updates.push('theme = @theme');
      params.theme = settings.theme;
    }
    if (settings.branding !== undefined) {
      updates.push('branding = @branding');
      params.branding = settings.branding;
    }
    if (settings.aiModel !== undefined) {
      updates.push('ai_model = @aiModel');
      params.aiModel = settings.aiModel;
    }
    if (settings.enableAiPlanning !== undefined) {
      updates.push('enable_ai_planning = @enableAiPlanning');
      params.enableAiPlanning = settings.enableAiPlanning ? 1 : 0;
    }
    if (settings.enableAiAdjustments !== undefined) {
      updates.push('enable_ai_adjustments = @enableAiAdjustments');
      params.enableAiAdjustments = settings.enableAiAdjustments ? 1 : 0;
    }
    if (settings.enableAiStoreContent !== undefined) {
      updates.push('enable_ai_store_content = @enableAiStoreContent');
      params.enableAiStoreContent = settings.enableAiStoreContent ? 1 : 0;
    }
    if (settings.enableAiKeywords !== undefined) {
      updates.push('enable_ai_keywords = @enableAiKeywords');
      params.enableAiKeywords = settings.enableAiKeywords ? 1 : 0;
    }
    if (settings.enableAiTaglines !== undefined) {
      updates.push('enable_ai_taglines = @enableAiTaglines');
      params.enableAiTaglines = settings.enableAiTaglines ? 1 : 0;
    }
    if (settings.autoSave !== undefined) {
      updates.push('auto_save = @autoSave');
      params.autoSave = settings.autoSave ? 1 : 0;
    }
    if (settings.notificationEnabled !== undefined) {
      updates.push('notification_enabled = @notificationEnabled');
      params.notificationEnabled = settings.notificationEnabled ? 1 : 0;
    }

    if (updates.length > 0) {
      updates.push('updated_at = CURRENT_TIMESTAMP');
      const sql = `UPDATE settings SET ${updates.join(', ')} WHERE id = 1`;
      this.db.prepare(sql).run(params);
    }

    return this.getSettings();
  }

  // ==================== Projects ====================
  getAllProjects() {
    const rows = this.db.prepare('SELECT * FROM projects ORDER BY updated_at DESC').all();
    return rows.map(this._mapProjectRow);
  }

  getProject(id) {
    const row = this.db.prepare('SELECT * FROM projects WHERE id = ?').get(id);
    return row ? this._mapProjectRow(row) : null;
  }

  createProject(data) {
    const id = uuidv4();
    
    this.db.prepare(`
      INSERT INTO projects (
        id, name, description, target_markets, age_range_min, age_range_max,
        category, subcategory, monetization, app_description
      ) VALUES (
        @id, @name, @description, @targetMarkets, @ageRangeMin, @ageRangeMax,
        @category, @subcategory, @monetization, @appDescription
      )
    `).run({
      id,
      name: data.name || 'Untitled Project',
      description: data.description || '',
      targetMarkets: JSON.stringify(data.targetMarkets || []),
      ageRangeMin: data.ageRangeMin || 0,
      ageRangeMax: data.ageRangeMax || 99,
      category: data.category || '',
      subcategory: data.subcategory || '',
      monetization: data.monetization || 'free',
      appDescription: data.appDescription || '',
    });

    return this.getProject(id);
  }

  updateProject(id, data) {
    const updates = [];
    const params = { id };

    const fieldMap = {
      name: 'name',
      description: 'description',
      status: 'status',
      targetMarkets: 'target_markets',
      ageRangeMin: 'age_range_min',
      ageRangeMax: 'age_range_max',
      category: 'category',
      subcategory: 'subcategory',
      monetization: 'monetization',
      appDescription: 'app_description',
      aiPlan: 'ai_plan',
      agentInstructions: 'agent_instructions',
      checklist: 'checklist',
      adjustments: 'adjustments',
      currentStep: 'current_step',
    };

    for (const [jsKey, dbKey] of Object.entries(fieldMap)) {
      if (data[jsKey] !== undefined) {
        let value = data[jsKey];
        if (typeof value === 'object') {
          value = JSON.stringify(value);
        }
        updates.push(`${dbKey} = @${jsKey}`);
        params[jsKey] = value;
      }
    }

    if (updates.length > 0) {
      updates.push('updated_at = CURRENT_TIMESTAMP');
      const sql = `UPDATE projects SET ${updates.join(', ')} WHERE id = @id`;
      this.db.prepare(sql).run(params);
    }

    return this.getProject(id);
  }

  deleteProject(id) {
    this.db.prepare('DELETE FROM projects WHERE id = ?').run(id);
    return { success: true };
  }

  duplicateProject(id) {
    const original = this.getProject(id);
    if (!original) return null;

    const newProject = this.createProject({
      ...original,
      name: `${original.name} (Copy)`,
    });

    // Update with all the AI-generated content
    return this.updateProject(newProject.id, {
      aiPlan: original.aiPlan,
      agentInstructions: original.agentInstructions,
      checklist: original.checklist,
      adjustments: original.adjustments,
      status: 'planning',
      currentStep: 'planning',
    });
  }

  // ==================== Checklist ====================
  getChecklist(projectId) {
    const project = this.getProject(projectId);
    return project ? project.checklist : null;
  }

  updateChecklist(projectId, checklist) {
    return this.updateProject(projectId, { checklist });
  }

  toggleChecklistItem(projectId, itemIndex) {
    const project = this.getProject(projectId);
    if (!project || !project.checklist) return null;

    const checklist = project.checklist;
    if (checklist.items && checklist.items[itemIndex]) {
      checklist.items[itemIndex].completed = !checklist.items[itemIndex].completed;
      return this.updateChecklist(projectId, checklist);
    }
    return null;
  }

  // ==================== Store Submissions ====================
  getStoreSubmissions(projectId) {
    const rows = this.db.prepare(
      'SELECT * FROM store_submissions WHERE project_id = ? ORDER BY created_at'
    ).all(projectId);
    return rows.map(this._mapStoreSubmissionRow);
  }

  createStoreSubmission(projectId, storeType) {
    const id = uuidv4();
    
    this.db.prepare(`
      INSERT INTO store_submissions (id, project_id, store_type)
      VALUES (@id, @projectId, @storeType)
    `).run({ id, projectId, storeType });

    return this._mapStoreSubmissionRow(
      this.db.prepare('SELECT * FROM store_submissions WHERE id = ?').get(id)
    );
  }

  updateStoreSubmission(submissionId, data) {
    const updates = [];
    const params = { id: submissionId };

    const fieldMap = {
      appName: 'app_name',
      category: 'category',
      keywords: 'keywords',
      shortDescription: 'short_description',
      longDescription: 'long_description',
      tagline: 'tagline',
      privacyPolicyUrl: 'privacy_policy_url',
      supportUrl: 'support_url',
      marketingUrl: 'marketing_url',
      iconPath: 'icon_path',
      screenshots: 'screenshots',
      promoVideoPath: 'promo_video_path',
      featureGraphicPath: 'feature_graphic_path',
      status: 'status',
      metadata: 'metadata',
    };

    for (const [jsKey, dbKey] of Object.entries(fieldMap)) {
      if (data[jsKey] !== undefined) {
        let value = data[jsKey];
        if (typeof value === 'object') {
          value = JSON.stringify(value);
        }
        updates.push(`${dbKey} = @${jsKey}`);
        params[jsKey] = value;
      }
    }

    if (updates.length > 0) {
      updates.push('updated_at = CURRENT_TIMESTAMP');
      const sql = `UPDATE store_submissions SET ${updates.join(', ')} WHERE id = @id`;
      this.db.prepare(sql).run(params);
    }

    return this._mapStoreSubmissionRow(
      this.db.prepare('SELECT * FROM store_submissions WHERE id = ?').get(submissionId)
    );
  }

  deleteStoreSubmission(submissionId) {
    this.db.prepare('DELETE FROM store_submissions WHERE id = ?').run(submissionId);
    return { success: true };
  }

  // ==================== Helper Methods ====================
  _mapProjectRow(row) {
    return {
      id: row.id,
      name: row.name,
      description: row.description,
      status: row.status,
      targetMarkets: JSON.parse(row.target_markets || '[]'),
      ageRangeMin: row.age_range_min,
      ageRangeMax: row.age_range_max,
      category: row.category,
      subcategory: row.subcategory,
      monetization: row.monetization,
      appDescription: row.app_description,
      aiPlan: row.ai_plan ? JSON.parse(row.ai_plan) : null,
      agentInstructions: row.agent_instructions,
      checklist: row.checklist ? JSON.parse(row.checklist) : null,
      adjustments: row.adjustments ? JSON.parse(row.adjustments) : null,
      currentStep: row.current_step,
      createdAt: row.created_at,
      updatedAt: row.updated_at,
    };
  }

  _mapStoreSubmissionRow(row) {
    return {
      id: row.id,
      projectId: row.project_id,
      storeType: row.store_type,
      appName: row.app_name,
      category: row.category,
      keywords: row.keywords,
      shortDescription: row.short_description,
      longDescription: row.long_description,
      tagline: row.tagline,
      privacyPolicyUrl: row.privacy_policy_url,
      supportUrl: row.support_url,
      marketingUrl: row.marketing_url,
      iconPath: row.icon_path,
      screenshots: row.screenshots ? JSON.parse(row.screenshots) : [],
      promoVideoPath: row.promo_video_path,
      featureGraphicPath: row.feature_graphic_path,
      status: row.status,
      metadata: row.metadata ? JSON.parse(row.metadata) : null,
      createdAt: row.created_at,
      updatedAt: row.updated_at,
    };
  }

  close() {
    this.db.close();
  }
}

module.exports = AppDatabase;
