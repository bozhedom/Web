let states = [
    {"author": "Данил", "date": Date(), "id": 1, "text": "красная шляпа", "topic": "Сказки"},
    {"author": "Никита", "date": Date(), "id": 2,  "text": "не торты а торты", "topic": "Торты"},
    {"author": "Влад", "date": Date(), "id": 3,  "text": "мм МАСЛЕНИЦА", "topic": "Блины"},
    {"author": "Матвей", "date": Date(), "id": 4,  "text": "ДВФУ - ЛУЧШИЙ ВУЗ", "topic": "ДВФУ"}
]

//получить пост
module.exports.getState = function(id) {
    for(let i = 0; i < states.length; i++) {
        if (states[i].id == id) {
            return states[i]
        }
    }
    return null
}

module.exports.date = states //обращаемся к массиву