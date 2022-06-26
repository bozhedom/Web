const express = require("express");
const hbs = require("hbs");
const expressHbs = require("express-handlebars");

const app = express();
const jsonParser = express.json();

const MongoClient = require("mongodb").MongoClient;
const mongoClient = new MongoClient("mongodb://localhost:27017/");
const objectId = require("mongodb").ObjectId;
const urlencodedParser = express.urlencoded({extended: false});

const states = require("./public/js/states")
const comments = require("./public/js/comments");

const { request } = require("express");


let comments_ = [{ name: "Коля", tetx: "Круто!!", id: 1 }, { name: "Петя", tetx: "Ваууу!!", id: 2 }, { name: "Валя", tetx: "фуфло!!", id: 3 }, { name: "Таня", tetx: "иууууууу!!", id: 4 }];
let posts = [{ author: "Данил", date: Date(), text: "красная шляпа", topic: "Сказки", id: 1 },
{ author: "Никита", date: Date(), text: "не торты а торты", topic: "Торты", id: 2 },
{ author: "Влад", date: Date(), text: "мм МАСЛЕНИЦА", topic: "Блины", id: 3 },
{ author: "Матвей", date: Date(), text: "ДВФУ - ЛУЧШИЙ ВУЗ", topic: "ДВФУ", id: 4 }];

app.engine("hbs", expressHbs.engine(
    {
        layoutsDir: "views/layouts",
        defaultLayout: "layout",
        extname: "hbs"
    }
))

app.set("view engine", "hbs");

hbs.registerPartials(__dirname + "/views/partials");

app.use(express.static(__dirname + "/public"))

function rendPost(request, responce) {
    
    const idFromUser = Number(request.params.id);
    const postsCollection = request.app.locals.posts;
    const commentsCollection = request.app.locals.comments;
    
    postsCollection.findOne({id : idFromUser}, (err, state) => {
        if(err) return console.log(err);

        commentsCollection.find({id : idFromUser}).toArray((err, comments) => {
            if(err) return console.log(err);
            responce.render("state", {
                author : state.author,
                date: state.date,
                topic: state.topic,
                text: state.text,
                comments: comments
            });
            
        });
    });
}


let dbClient;
mongoClient.connect((err, client) => {
    if (err) return console.log(err);

    dbClient = client;
    app.locals.posts = client.db("postsdb").collection("posts");
    app.locals.comments = client.db("commentsdb").collection("comments");

    app.listen(3000, function () {
        console.log("Сервер ожидает подключения...");
    });



});

app.post("/states/:id", urlencodedParser, (req, res) => {
    const idFromUser = Number(req.params.id);

    if (!req.body) return req.sendStatus(400);

    let comment = {
        name: req.body.name,
        tetx: req.body.comment,
        id: idFromUser
    }

    req.app.locals.comments.insertOne(comment, function (err, result) {

        if (err) return console.log(err);
    });
    rendPost(req, res);

});

app.use("/states/:id", (request, responce) => {

    rendPost(request, responce);

});


app.use("/", function (request, response) {

    response.render("states.hbs");
});


process.on("SIGINT", () => {
    dbClient.close();
    process.exit();
});