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
    const projects = await Project.findAll();
    res.render('index', { users, projects });
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

/*
    PROJECT END POINTS
*/

// Get the users projects
app.get('/projects', async(req, res) => {
    if (req.user) {
        console.log('Here we have: ', req.user.id);
        const projects = await req.user.getProjects();
        res.render('projects', { projects });
    } else {
        res.redirect(`/`)
    }
});

app.get('/projects/:id', async(req, res) => {
    if (req.params.id != null) {
        const user = await getUser(req.params.id);
        const projects = await user.getProjects();

        res.cookie('userid', user.id);

        res.render('projects', { projects });
    }
});

// Add a project
app.post('/project/add', async(req, res) => {
    const { name } = req.body;
    const project = await Project.create({ name })
    res.redirect(`/`)
});

// Delete a project
app.post('/project/:id/delete', async(req, res) => {
    const project = await Project.findByPk(req.params.id)
    project.destroy();
    console.log('Project is bye bye');
    res.redirect('/');
});

// update a project
app.post('/project/:id/update', async(req, res) => {
    const project = await Project.findByPk(req.params.id)
    project.update({ name: req.body.name });
});

// Single project.. do we need?
app.get('/project/:id', async(req, res) => {
    const project = await Project.findOne({
        where: {
            id: req.params.id
        },
        include: [{ model: Task, as: 'tasks' }]
    });

    console.log('Your single project sir', { project });

    res.send(project);
});


app.listen(port, () => {
    console.log('Listening..', port);
    seeder.seedDb();
    console.log(`Example app listening at http://localhost:${port}`);
})