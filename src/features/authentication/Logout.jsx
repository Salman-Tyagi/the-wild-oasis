import ButtonIcon from '../../ui/ButtonIcon';
import { HiArrowRightOnRectangle } from 'react-icons/hi2';

import useLogout from './useLogout';
import SpinnerMini from '../../ui/SpinnerMini';

function Logout() {
  const { isLoading, logout } = useLogout();

  function handleLogout() {
    logout();
  }

  return (
    <ButtonIcon>
      {isLoading ? (
        <SpinnerMini />
      ) : (
        <HiArrowRightOnRectangle onClick={handleLogout} />
      )}
    </ButtonIcon>
  );
}

export default Logout;
