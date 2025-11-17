import Movie from '../models/Movie.js'

// Get all movies
export const getAllMovies = () => {
    return Movie.getAll()
}

// Get movie by ID
export const getMovieById = (id) => {
    return Movie.getById(id)
}

// Create new movie
export const createMovie = (movieData) => {
    const { title, director, rating } = movieData

    // Business logic: Optional, e.g., prevent duplicate title by same director
    const allMovies = Movie.getAll()
    if (allMovies.some(m => m.title === title && m.director === director)) {
        throw new Error('Movie by this director already exists')
    }

    return Movie.create({ title, director, rating })
}

// Update movie
export const updateMovie = (id, movieData) => {
    const existingMovie = Movie.getById(id)
    if (!existingMovie) {
        return null
    }

    return Movie.update(id, movieData)
}

// Delete movie
export const deleteMovie = (id) => {
    return Movie.delete(id)
}

// Count
export const getMovieCount = () => {
    return Movie.count()
}
