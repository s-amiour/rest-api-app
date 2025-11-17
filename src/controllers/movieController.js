import * as movieService from '../services/movieService.js'

export const getAllMovies = (req, res) => {
    try {
        const movies = movieService.getAllMovies()
        res.status(200).json(movies)
    } catch (error) {
        res.status(500).json({ msg: error.message })
    }
}

export const getMovieById = (req, res) => {
    try {
        const { id } = req.params
        const movie = movieService.getMovieById(id)
        if (!movie) return res.status(404).json({ msg: 'Movie not found' })
        res.status(200).json(movie)
    } catch (error) {
        res.status(500).json({ msg: error.message })
    }
}

export const createMovie = (req, res) => {
    try {
        const { title, director, rating } = req.body
        if (!title || !director) return res.status(400).json({ msg: 'Title and director are required' })

        const newMovie = movieService.createMovie({ title, director, rating })
        res.status(201).json(newMovie)
    } catch (error) {
        if (error.message.includes('exists')) return res.status(409).json({ msg: error.message })
        res.status(500).json({ msg: error.message })
    }
}

export const updateMovie = (req, res) => {
    try {
        const { id } = req.params
        const updatedMovie = movieService.updateMovie(id, req.body)
        if (!updatedMovie) return res.status(404).json({ msg: 'Movie not found' })
        res.status(200).json(updatedMovie)
    } catch (error) {
        res.status(500).json({ msg: error.message })
    }
}

export const deleteMovie = (req, res) => {
    try {
        const { id } = req.params
        const deleted = movieService.deleteMovie(id)
        if (!deleted) return res.status(404).json({ msg: 'Movie not found' })
        res.status(204).send()
    } catch (error) {
        res.status(500).json({ msg: error.message })
    }
}
