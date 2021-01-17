/*
*
*
*       Complete the API routing below
*       
*       
*/

'use strict';

const ObjectId = require('mongoose').Types.ObjectId

module.exports = function (app, Book) {

  app.route('/api/books')
    .get(async function (req, res){
      await Book.find({}, (err, data) => {
        if(err) return console.error
        res.json(data)
      })
    })
    
    .post(async function (req, res){
      let title = req.body.title;
      if (!title) return res.send("missing required field title")
      const book = new Book({ title: title })
      await book.save((err, data) => {
        if (err) return res.send("An error occurred")
        res.json({
          _id: data._id,
          title: data.title
        })
      })
    })
    
    .delete(function(req, res){
      Book.deleteMany({}, (err, data) => {
        if (err) return res.send("An error occured")
        res.send("complete delete successful")
      })
    });



  app.route('/api/books/:id')
    .get(async function (req, res){
      let bookid = req.params.id;
      if (!ObjectId.isValid(bookid)) return res.send("no book exists")
      await Book.findById(bookid, (err, data) => {
        if (err) return res.send("An error occured")
        if (!data) {
          return res.send("no book exists")
        } else {
          res.json(data)
        }
      })
    })
    
    .post(function(req, res){
      let bookid = req.params.id;
      let comment = req.body.comment;
      if (!ObjectId.isValid(bookid)) return res.send("no book exists")
      if (!comment) return res.send("missing required field comment")

      Book.findByIdAndUpdate(bookid, {
        $push: { comments: comment},
        $inc: { commentcount: 1} 
      }, { new: true }, (err, data) => {
          if (err || !data) return res.send("no book exists")
          res.json(data)
      })
    })
    
    .delete(function(req, res){
      let bookid = req.params.id;
      Book.findByIdAndDelete(bookid, (err, data) => {
          if (err || !data) return res.send("no book exists")
          res.send("delete successful")
      })
    });
  
};
