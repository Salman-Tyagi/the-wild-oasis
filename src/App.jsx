import styled from 'styled-components';
import GlobalStyles from './styles/GlobalStyles';

const H1 = styled.h1`
  font-size: 3rem;
  background-color: yellow;
`;

const Button = styled.button`
  font-size: 2rem;
  color: #ddd;
  background-color: purple;
  padding: 1.2rem 1.6rem;
  border: 1px solid #ddd;
  border-radius: 0.4rem;
  cursor: pointer;
`;

const Input = styled.input`
  padding: 1.2rem;
  font-size: 1.6rem;
  border-radius: 0.4rem;
  border: 1px solid #ddd;
  color: #444;
`;

const StyledApp = styled.div`
  padding: 2rem;
  background-color: orange;
`;

export default function App() {
  return (
    <>
      <GlobalStyles />
      <StyledApp>
        <H1>The Wild Oasis</H1>
        <Button onClick={() => alert('Check in')}>Check in</Button>
        <Button onClick={() => alert('Check out')}>Check out</Button>

        <Input type='number' placeholder='Number of guests' />
        <Input type='number' placeholder='Number of guests' />
      </StyledApp>
    </>
  );
}
