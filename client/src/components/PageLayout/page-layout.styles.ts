import { SystemStyleObject } from '@chakra-ui/react';

type StyleType = { [key: string]: SystemStyleObject };
const styles: StyleType = {
  main: {
    position: 'relative',
    minHeight: '100vh',
    overflow: 'hidden',
    pt: '70px',
  },
};

export default styles;
