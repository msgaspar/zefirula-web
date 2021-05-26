import { useRouter } from 'next/router'
import { useEffect, useState } from 'react';
import { api } from '../../services/api';
import { Button, Flex, Heading, Stack, Icon, Spinner, Box, Table, Thead, Th, Td, Text, Tbody, Tr, Image, Avatar } from '@chakra-ui/react'
import Header from '../../components/Header'
import { Sidebar } from '../../components/Sidebar'
import Link from 'next/link'
import { RiAddLine, RiDeleteBack2Line, RiDeleteBin2Line, RiDeleteBin3Line, RiDeleteBin4Line, RiDeleteBin5Line, RiDeleteBin7Line } from 'react-icons/ri';
import { FormInput } from '../../components/Form/FormInput';
import { useMutation } from 'react-query';
import { queryClient } from '../../services/queryClient';

function League() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(true)
  const [isAddingClub, setIsAddingClub] = useState(false)
  const [searchResults, setSearchResults] = useState([])
  const [leagueData, setLeagueData] = useState({
    id: '',
    name: '',
    round: '',
    clubs: []
  })

  const deleteLeague = useMutation(async (leagueId: string) => {
    await api.delete(`leagues/${leagueId}`)
  }, {
    onSuccess: () => {
      queryClient.invalidateQueries('leagues')
    }
  })

  const handleDeleteLeague = (leagueId) => {
    return async () => {
      await deleteLeague.mutateAsync(leagueId)
      router.push('/leagues')
    }
  }

  const handleSearch = (e) => {
    e.preventDefault()
    const q = encodeURIComponent(e.target[0].value)
    api.get('clubs/search', {
      params: {
        q
      }
    })
    .then(response => setSearchResults([...response.data]))
  }
  

  const addClub = () => {
    setIsAddingClub(true)
  }

  const handleAddClub = (id: string) => {
    return () => {
      api.post(`leagues/${leagueData.id}`, {
        clubId: String(id)
      }).then(() => router.reload())
    }
  }

  const handleRemoveClub = (id: string) => {
    return () => {
      api.delete(`leagues/${leagueData.id}/${id}`).then(() =>
        router.reload()
      )
    }
  }
  
  useEffect(() => {
    if(router.query.leagueId) {
      api.get(`leagues/${router.query.leagueId}`)
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
              <Button
                colorScheme="teal"
                onClick={addClub}
                leftIcon={<Icon as={RiAddLine} fontSize="20" />}
                >
                Adicionar time
              </Button>
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
            ) : isAddingClub ? (
              <>
              <Box as="form" onSubmit={handleSearch}>
                <FormInput
                  name="Buscar time"
                  placeholder="Digite o nome do time"
                  borderColor="gray.300"
                  />
              </Box>
              <Table mt="5">
                <Thead>
                  <Tr>
                    <Th>Nome</Th>
                    <Th>Cartoleiro</Th>
                  </Tr>
                </Thead>
                <Tbody>
                { searchResults.map(item => (
                  <Tr 
                    key={item.id}
                    onClick={handleAddClub(item.id)}
                    borderLeft="5px solid white"
                    _hover={{
                      cursor: "pointer",
                      boxShadow: "md",
                      borderLeftColor: "green.500",
                    }}
                  >
                    <Td>
                      {item.name}
                    </Td>
                    <Td>
                      {item.cartoleiro}
                    </Td>
                  </Tr>
                  )
                )}
                
                </Tbody>
              </Table>
              </>
            ) : (
              <Box flex="1" w="100%" overflowX="auto" whiteSpace="nowrap">
              <Table colorScheme="blackAlpha" fontSize={["xs", "sm"]}>
                <Thead>
                  <Tr>
                    <Th></Th>
                    <Th>Nome</Th>
                    <Th>Cartoleiro</Th>
                    <Th>Pontos</Th>
                    <Th>Pontos s/ capitão</Th>
                    <Th></Th>
                  </Tr>
                </Thead>
                <Tbody>
                  
                  {leagueData.clubs.map(club => {
                    console.log(club.badgeImgUrl)
                    return (
                    <Tr
                      borderLeft="5px solid white"
                      key={club.id}
                    >
                    <Td>
                      <Image boxSize="28px" src={club.badgeImgUrl} userSelect="none" />
                    </Td>
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
                    <Td>
                      <Icon
                        as={RiDeleteBin2Line}
                        onClick={handleRemoveClub(club.id)}
                        fontSize="18"
                        _hover={{
                          cursor: "pointer"
                        }}
                        color="red.500" 
                      />
                    </Td>
                  </Tr>
                  )})}
                </Tbody>
              </Table>
            </Box>
            )}
            {
            !isAddingClub && (

              <Button
              colorScheme="red"
              variant="outline"
              alignSelf="flex-end"
              onClick={handleDeleteLeague(leagueData.id)}
              leftIcon={<Icon as={RiDeleteBin7Line} fontSize="20" />}
              >
                Excluir liga
              </Button>
            )
            }

          </Flex>


          </Flex>
        </Flex>
      </Flex>
  )
}

export default League