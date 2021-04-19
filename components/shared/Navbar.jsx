import {
  Box,
  Flex,
  HStack,
  Link,
  IconButton,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  useDisclosure,
  useColorModeValue,
  Stack,
  Text,
} from "@chakra-ui/react";
import { HamburgerIcon, CloseIcon, LockIcon } from "@chakra-ui/icons";
import { useEthers, useEtherBalance } from "@usedapp/core";
import { utils } from "ethers";

const Links = ["Dashboard", "Projects", "Team"];

const NavLink = ({ children }) => (
  <Link
    px={2}
    py={1}
    rounded={"md"}
    _hover={{
      textDecoration: "none",
      bg: useColorModeValue("gray.200", "gray.700"),
    }}
    href={"#"}
  >
    {children}
  </Link>
);

function NavbarButtons() {
  const { activateBrowserWallet, deactivate, account } = useEthers();
  const bal = useEtherBalance(account);

  return (
    <>
      <Flex alignItems={"center"}>
        {!account && (
          <Button
            variant={"solid"}
            colorScheme={"teal"}
            size={"sm"}
            mr={4}
            leftIcon={<LockIcon />}
            onClick={activateBrowserWallet}
          >
            Connect
          </Button>
        )}
        {account && (
          <Menu>
            <MenuButton
              as={Button}
              cursor={"pointer"}
              paddingX={4}
              mr={4}
              size={"sm"}
              bgColor="blue.500"
              color="white"
              _hover={{
                bgColor: "blue.600",
              }}
              _active={{ bgColor: "blue.600" }}
              leftIcon={"↓"}
            >
              Details
            </MenuButton>
            <MenuList>
              <Box px={4}>
                <Text>
                  <Box as="span" fontWeight="bold" fontSize={"xl"}>
                    Address:
                  </Box>
                  <br />
                  {account}
                </Text>
                <Text>
                  <Box as="span" fontWeight="bold" fontSize={"xl"}>
                    ETH Balance:
                  </Box>
                  <br />
                  {bal && utils.formatEther(bal)}
                </Text>
              </Box>
              <MenuDivider />
              <MenuItem onClick={deactivate}>Logout</MenuItem>
            </MenuList>
          </Menu>
        )}
      </Flex>
    </>
  );
}

export default function Navbar() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Box bg={useColorModeValue("gray.100", "gray.900")} px={4}>
        <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
          <IconButton
            size={"md"}
            icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
            aria-label={"Open Menu"}
            display={{ md: !isOpen ? "none" : "inherit" }}
            onClick={isOpen ? onClose : onOpen}
          />
          <HStack spacing={8} alignItems={"center"}>
            <Box fontWeight={"bold"}>ETH Yield Scope</Box>
            <HStack
              as={"nav"}
              spacing={4}
              display={{ base: "none", md: "flex" }}
            >
              {Links.map((link) => (
                <NavLink key={link}>{link}</NavLink>
              ))}
            </HStack>
          </HStack>
          <NavbarButtons />
        </Flex>

        {isOpen ? (
          <Box pb={4}>
            <Stack as={"nav"} spacing={4}>
              {Links.map((link) => (
                <NavLink key={link}>{link}</NavLink>
              ))}
            </Stack>
          </Box>
        ) : null}
      </Box>

      <Box p={4}>Main Content Here</Box>
    </>
  );
}
