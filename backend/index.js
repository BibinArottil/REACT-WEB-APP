const express = require("express");
const cors = require("cors")
const app = express();
const path = require('path')
const UserRoutes = require("./Routes/UserRouter");
const AdminRoutes = require("./Routes/AdminRouter")
const cookieParser = require("cookie-parser")

require('./config/Database')

app.use(
    cors({
    origin:["http://localhost:3000"],
    methods:["GET","POST","PATCH","DELETE"],
    credentials:true
}))

app.use(express.json())
app.use(cookieParser())
app.use(express.static(path.join(__dirname,"Public")))
app.use("/",UserRoutes)
app.use("/admin",AdminRoutes)

app.listen(4000, () => {
    console.log("Server listing on PORT 4000");
})