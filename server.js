const express = require('express');
const Database = require('./database');

const server = express();
server.use(express.json());

const router = express.Router();

const db = new Database();
db.connect();

/*
    Tristan's idea of a standard resource

    ✅ GET     /resource      => Returns a list of the resources from the database (array)
    ✅ POST    /resource      => Creates a new resource and saves it
    ❌ GET     /resource/:id  => Get an invidiual resource (object)
    ❌ DELETE  /resource/:id  => Delete an invidiual resource
    ❌ PUT     /resource/:id  => Update an invidiual resource (object)


    Wrap each response with:

    {
        status: 201,
        message: 'Successfully created post',
        data: {...}
    }

    {
        status: 400,
        error: 'Missing post title'
    }
*/



function createJSON(code, message, body = null) {
    if (body != null) {
        return {
            "status" : code,
            "message" : message,
            "data" : body
        }
    } else {
        return {
            "status" : code,
            "error" : message
        }
    }
}

router.get('/posts', async(req, res, next) => {
    try {
        const posts = await db.Post.find({});
        res.json(createJSON(200, "Posts successfully retrieved", posts));
    } catch (e) {
        const errorMessage = 'Error retrieving posts: ' + e;
        res.json(createJSON(400, errorMessage));
    }
});

router.post('/posts', async(req, res, next) => {
    const post = new db.Post(req.body);

    try {
        await post.save();
        res.json(createJSON(200, "Post successfully added", post));
    } catch (e) {
        const errorMessage = 'Error saving post: ' + e;
        res.json(createJSON(400, errorMessage));
    }
});

router.get('/posts/:id', async(req, res, next) => {
    const id = req.params.id;

    try {
        const post = await db.Post.find({
            _id : id
        });
        res.json(createJSON(200, "Post successfully found", post));
    } catch (e) {
        const errorMessage = 'Error getting post with id ' + id + ': ' + e;
        res.send(createJSON(400, errorMessage));
    }
});

router.delete('/posts/:id', async(req, res, next) => {
    const id = req.params.id;

    try {
        const post = await db.Post.deleteOne({
            _id : id
        });
        res.json(createJSON(201, "Successfully deleted", {}));
    } catch (e) {
        res.json(createJSON(400, "error" + e));
    }
});

/// https://coursework.vschool.io/mongoose-crud/

router.put('/posts/:id', async (req, res, next) => {
    const id = req.params.id;
    try{
        const post = await db.Post.findByIdAndUpdate(id,req.body,{new: true});
        res.json(createJSON(200, "Posts successfully updated",post));
    } catch(e){
        const errorMessage = 'Error updating posts: ' + e;
        res.json(createJSON(400, errorMessage));
    }

})

server.use('/api', router);

server.listen(8888);
