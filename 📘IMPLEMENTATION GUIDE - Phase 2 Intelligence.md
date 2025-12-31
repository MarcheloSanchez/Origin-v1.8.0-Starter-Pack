---
title: "📘 Phase 2 Implementation Guide: AI-Augmented Intelligence"
type: guide
status: 🔄active
tags:
  - 🤖ai
  - 📋implementation
  - 🔧technical
  - 🎯roadmap
created: 2025-12-31
modified: 2025-12-31
maturity: 🌱seedling
priority: high
related:
  - "[[🗺️ROADMAP - Origin v2.0 Lifetime Vault]]"
  - "[[README]]"
  - "[[My PKM MOC]]"
---

⬆️:: [[🗺️ROADMAP - Origin v2.0 Lifetime Vault]]

> **Mission**: Transform Origin from a manual knowledge system into an AI-augmented cognitive partner that captures effortlessly, organizes automatically, and generates insights proactively.

---

# 🎯 Phase 2 Overview

## Timeline
**Duration**: 6 months (Q3-Q4 2026 / Your custom timeline)
**Prerequisites**: Phase 1 complete (Foundation established)

## Core Objectives
1. **Reduce capture friction** from 30 seconds to 5 seconds
2. **Automate organization** (80% of tagging/filing work)
3. **Generate insights** automatically (weekly/monthly/yearly)
4. **Maintain privacy** (local-first AI, no cloud dependencies)

## Success Metrics
- ✅ Voice notes captured in < 5 seconds
- ✅ 80%+ auto-tagging accuracy
- ✅ Weekly insights generated automatically
- ✅ 50% reduction in manual organization time
- ✅ Zero sensitive data sent to cloud

---

# 🏗️ Architecture Overview

```
🧠 Intelligence Stack Architecture

┌─────────────────────────────────────────────────────────────┐
│                    USER INTERFACES                          │
│  Voice | Mobile | Web Clipper | Email | Wearables          │
└─────────────────────────────────────────────────────────────┘
                           ↓
┌─────────────────────────────────────────────────────────────┐
│                  CAPTURE LAYER                              │
│  • Voice-to-Text (Whisper AI)                              │
│  • Web Content Extraction                                   │
│  • Email Parser                                             │
│  • Image OCR (Tesseract)                                    │
│  • Health Data APIs                                         │
└─────────────────────────────────────────────────────────────┘
                           ↓
┌─────────────────────────────────────────────────────────────┐
│              PROCESSING LAYER                               │
│  • Text Cleaning & Normalization                           │
│  • Metadata Extraction                                      │
│  • Entity Recognition (NER)                                 │
│  • Timestamp & Location Tagging                            │
└─────────────────────────────────────────────────────────────┘
                           ↓
┌─────────────────────────────────────────────────────────────┐
│            AI INTELLIGENCE LAYER                            │
│  • Local LLM (Ollama + Llama 3.3)                          │
│  • Vector Embeddings (sentence-transformers)                │
│  • Classification Models                                    │
│  • Semantic Analysis                                        │
└─────────────────────────────────────────────────────────────┘
                           ↓
┌─────────────────────────────────────────────────────────────┐
│             ORGANIZATION LAYER                              │
│  • Auto-Tagging (AI classification)                        │
│  • Smart Folder Routing                                     │
│  • Duplicate Detection                                      │
│  • Related Note Linking                                     │
│  • Metadata Auto-Completion                                 │
└─────────────────────────────────────────────────────────────┘
                           ↓
┌─────────────────────────────────────────────────────────────┐
│              SYNTHESIS LAYER                                │
│  • Pattern Recognition                                      │
│  • Insight Generation                                       │
│  • Wisdom Extraction                                        │
│  • Knowledge Gap Identification                             │
│  • Temporal Analysis                                        │
└─────────────────────────────────────────────────────────────┘
                           ↓
┌─────────────────────────────────────────────────────────────┐
│                 OBSIDIAN VAULT                              │
│  • Markdown Files                                           │
│  • YAML Metadata                                            │
│  • Attachments                                              │
└─────────────────────────────────────────────────────────────┘
```

---

# 📦 Milestone 2.1: Smart Capture (Month 7-8)

## Goal
**Capture knowledge in 5 seconds or less, from any source, anywhere**

---

## Feature 1: Voice-to-Note Transcription

### Use Case
"I'm walking my dog and have an idea about the project. I say: *'Hey Obsidian, add note: we should refactor the authentication module to use OAuth instead of session tokens'*. Within 5 seconds, it's transcribed and saved to my Inbox."

### Technical Implementation

#### Option A: Obsidian Plugin + OpenAI Whisper API (Cloud)
**Pros**: Best accuracy (95%+), multi-language, punctuation
**Cons**: Costs $0.006/minute, requires internet, privacy concerns

```javascript
// Obsidian plugin: voice-capture-whisper
// File: main.ts

import { Plugin, Notice } from 'obsidian';
import { OpenAI } from 'openai';

export default class VoiceCapturePlugin extends Plugin {
    async onload() {
        this.addCommand({
            id: 'start-voice-capture',
            name: 'Start Voice Capture',
            hotkeys: [{ modifiers: ['Ctrl', 'Shift'], key: 'V' }],
            callback: () => this.startRecording()
        });
    }

    async startRecording() {
        const mediaRecorder = await this.getMediaRecorder();
        const audioChunks = [];

        mediaRecorder.ondataavailable = (event) => {
            audioChunks.push(event.data);
        };

        mediaRecorder.onstop = async () => {
            const audioBlob = new Blob(audioChunks, { type: 'audio/webm' });
            const transcription = await this.transcribe(audioBlob);
            await this.createNote(transcription);
        };

        mediaRecorder.start();
        new Notice('🎤 Recording... (Press again to stop)');

        // Auto-stop after 60 seconds or on second press
        setTimeout(() => mediaRecorder.stop(), 60000);
    }

    async transcribe(audioBlob: Blob): Promise<string> {
        const openai = new OpenAI({
            apiKey: this.settings.openaiApiKey
        });

        const file = new File([audioBlob], 'voice.webm', {
            type: 'audio/webm'
        });

        const transcription = await openai.audio.transcriptions.create({
            file: file,
            model: 'whisper-1',
            language: 'en', // or 'cs' for Czech
            prompt: 'This is a personal note about ideas, tasks, or observations.'
        });

        return transcription.text;
    }

    async createNote(text: string) {
        const fileName = `Voice Note ${window.moment().format('YYYY-MM-DD HH-mm-ss')}`;
        const filePath = `+Inbox/${fileName}.md`;

        const content = `---
