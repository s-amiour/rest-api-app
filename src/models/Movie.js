import db from "../config/db.js"
// Model (class of DB table)

class Movie {
    static tableName = 'movies'

    static createTable(){
        const sql = `
            CREATE TABLE IF NOT EXISTS ${this.tableName} (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                title TEXT NOT NULL,
                director TEXT NOT NULL,
	            rating TEXT CHECK(rating IN ('G', 'PG', 'PG-13', 'R', 'NC-17'))
            );
        `
        try{
            db.exec(sql)
            console.log(`✅ Table '${this.tableName}' created/verified`)
        } catch (err){
            console.error(err)
        }
    }

    // Get all movies
    static getAll() {
        const query = db.prepare(`SELECT * FROM ${this.tableName} ORDER BY id`)
        return query.all()
    }

    // Get movie by id
    static getById(id) {
        const stmt = db.prepare(`SELECT * FROM ${this.tableName} WHERE id = ?`)
        return stmt.get(id)  // Used when param binding or running select queries with no params
    }
	
	// Create new movie
	static create(movieData) {
		const { title, director, rating } = movieData
		const stmt = db.prepare(`
			INSERT INTO ${this.tableName} (title, director, rating) 
			VALUES (?, ?, ?)
		`)
        const result = stmt.run(title, director, rating || null)
        return this.getById(result.lastInsertRowid)
	}
	
	// Update movie
	static update(id, movieData) {
		const { title, director, rating } = movieData
		
		// Build dynamic update query based on provided fields
		const updates = []
		const values = []
		
        if (title) {
			updates.push('title = ?')
			values.push(title)
		}

        if (director) {
			updates.push('director = ?')
			values.push(director)
		}

		if (rating !== undefined) {
			updates.push('rating = ?')
			values.push(rating)
		}
		
		if (!updates.length) {
		    // nothing to change
			return this.getById(id)
		}
		
		values.push(id)
		
		const stmt = db.prepare(`
			UPDATE ${this.tableName} 
			SET ${updates.join(', ')} 
			WHERE id = ?
		`)
		
		stmt.run(...values)
		return this.getById(id)
	}
	
	// Delete movie
	static delete(id) {
		const stmt = db.prepare(`DELETE FROM ${this.tableName} WHERE id = ?`)
		const result = stmt.run(id)
		return result.changes > 0
	}
	
	// Count total movies
	static count() {
		const stmt = db.prepare(`SELECT COUNT(*) as count FROM ${this.tableName}`)
		return stmt.get().count
	}
	
	// Seed sample data for movies
	static seed() {
		const count = this.count();

		if (count === 0) {
			console.log('📝 Seeding movies table...');

			const sampleMovies = [
				{ title: 'The Great Gatsby', director: 'Baz Luhrmann', rating: 'PG-13' },
				{ title: 'To Kill a Mockingbird', director: 'Robert Mulligan', rating: 'PG' },
				{ title: '1984', director: 'Michael Radford', rating: 'R' },
				{ title: 'A Brief History of Time', director: 'Errol Morris', rating: null } // unrated
			];

			sampleMovies.forEach(movie => this.create(movie));
			console.log(`✅ Seeded ${sampleMovies.length} movies`);
		}
	}
}

export default Movie
