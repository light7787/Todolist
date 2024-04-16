import React from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';

const Todo = ({ id, title, description, mongoId, complete, deleteTodo, completeTodo }) => {
  return (
    <tr className=" border-b dark:bg-gray-800 dark:border-gray-700 text-white">
      <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
        {id + 1}
      </th>
      <td className={`px-6 py-4 ${complete ? "line-through" : ""}`}>
        {title}
      </td>
      <td className={`px-6 py-4 ${complete ? "line-through" : ""}`}>
        {description}
      </td>
      <td className="px-6 py-4">
        {complete ? "Completed" : "Pending"}
      </td>
      <td className="px-4 py-4 flex ">
        <button className="py-2 px-2  text-white  hover:bg-gray-600 focus:outline-none rounded-lg" onClick={() => deleteTodo(mongoId)}><DeleteIcon/></button>
        {!complete &&
          <button className="py-2 px-2  text-white hover:bg-gray-600 focus:outline-none rounded-lg " onClick={() => completeTodo(mongoId)}><CheckCircleOutlineIcon/></button>
        }
      </td>
    </tr>
  );
};

export default Todo;
