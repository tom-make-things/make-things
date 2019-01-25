import React, { Component } from "react";
import CreatePage from "./CreatePage";
import PageList from "./PageList";
import Canvas from "./Canvas";
import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pages: [],
      currentPage: 0
    };
    this.setCurrentPage = this.setCurrentPage.bind(this);
    this.createNewPage = this.createNewPage.bind(this);
    this.saveCanvas = this.saveCanvas.bind(this);
  }

  createNewPage(title) {
    this.setState({
      pages: [...this.state.pages, { title }],
      currentPage: this.state.pages.length
    });
  }

  setCurrentPage(i) {
    this.setState({ currentPage: i });
  }

  saveCanvas(blob, i) {
    const newPages = this.state.pages.map((page, arrayIndex) => {
      if (i === arrayIndex) {
        return {
          title: page.title,
          blob
        };
      }
      return page;
    });

    this.setState({ pages: newPages });
  }

  render() {
    return (
      <div className="App">
        <div className="control">
          <CreatePage createNewPage={this.createNewPage} />
          <PageList
            pages={this.state.pages}
            setCurrentPage={this.setCurrentPage}
          />
        </div>
        <div className="draw">
          {this.state.pages.length ? (
            <Canvas
              saveCanvas={this.saveCanvas}
              page={this.state.pages[this.state.currentPage]}
              currentPage={this.state.currentPage}
            />
          ) : (
            <p>Create New Page!</p>
          )}
        </div>
      </div>
    );
  }
}

export default App;
