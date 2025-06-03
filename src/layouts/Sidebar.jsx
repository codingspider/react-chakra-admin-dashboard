import {
    Box,
    Collapse,
    Flex,
    Icon,
    Text,
    useDisclosure,
    useColorModeValue
} from "@chakra-ui/react";
import {MdHome} from 'react-icons/md';
import {FaRss, FaClipboardCheck, FaBell, FaGift} from 'react-icons/fa';
import {HiCollection, HiCode} from 'react-icons/hi';
import {MdKeyboardArrowRight} from 'react-icons/md';
import {AiFillGift} from 'react-icons/ai';
import {BsGearFill} from 'react-icons/bs';
import {FiMenu, FiSearch} from 'react-icons/fi';
import {Link as ReactRouterLink} from 'react-router-dom'
import {Link as ChakraLink} from '@chakra-ui/react'
import {DASHBORD, PROFILE} from "../router";
import { CiLogout } from "react-icons/ci";

const NavItem = ({
    icon,
    children,
    ...rest
}) => {
    const color = useColorModeValue("gray.600", "gray.300");
    return (
        <Flex
            align="center"
            px="4"
            pl="4"
            py="3"
            cursor="pointer"
            color="inherit"
            _dark={{
            color: "gray.400"
        }}
            _hover={{
            bg: "gray.100",
            _dark: {
                bg: "gray.900"
            },
            color: "gray.900"
        }}
            role="group"
            fontWeight="semibold"
            transition=".15s ease"
            {...rest}>
            {icon && (<Icon
                mx="2"
                boxSize="4"
                _groupHover={{
                color: color
            }}
                as={icon}/>)}
            {children}
        </Flex>
    );
};

const Sidebar = (props) => {
    const integrations = useDisclosure();

    const logout = () => {
        
    }

    return (
        <Box
            as="nav"
            pos="fixed"
            top="0"
            left="0"
            zIndex="sticky"
            h="full"
            pb="10"
            overflowX="hidden"
            overflowY="auto"
            bg="white"
            _dark={{
            bg: "gray.800"
        }}
            border
            color="inherit"
            borderRightWidth="1px"
            w="60"
            {...props}>
            <Flex px="4" py="5" align="center">

                <Text
                    fontSize="2xl"
                    ml="2"
                    color="brand.500"
                    _dark={{
                    color: "white"
                }}
                    fontWeight="semibold">
                    Choc UI
                </Text>
            </Flex>

            <Flex
                direction="column"
                fontSize="md"
                color="teal.600"
                aria-label="Main Navigation">
                <ChakraLink as={ReactRouterLink} to={DASHBORD}>
                    <NavItem icon={MdHome}>
                        Home
                    </NavItem>
                </ChakraLink>
                <ChakraLink as={ReactRouterLink} to={PROFILE}>
                    <NavItem icon={FaRss}>
                        Profile
                    </NavItem>
                </ChakraLink>

                <ChakraLink as={ReactRouterLink} to={DASHBORD}>
                    <NavItem icon={HiCollection}>Collections</NavItem>
                </ChakraLink>

                <NavItem icon={FaClipboardCheck}>Checklists</NavItem>

                <NavItem icon={HiCode} onClick={integrations.onToggle}>
                    Integrations
                    <Icon
                        as={MdKeyboardArrowRight}
                        ml="auto"
                        transform={integrations.isOpen
                        ? "rotate(90deg)"
                        : "none"}/>
                </NavItem>

                <Collapse in={integrations.isOpen}>
                    <NavItem pl="12" py="2">Shopify</NavItem>
                    <NavItem pl="12" py="2">Slack</NavItem>
                    <NavItem pl="12" py="2">Zapier</NavItem>
                </Collapse>

                <NavItem icon={AiFillGift}>Changelog</NavItem>
                <NavItem icon={BsGearFill}>Settings</NavItem>
                <NavItem onClick={logout} icon={CiLogout}>Logout</NavItem>
            </Flex>
        </Box>
    );
};

export default Sidebar;
