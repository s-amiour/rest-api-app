import Song from '../models/Song.js'

// Get all songs
export const getAllSongs = () => {
    return Song.getAll()
}

// Get song by ID
export const getSongById = (id) => {
    return Song.getById(id)
}

// Create a new song
export const createSong = (songData) => {
    const { title, artist, album, duration } = songData

    // Optional business logic: prevent exact duplicate song
    const allSongs = Song.getAll()
    if (allSongs.some(s => s.title === title && s.artist === artist && s.album === album)) {
        throw new Error('Song already exists')
    }

    return Song.create({ title, artist, album, duration })
}

// Update song
export const updateSong = (id, songData) => {
    const existingSong = Song.getById(id)
    if (!existingSong) return null

    return Song.update(id, songData)
}

// Delete song
export const deleteSong = (id) => {
    return Song.delete(id)
}

// Additional service method: count
export const getSongCount = () => {
    return Song.count()
}
