import styled from 'styled-components';
import Heading from '../ui/Heading';
import Row from '../ui/Row';

const StyledDashboard = styled.div`
  background-color: var(--color-grey-50);
  height: 100vh;
`;

function Dashboard() {
  return (
    <StyledDashboard>
      <Row type='horizontal'>
        <Heading as='h1'>Dashboard</Heading>
        <p>TEST</p>
      </Row>
    </StyledDashboard>
  );
}

export default Dashboard;
