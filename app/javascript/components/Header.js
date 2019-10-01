import React from 'react';

const Header = props => ( 
  <header >
    <h1>Reports Info</h1>
    { (props.userLoggedIn)
      ? <div className="header-right"> 
          <p>{props.userEmail.email}</p>
          <a onClick={() => props.logOut()}>Log Out</a>
        </div>
      : <div className="header-right"><p>Unauthorized</p></div>
    }
  </header>
);

export default Header;