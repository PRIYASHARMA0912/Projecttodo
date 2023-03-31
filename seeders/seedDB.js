const user = require('../models/users')
const bcrypt = require ('bcryptjs')

async function seedData() {
    const findFirstUser = await user.findOne({email: 'priyasharma@gmail.com'})
    if(!findFirstUser) {
        await user.create({
            firstName: 'Priya',
            lastName: 'Sharma',
            email:'priyasharma@gmail.com',
            password: await bcrypt.hash('password' , 8)

        })
    }
}