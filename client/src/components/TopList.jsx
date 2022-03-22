import React from 'react';

const TopList = (props) => (
  <ol>
    {props.topRepos.map((repo, i) =>
      <li key={i}>{repo.username} - {repo.forks} forks! {repo.name}: {repo.url}</li>)}
  </ol>
)

export default TopList;