title: "${fileName}"
type: atomic
status: 📥inbox
created: ${window.moment().format('YYYY-MM-DD')}
captured_via: voice
transcription_confidence: high
---

${text}
`;

        await this.app.vault.create(filePath, content);
        new Notice(`✅ Voice note created: ${fileName}`);
    }
}
```

#### Option B: Local Whisper (Privacy-First, Free)
**Pros**: Free, private, offline, open-source
**Cons**: Slower (2-5x real-time), requires GPU for speed

```python
# Python script: voice_capture_local.py
# Uses: whisper (OpenAI's open-source model)

import whisper
import sounddevice as sd
import numpy as np
import scipy.io.wavfile as wav
from datetime import datetime
import os

VAULT_PATH = r"C:\Users\YourName\Documents\ObsidianVault"
INBOX_PATH = os.path.join(VAULT_PATH, "+Inbox")
SAMPLE_RATE = 16000

def record_audio(duration=60):
    """Record audio from microphone"""
    print("🎤 Recording... (speak now)")
    recording = sd.rec(
        int(duration * SAMPLE_RATE),
        samplerate=SAMPLE_RATE,
        channels=1,
        dtype='int16'
    )
    sd.wait()
    print("✅ Recording complete. Transcribing...")
    return recording

def transcribe_local(audio_data):
    """Transcribe using local Whisper model"""
    # Load model (base = 74M params, medium = 769M, large = 1550M)
    model = whisper.load_model("base")  # or "medium" for better accuracy

    # Save temp audio file
    temp_file = "temp_recording.wav"
    wav.write(temp_file, SAMPLE_RATE, audio_data)

    # Transcribe
    result = model.transcribe(
        temp_file,
        language="en",  # or "cs" for Czech
        task="transcribe",
        fp16=False  # Set True if you have NVIDIA GPU
    )

    # Cleanup
    os.remove(temp_file)

    return result["text"]

def create_note(text):
    """Create Obsidian note from transcription"""
    timestamp = datetime.now().strftime("%Y-%m-%d %H-%M-%S")
    filename = f"Voice Note {timestamp}.md"
    filepath = os.path.join(INBOX_PATH, filename)

    content = f"""---
title: "Voice Note {timestamp}"
type: atomic
status: 📥inbox
created: {datetime.now().strftime("%Y-%m-%d")}
captured_via: voice-local
transcription_model: whisper-base
---

{text}
"""

    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)

    print(f"✅ Note created: {filename}")
    return filepath

if __name__ == "__main__":
    # Record for 60 seconds (or until silence detected)
    audio = record_audio(duration=60)

    # Transcribe locally
    text = transcribe_local(audio)
    print(f"\n📝 Transcription:\n{text}\n")

    # Create Obsidian note
    create_note(text)
```

**Setup Instructions:**
```bash
# Install dependencies
pip install openai-whisper sounddevice scipy numpy

# Download Whisper model (one-time, ~140MB for base model)
python -c "import whisper; whisper.load_model('base')"

# Run voice capture
python voice_capture_local.py
```

#### Option C: Mobile Voice Capture (iOS Shortcuts)
**Best for**: Quick mobile capture while walking, driving, etc.

```
iOS Shortcut: "Quick Voice Note"

1. Start Dictation
2. Set Variable: transcription = Dictation Result
3. Get Current Date (format: YYYY-MM-DD HH:mm:ss)
4. Text:
   ---
   title: "Voice Note [Current Date]"
   type: atomic
   status: 📥inbox
   created: [Current Date]
   captured_via: ios-shortcut
   ---

   [transcription]
5. Save File to iCloud/Obsidian/+Inbox/
6. Show Notification: "✅ Voice note saved"
```

**Android Equivalent**: Tasker + Google Speech-to-Text + Obsidian folder sync

---

### Feature 2: Web Clipper with Auto-Summarization

#### Use Case
"I'm reading a 5,000-word article about AI ethics. I click the browser extension, and it saves a 200-word summary + key quotes + source link to my vault."

#### Implementation

```javascript
// Browser extension: origin-web-clipper
// manifest.json
{
  "name": "Origin Web Clipper",
  "version": "2.0.0",
  "manifest_version": 3,
  "permissions": ["activeTab", "storage"],
  "action": {
    "default_popup": "popup.html",
    "default_icon": "icon.png"
  },
  "background": {
    "service_worker": "background.js"
  }
}

// background.js
chrome.action.onClicked.addListener(async (tab) => {
    // Extract page content
    const content = await chrome.scripting.executeScript({
        target: { tabId: tab.id },
        function: extractPageContent
    });

    // Summarize using local LLM (Ollama API)
    const summary = await summarize(content[0].result);

    // Save to Obsidian vault
    await saveToVault(summary, tab.url, tab.title);
});

function extractPageContent() {
    // Readability.js-style extraction
    const article = new Readability(document.cloneNode(true)).parse();
    return {
        title: article.title,
        content: article.textContent,
        excerpt: article.excerpt,
        byline: article.byline,
        length: article.length
    };
}

async function summarize(article) {
    // Call local Ollama API (privacy-first)
    const response = await fetch('http://localhost:11434/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            model: 'llama3.3',
            prompt: `Summarize this article in 200 words, extract 3 key quotes, and identify main topics:

