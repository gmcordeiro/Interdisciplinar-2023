import {
  Badge,
  Box,
  Button,
  Card,
  CircularProgress,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Radio,
  RadioGroup,
  SimpleGrid,
  Stack,
  Switch,
} from "@chakra-ui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useQuery } from "@tanstack/react-query";
import { cpf } from "cpf-cnpj-validator";
import { useMemo } from "react";
import { Controller, useForm, useWatch } from "react-hook-form";
import InputMask from "react-input-mask";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import { UserRoleColor } from "../../auth/contants/roles";
import { UserRole } from "../../auth/types";
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

  const schema = yup.object().shape({
    name: yup.string().required("Name is required"),
    email: yup.string().email("Invalid email").required("Email is required"),
    category: yup.number().required("Category is required"),
    rg: yup.string().required("RG is required"),
    cpf: yup
      .string()
      .test("cpf", "Invalid CPF", (value) => cpf.isValid(value || ""))
      .required("CPF is required"),
    phone: yup.string().required("Phone is required"),
    mother: yup.string().required("Mother is required"),
    father: yup.string().required("Father is required"),
    academic: yup.boolean().required("Academic is required"),
    ra: yup.string().optional(),
    course: yup.string().optional(),
    period: yup.string().optional(),
    password: yup.string().optional(),
  });

  const form = useForm<yup.InferType<typeof schema>>({
    context: { scope },
    defaultValues,
    resolver: yupResolver(schema),
  });

  const category = useWatch({
    control: form.control,
    name: "category",
  });

  const role = useMemo(() => {
    const category = categories.find((c) => c.id === form.watch("category"));

    if (category?.role !== UserRole.COLLABORATOR) {
      form.setValue("ra", "");
      form.setValue("course", "");
      form.setValue("period", "");
    }

    return category?.role;

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [category]);

  return (
    <form onSubmit={form.handleSubmit(onSubmit)}>
      <Stack spacing={4} p={5}>
        <SimpleGrid columns={{ base: 1, md: 2 }} gap={5}>
          <Stack spacing={4}>
            <FormControl isInvalid={!!form.formState.errors.name}>
              <FormLabel htmlFor="name">Name</FormLabel>
              <Input type="text" id="name" {...form.register("name")} />
              <FormErrorMessage>
                {form.formState.errors.name &&
                  form.formState.errors.name.message}
              </FormErrorMessage>
            </FormControl>
            <FormControl isInvalid={!!form.formState.errors.email}>
              <FormLabel htmlFor="email">Email</FormLabel>
              <Input type="email" id="email" {...form.register("email")} />
              <FormErrorMessage>
                {form.formState.errors.email &&
                  form.formState.errors.email.message}
              </FormErrorMessage>
            </FormControl>
            <FormControl isInvalid={!!form.formState.errors.password}>
              <FormLabel htmlFor="password">Password</FormLabel>
              <Input
                type="password"
                id="password"
                placeholder={scope === FormScope.EDIT ? "********" : "Password"}
                {...form.register("password")}
              />
              <FormErrorMessage>
                {form.formState.errors.password &&
                  form.formState.errors.password.message}
              </FormErrorMessage>
            </FormControl>
          </Stack>
          <Card p={5} variant="outline">
            <FormControl isInvalid={!!form.formState.errors.category}>
              <FormLabel htmlFor="category">
                <Box mb={3}>
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
                  <RadioGroup
                    {...field}
                    value={field.value?.toString() || ""}
                    onChange={(value) => field.onChange(parseInt(value))}
                  >
                    <Stack>
                      {categories.map((category) => (
                        <Radio
                          key={category.id}
                          value={category.id.toString()}
                          colorScheme={UserRoleColor[category.role]}
                          defaultChecked
                        >
                          {category.name}
                          <Badge
                            ml={1}
                            colorScheme={UserRoleColor[category.role]}
                          >
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
          </Card>
        </SimpleGrid>

        <SimpleGrid columns={{ base: 1, md: 3 }} gap={3}>
          <FormControl isInvalid={!!form.formState.errors.rg}>
            <FormLabel htmlFor="rg">RG</FormLabel>
            <Input type="text" id="rg" {...form.register("rg")} />
            <FormErrorMessage>
              {form.formState.errors.rg && form.formState.errors.rg.message}
            </FormErrorMessage>
          </FormControl>
          <FormControl isInvalid={!!form.formState.errors.cpf}>
            <FormLabel htmlFor="cpf">CPF</FormLabel>
            <InputMask
              mask="999.999.999-99"
              maskChar={null}
              defaultValue={form.getValues("cpf")}
              onChange={(e) => form.setValue("cpf", e.target.value)}
            >
              {/* @ts-ignore */}
              {(inputProps: unknown) => <Input id="cpf" {...inputProps} />}
            </InputMask>
            <FormErrorMessage>
              {form.formState.errors.cpf && form.formState.errors.cpf.message}
            </FormErrorMessage>
          </FormControl>
          <FormControl isInvalid={!!form.formState.errors.phone}>
            <FormLabel htmlFor="phone">Phone</FormLabel>
            <InputMask
              mask="(99) 99999-9999"
              maskChar={null}
              defaultValue={form.getValues("phone")}
              onChange={(e) => form.setValue("phone", e.target.value)}
            >
              {/* @ts-ignore */}
              {(inputProps: unknown) => <Input id="phone" {...inputProps} />}
            </InputMask>
            <FormErrorMessage>
              {form.formState.errors.phone &&
                form.formState.errors.phone.message}
            </FormErrorMessage>
          </FormControl>
        </SimpleGrid>
        <SimpleGrid columns={{ base: 1, md: 2 }} gap={3}>
          <FormControl isInvalid={!!form.formState.errors.mother}>
            <FormLabel htmlFor="mother">Mother</FormLabel>
            <Input type="text" id="mother" {...form.register("mother")} />
            <FormErrorMessage>
              {form.formState.errors.mother &&
                form.formState.errors.mother.message}
            </FormErrorMessage>
          </FormControl>
          <FormControl isInvalid={!!form.formState.errors.father}>
            <FormLabel htmlFor="father">Father</FormLabel>
            <Input type="text" id="father" {...form.register("father")} />
            <FormErrorMessage>
              {form.formState.errors.father &&
                form.formState.errors.father.message}
            </FormErrorMessage>
          </FormControl>
        </SimpleGrid>
        <FormControl isInvalid={!!form.formState.errors.academic}>
          <FormLabel htmlFor="academic">Academic</FormLabel>
          <Switch
            id="academic"
            {...form.register("academic", { valueAsNumber: true })}
          />
          <FormErrorMessage>
            {form.formState.errors.academic &&
              form.formState.errors.academic.message}
          </FormErrorMessage>
        </FormControl>
        {role === UserRole.COLLABORATOR && (
          <SimpleGrid columns={{ base: 1, md: 3 }} gap={3}>
            <FormControl isInvalid={!!form.formState.errors.ra}>
              <FormLabel htmlFor="ra">RA</FormLabel>
              <Input type="text" id="ra" {...form.register("ra")} />
              <FormErrorMessage>
                {form.formState.errors.ra && form.formState.errors.ra.message}
              </FormErrorMessage>
            </FormControl>
            <FormControl isInvalid={!!form.formState.errors.course}>
              <FormLabel htmlFor="course">Course</FormLabel>
              <Input type="text" id="course" {...form.register("course")} />
              <FormErrorMessage>
                {form.formState.errors.course &&
                  form.formState.errors.course.message}
              </FormErrorMessage>
            </FormControl>
            <FormControl isInvalid={!!form.formState.errors.period}>
              <FormLabel htmlFor="period">Period</FormLabel>
              <Input type="text" id="period" {...form.register("period")} />
              <FormErrorMessage>
                {form.formState.errors.period &&
                  form.formState.errors.period.message}
              </FormErrorMessage>
            </FormControl>
          </SimpleGrid>
        )}
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
