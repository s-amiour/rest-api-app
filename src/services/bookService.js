import Book from '../models/Book.js'

// Get all books
export const getAllBooks = () => {
	return Book.getAll()
}

// Get Book by ID
export const getBookById = (id) => {
	return Book.getById(id)
}

// Create new Book
export const createBook = (bookData) => {
	const { title, isbn, genre, publication_date } = bookData
	
	// Business logic: Check if email already exists
	if (isbn && Book.isbnExists(isbn)) {
		throw new Error('Isbn already exists')
	}
	return Book.create({ title, isbn, genre, publication_date })
}

// Update Book
export const updateBook = (id, bookData) => {
	const { title, isbn, genre, publication_date } = bookData
	
	// Check if Book exists
	const existingBook = Book.getById(id)
	if (!existingBook) {
		return null
	}
	
	if (isbn && isbn !== existingBook.email && Book.isbnExists(isbn, id)) {
		// the reason we check isbn && isbn !== existingBook.email is
		// bcuz we're checking only if other records other than existingBook
		// have the email to be inserted
        throw new Error('ISBN already exists')
	}
	
	return Book.update(id, { title, isbn, genre, publication_date })
}

// Delete book
export const deleteBook = (id) => {
	return Book.delete(id)
}


export const getByIsbn = (isbn) => {
	return Book.getByIsbn(isbn)
}

// Count
export const bookCount = () => {
	return Book.count()
}