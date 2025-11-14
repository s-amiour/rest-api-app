// Middleware to handle request body (in this case, by logging it)
const logMiddleware = (req, res, next) => {
    const date = new Date().toISOString()
    console.log(`[${date}] ${req.method} ${req.url}`)
    next()
}

export default logMiddleware