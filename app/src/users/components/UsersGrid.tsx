import {
  Badge,
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
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useContext, useState } from "react";
import { FiEdit, FiTrash } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { UserRoleColor } from "../../auth/contants/roles";
import { FakeStorageContext } from "../../common/contexts/FakeStorageContext";

const UsersGrid: React.FC = () => {
  const { getUsers, removeUser } = useContext(FakeStorageContext);

  const queryClient = useQueryClient();

  const { data: users, isFetching: fetching } = useQuery({
    queryKey: ["users"],
    queryFn: getUsers,
    initialData: [],
  });

  const { mutateAsync: remove, isPending: removing } = useMutation({
    mutationFn: removeUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });

  const [deletedID, setDeletedID] = useState<string | null>(null);

  const navigate = useNavigate();

  return (
    <TableContainer>
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>Name</Th>
            <Th>Email</Th>
            <Th>Category</Th>
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
            <Tr key={user.id}>
              <Td>{user.name}</Td>
              <Td>{user.email}</Td>
              <Td>{user.category.name}</Td>
              <Td>
                <Badge colorScheme={UserRoleColor[user.role]}>
                  {user.role}
                </Badge>
              </Td>
              <Td>
                <HStack spacing={2} justifyContent="flex-end">
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
