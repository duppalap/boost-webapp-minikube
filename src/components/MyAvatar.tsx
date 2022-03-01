// hooks
import useAuth from '../hooks/useAuth';
//
import { MAvatar } from './@material-extend';
import { MAvatarProps } from './@material-extend/MAvatar';
import createAvatar, { AvatarDetails } from '../utils/createAvatar';

// ----------------------------------------------------------------------

export default function MyAvatar({ ...other }: MAvatarProps) {
  const { user } = useAuth();

  const avatarDetails: AvatarDetails = user
    ? createAvatar(user?.firstName)
    : { name: '', color: '' };
  return user ? (
    <MAvatar alt={user?.firstName} color={avatarDetails.color} {...other}>
      {avatarDetails.name}
    </MAvatar>
  ) : (
    <></>
  );
}
