import React, { useEffect } from 'react'
import {useSelector,useDispatch} from 'react-redux'
import axios from 'axios'
import { log } from 'util';

const ListStudent = () => {

    const dispatch = useDispatch();
    const form = useSelector(state => state.form)
    const students = useSelector(state=> state.student);
    console.log('student',students);
    

    let URL = 'http://localhost/api/students'
    useEffect(() => {
        getStudent();
    }, [])
    const getStudent = async ()=>{
        const result = await axios.get(URL)
        console.log(result.data)
        dispatch({type: 'GET_STUDENTS',state: result.data})
       
    }
    const deleteStudent = async (e)=>{
        await axios.delete(`http://localhost/api/students/${students.no}`)
        console.log(students.no)
        getStudent();
    }

    const update = async(studentsno)=>{
         console.log('studentsno',studentsno)
        await axios.put(`http://localhost/api/students/${studentsno}`,form)

        dispatch(
            {
                type:'UPDATE_STUDENT',
                no:studentsno,
                student:{...form,no: studentsno}
            }
        )
        // getStudent()
    }
    
    const printStudents = ()=>{
        if(students && students.length){
            return students.map((student,index)=>{

                return(
                    <li key={index}>
                            no: {student.no}, 
                            {student.name}  {student.surname  } : 
                            {student.id} Major: {student.Major} GPA:{student.GPA}
                            <button onClick={(e)=>deleteStudent(e)}>DEL</button>
                            <button onClick={(e)=>update(student.no)}>UP</button>
                    </li> 
                )
            })
        }
        else{
            return(<h1>No data</h1>)
        }
    }
    return (

        <div>
            List
            <ul>
                {printStudents()}</ul>
        </div>

    )
}
export default ListStudent
