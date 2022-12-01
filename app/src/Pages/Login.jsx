import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Checkbox,
  Stack,
  Link,
  Button,
  Heading,
  Text,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useState, useContext } from "react";
import { HouseContext } from "./../ContextApi/ContextProvides";

export default function Login() {
  const navigate = useNavigate();
  const toast = useToast();
  const [form, setForm] = useState({});
  const { setIsAuth } = useContext(HouseContext);

  const handleForm = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
  };
  const handleSubmit = () => {
    if (form.email === undefined || form.password === undefined) {
      toast({
        position: "top-center",
        title: "Please Filled Require Feilds",
        status: "error",
        duration: 2000,
        isClosable: true,
      });
    } else {
      let vali = form.email.split("@");
      if (vali.length > 1) {
        axios
          .post("https://server-gdevaaj7g-arunrajbhar.vercel.app/signin", form)
          .then((res) => {
            if (!res.data.status) {
              localStorage.setItem("isAuth", false);
              localStorage.setItem("token", "");

              toast({
                position: "top-center",
                title: res.data.message,
                status: "error",
                duration: 2000,
                isClosable: true,
              });
            } else {
              navigate("/");

              localStorage.setItem("token", res.data.token);
              localStorage.setItem("isAuth", true);
              setIsAuth(true);
            }
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        toast({
          position: "top-center",
          title: "Email is Not Valid",
          status: "error",
          duration: 2000,
          isClosable: true,
        });
      }
    }
  };

  return (
    <Flex minH={"100vh"} align={"center"} justify={"center"}>
      <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
        <Stack align={"center"}>
          <Heading fontSize={"4xl"}>Sign in to your account</Heading>
        </Stack>
        <Box rounded={"lg"} boxShadow={"lg"} p={8}>
          <Stack spacing={4}>
            <FormControl id="email">
              <FormLabel>Email address</FormLabel>
              <Input
                type="email"
                name="email"
                onChange={(e) => handleForm(e)}
              />
            </FormControl>
            <FormControl id="password">
              <FormLabel>Password</FormLabel>
              <Input
                type="password"
                name="password"
                onChange={(e) => handleForm(e)}
              />
            </FormControl>
            <Stack spacing={10}>
              <Stack
                direction={{ base: "column", sm: "row" }}
                align={"start"}
                justify={"space-between"}
              >
                <Checkbox>Remember me</Checkbox>
                <Link color={"blue.400"}>Forgot password?</Link>
              </Stack>
              <Button
                color={"white"}
                colorScheme={"purple"}
                color={"white"}
                onClick={(e) => handleSubmit(e)}
              >
                Sign in
              </Button>
            </Stack>
            <Stack pt={6}>
              <Text align={"center"}>
                Create new Account?{" "}
                <Link onClick={() => navigate("/signup")} color={"blue.400"}>
                  Signup
                </Link>
              </Text>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
}
