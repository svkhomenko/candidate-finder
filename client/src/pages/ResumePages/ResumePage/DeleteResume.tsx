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
import { useDeleteResumeMutation } from '~/store/api/resume-slice';
import { FiTrash2 } from 'react-icons/fi';

const DeleteResume = () => {
  const { id: resumeId } = useParams();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef(null);
  const navigate = useNavigate();
  const [deleteResume, { isLoading: isDeleteLoading }] = useDeleteResumeMutation();

  const { handler: deleteHandler } = useRequestHandler<number>({
    f: deleteResume,
    successF: () => {
      navigate('/resumes');
    },
    successMsg: 'Резюме успішно видалено.',
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
              Видалити резюме
            </AlertDialogHeader>

            <AlertDialogBody>Ви впевнені, що хочете видалити резюме?</AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                Відмінити
              </Button>
              <Button
                colorScheme="red"
                onClick={() => deleteHandler(Number(resumeId))}
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

export default DeleteResume;
