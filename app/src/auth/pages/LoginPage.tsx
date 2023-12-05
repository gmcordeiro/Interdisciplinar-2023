import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Stack,
  Text,
  VStack,
  useToast,
} from "@chakra-ui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation } from "@tanstack/react-query";
import * as React from "react";
import { useContext } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { AuthContext } from "../contexts/AuthContext";
import { login } from "../services";
import { LoginUserInput } from "../types";

const LoginPage: React.FC = () => {
  const { authenticate } = useContext(AuthContext);

  const schema = yup.object().shape({
    email: yup.string().email("Invalid email").required("Email is required"),
    password: yup.string().required("Password is required"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginUserInput>({
    resolver: yupResolver(schema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const toast = useToast();

  const { mutateAsync, isPending } = useMutation({
    mutationFn: login,
    onSuccess: ({ accessToken }) => {
      toast({
        title: "User authenticated successfully",
        status: "success",
      });

      authenticate(accessToken);
    },
    onError: () => {
      toast({
        title: "Authentication failed",
        status: "error",
      });
    },
  });

  return (
    <Box
      w="md"
      maxW="100%"
      mx="auto"
      mt={8}
      p={6}
      borderWidth="1px"
      borderRadius="lg"
    >
      <Text fontSize="2xl" fontFamily="monospace" fontWeight="bold" mb={6}>
        Interdisciplinar
      </Text>
      <form onSubmit={handleSubmit((values) => mutateAsync(values))}>
        <Stack spacing={4}>
          <FormControl isInvalid={!!errors.email}>
            <FormLabel htmlFor="email">Email</FormLabel>
            <Input
              type="text"
              id="email"
              {...register("email", { required: "Email is required" })}
            />
            <FormErrorMessage>
              {errors.email && errors.email.message}
            </FormErrorMessage>
          </FormControl>

          <FormControl isInvalid={!!errors.password}>
            <FormLabel htmlFor="password">Password</FormLabel>
            <Input
              type="password"
              id="password"
              {...register("password", { required: "Password is required" })}
            />
            <FormErrorMessage>
              {errors.password && errors.password.message}
            </FormErrorMessage>
          </FormControl>

          <VStack alignItems="flex-start" spacing={4} mt={2}>
            <Button
              w={"100%"}
              type="submit"
              colorScheme="blue"
              isLoading={isPending}
            >
              Login
            </Button>
          </VStack>
        </Stack>
      </form>
    </Box>
  );
};

export default LoginPage;
