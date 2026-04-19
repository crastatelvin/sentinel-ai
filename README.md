<div align="center">

# 🛡️ SENTINEL AI

### A Real-Time AI-Powered Threat Intelligence & Log Analysis Platform

[![Python](https://img.shields.io/badge/Python-3.11%2B-3776AB?style=for-the-badge&logo=python&logoColor=white)](https://www.python.org/)
[![FastAPI](https://img.shields.io/badge/FastAPI-Latest-009688?style=for-the-badge&logo=fastapi&logoColor=white)](https://fastapi.tiangolo.com/)
[![React](https://img.shields.io/badge/React-19.x-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-8.x-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![Gemini](https://img.shields.io/badge/Google_Gemini-Flash-4285F4?style=for-the-badge&logo=google&logoColor=white)](https://ai.google.dev/)
[![SQLite](https://img.shields.io/badge/SQLite-Database-003B57?style=for-the-badge&logo=sqlite&logoColor=white)](https://www.sqlite.org/)
[![License: MIT](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)](LICENSE)

<br/>

> **SENTINEL AI** is a full-stack cybersecurity threat intelligence platform that turns raw server logs into a live, AI-powered security operations center. Upload any Apache, Nginx, or Auth log file and instantly get **real-time threat detection across 7 attack categories**, IP geolocation on a 3D globe, attack chain reconstruction, a Recharts radar and timeline, a scrolling terminal feed — all culminating in a **Gemini AI-generated executive briefing, attack narrative, risk assessment, and a copy-paste-ready remediation playbook**.

<br/>

![7 Threat Categories](https://img.shields.io/badge/7_Attack_Categories-Detected-red?style=for-the-badge) ![WebSocket Live Feed](https://img.shields.io/badge/WebSocket-Live_Feed-00d4ff?style=for-the-badge) ![Gemini AI](https://img.shields.io/badge/Gemini_AI-Briefing_%26_Playbook-orange?style=for-the-badge) ![3D Globe](https://img.shields.io/badge/3D_Globe-IP_Geolocation-brightgreen?style=for-the-badge)

</div>

---

## 📋 Table of Contents

- [Overview](#-overview)
- [Features](#-features)
- [Architecture](#-architecture)
- [Tech Stack](#-tech-stack)
- [Threat Detection Engine](#-threat-detection-engine)
- [AI Analysis Pipeline](#-ai-analysis-pipeline)
- [Dashboard Components](#-dashboard-components)
- [Database Models](#-database-models)
- [Project Structure](#-project-structure)
- [Installation](#-installation)
- [Usage](#-usage)
- [WebSocket Live Feed](#-websocket-live-feed)
- [Sample Logs](#-sample-logs)
- [Configuration](#-configuration)
- [Security Notes](#-security-notes)
- [Contributing](#-contributing)

---

## 🧠 Overview

SENTINEL AI simulates a real-time Security Operations Center (SOC) that any developer or security researcher can run locally. The system ingests raw server log files and runs a multi-stage automated analysis pipeline:

1. **Log Parsing** — Detects Apache, Nginx, and Auth log formats automatically via regex
2. **Threat Detection** — Scans every log entry against 7 threat pattern libraries using regex matching
3. **IP Geolocation** — Concurrently geolocates all unique attacker IPs via the `ip-api.com` API
4. **Attack Chain Reconstruction** — Groups threats by source IP and identifies escalation patterns (e.g., recon → brute force → RCE)
5. **Predictive Alerting** — Rule-based next-attack prediction based on detected category combinations
6. **Gemini AI Deep Analysis** — Generates a structured 4-section security report: Executive Briefing, Attack Narrative, Risk Assessment, and a 5-action Remediation Playbook with exact terminal commands

Throughout this pipeline, every step broadcasts live status updates to the frontend via **WebSocket**, creating a realistic SOC terminal experience.

---

##  🖥️ Application Preview
<br/>
<br/>
<img width="934" height="429" alt="{50A49800-CEEF-4A57-ACD3-8FFB78680AFE}" src="https://github.com/user-attachments/assets/da5710de-6762-45f2-9cae-273061934e13" />
<br/>
<br/>
<img width="932" height="429" alt="{73392775-6AF4-46AE-BC2F-C450998BA59F}" src="https://github.com/user-attachments/assets/0853f0a0-108c-443b-9791-dc97909cd220" />
<br/>
<br/>
<img width="930" height="434" alt="{D9C28621-1A5C-4CC9-8514-8A50633166A6}" src="https://github.com/user-attachments/assets/581d6651-b4b5-4920-ab52-79049ec9a722" />
<br/>
<br/>
<img width="1362" height="636" alt="{68634D08-EEA5-468C-B8D6-943D1FFD1B9D}" src="https://github.com/user-attachments/assets/6b78f2fb-1861-4e91-9ec2-d0b46596f513" />
<br/>
<br/>
<img width="929" height="434" alt="{440F9229-34A9-4364-A768-8B502D624109}" src="https://github.com/user-attachments/assets/0b497439-b595-485e-9333-03467c70f74e" />
<br/>
<br/>
<img width="932" height="449" alt="{58268628-590B-4DBD-B8BC-2C14E3AB6655}" src="https://github.com/user-attachments/assets/233fbd72-4fc0-4053-960b-3ffc3ca687ef" />
<br/>
<br/>
<img width="929" height="419" alt="{4F9E6B07-CE88-4747-BCB7-38B400D9B790}" src="https://github.com/user-attachments/assets/69001126-94bf-443d-b859-4bf09c2951e1" />
<br/>
<br/>

---

## ✨ Features

| Feature | Description |
|---|---|
| 🔍 **7-Category Threat Detection** | Brute Force, SQL Injection, XSS, Path Traversal, Reconnaissance, Command Injection, DDoS — all via regex pattern matching |
| 🌍 **3D Attack Globe** | `react-globe.gl` renders a night-mode Earth with geolocated attack origin points sized by attack count and colored by severity |
| ⛓ **Attack Chain Analysis** | Reconstructs multi-stage attack sequences per IP — identifies recon→bruteforce, bruteforce→RCE, and multi-vector APT patterns |
| 🧠 **Gemini AI Briefing** | 4-section AI report: Executive Summary · Attack Narrative · Risk Assessment · Remediation Playbook with terminal commands |
| 🛡️ **Remediation Playbook** | AI-generated 5-step action plan with one-click copy-to-clipboard terminal commands |
| ◎ **Threat Radar** | Recharts `RadarChart` visualizing attack volume across all 7 categories simultaneously |
| ⟳ **Attack Timeline** | Recharts `AreaChart` showing total vs. critical threat density over the log's time window |
| ▶ **Live Terminal Feed** | Scrolling terminal-style threat log with severity color-coding in JetBrains Mono |
| 📡 **WebSocket Status Bar** | Real-time pipeline progress broadcast from backend to all connected clients |
| 🔐 **JWT Auth System** | bcrypt password hashing + python-jose JWT tokens with 24-hour expiry |
| 🗃️ **SQLite Persistence** | SQLAlchemy ORM models for Users, Threats, and AI Analyses |
| 📊 **Threat Intelligence Table** | Paginated table with severity badge, confidence progress bar, country, and description |

---

## 🏗️ Architecture

```
┌──────────────────────────────────────────────────────────────┐
│                  Browser / React + Vite App                  │
│                                                              │
│  ┌────────────┐   ┌────────────────────────────────────────┐ │
│  │ UploadPage │   │           DashboardPage                │ │
│  │ drag-drop  │   │  StatusBar (WebSocket live messages)   │ │
│  │ log upload │   │                                        │ │
│  └─────┬──────┘   │  ThreatCounter │ GlobeMap │ ThreatRadar│ │
│        │          │  TerminalFeed  │ TimelineChart         │ │
│        │          │  ThreatTable                           │ │
│        │          │  AIBriefing    │ RemediationPanel      │ │
│        │          │  AttackChain                           │ │
│        │          └────────────────────────────────────────┘ │
└────────┼──────────────────────────┬──────────────────────────┘
         │  POST /upload            │  WebSocket /ws
         │  GET /threats            │  (live pipeline events)
         │  GET /chains             │
         │  GET /ai-analysis        │
         │  GET /map-data           │
┌────────▼──────────────────────────▼───────────────────────────┐
│                  FastAPI Backend (main.py)                    │
│                                                               │
│  ┌─────────────────┐  ┌──────────────────────────────────┐    │
│  │  log_parser.py  │  │       threat_detector.py         │    │
│  │  Auto-detect:   │  │  7 pattern libs · regex match    │    │
│  │  Apache/Nginx/  │  │  Severity scoring · confidence   │    │
│  │  Auth/CSV       │  └──────────────────────────────────┘    │
│  └─────────────────┘                                          │
│                                                               │
│  ┌──────────────────────┐  ┌───────────────────────────┐      │
│  │  threat_enricher.py  │  │     attack_chain.py       │      │
│  │  httpx async geo-    │  │  Group by IP · detect     │      │
│  │  location · ip-api   │  │  escalation patterns      │      │
│  └──────────────────────┘  └───────────────────────────┘      │
│                                                               │
│  ┌───────────────────────────────────────────────────────┐    │
│  │               gemini_service.py                       │    │
│  │   analyze_threats() → 4-section structured report     │    │
│  │   predict_next_attack() → rule-based prediction       │    │
│  │   parse_ai_response() → structured dict parser        │    │
│  └───────────────────────────────────────────────────────┘    │
│                                                               │
│  ┌────────────────┐  ┌──────────────┐  ┌────────────────┐     │
│  │  models.py     │  │  auth.py     │  │  database.py   │     │
│  │  User/Threat/  │  │  JWT · bcrypt│  │  SQLite via    │     │
│  │  Analysis ORM  │  │  OAuth2      │  │  SQLAlchemy    │     │
│  └───────┬────────┘  └──────────────┘  └───────┬────────┘     │ 
│          └──────────── SQLAlchemy ORM ──────────┘             │
│                        sentinel.db                            │
└────────────────────────────────────────────────────────────── ┘
```

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| **Frontend** | React 19, Vite 8, Tailwind CSS 4, Framer Motion, Recharts, react-globe.gl, react-markdown, Axios |
| **Backend** | FastAPI, Uvicorn, Python 3.11+ |
| **AI / LLM** | Google Gemini Flash (`gemini-flash-latest`) via `google-genai` SDK |
| **Database** | SQLite via SQLAlchemy ORM |
| **Auth** | python-jose (JWT), passlib (bcrypt), OAuth2PasswordBearer |
| **Geolocation** | ip-api.com via async `httpx` |
| **Real-time** | WebSocket (FastAPI native + browser WebSocket API) |
| **Log Formats** | Apache Combined Log, Nginx Access Log, Linux Auth/syslog, CSV |

---

## 🔬 Threat Detection Engine

`threat_detector.py` scans every parsed log entry against 7 threat categories, each with multiple regex patterns.

| Category | Severity | Patterns Detected |
|---|---|---|
| **Brute Force** | 🔴 Critical | `Failed password`, `authentication failure`, `BREAK-IN ATTEMPT`, `Invalid user` |
| **SQL Injection** | 🔴 Critical | `UNION SELECT`, `OR 1=1`, `DROP TABLE`, `sleep()`, `benchmark()` |
| **Command Injection** | 🔴 Critical | `;ls`, `\|whoami`, `$(...)`, `/bin/bash`, `netcat` |
| **XSS Attack** | 🟠 High | `<script`, `javascript:`, `onerror=`, `alert()`, `%3Cscript` |
| **Path Traversal** | 🟠 High | `../`, `/etc/passwd`, `/etc/shadow`, `boot.ini`, `system32` |
| **DDoS Pattern** | 🟠 High | `flood`, `DoS`, `DDoS` keyword detection |
| **Reconnaissance** | 🟡 Medium | `nikto`, `nmap`, `sqlmap`, `.git/`, `.env`, `wp-admin`, `phpmyadmin` |

Each detected threat carries a **severity score** (Critical=90, High=70, Medium=40, Low=20) and a fixed **85% confidence rating**.

---

## 🤖 AI Analysis Pipeline

`gemini_service.py` sends the top 30 threats plus the full statistical summary to Gemini Flash and parses the structured response into 4 sections.

```python
# gemini_service.py — structured prompt output
def analyze_threats(threats: list, summary: dict) -> dict:
    # Sends: threat count, severity breakdown, category breakdown,
    #        top 5 attacking IPs, and 30-threat detail list
    # Returns parsed dict with 4 keys:
    return {
        "executive_briefing": "...",     # 3-sentence incident report (Markdown)
        "attack_narrative":   "...",     # 4-5 sentence attacker story (Markdown)
        "risk_assessment":    "...",     # CRITICAL/HIGH/MEDIUM/LOW rating + rationale
        "remediation_playbook": [        # 5 actions, each with ACTION + COMMAND
            {"action": "Block IPs", "command": "ufw deny from 45.33.32.156"},
            ...
        ]
    }
```

`predict_next_attack()` runs a rule-based prediction on detected category combinations — if `recon` is present without `brute_force`, it warns of an incoming login attack phase; if `brute_force` + `cmdi` are both found, it escalates to a system compromise warning.

---

## 🖥️ Dashboard Components

| Component | Description |
|---|---|
| `StatusBar` | Top navbar showing live WebSocket messages, threat count, and connection status dot |
| `ThreatCounter` | Large Orbitron-font threat total with animated severity breakdown (Critical/High/Medium/Low) |
| `GlobeMap` | Lazy-loaded `react-globe.gl` 3D earth — attack points sized by count, colored by severity |
| `ThreatRadar` | Recharts `RadarChart` mapping attack volume across all 7 categories |
| `TerminalFeed` | Auto-scrolling terminal log with per-severity color borders in JetBrains Mono |
| `TimelineChart` | Recharts dual-area chart: total threats vs. critical threats over time buckets |
| `ThreatTable` | Paginated table — severity badge, threat type, source IP, country, confidence bar, description |
| `AIBriefing` | 4-section Gemini analysis rendered with `react-markdown`: Briefing · Narrative · Risk · Prediction |
| `RemediationPanel` | Numbered action list with dark terminal blocks and one-click COPY button per command |
| `AttackChain` | Top 5 per-IP attack chains with technique tags, narrative text, attack count, and severity border |

---

## 🗃️ Database Models

### `User`
| Field | Type | Description |
|---|---|---|
| `id` | Integer (PK) | Auto-increment ID |
| `username` | String (unique) | Login identifier |
| `hashed_password` | String | bcrypt-hashed password |

### `Threat`
| Field | Type | Description |
|---|---|---|
| `id` | Integer (PK) | Threat record ID |
| `ip` | String | Source attacker IP |
| `time` | String | Timestamp from log entry |
| `method` / `path` | String | HTTP method and requested path |
| `threat_name` | String | e.g. `SQL Injection`, `Brute Force` |
| `category` | String | e.g. `sqli`, `brute_force`, `recon` |
| `severity` | String | `critical`, `high`, `medium`, `low` |
| `confidence` | Float | Detection confidence score |
| `country` / `lat` / `lng` | String/Float | Geolocation data from ip-api.com |
| `timestamp` | DateTime | Record creation time (UTC) |

### `Analysis`
| Field | Type | Description |
|---|---|---|
| `id` | Integer (PK) | Analysis record ID |
| `executive_briefing` | Text | Gemini executive summary section |
| `attack_narrative` | Text | Gemini attack story section |
| `risk_assessment` | Text | Gemini risk rating section |
| `remediation_playbook` | Text | JSON-stringified list of action/command pairs |
| `timestamp` | DateTime | Analysis creation time (UTC) |

---

## 📁 Project Structure

```
sentinel-ai/
│
├── backend/
│   ├── main.py               # FastAPI app — /upload, /threats, /chains, /ai-analysis, /map-data, /ws
│   ├── log_parser.py         # Auto-detect + parse Apache, Nginx, Auth, and CSV log formats
│   ├── threat_detector.py    # 7-category regex threat engine with severity scoring
│   ├── threat_enricher.py    # Async IP geolocation via ip-api.com (httpx) + globe map data
│   ├── attack_chain.py       # Group threats by IP, detect and label escalation chains
│   ├── gemini_service.py     # Gemini Flash integration — analyze_threats(), predict_next_attack()
│   ├── auth.py               # JWT creation/validation, bcrypt password hashing, OAuth2 scheme
│   ├── database.py           # SQLAlchemy engine + session factory (SQLite: sentinel.db)
│   ├── models.py             # ORM models: User, Threat, Analysis
│   ├── requirements.txt      # Python dependencies
│   ├── .env                  # GEMINI_API_KEY — do not commit
│   └── .env.example          # Environment variable template
│
├── frontend/
│   ├── src/
│   │   ├── App.jsx                    # Root — toggles UploadPage ↔ DashboardPage
│   │   ├── main.jsx                   # React DOM entry point
│   │   ├── pages/
│   │   │   ├── UploadPage.jsx         # Animated drag-drop log upload with Framer Motion
│   │   │   └── DashboardPage.jsx      # Full SOC dashboard — 5 responsive grid rows
│   │   ├── components/
│   │   │   ├── StatusBar.jsx          # Live WebSocket pipeline status + connection dot
│   │   │   ├── ThreatCounter.jsx      # Animated Orbitron threat total + severity cards
│   │   │   ├── GlobeMap.jsx           # Lazy-loaded react-globe.gl 3D attack origin map
│   │   │   ├── ThreatRadar.jsx        # Recharts RadarChart across 7 attack categories
│   │   │   ├── TerminalFeed.jsx       # Auto-scroll terminal threat log (last 80 entries)
│   │   │   ├── TimelineChart.jsx      # Recharts dual AreaChart — total vs. critical threats
│   │   │   ├── ThreatTable.jsx        # Paginated threat intel table (top 20)
│   │   │   ├── AIBriefing.jsx         # Gemini 4-section report with react-markdown
│   │   │   ├── RemediationPanel.jsx   # Copyable terminal command playbook
│   │   │   └── AttackChain.jsx        # Top 5 per-IP attack chain reconstruction cards
│   │   ├── hooks/
│   │   │   └── useWebSocket.js        # WebSocket hook — connects to /ws, buffers 50 messages
│   │   ├── services/
│   │   │   └── api.js                 # Axios wrappers for all REST endpoints
│   │   └── styles/
│   │       └── globals.css            # Dark SOC theme — Orbitron + JetBrains Mono
│   ├── package.json
│   ├── vite.config.js
│   └── tailwind.config.js
│
└── sample_logs/
    ├── sample_apache.log     # 8-entry Apache log with SQLi, XSS, path traversal, recon
    ├── sample_auth.log       # 10-entry SSH auth log with brute force + BREAK-IN ATTEMPT
    └── sample_nginx.log      # 8-entry Nginx log with recon and repeated login attempts
```

---

## 🚀 Installation

### Prerequisites
- Python 3.11+
- Node.js 18+
- A [Google Gemini API key](https://ai.google.dev/)

### 1. Clone the Repository
```bash
git clone https://github.com/crastatelvin/sentinel-ai.git
cd sentinel-ai
```

### 2. Backend Setup
```bash
cd backend
python -m venv venv

# Activate virtual environment
source venv/bin/activate        # Linux / macOS
venv\Scripts\activate           # Windows

pip install -r requirements.txt
```

### 3. Configure Environment
```bash
cp .env.example .env
# Edit .env — set GEMINI_API_KEY=your_key_here
```

### 4. Start the Backend
```bash
uvicorn main:app --reload
```
API + WebSocket server runs at `http://localhost:8000`

### 5. Frontend Setup
```bash
cd ../frontend
npm install
npm run dev
```
Frontend runs at `http://localhost:5173`

---

## 💻 Usage

### Running a Threat Analysis
1. Open the app at `http://localhost:5173`
2. Drag and drop any of the sample log files — or your own Apache, Nginx, or SSH auth log
3. Watch the **StatusBar** display live pipeline events via WebSocket as each stage completes
4. The **Dashboard** auto-populates across all 10 panels once analysis is complete

### Reading the Dashboard
- **ThreatCounter** — total threat count, animated red; severity breakdown by category
- **GlobeMap** — 3D earth with attack origin points; size = volume, color = severity
- **ThreatRadar** — radar chart to identify dominant attack vectors at a glance
- **TerminalFeed** — live-scrolling color-coded log of every detected threat
- **TimelineChart** — area chart showing attack intensity and critical event spikes
- **ThreatTable** — detailed table with confidence progress bars and geo data
- **AIBriefing** — Gemini's full 4-section markdown report with predictive alert
- **RemediationPanel** — click **COPY** on any line to copy the exact terminal command
- **AttackChain** — per-IP escalation narratives (recon→bruteforce, bruteforce→RCE, multi-vector APT)

### Upload a New File
Click **↩ UPLOAD NEW LOG** at the bottom of the dashboard to reset and analyze a new file.

---

## 📡 WebSocket Live Feed

The backend broadcasts real-time status events to all connected clients throughout the analysis pipeline.

```javascript
// frontend/src/hooks/useWebSocket.js
const WS_URL = import.meta.env.VITE_WS_URL || 'ws://localhost:8000/ws';

// Each broadcast has shape: { event: string, message: string }
// Pipeline events in order:
// "parsing" → "parsed" → "detected" → "enriched" → "analyzing" → "complete"
```

The `StatusBar` component subscribes to this hook and animates each new message into the center of the nav bar via `framer-motion`. The hook buffers the last 50 messages in state and tracks `connected` / `disconnected` / `error` socket status.

---

## 📂 Sample Logs

Three ready-to-use log files are included for immediate testing:

| File | Format | Threats Demonstrated |
|---|---|---|
| `sample_auth.log` | Linux SSH / syslog | Brute force, invalid user, BREAK-IN ATTEMPT across 4 source IPs |
| `sample_apache.log` | Apache Combined Log | SQL injection, XSS, path traversal (`/etc/passwd`), recon (`.git/`), command injection |
| `sample_nginx.log` | Nginx Access Log | Reconnaissance (`wp-config.php`), repeated POST login attempts |

> **Tip:** Start with `sample_auth.log` for a clean brute force attack chain, or use `sample_apache.log` for maximum threat variety and multi-technique attack chain reconstruction.

---

## ⚙️ Configuration

```bash
# backend/.env
GEMINI_API_KEY=your_gemini_api_key_here
JWT_SECRET_KEY=your_secure_random_secret   # Override the default
```

```bash
# frontend/.env (create this file)
VITE_API_URL=http://localhost:8000
VITE_WS_URL=ws://localhost:8000/ws
```

---

## 🔒 Security Notes

> This project is built for **educational, research, and demonstration purposes** only.

- The backend uses `allow_origins=["*"]` — restrict to your frontend origin before any public deployment
- The in-memory `store` dict is a single global object — not safe for multi-user or concurrent sessions; use a Redis-backed session store in production
- `JWT_SECRET_KEY` must be replaced with a cryptographically secure random value before deployment
- The `ip-api.com` geolocation endpoint has a rate limit of 45 requests/minute on the free tier — avoid uploading very large log files in rapid succession
- Add `.env` to `.gitignore` to prevent your Gemini API key from being committed

---

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/your-feature`
3. Commit your changes: `git commit -m 'Add your feature'`
4. Push: `git push origin feature/your-feature`
5. Open a Pull Request

**Ideas for improvement:** persistent threat history across sessions, multi-file batch upload, YARA rule support for custom threat patterns, Windows Event Log format parser, export threats as CSV/PDF report, streaming Gemini responses, Redis session store for multi-user deployments, login UI wired to the existing JWT auth system.

---

## 📜 License

Licensed under the **MIT License** — see [LICENSE](LICENSE) for details.

---

<div align="center">

Made with ❤️ by [Crasta Telvin](https://github.com/crastatelvin)

⭐ Star this repo if you find it useful!

</div>
