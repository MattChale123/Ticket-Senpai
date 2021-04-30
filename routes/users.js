var express = require('express');
var router = express.Router();
const models = require('../models')
const bcrypt = require('bcrypt');
const session = require('express-session');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/register', async (req, res) => {
  if (!req.body.username || !req.body.password|| !req.body.city || !req.body.state) {
    return res.status(400).json({
      error: 'Please include username, password, city, and state'
    })
  }

  const user = await models.User.findOne({
    where: {
      username: req.body.username
    }
  })
    if (user) {
      return res.status(400).json({
        error: 'Username already in use. Pick another'
      })
    }
  const hash = await bcrypt.hash(req.body.password, 10)
  const newUser = await models.User.create({
    username: req.body.username,
    password: hash,
    email: req.body.email,
    city: req.body.city,
    state: req.body.state
  })
  console.log(newUser)
  return res.status(201).json(newUser);
})
router.post('/login', async (req, res) => {
    console.log(req.body)
    if (!req.body.username || !req.body.password) {
      return res.status(400).json({
        error: 'Please include username and password.'
      })
    }
    const user = await models.User.findOne({
      where: {
        username: req.body.username
      },
    })
    if (!user) {
      return res.status(404).json({
        error: 'No username with that username. Please register an account.'
      })
    }
    const match = await bcrypt.compare(req.body.password, user.password)
    if (!match) {
      return res.status(401).json({
        error: "Password is not correct."
      })
    }
    req.session.user = user

    delete user.password



  res.json({
    id: user.id,
    username: user.username,
    city: user.city,
    state:user.state
  });
})
router.get('/logout', (req, res) => {
  req.session.user = null

  res.json({
    success: 'Logged out successfully.'
  })
})
router.get('/current', (req, res) => {
  const { user } = req.session
    if (user) {
      res.json({
        id: user.id,
        username: user.username,
        })
      } else {
        res.status(401).json({
          error: 'Not logged in',
        });
    }
  
})

module.exports = router;