Title: ${article.title}
Content: ${article.content}

Format:
## Summary
[200-word summary]

## Key Quotes
- "[quote 1]"
- "[quote 2]"
- "[quote 3]"

## Topics
- Topic 1
- Topic 2
- Topic 3`,
            stream: false
        })
    });

    const result = await response.json();
    return result.response;
}

async function saveToVault(summary, url, title) {
    const timestamp = new Date().toISOString().split('T')[0];
    const filename = `Web Clip - ${title.substring(0, 50)} - ${timestamp}.md`;

    const content = `---
title: "${title}"
type: source
status: 📥inbox
created: ${timestamp}
source_url: ${url}
captured_via: web-clipper
---

⬆️:: [[04-Sources]]
🔗 Source: [${title}](${url})

${summary}

---
#📚source #🌐web-clip
`;

    // Save via Obsidian Local REST API plugin
    await fetch('http://localhost:27124/vault/+Inbox/' + filename, {
        method: 'PUT',
        headers: {
            'Content-Type': 'text/markdown',
            'Authorization': 'Bearer YOUR_OBSIDIAN_API_KEY'
        },
        body: content
    });

    chrome.notifications.create({
        type: 'basic',
        iconUrl: 'icon.png',
        title: 'Web Clip Saved',
        message: `Saved: ${title}`
    });
}
```

**Setup Requirements:**
1. Install Obsidian plugin: "Local REST API"
2. Install Ollama (for local LLM): https://ollama.ai
3. Install browser extension (Chrome/Firefox/Edge)

---

### Feature 3: Email-to-Vault Integration

#### Use Case
"Important email arrives. I forward it to `vault@mydomain.com` and it automatically becomes a note with sender, subject, and content extracted."

#### Implementation Options

**Option A: Zapier/Make.com Integration**
```
Trigger: New Email in Gmail (filter: to:vault@mydomain.com)
↓
Action: Extract email metadata (sender, subject, date, body)
↓
Action: HTTP POST to Obsidian Local REST API
↓
Result: Note created in +Inbox
```

**Option B: Python Email Parser (Self-Hosted)**
```python
# email_to_vault.py
import imaplib
import email
from email.header import decode_header
import os
from datetime import datetime

IMAP_SERVER = "imap.gmail.com"
EMAIL = "your_email@gmail.com"
PASSWORD = "your_app_password"
VAULT_PATH = r"C:\Users\YourName\Documents\ObsidianVault\+Inbox"

def connect_to_email():
    """Connect to email server"""
    mail = imaplib.IMAP4_SSL(IMAP_SERVER)
    mail.login(EMAIL, PASSWORD)
    mail.select("inbox")
    return mail

def fetch_unread_emails(mail):
    """Fetch emails with subject containing [VAULT]"""
    status, messages = mail.search(None, '(UNSEEN SUBJECT "[VAULT]")')
    email_ids = messages[0].split()
    return email_ids

def parse_email(mail, email_id):
    """Parse email content"""
    status, msg_data = mail.fetch(email_id, "(RFC822)")
    msg = email.message_from_bytes(msg_data[0][1])

    # Decode subject
    subject = decode_header(msg["Subject"])[0][0]
    if isinstance(subject, bytes):
        subject = subject.decode()

    # Get sender
    sender = msg.get("From")
    date = msg.get("Date")

    # Get body
    body = ""
    if msg.is_multipart():
        for part in msg.walk():
            if part.get_content_type() == "text/plain":
                body = part.get_payload(decode=True).decode()
                break
    else:
        body = msg.get_payload(decode=True).decode()

    return {
        "subject": subject.replace("[VAULT]", "").strip(),
        "sender": sender,
        "date": date,
        "body": body
    }

def create_note_from_email(email_data):
    """Create Obsidian note from email"""
    timestamp = datetime.now().strftime("%Y-%m-%d")
    safe_subject = "".join(c for c in email_data["subject"] if c.isalnum() or c in (' ', '-', '_')).strip()
    filename = f"Email - {safe_subject[:50]} - {timestamp}.md"
    filepath = os.path.join(VAULT_PATH, filename)

    content = f"""---
title: "{email_data['subject']}"
type: source
status: 📥inbox
created: {timestamp}
sender: {email_data['sender']}
captured_via: email
---

⬆️:: [[04-Sources]]
📧 From: {email_data['sender']}
📅 Date: {email_data['date']}

---

{email_data['body']}

---
#📧email #📥inbox
"""

    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)

    print(f"✅ Email saved: {filename}")

def main():
    mail = connect_to_email()
    email_ids = fetch_unread_emails(mail)

    for email_id in email_ids:
        email_data = parse_email(mail, email_id)
        create_note_from_email(email_data)
        # Mark as read
        mail.store(email_id, '+FLAGS', '\\Seen')

    mail.close()
    mail.logout()

if __name__ == "__main__":
    # Run every 5 minutes via cron/Task Scheduler
    main()
```

**Cron Setup (Linux/Mac):**
```bash
# Run every 5 minutes
*/5 * * * * /usr/bin/python3 /path/to/email_to_vault.py
```

**Task Scheduler (Windows):**
```
Trigger: Every 5 minutes
Action: python.exe C:\path\to\email_to_vault.py
```

---

### Feature 4: Mobile Quick Capture App

#### Design Specs
- **Launch time**: < 1 second
- **Capture methods**: Voice, text, photo, location
- **Offline support**: Queue notes, sync when online
- **Widgets**: iOS/Android home screen quick capture

#### Tech Stack Options
1. **React Native** (cross-platform, single codebase)
2. **Flutter** (beautiful UI, fast performance)
3. **Native** (Swift for iOS, Kotlin for Android - best performance)

#### Minimal Viable Feature Set
```
✅ Voice capture (tap & hold button, release to save)
✅ Text quick capture (single text field + save button)
✅ Photo capture (camera + auto-OCR)
✅ Location tagging (GPS coordinates)
✅ Offline queue (sync when network available)
✅ Widget (1-tap voice capture from home screen)
```

