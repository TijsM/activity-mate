import React from "react";

function ActivityBlock({title, shortTerm, longTerm}) {
    console.log('title', title)
  return (
    <div>
     <strong>{title}</strong>
      <div>
        {shortTerm} / {longTerm}
      </div>
    </div>
  );
}

export default ActivityBlock;
