import express from "express"
import logMiddleware from "../middleware/log.js"
import * as movieController from "../controllers/movieController.js"

// Create router instance; defines routes
const router = express.Router()

// The base path, /movies, will be defined in index.js, when exported there

// app.<method>(<route>, <middleware>, ....mdlware...., <controller>)
router.get('/', logMiddleware, movieController.getAllMovies)  // GET /movies
router.get("/:id", movieController.getMovieById)              // GET /movies/:id
router.post("/", movieController.createMovie)                 // POST /movies
router.put("/:id", movieController.updateMovie)               // PUT /movies/:id
router.delete("/:id", movieController.deleteMovie)            // DELETE /movies/:id

// Export the router
export default router