# Rest API Application
### This REST API application...

## Project Structure
```bash

API/
├── node_modules/ # Project dependencies (auto-generated, not in version control)
├── src/ # Source code directory
│ ├── controllers/ # Business logic and request handlers
│ │ └── authController.js # Handles authentication logic
│ │
│ ├── middleware/ # Custom middleware functions
│ │ └── auth.js # JWT verification middleware
│ │ └── validate.js # Input validation middleware
│ │ └── errorHandler.js # Global error handling
│ │
│ ├── models/ # Data models and schemas
│ │ └── User.js # User authentication model
│ │
│ ├── routes/ # API route definitions
│ │ └── studentRoutes.js # Student-related endpoints
│ │ └── authRoutes.js # Authentication endpoints
│ │
│ ├── services/ # Business logic and database operations
│ │ └── authService.js # Authentication services
│ │
│ └── index.js # Main application entry point
│
├── .env # Environment variables (NOT in version control)
├── .gitignore # Specifies files to ignore in version control
├── package-lock.json # Locked versions of dependencies
├── package.json # Project metadata and dependencies
└── README.md # Project documentation
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
