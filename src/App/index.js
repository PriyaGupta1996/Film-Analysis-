import React, { Component } from 'react';
import './style.css';
import InputForm from "../App/InputForm"
class App extends Component {

  render() {
    return (
      <div>
        <p className="films-analysis-service">Films Analysis Service </p>
        <InputForm></InputForm>
      </div >
    );
  }
}

export default App;