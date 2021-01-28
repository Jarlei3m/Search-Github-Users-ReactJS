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
  const [error, setError] = useState({show: false, msg: ""});

  const searchGithubUser = async(user) => {
    toggleError();
    setLoading(true);
    
    const response = await axios(`${rootUrl}/users/${user}`).catch(err => console.log(err));

    if (response) {
      setGithubUser(response.data);
      const { repos_url, followers_url } = response.data;

      // this will be fired only when all promises is settled
      await Promise.allSettled([
        axios(`${repos_url}?per_page=100`), 
        axios(`${followers_url}?per_page=100`)
    ])
      .then((results) => {
        const [repos, followers] = results;
        const status = 'fulfilled';

        if (repos.status === status) {
          setRepos(repos.value.data)
        };

        if (followers.status === status) {
          setFollowers(followers.value.data)
        }
      }).catch(err => console.log(err))
    } else {
      toggleError(true, 'there is no user with that username')
    };

    checkRequests();
    setLoading(false);
  };

  // check rate
  const checkRequests = () => {

    axios(`${rootUrl}/rate_limit`)
    .then(({data}) => {
      let { rate: {remaining} } = data;
      setRequests(remaining);
      console.log(remaining)
      if (remaining === 0) {
        // throw an error
        toggleError(true, "sorry, you've exeeded your hourly rate limit!");
      }
    })
    .catch((err) => console.log(err))
  };

  function toggleError(show = false, msg = '') {
    setError({show, msg})
  }

  useEffect(checkRequests, [])

  return (
    <GithubContext.Provider value={{ githubUser, repos, followers, requests, error, searchGithubUser, loading }}>
      {children}
    </GithubContext.Provider>
  )
}

// GithubProvider to wrap the whole applicaiton
// GithubContext to have access to the props on the value
export { GithubProvider, GithubContext };