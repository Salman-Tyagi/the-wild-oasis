import styled from 'styled-components';
import GlobalStyles from './styles/GlobalStyles';
import Heading from './ui/Heading';
import Button from './ui/Button';
import Input from './ui/Input';
import Row from './ui/Row';

const StyledApp = styled.div`
  padding: 2rem;
  /* background-color: orange; */
`;

export default function App() {
  return (
    <>
      <GlobalStyles />
      <StyledApp>
        <Row type='vertical'>
          <Row type='horizontal'>
            <Heading as='h1'>The Wild Oasis</Heading>
            <div>
              <Heading as='h2'>The heading style</Heading>
              <Button
                size='large'
                variation='primary'
                onClick={() => alert('Check in')}
              >
                Check in
              </Button>
              <Button
                size='small'
                variation='danger'
                onClick={() => alert('Check out')}
              >
                Check out
              </Button>
            </div>
          </Row>

          <Row type='vertical'>
            <Heading as='h3'>Form</Heading>
            <div>
              <Input type='number' placeholder='Number of guests' />
              <Input type='number' placeholder='Number of guests' />
            </div>
          </Row>
        </Row>
      </StyledApp>
    </>
  );
}
