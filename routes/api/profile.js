const express = require('express');
const router = express.Router();

// @route     GET api/profile
// @desc      Test route
// @access    Public (no auth token required, achieved by auth middleware)
router.get('/', (req, res) => res.send('Profile router'));

module.exports = router;