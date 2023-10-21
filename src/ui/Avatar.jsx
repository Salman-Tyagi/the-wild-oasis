import { HiOutlineUserCircle } from 'react-icons/hi2';
import ButtonIcon from './ButtonIcon';
import { Link } from 'react-router-dom';

function Avatar() {
  return (
    <ButtonIcon>
      <Link to='/account'>
        <HiOutlineUserCircle />
      </Link>
    </ButtonIcon>
  );
}

export default Avatar;
