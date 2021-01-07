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
      Book.find({}, (err, data) => {
        if(err) return console.error
        res.json(data)
      })
    })
    
    .post(async function (req, res){
      let title = req.body.title;
      const book = new Book({ title: title })
      await book.save((err, data) => {
        if (err) return res.send("missing required field title")
        res.json({
          _id: data._id,
          title: data.title
        })
      })
    })
    
    .delete(function(req, res){
      //if successful response will be 'complete delete successful'
    });



  app.route('/api/books/:id')
    .get(function (req, res){
      let bookid = req.params.id;
      //json res format: {"_id": bookid, "title": book_title, "comments": [comment,comment,...]}
      Book.findById(ObjectId(bookid), (err, data) => {
        if (err) return res.send("no book exists")
        res.json(data)
      })
    })
    
    .post(function(req, res){
      let bookid = req.params.id;
      let comment = req.body.comment;
      //json res format same as .get
    })
    
    .delete(function(req, res){
      let bookid = req.params.id;
      //if successful response will be 'delete successful'
    });
  
};
