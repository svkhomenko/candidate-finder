import { Box, Card, CardBody, CardHeader, Heading, Link, Text } from '@chakra-ui/react';
import { Link as ReactRouterLink } from 'react-router-dom';
import Layout from '~/components/Layout';
import styles from '../auth.styles';
import RegisterForm from './RegisterForm';

const Register = () => {
  return (
    <Layout>
      <Card sx={styles.card}>
        <CardHeader>
          <Heading sx={styles.heading}>Створити акаунт</Heading>
        </CardHeader>
        <CardBody>
          <RegisterForm />
          <Box sx={styles.footer}>
            <Text sx={styles.footerText}>
              Вже є акаунт?{' '}
              <Link as={ReactRouterLink} to={'/login'} sx={styles.link}>
                Увійти
              </Link>
            </Text>
          </Box>
        </CardBody>
      </Card>
    </Layout>
  );
};

export default Register;
