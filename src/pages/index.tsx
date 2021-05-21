import { Flex, Button, Stack } from '@chakra-ui/react'
import { SubmitHandler, useForm, useFormState } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { Input } from '../components/Form/Input'

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
      h="100vh"
      align="center"
      justify="center"
    >
      <Flex
        as="form"
        width="100%"
        maxWidth={360}
        bg="gray.800"
        p="8"
        borderRadius={8}
        flexDir="column"
        onSubmit={handleSubmit(handleSignIn)}
      >
        <Stack
          spacing="4"
        >
          <Input
            name="username"
            label="Usuário"
            error={errors.username}
            {...register("username")} />
          <Input
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
    </Flex>
  )
}
