import React, { Component } from "react";
import "./App.css";

import axios from "axios";

class App extends Component {
  state = {
    error: null,
    isLoaded: false,
    items: [],
    show: 'hide'
  };

  getSearchResult = async (type, val) => {
    try {
        let res;
        if (type === '1') {
          res = await axios.get(`/search/project/${val}`);
        } else if (type === '2') {
          res = await axios.get(`/search/branch/${val}`);
        }
        this.setState(() => ({
          isLoaded: true,
          items: res.data,
          show: 'hide'
        }));
    } catch(err) {
        //add the error into the state to show in the page
        this.setState(() => ({ err }));
    }
}
  searchItem(e) {
    // Prevent button click from submitting form
    e.preventDefault();

    //Get the search critera from the form, to be added in the query
    const type = document.getElementById("type").value;
    const val = document.getElementById("value").value;
    if (type === '0' || val === '') {
      alert('Please select a proper search cirteria');      
    } else if (type !== '0' && val !== '') {
      this.getSearchResult(type, val);
    }    
  }
  showBranches() {
    let show = "show";
    if (this.state.show === "show") {
      show = "hide";
    }
    this.setState(() => ({
      show: show
    }));
  }

  //render the table based on the output received from api
  renderTableData(items) {
    return items.map((item) => {
      return (
        <tr onClick={() => this.showBranches()} key={item.code}>
          <td>{item.code}</td>
          <td>{item.name}</td>
          <td class={this.state.show}>{item.branches.join(', ')}</td>
        </tr>
      );
    });
  }

  //controls for the header and filter section
  renderFilterSection() {
    return (
      <div>
      <h1 id="project" className="title">
        Project Report
      </h1>
      <section className="section">
      <form align="center" id="searchForm">        
        <select className="select" name="type" id="type">
          <option value="0">Select Search Type</option>
          <option value="1">Project</option>
          <option value="2">Branch</option>                
        </select>      
        <input type="text" className="input" id="value" placeholder="Value"/>
        <button className="button" onClick={this.searchItem}>Search</button>
      </form>      
    </section>
    </div>)
  }

  render() {
    const { error, isLoaded, items } = this.state;
    
    //this line will make the function addItem understand this
    this.searchItem = this.searchItem.bind(this);

    //if the api result in error, show the error message
    if (error) {
      return <div>{error.message}</div>;
    } else if (!isLoaded) {
      //on page load, will just show the filter section
      return this.renderFilterSection();
    } else {
      return (
        <div>
          {this.renderFilterSection()}
          <h4 className="title">Click on any row to view branches</h4>
          <table id="project_data" className="project">
            <tbody className="project">
              <tr>
                <th key="project_id">Project Id</th>
                <th key="project_name">Project Name</th>
                <th class={this.state.show} key="project_branches">Project Branches</th>
              </tr>
              {this.renderTableData(items)}
            </tbody>
          </table>
        </div>
      );
    }
  }
}

export default App;