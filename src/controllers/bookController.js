// Import the service
import * as bookService from '../services/bookService.js'

// Controllers == final route handlers
// Get all books
export const getAllBooks = (req, res) => {
    try {
        const books = bookService.getAllBooks() // service call
        res.status(200).json(books)
    } catch(error){
        res.status(500).json({ msg: error.message })
    }
}

// Get single book
export const getBookById = (req, res) => {
    try {
        const id = req.params.id
        const book = bookService.getBookById(id)  // service call

        if (!book){
            return res.status(404).json({ msg: `Book with id ${id} is not available` })
        }
        res.status(200).json(book)
    } catch (error){
        res.status(500).json({ msg: error.message })
    }
}


// Create new book
export const createBook = (req, res) => {
    try {
        const { title, isbn, genre, publication_date } = req.body
        if (!title){
			return res.status(400).json({ msg: 'Title is required' })
		}
        const newBook = bookService.createBook({ title, isbn, genre, publication_date })
        res.status(201).json(newBook)
    } catch (error) {
        res.status(500).json({ msg: error.message })
    }
}

// Update book
export const updateBook = (req, res) => {
	try {
		const { id } = req.params
		const bookData = req.body
		
		const updatedbook = bookService.updateBook(id, bookData)  // Call service
		
		if (!updatedbook) {
			return res.status(404).json({ message: "Book not found" })
		}
		
		res.status(200).json(updatedbook)
	} catch (error) {
		if (error.message === 'ISBN already exists') {
			return res.status(409).json({ message: error.message })
		}
		res.status(500).json({ message: error.message })
	}
}

// Delete book
export const deleteBook = (req, res) => {
	try {
		const { id } = req.params
		const deleted = bookService.deleteBook(id)  // Call service
		
		if (!deleted) {
			return res.status(404).json({ message: "Book not found" })
		}
		
		res.status(204).send()  // Successful Deletiom
	} catch (error) {
		res.status(500).json({ message: error.message })
	}
}