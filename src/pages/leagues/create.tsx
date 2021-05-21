import { Box, Flex, Heading, Divider, SimpleGrid, VStack, HStack, Button } from '@chakra-ui/react'
import { SubmitHandler, useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import Link from 'next/link'

import { Input } from '../../components/Form/Input'
import Header from '../../components/Header'
import { Sidebar } from '../../components/Sidebar'

type CreateLeagueFormData = {
  name: string;
}

const createLeagueFormSchema = yup.object().shape({
  name: yup.string().required('Digite um nome para a nova liga')
})

export default function CreateLeague() {
  const { register, handleSubmit, formState } = useForm({
    resolver: yupResolver(createLeagueFormSchema)
  })

  const { errors } = formState;

  const handleCreateLeague: SubmitHandler<CreateLeagueFormData> = async (values) => {
    await new Promise(resolve => setTimeout(resolve, 2000))
  }

  return (
    <Box>
      <Header />

      <Flex w="100%" my="6" maxWidth={1480} mx="auto" px="6">
        <Sidebar />

        <Box
          as="form"
          flex="1"
          borderRadius={8}
          bg="gray.800"
          p={["6", "8"]}
          onSubmit={handleSubmit(handleCreateLeague)}
          >
          <Heading size="lg" fontWeight="normal">Criar nova liga</Heading>

          <Divider my="6" borderColor="gray.700" />

          <VStack spacing="8">
            <SimpleGrid minChildWidth="240px" spacing={["6", "8"]} w="100%">
              <Input
                name="name"
                label="Nome da liga"
                error={errors.name}
                {...register('name')} />
            </SimpleGrid>
          </VStack>

          <Flex mt="8" justify="flex-end">
            <HStack spacing="4">
              <Link href="/leagues" passHref>
                <Button colorScheme="whiteAlpha">Cancelar</Button>
              </Link>
              <Button
                colorScheme="teal"
                type="submit"
                isLoading={formState.isSubmitting}
                >Salvar</Button>
            </HStack>
          </Flex>
        </Box>
      </Flex>
    </Box>
  )
}