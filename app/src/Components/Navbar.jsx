import {
  Box,
  Flex,
  Text,
  IconButton,
  Button,
  Stack,
  Collapse,
  useColorModeValue,
  useBreakpointValue,
  useDisclosure,
  Image,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";
import { HamburgerIcon, CloseIcon, ChevronDownIcon } from "@chakra-ui/icons";
import { Link, useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { HouseContext } from "../ContextApi/ContextProvides.js";
import { FaUserAlt } from "react-icons/fa";
import axios from "axios";

export default function Navbar() {
  const { isOpen, onToggle } = useDisclosure();
  const navigate = useNavigate();
  const { isAuth } = useContext(HouseContext);
  const modal = useDisclosure();
  return (
    <Box px="5">
      <Flex
        bg={useColorModeValue("white", "gray.800")}
        color={useColorModeValue("gray.600", "white")}
        minH={"60px"}
        py={{ base: 2 }}
        px={{ base: 4 }}
        borderBottom={1}
        borderStyle={"solid"}
        borderColor={useColorModeValue("gray.200", "gray.900")}
        align={"center"}
      >
        <Flex
          flex={{ base: 1, md: "auto" }}
          ml={{ base: -2 }}
          display={{ base: "flex", md: "none" }}
        >
          <IconButton
            onClick={onToggle}
            icon={
              isOpen ? <CloseIcon w={3} h={3} /> : <HamburgerIcon w={5} h={5} />
            }
            variant={"ghost"}
            aria-label={"Toggle Navigation"}
          />
        </Flex>
        <Flex flex={{ base: 1 }} justify={{ base: "center", md: "start" }}>
          <Image
            src="https://cdn-icons-png.flaticon.com/512/515/515027.png"
            alt="logo"
            w="2rem"
          />
          <Text
            textAlign={useBreakpointValue({ base: "center", md: "left" })}
            fontFamily={"heading"}
            color={useColorModeValue("gray.800", "white")}
          >
            Estatery
          </Text>

          <Flex display={{ base: "none", md: "flex" }} ml={10}>
            <DesktopNav />
          </Flex>
        </Flex>

        <Stack
          flex={{ base: 1, md: 0 }}
          justify={"flex-end"}
          direction={"row"}
          spacing={6}
        >
          {isAuth ? (
            <>
              <FaUserAlt onClick={() => modal.onOpen()} />
              <BasicUsage modal={modal} />
            </>
          ) : (
            <>
              <Button
                as={"a"}
                fontSize={"sm"}
                fontWeight={400}
                variant="outline"
                _hover={{
                  bg: "#fff",
                }}
                colorScheme="purple"
                onClick={() => navigate("/login")}
              >
                Login
              </Button>
              <Button
                display={{ base: "none", md: "inline-flex" }}
                fontSize={"sm"}
                fontWeight={600}
                color={"white"}
                colorScheme={"purple"}
                onClick={() => navigate("/signup")}
              >
                Sign Up
              </Button>
            </>
          )}
        </Stack>
      </Flex>

      <Collapse in={isOpen} animateOpacity>
        <MobileNav />
      </Collapse>
    </Box>
  );
}

const DesktopNav = () => {
  const linkColor = useColorModeValue("gray.600", "gray.200");
  return (
    <Stack direction={"row"} spacing={4}>
      {NAV_ITEMS.map((navItem) => (
        <Box key={navItem.label}>
          <Link
            p={2}
            to={`/${navItem.href}`}
            style={{
              padding: 2,
              fontSize: "16px",
              fontWeight: 500,
              color: "#718096",
            }}
            fontWeight={500}
          >
            {navItem.label}
            {navItem?.icon && (
              <ChevronDownIcon
                fontSize={"lg"}
                fontWeight={500}
                color={linkColor}
              />
            )}
          </Link>
        </Box>
      ))}
    </Stack>
  );
};

const MobileNav = () => {
  return (
    <Stack
      bg={useColorModeValue("white", "gray.800")}
      p={4}
      display={{ md: "none" }}
    >
      {NAV_ITEMS.map((navItem) => (
        <MobileNavItem key={navItem.label} {...navItem} />
      ))}
    </Stack>
  );
};

const MobileNavItem = ({ label, children, href }) => {
  const { isOpen, onToggle } = useDisclosure();

  return (
    <Stack spacing={4} onClick={children && onToggle}>
      <Flex
        py={2}
        as={Link}
        href={href ?? "#"}
        justify={"space-between"}
        align={"center"}
        _hover={{
          textDecoration: "none",
        }}
      >
        <Text
          fontWeight={600}
          color={useColorModeValue("gray.600", "gray.200")}
          onClick={onToggle}
        >
          <Link to={`/${href}`}>{label}</Link>
        </Text>
      </Flex>
    </Stack>
  );
};

const NAV_ITEMS = [
  {
    label: "Rent",
    href: "rent",
  },
  {
    label: "Buy",
    href: "",
  },
  {
    label: "Sell",
    href: "sell",
  },
  {
    label: "Favorites",
    href: "favorites",
  },
  {
    label: "Mangage Property",
    href: "mangageproperty",
    icon: true,
  },
];

function BasicUsage({ modal }) {
  const [data, setData] = useState([]);
  const { setIsAuth } = useContext(HouseContext);
  const token = localStorage.getItem("token");
  useEffect(() => {
    axios
      .get("https://server-gdevaaj7g-arunrajbhar.vercel.app/session", {
        headers: {
          token: token,
        },
      })
      .then((res) => {
        if (res.data?.status) {
          setData(res.data.data);
        } else {
          setIsAuth(false);
          localStorage.setItem("isAuth", false);
          localStorage.setItem("token", "");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <>
      <Modal isOpen={modal.isOpen} onClose={modal.onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalBody>
            <Text>
              Name:{data?.firstname} {data?.lastname}
            </Text>
            <Text>Email:{data?.email}</Text>
          </ModalBody>

          <ModalFooter>
            <Button
              colorScheme="red"
              m="auto"
              w="25rem"
              onClick={() => {
                modal.onClose();
                setIsAuth(false);
                localStorage.setItem("isAuth", false);
              }}
            >
              Logout
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
