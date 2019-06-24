import React, { Component } from 'react';
import './App.css';
import { Switch, Route } from "react-router-dom";
import itemList from "../src/components/itemList";
import edit from "../src/components/edit";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Switch>
          <Route exact path="/" component={itemList} />
          <Route path="/:id" component={edit} />
        </Switch>
  
        <link
          rel="stylesheet"
          href="https://maxcdn.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css"
          integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T"
          crossOrigin="anonymous"
        />
      </div>
    );
  }
}

export default App;
