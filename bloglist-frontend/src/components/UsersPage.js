import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import {VStack, Box, Button, Icon, Heading, Text, HStack, Stack, Badge} from '@chakra-ui/react'
import {
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    TableCaption,
  } from "@chakra-ui/react"

const UsersPage = () => {
    const users = useSelector(state => state.users)
    return (
        <VStack p="10" mx="auto" width="xl">
            <Heading size="lg" p="4">Users</Heading>
            <Box p={4} shadow="md" borderWidth="1px" width="lg" borderRadius="md" mx="auto">                
                <Table size="md">
                <TableCaption>Users and number of blogs created by them</TableCaption>
                <Thead>
                    <Tr>
                    <Th>Username</Th>
                    <Th>Blogs Created</Th>
                    </Tr>
                </Thead>
                <Tbody>
                {users?.map((user) => (
                    <Tr  key={user?.id} color="gray.500" _hover={{ color: 'blue.500', fontWeight: 'medium'}}>
                        <Td ><Link to={`/users/${user.id}`}>{user?.username}</Link></Td>
                        <Td >{user?.blogs?.length}</Td>
                    </Tr>
                ))}
                </Tbody>
                </Table>

            </Box>
        </VStack>
    )
}

export default UsersPage
