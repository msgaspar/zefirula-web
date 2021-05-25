import Header from '../../components/Header'
import { Box, Button, Flex, Icon, Heading, Table, Thead, Tr, Th, Checkbox, Tbody, Td, Text, Spinner } from '@chakra-ui/react'
import { Sidebar } from '../../components/Sidebar'
import { RiAddLine, RiDeleteBin2Line } from 'react-icons/ri'
import { Pagination } from '../../components/Pagination'
import Link from 'next/link'
import { useContext, useEffect } from 'react'
import { useMutation, useQuery } from 'react-query'
import { api } from '../../services/api'
import { useLeagues } from '../../services/hooks/useLeagues'
import { AuthContext } from '../../contexts/AuthContext'
import { queryClient } from '../../services/queryClient'

export default function LeagueList() {
  const { data, isLoading, isFetching, error } = useLeagues();

  return (
    <Flex direction="column" minHeight="100vh" bg="gray.50">
      <Header />

      <Flex w="100%" my="6" flex="1" maxWidth={1480} mx="auto" px={[ "2", "4", "6"]}>
        <Sidebar />

        <Flex direction="column" flex="1" w="100%">
          <Flex
            px={["6", "8"]}
            mb="8"
            justify="space-between"
            align={["flex-start", "center"]}
            direction={['column', 'row']}>
            <Heading size="xl" fontWeight="600" my={[6, 6, 8, 0]}>
              Ligas 

              { !isLoading && isFetching && <Spinner size="md" color="orange.200" ml="6"/>}
              
            </Heading>

            <Link href="/leagues/create" passHref>
              <Button
                as="a"
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
            p={["4", "6", "8"]}
            border="1px"
            borderColor="gray.200"
          >
            
            { isLoading ? (
              <Flex justify="center" h="100%" align="center"> 
                <Spinner />
              </Flex>
            ) : error ? (
              <Flex justify="center" h="100%" align="center">
                <Text>Falha ao obter os dados da API</Text>
              </Flex>
            ) : (
              <Box flex="1" w="100%" overflowX="auto" whiteSpace="nowrap">
              <Table colorScheme="blackAlpha" fontSize={["xs", "sm"]}>
                <Thead>
                  <Tr>
                    <Th>Nome</Th>
                    <Th>Times inscritos</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {data.map(league => (
                  <Link href={`/leagues/${league.id}`} key={league.id} passHref>
                    <Tr
                      borderLeft="5px solid white"
                      _hover={{
                        cursor: "pointer",
                        boxShadow: "md",
                        borderLeftColor: "orange"
                      }}
                      >
                    <Td>
                      <Text fontWeight="600">{league.name}</Text>
                    </Td>
                    <Td>
                      {league.clubs_count}
                    </Td>
                  </Tr></Link>
                  ))}
                </Tbody>
              </Table>
            </Box>
            )}

          </Flex>
        </Flex>
      </Flex>
    </Flex>
  )
}