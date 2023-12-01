import { useNavigate } from "react-router-dom";
import PageContainer from "../../common/components/PageContainer";
import UsersGrid from "../components/UsersGrid";

const UsersPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <PageContainer
      crumbs={[{ href: "/users", label: "Users", isCurrentPage: true }]}
      onCreate={() => navigate("/users/create")}
    >
      <UsersGrid />
    </PageContainer>
  );
};

export default UsersPage;
