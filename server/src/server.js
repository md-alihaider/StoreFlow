import app from './app/app.js'
import { config } from './config/config.js'
import { connectDB } from './config/db.js'

const PORT = config.PORT || 5000

await connectDB()

app.listen(PORT, (req, res) => {
  console.log(`Server is running on PORT: ${PORT}`)
})