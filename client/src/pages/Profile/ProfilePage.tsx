import { Flex } from '@chakra-ui/react';
import { useState } from 'react';
import ProfileForm from './ProfileForm/ProfileForm';
import ProfileInfo from './ProfileInfo/ProfileInfo';
import styles from '~/components/Layout/layout.styles';

const ProfilePage = () => {
  const [isEdit, setIsEdit] = useState(false);

  return (
    <Flex justify="center" align="flex-start" sx={styles.page}>
      {isEdit ? <ProfileForm setIsEdit={setIsEdit} /> : <ProfileInfo setIsEdit={setIsEdit} />}
    </Flex>
  );
};

export default ProfilePage;
