import express from "express"
import { config } from "dotenv"
import cors from "cors"
import contactRoutes from "./routes/contactRoutes.js"
import errHandler from "./middleware/errHandler.js"

config()
const app = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: false}))



app.use('/api', contactRoutes)

app.use(errHandler)


app.use('*', (req, res) => {
    res.status(404).json('Page Not Found')
})


const PORT = process.env.PORT
app.listen(PORT, () => console.log(`server listening on port: ${PORT}`))