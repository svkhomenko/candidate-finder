import { Box, Card, CardBody, CardHeader, Heading, Link, Text } from '@chakra-ui/react';
import { Link as ReactRouterLink } from 'react-router-dom';
import Layout from '~/components/Layout';
import styles from '../auth.styles';
import LoginForm from './LoginForm';

const Login = () => {
  return (
    <Layout>
      <Card sx={styles.card}>
        <CardHeader>
          <Heading sx={styles.heading}>Увійти в акаунт</Heading>
        </CardHeader>
        <CardBody>
          <LoginForm />
          <Box sx={styles.footer}>
            <Text sx={styles.footerText}>
              Не маєте акаунту?{' '}
              <Link as={ReactRouterLink} to={'/register'} sx={styles.link}>
                Створіть акаунт
              </Link>
            </Text>
          </Box>
        </CardBody>
      </Card>
    </Layout>
  );
};

export default Login;
