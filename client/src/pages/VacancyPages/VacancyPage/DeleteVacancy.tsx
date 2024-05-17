import {
  Button,
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  useDisclosure,
} from '@chakra-ui/react';
import { useRef } from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import useRequestHandler from '~/hooks/use-request-handler';
import { useDeleteVacancyMutation } from '~/store/api/vacancy-slice';
import { FiTrash2 } from 'react-icons/fi';

const DeleteVacancy = () => {
  const { id: vacancyId } = useParams();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef(null);
  const navigate = useNavigate();
  const [deleteVacancy, { isLoading: isDeleteLoading }] = useDeleteVacancyMutation();

  const { handler: deleteHandler } = useRequestHandler<number>({
    f: deleteVacancy,
    successF: () => {
      navigate('/vacancies');
    },
    successMsg: 'Вакансію успішно видалено.',
  });

  return (
    <>
      <Button onClick={onOpen} colorScheme="red" isLoading={isDeleteLoading}>
        <FiTrash2 />
      </Button>

      <AlertDialog isOpen={isOpen} leastDestructiveRef={cancelRef} onClose={onClose}>
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Видалити вакансію
            </AlertDialogHeader>

            <AlertDialogBody>Ви впевнені, що хочете видалити вакансію?</AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                Відмінити
              </Button>
              <Button
                colorScheme="red"
                onClick={() => deleteHandler(Number(vacancyId))}
                ml={3}
                isLoading={isDeleteLoading}
              >
                Видалити
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
};

export default DeleteVacancy;
