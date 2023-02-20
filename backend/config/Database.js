const mongoose = require("mongoose");

mongoose.set('strictQuery', true)
mongoose.connect("mongodb://localhost:27017/React-web-app",{
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("DB connection successful");
}).catch((error) =>{
    console.log("DB not connected");
})