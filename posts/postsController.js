const {matchedData} = require("express-validator");
const {addNewPost, getAllPosts, getPostsWith} = require("./postModel");



const addOne = async (req, res, next) => {
    const cleanBody = matchedData(req);
    const dbResponse = await addNewPost({userid: req.user.id, ...cleanBody })
    dbResponse instanceof Error ? next(dbResponse) : res.status(201).json({message: `Post created by ${req.user.name}`
   })
}

const listAll = async(req, res, next) =>
 {
     if(req.query.title) {
        const dbResponse = await getPostsWith(req.query.title)
        if(dbResponse instanceof Error) return next(dbResponse)
        dbResponse.length ? res.status(200).json(dbResponse).end() : next()
     }
     const dbResponse = await getAllPosts()
     if(dbResponse instanceof Error) return next(dbResponse)
    dbResponse.length ? res.status(200).json(dbResponse) : next()
 }
module.exports = { addOne, listAll}