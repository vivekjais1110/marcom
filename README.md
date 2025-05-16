# Backend Developer Assessment
> This project implements a backend system for managing users and tasks (JWT), using Node.js, Express and MySQL.
- [(Node JS Assignment Marcom.pdf)](https://github.com/vivekjais1110/marcom/blob/main/Node%20JS%20Assignment%20Marcom.pdf)

# Features
- User registration and login.
- JWT-based authentication.
- CRUD operations for tasks.
- MySQL for relational data.
- Task prioritization and status management.
- Pagination and Filter.
- Middleware
- Node Mailer (Real Email Sending)
- Node-Cron for Automatic send mail Notification

### 👤 User Roles

* **Member**

  * Register and log in
  * View available trainer slots
  * Top-up wallet
  * Book sessions

* **Trainer**

  * Register and log in
  * Add available slots
  * View bookings for their slots

### 💳 Wallet System

* Wallet created automatically on signup with ₹0
* **Top-up Wallet** (Mock Payment API)
* Deduct ₹200 when booking a session
* Booking fails if insufficient balance
* **View Wallet Balance** (Optional Bonus ✅)

### 🗓️ Session Booking

* Members can book available slots
* Slots become unavailable once booked
* Trainers can view all bookings for their slots

### 📩 Email Notifications

* **Real Email Confirmation** on booking (Bonus ✅)
* Email sent using `Nodemailer`

### 🕒 Cron Job (Bonus ✅)

* Scheduled job using **node-cron** to send reminders for slots approaching in 3 days

# Bonus Features: 
- Real email integration using `Nodemailer` & View wallet balance. 
- Implement slots deadlines notifications (send an email notification when a slots is nearing 
its date_time). 
- Implement pagination for retrieving the list of slots. 

# Setup and Installation
~ Ensure the following tools are installed on your system:
- Node.js (v12+)
- MySQL server installed.

# Clone the repository:
```sh
git clone https://github.com/vivekjais1110/marcom.git
```
# Install dependencies:
```sh
npm install
```

# Configure environment variables:
Create a .env file in the root directory.
Use the example below or customize as needed:
```sh
PORT=6000
JWT_SECRET=marcom
SQL_DB=marcom
SQL_USER=root
SQL_PASSWORD=root
SQL_HOST=localhost
SQL_DIALECT=mysql
```
# Start the server:
```sh
npm start
```

# Environment Variables
The project uses the following environment variables (found in .env):

- PORT: Port for the backend server.
- JWT_SECRET: Secret for signing JWT tokens.
- SQL_DB, SQL_USER, SQL_PASSWORD, SQL_HOST, SQL_DIALECT: MySQL database configuration.

## 🧪 API Endpoints

### 🧍 User APIs

* `POST /api/v1/register` – Register new user (Member or Trainer)
* `POST /api/v1/login` – User login

### 💰 Wallet APIs

* `POST /api/v1/topUpWallet` – Top-up wallet

### 🗓️ Slot APIs

* `POST /api/v1/addSlot` – Add new slot (Trainer only) ✅
* `GET /api/v1/getAvailableSlots` – Get available slots for members

### 📘 Booking APIs

* `POST /api/v1/bookSlot` – Book a session
* `GET /api/v1/getTrainerBookings` – Trainer can view their bookings

### ✨ Bonus Features

* `GET /api/v1/wallet/view` – View current wallet balance ✅
* `getAvailableslots_pagination` – Pagination based slots filter (e.g, page=1&limit=3)

> NODE MAILER WITH 'node-cron' (send an email or log a notification when a task is nearing its due date)

For full API details, import the provided Postman collection with (save resopnse example) ([marcom.postman_collection.json](https://github.com/vivekjais1110/marcom/blob/main/marcom.postman_collection.json)) into Postman.

# Dependencies
> Major dependencies used in this project include:

- Express: Web framework.
- Sequelize: ORM for MySQL.
- JWT: Token-based authentication.
- Nodemailer: Email sending.
- Node-Cron: slots.
