import React from 'react';
import './PageNotFound.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFaceTired } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

const PageNotFound = () => {
  return (
    <div className="page-not-found">
      <h1>
        <FontAwesomeIcon icon={faFaceTired} className="icon-tired" />
      </h1>
      <p>Oops! The page you are looking for does not exist.</p>
      <Link to="/">Please back to Home Page</Link>
    </div>
  );
};

export default PageNotFound;
