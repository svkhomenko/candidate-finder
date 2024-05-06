import {
  Box,
  Flex,
  Heading,
  HStack,
  IconButton,
  Link,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Icon,
} from '@chakra-ui/react';
import { useEffect, useRef } from 'react';
import { FiMenu, FiX } from 'react-icons/fi';
import { Link as ReactRouterLink, NavLink, useNavigate } from 'react-router-dom';
import NavbarAuth from './NavbarAuth';
import styles from './header.styles';

// const links = [
//   { href: '/', label: 'Резюме' },
//   { href: '/vacancies', label: 'Вакансії' },
// ];

const links = [
  { href: '/', label: 'Знайти резюме' },
  { href: '/vacancies/create', label: 'Розмістити вакансію' },
];

const Header = () => {
  const navigate = useNavigate();

  const header = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const checkScroll = () => {
      if (!header.current) return;

      if (window.scrollY >= 1) {
        header.current.style.boxShadow = '0px 0 10px rgba(0,0,0,.3)';
      } else {
        header.current.style.boxShadow = 'none';
      }
    };

    window.addEventListener('scroll', checkScroll);
    window.addEventListener('resize', checkScroll);

    return () => {
      window.removeEventListener('scroll', checkScroll);
      window.removeEventListener('resize', checkScroll);
    };
  }, []);

  return (
    <Box sx={styles.navbar} ref={header}>
      <Flex sx={styles.container} h="100%" align="center" justify="space-between">
        <Box sx={{ display: { md: 'none' } }}>
          <Menu>
            {({ isOpen }) => (
              <>
                <MenuButton
                  isActive={isOpen}
                  as={IconButton}
                  icon={<Icon boxSize={6} as={isOpen ? FiX : FiMenu} />}
                ></MenuButton>
                <MenuList>
                  {links.map((l, i) => (
                    <MenuItem key={i} color="secondary" px={4} py={2} onClick={() => navigate(l.href)}>
                      {l.label}
                    </MenuItem>
                  ))}
                </MenuList>
              </>
            )}
          </Menu>
        </Box>
        <Box>
          <ReactRouterLink to="/">
            <Heading size="lg" color="secondary" lineHeight="1">
              Candidate Finder
            </Heading>
          </ReactRouterLink>
        </Box>
        <HStack align="center" spacing={6}>
          <HStack as="nav" spacing={20} display={{ base: 'none', md: 'flex' }}>
            {links.map((l) => (
              <Link as={NavLink} to={l.href} key={l.label} fontWeight="bold" _hover={{ color: 'green.500' }}>
                {l.label}
              </Link>
            ))}
          </HStack>
        </HStack>
        <NavbarAuth />
      </Flex>
    </Box>
  );
};

export default Header;
