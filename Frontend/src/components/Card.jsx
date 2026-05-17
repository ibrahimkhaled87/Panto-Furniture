import React from "react";

function Card(props) {
    return <div className="card">
        <h4>{props.headline}</h4>
        <p>{props.description}</p>
        <a href={props.link}>More Info</a>
    </div>
}


export default Card;