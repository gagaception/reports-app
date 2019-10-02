import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  isEmptyObject,
  validateForm
} from '../../helpers/helpers';

class ReportForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      report: props.report,
      errors: {}
    }
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.fileUploadHandler = this.fileUploadHandler.bind(this);
  }

  componentWillReceiveProps({ report }) {
    this.setState({ report });
  }

  handleSubmit(e) {
    e.preventDefault();
    const { report } = this.state;
    const errors = validateForm(report);
    const data = new FormData();

    for (var key in report) {
      data.append(key, report[key]);
    }

    if (!isEmptyObject(errors)) {
      this.setState({ errors });
    } else {
      const { onSubmit } = this.props;
      if (onSubmit.name == "bound updateReport") {
        onSubmit(report);
      }
      onSubmit(data);
    }
  }

  renderErrors() {
    const { errors } = this.state;
    if (isEmptyObject(errors)) {
      return null;
    }

    return (
      <div className="errors">
        <ul>
          {Object.values(errors).map(error => (
            <li key={error}>{error}</li>
          ))}
        </ul>
      </div>
    )
  }

  handleInputChange(e) {
    const { target } = e;
    const { name } = target;
    const value = target.value;
    this.updateReport(name, value);
  }

  fileUploadHandler(e) {
    const { target } = e;
    const { name } = target;
    const value = target.files[0];
    this.updateReport(name, value);
  }

  updateReport(key, value) {
    this.setState(prevState => ({
      report: {
        ...prevState.report,
        [key]: value,
      },
    }));
  }

  render() {
    const { report } = this.state
    const { onSubmit } = this.props;

    return (
      <div>
        <h2>New Report</h2>
        <form className="reportForm" onSubmit={this.handleSubmit}>
          <div className="formGroup">
            <input
              className="formControl"
              type="text"
              name="title"
              placeholder="Enter report's title"
              onChange={this.handleInputChange}
              value={report.title}
              required
            />
          </div>  
          <div className="formGroup">
            <textarea
              className="formControl"
              rows="20"
              type="text"
              name="description"
              placeholder = "Enter report's description"
              value={report.description}
              onChange={this.handleInputChange}
            />
          </div>
          {
            onSubmit.name == "bound updateReport" ?
            ''
            :
            <div className="formGroup">
              <input type="file" name="file" onChange={this.fileUploadHandler} />
            </div>
          }

          {this.renderErrors()}

          <div className="formActions">
            <button type="submit">Save</button>
          </div>
        </form>
      </div>
    );
  }
}

ReportForm.propTypes = {
  report: PropTypes.shape(),
  onSubmit: PropTypes.func.isRequired
};

ReportForm.defaultProps = {
  report: {
    title: '',
    description: '',
    file: ''
  },
};

export default ReportForm;