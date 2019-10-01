import React from 'react';
import axios from 'axios';
import Header from './Header';
import Reports from './Reports';
import Report from './Report';
import PropsRoute from './PropsRoute';
import ReportForm from './ReportForm';
import { Switch } from 'react-router-dom';

class Main extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      reports: null,
    };
  }

  componentDidMount() {
    axios
      .get('/api/reports.json')
      .then(response => 
        this.setState({
        reports: response.data
      }))
      .catch((error) => {
        console.log(error);
      });
  }

  render() {
    const { reports } = this.state;
    if (reports === null) return null;

    const { match } = this.props;
    const reportId = match.params.id;
    const report = reports.find(e => e.id === Number(reportId));


    return ( 
      <div>
        <Header />
        <div className = "grid">
          < Reports reports = {
            reports
          }
          activeId = {
            Number(reportId)
          }
          /> 
          <Switch>
            <PropsRoute exact path="/reports/new" component={ReportForm} />
            <PropsRoute exact path="/reports/:id" component={Report} report={report} />
          </Switch>
        </div>
      </div>
    );
  }
}

export default Main;