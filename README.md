# 🚀 Mini Wellness Booking System (Backend Developer Assessment)

> A complete backend system to manage wellness session bookings for **Members** and **Trainers** with wallet handling, email notifications, cron reminders, and secure authentication.

📄 [Node JS Assignment Marcom.pdf](https://github.com/vivekjais1110/marcom/blob/main/Node%20JS%20Assignment%20Marcom.pdf)

---

## 🔧 Tech Stack

* **Node.js** & **Express.js**
* **MySQL** + **Sequelize ORM**
* **JWT** for secure authentication
* **Nodemailer** for real-time emails
* **Node-Cron** for scheduled email reminders

---

## ✨ Features

### 👥 User Roles

#### 👤 Member

* Register & Login
* View available trainer slots
* Top-up wallet balance
* Book wellness sessions

#### 🧑‍🏫 Trainer

* Register & Login
* Add session slots
* View bookings for their sessions

### 💳 Wallet System

* Wallet auto-created on signup (default ₹0)
* 🔁 Top-up functionality (mock payment)
* 💸 Deduct ₹200 per booking
* ❌ Booking fails if funds are insufficient
* ✅ View wallet balance *(Bonus)*

### 🗓️ Session & Slot Booking

* Book only unreserved slots
* Slot marked as unavailable after booking
* Trainers can check bookings tied to their slots

### 📬 Email Notifications

* ✅ **Real Emails Sent** upon booking confirmation
* Powered by **Nodemailer**

### 🕒 Slot Deadline Reminders *(Bonus)*

* ⚙️ Runs daily via `node-cron`
* Sends reminder email 3 days before slot time

---

## 🎁 Bonus Highlights

* ✅ Real-time Email confirmations with Nodemailer
* ✅ View wallet balance endpoint
* ✅ Pagination in slot listing

---

## ⚙️ Setup & Installation

Ensure you have:

* ✅ Node.js (v12+)
* ✅ MySQL running locally

### 📥 Clone the Repo

```bash
git clone https://github.com/vivekjais1110/marcom.git
```

### 📦 Install Dependencies

```bash
npm install
```

### 🛠️ Environment Variables

Create a `.env` file in the root:

```env
PORT=6000
JWT_SECRET=marcom
SQL_DB=marcom
SQL_USER=root
SQL_PASSWORD=root
SQL_HOST=localhost
SQL_DIALECT=mysql
```

### ▶️ Start Server

```bash
npm start
```

---

## 📂 Project Structure

```
├── controllers
├── routes
├── models
├── middlewares
├── config
├── .env
├── .gitignore
├── node_modules
├── package.json
├── package-lock.json
└── app.js
```

---

## 📡 API Endpoints

### 🧍 User APIs

* `POST /api/v1/register` – Register (Member/Trainer)
* `POST /api/v1/login` – Login & receive JWT

### 💰 Wallet APIs

* `POST /api/v1/topUpWallet` – Add funds
* `GET /api/v1/wallet/view` – 💳 View wallet balance ✅

### 🗓️ Slot APIs

* `POST /api/v1/addSlot` – Trainer adds a new slot ✅
* `GET /api/v1/getAvailableSlots` – View open slots
* `GET /api/v1/getAvailableslots_pagination?page=1&limit=3` – 📚 Paginated slot list ✅

### 📘 Booking APIs

* `POST /api/v1/bookSlot` – Book a session slot
* `GET /api/v1/getTrainerBookings` – Trainer views their bookings

---

## 🔁 Scheduled Jobs

* `node-cron` checks for upcoming slots daily at 10:00 AM
* Sends reminder email for slots happening in next 3 days

---

## 📬 Postman Collection

> Use the following collection to test endpoints:
> [📥 marcom.postman\_collection.json](https://github.com/vivekjais1110/marcom/blob/main/marcom.postman_collection.json)

✅ Includes saved response examples for quick reference!

---

## 📦 Key Dependencies

* `express` – Web server
* `sequelize` – MySQL ORM
* `jsonwebtoken` – Secure auth
* `nodemailer` – Email service
* `node-cron` – Scheduled tasks

---

## 💡 Developer Tips

* Ensure MySQL server is running
* Add your Gmail or Mailtrap credentials in `.env`


---

🧠 **Built with logic, love, and a touch of creativity for the Marcom Backend Assessment.**
