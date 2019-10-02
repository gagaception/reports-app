import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom'; 

class Reports extends React.Component {
  constructor(props) {
    super(props);

    this.state ={
      currentPage: 1,
      reportsPerPage: 10
    }

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(event) {
    this.setState({
      currentPage: Number(event.target.id)
    });
  }

  render() {
    const { reports, activeId } = this.props;
    const { reportsPerPage, currentPage} = this.state;

    const indexOfLastReport = currentPage * reportsPerPage;
    const indexOfFirstReport = indexOfLastReport - reportsPerPage;
    const currentReports = reports.slice(indexOfFirstReport, indexOfLastReport);

    const renderReports = currentReports.map((report, index) => {
      return <li key={index}>
        <Link to={`/reports/${report.id}`} className={activeId === report.id ? 'active' : ''}>
        {report.title}</Link>
      </li>
    });

    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(reports.length / reportsPerPage); i++) {
      pageNumbers.push(i);
    }

    const renderPageNumbers = pageNumbers.map(number => {
      return (
        <li
          key={number}
          id={number}
          onClick={this.handleClick}
        >
          {number}
        </li>
      );
    });

    return ( 
      <section className="reportList">
        <h2>
          Reports
          <Link to="/reports/new">+ New report</Link>
        </h2>
        <ul>
          {renderReports}
        </ul>
        <ul id="pageNumbers">
          {renderPageNumbers}
        </ul>
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