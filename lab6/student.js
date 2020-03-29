
let express = require('express');
let bodyParser = require('body-parser');
let router = express.Router();
let cors = require('cors');
let app = express();
app.use(cors());

// all of our routes will be prefixed with /api
app.use('/api', bodyParser.json(), router);   //[use json]
app.use('/api', bodyParser.urlencoded({ extended: false }), router);

let students = [{ 'no': 0, 'name': 'pooh', 'surname': 211, 'id': '1', 'Major': 'CoE', 'GPA': 2.0 },
                { 'no': 1, 'name': 'vinnie', 'surname': 111, 'id': '2', 'Major': 'Coc', 'GPA': 2.01 }
];
router.route('/students')
    // get all students
    .get((req, res) => res.json(students))

    // insert a new student
    .post((req, res) => {
        var student = {};
        student.no = students[students.length - 1].no + 1;
        student.name = req.body.name;
        student.surname = req.body.surname;
        student.id = req.body.id;
        student.Major = req.body.Major;
        student.GPA = req.body.GPA;
        students.push(student);
        res.json({ message: 'Student created!' })
    })
 
    router.route('/students/:student_no')
    .get ( (req,res) => {
         let no = req.params.student_no;
         let index = students.findIndex( student => (student.no === +no) )
         res.json(students[index])                   // get a student
     })  
 
    .put ( (req,res) => {                               // Update a student
        let no = req.params.student_no;
        let index = students.findIndex( student => (student.no === +no) )
        students[index].name = req.body.name; 
        students[index].surname = req.body.surname;
        students[index].id = req.body.id;
        students[index].Major = req.body.Major;  
        students[index].GPA = req.body.GPA;   
        res.json({ message: 'Bear updated!' + req.params.student_no});
    })
 
    .put((req,res)=>{
        let no = req.params.student_no
        let index = students.findIndex(student =>(student.no === +no))
        students[index].id = req.body.id;
        students[index].name = req.body.name;
        students[index].surname = req.body.surname;
        students[index].Major = req.body.Major;
        students[index].GPA = req.body.GPA;
        res.json({message: 'Student updated!'+ req.params.student_no});
    })
    .delete ( (req,res) => {                   // Delete a student
        // delete     students[req.params.student_no]
        let no = req.params.student_no;
        let index = students.findIndex( student => student.no === +no  )
        students.splice(index,1) 
        res.json({ message: 'Bear deleted: ' + req.params.student_no});
    })
 


app.use("*", (req, res) => res.status(404).send('404 Not found'));
app.listen(80, () => console.log("Server is running"));
