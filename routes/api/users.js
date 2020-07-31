const express = require('express');
const router = express.Router();

// @route     GET api/users
// @desc      Test route
// @access    Public (no auth token required, achieved by auth middleware)
router.get('/', (req, res) => res.send('User router'));

module.exports = router;