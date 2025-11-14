import express from "express"
import logMiddleware from "../middleware/log.js"
import * as userController from "../controllers/userController.js"

// Create router instance; defines routes
const router = express.Router()

// The base path, /users, will be defined in index.js, when exported there

// app.<method>(<route>, <middleware>, ....mdlware...., <controller>)
router.get('/', logMiddleware, userController.getAllUsers)  // GET /users
router.get("/:id", userController.getUserById)  // GET /users/:id
router.post("/", userController.createUser)  // POST /users
router.put("/:id", userController.updateUser)  // PUT /users/:id
router.delete("/:id", userController.deleteUser)  // DELETE /users/:id

// Export the router
export default router