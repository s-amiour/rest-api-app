import VideoGame from '../models/VideoGame.js'

// Get all video games
export const getAllVideoGames = () => {
    return VideoGame.getAll()
}

// Get video game by ID
export const getVideoGameById = (id) => {
    return VideoGame.getById(id)
}

// Create new video game
export const createVideoGame = (gameData) => {
    const { title, platform } = gameData

    // Business logic: prevent duplicate game on same platform
    const allGames = VideoGame.getAll()
    if (allGames.some(g => g.title === title && g.platform === platform)) {
        throw new Error('Game already exists on this platform')
    }

    return VideoGame.create(gameData)
}

// Update video game
export const updateVideoGame = (id, gameData) => {
    const existingGame = VideoGame.getById(id)
    console.log("wdswsxwas")
    if (!existingGame){
        return null        
    }

    return VideoGame.update(id, gameData)
}

// Delete video game
export const deleteVideoGame = (id) => {
    return VideoGame.delete(id)
}

// Count
export const getVideoGameCount = () => {
    return VideoGame.count()
}
