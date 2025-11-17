import db from "../config/db.js"
// Model (class of DB table)

class Book {
    static tableName = 'books'

    static createTable(){
        const sql = `
            CREATE TABLE IF NOT EXISTS ${this.tableName} (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                title TEXT NOT NULL,
                isbn VARCHAR(20) UNIQUE,
                genre TEXT,
                publication_date DATE DEFAULT (DATE('now'))
            );
        `
        try{
            db.exec(sql)
            console.log(`✅ Table '${this.tableName}' created/verified`)
        } catch (err){
            console.error(err)
        }
    }

    // Get all books
    static getAll() {
        const query = db.prepare(`SELECT * FROM ${this.tableName} ORDER BY id`)
        return query.all()
    }

    // Get book by id
    static getById(id) {
        const stmt = db.prepare(`SELECT * FROM ${this.tableName} WHERE id = ?`)
        return stmt.get(id)  // Used when param binding or running select queries with no params
    }

    // Get book by isbn
	static getByIsbn(isbn) {
		const stmt = db.prepare(`SELECT * FROM ${this.tableName} WHERE isbn = ?`)
		return stmt.get(isbn)
	}
	
	// Create new book
	static create(bookData) {
		const { title, isbn, genre, publication_date } = bookData
		const stmt = db.prepare(`
			INSERT INTO ${this.tableName} (title, isbn, genre, publication_date) 
			VALUES (?, ?, ?, ?)
		`)
        const result = stmt.run(title, isbn || null, genre || null, publication_date)
        return this.getById(result.lastInsertRowid)
	}
	
	// Update book
	static update(id, bookData) {
		const { title, isbn, genre, publication_date } = bookData
		
		// Build dynamic update query based on provided fields
		const updates = []
		const values = []
		
        if (title) {
			updates.push('title = ?')
			values.push(title)
		}

        if (isbn !== undefined) {
			updates.push('isbn = ?')
			values.push(isbn)
		}

		if (genre !== undefined) {
			updates.push('genre = ?')
			values.push(genre)
		}
		
		if (publication_date !== undefined) {
			updates.push('publication_date = ?')
			values.push(publication_date)
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
	
	// Delete book
	static delete(id) {
		const stmt = db.prepare(`DELETE FROM ${this.tableName} WHERE id = ?`)
		const result = stmt.run(id)
		return result.changes > 0
	}
	
	// Check if email exists (excluding a specific book ID)
	static isbnExists(isbn, id = null) {
		let stmt
		if (id) {
			stmt = db.prepare(`SELECT id FROM ${this.tableName} WHERE isbn = ? AND id != ?`)
			return stmt.get(isbn, id) !== undefined
		} else {
			stmt = db.prepare(`SELECT id FROM ${this.tableName} WHERE isbn = ?`)
			return stmt.get(isbn) !== undefined
		}
	}
	
	// Count total Books
	static count() {
		const stmt = db.prepare(`SELECT COUNT(*) as count FROM ${this.tableName}`)
		return stmt.get().count
	}
	
	// Seed sample data for Books
	static seed() {
		const count = this.count();

		if (count === 0) {
			console.log('📝 Seeding books table...');

			const sampleBooks = [
				{ title: 'The Great Gatsby', isbn: '9780743273565', genre: 'Fiction', publication_date: '1925-04-10' },
				{ title: 'To Kill a Mockingbird', isbn: '9780060935467', genre: 'Fiction', publication_date: '1960-07-11' },
				{ title: '1984', isbn: '9780451524935', genre: 'Dystopian', publication_date: '1949-06-08' },
				{ title: 'A Brief History of Time', isbn: '9780553380163', genre: 'Science', publication_date: '1988-03-01' }
			];

			sampleBooks.forEach(book => this.create(book));
			console.log(`✅ Seeded ${sampleBooks.length} books`);
		}
	}

}

export default Book
