import Header from '../../components/Header'
import { Box, Button, Flex, Icon, Heading, Table, Thead, Tr, Th, Checkbox, Tbody, Td, Text } from '@chakra-ui/react'
import { Sidebar } from '../../components/Sidebar'
import { RiAddLine } from 'react-icons/ri'
import { Pagination } from '../../components/Pagination'

export default function LeagueList() {
  return (
    <Box>
      <Header />

      <Flex w="100%" my="6" maxWidth={1480} mx="auto" px="6">
        <Sidebar />

        <Box flex="1" borderRadius={8} bg="gray.800" p="8">
          <Flex mb="8" justify="space-between" align="center">
            <Heading size="lg" fontWeight="normal">Ligas</Heading>

            <Button
              as="a"
              size="sm"
              fontSize="sm"
              colorScheme="teal"
              leftIcon={<Icon as={RiAddLine} fontSize="20" />}
            >
              Criar nova
            </Button>
          </Flex>

          <Table colorScheme="whiteAlpha">
            <Thead>
              <Tr>
                <Th width="400px">Nome</Th>
                <Th>Times inscritos</Th>
              </Tr>
            </Thead>
            <Tbody>
              <Tr>
                <Td>
                  <Text fontWeight="bold">Premier League</Text>
                </Td>
                <Td>
                  6
                </Td>
              </Tr>
            </Tbody>
          </Table>

          <Pagination />
        </Box>
      </Flex>
    </Box>
  )
}