*(Full mobile app implementation beyond scope - could be Phase 4 focus)*

---

### Feature 5: Wearable Data Import

#### Apple Health / Google Fit Integration
**Data to capture:**
- Steps, active minutes, heart rate
- Sleep duration and quality
- Weight, body fat, blood pressure
- Workouts, calories burned
- Mindfulness/meditation minutes

#### Implementation
```python
# health_data_import.py
# For Apple Health: export Health Data (XML) and parse

import xml.etree.ElementTree as ET
import os
from datetime import datetime

VAULT_PATH = r"C:\Users\YourName\Documents\ObsidianVault\02-Dots\Health"

def parse_apple_health_export(xml_file):
    """Parse Apple Health export.xml"""
    tree = ET.parse(xml_file)
    root = tree.getroot()

    health_data = {}

    for record in root.findall('Record'):
        record_type = record.get('type')
        date = record.get('startDate')[:10]  # YYYY-MM-DD
        value = record.get('value')

        if date not in health_data:
            health_data[date] = {}

        # Simplify type names
        type_map = {
            'HKQuantityTypeIdentifierStepCount': 'steps',
            'HKQuantityTypeIdentifierDistanceWalkingRunning': 'distance_km',
            'HKQuantityTypeIdentifierActiveEnergyBurned': 'calories',
            'HKQuantityTypeIdentifierHeartRate': 'heart_rate',
            # Add more as needed
        }

        simple_type = type_map.get(record_type, record_type)
        health_data[date][simple_type] = value

    return health_data

def create_daily_health_notes(health_data):
    """Create/update daily notes with health data"""
    for date, metrics in health_data.items():
        filepath = os.path.join(VAULT_PATH, f"Health Log {date}.md")

        content = f"""---
title: "Health Log {date}"
type: atomic
status: 🔄active
created: {date}
tags:
  - 🧬health
  - 📊metrics
  - 📅daily
---

## Health Metrics - {date}

### Activity
- **Steps**: {metrics.get('steps', 'N/A')}
- **Distance**: {metrics.get('distance_km', 'N/A')} km
- **Calories**: {metrics.get('calories', 'N/A')} kcal

### Vitals
- **Heart Rate**: {metrics.get('heart_rate', 'N/A')} bpm
- **Weight**: {metrics.get('weight', 'N/A')} kg

### Notes
<!-- Add manual observations here -->

---
⬆️:: [[02-Dots/Health]]
"""

        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)

        print(f"✅ Health note created: {date}")

# Usage
health_data = parse_apple_health_export("export.xml")
create_daily_health_notes(health_data)
```

---

## Summary: Milestone 2.1 Deliverables

| Feature | Implementation | Effort | Priority |
|---------|----------------|--------|----------|
| Voice-to-Note | Whisper API or Local | 2 weeks | 🔴 Critical |
| Web Clipper | Browser extension + Ollama | 2 weeks | 🔴 Critical |
| Email-to-Vault | Python script + cron | 1 week | 🟡 High |
| Mobile App | React Native (MVP) | 4 weeks | 🟢 Medium |
| Health Data | XML parser | 1 week | 🟢 Medium |

**Total Timeline**: 6-8 weeks (with 1 developer)

---

# 🏷️ Milestone 2.2: Auto-Organization (Month 9-10)

## Goal
**Reduce manual tagging/filing from 10 min/day to 2 min/day (80% automation)**

---

## Feature 1: AI Auto-Tagging System

### Architecture
```
New Note Created
    ↓
Read Note Content
    ↓
Send to Local LLM (Ollama)
    ↓
Classify: type, status, tags, priority, energy
    ↓
Update Note YAML Frontmatter
    ↓
Trigger Auto Note Mover (existing plugin)
    ↓
Note Filed Automatically
```

### Implementation: Obsidian Plugin

```typescript
// File: auto-tagger-plugin/main.ts

import { Plugin, TFile, Notice } from 'obsidian';

interface AutoTaggerSettings {
    ollamaUrl: string;
    ollamaModel: string;
    enableAutoTag: boolean;
    confidenceThreshold: number;
}

const DEFAULT_SETTINGS: AutoTaggerSettings = {
    ollamaUrl: 'http://localhost:11434',
    ollamaModel: 'llama3.3',
    enableAutoTag: true,
    confidenceThreshold: 0.7
}

export default class AutoTaggerPlugin extends Plugin {
    settings: AutoTaggerSettings;

    async onload() {
        await this.loadSettings();

        // Auto-tag new notes
        this.registerEvent(
            this.app.vault.on('create', async (file) => {
                if (file instanceof TFile && file.extension === 'md') {
                    await this.autoTagNote(file);
                }
            })
        );

        // Manual command for existing notes
        this.addCommand({
            id: 'auto-tag-current-note',
            name: 'Auto-tag current note',
            callback: async () => {
                const activeFile = this.app.workspace.getActiveFile();
                if (activeFile) {
                    await this.autoTagNote(activeFile);
                }
            }
        });
    }

    async autoTagNote(file: TFile) {
        if (!this.settings.enableAutoTag) return;

        // Read note content
        const content = await this.app.vault.read(file);

        // Skip if already has comprehensive tags
        if (this.hasCompleteTags(content)) {
            return;
        }

        // Call LLM for classification
        const tags = await this.classifyContent(content);

        // Update frontmatter
        await this.updateFrontmatter(file, tags);

        new Notice(`✅ Auto-tagged: ${file.basename}`);
    }

    hasCompleteTags(content: string): boolean {
        // Check if YAML has all required fields
        const yamlMatch = content.match(/^---\n([\s\S]*?)\n---/);
        if (!yamlMatch) return false;

        const yaml = yamlMatch[1];
        const requiredFields = ['type', 'status', 'tags'];

        return requiredFields.every(field => yaml.includes(`${field}:`));
    }

    async classifyContent(content: string): Promise<any> {
        const prompt = `Analyze this Obsidian note and suggest metadata. Return ONLY valid JSON.

