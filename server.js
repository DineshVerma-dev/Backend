import express from "express";
import connectDB from "./database/database.js";
import Authenticationmiddleware from "./middleware/auth.js";


const app = express();
const PORT = 10000
connectDB();

app.use(express.json())

app.get("/", function (req, res, next) {
    console.log("welcome to learn nodejs ")
    res.send("welcome to learning nodej and password")
    next()
})
import PersonRoutes from "./routes/person.route.js"
import menuRoutes from "./routes/menu.route.js"

app.use("/person", Authenticationmiddleware, PersonRoutes)
app.use("/menu", menuRoutes)

app.listen(PORT, () => {
    console.log(`Server is running on the port http://localhost:${PORT}`)
});