
let comments = [
    {"name": "Коля", "text": "Ку"},
    {"name": "Петя", "text": "Ы"},
    {"name": "Валя", "text": "Круто"},
    {"name": "Таня", "text": "Не круто"},
]
module.exports.getComments = function(id) {
    let res = []
    for (let i = 0; i < comments.length; i++) {
        if (comments[i].id == parseInt(id)) {
            res.push(comments[i]);
        }
    }
    return res;
};

module.exports.date = comments;
