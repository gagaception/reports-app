import React from 'react';
import PropTypes from 'prop-types';

const Report = ({ report }) => (
  <div className="eventContainer">
    <h2>
      {report.title}
    </h2>
  </div>
);

Report.propTypes = {
  report: PropTypes.shape(),
};

Report.defaultProps = {
  report: undefined,
};

export default Report;