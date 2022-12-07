import React from "react";



export const  Tooltip  = (props:any) =>  {
      return (

        <div className="tooltip-container">
          {props.children}
          <div>
              <span className={`tooltip-body` }>
                <p> {props.text} </p>
              </span>
          </div>
        </div>
      )
}