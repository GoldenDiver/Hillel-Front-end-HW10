import React from "react"

export default function TodoItem({onItemClick, onDeleteButtonClick, onEditButtonClick, isEdit, onEditChange, item: { completed, title, id}}) {
  return (
    <li
      style={{ backgroundColor: getStyle(completed) }}
      onClick={() => onItemClick(id)}
    >
      <div className="title">
        {((isEdit!==title) ? (title) : (
          <input 
            onChange={onEditChange} 
            defaultValue={title} 
            onClick={(e) => {e.stopPropagation()}}
          />)
        )}
      </div>
      <button
        onClick={(e) => {
          e.stopPropagation();
          onEditButtonClick(title , id);
        }}
        title="Edit item"
      >
        Edit
      </button>
      <button
        onClick={(e) => {
          e.stopPropagation();
          onDeleteButtonClick(id);
        }}
        title="Delete item"
      >
        Delete
      </button>
    </li>
  );
}

function getStyle(completed) {
  return completed ? "lightblue" : "yellow";
}