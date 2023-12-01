import { useToast } from "@chakra-ui/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import PageContainer from "../../common/components/PageContainer";
import { FakeStorageContext } from "../../common/contexts/FakeStorageContext";
import { FormScope } from "../../common/types/form";
import UsersForm from "../components/UsersForm";

const UsersPage = () => {
  const navigate = useNavigate();

  const { createUser } = useContext(FakeStorageContext);

  const queryClient = useQueryClient();

  const toast = useToast();

  const { mutateAsync: create } = useMutation({
    mutationFn: createUser,
    onSuccess: () => {
      toast({
        title: "Create successful",
        status: "success",
      });

      queryClient.invalidateQueries({ queryKey: ["users"] });

      navigate("/users");
    },
    onError: () => {
      toast({
        title: "Create failed",
        status: "error",
      });
    },
  });

  return (
    <PageContainer
      crumbs={[
        { href: "/users", label: "Users" },
        { href: "/users/create", label: "Create", isCurrentPage: true },
      ]}
      onBack={() => navigate("/users")}
    >
      <UsersForm scope={FormScope.CREATE} onSubmit={create} />
    </PageContainer>
  );
};

export default UsersPage;
