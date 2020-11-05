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
    console.log('user created', user);
    res.redirect(req.headers.referer);
});

/*
    PROJECT END POINTS
*/


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
        }
    });

    const tasks = await Task.findAll({
        where: {
            ProjectId: req.params.id
        },
        include: [{ model: User }]
    });

    const todo = tasks.filter(x => x.status == 0);
    const doing = tasks.filter(x => x.status == 1);
    const done = tasks.filter(x => x.status == 2);

    const users = await User.findAll();

    //res.send({ project, tasks, users });
    res.render('tasks', { project, todo, doing, done, users });
});


// Tasks

// add a task
app.post('/project/:id/task/add', async(req, res) => {
    const { name, userid } = req.body;

    const project = await Project.findByPk(req.params.id)
    const user = await User.findByPk(userid);
    const task = await Task.create({
        desc: name,
        status: 0
    });

    project.addTask(task);
    user.addTask(task);

    res.redirect(`/project/${req.params.id}`);
});

// update a task
app.get('/task/:id/status/:status', async(req, res) => {

    const project = await Task.findByPk(req.params.id)
    project.update({status: req.params.status})

    console.log('Made it bitch');

    res.redirect(req.headers.referer);
});


app.listen(port, () => {
    console.log('Listening..', port);
    seeder.seedDb();
    console.log(`Example app listening at http://localhost:${port}`);
})