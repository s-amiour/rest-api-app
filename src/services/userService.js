// Service, in this project, are used to serve functions and data (business logic) to controllers 

let users = [  // dummy data
    {id: 1, name: "Aaron"},
    {id: 2, name: "Bob"},
    {id: 3, name: "Wilhelm"},
    {id: 4, name: "Lewis"},
]

// Service functions - handle data operations

export const getAllUsers = () => {
	return users
}

export const getUserById = (id) => {
	return users.find(user => user.id === parseInt(id))
}

export const createUser = (userData) => {
	const newUser = {
		id: users.length + 1,
		name: userData.name
	}
	users.push(newUser)
	return newUser
}

export const updateUser = (id, userData) => {
	const index = users.findIndex(user => user.id === parseInt(id))
	
	if (index === -1) {
		return null
	}
	
	users[index] = { ...users[index], ...userData }  // seamless way to update a user
	return users[index]
}

export const deleteUser = (id) => {
	const index = users.findIndex(user => user.id === parseInt(id))
	
	if (index === -1) {
		return false
	}
	
	users.splice(index, 1)
	return true
}