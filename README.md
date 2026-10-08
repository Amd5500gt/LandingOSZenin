# Zenin OS 2.0

> A deterministic Android productivity system designed to turn your
> available time, tasks, habits, and daily routine into a clear,
> executable schedule.

[![Platform](https://img.shields.io/badge/Platform-Android-green)](https://www.android.com/)
[![Android](https://img.shields.io/badge/Android-Java-orange)](https://developer.android.com/)
[![Backend](https://img.shields.io/badge/Backend-Node.js%20%2B%20TypeScript-blue)](https://nodejs.org/)
[![Database](https://img.shields.io/badge/Database-MongoDB-green)](https://www.mongodb.com/)
[![Status](https://img.shields.io/badge/Status-Production%20Ready-success)](https://zo.n11hub.in/)

## 🌐 Official Website

https://zo.n11hub.in/

## ✨ Overview

Zenin OS is a native Android productivity system focused on
**deterministic scheduling instead of AI-generated routines**.

The scheduler uses the user's real data, including:

-   Daily routine and wake/sleep times
-   Task names and order
-   Task priority
-   Task duration and workload
-   Available work windows
-   Habits
-   Dependencies
-   Deadlines
-   Completion history

Zenin OS does not require an external LLM or AI API for its scheduling
engine.

## 🚀 Features

### 📅 Deterministic Daily Scheduler

The scheduling engine respects:

-   User-defined work windows
-   Actual productive capacity
-   Task priority
-   User task order
-   Estimated or user-defined duration
-   Dependencies
-   Deadlines
-   Multiple work windows
-   Task segmentation
-   Completed-task protection

It does not inject fake productivity routines or filler tasks.

### 🧩 7-Item Daily Planner

The planner supports:

1.  Morning Wakeup
2.  Task 1
3.  Task 2
4.  Task 3
5.  Task 4
6.  Task 5
7.  Night / Sleep Time

Users can customize task names and routine times. The submitted order is
preserved.

### ✏️ Zenin Adapt

Zenin Adapt is the dedicated schedule editing workspace.

Users can:

-   Edit task names
-   Change start/end times
-   Reorder tasks
-   Add tasks
-   Remove tasks
-   Review duration
-   Submit schedule changes

Changes are validated server-side and synchronized with Home, Events,
Room storage, notifications, and alarms.

### 🏠 Home

Home focuses on the current and upcoming action and shows task time,
status, completion controls, workload, and XP.

### 📆 Events

Events provides a chronological view of real tasks and habits in a
responsive layout.

### ⏰ Notifications & Alarms

Zenin OS uses Android alarm infrastructure to:

-   Schedule task notifications
-   Cancel obsolete alarms
-   Prevent duplicate alarms
-   Suppress expired past-task notifications
-   Recover alarms after device reboot

Hydration reminders are handled separately and do not create fake task
records.

### ⭐ XP & Streaks

Task completion awards priority-based XP with idempotency protection to
prevent duplicate rewards. Completion history is preserved during
schedule changes.

### 💳 Pro

Zenin OS uses a single subscription:

**₹29 / month**

Payment activation is verified server-side using cryptographic signature
verification. Failed or cancelled payments do not activate the schedule.

## 🧠 Scheduling Architecture

``` text
User Data
   │
   ├── Time Windows
   ├── Tasks
   ├── Priority
   ├── Duration
   ├── Dependencies
   ├── Deadlines
   └── History
          │
          ▼
   Workload Evaluation
          │
          ▼
   Priority Ranking
          │
          ▼
   Capacity Calculation
          │
          ▼
   Window Allocation
          │
          ▼
   Segmentation / Overflow
          │
          ▼
   Schedule Validation
          │
          ▼
   Final Schedule
```

Duration estimation follows:

``` text
USER_DEFINED
      ↓
HISTORICAL
      ↓
METADATA
      ↓
SYSTEM_ESTIMATED
```

## 🏗️ Architecture

``` text
Zenin OS
├── zenin-os-app/
│   └── Native Android Java application
│
└── zenin-os-server/
    ├── Node.js
    ├── TypeScript
    ├── Express
    ├── MongoDB
    ├── Scheduler Engine
    ├── Authentication
    └── Payment Verification
```

### Android

-   Native Android Java
-   Android Studio
-   Room Database
-   MVVM-style architecture
-   AlarmManager
-   Notifications
-   Local persistence
-   Theme system

### Backend

-   Node.js
-   TypeScript
-   Express
-   MongoDB
-   Deterministic scheduling engine
-   Authentication
-   Payment verification
-   Schedule synchronization

## 🔒 Security

Security controls include:

-   Authenticated user sessions
-   Tenant isolation
-   User-specific authorization
-   Server-side payment verification
-   HMAC-SHA256 payment signature validation
-   Timing-safe signature comparison
-   No server secrets embedded in the Android APK
-   No MongoDB credentials inside the Android client
-   No Razorpay secret inside the Android client

User identity for protected endpoints is derived from the authenticated
session rather than trusted arbitrary user IDs from requests.

## 🧪 Quality & Verification

The production release candidate was verified with:

``` text
Backend tests:       209 / 209 PASS
TypeScript build:    0 errors
Android compilation: SUCCESS
Android unit tests:  SUCCESS
Release assembly:    SUCCESS
Critical blockers:   0
External LLM deps:   0
```

The QA process covers scheduler edge cases, multiple windows, task
editing, completed-task protection, alarm synchronization, payment
cancellation/failure, duplicate callbacks, tenant isolation, and UI edge
cases.

## 🔄 Schedule Lifecycle

``` text
Configure
    ↓
Build Schedule
    ↓
Preview
    ↓
Customize
    ↓
NEXT
    ↓
Subscription
    ↓
₹29 / month
    ↓
Server Payment Verification
    ↓
Schedule Activation
    ↓
Room Sync
    ↓
Alarm Sync
    ↓
Daily Execution
```

## 🛠️ Development

### Backend

``` bash
cd zenin-os-server
npm install
npm run build
npm test
```

### Android

Open `zenin-os-app` in Android Studio.

Windows:

``` powershell
.\gradlew compileDebugJavaWithJavac
.\gradlew testDebugUnitTest
.\gradlew assembleDebug
```

Linux/macOS:

``` bash
./gradlew compileDebugJavaWithJavac
./gradlew testDebugUnitTest
./gradlew assembleDebug
```

## ⚙️ Environment Variables

Configure production secrets through your deployment platform.

Example:

``` env
MONGODB_URI=
JWT_SECRET=
RAZORPAY_KEY_ID=
RAZORPAY_KEY_SECRET=
```

Never commit real secrets to GitHub.

## 🌍 Website & Download

Official website:

**https://zo.n11hub.in/**

The website provides the Zenin OS introduction and Android APK download
along with SEO metadata, Open Graph metadata, structured data, sitemap,
robots configuration, and a web manifest.

## 🤝 Contributing

Before opening a pull request:

1.  Keep scheduling deterministic.
2.  Do not introduce fake or synthetic tasks.
3.  Do not add external AI dependencies to the scheduler without
    architectural review.
4.  Preserve tenant isolation.
5.  Add tests for scheduler changes.
6.  Verify Android compilation and tests.
7.  Never commit API keys or production secrets.

## 📄 License

Add your preferred license here before publishing the repository.

## Zenin OS

**Plan your time. Execute your tasks. Build consistency.**

🌐 https://zo.n11hub.in/

📱 Android

💰 Pro: ₹29/month
