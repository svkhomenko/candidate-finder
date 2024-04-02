import { Link as RouterLink } from 'react-router-dom';
import { Button } from '@chakra-ui/react';
import PageAlert from '~/components/PageAlert';

const NotFound = () => {
  return (
    <PageAlert status="warning" title="404 - Сторінка не знайдена!" message="Цієї сторінки не існує">
      <Button colorScheme="orange" as={RouterLink} to="/">
        На головну
      </Button>
    </PageAlert>
  );
};

export default NotFound;
