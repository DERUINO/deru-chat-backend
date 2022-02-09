const Role = require('../models/Role');
const Account = require('../models/Account');

class settingsController {

    async createRoles(res) {
        try {
            const userRole = new Role({value: 'USER'});
            const adminRole = new Role({value: 'ADMIN'});
            await userRole.save();
            await adminRole.save();
            res.json({ status: 200 });
        } catch (e) {
            console.log(e);
        }
    }

    async getUserInfo(req, res) {
        try {
            const { id } = req.body;

            const user = await Account.findOne({ _id: id }).lean();
            res.json({ data: user, status: 200 });
        } catch (e) {
            console.log(e);
            res.status(400).json({message: 'response error'});
        }
    }

    async getUsers(req, res) {
        try {
            const usersList = await Account.find().lean()
            res.json({ data: usersList, status: 200 })
        } catch (e) {
            console.log(e)
            res.status(400).json({message: 'response error'})
        }
    }
}

module.exports = new settingsController()