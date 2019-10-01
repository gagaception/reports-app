import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const Report = ({ report }) => (
  <div className="eventContainer">
    <h2>
      {report.title}
      <Link to={`/reports/${report.id}/edit`}>Edit</Link>
    </h2>
    <p>{report.description}</p>
    <a href="#" download>{report.filename}</a>
  </div>
);

Report.propTypes = {
  report: PropTypes.shape(),
};

Report.defaultProps = {
  report: undefined,
};

export default Report;