## 🚀 Distributed Job Queue System (Real-Time + Scalable + AI-Powered)

> A **production-grade distributed job queue system** with **real-time monitoring dashboard**, **AI-powered failure diagnosis**, **hybrid local + cloud failure triage**, and **priority-based scheduling**, built using **Node.js, BullMQ, Redis, WebSockets, Google Gemini API, and a fine-tuned local LLM** — inspired by architectures used at Uber, Zomato, and Amazon.

---

## 📌 Introduction

Modern applications require handling tasks asynchronously (emails, notifications, background processing).
This project demonstrates how to build a **scalable and fault-tolerant job processing system** with:

* High-performance queue system
* Background workers
* Real-time dashboard
* Event-driven architecture
* AI-powered failure diagnosis (hybrid: local fine-tuned model + Gemini API fallback)
* Priority-based job scheduling

---

## 🖥️ Admin Dashboard (Bull Board)
Real-time monitoring of job queue including:
- Active jobs
- Completed jobs
- Failed jobs
- Delayed jobs
- Prioritized jobs
- Logs & Error tracking
- <img width="1895" height="951" alt="image" src="https://github.com/user-attachments/assets/18b7d184-6c6a-4be6-819b-c59d9e2d17d2" />


## 📊 User Dashboard
Frontend interface built with React for:
- Adding new jobs (with priority selection)
- Viewing job status
- Analytics & charts
- Retry failed jobs
- AI-powered failure diagnosis
- Queue controls
- <img width="1885" height="964" alt="image" src="https://github.com/user-attachments/assets/00260342-9d98-4fdc-a10b-b552e427600b" />


## 🧠 System Architecture

<p align="center">
  <img src="https://github.com/user-attachments/assets/fdc80e18-cd35-4de8-8fe6-572f8394c968" height="600" width="500" alt="Hybrid AI Architecture">
</p>

## ✨ Key Features

### 🔹 Core System Features

* Distributed job queue using **BullMQ**
* Background job processing with **Worker service**
* Redis-based message broker
* REST API for job management

---

### 🔹 Real-Time Features

* WebSocket integration using **Socket.IO**
* Instant UI updates (No polling)
* Live toast notifications

---

### 🔹 Dashboard Features

* Live metrics (Total, Active, Completed, Failed)
* Bar + Pie chart analytics
* Job table with real-time status
* Job detail modal
* Retry failed jobs

---

### 🔹 Reliability & Security

* Retry mechanism with backoff strategy
* Dead Letter Queue (DLQ)
* Rate limiting (API protection)
* Helmet security middleware
* Input validation (Joi)

---

### 🔹 🤖 AI-Powered Failure Diagnosis

* Integrated **Google Gemini API** to automatically diagnose failed jobs
* Analyzes job's `failedReason`, `stacktrace`, and `data` to generate:
  - **Root Cause** — plain-English explanation of why the job failed
  - **Error Type** — classification (e.g., network timeout, invalid input, external service failure, code bug)
  - **Suggested Fix** — a concrete next debugging step
  - **Retry Recommendation** — whether the job should be auto-retried or needs manual intervention
* Diagnosis results cached in Redis (per job ID) to avoid redundant Gemini API calls
* Diagnosis is grounded strictly in actual error data — no speculative/hallucinated causes
* Accessible via a **"Diagnose"** button on failed jobs directly in the dashboard

---

### 🔹 🧬 Hybrid AI Triage — Fine-Tuned Local Model + Gemini Fallback (New)

* Added a **fine-tuned local LLM (LoRA fine-tuned Phi-3-mini / Llama-3.2-3B)** as a fast, low-cost first-pass classifier for failed jobs
* Hybrid triage router: failures go to the local model first; high-confidence results skip the Gemini API call entirely
* Low confidence or model unavailable → falls through unchanged to the existing Gemini flow, preserving original behavior
* Local model runs in a separate, isolated FastAPI microservice — no changes to existing Node.js services or routes
* Fully controlled by a feature flag (`ENABLE_LOCAL_TRIAGE`) — instantly revert to 100% original Gemini-only behavior
* Logs local-vs-Gemini handling rate, latency, and classification agreement for before/after comparison
* Result: near-zero marginal cost and lower latency for common failures, Gemini still handles the ambiguous ones

---

### 🔹 🧠 Priority-Based Job Scheduling

* Jobs can be assigned a priority level at creation: **Critical, High, Normal, Low**
* Higher-priority jobs (e.g., password reset emails) are processed before lower-priority ones (e.g., analytics jobs), even if added later
* Priority displayed as a color-coded badge in the Jobs table
* Populates the previously empty **PRIORITIZED** tab in Bull Board with real, live data
* Defaults to "Normal" priority if not specified, keeping existing job flows backward-compatible

---

## 🛠️ Tech Stack

### 🔹 Backend

* Node.js
* Express.js
* BullMQ
* Redis
* Socket.IO
* Joi
* Helmet
* Express Rate Limit
* Google Gemini API

### 🔹 AI / ML (New)

* Python
* FastAPI (local model inference microservice)
* Hugging Face `transformers`
* `peft` (LoRA fine-tuning)
* `trl` (SFTTrainer)
* Fine-tuned Phi-3-mini / Llama-3.2-3B

### 🔹 Frontend

* React.js
* Axios
* Chart.js
* Custom CSS UI

---

## 📂 Project Structure

