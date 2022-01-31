import React from 'react';
import PropTypes from 'prop-types';


const Header = ({ text }) => {
  return (
  
      <header style={{ backgroundColor: 'blue'}}>
        <div className='container'>
          <h1>{text}</h1>
        </div>
      </header>
    
  );
};

Header.defaultProps = {
  text: 'Feedback UI',
}

Header.propTypes = {
  text: PropTypes.string,
}

export default Header;
