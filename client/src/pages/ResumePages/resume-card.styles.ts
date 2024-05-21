import { SystemStyleObject } from '@chakra-ui/react';

type StylesType = { card: SystemStyleObject; heading: SystemStyleObject };

const styles: StylesType = {
  card: {
    width: { base: '90%', md: '80%', xl: '65%' },
    margin: '0 auto',
    maxW: '700px',
    boxShadow: 'rgba(0, 0, 0, 0.1) 0px 10px 50px;',
  },
  heading: {
    textAlign: 'center',
    color: 'hover',
    fontSize: { base: '25px', sm: '30px' },
  },
};

export default styles;