```bash
distributed-job-queue/
│
├── dashboard/                     # Bull Board admin dashboard
├── frontend/                      # React client app
├── logs/
│
├── python-model-service/          # NEW — isolated FastAPI microservice for local fine-tuned model
│   ├── venv/
│   ├── Dockerfile
│   ├── main.py                    # /classify endpoint
│   └── requirements.txt
│
├── server/
│   ├── config/                    # Redis + app config
│   ├── dashboard/
│   │   ├── bullBoard.js
│   │   └── index.js
│   ├── jobs/                      # Job definitions
│   │   ├── emailJob.js
│   │   ├── imageJob.js
│   │   └── reportJob.js
│   ├── logs/
│   ├── node_modules/
│   ├── queue/                     # BullMQ queue setup
│   ├── services/
│   │   ├── triage-router/         # NEW — hybrid local-model + Gemini router
│   │   ├── diagnosisService.js    # Orchestrates hybrid triage → Gemini fallback
│   │   ├── geminiService.js       # AI failure diagnosis logic (unchanged)
│   │   └── queueService.js
│   ├── utils/
│   ├── worker/
│   │   ├── logs/
│   │   ├── clusterWorker.js
│   │   └── worker.js              # Job processor
│   ├── .env
│   ├── docker-compose.yml         # UPDATED — adds python-model-service container only
│   ├── index.js                   # API Server
│   ├── package.json
│   ├── package-lock.json
│   └── socket.js                  # WebSocket setup
│
├── .gitignore
└── README.md
```

---

## ⚙️ Installation & Setup

### 1️⃣ Clone Repository

```bash
git clone https://github.com/your-username/distributed-job-queue.git
cd distributed-job-queue
```

---

### 2️⃣ Backend Setup

```bash
cd server
npm install
```

Create `.env` file:

```env
PORT=5000
REDIS_URL=your_redis_connection_string
GEMINI_API_KEY=your_gemini_api_key

# New — Hybrid AI Triage config
ENABLE_LOCAL_TRIAGE=true
LOCAL_MODEL_SERVICE_URL=http://localhost:8001
LOCAL_TRIAGE_CONFIDENCE_THRESHOLD=0.75
```

Run server + worker:

```bash
npm run dev
```

---

### 3️⃣ Frontend Setup

```bash
cd client
npm install
npm run dev
```

---

### 4️⃣ Local Model Service Setup (New)

```bash
cd python-model-service
pip install -r requirements.txt
uvicorn main:app --reload --port 8001
```

Or run everything together via Docker Compose (existing services unchanged, new service added):

```bash
docker-compose up --build
```

> 💡 Set `ENABLE_LOCAL_TRIAGE=false` in `.env` at any time to disable the local model path entirely and fall back to 100% original Gemini-only diagnosis behavior.

---

## 🚀 Usage Guide

### 🔹 Add Job

* Click **"Add Job"** button
* Select a **priority level** (Critical / High / Normal / Low)
* Job is pushed into Redis queue and processed according to priority

### 🔹 Monitor Jobs

* View live updates in dashboard
* No manual refresh required

### 🔹 Retry Failed Jobs

* Click **Retry** button
* Job reprocessed instantly

### 🔹 Diagnose Failed Jobs

* Click **Diagnose** on any failed job
* Request is routed through the hybrid triage layer: local fine-tuned model attempts classification first, falling back to Gemini automatically if needed
* View AI-generated root cause, error type, suggested fix, retry recommendation, and which path (local model vs. Gemini) produced the result

---

## 📊 API Endpoints

| Method | Endpoint               | Description                                                  |
| ------ | ---------------------- | -------------------------------------------------------------|
| GET    | /metrics                | Get system metrics                                           |
| GET    | /jobs                   | Fetch all jobs (includes priority)                           |
| POST   | /add-job                | Add new job (accepts priority field)                         |
| POST   | /retry/:id              | Retry failed job                                              |
| POST   | /api/jobs/:id/diagnose  | Get AI-powered failure diagnosis (hybrid: local model → Gemini) |
| POST   | /classify (Python service, internal) | Local fine-tuned model classification endpoint  |

---

## 📡 Real-Time Event Flow

```bash
Job Added → Redis Queue → Worker → Process → Emit Event → UI Update
```

Events triggered:

* Job Added
* Job Completed
* Job Failed
* Job Retried

---

## 📈 Performance Features

* Throughput calculation (jobs/sec)
* Auto retry with exponential backoff
* Concurrent worker processing
* Reduced API calls (WebSocket instead of polling)
* Priority-aware job processing order
* Reduced Gemini API calls and diagnosis latency via local fine-tuned model first-pass triage

---

## 🔐 Security & Optimization

* Helmet for secure HTTP headers
* Rate limiting (50 req/min)
* Input validation using Joi
* Efficient Redis usage
* Cached AI diagnosis results to minimize external API cost/latency
* Local model inference isolated in its own microservice to avoid impacting existing Node.js service reliability

---

## 🌟 Future Enhancements

* Notification history panel
* Advanced analytics dashboard
* Multi-queue support
* Docker + AWS deployment
* Anomaly detection on failure/throughput spikes
* AI-generated natural language job creation
* Continual fine-tuning of local model using Gemini fallback results as new training data

---

## 🧪 Testing

You can test APIs using:

* Postman
* Thunder Client (VS Code)

---

## 🤝 Contribution

Contributions are welcome!
Feel free to fork and improve.

---

## 👨‍💻 Author

**Rohit Kumar**
🚀 AI Engineer Enthusiast

---

## ⭐ Support

If you found this project useful:

👉 Star ⭐ the repository
👉 Share with others

---
