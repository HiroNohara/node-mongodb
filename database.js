const mongoose = require('mongoose');
const schemaPost = require('./schemas/Post');


// Connect via connection URI
/*
    mongodb://user:password@localhost:27017/test

    Components of a database URI
        mongodb://  => Type of database (mysql, postgres)
        user        => Username
        :           => Username/password seperator
        password    => Password
        localhost   => The host, or the location of the databse
        27017       => The port we're listening too
        /test       => The database to connect to
*/


module.exports = class Database {
    async connect() {
        try {
            this.connection = await mongoose.connect('mongodb://localhost:27017/node-blog');
        } catch (e) {
            console.log('Could not connect to database');
        }

        const PostSchema = new mongoose.Schema(schemaPost);
        this.Post = this.connection.model('post', PostSchema);
    }
}
