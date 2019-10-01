import React from 'react';
import PropTypes from 'prop-types';

const Report = ({ report }) => (
  <div className="eventContainer">
    <h2>
      {report.title}
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