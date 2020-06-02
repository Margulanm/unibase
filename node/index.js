const config  = require('./config');
const express = require('express');
const mongoose = require('mongoose');
const data = require('./data.json');
const { getUniverList, getUniver } = require('./app/controllers/universController');

const app = express();

app.set('view engine', 'ejs');
app.use(express.static('assets'));

app.get('/', (req, res) => {
    res.render('main');
});

app.get('/univers', (req, res) => res.redirect('/univers/list'  ));
app.get('/univers/list', (req, res) => res.redirect('/univers/list/world'));
app.get('/univers/list/:country', async (req, res) => {
    let country = req.params.country;
    let page = data.univers[country];

    let title = page.title;
    let page_preview = page.preview;

    if(country == "world")
        country = { $nin: ["usa", "kz"] };

    const univers = await getUniverList(country);
    console.log(univers);

    res.render('templates/univers', { univers: univers ? univers : [], title, page_preview});
});

app.get('/univers/:univerId', (req, res) => {
    const univerId = req.params.univerId;
    getUniver(univerId)
      .then(univer => {
        console.log(univer);
    
        res.render('templates/univer', { univer: univer ? univer : {} });
      })
      .catch(err => {
        console.log('Error request Univer with id '+univerId+err);
        res.status(404).send('Университета с id '+univerId+" не найдено!");
      });
});


mongoose.connect(config.db_uri, { useCreateIndex: true, useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => app.listen(
    config.port,
    () => {
      console.log("Server was started ;)");
      console.log(`Running on port ${config.port}...`)
    }),
    err => console.log(`Error connecting to database... ${err}`));