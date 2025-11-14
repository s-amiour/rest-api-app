# Rest API Application
This application uses SQLite as database management system, Node.js for JS backend programming, and Express.js for routing and controller abstraction.

## Project Structure
```bash
API/
├── src/
│   ├── config/
│   │   ├── config.js          ← Centralized config ✨ NEW
│   │   └── db.js        ← Updated to use config
│   ├── controllers/
│   │   └── userController.js
│   ├── middleware/
│   │   ├── apiKey.js          ← API key validation ✨ NEW
│   │   └── log.js
│   ├── models/
│   │   └── User.js
│   ├── routes/
│   │   └── userRoutes.js
│   ├── services/
│   │   └── userService.js
│   └── index.js               ← Updated to use config
│
├── .env                       ← Your secrets (NOT in Git) ✨ NEW
├── .env.example               ← Template (IN Git) ✨ NEW
├── .gitignore                 ← Includes .env
├── db.sqlite
├── package.json
└── README.md
```

## Complete Architecture Flow
```md
┌─────────────────────────────────────────────────┐
│                   REQUEST                        │
│            GET /users or POST /users             │
└─────────────────┬───────────────────────────────┘
                  │
                  ▼
┌─────────────────────────────────────────────────┐
│                  ROUTES                          │
│            (routes/userRoutes.js)                │
│  - Maps endpoints to controller functions        │
└─────────────────┬───────────────────────────────┘
                  │
                  ▼
┌─────────────────────────────────────────────────┐
│               CONTROLLERS                        │
│          (controllers/userController.js)         │
│  - Handles HTTP (req, res, status codes)         │
│  - Calls service layer                           │
└─────────────────┬───────────────────────────────┘
                  │
                  ▼
┌─────────────────────────────────────────────────┐
│                SERVICES                          │
│           (services/userService.js)              │
│  - Business logic & validation                   │
│  - Calls model layer                             │
└─────────────────┬───────────────────────────────┘
                  │
                  ▼
┌─────────────────────────────────────────────────┐
│                 MODELS                           │
│             (models/User.js)                     │
│  - Database schema & operations                  │
│  - SQL queries                                   │
└─────────────────┬───────────────────────────────┘
                  │
                  ▼
┌─────────────────────────────────────────────────┐
│               DATABASE                           │
│            (database.sqlite)                     │
│  - Actual data storage                           │
└─────────────────────────────────────────────────┘
```
