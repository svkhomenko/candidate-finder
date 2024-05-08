import {
  Box,
  Button,
  ButtonGroup,
  HStack,
  Menu,
  MenuButton,
  MenuDivider,
  MenuGroup,
  MenuItem,
  MenuList,
  Text,
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from '~/hooks/use-app-selector';
import useRequestHandler from '~/hooks/use-request-handler';
import { useLogoutMutation } from '~/store/api/auth-slice';

const NavbarAuth = () => {
  const navigate = useNavigate();
  const { user } = useAppSelector((state) => state.profile);

  const [logout] = useLogoutMutation();
  const { handler: logoutHandler } = useRequestHandler<void>({ f: logout });

  if (user.id) {
    return (
      <Box>
        <Menu>
          <HStack spacing={2}>
            <MenuButton as={Button} variant="unstyled" cursor="pointer">
              <Text color="green.900" fontWeight="semibold">
                {user.email}
              </Text>
            </MenuButton>
          </HStack>
          <MenuList>
            {user.role === 'hr' ? (
              <MenuGroup title="Вакансії">
                <MenuItem px={4} py={2} onClick={() => navigate('/profile/vacancies')}>
                  Мої вакансії
                </MenuItem>
              </MenuGroup>
            ) : (
              <MenuGroup title="Резюме">
                <MenuItem px={4} py={2} onClick={() => navigate('/profile/resumes')}>
                  Мої резюме
                </MenuItem>
              </MenuGroup>
            )}

            <MenuDivider />
            <MenuGroup title="Акаунт">
              <MenuItem px={4} py={2} onClick={() => navigate('/profile')}>
                Налаштування
              </MenuItem>
              <MenuItem px={4} py={2} color="red" onClick={() => logoutHandler()}>
                Вийти з акаунту
              </MenuItem>
            </MenuGroup>
          </MenuList>
        </Menu>
      </Box>
    );
  }

  return (
    <ButtonGroup>
      <Button onClick={() => navigate('/login')}>Увійти</Button>
      <Button variant="outline" onClick={() => navigate('/register')}>
        Створити акаунт
      </Button>
    </ButtonGroup>
  );
};

export default NavbarAuth;
