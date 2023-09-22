import { Outlet } from 'react-router-dom';
import Header from './Header';
import Sidebar from './Sidebar';
import styled from 'styled-components';

const StyledAppLayout = styled.div`
  display: grid;
  grid-template-columns: 26rem 1fr;
  grid-template-rows: auto 1fr;
`;

function AppLayout() {
  return (
    <StyledAppLayout>
      <Header />
      <Sidebar />
      {<Outlet />}
    </StyledAppLayout>
  );
}
export default AppLayout;
