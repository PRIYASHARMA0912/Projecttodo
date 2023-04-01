const user = require('../models/users')
const { hashpassword } = require('../controller/ToDoContoller')

async function seedData() {
    const findFirstUser = await user.findOne({email: 'priyasharma@gmail.com'})
    if(!findFirstUser) {
        await user.create({
            firstName: 'Priya',
            lastName: 'Sharma',
            email:'priyasharma@gmail.com',
            password: hashpassword('password')

        })
    }
}

module.exports= {
    seedData
}