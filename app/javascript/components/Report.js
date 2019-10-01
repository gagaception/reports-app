import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const Report = ({ report }) => (
  <div className="reportContainer">
    <h2>
      {report.title}
      <Link to={`/reports/${report.id}/edit`}>Edit</Link>
    </h2>
    <p>{report.description}</p>
    <a href={`/api/reports/${report.id}/download_file`} download target="_blank">{report.filename}</a>
  </div>
);

Report.propTypes = {
  report: PropTypes.shape(),
};

Report.defaultProps = {
  report: undefined,
};

export default Report;