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
import { useMutation } from "@tanstack/react-query";
import * as React from "react";
import { useContext } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import { login } from "../services";
import { LoginUserInput } from "../types";

const LoginPage: React.FC = () => {
  const { authenticate } = useContext(AuthContext);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginUserInput>();

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
      <form onSubmit={handleSubmit(mutateAsync)}>
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

          <VStack alignItems="flex-start" spacing={4}>
            <Link to="/auth/register">
              <Text fontSize="xs">
                Don't have an account? <b>Register</b>
              </Text>
            </Link>
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
