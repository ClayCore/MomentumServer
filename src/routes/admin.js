let express = require('express');
let path = require('path');
let router = express.Router();

router.get('/admin', function(req, res, next) {
    res.sendFile(path.join(__dirname + 'frontend/build', index.html));
});

module.exports = router;