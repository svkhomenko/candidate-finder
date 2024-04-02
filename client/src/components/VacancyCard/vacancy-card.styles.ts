import { SystemStyleObject } from '@chakra-ui/react';

type TStyle = {
  card: SystemStyleObject;
  ratingScore: SystemStyleObject;
};

const styles: TStyle = {
  card: {
    position: 'relative',
    boxShadow: 'lg',
    transition: 'box-shadow 0.2s ease-out',
    cursor: 'pointer',
    _hover: {
      boxShadow: 'xl',
    },
    maxW: {
      base: '100%',
      lg: '800px',
    },
  },
  ratingScore: {
    position: 'absolute',
    top: '10px',
    right: '10px',
    width: '40px',
    height: '40px',
    bg: 'secondary',
    color: 'text',
  },
};

export default styles;
