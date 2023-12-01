import {
  Progress,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { useUsers } from "../contexts/UsersContext";

const UsersGrid: React.FC = () => {
  const { users, fetching } = useUsers();

  return (
    <TableContainer>
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>Name</Th>
            <Th>Email</Th>
            <Th>Catagory</Th>
            <Th>Role</Th>
          </Tr>
        </Thead>
        <Tbody>
          {fetching && (
            <Tr>
              <Td colSpan={4}>
                <Progress size="xs" isIndeterminate />
              </Td>
            </Tr>
          )}
          {users.map((user) => (
            <Tr>
              <Td>{user.name}</Td>
              <Td>{user.email}</Td>
              <Td>{user.category.name}</Td>
              <Td>{user.category.role}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  );
};

export default UsersGrid;
