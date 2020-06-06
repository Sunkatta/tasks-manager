import React from 'react';
import { useState } from 'react';
import { saveTask, getTaskById, getUserTasks } from '../../../core/api/tasks.api';
import { Redirect } from 'react-router-dom';
import { useEffect } from 'react';
import './TaskEdit.css';

export function TaskEdit(props) {
    const [currentTask, setCurrentTask] = useState({title: '', description: '', authorId: '', authorName: '', status: '', duration: 0 });
    const [shouldRedirect, setShouldRedirect] = useState(false);

    useEffect(() => {
        if (props.computedMatch.params.id) {
            getTaskById(props.computedMatch.params.id).then((result) => {
                setCurrentTask(result.data);
            })
        }
    }, [props.computedMatch.params.id]);

    const onInputChange = (event) => {
        event.persist();
        setCurrentTask((prevState) => ({
            ...prevState,
            [event.target.name]: event.target.value
        }));
    }

    const onTaskSave = (event) => {
        event.preventDefault();
        saveTask(currentTask).then(() => {
            setShouldRedirect(true);

            if (localStorage.getItem('userTasks')) {
                localStorage.removeItem('userTasks');
            }

            getUserTasks().then((userTasks) => {
                localStorage.setItem('userTasks', JSON.stringify(userTasks));
            }, (error) => {
                console.log(error);
            });
        }).catch((error) => {
            console.log(error);
        });
    } 

    return(
        <>
        { shouldRedirect && <Redirect to="/tasks"></Redirect> }
        <div className="task-edit-wrapper">
            <form className="task-edit-form" onSubmit={onTaskSave}>
                <div className="form-group">
                    <label htmlFor="title">Title</label>
                    <input className="form-control" type="text" name="title" id="title" onChange={onInputChange} value={currentTask.title}/>
                </div>
                <div className="form-group">
                    <label htmlFor="description">Description</label>
                    <input className="form-control" type="text" name="description" id="description" onChange={onInputChange} value={currentTask.description}/>
                </div>
                <div className="form-group">
                    <label htmlFor="duration">Duration</label>
                    <input className="form-control" type="number" name="duration" id="duration" onChange={onInputChange} value={currentTask.duration}/>
                </div>
                <div className="form-group">
                    <label htmlFor="status">Status: </label>
                    <select name="status" id="status" className="form-control" onChange={onInputChange} value={currentTask.status}>
                        <option value="ToDo">To Do</option>
                        <option value="InProgress">In Progress</option>
                        <option value="Done">Done</option>
                    </select>
                </div>
                <button className="btn btn-primary">Save Task</button>
            </form>
        </div>
        </>
    );
}
