import express from "express"
import logMiddleware from "../middleware/log.js"
import * as videoGameController from "../controllers/videoGameController.js"

// Create router instance
const router = express.Router()

// The base path /video-games will be defined in index.js when mounted

// Routes
router.get('/', logMiddleware, videoGameController.getAllVideoGames)   // GET /video-games
router.get('/:id', videoGameController.getVideoGameById)               // GET /video-games/:id
router.post('/', videoGameController.createVideoGame)                  // POST /video-games
router.put('/:id', videoGameController.updateVideoGame)                // PUT /video-games/:id
router.delete('/:id', videoGameController.deleteVideoGame)             // DELETE /video-games/:id

// Export the router
export default router
