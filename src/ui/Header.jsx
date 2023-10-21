import styled from 'styled-components';

import Avatar from './Avatar';
import UserProfile from '../features/authentication/UserProfile';
import Logout from '../features/authentication/Logout';

const StyledHeader = styled.header`
  background-color: var(--color-grey-0);
  padding: 1.2rem 4.8rem;
  border-bottom: 1px solid var(--color-grey-100);
  display: flex;
  align-items: center;
  justify-content: end;
  gap: 1.4rem;
`;

function Header() {
  return (
    <StyledHeader>
      <UserProfile />
      <Avatar />
      <Logout />
    </StyledHeader>
  );
}

export default Header;
