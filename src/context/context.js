import React, { useState, useEffect } from 'react';
import mockUser from './mockData.js/mockUser';
import mockRepos from './mockData.js/mockRepos';
import mockFollowers from './mockData.js/mockFollowers';
import axios from 'axios';

const rootUrl = 'https://api.github.com';

//give access to Provider - Github.Provider
const GithubContext = React.createContext(); 

const GithubProvider = ({children}) => {
  const [githubUser, setGithubUser]  = useState(mockUser);
  const [repos, setRepos]  = useState(mockRepos);
  const [followers, setFollowers]  = useState(mockFollowers);

  // api requests
  const [requests, setRequests] = useState(0);
  const [loading, setLoading] = useState(false);

  // check rate
  const checkRequests = async () => {

    axios(`${rootUrl}/rate_limit`)
    .then(({data}) => {
      let { rate: {remaining} } = data;
      setRequests(remaining);
      if (remaining === 0) {
        // throw an error

      }
    })
    .catch((err) => console.log(err))
  }

  useEffect(checkRequests, [])

  return (
    <GithubContext.Provider value={{ githubUser, repos, followers, requests }}>
      {children}
    </GithubContext.Provider>
  )
}

// GithubProvider to wrap the whole applicaiton
// GithubContext to have access to the props on the value
export { GithubProvider, GithubContext };