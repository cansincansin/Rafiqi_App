import React, { Component } from "react";
import axios from "axios";
import Forms from "./Forms";
import Home from "./Results";
export const steps = {
  one: 1,
  result: 2
};

export default class Steps extends Component {
  constructor(props) {
    super(props);
    this.state = {
      step: steps.one,
      values: [],
      results: []
    };
  }

  // @Todo
  // create a function to post data const postData = () =>{
  // const postData = await axios.post(`/data`, values);
  // get the result of postData
  // this.setState({results: postData})
  // send props(results) to the results component
  // loop over the results and show it as a numbered list
  //}
  async getData(data) {
    this.setState({
      data: data
    });
  }

  async componentDidMount() {}

  saveAndGoTo = async (values, currentStep, toStep) => {
    toStep = steps.result;
    const { step } = this.state;
    values = {
      ...this.state.values,
      [currentStep]: values,
      ...this.state.data
    };

    this.setState({
      values: values,
      step: toStep
    });
    const postData = await axios.post(`/data`, values);
    debugger;
    const dataToShow = await postData;
  };
  render() {
    switch (this.state.step) {
      case steps.one:
        return <Forms saveAndGoTo={this.saveAndGoTo} />;
      case steps.result:
        return (
          <Home
            values={this.state.values}
            saveAndGoTo={this.saveAndGoTo}
            data={this.state.data}
          />
        );
      default:
        return <Home />;
    }
  }
}
