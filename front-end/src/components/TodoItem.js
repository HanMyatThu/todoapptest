import React from 'react';
import { useDispatch } from 'react-redux';
import { toggleCompleteAsync, deleteTodoAsync } from '../redux/todoSlice';
import SubTaskLists from './SubTaskLists';

const TodoItem = ({ id, title, completed, subtasks }) => {
  const dispatch = useDispatch();

  const handleCheckboxClick = () => {
    dispatch(toggleCompleteAsync({ id, completed: !completed }));
  };

  const handleDeleteClick = () => {
    dispatch(deleteTodoAsync({ id }));
  };

  return (
    <li className={`list-group-item ${completed && 'list-group-item-success'}`}>
      <div className='d-flex justify-content-between'>
        <span className='d-flex align-items-center'>
          <input
            type='checkbox'
            className='mr-3'
            checked={completed}
            onChange={handleCheckboxClick}
          ></input>
          {title}
        </span>
        <button
          onClick={handleDeleteClick}
          className='btn btn-danger'
          disabled={!completed}
        >
          Delete
        </button>
      </div>
      <hr />
      <div className='mt-2'>
        <h6 className='text-navy'>Tasks</h6>
        <ul className='list-group'>
          {subtasks.map((task) => (
            <SubTaskLists
              key={task._id}
              id={task._id}
              todo={task.todo}
              title={task.title}
              completed={task.status}
            />
          ))}
        </ul>
      </div>
    </li>
  );
};

export default TodoItem;
