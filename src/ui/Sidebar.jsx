import styled from 'styled-components';

const StyledAside = styled.aside`
  background-color: var(--color-grey-0);
  padding: 1.4rem 4.8rem 1.6rem;
  border-right: 1px solid var(--color-grey-100);

  grid-row: 1 / -1;
`;

function Sidebar() {
  return <StyledAside>SIDEBAR</StyledAside>;
}
export default Sidebar;
