const mongoose = require('mongoose');

// use localhost when applicaiton is running on local machine.
// const mongoURI = "mongodb://localhost:27017/inotebook"

// change host name as (service_name or container_name of mongodb) when running application on docker.  
const mongoURI = "mongodb://mongodb:27017/inotebook"

const connectToMongo = async ()=>{
    // mongoose.set('strictQuery', false)
    mongoose.connect(mongoURI)
    console.log("connected to mongodb")
}


module.exports = connectToMongo;