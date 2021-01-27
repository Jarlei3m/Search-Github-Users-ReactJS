import React, { useState, useEffect } from 'react';
import mockUser from './mockData.js/mockUser';
import mockRepos from './mockData.js/mockRepos';
import mockFollowers from './mockData.js/mockFollowers';
import axios from 'axios';

const rootUrl = 'https://api.github.com';

//give access to Provider - Github.Provider
const GithubContext = React.createContext(); 

const GithubProvider = ({children}) => {
  
  return (
    <GithubContext.Provider value={'here'}>
      {children}
    </GithubContext.Provider>
  )
}

// GithubProvider to wrap the whole applicaiton
// GithubContext to have access to the props on the value
export { GithubProvider, GithubContext };