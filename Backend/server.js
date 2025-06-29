import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import useRoutes from './routes/userRoutes.js'
import authRoutes from './routes/authRoutes.js'
import { errorHandler } from '../../likeme/Backend/src/middlewares/errorHandler.js'

const app = express()
const PORT = process.env.PORT ?? 5000

//Middleware
app.use(express.json())
app.use(cors())
app.use(useRoutes)
app.use(authRoutes)

// Middleware de errores global
app.use(errorHandler)

app.listen(PORT, () => {
    console.log(`Server conecting on http://localhost:${PORT}`)
})