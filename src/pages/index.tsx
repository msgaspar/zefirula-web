import { useContext, useState } from 'react';
import { Flex, Button, Stack, Image, Box, Text } from '@chakra-ui/react';
import { SubmitHandler, useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { LoginInput } from '../components/Form/LoginInput';
import { AuthContext } from '../contexts/AuthContext';

type SignInFormData = {
  username: string;
  password: string;
};

const signInFormSchema = yup.object().shape({
  username: yup.string().required('Digite o nome de usuário'),
  password: yup.string().required('Digite a senha'),
});

export default function Home() {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [loginHasFailed, setLoginHasFailed] = useState(false);

  const { register, handleSubmit, formState } = useForm({
    resolver: yupResolver(signInFormSchema),
  });
  const { errors } = formState;

  const { signIn } = useContext(AuthContext);

  const handleSignIn: SubmitHandler<SignInFormData> = async values => {
    try {
      await signIn(values);
    } catch {
      setLoginHasFailed(true);
    }
  };

  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  return (
    <Flex w="100vw" minHeight="100%" align="center" direction="column">
      <Box flex="1" />

      <Stack
        style={{ display: imageLoaded ? 'block' : 'none' }}
        align="center"
        spacing="8"
        m="2"
      >
        <Box w={[140, 180]} mx="auto">
          <Image src="/images/logo.png" alt="Logo" onLoad={handleImageLoad} />
        </Box>

        <Flex
          as="form"
          width={['100%', '330px']}
          bg="gray.200"
          p="8"
          borderRadius={8}
          flexDir="column"
          onSubmit={handleSubmit(handleSignIn)}
        >
          <Stack spacing="3">
            <LoginInput
              name="username"
              label="Usuário"
              error={errors.username}
              {...register('username')}
            />
            <LoginInput
              name="password"
              type="password"
              label="Senha"
              error={errors.password}
              {...register('password')}
            />
            {loginHasFailed && (
              <Text color="red.500" fontSize={14}>
                Usuário ou senha inválidos
              </Text>
            )}
          </Stack>
          <Button
            type="submit"
            mt="6"
            colorScheme="teal"
            size="md"
            isLoading={formState.isSubmitting}
          >
            Entrar
          </Button>
        </Flex>
      </Stack>

      <Box flex="2" />
    </Flex>
  );
}
