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
import { Controller, useForm, useWatch } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { UserRoleColor } from "../../auth/contants/roles";
import { FormScope, FormScopeLabel } from "../../common/types/form";
import { getCategories } from "../services";
import { UserFormValues } from "../types";

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
  const navigate = useNavigate();

  const { data: categories, isFetching: fetchingCategories } = useQuery({
    queryKey: ["categories"],
    queryFn: getCategories,
    initialData: [],
  });

  const form = useForm<UserFormValues>({
    defaultValues,
  });

  const password = useWatch({
    control: form.control,
    name: "password",
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
            placeholder={scope === FormScope.EDIT ? "********" : "Password"}
            {...form.register("password", {
              required: scope === FormScope.CREATE,
              minLength: {
                value: password || scope === FormScope.CREATE ? 5 : 0,
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
              <RadioGroup {...field} value={field.value?.toString() || ""}>
                <Stack>
                  {categories.map((category) => (
                    <Radio
                      key={category.id}
                      value={category.id.toString()}
                      colorScheme={UserRoleColor[category.role]}
                      defaultChecked
                    >
                      {category.name}
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
