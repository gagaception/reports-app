import React from 'react';
import axios from 'axios';
import Header from './Header';
import Reports from './Reports';
import Report from './Report';
import PropsRoute from './PropsRoute';
import ReportForm from './ReportForm';
import { Switch } from 'react-router-dom';
import PropTypes from 'prop-types';

class Main extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      reports: null
    };

    this.createReport = this.createReport.bind(this);
    this.updateReport = this.updateReport.bind(this);
  }

  componentDidMount() {
    axios
      .get('/api/reports.json', {
        withCredentials: true
      })
      .then(response => 
        this.setState({
        reports: response.data
      }))
      .catch((error) => {
        console.log(error);
      });
  }

  createReport(newReport)  {
    axios
      .post(
        "/api/reports.json", newReport,
        { withCredentials: true }
      )
      .then(response => {
        const savedReport = response.data;
        this.setState(prevState => ({
          reports: [...prevState.reports, savedReport],
        }));
        this.props.history.push(`/reports/${savedReport.id}`);
      })
      .catch(error => {
        console.log(error);
      });
  }

  updateReport(alteredReport) {
    axios
      .put(
        `/api/reports/${alteredReport.id}.json`, alteredReport,
        { withCredentials: true }
      )
      .then(response => {
        const { reports } = this.state;
        const idx = reports.findIndex(report => report.id === alteredReport.id);
        reports[idx] = alteredReport;
        this.props.history.push(`/reports/${alteredReport.id}`);
        this.setState({ reports });
      })
      .catch(error => {
        console.log(error);
      })
  }

  render() {
    const { reports } = this.state;
    if (reports === null) return null;

    const { match } = this.props;
    const reportId = match.params.id;
    const report = reports.find(e => e.id === Number(reportId));

    return ( 
      <div>
        <div className="grid">
          <Reports reports={reports} activeId={Number(reportId)} /> 
          <Switch>
            <PropsRoute exact path="/reports/new" component={ReportForm} onSubmit={this.createReport} />
            <PropsRoute
              exact
              path="/reports/:id/edit"
              component={ReportForm}
              report={report}
              onSubmit={this.updateReport}
            />
            <PropsRoute exact path="/reports/:id" component={Report} report={report} />
          </Switch>
        </div>
      </div>
    );
  }
}

Main.propTypes = {
  match: PropTypes.shape(),
  history: PropTypes.shape({ push: PropTypes.func }).isRequired,
};

export default Main;