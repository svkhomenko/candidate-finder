import { SystemStyleObject } from '@chakra-ui/react';

type StylesType = { card: SystemStyleObject; heading: SystemStyleObject };

const styles: StylesType = {
  card: {
    width: { base: '90%', md: '80%', xl: '65%' },
    margin: '0 auto',
  },
  heading: {
    textAlign: 'center',
    color: 'hover',
    fontSize: { base: '25px', sm: '30px' },
  },
};

export default styles;
