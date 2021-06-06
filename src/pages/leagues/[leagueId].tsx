import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { api } from '../../services/api';
import {
  Button,
  Flex,
  Heading,
  Stack,
  Icon,
  Spinner,
  Box,
  Table,
  Thead,
  Th,
  Td,
  Text,
  Tbody,
  Tr,
  Image,
  Select,
} from '@chakra-ui/react';
import Header from '../../components/Header';
import { Sidebar } from '../../components/Sidebar';
import {
  RiAddLine,
  RiDeleteBack2Line,
  RiDeleteBin2Line,
  RiDeleteBin3Line,
  RiDeleteBin4Line,
  RiDeleteBin5Line,
  RiDeleteBin7Line,
} from 'react-icons/ri';
import FormInput from '../../components/Form/FormInput';
import { useMutation } from 'react-query';
import { queryClient } from '../../services/queryClient';

function League() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [round, setRound] = useState(-1);
  const [isAddingClub, setIsAddingClub] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [leagueData, setLeagueData] = useState({
    id: '',
    name: '',
    round: 0,
    lastRound: 0,
    clubs: [],
  });

  const deleteLeague = useMutation(
    async (leagueId: string) => {
      await api.delete(`leagues/${leagueId}`);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries('leagues');
      },
    }
  );

  const handleDeleteLeague = leagueId => {
    return async () => {
      await deleteLeague.mutateAsync(leagueId);
      router.push('/leagues');
    };
  };

  const handleSearch = e => {
    e.preventDefault();
    const q = encodeURIComponent(e.target[0].value);
    api
      .get('clubs/search', {
        params: {
          q,
        },
      })
      .then(response => setSearchResults([...response.data]));
  };

  const addClub = () => {
    setIsAddingClub(true);
  };

  const handleAddClub = (id: string) => {
    return () => {
      api
        .post(`leagues/${leagueData.id}`, {
          clubId: String(id),
        })
        .then(() => router.reload());
    };
  };

  const handleRemoveClub = (id: string) => {
    return () => {
      api.delete(`leagues/${leagueData.id}/${id}`).then(() => router.reload());
    };
  };

  const handleSelectRound = e => {
    setRound(e.target.value);
  };

  useEffect(() => {
    if (router.query.leagueId) {
      const path =
        round === -1
          ? `leagues/${router.query.leagueId}`
          : `leagues/${router.query.leagueId}/${round}`;
      api
        .get(path)
        .then(response => {
          setLeagueData({ id: router.query.leagueId, ...response.data });
        })
        .then(() => setIsLoading(false));
    }
  }, [router.query, round]);

  const rounds = [];
  for (let i = 1; i <= leagueData.lastRound; i += 1) {
    rounds.push(i);
  }

  return (
    <Flex direction="column" minHeight="100vh" bg="gray.50">
      <Header />

      <Flex
        w="100%"
        my="6"
        flex="1"
        maxWidth={1480}
        mx="auto"
        px={['2', '4', '6']}
      >
        <Sidebar />

        <Flex direction="column" flex="1" w="100%">
          <Flex
            px={['6', '8']}
            mb="8"
            justify="space-between"
            align={['flex-start', 'center']}
            direction={['column', 'row']}
          >
            {!isLoading && (
              <>
                <Stack>
                  <Heading as="h1" size="lg" fontWeight="600" my={[6, 6, 8, 0]}>
                    {leagueData.name}
                  </Heading>
                  <Select
                    onChange={handleSelectRound}
                    value={round}
                    variant="filled"
                    width="fit-content"
                    bg="transparent"
                    color="gray.600"
                    border="1px"
                    borderRadius={0}
                    borderColor="gray.200"
                    focusBorderColor="orange.200"
                  >
                    {rounds.map(roundNumber => (
                      <option
                        style={{ color: 'black' }}
                        key={roundNumber}
                        value={roundNumber}
                      >
                        Rodada {roundNumber}
                      </option>
                    ))}
                  </Select>
                </Stack>
                <Button
                  colorScheme="teal"
                  borderRadius={0}
                  onClick={addClub}
                  leftIcon={<Icon as={RiAddLine} fontSize="20" />}
                >
                  Adicionar time
                </Button>
              </>
            )}
          </Flex>

          <Flex
            direction="column"
            flex="1"
            bg="white"
            p={['4', '6', '8']}
            border="1px"
            borderColor="gray.200"
          >
            {isLoading ? (
              <Flex justify="center" h="100%" align="center">
                <Spinner color="orange.logo" />
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
                    {searchResults.map(item => (
                      <Tr
                        key={item.id}
                        onClick={handleAddClub(item.id)}
                        borderLeft="5px solid white"
                        _hover={{
                          cursor: 'pointer',
                          boxShadow: 'md',
                          borderLeftColor: 'green.500',
                        }}
                      >
                        <Td>{item.name}</Td>
                        <Td>{item.cartoleiro}</Td>
                      </Tr>
                    ))}
                  </Tbody>
                </Table>
              </>
            ) : (
              <>
                <Box flex="1" w="100%" overflowX="auto" whiteSpace="nowrap">
                  <Table colorScheme="blackAlpha" fontSize={['xs', 'sm']}>
                    <Thead>
                      <Tr>
                        <Th></Th>
                        <Th>Nome</Th>
                        <Th>Cartoleiro</Th>
                        <Th>ID</Th>
                        <Th>Pontos</Th>
                        <Th>Pontos s/ capitão</Th>
                        <Th></Th>
                      </Tr>
                    </Thead>
                    <Tbody>
                      {leagueData.clubs.map(club => {
                        return (
                          <Tr borderLeft="5px solid white" key={club.id}>
                            <Td p="0">
                              <Image
                                boxSize="28px"
                                src={club.badgeImgUrl}
                                userSelect="none"
                              />
                            </Td>
                            <Td>
                              <Text fontWeight="600">{club.name}</Text>
                            </Td>
                            <Td>
                              <Text fontWeight="400">{club.cartoleiro}</Text>
                            </Td>
                            <Td>
                              <Text fontWeight="400">{club.id}</Text>
                            </Td>
                            <Td>
                              <Text fontWeight="400">
                                {Number(club.score).toLocaleString('pt-br')}
                              </Text>
                            </Td>
                            <Td>
                              <Text fontWeight="400">
                                {Number(
                                  club.score - club.captain_score
                                ).toLocaleString('pt-br')}
                              </Text>
                            </Td>
                            <Td>
                              <Icon
                                as={RiDeleteBin2Line}
                                onClick={handleRemoveClub(club.id)}
                                fontSize="18"
                                _hover={{
                                  cursor: 'pointer',
                                }}
                                color="red.500"
                              />
                            </Td>
                          </Tr>
                        );
                      })}
                    </Tbody>
                  </Table>
                </Box>
                <Button
                  colorScheme="red"
                  borderRadius={0}
                  marginTop="36px"
                  variant="outline"
                  alignSelf="flex-end"
                  onClick={handleDeleteLeague(leagueData.id)}
                  leftIcon={<Icon as={RiDeleteBin7Line} fontSize="20" />}
                >
                  Excluir liga
                </Button>
              </>
            )}
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
}

export default League;
