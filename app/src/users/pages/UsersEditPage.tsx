import {
  Alert,
  AlertIcon,
  AlertTitle,
  Progress,
  useToast,
} from "@chakra-ui/react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import PageContainer from "../../common/components/PageContainer";
import { FakeStorageContext } from "../../common/contexts/FakeStorageContext";
import { FormScope } from "../../common/types/form";
import UsersForm, { UserFormValues } from "../components/UsersForm";

const UsersEditPage = () => {
  const navigate = useNavigate();

  const { getUser, updateUser } = useContext(FakeStorageContext);

  const { id } = useParams();

  const queryClient = useQueryClient();

  const toast = useToast();

  const { mutateAsync: update } = useMutation({
    mutationFn: (values: UserFormValues) => updateUser(id as string, values),
    onSuccess: () => {
      toast({
        title: "Update successful",
        status: "success",
      });

      queryClient.invalidateQueries({ queryKey: ["users"] });

      navigate("/users");
    },
    onError: () => {
      toast({
        title: "Update failed",
        status: "error",
      });
    },
  });

  const { data: user, isFetching } = useQuery({
    queryKey: ["user", { id }],
    queryFn: () => getUser(id as string),
    initialData: null,
    enabled: !!id,
  });

  return (
    <PageContainer
      crumbs={[
        { href: "/users", label: "Users" },
        { href: "/users/edit", label: "Edit", isCurrentPage: true },
      ]}
      onBack={() => navigate("/users")}
    >
      {isFetching && <Progress size="xs" isIndeterminate />}
      {user && (
        <UsersForm
          scope={FormScope.EDIT}
          onSubmit={update}
          defaultValues={
            { ...user, category: user?.category?.id } as UserFormValues
          }
        />
      )}
      {!isFetching && !user && (
        <Alert status="error" variant="left-accent">
          <AlertIcon />
          <AlertTitle mr={2}>User not found</AlertTitle>
        </Alert>
      )}
    </PageContainer>
  );
};

export default UsersEditPage;
