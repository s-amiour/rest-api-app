// Import the service
import * as userService from '../services/userService.js'

// Controllers == final route handlers
// Get all users
export const getAllUsers = (req, res) => {
    try {
        const users = userService.getAllUsers() // service call
        res.status(200).json(users)
    } catch(error){
        res.status(500).json({ msg: error.message })
    }
}

// Get single user
export const getUserById = (req, res) => {
    try {
        const id = req.params.id
        const user = userService.getUserById(id)  // service call

        if (!user){
            return res.status(404).json({ msg: `User with id ${id} is not available` })
        }
        res.status(200).json(user)
    } catch (error){
        res.status(500).json({ msg: error.message })
    }
}

// Create new user
export const createUser = (req, res) => {
	try {
		const { name } = req.body
		
		// Basic validation (could be moved to middleware)
		if (!name) {
			return res.status(400).json({ message: "Name is required" })
		}
		
		const newUser = userService.createUser({ name })  // Call service
		res.status(201).json(newUser)
	} catch (error) {
		res.status(500).json({ message: error.message })
	}
}

// Update user
export const updateUser = (req, res) => {
	try {
		const { id } = req.params
		const userData = req.body
		
		const updatedUser = userService.updateUser(id, userData)  // Call service
		
		if (!updatedUser) {
			return res.status(404).json({ message: "User not found" })
		}
		
		res.status(200).json(updatedUser)
	} catch (error) {
		res.status(500).json({ message: error.message })
	}
}

// Delete user
export const deleteUser = (req, res) => {
	try {
		const { id } = req.params
		const deleted = userService.deleteUser(id)  // Call service
		
		if (!deleted) {
			return res.status(404).json({ message: "User not found" })
		}
		
		res.status(204).send()  // No content
	} catch (error) {
		res.status(500).json({ message: error.message })
	}
}