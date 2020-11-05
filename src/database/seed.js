const {User, Project, Task, sequelize} = require('./models');

class DatabaseSeeder {
    async seedDb() {
        await sequelize.drop();
        await sequelize.sync();

        const jeremy = await User.create({
            name: 'Jeremy',
            avatarUrl: 'https://a1cf74336522e87f135f-2f21ace9a6cf0052456644b80fa06d4f.ssl.cf2.rackcdn.com/images/characters_opt/p-Peep-Show-Robert-Webb.jpg'
        });

        const gerard = await User.create({
            name: 'Gerard',
            avatarUrl: 'https://y.yarn.co/23bfc2f2-5fad-4368-9d8f-a6e5025100b7_screenshot.jpg'
        });

        const johnson = await User.create({
            name: 'Johnson',
            avatarUrl: 'https://pbs.twimg.com/media/B5o_9VfCEAAxXMf.jpg'
        });

        const mark = await User.create({
            name: 'Mark',
            avatarUrl: 'https://www.dreamteamfc.com/c/wp-content/uploads/sites/4/2017/03/mark.jpg'
        });

        const dobby = await User.create({
            name: 'Dobb dobb-alina',
            avatarUrl: 'https://images.immediate.co.uk/production/volatile/sites/3/2020/04/Peep_Show_S6_EP3-091f8db.jpg?quality=45&resize=620,413'
        });

        const musicProject = await Project.create({
            name: 'Become musical genious'
        });

        const jobProject = await Project.create({
            name: 'Get better job'
        });

        const dobbyProject = await Project.create({
            name: 'Date dobby'
        })
    }
}

module.exports = { seeder: new DatabaseSeeder() }
