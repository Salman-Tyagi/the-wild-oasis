import styled, { css } from 'styled-components';

// const test = css`
//   font-size: ${10 > 5 ? '30px' : '5px'};
//   background-color: yellow;
// `;

const Heading = styled.h1`
  ${props =>
    props.type === 'h1' &&
    css`
      font-size: 3rem;
      font-weight: 600;
      background-color: yellow;
    `}

  ${props =>
    props.type === 'h2' &&
    css`
      font-size: 2rem;
      font-weight: 600;
    `}

    ${props =>
    props.type === 'h3' &&
    css`
      font-size: 2rem;
      font-weight: 500;
    `}

  line-height: 1.4;
`;

export default Heading;