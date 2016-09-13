var express = require('express');
var router = express.Router();
var Course = require('../models/course');

/* GET home page. */
router.get('/', (req, res) => {
  Course.find((err, courses) => {
    if (err)
      console.log(err);
    else
      res.json(courses);
  });
});

router.post('/', (req, res) => {
  new Course({
    name: req.body.name,
    description: req.body.description,
    instructor: req.body.instructor
  }).save((err, course) => {
    if (err)
      console.log(err);
    else
      res.json(course);
  });
});

router.get('/:id', (req, res) => {
  Course.findById(req.params.id, (err, course) => {
    if (err)
      console.log(err);
    else
      res.json(course);
  });
});

router.put('/:id', (req, res) => {
  Course.findByIdAndUpdate(
    req.params.id,
    { $set: {name: req.body.name, instructor: req.body.instructor, description: req.body.description}},
    {new: true},
    function(err, course) {
      res.json(course);
    }
  );
});

router.delete('/:id', (req, res) => {
  Course.findById(req.params.id, (err, course) => {
    course.remove();
    res.json(course);
  });
});

module.exports = router;
