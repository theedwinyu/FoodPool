const router = require('express').Router();
let User = require('../models/users.model');

router.route('/').get((req, res) => {
  User.find()
    .then(users => res.json(users))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
    const fullName = req.body.fullName;
    const phoneNumber = req.body.phoneNumber;
    const address = req.body.address;
    const email = req.body.email;
    const password = req.body.password;

    const newUser = new User({
      fullName,
      phoneNumber,
      address,
      email,
      password
    });

    newUser.save()
      .then(() => res.json('User added!'))
      .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/userCheck').post((req, res) => {
    const phoneNumber = req.body.phoneNumber;  
    const password = req.body.password;
    var exists = null;
    console.log(req.body)

    User.find({phoneNumber: phoneNumber})
    .then(user => {
      if (user.length === 0) {
        res.json(exists)
      } else {
        if (password === user[0].password) {
            exists = user[0]
            res.json(exists)
        } else {
            res.json(exists)
        }
      }
    }).catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').delete((req, res) => {
    Exercise.findByIdAndDelete(req.params.id)
      .then(() => res.json('User deleted.'))
      .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/updateRoomId/:id').post((req, res) => {
    User.findById(req.params.id)
      .then(user => {
        user.roomId = req.body.roomId;

        user.save()
          .then(() => res.json('User updated!'))
          .catch(err => res.status(400).json('Error: ' + err));
      })
      .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;