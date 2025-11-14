# Rest API Application
### This REST API application...

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


# **Easy (Same as Users):**

- Books (title, author, year, genre)
- Movies (title, director, year, rating)
- Songs (title, artist, album, duration)

**Medium (Slightly More Fields):**

- Video Games (title, genre, platform, releaseYear, rating, price)
- Cars (make, model, year, color, price, mileage)
- Restaurants (name, cuisine, location, rating, priceRange)

**Advanced (More difficult !):**

- Products with inventory tracking
- Events with date/time
- Recipes with ingredients (could introduce relationships!) (use Recipes and Ingredients tables)

They allow follow the same concept:
=> ORM Class for each Model (DB table) in the DB => all in the models/ directory

## Complete Architecture Flow Now
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