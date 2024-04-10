import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { IoIosMenu } from "react-icons/io";
import StyledNavLink from './StyledNavlink.jsx';

const Header = () => {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLinkClick = () => {
    setIsMenuOpen(false); // Sluit de dropdown wanneer er op een link wordt geklikt
  };

  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '0 20px',
      height: 80,
      backgroundColor: '#1991CE',
      color: 'white'
    }}>
      <div>
        {location.pathname !== '/' && (
          <StyledNavLink to="/" style={{
            fontSize: 20,
            fontWeight: 'bold',
            color: 'white',            
          }} onClick={handleLinkClick}>
            Home
          </StyledNavLink>
        )}
      </div>
      <div style={{ position: 'relative' }}>
        <IoIosMenu size={40} onClick={handleMenuToggle} />
        {isMenuOpen && (
          <div style={{
            position: 'absolute',
            top: '100%',
            left: '-20px',
            backgroundColor: '#1991CE',
            padding: '10px',
            borderRadius: '5px',
            border: '2px solid white',
          }}>
            <StyledNavLink to="/about" style={{ color: 'white', display: 'block', marginBottom: '10px' }} onClick={handleLinkClick}>About</StyledNavLink>
            <StyledNavLink to="/contact" style={{ color: 'white', display: 'block' }} onClick={handleLinkClick}>Contact</StyledNavLink>
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;
