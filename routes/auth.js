const express = require('express')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const config = require('config')
const { check, validationResult } = require('express-validator')
const router = express.Router()
const User = require('../model/User')

// @route    GET api/auth
// @desc     Get logged in user
// @access   Private
router.get('/', (req, res) => {
  res.send('Get logged in user')
})

// @route    Post api/auth
// @desc     Auth user & get token
// @access   Public
router.post(
  '/',
  [
    check('email', 'Please include valid email').isEmail(),
    check('password', 'Password is required').exists()
  ],
  async (req, res) => {
    const erros = validationResult(req)
    if (!erros.isEmpty()) {
      return res.status(400).json({ errors: erros.array() })
    }

    const { email, password } = req.body
    try {
      let user = await User.findOne({ email })
      if (!user) {
        return res.status(400).json({ msg: 'Invalid Credentials' })
      }

      const isMatch = await bcrypt.compare(password, user.password)
      if (!isMatch) {
        return res.status(400).json({ msg: 'Invalid Credentials' })
      }

      const payload = {
        user: {
          id: user.id
        }
      }

      jwt.sign(
        payload,
        config.get('jwtSecret'),
        {
          expiresIn: 360000
        },
        (err, token) => {
          if (err) throw err
          res.json({ token })
        }
      )
    } catch (err) {
      console.log(err.message)
      res.status(500).send('Server error')
    }
  }
)

module.exports = router
