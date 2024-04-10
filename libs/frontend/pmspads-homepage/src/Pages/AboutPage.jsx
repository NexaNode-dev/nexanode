import React, { useState, useEffect } from 'react';
import '../Styles/AboutPage.css';
import johanData from '../Assets/AboutJohan.json';
import andyData from '../Assets/AboutAndy.json';
import johanImage from '../Assets/vrxj.png';
import andyImage from '../Assets/andy.png';
import { RiMailSendFill } from "react-icons/ri";
import { IoLogoLinkedin } from "react-icons/io";
import { FaGithub } from "react-icons/fa";

const AboutPage = () => {
  const [johanContent, setJohanContent] = useState([]);
  const [andyContent, setAndyContent] = useState([]);

  useEffect(() => {
    setJohanContent(johanData.aboutContent);
    setAndyContent(andyData.aboutContent);
  }, []);

  return (
    <div className="about-page">
      <div className="about-section">
        <div className="about-picture-wrapper">
          <img
            src={johanImage}
            alt="Johan"
            className="about-picture"
          />
          <div className="contact-icons">
            <a href="mailto:johan@nexanode.dev"><RiMailSendFill size={30} /></a>
            <a href="https://www.linkedin.com/in/johanvrolix/"><IoLogoLinkedin size={30} /></a>
            <a href="https://github.com/vrxj81"><FaGithub size={30} /></a>
          </div>
        </div>
        {johanContent.map((item, index) => (
          <div className="card" key={index}>
            <h2 className="card-title">{item.title}</h2>
            <p className="card-content">{item.content}</p>
          </div>
        ))}
      </div>
      <div className="about-section">
        <div className="about-picture-wrapper">
          <img
            src={andyImage}
            alt="Andy"
            className="about-picture"
          />
          <div className="contact-icons">
            <a href="mailto:andy@nexanode.dev"><RiMailSendFill size={30} /></a>
            <a href="https://www.linkedin.com/in/andylauwers/"><IoLogoLinkedin size={30} /></a>
            <a href="https://github.com/Andyke87"><FaGithub size={30} /></a>
          </div>
        </div>
        {andyContent.map((item, index) => (
          <div className="card" key={index}>
            <h2 className="card-title">{item.title}</h2>
            <p className="card-content">{item.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AboutPage;
