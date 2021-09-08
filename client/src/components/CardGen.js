import React from 'react';

const CardGen = (props) => {
    let data = props.data;
    return <div className="cardContainer">
        <img  src={data.image}></img>
        <div className="cardContainerText">
            <h3>{data.title}</h3>
            <p>{data.description}</p>
            <span>{data.url}</span>
        </div>
    </div>;
  }

export default CardGen;