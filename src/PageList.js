import React, { Component } from "react";

class PageList extends Component {
  render() {
    const { pages, setCurrentPage } = this.props;

    return (
      <div>
        {pages.map((page, i) => (
          <li key={i} onClick={() => setCurrentPage(i)}>
            {page.title}
          </li>
        ))}
      </div>
    );
  }
}

export default PageList;
