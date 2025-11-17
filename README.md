# Rest API Application

## ⚠️ This repository is a continuation of the 'rest-api-app' repository. It contains the addition of the frontend side of the project. This REST API application utilizes the MVC architectural design pattern that separates an app into three parts **M**odels, **V**iew, and **C**ontrollers.

### This application uses *SQLite* as database management system, *Node.js* for JS backend programming, and *Express.js* for routing and controller abstraction.

## Features

* CRUD operations for multiple resources: Users, Books, Movies, Songs, Video Games
* Organized structure: Models, Services, Controllers, Routes
* SQLite database using better-sqlite3
* Environment configuration with dotenv
* Simple logging middleware
* Fully modular and ready for extension

# Tech Stack
- Node.js (v18+ recommended)
- Express.js (v5)
- SQLite (via better-sqlite3)
- Nodemon for development
- dotenv for environment variables


## Installation

1. Clone the repository

```bash
  git clone https://github.com/your-username/rest-api-app.git
  cd rest-api-app
```
2. Install dependencies
```bash
  npm install
```
3. Set up environmental variables
Create a .env file in the root directory
```ini
# Server port
PORT=3000

# Generate JWT token for authentification
# node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
JWT_SECRET='default-secret-change-in-production'

# Database URL
# Example for SQLite:
# DATABASE_URL="file:./data/db.sqlite"
# Example for PostgreSQL:
# DATABASE_URL="postgresql://user:password@localhost:5432/mydb"
DATABASE_URL='./db.sqlite'

# Node environment (development, production, test)
NODE_ENV='development'
```
> Don't forget to define your API key. The key name should be `x-api-key` or `authorization`.


## Project Structure
```bash
API/
├── src/
│   ├── config/
│   │   ├── config.js          ← Centralized config
│   │   └── db.js              ← Updated to use config
│   ├── controllers/
│   │   └── bookController.js
│   │   └── movieController.js
│   │   └── songController.js
│   │   └── userController.js
│   │   └── videoGameController.js
│   ├── middleware/
│   │   ├── apiKey.js          ← API key validation
│   │   └── log.js
│   ├── models/
│   │   └── Book.js
│   │   └── Movie.js
│   │   └── Song.js
│   │   └── User.js
│   │   └── VideoGame.js
│   ├── routes/
│   │   └── bookRoutes.js
│   │   └── movieRoutes.js
│   │   └── songRoutes.js
│   │   └── userRoutes.js
│   │   └── videoGameRoutes.js
│   ├── services/
│   │   └── bookService.js
│   │   └── movieService.js
│   │   └── songService.js
│   │   └── userService.js
│   │   └── videoGameService.js
│   └── index.js               ← Updated to use config
│
├── .env                       ← To be created by installer after clone
├── .env.example               ← .env template for installers
├── .gitignore                 ← Includes .env, node_modules/
├── db.sqlite
├── package.json
└── README.md
```


## Architecture Flow
```md
┌─────────────────────────────────────────────────┐
│                   REQUEST                       │
│            GET, POST, PUT, DELETE               │
└─────────────────┬───────────────────────────────┘
                  │
                  ▼
┌─────────────────────────────────────────────────┐
│                  ROUTES                         │
│            (routes/)                            │
│  - Maps endpoints to controller functions       │
└─────────────────┬───────────────────────────────┘
                  │
                  ▼
┌─────────────────────────────────────────────────┐
│               CONTROLLERS                       │
│          (controllers/)                         │
│  - Handles HTTP (req, res, status codes)        │
│  - Calls service layer                          │
└─────────────────┬───────────────────────────────┘
                  │
                  ▼
┌─────────────────────────────────────────────────┐
│                SERVICES                         │
│           (services/)                           │
│  - Business logic & validation                  │
│  - Calls model layer                            │
└─────────────────┬───────────────────────────────┘
                  │
                  ▼
┌─────────────────────────────────────────────────┐
│                 MODELS                          │
│             (models/)                           │
│  - Database schema & operations                 │
│  - SQL queries                                  │
└─────────────────┬───────────────────────────────┘
                  │
                  ▼
┌─────────────────────────────────────────────────┐
│               DATABASE                          │
│            (database.sqlite)                    │
│  - Actual data storage                          │
└─────────────────────────────────────────────────┘
```


## Acknowledgements
[Prof. Martin Pedraza](https://github.com/lostmart/)

## License

[ISC](https://choosealicense.com/licenses/isc/)

