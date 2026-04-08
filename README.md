# 🚀 WorkEase

A full-stack web application that connects users with skilled workers for home services like plumbing, electrical work, and maintenance.

---

## 📌 Project Overview
WorkEase provides a centralized platform where:
- Users can request services
- Workers can complete assigned jobs
- Admin manages the entire system

---

## ✨ Features

### 👤 User
- Register & Login
- Create service requests
- Track booking status
- Give feedback after completion

### 🛠 Worker
- Register with service & phone number
- Get approved by admin
- View assigned work
- Access user contact details
- Mark work as completed

### 🧑‍💼 Admin
- Approve / Reject workers
- View all service requests
- Assign workers
- View completed work
- Access feedback system
- Search workers & bookings

---

## 🛠 Tech Stack

- **Frontend:** HTML, CSS, JavaScript  
- **Backend:** Node.js, Express.js  
- **Database:** MongoDB  
- **Authentication:** JWT  

---

## 📁 Project Structure
WorkEase/ │── backend/ │
                       ├── models/ │   
          ├── routes/ │   
          ├── controllers/ │   
          ├── middleware/ │   
          └── server.js │ 
│── frontend/ │   ├── index.html │   ├── login.html │   ├── signup.html │   ├── admin.html │   ├── user.html │   ├── worker.html │   └── style.css

---

## ⚙️ Installation & Setup

```bash
# Clone repository
git clone https://github.com/karanmali490/WorkEase.git

# Go to project folder
cd WorkEase

# Install dependencies
npm install

# Run server
node server.js

🔄 Workflow
User creates service request
Admin assigns worker
Worker completes job
User gives feedback
Admin monitors system

📌 Author
👤 Karan Mali