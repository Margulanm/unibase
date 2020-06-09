const mongoose = require('mongoose');
const Univer = require('./app/model/univer');
let univers = require('./univers.json');
const config = require('./config.js');
const fs = require('fs');
const model = `[
    {
     
        "name":"",
        "namerus":"",
        "description": "",
        "preview": "",
        "country": "usa",
        "tips": [
            {
                "title": "",
                "text": ""
            },
            {
                "title": "",
                "text": ""
            }
            
        ],
        "requirements": [
            {
                "title": "",
                "text": ""
            },
            {
                "title": "",
                "text": ""
            },
            {
                "title": "",
                "text": ""
            },
            {
                "title": "",
                "text": ""
            }
        ],
        "pol":"",
        "grants": [
            {
                "title": "",
                "text": ""
            },
            {
                "title": "",
                "text": ""
            }
        ],
        "faculties": [
            {
            "name": "",
            "subjects": [""] 
            },
            {
                "name": "",
                "subjects": [""] 
                
            },
            {
                "name": "",
                "subjects": [""] 
            }
        ],
    
        "price": "",
        "phone": "",
        "email": "",
        "address": "",
        "address2": "",
        "website": "",
        "location": ""
    }
]`;

let collection = univers.map(val => val = new Univer(val));

mongoose.connect(config.db_uri, { useCreateIndex: true, useNewUrlParser: true, useUnifiedTopology: true })
  .then(() =>{
    Univer.insertMany(collection)
        .then(list => {
            console.log('Универы успешно добавлены в базу данных!');
            console.log(list.map(v => v = v._id));
            try{
                fs.writeFileSync("./univers.old.json", JSON.stringify(univers)+"\n", { encoding: 'utf8' });
                fs.writeFileSync('./univers.json', model, { encoding: 'utf8' });
            } catch (e){
                console.log('При дублировании возникли проблемы... '+e);
            }
            return;
        })
        .catch(err => {
            console.error('Произошла ошибка, проверьте корректность данных в univers.json');
            console.log(err.errmsg);
            return;
        });
  }).catch(err => {
      console.log('Возникла ошибка при подключении к базе данных!');
      console.log(err);
      return;
});
