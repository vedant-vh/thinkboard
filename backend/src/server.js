import express from "express"
import notesRoutes from "./routes/notesRoutes.js"
import { connectDB } from "./config/db.js"
import dotenv from "dotenv"
import rateLimiter from "./middleware/rateLimiter.js";
import cors from 'cors'
import path from "path"
import { fileURLToPath } from "url";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001
const __dirname = path.resolve();
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);


if (process.env.NODE_ENV !== "production") {
    
    app.use(cors({
        origin:"http://localhost:5173",
    }));

}

//middleware
app.use(express.json()); // will parse json bodies: req.body i.e allows us to use {title,content}

//custom middleware
// app.use((req,res,next) => {
//     console.log(`request method is ${req.method} and request URL is ${req.url}`);
//     next();
// })

app.use(rateLimiter);

app.use("/api/notes", notesRoutes)

if (process.env.NODE_ENV === "production") {
     app.use(express.static(path.join(__dirname, "../frontend/dist")));

    app.get("*", (req, res) => {
        res.sendFile(path.join(__dirname,"../frontend","dist","index.html"));
  });
}


connectDB().then(() => {
    app.listen(PORT, () => {
    console.log("server started on port ", PORT);
    
}) 
});


