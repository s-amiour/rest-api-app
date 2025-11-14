import express from "express"
import logMiddleware from "./middleware/middleware"

const app = express()

const PORT=5000

const users = [  // dummy data
    {id: 1, name: "Aaron"},
    {id: 2, name: "Bob"},
    {id: 3, name: "Wilhelm"},
    {id: 4, name: "Lewis"},
]

app.use(express.json())  // Without JSON parsing, req.body would be undefined

// // Middlewaere to handle request body (in this case, by logging it)
// app.use( async (req, res, next) => {
//     const date = new Date().toISOString()
//     console.log(`[${date}] ${req.method} ${req.url}`)

//     const response = await fetch("https://jsonplaceholder.typicode.com/users/1")
// 	const data = await response.json()
// 	req.data = data
// 	console.log(data)

//     next()
// })

app.get('/', logMiddleware, (req, res) => {
    data = req.data
    res.json({ users, data })
})

app.post('/', (req, res) => {
    console.log(req)
})

app.listen(PORT, () => console.log(`Express server running on port ${PORT}`))







// app.use(cors)

// app.use(express.json())

// // middleware to tlog request body
// app.use((req, res, next) => {
//     // if (!req.method !== "POST") {
//     //      return meth;
//     // }
    
// });