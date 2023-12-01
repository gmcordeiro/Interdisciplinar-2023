import {
  Badge,
  Box,
  Button,
  CircularProgress,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Radio,
  RadioGroup,
  Stack,
} from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import { Controller, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { UserRoleColor } from "../../auth/contants/roles";
import { User } from "../../auth/types";
import { FakeStorageContext } from "../../common/contexts/FakeStorageContext";
import { FormScope, FormScopeLabel } from "../../common/types/form";

export type UserFormValues = Omit<User, "category"> & {
  category: string;
};

type UsersFormProps = {
  scope: FormScope.CREATE | FormScope.EDIT;
  defaultValues?: UserFormValues;
  onSubmit: (values: UserFormValues) => void;
};

const UsersForm: React.FC<UsersFormProps> = ({
  defaultValues,
  scope,
  onSubmit,
}) => {
  const { getCategories } = useContext(FakeStorageContext);

  const navigate = useNavigate();

  const { data: categories, isFetching: fetchingCategories } = useQuery({
    queryKey: ["categories"],
    queryFn: getCategories,
    initialData: [],
  });

  const form = useForm<UserFormValues>({
    defaultValues,
  });

  return (
    <form onSubmit={form.handleSubmit(onSubmit)}>
      <Stack spacing={4} p={5}>
        <FormControl isInvalid={!!form.formState.errors.name}>
          <FormLabel htmlFor="name">Name</FormLabel>
          <Input
            type="text"
            id="name"
            {...form.register("name", { required: "Name is required" })}
          />
          <FormErrorMessage>
            {form.formState.errors.name && form.formState.errors.name.message}
          </FormErrorMessage>
        </FormControl>
        <FormControl isInvalid={!!form.formState.errors.email}>
          <FormLabel htmlFor="email">Email</FormLabel>
          <Input
            type="email"
            id="email"
            {...form.register("email", { required: "Email is required" })}
          />
          <FormErrorMessage>
            {form.formState.errors.email && form.formState.errors.email.message}
          </FormErrorMessage>
        </FormControl>
        <FormControl isInvalid={!!form.formState.errors.password}>
          <FormLabel htmlFor="password">Password</FormLabel>
          <Input
            type="text"
            id="password"
            {...form.register("password", {
              required: "Password is required",
              minLength: {
                value: 5,
                message: "Password must have at least 5 characters",
              },
            })}
          />
          <FormErrorMessage>
            {form.formState.errors.password &&
              form.formState.errors.password.message}
          </FormErrorMessage>
        </FormControl>
        <FormControl isInvalid={!!form.formState.errors.category}>
          <FormLabel htmlFor="category">
            <Box>
              Category
              {fetchingCategories && (
                <CircularProgress ml={2} size="5" isIndeterminate />
              )}
            </Box>
          </FormLabel>
          <Controller
            name="category"
            control={form.control}
            rules={{ required: "Category is required" }}
            render={({ field }) => (
              <RadioGroup {...field}>
                <Stack>
                  {categories.map((category) => (
                    <Radio
                      key={category.id}
                      value={category.id}
                      colorScheme={UserRoleColor[category.role]}
                      defaultChecked
                    >
                      {category.name}{" "}
                      <Badge ml={1} colorScheme={UserRoleColor[category.role]}>
                        {category.role}
                      </Badge>
                    </Radio>
                  ))}
                </Stack>
              </RadioGroup>
            )}
          />
          <FormErrorMessage>
            {form.formState.errors.category &&
              form.formState.errors.category.message}
          </FormErrorMessage>
        </FormControl>
        <Flex mt={5} justifyContent="flex-end">
          <Button mr={3} variant="outline" onClick={() => navigate("/users")}>
            Back
          </Button>
          <Button
            type="submit"
            colorScheme="blue"
            isLoading={form.formState.isSubmitting}
          >
            {FormScopeLabel[scope]}
          </Button>
        </Flex>
      </Stack>
    </form>
  );
};

export default UsersForm;
