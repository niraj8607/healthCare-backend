# 🏥 Healthcare Backend API

A **secure and scalable RESTful API** for a healthcare management system built with **Node.js**, **Express**, **MongoDB (Mongoose)**, and **JWT Authentication**.  
This backend allows users to register/login, manage patients, doctors, and assign doctors to patients.

---

## 🚀 Features

- 🔐 **JWT Authentication** (login/register with password hashing using bcrypt)
- 👨‍⚕️ **Doctor Management** (CRUD operations)
- 🧑‍🤝‍🧑 **Patient Management** (CRUD operations, linked to the authenticated user)
- 🔗 **Patient-Doctor Mapping** (assign doctors to patients)
- 🛡️ **Secure Endpoints** (protected routes using auth middleware)
- 📦 **MongoDB + Mongoose ORM**
- ⚡ **Express Validator** for request validation
- 🌐 **CORS + Helmet + Morgan** for security & logging

---

## 📂 Project Structure

healthcare-backend/
├── config/ # Database connection
├── controllers/ # Route handlers
├── middleware/ # Auth & error handling
├── models/ # Mongoose schemas
├── routes/ # API route definitions
├── utils/ # Validators
├── .env.example # Example environment variables
├── server.js # Entry point
└── package.json


---

## 🛠️ Tech Stack

- **Backend Framework**: [Express.js](https://expressjs.com/)
- **Database**: [MongoDB](https://www.mongodb.com/) with [Mongoose](https://mongoosejs.com/)
- **Authentication**: [JWT](https://jwt.io/) with [bcryptjs](https://www.npmjs.com/package/bcryptjs)
- **Validation**: [express-validator](https://express-validator.github.io/)
- **Security**: [Helmet](https://helmetjs.github.io/), [CORS](https://www.npmjs.com/package/cors)
- **Logging**: [Morgan](https://www.npmjs.com/package/morgan)
- **Environment Config**: [dotenv](https://www.npmjs.com/package/dotenv)

---

## ⚙️ Installation & Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/healthcare-backend.git
   cd healthcare-backend
Install dependencies

bash
Copy code
npm install
Configure environment variables

Copy .env.example to .env and update values:

ini
Copy code
PORT=5000
MONGODB_URI=mongodb://localhost:27017/healthcare_db
JWT_SECRET=your_super_secret_key
JWT_EXPIRES_IN=7d
Start the server

bash
Copy code
npm run dev   # development (nodemon)
npm start     # production
API is live at
👉 http://localhost:5000

📡 API Endpoints
🔑 Authentication
Method	Endpoint	Description
POST	/api/auth/register	Register a new user
POST	/api/auth/login	Login & get JWT

🧑 Patients
Method	Endpoint	Description
POST	/api/patients/	Add new patient (auth required)
GET	/api/patients/	Get all patients of logged-in user (auth required)
GET	/api/patients/:id	Get specific patient (auth required)
PUT	/api/patients/:id	Update patient (auth required)
DELETE	/api/patients/:id	Delete patient (auth required)

👨‍⚕️ Doctors
Method	Endpoint	Description
POST	/api/doctors/	Add new doctor (auth required)
GET	/api/doctors/	Get all doctors (public)
GET	/api/doctors/:id	Get specific doctor (public)
PUT	/api/doctors/:id	Update doctor (auth required)
DELETE	/api/doctors/:id	Delete doctor (auth required)

🔗 Patient-Doctor Mappings
Method	Endpoint	Description
POST	/api/mappings/	Assign doctor to patient (auth required)
GET	/api/mappings/	Get all mappings (auth required)
GET	/api/mappings/:patientId	Get all doctors for a patient (auth required)
DELETE	/api/mappings/:id	Remove doctor from patient (auth required)

🧪 Example Usage (Postman)
1️⃣ Register
http
Copy code
POST /api/auth/register
Content-Type: application/json
{
  "name": "Alice",
  "email": "alice@example.com",
  "password": "password123"
}
2️⃣ Login
http
Copy code
POST /api/auth/login
Content-Type: application/json
{
  "email": "alice@example.com",
  "password": "password123"
}
Response:

json
Copy code
{
  "token": "jwt_token_here",
  "user": {
    "id": "64xxxx",
    "name": "Alice",
    "email": "alice@example.com"
  }
}
Use Authorization: Bearer <token> in headers for authenticated requests.

🛡️ Security Best Practices
🔒 Store JWT secret in .env

🔐 Always use HTTPS in production

⚡ Use role-based access control (RBAC) if extending system

🗄️ Sanitize & validate all input with express-validator

⚠️ Enable CORS restrictions for trusted domains only

📈 Future Enhancements
🩺 Role-based users (Admin, Doctor, Patient)

📑 Pagination & filtering for large patient/doctor datasets

🔔 Notifications when doctor assigned

🧪 Unit & integration tests with Jest + Supertest

☁️ Deployment guides (Docker, Render, Railway, etc.)

🤝 Contributing
Contributions are welcome! 🎉

Fork the repo

Create a feature branch: git checkout -b feature-name

Commit changes: git commit -m "Added new feature"

Push branch: git push origin feature-name

Open a Pull Request 🚀

📜 License
This project is licensed under the MIT License.

👨‍💻 Author
Made with ❤️ by Your Name
🌐 GitHub: niraj8607
📧 Email: kumarniraj8607@gmail.com