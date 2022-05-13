const express = require('express')
const path = require('path')
const app = express()
//БД
const CONTENT = [
    {id: 0, name: 'Николай', date: '13.10.2022', matter: 'Графы'},
    {id: 1, name: 'Евгений', date: '13.09.2020', matter: 'Жадные алгоритмы'},
    {id: 2, name: 'Екатерина', date: '25.05.2020', matter: 'Хеш-таблицы'},
    {id: 3, name: 'Алексей', date: '16.11.2021', matter: 'Списки'},
    {id: 4, name: 'Владислав', date: '23.01.2021', matter: 'База данных'},
]
const COMMENTS = [
    {id:0, text: 'Крутая тема!!!'},
    {id:1, text: 'Ого, Здорово!!!'},
    {id:2, text: 'Препод класс!!!'},
    {id:3, text: 'Сложная тема!!!'},
    {id:4, text: 'Скучно!!!'},
]
app.use(express.json())
//1
app.get('/posts', (req, res) => {
    res.status(200).json(CONTENT)
})
app.get('/comments', (req, res) => {
    res.status(200).json(COMMENTS)
})
//2
app.get('/posts/:id', (req, res) => {
    res.status(200).json(CONTENT[req.params.id])
})
//3
app.post("/AddComment", (req, res) => {
    console.log(req.body)
})
//4
app.get('/comments/:id', (req, res) => {
    res.status(200).json(COMMENTS[req.params.id])
})

app.use("/AddComment", express.static(path.resolve(__dirname, 'Новая папка', 'client')))

app.get("/AddComment", (req, res) => {
    res.sendFile(path.resolve(__dirname, 'Новая папка', 'client', 'index.html'))
})
app.listen(3000)





























//  Папка Views-pages-post.ejs   -partials footer.ejs       app.set("View ensine", "ejs")  app.use("/post/:id", (req, res) => {
//     const name = "post name",
//     response. render("pahes/post", {
//         title
//     })

//     <%-include("footer,"%>)
// })