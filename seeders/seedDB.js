const user = require('../models/users')
const bcrypt = require('bcrypt')
async function seedData() {



    const findFirstRole = await roles.findOne({
        authority:'ROLE_SUPERADMIN'
    })

    if(!findFirstRole){
        await roles.bulkCreate([
            {
                authority :'ROLE_SUPERADMIN',

            } , {
                authority :'ROLE_ADMIN',
            } , {
                authority :'ROLE_USER',
            }
        ])
    }
     const findAdminRole = await roles.findOne({ authority : "ROLE_SUPERADMIN"})
    const findFirstUser = await user.findOne({email: 'priyasharma@gmail.com'})
   console.log(findFirstUser);
    if(!findFirstUser) {
        await user.create({
            firstName: 'Priya',
            lastName: 'Sharma',
            email:'priyasharma@gmail.com',
            password: await bcrypt.hash('pri@123' , 8),
            roleId: findAdminRole.id

        })
    }
}

module.exports= {
    seedData
}