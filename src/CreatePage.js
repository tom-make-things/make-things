import React, { Component } from "react";

class CreatePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: ""
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleButtonClick = this.handleButtonClick.bind(this);
  }

  handleInputChange(e) {
    this.setState({ title: e.target.value });
  }

  handleButtonClick(e) {
    if (this.state.title) {
      this.props.createNewPage(this.state.title);
      this.setState({ title: "" });
    }
  }

  render() {
    return (
      <div>
        <input value={this.state.title} onChange={this.handleInputChange} />
        <button onClick={this.handleButtonClick}>New Page</button>
      </div>
    );
  }
}

export default CreatePage;
