import React from 'react';

const TopList = (props) => (
  <ol>
    {props.topRepos.map((repo, i) =>
      <li key={i}>{repo.username}: <a href={repo.url}><strong>{repo.name}</strong></a> with {repo.forks} {`fork(s)!`}</li>)}
  </ol>
)

export default TopList;