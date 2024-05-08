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
import useRequestHandler from '~/hooks/use-request-handler';
import { useLogoutMutation } from '~/store/api/auth-slice';
import { FiLogOut } from 'react-icons/fi';

const Logout = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef(null);
  const [logout, { isLoading: isLogoutLoading }] = useLogoutMutation();

  const { handler: logoutHandler } = useRequestHandler<void>({
    f: logout,
  });

  return (
    <>
      <Button
        onClick={onOpen}
        leftIcon={<Icon as={FiLogOut} />}
        colorScheme="red"
        variant="outline"
        isLoading={isLogoutLoading}
      >
        Вийти з акаунту
      </Button>

      <AlertDialog isOpen={isOpen} leastDestructiveRef={cancelRef} onClose={onClose}>
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Вийти з акаунту
            </AlertDialogHeader>

            <AlertDialogBody>Ви впевнені, що хочете вийти з акаунту?</AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                Відмінити
              </Button>
              <Button colorScheme="red" onClick={() => logoutHandler()} ml={3} isLoading={isLogoutLoading}>
                Вийти з акаунту
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
};

export default Logout;
