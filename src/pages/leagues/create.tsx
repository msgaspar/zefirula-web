import {
  Box,
  Flex,
  Heading,
  Divider,
  SimpleGrid,
  VStack,
  HStack,
  Button,
} from '@chakra-ui/react';
import { SubmitHandler, useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import Link from 'next/link';
import { useMutation } from 'react-query';

import FormInput from '../../components/Form/FormInput';
import Header from '../../components/Header';
import { Sidebar } from '../../components/Sidebar';
import { api } from '../../services/api';
import { queryClient } from '../../services/queryClient';
import { useRouter } from 'next/router';

type CreateLeagueFormData = {
  name: string;
};

const createLeagueFormSchema = yup.object().shape({
  name: yup.string().required('Digite um nome para a nova liga'),
});

export default function CreateLeague() {
  const router = useRouter();

  const createLeague = useMutation(
    async (league: CreateLeagueFormData) => {
      await api.post('leagues', {
        name: league.name,
      });
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries('leagues');
      },
    }
  );

  const { register, handleSubmit, formState } = useForm({
    resolver: yupResolver(createLeagueFormSchema),
  });

  const { errors } = formState;

  const handleCreateLeague: SubmitHandler<CreateLeagueFormData> =
    async values => {
      await createLeague.mutateAsync(values);

      router.push('/leagues');
    };

  return (
    <Flex direction="column" bg="gray.50" minHeight="100vh">
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

        <Box
          as="form"
          flex="1"
          bg="white"
          border="1px"
          borderColor="gray.200"
          p={['6', '8']}
          onSubmit={handleSubmit(handleCreateLeague)}
        >
          <Heading size="lg" fontWeight="400">
            Criar nova liga
          </Heading>

          <VStack spacing="8" mt="12">
            <SimpleGrid minChildWidth="200px" spacing={['6', '8']} w="100%">
              <FormInput
                name="name"
                borderColor="gray.400"
                fontSize={['sm', 'md']}
                label="Nome da liga"
                placeholder="Digite o nome da nova liga"
                error={errors.name}
                {...register('name')}
              />
            </SimpleGrid>
          </VStack>

          <Flex mt="8" justify="flex-end">
            <HStack spacing="4">
              <Link href="/leagues" passHref>
                <Button colorScheme="blackAlpha" variant="outline">
                  Cancelar
                </Button>
              </Link>
              <Button
                colorScheme="teal"
                type="submit"
                isLoading={formState.isSubmitting}
              >
                Salvar
              </Button>
            </HStack>
          </Flex>
        </Box>
      </Flex>
    </Flex>
  );
}
