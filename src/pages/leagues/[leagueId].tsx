import { useRouter } from 'next/router'
import { useEffect, useState } from 'react';
import { api } from '../../services/api';
import { Button, Flex, Heading, Stack, Icon, Spinner, Box, Table, Thead, Th, Td, Text, Tbody, Tr, Image } from '@chakra-ui/react'
import Header from '../../components/Header'
import { Sidebar } from '../../components/Sidebar'
import Link from 'next/link'
import { RiAddLine } from 'react-icons/ri';


function League() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(true)
  const [leagueData, setLeagueData] = useState({
    id: '',
    name: '',
    round: '',
    clubs: []
  })
  
  useEffect(() => {
    if(router.query.leagueId) {
      api.get(`http://localhost:3333/leagues/${router.query.leagueId}`)
        .then(response => setLeagueData({id: router.query.leagueId, ...response.data}))
        .then(() => setIsLoading(false))
    }
  }, [router.query])

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
            direction={['column', 'row']}
          >
            <Stack>
              <Heading as="h1" size="lg" fontWeight="600" my={[6, 6, 8, 0]}>
                {leagueData.name} 
              </Heading>
              <Heading as="h2" color="orange.logo" size="sm" fontWeight="400" my={[6, 6, 8, 0]}>
                Rodada {leagueData.round} 
              </Heading>
            </Stack>
            <Link href={`/leagues/${leagueData.id}/create`} passHref>
              <Button
                as="a"
                colorScheme="teal"
                leftIcon={<Icon as={RiAddLine} fontSize="20" />}
                >
                Adicionar time
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
            ) : (
              <Box flex="1" w="100%" overflowX="auto" whiteSpace="nowrap">
              <Table colorScheme="blackAlpha" fontSize={["xs", "sm"]}>
                <Thead>
                  <Tr>
                    <Th>Nome</Th>
                    <Th>Cartoleiro</Th>
                    <Th>Pontos</Th>
                    <Th>Pontos s/ capitão</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {leagueData.clubs.map(club => (
                    <Tr
                      borderLeft="5px solid white"
                    >
                    <Td>
                      <Text fontWeight="600">{club.name}</Text>
                    </Td>
                    <Td>
                      <Text fontWeight="600">{club.cartoleiro}</Text>
                    </Td>
                    <Td>
                      <Text fontWeight="600">{club.score}</Text>
                    </Td>
                    <Td>
                      <Text fontWeight="600">{club.captain_score}</Text>
                    </Td>
                  </Tr>
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

export default League