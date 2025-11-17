import express from "express"
import logMiddleware from "../middleware/log.js"
import * as bookController from "../controllers/bookController.js"

// Create router instance; defines routes
const router = express.Router()

// The base path, /books, will be defined in index.js, when exported there

// app.<method>(<route>, <middleware>, ....mdlware...., <controller>)
router.get('/', logMiddleware, bookController.getAllBooks)  // GET /books
router.get("/:id", bookController.getBookById)              // GET /books/:id
router.post("/", bookController.createBook)                 // POST /books
router.put("/:id", bookController.updateBook)               // PUT /books/:id
router.delete("/:id", bookController.deleteBook)            // DELETE /books/:id

// Export the router
export default router