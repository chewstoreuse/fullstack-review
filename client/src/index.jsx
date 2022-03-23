import React from 'react';
import ReactDOM from 'react-dom';
// import $ from 'jquery';
import axios from 'axios';
import Search from './components/Search.jsx';
import RepoList from './components/RepoList.jsx';
import TopList from './components/TopList.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      repos: [],
      topRepos: []
    }
  }

  search(term) {
    console.log(`${term} was searched`);
    axios.post('/repos', {
      username: term
    })
      .then(repos => {
        this.setState({
          repos: repos.data,
          topRepos: repos.data.slice(0, 25)
        });
      });
  }

  componentDidMount() {
    axios.get('/repos')
      .then(repos => {
        // console.log(repos.data);
        // console.log('component mounted');
        this.setState({
          repos: repos.data,
          topRepos: repos.data.slice(0, 25)
        });
      });
  }

  render() {
    return (<div>
      <h1>Github Fetcher</h1>
      <RepoList repos={this.state.repos} />
      <Search onSearch={this.search.bind(this)} />
      <TopList topRepos={this.state.topRepos} />
    </div>)
  }
}

ReactDOM.render(<App />, document.getElementById('app'));