import React from 'react';
import ListStudent from './ListStudent';
import { useSelector, useDispatch } from 'react-redux'
import axios from 'axios'

const Student = () => {
    const dispatch = useDispatch();
    const form = useSelector(state => state.form)
    const students = useSelector(state => state.student)
    let URL = 'http://localhost/api/students'
    const addstudent = async () => {
        await axios.post(URL, form)
        console.log(students.length > 0 ? students[students.length - 1].no + 1 : 0)
        dispatch({
            type: 'ADD_STUDENT', state: {
                ...form,
                no: students.length > 0 ? students[students.length - 1].no + 1 : 0,
            }
        })
    }
console.log('form',form)
  
    return (
        <div>
            student
            <ListStudent />
            {form.name}
            {form.surname}
            {form.id}
            {form.Major}
            {form.GPA}
            <br />
            <input placeholder='name'
                name='name'
                type='text'
                onChange={(e) => dispatch({ type: 'CHANGE_NAME', name: e.target.value })} /><br />
            <input placeholder='Surname'
                name='surname'
                type='text'
                onChange={(e) => dispatch({ type: 'CHANGE_SURNAME', surname: e.target.value })} /><br />

            <input placeholder='ID'
                name='id'
                type='text'
                onChange={(e) => dispatch({ type: 'CHANGE_ID', id: e.target.value })} /><br />

            <input placeholder='Major'
                name='major'
                type='text'
                onChange={(e) => dispatch({ type: 'CHANGE_MAJOR', Major: e.target.value })} /><br />

            <input placeholder='GPA'
                name='GPA'
                type='number'
                onChange={(e) => dispatch({ type: 'CHANGE_GPA',GPA: e.target.value })} /><br />

                <button onClick={addstudent}>
                    ADD
                </button>

            

        </div>

    )
}
export default Student


