import styled from 'styled-components';
import GlobalStyles from './styles/GlobalStyles';
import Heading from './ui/Heading';
import Button from './ui/Button';
import Input from './ui/Input';

const StyledApp = styled.div`
  padding: 2rem;
  background-color: orange;
`;

export default function App() {
  return (
    <>
      <GlobalStyles />
      <StyledApp>
        <Heading as='h1'>The Wild Oasis</Heading>
        <Button onClick={() => alert('Check in')}>Check in</Button>
        <Button onClick={() => alert('Check out')}>Check out</Button>
        <Heading as='h2'>The heading style</Heading>

        <Input type='number' placeholder='Number of guests' />
        <Input type='number' placeholder='Number of guests' />
        <Heading as='h3'>Form</Heading>
      </StyledApp>
    </>
  );
}
