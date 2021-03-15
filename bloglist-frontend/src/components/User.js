import React from 'react'
import { useRouteMatch } from 'react-router-dom'
import { useSelector } from 'react-redux'
import {VStack, Heading} from '@chakra-ui/react'
import {
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    TableCaption,
  } from "@chakra-ui/react"



const User = () => {
    const users = useSelector(state => state.users)
    const match = useRouteMatch('/users/:id')
    const user = match ? users?.find((user) => user.id === match.params.id) : null

    if (!user) {
        return null
    }

    return (
        <VStack w="xl"  padding="10" spacing="5" mx="auto">
            <Heading size="lg">{user.name}</Heading>
            

                <Table size="sm" >
                <TableCaption>{`These are the blogs added by ${user.name}`}</TableCaption>
                <Thead>
                    <Tr>
                    <Th>Added blogs</Th>
                    </Tr>
                </Thead>
                <Tbody>
                {user.blogs.length === 0 ? (
                <Tr><Td>No blogs added yet.</Td></Tr>
                ) : (
                user.blogs?.map((blog) => (
                    <Tr>
                    <Td key={blog.id} fontSize="md" >
                    {blog.title}
                    </Td>
                    </Tr>
                )))}
                </Tbody>
                </Table>
        </VStack>
    )
}

export default User

