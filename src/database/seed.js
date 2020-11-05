const {User, Project, Task, sequelize} = require('./models');

class DatabaseSeeder {
    seedDb() {
        sequelize.sync().then(async() => {
            const jeremy = await User.create({
                name: 'Jeremy',
                avatarUrl: 'https://a1cf74336522e87f135f-2f21ace9a6cf0052456644b80fa06d4f.ssl.cf2.rackcdn.com/images/characters_opt/p-Peep-Show-Robert-Webb.jpg'
            });

            const johnson = await User.create({
                name: 'Johnson',
                avatarUrl: 'https://pbs.twimg.com/media/B5o_9VfCEAAxXMf.jpg'
            });

            const mark = await User.create({
                name: 'Mark',
                avatarUrl: 'https://i.ytimg.com/vi/r8ngDnWwFBI/maxresdefault.jpg'
            });

            const dobby = await User.create({
                name: 'Dobb dobb-alina',
                avatarUrl: 'https://images.immediate.co.uk/production/volatile/sites/3/2020/04/Peep_Show_S6_EP3-091f8db.jpg?quality=45&resize=620,413'
            });
            
        });
    }
}

module.exports = { seeder: new DatabaseSeeder() }
