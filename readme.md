# Neurotype

[Neurotype](https://neurotype-prod-frontend.onrender.com) is a modern, full-stack web application designed to help users manage their notes and track emotions.


## Website

https://neurotype-prod-frontend.onrender.com


### Features

- User Authentication: Secure registration and login with Google Sign-In integration.
- Plan Selection: Choose between Lite and Plus plans to access different features.
- Dashboard: Comprehensive overview of user activities, emotion tracking, and data visualization.
- Notes Management: Create, view, and manage personal notes.
- Emotion Tracking: Monitor and analyze emotions over time with detailed charts.
- Data Export: Export your data securely for personal use.
- Chat Support: (Plus Plan) Access AI-driven chat support for enhanced assistance.

### Technologies Used

Frontend:
- React.js
- Tailwind CSS
- Framer Motion
- Vite
- React Icons
- Recharts

Backend:
- FastAPI
- Socket.IO
- Postgres AWS RDS 
- AWS S3 for storage
  
Other Tools:
- Docker & Docker Compose
- Nginx

 ## Project Structure

```bash
├── backend
│   ├── Dockerfile
│   ├── app
│   │   ├── __init__.py
│   │   ├── api
│   │   │   ├── __init__.py
│   │   │   ├── api.py
│   │   │   ├── deps.py
│   │   │   └── endpoints
│   │   │       ├── __init__.py
│   │   │       ├── dashboard.py
│   │   │       ├── data.py
│   │   │       ├── notes.py
│   │   │       ├── recommendations.py
│   │   │       ├── router.py
│   │   │       └── users.py
│   │   ├── core
│   │   │   ├── __init__.py
│   │   │   ├── analysis.py
│   │   │   ├── config.py
│   │   │   ├── s3.py
│   │   │   └── security.py
│   │   ├── db
│   │   │   ├── __init__.py
│   │   │   ├── base.py
│   │   │   ├── base_class.py
│   │   │   ├── init_db.py
│   │   │   └── session.py
│   │   ├── delete_database.py
│   │   ├── initialize_database.py
│   │   ├── main.py
│   │   ├── models
│   │   │   ├── __init__.py
│   │   │   ├── note.py
│   │   │   └── user.py
│   │   ├── schemas
│   │   │   ├── __init__.py
│   │   │   ├── dashboard.py
│   │   │   ├── note.py
│   │   │   └── user.py
│   │   └── services
│   │       ├── __init__.py
│   │       ├── chatbot_service.py
│   │       ├── note_service.py
│   │       └── user_service.py
│   └── requirements.txt
├── docker-compose.yml
├── frontend
│   └── neurotype
│       ├── Dockerfile
│       ├── README.md
│       ├── eslint.config.js
│       ├── index.html
│       ├── nginx.conf
│       ├── package-lock.json
│       ├── package.json
│       ├── postcss.config.js
│       ├── public
│       │   └── vite.svg
│       ├── src
│       │   ├── App.css
│       │   ├── App.jsx
│       │   ├── api
│       │   │   └── axiosInstance.js
│       │   ├── assets
│       │   │   └── react.svg
│       │   ├── components
│       │   │   ├── GoogleLoginButton.jsx
│       │   │   └── PrivateRoute.jsx
│       │   ├── context
│       │   │   └── AuthContext.jsx
│       │   ├── index.css
│       │   ├── main.jsx
│       │   ├── pages
│       │   │   ├── CalendarPage.jsx
│       │   │   ├── ChatPage.jsx
│       │   │   ├── DashboardPage.jsx
│       │   │   ├── DataExportPage.jsx
│       │   │   ├── ExportDataPage.jsx
│       │   │   ├── LandingPage.jsx
│       │   │   ├── LoginPage.jsx
│       │   │   ├── NoteDetailPage.jsx
│       │   │   ├── NotesPage.jsx
│       │   │   ├── ProfilePage.jsx
│       │   │   ├── RecommendationsPage.jsx
│       │   │   ├── RegisterPage.jsx
│       │   │   └── SelectPlanPage.jsx
│       │   └── routes
│       │       └── index.jsx
│       ├── tailwind.config.js
│       └── vite.config.js
└── readme.md
```

# Getting Started

## Requirements

- Docker & Docker Compose
- Node.js
 
## Run Locally

Clone the project

```bash
  git clone https://github.com/isaac-evs/neurotype.git
```

Setup Environment variables

```bash
  cd backend/app
```

(insert variables)
```bash
  touch .env
```

Start the server

(go to root)
```bash
  docker-compose up --build
```

Access the Application:
	•	Frontend: http://localhost:3000
	•	Backend API: http://localhost:8000/docs (Swagger UI)


## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`SECRET_KEY`
`ALGORITHM`
`ACCESS_TOKEN_EXPIRE_MINUTES`
`SQLALCHEMY_DATABASE_URI`

`AWS_ACCESS_KEY_ID`
`AWS_SECRET_ACCESS_KEY`
`AWS_S3_BUCKET_NAME`

`OPENAI_API_KEY`

`GOOGLE_CLIENT_ID`
`GOOGLE_CLIENT_SECRET`






 