Note content:
${content.substring(0, 2000)} // Limit to first 2000 chars

Return JSON format:
{
  "type": "atomic|project|source|moc|meeting|area",
  "status": "📥inbox|🔄active|⏳waiting|✅completed|📦archived",
  "tags": ["#tag1", "#tag2", "#tag3"],
  "priority": "high|medium|low",
  "energy": "high|medium|low",
  "maturity": "📤seed|🌱seedling|🪴sapling|🌲evergreen|🍓fruit",
  "confidence": 0.95
}

Rules:
- type: "atomic" for ideas/notes, "project" for efforts, "source" for external content, "moc" for indexes
- status: "📥inbox" for new/unprocessed, "🔄active" for in-progress, "✅completed" for done
- tags: max 5, use emojis (#💡idea, #🚀project, #📚source, #🧬health, #💼work, etc.)
- priority: based on urgency/importance
- energy: estimate cognitive load (high=deep work, low=quick task)
- maturity: "📤seed" for new ideas, "🌲evergreen" for refined knowledge
- confidence: 0.0-1.0 (how sure you are about classification)`;

        try {
            const response = await fetch(`${this.settings.ollamaUrl}/api/generate`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    model: this.settings.ollamaModel,
                    prompt: prompt,
                    stream: false,
                    format: 'json'
                })
            });

            const result = await response.json();
            const classification = JSON.parse(result.response);

            // Only use if confidence is high enough
            if (classification.confidence < this.settings.confidenceThreshold) {
                console.log('Low confidence classification, skipping');
                return null;
            }

            return classification;
        } catch (error) {
            console.error('Auto-tagging failed:', error);
            new Notice('⚠️ Auto-tagging failed. Check Ollama connection.');
            return null;
        }
    }

    async updateFrontmatter(file: TFile, tags: any) {
        if (!tags) return;

        const content = await this.app.vault.read(file);
        let newContent = content;

        // Check if frontmatter exists
        const yamlMatch = content.match(/^---\n([\s\S]*?)\n---/);

        if (yamlMatch) {
            // Update existing frontmatter
            let yaml = yamlMatch[1];

            // Add/update fields
            yaml = this.updateYamlField(yaml, 'type', tags.type);
            yaml = this.updateYamlField(yaml, 'status', tags.status);
            yaml = this.updateYamlField(yaml, 'priority', tags.priority);
            yaml = this.updateYamlField(yaml, 'energy', tags.energy);
            yaml = this.updateYamlField(yaml, 'maturity', tags.maturity);
            yaml = this.updateYamlField(yaml, 'ai_confidence', tags.confidence.toFixed(2));

            // Add tags (merge with existing)
            if (tags.tags && tags.tags.length > 0) {
                const existingTags = this.extractYamlField(yaml, 'tags');
                const allTags = [...new Set([...existingTags, ...tags.tags])];
                yaml = this.updateYamlField(yaml, 'tags', allTags, true);
            }

            newContent = content.replace(/^---\n[\s\S]*?\n---/, `---\n${yaml}\n---`);
        } else {
            // Create new frontmatter
            const timestamp = new Date().toISOString().split('T')[0];
            const frontmatter = `---
title: "${file.basename}"
type: ${tags.type}
status: ${tags.status}
created: ${timestamp}
priority: ${tags.priority}
energy: ${tags.energy}
maturity: ${tags.maturity}
ai_confidence: ${tags.confidence.toFixed(2)}
tags:
${tags.tags.map(tag => `  - ${tag}`).join('\n')}
---

`;
            newContent = frontmatter + content;
        }

        await this.app.vault.modify(file, newContent);
    }

    updateYamlField(yaml: string, field: string, value: any, isArray = false): string {
        const regex = new RegExp(`^${field}:.*$`, 'm');

        let newValue;
        if (isArray && Array.isArray(value)) {
            newValue = `${field}:\n${value.map(v => `  - ${v}`).join('\n')}`;
        } else {
            newValue = `${field}: ${value}`;
        }

        if (regex.test(yaml)) {
            return yaml.replace(regex, newValue);
        } else {
            return yaml + `\n${newValue}`;
        }
    }

    extractYamlField(yaml: string, field: string): string[] {
        const match = yaml.match(new RegExp(`${field}:\\s*\\[([^\\]]+)\\]`));
        if (match) {
            return match[1].split(',').map(s => s.trim());
        }
        return [];
    }

    async loadSettings() {
        this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
    }

    async saveSettings() {
        await this.saveData(this.settings);
    }
}
```

---

### Feature 2: Smart Folder Routing

**Leverages existing plugin**: Auto Note Mover
**Enhancement**: AI-generated tags automatically trigger folder moves

```yaml
# Auto Note Mover settings (enhanced)
# File: .obsidian/plugins/auto-note-mover/data.json

{
  "trigger": "tag",
  "rules": [
    {
      "tag": "#💡idea",
      "folder": "02-Dots/Ideas"
    },
    {
      "tag": "#🚀project",
      "folder": "03-Efforts/On"
    },
    {
      "tag": "#📚source",
      "folder": "04-Sources"
    },
    {
      "tag": "#🤝meeting",
      "folder": "02-Dots/Meetings"
    },
    {
      "tag": "#👤contact",
      "folder": "02-Dots/People"
    },
    {
      "tag": "#🧬health",
      "folder": "02-Dots/Health"
    },
    {
      "tag": "#💰finance",
      "folder": "02-Dots/Financial"
    },
    {
      "status": "✅completed",
      "folder": "06-Archive/Completed"
    },
    {
      "status": "📦archived",
      "folder": "06-Archive"
    }
  ]
}
```

---

### Feature 3: Duplicate Detection & Merging

