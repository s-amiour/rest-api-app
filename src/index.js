import express from "express"
import cors from "cors"
import config from "./config/config.js"  // import env variables
import { initializeDatabase } from "./config/db.js"
import logMiddleware from "./middleware/log.js"
import { validateApiKey, validateApiKeyProduction } from "./middleware/apiKey.js"  // Import API key middleware
import userRoutes from "./routes/userRoutes.js"
import bookRoutes from "./routes/bookRoutes.js"
import movieRoutes from "./routes/movieRoutes.js"
import songRoutes from "./routes/songRoutes.js"
import videoGameRoutes from "./routes/videoGameRoutes.js"


const app = express()

// Initialize database before starting server
await initializeDatabase()

// Global middleware
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(logMiddleware)

// Enable CORS for all origins
app.use(cors({origin:"https://s-amiour.github.io/rest-api-app-front/"}));

// Public routes (no API key needed)
app.get('/', (req, res) => {
	res.json({ 
		message: "Welcome to the API",
		version: "1.0.0",
		environment: config.nodeEnv,
		endpoints: {
			users: "/users"
		}
	})
})

// Health check (useful for Render)
app.get('/health', (req, res) => {
	res.json({ 
		status: 'OK',
		timestamp: new Date().toISOString(),
		environment: config.nodeEnv
	})
})

// Protected routes (API key required)
// Mount the model router at its route, making it the base url
app.use('/books', validateApiKey, bookRoutes)
app.use('/movies', validateApiKey, movieRoutes)
app.use('/songs', validateApiKey, songRoutes)
app.use('/users', validateApiKey, userRoutes)
app.use('/video-games', validateApiKey, videoGameRoutes)

// Option 2: Only protect in production (easier for development)
// app.use('/books', validateApiKeyProduction, bookRoutes)
// app.use('/movies', validateApiKeyProduction, movieRoutes)
// app.use('/songs', validateApiKeyProduction, songRoutes)
// app.use('/users', validateApiKeyProduction, userRoutes)
// app.use('/video-games', validateApiKeyProduction, videoGameRoutes)

// 404 handler
app.use((req, res) => {
	res.status(404).json({ 
		error: 'Not Found',
		message: `Route ${req.method} ${req.path} not found` 
	})
})

// Error handler
app.use((err, req, res, next) => {
	console.error('Error:', err)
	res.status(err.status || 500).json({
		error: err.message || 'Internal Server Error',
		...(config.isDevelopment() && { stack: err.stack })
	})
})

// Start server
app.listen(config.port, () => {
	console.log(`✅ Server running on http://localhost:${config.port}`)
	console.log(`📊 Environment: ${config.nodeEnv}`)
	console.log(`🔒 API Key protection: ${config.apiKey ? 'ENABLED' : 'DISABLED'}`)
	console.log(`\nAPI Endpoints:`)
	console.log(`  GET    /              - Welcome message (public)`)
	console.log(`  GET    /health        - Health check (public)`)
	console.log(`  GET    /<models>         - Get all models (protected)`)
	console.log(`  GET    /<models>/:id     - Get by model ID (protected)`)
	console.log(`  POST   /<models>         - Create new model (protected)`)
	console.log(`  PUT    /<models>/:id     - Update model (protected)`)
	console.log(`  DELETE /<model>/:id     - Delete model (protected)`)
})

// Close DB connection iff interruption
// process.on('SIGINT', shutdown);
// process.on('SIGTERM', shutdown);

export default app