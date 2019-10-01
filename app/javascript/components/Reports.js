import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom'; 

class Reports extends React.Component {
  renderReports() {
    const {
      reports,
      activeId
    } = this.props;

    return reports.map(report => (
      <li key={report.id}>
        <Link to={`/reports/${report.id}`} className={activeId === report.id ? 'active' : ''}>
        {report.title}</Link>
      </li>
    ));
  }

  render() {
    return ( 
      <section  className="reportList">
        <h2>
          Reports
          <Link to="/reports/new">New report</Link>
        </h2>
        <ul>{ this.renderReports()}</ul>
      </section>
    );
  }
}

Reports.propTypes = {
  reports: PropTypes.arrayOf(PropTypes.object),
};

Reports.defaultProps = {
  reports: [],
  activeId: undefined,
};

export default Reports;