import { Flex, Button, Stack, Image, Box } from '@chakra-ui/react'
import { SubmitHandler, useForm, useFormState } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { LoginInput } from '../components/Form/LoginInput'

type SignInFormData = {
  username: string;
  password: string;
}

const signInFormSchema = yup.object().shape({
  username: yup.string().required('Digite o nome de usuário'),
  password: yup.string().required('Digite a senha')
})

export default function Home() {
  const { register, handleSubmit, formState } = useForm({
    resolver: yupResolver(signInFormSchema)
  })

  const { errors } = formState

  const handleSignIn: SubmitHandler<SignInFormData> = async (values) => {
    await new Promise(resolve => setTimeout(resolve, 2000))
  }

  return (
    <Flex
      w="100vw"
      minHeight="100vh"
      align="center"
      direction="column"
    >
      <Box flex="1"></Box>
      <Stack align="center" spacing="8" m="2">
        <Box w={[180, 240]}>
          <Image src="/images/logo.png" alt="Logo"/>
        </Box>
      
        <Flex
          as="form"
          width="100%"
          maxWidth={360}
          bg="gray.200"
          p="8"
          borderRadius={8}
          flexDir="column"
          onSubmit={handleSubmit(handleSignIn)}
        >
          <Stack
            spacing="4"
          >
            <LoginInput
              name="username"
              label="Usuário"
              error={errors.username}
              {...register("username")} />
            <LoginInput
              name="password"
              type="password"
              label="Senha"
              error={errors.password}
              {...register('password')} />
          </Stack>

          <Button
            type="submit"
            mt="6"
            colorScheme="teal"
            size="lg"
            isLoading={formState.isSubmitting}  
          >Entrar</Button>
        </Flex>
      </Stack>
      <Box flex="2"></Box>
    </Flex>
  )
}
