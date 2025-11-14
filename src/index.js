import express from "express"
import logMiddleware from "./middleware/log.js"
import { getAllUsers, getUserById, createUser } from "./controllers/userController.js"
import userRoutes from "./routes/userRoutes.js"

const app = express()
const PORT=5000

// Global middleware (applies to all routes)
app.use(express.json())  // Without JSON parsing, req.body would be undefined

// Mount the user router at /users; now, /users is base path
app.use('/users', userRoutes)

// Welcome controller of root route
app.get('/', (req, res) => 
    res.json({ 
        message: "Welcome to the API",
        endpoints: {
            users: "/users"
        }
    })
)


app.listen(PORT, () => {
	console.log(`Server is running on http://localhost:${PORT}`)
	console.log(`API Documentation:`)
	console.log(`  GET    /users      - Get all users`)
	console.log(`  GET    /users/:id  - Get user by ID`)
	console.log(`  POST   /users      - Create new user`)
	console.log(`  PUT    /users/:id  - Update user`)
	console.log(`  DELETE /users/:id  - Delete user`)
})