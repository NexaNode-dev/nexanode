import React, { useState, useEffect } from 'react';
import '../Styles/ContactPage.css';


const ContactPage = () => {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const hours = currentTime.getHours();
  const minutes = currentTime.getMinutes();
  const seconds = currentTime.getSeconds();

  const formattedHours = hours % 12 || 12;

  return (
    <div className="contact-page">
      <div className="clock">
        <div className="hour-hand" style={{ transform: `rotate(${(formattedHours * 30) + (minutes / 2)}deg)` }} />
        <div className="minute-hand" style={{ transform: `rotate(${minutes * 6}deg)` }} />
        <div className="second-hand" style={{ transform: `rotate(${seconds * 6}deg)` }} />
        <div className="center-circle" />
      </div>
      <div>
        <h1>This page is under construction</h1>
      </div>
    </div>
  );
};

export default ContactPage;
