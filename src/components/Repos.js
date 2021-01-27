import React from 'react';
import styled from 'styled-components';
import { GithubContext } from '../context/context';
import { ExampleChart, Pie3D, Column3D, Bar3D, Doughnut2D } from './Charts';
const Repos = () => {
  const { repos } = React.useContext(GithubContext);
 
  let languages = repos.reduce((total, item) => {
    const { language } = item;

    //in case of language as 'null'
    if(!language) return total; 

    // check if the language property is already on the object
    if(!total[language]) {
      // if it´s not, create a new one as an object
      total[language] = {label:language, value:1}
    } else {
      // if language is already on the object, keep the same instance and just add + 1 to the value
      total[language] = {
        ...total[language], 
        value: total[language].value + 1
      };
    };

    return total;
  }, {});

  
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
        <Pie3D data={chartData} />
        {/* <ExampleChart data={chartData}/> */}

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
