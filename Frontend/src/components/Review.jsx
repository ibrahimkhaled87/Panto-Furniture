import React from "react"

function Review(props) {
    return <div className="review">
        <div className="info">
            <div className="img-wrapper">{props.img}</div>
            <h3>{props.name}</h3>
            <p className="location">{props.location}</p>
            <p className="detail">"{props.detail}"</p>
            <p className="rating">{props.rating}</p>
        </div>
    </div>
}

export default Review;