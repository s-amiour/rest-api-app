import db from "../config/db.js"

class Song {
    static tableName = 'songs'

    static createTable() {
        const sql = `
            CREATE TABLE IF NOT EXISTS ${this.tableName} (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                title TEXT NOT NULL,
                artist TEXT NOT NULL,
                album TEXT,
                duration INTEGER
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

    static create(songData) {
        const { title, artist, album, duration } = songData
        const stmt = db.prepare(`
            INSERT INTO ${this.tableName} (title, artist, album, duration)
            VALUES (?, ?, ?, ?)
        `)
        const result = stmt.run(title, artist, album || null, duration || null)
        return this.getById(result.lastInsertRowid)
    }

    static update(id, songData) {
        const { title, artist, album, duration } = songData
        const updates = []
        const values = []

        if (title) {
            updates.push('title = ?'); values.push(title)
        }
        if (artist) {
            updates.push('artist = ?'); values.push(artist)
        }
        if (album !== undefined) {
            updates.push('album = ?'); values.push(album)
        }
        if (duration !== undefined) {
            updates.push('duration = ?'); values.push(duration)
        }

        if (!updates.length) {
            return this.getById(id)
        }

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
            console.log('📝 Seeding songs table...')
            const sampleSongs = [
                { title: 'Bohemian Rhapsody', artist: 'Queen', album: 'A Night at the Opera', duration: 354 },
                { title: 'Imagine', artist: 'John Lennon', album: 'Imagine', duration: 183 },
                { title: 'Billie Jean', artist: 'Michael Jackson', album: 'Thriller', duration: 294 },
                { title: 'Shape of You', artist: 'Ed Sheeran', album: '÷', duration: 233 }
            ]
            sampleSongs.forEach(song => this.create(song))
            console.log(`✅ Seeded ${sampleSongs.length} songs`)
        }
    }
}

export default Song
