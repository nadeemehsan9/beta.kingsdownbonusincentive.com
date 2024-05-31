import React from "react";

export default function MoveTable() {
  return (
    <div className="left-rig-arrowtable">
      <button className="move" data-dir="prev">
        <img src="/images/left.png" alt="..." />
      </button>
      <button className="move" data-dir="next">
        <img src="/images/right.png" alt="..." />
      </button>
    </div>
  );
}
