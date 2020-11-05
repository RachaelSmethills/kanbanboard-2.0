const express = require('express');
const Handlebars = require('handlebars');
const expressHandlebars = require('express-handlebars');
const {allowInsecurePrototypeAccess} = require('@handlebars/allow-prototype-access');
const port = process.env.PORT || 3000;
const { seeder } = require('./src/database/seed');
const {User, Project, Task} = require('./src/database/models');

const app = express();

const handlebars = expressHandlebars({
    handlebars: allowInsecurePrototypeAccess(Handlebars)
});

app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.engine('handlebars', handlebars)
app.set('view engine', 'handlebars')

app.get('/', async (req, res) => {
    const users = await User.findAll();
    res.render('index', { users });
});

/*
    USER END POINTS
*/

// Add a User
app.post('/users/add', async(req, res) => {
    console.log('Details provided', req.body);
    const { name, avatarUrl } = req.body;
    const user = await User.create({ name: name, avatarUrl: avatarUrl });
    console.log('I have made user:', user);
    res.redirect(`/`)
});


app.listen(port, () => {
    console.log('Listening..', port);
    seeder.seedDb();
    console.log(`Example app listening at http://localhost:${port}`);
})