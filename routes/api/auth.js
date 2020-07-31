const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const config = require('config');
const bcrypt = require('bcryptjs');
const { check, validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const User = require('../../models/User');
const e = require('express');

// @route     GET api/auth
// @desc      Test route
// @access    Public (no auth token required, achieved by auth middleware)
router.get('/', auth, async (req, res) => {
  try {
     const user = await User.findById(req.user.id).select('-password');
     res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route     POST api/auth
// @desc      Authenticate user and get token
// @access    Public (no auth token required, achieved by auth middleware)
router.post('/', [
  check('email', 'Please include a valid email').isEmail(),
  check('password', 'Password is required').exists()
], 
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res
        .status(400)
        .json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
      // see if the user exists
      let user = await User.findOne({ email: email });

      if (!user) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'Invalid Credentials' }] });
      }

      // verify password matches
      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'Invalid Credentials' }] });
      }

      // jwt
      const payload = {
        user: {
          id: user.id
        }
      }
      jwt.sign(
        payload, 
        config.get('jwtSecret'),
        { expiresIn: 36000 },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
        // tokens can be added to the headers to access protected routes
      );

    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }  
  }
);

module.exports = router;