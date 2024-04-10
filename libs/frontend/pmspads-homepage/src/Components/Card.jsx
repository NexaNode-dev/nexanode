import React from 'react';
import '../Styles/AboutPage.css';

const Card = ({ title, content }) => {
  return (
    <div>
      <h2 >{title}</h2>
      <p>{content}</p>
    </div>
  );
};

export default Card;
