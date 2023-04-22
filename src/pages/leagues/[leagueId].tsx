import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { CSVLink } from 'react-csv';
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
  IconButton,
  HStack,
} from '@chakra-ui/react';
import Header from '../../components/Header';
import { Sidebar } from '../../components/Sidebar';
import {
  RiAddLine,
  RiDeleteBin2Line,
  RiDeleteBin7Line,
  RiDownloadFill,
  RiCloseLine,
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
      .then(response => {
        const bestResult = response.data.filter(club =>
          club.name.toLowerCase().includes(q.toLowerCase())
        );
        const otherResults = response.data.filter(
          club => !bestResult.includes(club)
        );
        setSearchResults([...bestResult, ...otherResults]);
      });
  };

  const toggleAddClub = () => {
    isAddingClub ? setIsAddingClub(false) : setIsAddingClub(true);
  };

  const handleAddClub = (id: string) => {
    return () => {
      setIsAddingClub(false);
      setIsLoading(true);
      api
        .post(`leagues/${leagueData.id}`, {
          clubId: String(id),
        })
        .then(() => router.reload());
    };
  };

  const handleRemoveClub = (id: string) => {
    return () => {
      const data = { ...leagueData };
      data.clubs = data.clubs.filter(club => club.id !== id);
      setLeagueData(data);
      api.delete(`leagues/${leagueData.id}/${id}`).catch(() => router.reload());
    };
  };

  const handleSelectRound = e => {
    setIsLoading(true);
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
          setRound(response.data.round);
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
          {!isLoading && (
            <>
              <Heading as="h1" size="xl" fontWeight="600" ml={8} mt={8}>
                {leagueData.name}
              </Heading>
              <Flex
                px={8}
                my={8}
                justify="space-between"
                align={['flex-start', 'center']}
                direction={['column', 'row']}
              >
                <Stack>
                  <HStack spacing={2}>
                    <Select
                      title="Selecionar rodada"
                      onChange={handleSelectRound}
                      value={round}
                      variant="filled"
                      width="fit-content"
                      bg="transparent"
                      color="gray.700"
                      border="1px"
                      borderRadius={0}
                      borderColor="gray.200"
                      focusBorderColor="gray.200"
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

                    <CSVLink
                      title="Download .csv"
                      filename={`${leagueData.name.replace(
                        /\s/g,
                        ''
                      )}-rodada${round}.csv`}
                      headers={[
                        { label: 'ID', key: 'id' },
                        { label: 'Equipe', key: 'name' },
                        { label: 'Cartoleiro', key: 'cartoleiro' },
                        { label: 'Pontos', key: 'score' },
                        {
                          label: 'Pontos sem capitão',
                          key: 'scoreWithoutCaptain',
                        },
                      ]}
                      data={leagueData.clubs.map(club => ({
                        id: club.id,
                        name: club.name,
                        cartoleiro: club.cartoleiro,
                        score: Number(club.score).toLocaleString('pt-br'),
                        scoreWithoutCaptain: Number(
                          club.score - club.captain_score
                        ).toLocaleString('pt-br'),
                      }))}
                      separator={';'}
                    >
                      <IconButton
                        aria-label="download csv"
                        border="1px"
                        borderColor="gray.200"
                        color="gray.700"
                        bg="transparent"
                        borderRadius={0}
                        icon={<Icon as={RiDownloadFill} />}
                      />
                    </CSVLink>
                  </HStack>
                </Stack>
                {isAddingClub ? (
                  <Button
                    colorScheme="gray"
                    bg="gray.300"
                    borderRadius={0}
                    onClick={toggleAddClub}
                    leftIcon={<Icon as={RiCloseLine} fontSize="20" />}
                  >
                    Cancelar
                  </Button>
                ) : (
                  <Button
                    colorScheme="teal"
                    borderRadius={0}
                    onClick={toggleAddClub}
                    leftIcon={<Icon as={RiAddLine} fontSize="21" />}
                  >
                    Adicionar time
                  </Button>
                )}
              </Flex>
            </>
          )}

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
                        <Th w={0}></Th>
                        <Th>Nome</Th>
                        <Th>Cartoleiro</Th>
                        <Th>ID</Th>
                        <Th>Pontos</Th>
                        <Th>Pontos s/ capitão</Th>
                        <Th w={0}></Th>
                      </Tr>
                    </Thead>
                    <Tbody>
                      {leagueData.clubs.map(club => {
                        return (
                          <Tr borderLeft="5px solid white" key={club.id}>
                            <Td p={0}>
                              <Image
                                boxSize="28px"
                                mx="auto"
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
                                {Number(club.score).toLocaleString('pt-br', {
                                  minimumFractionDigits: 2,
                                })}
                              </Text>
                            </Td>
                            <Td>
                              <Text fontWeight="400">
                                {Number(
                                  club.score - club.captain_score / 2
                                ).toLocaleString('pt-br', {
                                  minimumFractionDigits: 2,
                                })}
                              </Text>
                            </Td>
                            <Td p={0} textAlign="center">
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
