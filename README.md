# Rest API Application
This application uses SQLite as database management system, Node.js for JS backend programming, and Express.js for routing and controller abstraction.

## Project Structure
```bash
API/
├── src/
│   ├── config/
│   │   ├── config.js          ← Centralized config
│   │   └── db.js              ← Updated to use config
│   ├── controllers/
│   │   └── userController.js
│   ├── middleware/
│   │   ├── apiKey.js          ← API key validation
│   │   └── log.js
│   ├── models/
│   │   └── User.js
│   ├── routes/
│   │   └── userRoutes.js
│   ├── services/
│   │   └── userService.js
│   └── index.js               ← Updated to use config
│
├── .env.example               ← Template (IN Git)
├── .gitignore                 ← Includes .env
├── db.sqlite                  ← created by `src/config/db.js`
├── package.json
└── README.md
```

## Tier Architecture Flow 
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
│            (db.sqlite)                     │
│  - Actual data storage                           │
└─────────────────────────────────────────────────┘
```
