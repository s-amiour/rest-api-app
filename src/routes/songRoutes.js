import express from "express"
import logMiddleware from "../middleware/log.js"
import * as songController from "../controllers/songController.js"

// Create router instance; defines routes
const router = express.Router()

// The base path, /songs, will be defined in index.js, when exported there

// app.<method>(<route>, <middleware>, ....mdlware...., <controller>)
router.get('/', logMiddleware, songController.getAllSongs)  // GET /songs
router.get("/:id", songController.getSongById)              // GET /songs/:id
router.post("/", songController.createSong)                 // POST /songs
router.put("/:id", songController.updateSong)               // PUT /songs/:id
router.delete("/:id", songController.deleteSong)            // DELETE /songs/:id

// Export the router
export default router