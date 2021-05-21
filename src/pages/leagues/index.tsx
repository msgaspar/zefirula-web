import Header from '../../components/Header'
import { Box, Button, Flex, Icon, Heading, Table, Thead, Tr, Th, Checkbox, Tbody, Td, Text, useBreakpointValue } from '@chakra-ui/react'
import { Sidebar } from '../../components/Sidebar'
import { RiAddLine } from 'react-icons/ri'
import { Pagination } from '../../components/Pagination'
import Link from 'next/link'

export default function LeagueList() {
  const isWideVersion = useBreakpointValue({
    base: false,
    lg: true
  })

  return (
    <Flex direction="column" minHeight="100vh" bg="gray.50">
      <Header />

      <Flex w="100%" my="6" flex="1" maxWidth={1480} mx="auto" px="6">
        <Sidebar />

        <Flex direction="column" w="100%">
          <Flex
            px={["6", "10"]}
            mb="8"
            justify="space-between"
            align={["flex-start", "center"]}
            direction={['column', 'row']}>
            <Heading size="xl" fontWeight="bold" my={[6, 6, 8, 0]}>Ligas</Heading>

            <Link href="/leagues/create" passHref>
              <Button
                as="a"
                size="sm"
                py="5"
                fontSize="sm"
                colorScheme="teal"
                leftIcon={<Icon as={RiAddLine} fontSize="20" />}
                >
                Criar nova
              </Button>
            </Link>
          </Flex>

        
          <Flex
            direction="column"
            flex="1"
            bg="white"
            p="8"
            border="1px"
            borderColor="gray.200"
            boxShadow="md"
          >
            <Box flex="1" w="100%" overflowX="auto" whiteSpace="nowrap">
              <Table colorScheme="blackAlpha" fontSize={["sm", "md"]}>
                <Thead>
                  <Tr>
                    <Th>Nome</Th>
                    <Th>Times inscritos</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  <Tr>
                    <Td>
                      <Text fontWeight="600">Premier League</Text>
                    </Td>
                    <Td>
                      6
                    </Td>
                  </Tr>
                  <Tr>
                    <Td>
                      <Text fontWeight="600">Copa do Nordeste</Text>
                    </Td>
                    <Td>
                      29
                    </Td>
                  </Tr>
                  <Tr>
                    <Td>
                      <Text fontWeight="600">Champions League</Text>
                    </Td>
                    <Td>
                      1
                    </Td>
                  </Tr>
                  <Tr>
                    <Td>
                      <Text fontWeight="600">Brasileirão</Text>
                    </Td>
                    <Td>
                      4
                    </Td>
                  </Tr>
                </Tbody>
              </Table>
            </Box>

            <Pagination />
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  )
}