import { Box, BoxProps } from '@chakra-ui/layout';
import styles from './container.styles';

const Container = ({ children, ...restProps }: BoxProps) => {
  return (
    <Box sx={styles.container} h="100%" {...restProps}>
      {children}
    </Box>
  );
};

export default Container;
