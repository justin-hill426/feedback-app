import React from 'react';
import PropTypes from 'prop-types';


const Header = ({text}) => {
  return (
      <header style={{ color: '#ff6a95'}}>
        <div className='container'>
          <h1>{text}</h1>
        </div>
      </header>
    
  );
};

Header.defaultProps = {
  text: 'Feedback App',
}

Header.propTypes = {
  text: PropTypes.string,
}

export default Header;
