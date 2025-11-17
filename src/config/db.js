import Database from 'better-sqlite3'
import path from 'path'
import { fileURLToPath } from 'url'
import config from './config.js'  // Import config

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Use DATABASE_URL from config
let dbPath

if (path.isAbsolute(config.databaseUrl)) {
	// Absolute path (production with volume mount)
	dbPath = config.databaseUrl
} else {
	// Relative path (development) __dirname is current directory (in this case, config)
	dbPath = path.join(__dirname, '../../', config.databaseUrl)
}

console.log(`📊 Database path: ${dbPath}`)

// Create/connect to database
const db = new Database(dbPath)

// Enable foreign keys
db.pragma('foreign_keys = ON')

// Initialize database tables
export const initializeDatabase = async () => {
	console.log('🔧 Initializing database...')
	
	// Import models
	const User = (await import('../models/User.js')).default
	const Book = (await import('../models/Book.js')).default
	const Movie = (await import('../models/Movie.js')).default
	const Song = (await import('../models/Song.js')).default
	const VideoGame = (await import('../models/VideoGame.js')).default
	
	// Create tables
	User.createTable()
	Book.createTable()
	Movie.createTable()
	Song.createTable()
	VideoGame.createTable()
	
	// Only seed in development
	if (config.isDevelopment()) {
		User.seed()
		Book.seed()
		Movie.seed()
		Song.seed()
		VideoGame.seed()
	}
	
	console.log('✅ Database initialization complete')
}

// // graceful shutdown
// export function shutdown() {
// 	console.log('Closing DB connection...');
// 	db.close();
// 	console.log('DB closed. Exiting.');
// 	process.exit(0);
// }


export default db