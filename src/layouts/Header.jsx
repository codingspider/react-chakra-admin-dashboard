import {
    Flex,
    IconButton,
    Input,
    InputGroup,
    InputLeftElement,
    Icon,
    Avatar, AvatarBadge, AvatarGroup,Wrap,WrapItem,
    useColorMode,
    Button,
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    Center,
    MenuDivider,
    Select
  } from "@chakra-ui/react";
  import { useContext } from 'react';

import { FaMoon } from 'react-icons/fa';
import { FaSun } from 'react-icons/fa';
import { FiMenu, FiSearch } from "react-icons/fi";
import { FaBell } from "react-icons/fa";
import { LOGIN } from "../router";
import { logoutUser } from '../services/authService';
import { useNavigate } from 'react-router-dom';
import { LanguageContext } from '../LanguageProvider';

  const Header = ({ sidebar }) => {
      const navigate = useNavigate();
      const { colorMode, toggleColorMode} = useColorMode();
      const isDark = colorMode === "dark";
      const { lang, changeLanguage } = useContext(LanguageContext);
      

      const handleLogout = async () => {
        await logoutUser(navigate);
      };

    return (
      <Flex
        as="header"
        align="center"
        justify="space-between"
        w="full"
        px="4"
        bg="white"
        _dark={{ bg: "gray.800" }}
        borderBottomWidth="1px"
        color="inherit"
        h="14"
      >
        <IconButton
          aria-label="Menu"
          display={{ base: "inline-flex", md: "none" }}
          onClick={sidebar.onOpen}
          icon={<FiMenu />}
          size="sm"
        />
  
        <InputGroup w="100" display={{ base: "none", md: "flex" }}>
          <InputLeftElement color="gray.500">
            <FiSearch />
          </InputLeftElement>
          <Input placeholder="Search for articles..." />
        </InputGroup>
        
        <Flex align="center">
          <Select value={lang} mr={3}  onChange={(e) => changeLanguage(e.target.value)}>
            <option value="en">English</option>
            <option value="bn">বাংলা</option>
          </Select>
          <IconButton size='sm' mr={3} icon={isDark ? <FaSun /> : <FaMoon />} isRound="true" onClick={toggleColorMode}></IconButton>
          <Icon  mr={3} color="gray.500" as={FaBell} cursor="pointer" />
          <Menu>
                <MenuButton
                mr={3}
                  as={Button}
                  rounded={'full'}
                  variant={'link'}
                  cursor={'pointer'}
                  minW={0}>
                  <Wrap>
                    <WrapItem>
                      <Avatar name='Dan Abrahmov' size='sm' bg='teal.500'  />
                    </WrapItem>
                  </Wrap>
                </MenuButton>
                <MenuList alignItems={'center'}>
                  <Center>
                    <p>Username</p>
                  </Center>
                  <br />
                  <MenuDivider />
                  <MenuItem>Your Servers</MenuItem>
                  <MenuItem>Account Settings</MenuItem>
                  <MenuItem onClick={handleLogout}>Logout</MenuItem>
                </MenuList>
              </Menu>
        </Flex>
      </Flex>
    );
  };
  
  export default Header;
  