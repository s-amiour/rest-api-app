import db from "../config/db.js"

class VideoGame {
    static tableName = 'video_games'

    static createTable() {
        const sql = `
            CREATE TABLE IF NOT EXISTS ${this.tableName} (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                title TEXT NOT NULL,
                genre TEXT,
                platform TEXT,
                releaseYear INTEGER,
                rating TEXT CHECK(rating IN ('E','E10+','T','M','AO')),
                price REAL
            );
        `
        try {
            db.exec(sql)
            console.log(`✅ Table '${this.tableName}' created/verified`)
        } catch (err) {
            console.error(err)
        }
    }

    static getAll() {
        const query = db.prepare(`SELECT * FROM ${this.tableName} ORDER BY id`)
        return query.all()
    }

    static getById(id) {
        const stmt = db.prepare(`SELECT * FROM ${this.tableName} WHERE id = ?`)
        return stmt.get(id)
    }

    static create(gameData) {
        const { title, genre, platform, releaseYear, rating, price } = gameData
        const stmt = db.prepare(`
            INSERT INTO ${this.tableName} (title, genre, platform, releaseYear, rating, price)
            VALUES (?, ?, ?, ?, ?, ?)
        `)
        const result = stmt.run(
            title,
            genre || null,
            platform || null,
            releaseYear || null,
            rating || null,
            price || null
        )
        return this.getById(result.lastInsertRowid)
    }

    static update(id, gameData) {
        console.log("gameData:", gameData)

        const { title, genre, platform, releaseYear, rating, price } = gameData
        console.log("gameData:", gameData)
        
        const updates = []
        const values = []

        if (title){
            updates.push('title = ?')
            values.push(title)
        }
        if (genre !== undefined){
            updates.push('genre = ?')
            values.push(genre)
        }
        if (platform !== undefined){
            updates.push('platform = ?')
            values.push(platform)
        }
        if (releaseYear !== undefined){
            updates.push('releaseYear = ?')
            values.push(releaseYear)
        }
        if (rating !== undefined){
            updates.push('rating = ?')
            values.push(rating)
        }
        if (price !== undefined){
            updates.push('price = ?')
            values.push(price)
        }

        if (!updates.length){
            return this.getById(id)
        }
        console.log("gameData:", gameData)
        console.log("values:", values)

        values.push(id)
        const stmt = db.prepare(`UPDATE ${this.tableName} SET ${updates.join(', ')} WHERE id = ?`)
        stmt.run(...values)
        return this.getById(id)
    }

    static delete(id) {
        const stmt = db.prepare(`DELETE FROM ${this.tableName} WHERE id = ?`)
        const result = stmt.run(id)
        return result.changes > 0
    }

    static count() {
        const stmt = db.prepare(`SELECT COUNT(*) as count FROM ${this.tableName}`)
        return stmt.get().count
    }

    static seed() {
        const count = this.count()
        if (count === 0) {
            console.log('📝 Seeding video games table...')
            const sampleGames = [
                { title: 'The Legend of Zelda', genre: 'Adventure', platform: 'Switch', releaseYear: 2017, rating: 'E', price: 59.99 },
                { title: 'God of War', genre: 'Action', platform: 'PS4', releaseYear: 2018, rating: 'M', price: 49.99 },
                { title: 'Minecraft', genre: 'Sandbox', platform: 'PC', releaseYear: 2011, rating: 'E10+', price: 26.95 },
                { title: 'Halo Infinite', genre: 'FPS', platform: 'Xbox', releaseYear: 2021, rating: 'T', price: 59.99 }
            ]
            sampleGames.forEach(game => this.create(game))
            console.log(`✅ Seeded ${sampleGames.length} video games`)
        }
    }
}

export default VideoGame
