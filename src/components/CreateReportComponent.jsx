import React, { Component } from "react";
//import '../createReport.css';
import ReportService from "../services/ReportService";

class CreateReportComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      id: this.props.match.params.id,
      date: "",
      description: "",
      amount: "",
      status: "",
      receiver: "",
      jk: "",
      no_telp: "",
      address: "",
    };
    this.changeDate = this.changeDate.bind(this);
    this.changeDescription = this.changeDescription.bind(this);
    this.changeAmount = this.changeAmount.bind(this);
    this.changeStatus = this.changeStatus.bind(this);
    this.changeReceiver = this.changeReceiver.bind(this);
    this.changeJk = this.changeJk.bind(this);
    this.changeNoTelpon = this.changeNoTelpon.bind(this);
    this.changeAddress = this.changeAddress.bind(this);
    this.saveOrUpdateMoney = this.saveOrUpdateMoney.bind(this);
  }

  // step 3
  componentDidMount() {
    // step 4
    if (this.state.id === "_add") {
      return;
    } else {
      ReportService.GetMoneyById(this.state.id).then((res) => {
        let money = res.data;
        this.setState({
            date: money.date,
            description: money.description,
            amount: money.amount,
            status: money.status,
            receiver: money.receiver,
            jk: money.jk,
            no_telp: money.no_telp,
            address: money.address,
        });
      });
    }
  }
  saveOrUpdateMoney = (e) => {
    e.preventDefault();
    let money = {
        date: this.state.date,
        description: this.state.description,
        amount: this.state.amount,
        status: this.state.status,
        receiver: this.state.receiver,
        jk: this.state.jk,
        no_telp: this.state.no_telp,
        address: this.state.address,
    };
    console.log("money => " + JSON.stringify(money));

    if (this.state.id === "_add") {
      ReportService.CreateMoney(money).then((res) => {
        this.props.history.push("/moneys");
      });
    } else {
      ReportService.UpdateMoney(money, this.state.id).then((res) => {
        this.props.history.push("/moneys");
      });
    }
  };

  changeDescription = (event) => {
    this.setState({ description: event.target.value });
  };

  changeDate = (event) => {
    this.setState({ date: event.target.value });
  };

  changeAmount = (event) => {
    this.setState({ amount: event.target.value });
  };

  changeStatus = (event) => {
    this.setState({ status: event.target.value });
  };

  changeReceiver = (event) => {
    this.setState({ receiver: event.target.value });
  };

  changeJk = (event) => {
    this.setState({ jk: event.target.value });
  };

  changeNoTelpon = (event) => {
    this.setState({ no_telp: event.target.value });
  };

  changeAddress = (event) => {
    this.setState({ address: event.target.value });
  };

  cancel() {
    this.props.history.push("/moneys");
  }

  getTitle() {
    return this.state.id === "_add" ? (
      <h1 className="ttl">Add Transaction</h1>
    ) : (
      <h1 className="ttl">Update Transaction</h1>
    );
  }
  render() {
    return (
      <div>
        <br></br>
        <div className="container">
          <div className="row">
            <div className="card col-md-6 offset-md-3 offset-md-3">
              {this.getTitle()}
              <div className="card-body">
                <form>
                  <div className="form-group">
                    <label> Date: </label>
                    <input
                      type="date"
                      placeholder="Date"
                      name="date"
                      className="form-control"
                      value={this.state.date}
                      onChange={this.changeDate}
                    />
                  </div>
                  <div className="form-group">
                    <label> Description: </label>
                    <input
                      placeholder="Description"
                      name="description"
                      className="form-control"
                      value={this.state.description}
                      onChange={this.changeDescription}
                    />
                  </div>
                  <div className="form-group">
                    <label> Amount: </label>
                    <input
                      placeholder="Amount"
                      name="amount"
                      className="form-control"
                      value={this.state.amount}
                      onChange={this.changeAmount}
                    />
                  </div>
                  <div className="form-group">
                    <label> Status: </label>
                    <select
                      name="status"
                      className="form-control"
                      value={this.state.status}
                      onChange={this.changeStatus}
                    >
                      <option>....</option>
                      <option value="debit">Debit</option>
                      <option value="kredit">Kredit</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label> Receiver: </label>
                    <input
                      placeholder="Receiver"
                      name="receiver"
                      className="form-control"
                      value={this.state.receiver}
                      onChange={this.changeReceiver}
                    />
                  </div>
                  <div className="form-group">
                    <label> Jk: </label>
                    <select
                      name="status"
                      className="form-control"
                      value={this.state.Jk}
                      onChange={this.changeJk}
                    >
                      <option>....</option>
                      <option value="L">Laki-Laki</option>
                      <option value="P">Perempuan</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label> No Telpon: </label>
                    <input
                      placeholder="NoTelpon"
                      name="no_telp"
                      className="form-control"
                      value={this.state.no_telp}
                      onChange={this.changeNoTelpon}
                    />
                  </div>
                  <div className="form-group">
                    <label> Address: </label>
                    <input
                      placeholder="Address"
                      name="address"
                      className="form-control"
                      value={this.state.address}
                      onChange={this.changeAddress}
                    />
                  </div>

                  <button
                    className="btn btn-success"
                    onClick={this.saveOrUpdateMoney}
                  >
                    Save
                  </button>
                  <button
                    className="btn btn-danger"
                    onClick={this.cancel.bind(this)}
                    style={{ marginLeft: "10px" }}
                  >
                    Cancel
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default CreateReportComponent;