#### Implementation
```python
# duplicate_detector.py
# Uses sentence-transformers for semantic similarity

from sentence_transformers import SentenceTransformer
import os
import numpy as np
from sklearn.metrics.pairwise import cosine_similarity

VAULT_PATH = r"C:\Users\YourName\Documents\ObsidianVault"
SIMILARITY_THRESHOLD = 0.85  # 85% similar = duplicate

# Load model (one-time download ~400MB)
model = SentenceTransformer('all-MiniLM-L6-v2')

def get_all_notes():
    """Get all markdown files in vault"""
    notes = []
    for root, dirs, files in os.walk(VAULT_PATH):
        for file in files:
            if file.endswith('.md'):
                filepath = os.path.join(root, file)
                with open(filepath, 'r', encoding='utf-8') as f:
                    content = f.read()
                notes.append({
                    'path': filepath,
                    'content': content,
                    'title': file
                })
    return notes

def find_duplicates(notes):
    """Find semantically similar notes"""
    # Generate embeddings
    print(f"Analyzing {len(notes)} notes...")
    contents = [note['content'][:1000] for note in notes]  # First 1000 chars
    embeddings = model.encode(contents, show_progress_bar=True)

    # Calculate similarity matrix
    similarities = cosine_similarity(embeddings)

    # Find duplicates
    duplicates = []
    for i in range(len(notes)):
        for j in range(i + 1, len(notes)):
            if similarities[i][j] > SIMILARITY_THRESHOLD:
                duplicates.append({
                    'note1': notes[i]['title'],
                    'note2': notes[j]['title'],
                    'similarity': similarities[i][j],
                    'path1': notes[i]['path'],
                    'path2': notes[j]['path']
                })

    return duplicates

def create_duplicate_report(duplicates):
    """Create Obsidian note with duplicate findings"""
    timestamp = datetime.now().strftime("%Y-%m-%d")
    report_path = os.path.join(VAULT_PATH, "00-Meta", f"Duplicate Report {timestamp}.md")

    content = f"""---
title: "Duplicate Detection Report"
created: {timestamp}
type: moc
status: 🔄active
tags:
  - 🧹maintenance
  - 📊report
---

# Duplicate Notes Found: {len(duplicates)}

"""

    for dup in duplicates:
        content += f"""
## {dup['note1']} ↔️ {dup['note2']}
**Similarity**: {dup['similarity']:.1%}

- [[{dup['path1'].replace(VAULT_PATH, '').replace('.md', '')}|Note 1]]
- [[{dup['path2'].replace(VAULT_PATH, '').replace('.md', '')}|Note 2]]

**Action**: [ ] Review and merge

---
"""

    with open(report_path, 'w', encoding='utf-8') as f:
        f.write(content)

    print(f"✅ Duplicate report created: {report_path}")

# Run monthly
notes = get_all_notes()
duplicates = find_duplicates(notes)
if duplicates:
    create_duplicate_report(duplicates)
else:
    print("✅ No duplicates found!")
```

---

## Summary: Milestone 2.2 Deliverables

| Feature | Technology | Effort | Accuracy Target |
|---------|------------|--------|-----------------|
| Auto-Tagging | Ollama + Llama 3.3 | 3 weeks | 80%+ |
| Smart Routing | Auto Note Mover (existing) | 1 week | 95%+ |
| Duplicate Detection | Sentence Transformers | 2 weeks | 85%+ similarity |
| Metadata Auto-Complete | LLM inference | 1 week | 75%+ |

**Total Timeline**: 6-7 weeks

---

# 💡 Milestone 2.3: Knowledge Synthesis (Month 11-12)

## Goal
**Generate insights automatically: weekly summaries, monthly patterns, yearly wisdom**

---

## Feature 1: Weekly Insight Generation

### Use Case
"Every Sunday evening, I get a note with:
- Top 5 themes from this week's notes
- Connections I missed between ideas
- Progress on active projects
- Forgotten tasks or notes I should revisit"

### Implementation

