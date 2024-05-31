import React from "react";

export default function MoveTable() {
  return (
    <div className="left-rig-arrowtable">
      <button className="move" data-dir="prev">
        <i className="bi bi-caret-left-fill"></i>
      </button>
      <button className="move" data-dir="next">
        <i className="bi bi-caret-right-fill"></i>
      </button>
    </div>
    
  );
}
