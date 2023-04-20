const db = require("./models");
const User = db.user;


function initialize() {

    // force: true will drop the table if it already exists
    db.sequelize.sync({ force: true }).then(() => {
        console.log('Drop and Resync Database with { force: true }');

        // const rolName = "SUPER_ADMIN";
        // User.createUserWithUserRol({
        //     "username": "root",
        //     "email": "root@root.es",
        //     "pswd": "1234567890",
        //     "name": "root",
        //     "surname": "root",
        //     "phone": "+34 627669080",
        //     "postalCode": 46009,
        //     "street": "Calle principal root",
        //     "locality": "Locality root",
        //     "country": "Spain",
        //     "userRolName":rolName
        // })
    });
}
module.exports = initialize;