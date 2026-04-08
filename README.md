📌 Project Overview
WorkEase is a full-stack web application that connects users with skilled workers for home services like plumbing, electrical work, and maintenance. It provides a centralized platform where users can request services, workers can complete jobs, and admins can manage everything efficiently.
✨ Features
👤 User
Register & Login
Create service requests
Add problem details, address, phone number
Track booking status
Give feedback after completion
🛠️ Worker
Register with service & phone number
Get approved by admin
View assigned jobs
Access user contact details
Mark work as completed with cost
🧑‍💼 Admin
Approve / Reject workers
View all service requests
Assign workers
View completed work
Access feedback system
Search workers & bookings
🛠️ Tech Stack
Frontend: HTML, CSS, JavaScript
Backend: Node.js, Express.js
Database: MongoDB
Authentication: JWT
🗂️ Project Structure

WorkEase/
│── backend/
│   ├── models/
│   ├── routes/
│   ├── controllers/
│   ├── middleware/
│   └── server.js
│
│── frontend/
│   ├── index.html
│   ├── login.html
│   ├── signup.html
│   ├── admin.html
│   ├── user.html
│   ├── worker.html
│   └── style.css
⚙️ Installation & Setup
🔹 Clone Repository
Bash
git clone https://github.com/karanmal1490/WorkEase.git
cd WorkEase
🔹 Install Dependencies
Bash
npm install
🔹 Run Server
Bash
node server.js
🔐 User Roles
Role
Access
User
Book services
Worker
Complete jobs
Admin
Manage system
🔄 Workflow
User creates service request
Admin assigns worker
Worker completes job
User gives feedback
Admin monitors system