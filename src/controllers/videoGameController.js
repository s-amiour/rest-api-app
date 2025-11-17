import * as videoGameService from '../services/videoGameService.js'

export const getAllVideoGames = (req, res) => {
    try {
        const games = videoGameService.getAllVideoGames()
        res.status(200).json(games)
    } catch (error) {
        res.status(500).json({ msg: error.message })
    }
}

export const getVideoGameById = (req, res) => {
    try {
        const { id } = req.params
        const game = videoGameService.getVideoGameById(id)
        if (!game) return res.status(404).json({ msg: 'Video game not found' })
        res.status(200).json(game)
    } catch (error) {
        res.status(500).json({ msg: error.message })
    }
}

export const createVideoGame = (req, res) => {
    try {
        const { title, genre, platform, releaseYear, rating, price } = req.body
        if (!title || !platform) return res.status(400).json({ msg: 'Title and platform are required' })

        const newGame = videoGameService.createVideoGame({ title, genre, platform, releaseYear, rating, price })
        res.status(201).json(newGame)
    } catch (error) {
        if (error.message.includes('exists')) return res.status(409).json({ msg: error.message })
        res.status(500).json({ msg: error.message })
    }
}

export const updateVideoGame = (req, res) => {
    try {
        console.log("wdswsxwas")
        const id = req.params.id
        console.log("wdswsxwas")
        const updatedGame = videoGameService.updateVideoGame(id, req.body)
        if (!updatedGame){
            return res.status(404).json({ msg: 'Video game not found' })
        }
        res.status(200).json(updatedGame)
    } catch (error) {
        res.status(500).json({ msg: error.message })
    }
}

export const deleteVideoGame = (req, res) => {
    try {
        const { id } = req.params
        const deleted = videoGameService.deleteVideoGame(id)
        if (!deleted) return res.status(404).json({ msg: 'Video game not found' })
        res.status(204).send()
    } catch (error) {
        res.status(500).json({ msg: error.message })
    }
}
