const { check } = require('express-validator');

exports.checkTask = [
    check('taskName', 'Name is requied').not().isEmpty(),
    check('stataus', 'Status is requied').not().isEmpty(),
    check('taskDate', 'taskDate is requied').isDate()
]
