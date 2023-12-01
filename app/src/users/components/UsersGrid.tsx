import {
  HStack,
  IconButton,
  Progress,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { useState } from "react";
import { FiEdit, FiTrash } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { useUsers } from "../contexts/UsersContext";

const UsersGrid: React.FC = () => {
  const { users, fetching, remove, removing } = useUsers();

  const [deletedID, setDeletedID] = useState<string | null>(null);

  const navigate = useNavigate();

  return (
    <TableContainer>
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>Name</Th>
            <Th>Email</Th>
            <Th>Catagory</Th>
            <Th>Role</Th>
            <Th></Th>
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
              <Td>
                <HStack spacing={2}>
                  <IconButton
                    icon={<FiEdit />}
                    aria-label={"edit"}
                    size="sm"
                    onClick={() => {
                      navigate(`/users/edit/${user.id}`);
                    }}
                  />
                  <IconButton
                    icon={<FiTrash />}
                    aria-label={"delete"}
                    size="sm"
                    colorScheme="red"
                    isLoading={removing && deletedID === user.id}
                    onClick={() => {
                      setDeletedID(user.id);
                      remove(user.id);
                    }}
                  />
                </HStack>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  );
};

export default UsersGrid;