```python
# weekly_insight_generator.py

import os
from datetime import datetime, timedelta
from sentence_transformers import SentenceTransformer
from sklearn.cluster import KMeans
import ollama

VAULT_PATH = r"C:\Users\YourName\Documents\ObsidianVault"

def get_this_weeks_notes():
    """Get all notes created in the last 7 days"""
    one_week_ago = datetime.now() - timedelta(days=7)
    notes = []

    for root, dirs, files in os.walk(VAULT_PATH):
        for file in files:
            if file.endswith('.md'):
                filepath = os.path.join(root, file)
                created_time = datetime.fromtimestamp(os.path.getctime(filepath))

                if created_time > one_week_ago:
                    with open(filepath, 'r', encoding='utf-8') as f:
                        content = f.read()
                    notes.append({
                        'title': file.replace('.md', ''),
                        'content': content,
                        'created': created_time
                    })

    return notes

def extract_themes(notes):
    """Use clustering to find recurring themes"""
    if len(notes) < 3:
        return []

    model = SentenceTransformer('all-MiniLM-L6-v2')
    contents = [note['content'][:500] for note in notes]
    embeddings = model.encode(contents)

    # Cluster into 5 themes (or fewer if not enough notes)
    n_clusters = min(5, len(notes) // 2)
    kmeans = KMeans(n_clusters=n_clusters, random_state=42)
    clusters = kmeans.fit_predict(embeddings)

    # Group notes by cluster
    themes = {}
    for i, cluster in enumerate(clusters):
        if cluster not in themes:
            themes[cluster] = []
        themes[cluster].append(notes[i]['title'])

    return themes

def generate_insights_with_llm(notes, themes):
    """Use LLM to synthesize insights"""
    notes_summary = "\n".join([
        f"- {note['title']} (created {note['created'].strftime('%Y-%m-%d')})"
        for note in notes[:20]  # Limit to 20 most recent
    ])

    themes_summary = "\n".join([
        f"Theme {i+1}: {', '.join(note_titles)}"
        for i, note_titles in themes.items()
    ])

    prompt = f"""You are a personal knowledge management assistant. Analyze this week's notes and generate insights.

This week's notes ({len(notes)} total):
{notes_summary}

Identified themes:
{themes_summary}

Generate a weekly insight report with:
1. **Top 3 Themes**: What were the main focus areas this week?
2. **Connections**: What unexpected connections exist between ideas?
3. **Progress**: What progress was made on ongoing projects/efforts?
4. **Gaps**: What questions remain unanswered or topics to explore further?
5. **Action Items**: What should be prioritized next week?

Be specific, reference actual note titles, and provide actionable insights.
"""

    response = ollama.generate(
        model='llama3.3',
        prompt=prompt
    )

    return response['response']

def create_weekly_insight_note(insights, notes):
    """Create Obsidian note with insights"""
    week_number = datetime.now().isocalendar()[1]
    year = datetime.now().year
    filename = f"Weekly Insights - Week {week_number} {year}.md"
    filepath = os.path.join(VAULT_PATH, "05-Calendar", "Reviews", filename)

    content = f"""---
title: "Weekly Insights - Week {week_number} {year}"
type: moc
status: 🔄active
created: {datetime.now().strftime('%Y-%m-%d')}
tags:
  - 📊insights
  - 📅weekly
  - 🧠synthesis
generated_by: ai
note_count: {len(notes)}
---

⬆️:: [[05-Calendar]]

# Weekly Insights - Week {week_number}, {year}

> AI-generated synthesis of this week's knowledge work ({len(notes)} notes analyzed)

---

{insights}

---

## This Week's Notes ({len(notes)})

```dataview
TABLE type, status, tags
FROM ""
WHERE created >= date(now) - dur(7 days)
SORT created DESC
```

---

#📊insights #🤖ai-generated #📅weekly
"""

    os.makedirs(os.path.dirname(filepath), exist_ok=True)
    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)

    print(f"✅ Weekly insights created: {filename}")

# Run every Sunday at 8 PM (via cron/Task Scheduler)
if __name__ == "__main__":
    notes = get_this_weeks_notes()
    if notes:
        themes = extract_themes(notes)
        insights = generate_insights_with_llm(notes, themes)
        create_weekly_insight_note(insights, notes)
    else:
        print("No notes created this week.")
```

**Cron Setup (run every Sunday 8 PM):**
```bash
0 20 * * 0 /usr/bin/python3 /path/to/weekly_insight_generator.py
```

---

## Feature 2: Monthly Pattern Recognition

### Implementation Sketch
```python
# monthly_pattern_analyzer.py

# Similar structure to weekly, but looks back 30 days
# Patterns to detect:
- Recurring topics (what do you keep writing about?)
- Emotional patterns (sentiment analysis across notes)
- Energy cycles (when are you most productive?)
- Relationship mentions (who are you interacting with?)
- Health correlations (mood vs sleep vs exercise)

# Output: "Monthly Patterns - January 2026" note
```

---

## Feature 3: Yearly Wisdom Distillation

### Implementation Sketch
```python
# yearly_wisdom_extractor.py

# Runs once per year (December 31st)
# Analyzes ALL notes from the past year
# Extracts:
- Top 10 lessons learned
- Major life events/transitions
- Personal growth areas
- Relationships strengthened/lost
- Skills acquired
- Books/media that influenced you
- Beliefs that changed
- Goals achieved/failed

# Output: "Yearly Wisdom - 2026" note (becomes part of Decade Reviews)
```

---

## Summary: Milestone 2.3 Deliverables

| Feature | Frequency | Technology | Effort |
|---------|-----------|------------|--------|
| Weekly Insights | Every Sunday | Clustering + LLM | 2 weeks |
| Monthly Patterns | 1st of month | Time-series analysis + LLM | 2 weeks |
| Yearly Wisdom | Dec 31st | Comprehensive LLM analysis | 2 weeks |
| Knowledge Gaps | Monthly | Graph analysis | 1 week |

**Total Timeline**: 6-7 weeks

---

# 🛠️ Technology Stack Summary

## Core Components

| Component | Technology | Purpose | Cost |
|-----------|------------|---------|------|
| **Local LLM** | Ollama + Llama 3.3 70B | All AI tasks | Free |
| **Voice Transcription** | Whisper (local) | Voice-to-text | Free |
| **Embeddings** | sentence-transformers | Semantic search, duplicates | Free |
| **Web Scraping** | Readability.js | Web clipper content extraction | Free |
| **Obsidian Plugins** | TypeScript | Auto-tagging, integrations | Free |
| **Python Scripts** | Python 3.11+ | Batch processing, automation | Free |
| **Task Scheduling** | Cron (Linux/Mac) or Task Scheduler (Windows) | Run scripts periodically | Free |

## Hardware Requirements

### Minimum (Basic functionality)
- **CPU**: Modern Intel i5 or AMD Ryzen 5
- **RAM**: 16 GB
- **Storage**: 50 GB free (for models and data)
- **GPU**: Optional (CPU inference works, just slower)

### Recommended (Smooth experience)
- **CPU**: Intel i7/i9 or AMD Ryzen 7/9
- **RAM**: 32 GB
- **Storage**: 100 GB SSD
- **GPU**: NVIDIA RTX 3060 or better (for fast AI inference)

### Optimal (Best performance)
- **CPU**: Apple M2/M3 or AMD Ryzen 9
- **RAM**: 64 GB
- **Storage**: 500 GB NVMe SSD
- **GPU**: NVIDIA RTX 4070 or Apple Silicon (Metal acceleration)

---

# 📋 Implementation Checklist

## Prerequisites
- [ ] Obsidian 1.4.0+ installed
- [ ] Python 3.11+ installed
- [ ] Node.js 18+ installed (for plugin development)
- [ ] Git installed (for version control)
- [ ] 50+ GB free disk space

