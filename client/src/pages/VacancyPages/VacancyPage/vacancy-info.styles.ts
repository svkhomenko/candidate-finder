import { SystemStyleObject } from '@chakra-ui/react';

type TStyle = {
  card: SystemStyleObject;
};

const styles: TStyle = {
  card: {
    position: 'relative',
    boxShadow: 'lg',
    maxW: {
      base: '100%',
      lg: '800px',
    },
    margin: '20px auto',
  },
};

export default styles;
