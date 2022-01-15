const mongoose = require('mongoose');
mongoose.connect("mongodb+srv://freelance:12345@freelance.mhgq8.mongodb.net/freelance?retryWrites=true&w=majority")
    // mongoose.connect("mongodb+srv://freelance:12345@freelance.mhgq8.mongodb.net/freelace?retryWrites=true&w=majority")
    .then(() => {
        console.log("DBConnecting Succesful");
    }).catch((err) => {
        console.log(err)
    })
exports.mongoose;   