## Month 7-8: Smart Capture
- [ ] Install Ollama
- [ ] Download Llama 3.3 model (`ollama pull llama3.3`)
- [ ] Install Whisper for voice transcription
- [ ] Build voice capture plugin (or use existing + script)
- [ ] Build web clipper browser extension
- [ ] Set up email-to-vault forwarding
- [ ] Test mobile quick capture (Shortcuts/Tasker)
- [ ] Configure health data import (Apple Health/Google Fit)

## Month 9-10: Auto-Organization
- [ ] Develop auto-tagging Obsidian plugin
- [ ] Configure Auto Note Mover rules
- [ ] Set up duplicate detection script (monthly cron)
- [ ] Build metadata auto-completion system
- [ ] Test auto-organization on 100+ notes
- [ ] Measure accuracy (target: 80%+ for tags)

## Month 11-12: Knowledge Synthesis
- [ ] Build weekly insight generator script
- [ ] Build monthly pattern analyzer script
- [ ] Build yearly wisdom extractor script
- [ ] Set up cron jobs (weekly Sunday, monthly 1st, yearly Dec 31)
- [ ] Test synthesis on historical data
- [ ] Review first AI-generated insights for quality

## Final Testing & Deployment
- [ ] Run Phase 2 on personal vault for 1 month
- [ ] Measure time savings (target: 50% reduction in manual work)
- [ ] Document setup process for community
- [ ] Create video tutorial for each feature
- [ ] Release Phase 2 plugins to Obsidian community
- [ ] Gather user feedback and iterate

---

# 🎯 Success Metrics

## Quantitative

| Metric | Baseline (v1.8.0) | Phase 2 Target | How to Measure |
|--------|-------------------|----------------|----------------|
| **Capture Time** | 30 sec/note | 5 sec/note | Stopwatch test (20 notes) |
| **Auto-Tag Accuracy** | 0% (manual) | 80%+ | Manual review of 100 auto-tagged notes |
| **Manual Organization Time** | 10 min/day | 2 min/day | Weekly time tracking |
| **Insights Generated** | 0/week | 1/week (automatic) | Count insight notes |
| **Duplicate Rate** | Unknown | < 2% | Duplicate detection report |
| **Mobile Capture Rate** | Low (friction) | High (effortless) | User survey |

## Qualitative

**User Experience Goals:**
- ✅ "I can capture ideas while walking without breaking flow"
- ✅ "I don't think about tagging anymore—it just happens"
- ✅ "Weekly insights surprise me with connections I missed"
- ✅ "I trust the AI's classifications 80% of the time"
- ✅ "My vault feels alive and intelligent"

---

# 🚧 Risks & Mitigations

## Risk 1: AI Accuracy < 80%
**Mitigation**:
- Start with conservative classification (only high-confidence tags)
- Allow manual override (easy edit button)
- Fine-tune prompts based on user vault
- Collect feedback and retrain

## Risk 2: Performance Issues (slow AI inference)
**Mitigation**:
- Use quantized models (4-bit Llama 3.3 = 10x faster)
- Batch process notes (not real-time for older notes)
- Cache embeddings (avoid recomputation)
- Offer cloud API option for users without GPU

## Risk 3: Privacy Concerns (local LLM still risky?)
**Mitigation**:
- Emphasize 100% local processing (no cloud)
- Open-source all code (auditable)
- Redaction tools (sensitive data never processed)
- Option to disable AI features entirely

## Risk 4: Complexity Overload
**Mitigation**:
- Make AI features opt-in (not forced)
- Progressive disclosure (simple → advanced)
- Sensible defaults (works without configuration)
- Clear documentation and tutorials

---

# 🔮 Beyond Phase 2

## Phase 2.5 Enhancements (Optional)
- **Proactive Reminders**: "You haven't updated your Health Log in 5 days"
- **Relationship Intelligence**: "It's been 3 months since you talked to [Friend]"
- **Goal Tracking**: AI checks progress on declared goals
- **Contradiction Detection**: "You said X in 2024 but Y in 2025—belief evolution?"
- **Semantic Graph**: Visual knowledge graph (Neo4j integration)

## Integration with Phase 3 (Resilience)
- AI-generated summaries included in archival exports
- Insights preserved in Legacy Vault
- Weekly/monthly/yearly wisdom becomes core of Decade Reviews

---

# 📚 Resources

## Learning Materials
- **Ollama Docs**: https://ollama.ai/docs
- **Whisper AI**: https://github.com/openai/whisper
- **Sentence Transformers**: https://www.sbert.net
- **Obsidian Plugin Dev**: https://docs.obsidian.md/Plugins/Getting+started
- **LangChain** (advanced AI workflows): https://python.langchain.com

## Example Vaults
- LYT Kit (Nick Milo): https://www.linkingyourthinking.com
- PARA Vault (Tiago Forte): https://fortelabs.com/blog/para

## Communities
- Obsidian Discord (AI channel)
- r/ObsidianMD (AI automation posts)
- r/LocalLLaMA (local AI models)

---

# 🎯 Next Actions

## For You (Vault Owner)
1. **Review this guide** and pick 1-2 features to start with
2. **Install Ollama** and test local LLM (30 minutes)
3. **Prototype voice capture** (1 hour to test Whisper)
4. **Run duplicate detection** on existing vault (see what you find)
5. **Set expectations**: Phase 2 is 6 months of work—pace yourself!

## For Contributors
1. **Claim a feature** (voice capture, auto-tagging, web clipper, etc.)
2. **Fork the repo** and start building
3. **Share progress** in Discord/GitHub Discussions
4. **Test on multiple vaults** (not just yours)
5. **Document everything** (future you will thank you)

---

> **Remember**: The goal isn't perfection—it's 80% automation. The remaining 20% should still be manual (your human judgment matters).

**Let's make Origin intelligent together.** 🧠✨

---

⬇️:: [[🗺️ROADMAP - Origin v2.0 Lifetime Vault]] | [[README]]

*Last updated: 2025-12-31*
*Status: 🌱 Seedling - Ready for prototyping*
*Estimated effort: 6 months (1 developer) or 3 months (team of 2-3)*