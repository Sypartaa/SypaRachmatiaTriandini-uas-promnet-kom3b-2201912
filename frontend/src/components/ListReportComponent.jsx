import React, { Component } from 'react'
import ReportService from '../services/ReportService'

class ListReportComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
                moneys: []
        }
        this.addMoney = this.addMoney.bind(this);
        this.editMoney = this.editMoney.bind(this);
        this.deleteMoney = this.deleteMoney.bind(this);
    }

    fetchMoneys() {
        ReportService.GetMoneys()
          .then((res) => {
            if (!res.data) {
              this.props.history.push('/add-money/_add');
            } else {
              this.setState({ moneys: res.data });
            }
          });
      }

    deleteMoney(id){
        ReportService.DeleteMoney(id).then( res => {
            this.setState({moneys: 
                this.state.moneys.filter(money => money.id !== id)});
        });
    }
    viewMoney(id){
        this.props.history.push(`/view-money/${id}`);
    }
    editMoney(id){
        this.props.history.push(`/add-money/${id}`);
    }

    componentDidMount() {
        this.fetchMoneys();
      }

    addMoney(){
        this.props.history.push('/add-money/_add');
    }

    render() {
        return (
            <div>
                 <h2 className="text-center"> Transactions List </h2>
                 <br></br>
                 <div className = "row">
                        <table className 
                        = "table table-striped table-bordered table-responsive">

                            <thead>
                                <tr>
                                    <th>Date</th>
                                    <th>Description</th>
                                    <th>Amount</th>
                                    <th>Status</th>
                                    <th>Receiver</th>
                                    <th>Jk</th>
                                    <th>No Telpon</th>
                                    <th>Address</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    this.state.moneys.map(
                                        money => 
                                        <tr key = {money.ID}>
                                            <td>{money.date}</td>
                                            <td>{money.description}</td>
                                            <td>{money.amount}</td>
                                            <td>{money.status}</td>
                                            <td>{money.receiver}</td>
                                            <td>{money.jk}</td>
                                            <td>{money.no_telp}</td>
                                            <td>{money.address}</td>
                                            <td>
                                                <button 
                                                    onClick={ () => this.editMoney(money.id)} 
                                                    className="btn btn-info">
                                                        Update 
                                                </button>

                                                <button 
                                                    style={{marginLeft: "2px"}} 
                                                    onClick={ () => this.deleteMoney(money.id)} 
                                                    className="btn btn-danger">
                                                        Delete 
                                                </button>

                                                <button 
                                                    style={{marginLeft: "2px"}} 
                                                    onClick={ () => this.viewMoney(money.id)}
                                                    className="btn btn-info">
                                                        View 
                                                </button>
                                            </td>
                                        </tr>
                                    )
                                }
                            </tbody>

                        </table>
                        <div className = "row">
                    <button className="btn btn-primary"
                     onClick={this.addMoney}> Add Transaction</button>
                    </div>
                 </div>
            </div>
        )
    }
}

export default ListReportComponent;
