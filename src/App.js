import React from 'react';
import './App.css';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import ListReportComponent from './components/ListReportComponent';
import HeaderComponent from './components/HeaderComponent';
import FooterComponent from './components/FooterComponent';
import CreateReportComponent from './components/CreateReportComponent';
import ViewReportComponent from './components/ViewReportComponent';

function App() {
  return (
    <div>
        <Router>
              <HeaderComponent />
                <div className="container">
                    <Switch> 
                          <Route path = "/" exact component = {ListReportComponent}></Route>
                          <Route path = "/moneys" component =  {ListReportComponent}></Route>
                          <Route path = "/add-money/:id" component = {CreateReportComponent}></Route>
                          <Route path = "/view-money/:id" component = {ViewReportComponent}></Route>
                         </Switch>
                </div>
              <FooterComponent />
        </Router>
    </div>
    
  );
}

export default App;
