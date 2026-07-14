# 🚀 Distributed Job Queue System (Real-Time + Scalable + AI-Powered)

> A **production-grade distributed job queue system** with **real-time monitoring dashboard**, **AI-powered failure diagnosis**, and **priority-based scheduling**, built using **Node.js, BullMQ, Redis, WebSockets, and Google Gemini API** — inspired by architectures used at Uber, Zomato, and Amazon.

---

## 📌 Introduction

Modern applications require handling tasks asynchronously (emails, notifications, background processing).
This project demonstrates how to build a **scalable and fault-tolerant job processing system** with:

* ⚡ High-performance queue system
* 🔄 Background workers
* 📊 Real-time dashboard
* 📡 Event-driven architecture
* 🤖 AI-powered failure diagnosis
* 🧠 Priority-based job scheduling

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

<img width="1812" height="820" alt="image" src="https://github.com/user-attachments/assets/4ff67552-6922-4e88-842d-e93708fe0472" />


## ✨ Key Features

### 🔹 Core System Features

* ✅ Distributed job queue using **BullMQ**
* ✅ Background job processing with **Worker service**
* ✅ Redis-based message broker
* ✅ REST API for job management

---

### 🔹 Real-Time Features

* 📡 WebSocket integration using **Socket.IO**
* ⚡ Instant UI updates (No polling)
* 🔔 Live toast notifications

---

### 🔹 Dashboard Features

* 📊 Live metrics (Total, Active, Completed, Failed)
* 📈 Bar + Pie chart analytics
* 📋 Job table with real-time status
* 🧾 Job detail modal
* 🔁 Retry failed jobs

---

### 🔹 Reliability & Security

* 🔄 Retry mechanism with backoff strategy
* ☠️ Dead Letter Queue (DLQ)
* 🛡️ Rate limiting (API protection)
* 🔐 Helmet security middleware
* ✅ Input validation (Joi)

---

### 🔹 🤖 AI-Powered Failure Diagnosis

* 🧠 Integrated **Google Gemini API** to automatically diagnose failed jobs
* 📋 Analyzes job's `failedReason`, `stacktrace`, and `data` to generate:
  - **Root Cause** — plain-English explanation of why the job failed
  - **Error Type** — classification (e.g., network timeout, invalid input, external service failure, code bug)
  - **Suggested Fix** — a concrete next debugging step
  - **Retry Recommendation** — whether the job should be auto-retried or needs manual intervention
* ⚡ Diagnosis results cached in Redis (per job ID) to avoid redundant Gemini API calls
* 🎯 Diagnosis is grounded strictly in actual error data — no speculative/hallucinated causes
* 🖱️ Accessible via a **"Diagnose"** button on failed jobs directly in the dashboard

---

### 🔹 🧠 Priority-Based Job Scheduling

* 🎚️ Jobs can be assigned a priority level at creation: **Critical, High, Normal, Low**
* ⏫ Higher-priority jobs (e.g., password reset emails) are processed before lower-priority ones (e.g., analytics jobs), even if added later
* 🏷️ Priority displayed as a color-coded badge in the Jobs table
* 📌 Populates the previously empty **PRIORITIZED** tab in Bull Board with real, live data
* ✅ Defaults to "Normal" priority if not specified, keeping existing job flows backward-compatible

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
├── server/
│   ├── index.js              # API Server
│   ├── socket.js             # WebSocket setup
│   ├── queue/
│   │   └── queue.js          # BullMQ queue
│   ├── worker/
│   │   └── worker.js         # Job processor
│   ├── config/
│   │   └── redis.js
│   ├── services/
│   │   └── geminiService.js  # AI failure diagnosis logic
│   ├── utils/
│   └── dashboard/
│
├── client/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Metrics.jsx
│   │   │   ├── Charts.jsx
│   │   │   ├── JobTable.jsx
│   │   │   ├── Notification.jsx
│   │   │   ├── DiagnosisModal.jsx
│   │   │   └── ...
│   │   ├── App.jsx
│   │   ├── socket.js
│   │   └── App.css
│
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
* View AI-generated root cause, error type, suggested fix, and retry recommendation

---

## 📊 API Endpoints

| Method | Endpoint             | Description                          |
| ------ | --------------------- | ------------------------------------- |
| GET    | /metrics              | Get system metrics                    |
| GET    | /jobs                 | Fetch all jobs (includes priority)    |
| POST   | /add-job               | Add new job (accepts priority field)  |
| POST   | /retry/:id             | Retry failed job                      |
| POST   | /api/jobs/:id/diagnose | Get AI-powered failure diagnosis      |

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

* ⚡ Throughput calculation (jobs/sec)
* 🔁 Auto retry with exponential backoff
* 🚀 Concurrent worker processing
* 📉 Reduced API calls (WebSocket instead of polling)
* 🧠 Priority-aware job processing order

---

## 🔐 Security & Optimization

* Helmet for secure HTTP headers
* Rate limiting (50 req/min)
* Input validation using Joi
* Efficient Redis usage
* Cached AI diagnosis results to minimize external API cost/latency

---

## 💼 Resume Highlights

* Designed and implemented a **distributed job queue system** using BullMQ and Redis
* Built a **real-time monitoring dashboard** using WebSockets
* Implemented **fault-tolerant retry mechanisms** and dead-letter queue
* Optimized backend using **rate limiting and secure APIs**
* Integrated **Google Gemini API** for AI-powered failure diagnosis, generating root-cause analysis and retry recommendations for failed jobs
* Implemented **priority-based job scheduling** using BullMQ's native priority queue for SLA-critical workloads

---

## 🌟 Future Enhancements

* 🔔 Notification history panel
* 📊 Advanced analytics dashboard
* 📦 Multi-queue support
* ☁️ Docker + AWS deployment
* 🚨 Anomaly detection on failure/throughput spikes
* 📝 AI-generated natural language job creation

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

## 📜 License

MIT License

---

## 👨‍💻 Author

**Rohit Kumar**
🚀 Backend & System Design Enthusiast

---

## ⭐ Support

If you found this project useful:

👉 Star ⭐ the repository
👉 Share with others

---
