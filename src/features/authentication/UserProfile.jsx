import styled from 'styled-components';
import useUser from './useUser';

const UserProfileStyle = styled.div`
  display: flex;
  align-items: center;
  gap: 1.2rem;
`;

const AvatarImage = styled.img`
  width: 24px;
  height: 24px;
`;

function UserProfile() {
  const { user = {} } = useUser();

  return (
    <UserProfileStyle>
      <AvatarImage src={user.avatar} alt={`avatar of ${user.fullName}`} />
      <p>Welcome! {user.fullName}</p>
    </UserProfileStyle>
  );
}

export default UserProfile;
