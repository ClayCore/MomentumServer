let express = require('express');
let Users = require('./users.js');
let router = express.Router();

// GET API from the database
router.get('/get', async (req, res) => {
    Users.find()
        .exec()
        .then((data, error) => {
            if (err) return res.json({ success: false, error: err });
            return res.json({ success: true, data: data });
        });
});

module.exports = router;