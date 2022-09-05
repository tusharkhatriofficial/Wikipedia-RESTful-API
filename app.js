//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require('mongoose');
const _ = require("lodash");

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.static("public"));

//TODO connect to database
mongoose.connect("mongodb://localhost:27017/wikiDB", {useNewUrlParser: true});

//create schema for database
const articleSchema = new mongoose.Schema({
    title: String,
    content: String,
});

//create model for database
const Article = new mongoose.model("Article", articleSchema);


app.route("/articles")

.get((req, res) => {
        Article.find({}, (err, foundArticles) => {
            if(!err) {
                res.send(foundArticles);
            } else {
                res.send(err);
            }
        });
    })

.post((req, res) => {
        const newArticle = new Article({
            title: req.body.title,
            content: req.body.content
        });
    
        newArticle.save((err) => {
            if(!err) {
                res.send("Successfully added a new article!");
            } else {
                res.send(err);
            }
        }
        );
    })

.delete((req, res) => {

        Article.deleteMany({}, (err) => {
            if(!err) {
                res.send("Successfully deleted all articles!");
            } else {
                res.send(err);
            }
        });
    });

app.route("/articles/:articleTitle")
.get(
    (req, res) => {
        const articleTitle = req.params.articleTitle;
        Article.find({title: articleTitle}, (err, foundArticle) => {
            if(!err){
                res.send(foundArticle);
        } else {
            res.send("No articles matching that title was found.");
        }
        });
    }
)

.put(
    (req, res) => {
        const articleTitle = req.params.articleTitle;
        Article.update(
            {title: articleTitle},
            {title: req.body.title, content: req.body.content},
            {overwrite: true},
            (err) => {
                if(!err) {
                    res.send("Successfully updated article.");
                }
            }
            );
    }
)

.patch(
    (req, res) => {
        const articleTitle = req.params.articleTitle;
        Article.update(
            {title: articleTitle},
            {$set: req.body},
            (err) => {
                if(!err) {
                    res.send("Successfully updated article.");
                }
            }
            );
    }
)

.delete(
    (req, res) => {
        const articleTitle = req.params.articleTitle;
        Article.deleteOne(
            {title: articleTitle},
            (err) => {
                if(!err) {
                    res.send("Successfully deleted article.");
                }else {
                    res.send(err);
                }
            }
        );
    }
);

app.route("/").get(
    (req, res) => {
        res.send("Up and running!");
    }
)

app.listen(4000, function() {
  console.log("Server started on port 4000");
});