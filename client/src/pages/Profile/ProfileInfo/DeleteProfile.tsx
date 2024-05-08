import {
  Button,
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  useDisclosure,
  Icon,
} from '@chakra-ui/react';
import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import useRequestHandler from '~/hooks/use-request-handler';
import { useDeleteProfileMutation } from '~/store/api/profile-slice';
import { FiTrash2 } from 'react-icons/fi';

const DeleteProfile = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef(null);
  const navigate = useNavigate();
  const [deleteProfile, { isLoading: isDeleteLoading }] = useDeleteProfileMutation();

  const { handler: deleteHandler } = useRequestHandler<void>({
    f: deleteProfile,
    successF: () => {
      navigate('/');
    },
    successMsg: 'Акаунт успішно видалено.',
  });

  return (
    <>
      <Button onClick={onOpen} leftIcon={<Icon as={FiTrash2} />} colorScheme="red" isLoading={isDeleteLoading}>
        Видалити акаунт
      </Button>

      <AlertDialog isOpen={isOpen} leastDestructiveRef={cancelRef} onClose={onClose}>
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Видалити акаунт
            </AlertDialogHeader>

            <AlertDialogBody>Ви впевнені, що хочете видалити акаунт?</AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                Відмінити
              </Button>
              <Button colorScheme="red" onClick={() => deleteHandler()} ml={3} isLoading={isDeleteLoading}>
                Видалити
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
};

export default DeleteProfile;
