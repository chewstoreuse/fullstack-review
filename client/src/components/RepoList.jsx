import React from 'react';

const RepoList = (props) => (
  <div>
    <h4> Repo List Component </h4>
    {console.log('here', props.repos)}
    There are {props.repos.length} repos.
  </div>
)

export default RepoList;