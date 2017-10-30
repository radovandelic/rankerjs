var mongoose = require("mongoose");

var keys = process.env.dbusername
    ? { username: process.env.dbusername, password: process.env.dbpassword }
    : require("./keys");

module.exports = {
    database: `mongodb://${keys.username}:${keys.password}@ds121965.mlab.com:21965/student`,
    startDB: function () {
        //to get rid of promise/deprecated warnings
        mongoose.Promise = global.Promise;
        mongoose.connect(this.database, { useMongoClient: true });
        db = mongoose.connection;

        db.once("open", () => {
            console.log("connected to mongodb");
        });

        db.on("error", (error) => {
            console.log(error);
        });
    }
}

