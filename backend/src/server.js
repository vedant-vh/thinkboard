import express from "express"
import notesRoutes from "./routes/notesRoutes.js"
import { connectDB } from "./config/db.js"
import dotenv from "dotenv"
import rateLimiter from "./middleware/rateLimiter.js";
import cors from 'cors'

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001



//middleware
app.use(express.json()); // will parse json bodies: req.body i.e allows us to use {title,content}

//custom middleware
// app.use((req,res,next) => {
//     console.log(`request method is ${req.method} and request URL is ${req.url}`);
//     next();
// })


app.use(cors({
    origin:"http://localhost:5173",
}));

app.use(rateLimiter);

app.use("/api/notes", notesRoutes)

connectDB().then(() => {
    app.listen(PORT, () => {
    console.log("server started on port ", PORT);
    
}) 
});


