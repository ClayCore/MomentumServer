let express = require('express');
let Users = require('./users.js');
let router = express.Router();

// GET API from the database
router.get('/get', async (req, res) => {
    Users.find()
        .exec()
        .then((data, err) => {
            if (err) return res.json({ success: false, error: err });
            return res.json({ success: true, data: data });
        })
        .catch(err => {
            return res.json({success: false, error: err});
        });
});

module.exports = router;
