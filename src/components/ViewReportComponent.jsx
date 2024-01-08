import React, { Component } from "react";
import ReportService from "../services/ReportService";

class ViewReportComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      id: this.props.match.params.id,
      money: {},
    };
  }

  componentDidMount() {
    ReportService.GetMoneyById(this.state.id).then((res) => {
      this.setState({ money: res.data });
    });
  }

  render() {
    return (
      <div>
        <br></br>
        <div className="card col-md-6 offset-md-3">
          <h3 className="text-center">View Transaction Details</h3>
          <div className="card-body">
            <div className="row">
              <label> Date: </label>
              <div> {this.state.money.date}</div>
            </div>
            <div className="row">
              <label> Description: </label>
              <div> {this.state.money.description}</div>
            </div>
            <div className="row">
              <label> Amount: </label>
              <div> {this.state.money.amount}</div>
            </div>
            <div className="row">
              <label> Status: </label>
              <div> {this.state.money.status}</div>
            </div>
            <div className="row">
              <label> Receiver: </label>
              <div> {this.state.money.receiver}</div>
            </div>
            <div className="row">
              <label> Jk: </label>
              <div> {this.state.money.jk}</div>
            </div>
            <div className="row">
              <label> No Telpon: </label>
              <div> {this.state.money.no_telp}</div>
            </div>
            <div className="row">
              <label> Address: </label>
              <div> {this.state.money.address}</div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ViewReportComponent;
