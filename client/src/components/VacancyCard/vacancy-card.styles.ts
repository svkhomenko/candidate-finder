import { SystemStyleObject } from '@chakra-ui/react';

type TStyle = {
  card: SystemStyleObject;
};

const styles: TStyle = {
  card: {
    boxShadow: 'lg',
    transition: 'box-shadow 0.2s ease-out',
    cursor: 'pointer',
    _hover: {
      boxShadow: 'xl',
    },
  },
};

export default styles;
