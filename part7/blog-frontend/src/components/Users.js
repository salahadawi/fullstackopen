import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

import {
  Center,
  Heading,
  VStack,
  TableContainer,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
} from '@chakra-ui/react'

const Users = () => {
  const users = useSelector((state) => state.users)
  return (
    <Center>
      <VStack spacing="4" bg="teal.50" px="64px" py="48px" rounded="xl" m="8">
        <Heading>Users</Heading>
        <TableContainer>
          <Table variant="striped" colorScheme="teal">
            <Thead>
              <Tr>
                <Th>Username</Th>
                <Th isNumeric>blogs created</Th>
              </Tr>
            </Thead>
            <Tbody>
              {users.map((user) => (
                <Tr key={user.id}>
                  <Td>
                    <Link to={`/users/${user.id}`}>{user.name}</Link>
                  </Td>
                  <Td isNumeric>{user.blogs.length}</Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </TableContainer>
      </VStack>
    </Center>
  )
}

export default Users
