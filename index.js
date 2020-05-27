const Joi = require('joi');
const express = require('express');
const app = express();

app.use(express.json());

const courses = [{
        id: 1,
        name: 'Laravel Fundamentals'
    },
    {
        id: 2,
        name: 'Javascript Fundamentals'
    },
    {
        id: 3,
        name: 'Vuejs Fundamentals'
    },
];

app.get('/', (req, res) => {
    res.send('Hello there!! Dope courses here.')
});


app.get('/api/courses', (req, res) => {
    res.send(courses)
});

app.get('/api/courses/:id', (req, res) => {
    let course = courses.find(c => c.id === parseInt(req.params.id));
    if (!course) return res.status(404).send('The course with the given ID was not found.')
    res.send(course);
});

app.post('/api/courses', (req, res) => {
    // validate
    const {
        error
    } = validateCourse(req.body);

    // If invalid, return 400 - Bad request
    if (error) return res.status(400).send(error.details[0].message);

    const course = {
        id: courses.length + 1,
        name: req.body.name
    };

    courses.push(course);

    res.send(course);
});

app.put('/api/courses/:id', (req, res) => {
    // look up the course
    let course = courses.find(c => c.id === parseInt(req.params.id));
    // If not existing, return 404
    if (!course) return res.status(404).send('The course with the given ID was not found.')

    // Validate
    const {
        error
    } = validateCourse(req.body);

    // If invalid, return 400 - Bad request
    if (error) return res.status(400).send(error.details[0].message);


    // Update course
    course.name = req.body.name;
    // return updated course
    res.send(course);
});

app.delete('/api/courses/:id', (req, res) => {

    // look up the course
    let course = courses.find(c => c.id === parseInt(req.params.id));
    // If not existing, return 404
    if (!course) return res.status(404).send('The course with the given ID was not found.')

    // Delete 
    const index = courses.indexOf(course);
    courses.splice(index, 1);

    // Return course
    res.send(course);
});


function validateCourse(course) {
    const schema = {
        name: Joi.string().min(3).required()
    };

    return Joi.validate(course, schema);
}


const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Listening on port ${port}`)
})