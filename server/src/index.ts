import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'


const app = express()
const PORT = Number(process.env.PORT || 3000)
const CORS_ORIGIN = process.env.CORS_ORIGIN || '*'
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/myapp'


app.use(cors({ origin: CORS_ORIGIN }))
app.use(express.json())


app.get('/api/ping', (_req, res) => {
res.json({ ok: true, message: 'pong from Express + Mongo' })
})

app.get('/', (_req, res) => {
res.json({ ok: true, message: 'pong from Express + Mongo' })
})


mongoose
.connect(MONGODB_URI)
.then(() => {
console.log('✅ MongoDB connected')
app.listen(PORT, '0.0.0.0', () => {
console.log(`🚀 Server listening on http://localhost:${PORT}`)
})
})
.catch((err) => {
console.error('MongoDB connection error:', err)
process.exit(1)
})