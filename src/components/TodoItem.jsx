import React from "react"

export default function TodoItem({onItemClick, onDeleteButtonClick, onEditButtonClick, item: { completed, title, id}}) {
  return (
    <li
      style={{ backgroundColor: getStyle(completed) }}
      onClick={() => onItemClick(id)}
    >
      {title}
      <button
        onClick={(e) => {
          e.stopPropagation();
          onEditButtonClick(id);
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
