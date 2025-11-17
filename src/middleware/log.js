// Middleware to handle request body (in this case, by logging it)
const logMiddleware = (req, res, next) => {
    const date = new Date().toISOString()  // Returns the date in ISO 8601 format, which is a standard string representation:
    console.log(`[${date}] ${req.method} ${req.url}`)
    next()
}

export default logMiddleware