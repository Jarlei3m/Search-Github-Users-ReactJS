import React from 'react';
import styled from 'styled-components';
import { GithubContext } from '../context/context';
import { ExampleChart, Pie3D, Column3D, Bar3D, Doughnut2D } from './Charts';
const Repos = () => {
  const { repos } = React.useContext(GithubContext);
 
  // iterating over the repos array
  let languages = repos.reduce((total, item) => {
    const { language, stargazers_count } = item;

    // in case of language as 'null'
    if(!language) return total; 

    // check if the language and stargazers_count properties is already on the object
    if(!total[language]) {
      // if it´s not, create a new one as an object
      total[language] = { label: language, value: 1, stars: stargazers_count }
    } else {
      // if language/stargazers_count is already on the object, keep the same instance and just add + 1 to the value, and the stargazers_count to the stars
      total[language] = {
        ...total[language], 
        value: total[language].value + 1,
        stars: total[language].stars + stargazers_count
      };
    };

    return total;
  }, {});
  
  // turning the object into an array and sorting by the most used language
  const mostUsed = Object.values(languages)
    .sort((a, b) => {
      return (
        // this is guarantee to always have the highest value language first
        b.value - a.value
      )
      // getting only the first 5 items from the array
    }).slice(0, 5);

  // most stars per language
  const mostPopular = Object.values(languages)
    .sort((a, b) => {
      return (
        b.stars - a.stars
      )
      // since charts are looking for 'value' property, we need to flip then: 'stars' to 'value'
    }).map((item) => {
      // for each item overwrite the 'value' with item.stars
      return {...item, value: item.stars}
    }).slice(0, 5);
  
  const chartData = [
  {
    label: "HTML",
    value: "13"
  },
  {
    label: "CSS",
    value: "23"
  },
  {
    label: "Javascript",
    value: "80"
  },
];

  return (
    <section className="section">  
      <Wrapper className="section-center">
        <Pie3D data={mostUsed} />
        <Column3D data={chartData} />
        <Doughnut2D data={mostPopular} />
        <Bar3D data={chartData} />

      </Wrapper>
    </section>
  );
};

const Wrapper = styled.div`
  display: grid;
  justify-items: center;
  gap: 2rem;
  @media (min-width: 800px) {
    grid-template-columns: 1fr 1fr;
  }

  @media (min-width: 1200px) {
    grid-template-columns: 2fr 3fr;
  }

  div {
    width: 100% !important;
  }
  .fusioncharts-container {
    width: 100% !important;
  }
  svg {
    width: 100% !important;
    border-radius: var(--radius) !important;
  }
`;

export default Repos;
