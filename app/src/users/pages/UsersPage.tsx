import PageContainer from "../../common/components/PageContainer";
import { FormScope } from "../../common/types/form";
import UsersGrid from "../components/UsersGrid";
import { useUsers } from "../contexts/UsersContext";

const UsersPage = () => {
  const { scope } = useUsers();

  if ([FormScope.CREATE, FormScope.EDIT].includes(scope)) {
    return <div>form</div>;
  }

  return (
    <PageContainer crumbs={[{ href: "/users", label: "Users" }]}>
      <UsersGrid />
    </PageContainer>
  );
};

export default UsersPage;
