import {
    Flex,
    IconButton,
    Input,
    InputGroup,
    InputLeftElement,
    Icon,
    Avatar,
    useColorMode
  } from "@chakra-ui/react";

import { FaMoon } from 'react-icons/fa';
import { FaSun } from 'react-icons/fa';

  import { FiMenu, FiSearch } from "react-icons/fi";
  import { FaBell } from "react-icons/fa";
  
  const Header = ({ sidebar }) => {

      const { colorMode, toggleColorMode} = useColorMode();
      const isDark = colorMode === "dark";

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
          <IconButton mr={3} icon={isDark ? <FaSun /> : <FaMoon />} isRound="true" onClick={toggleColorMode}></IconButton>
          <Icon color="gray.500" as={FaBell} cursor="pointer" />
          <Avatar
            ml="4"
            size="sm"
            name="anubra266"
            src="https://avatars.githubusercontent.com/u/30869823?v=4"
            cursor="pointer"
          />
        </Flex>
      </Flex>
    );
  };
  
  export default Header;
  