import React from 'react';
import { useDispatch } from 'react-redux';
import { toggleTaskAsync, deleteTaskAsync } from '../redux/todoSlice';

const SubTaskList = ({ id, todo, title, completed }) => {
  const dispatch = useDispatch();

  const handleCheckboxClick = () => {
    dispatch(toggleTaskAsync({ todoid: todo, id, completed: !completed }));
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
        <button className='btn btn-sm btn-danger' disabled={!completed}>
          <i className='fas fa-trash'></i>
        </button>
      </div>
    </li>
  );
};

export default SubTaskList;
