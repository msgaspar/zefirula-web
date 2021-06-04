import { useContext } from 'react';
import * as yup from 'yup';

import { AuthContext } from '../../contexts/AuthContext';
import { SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  Stack,
  Button,
  useToast,
  Box,
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
} from '@chakra-ui/react';

type LoginFormData = {
  username: string;
  password: string;
};

const LoginFormSchema = yup.object().shape({
  username: yup.string().required('Digite o nome de usuário'),
  password: yup.string().required('Digite a senha'),
});

const LoginForm = () => {
  const toast = useToast();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(LoginFormSchema),
  });

  const { signIn } = useContext(AuthContext);

  const handleSignIn: SubmitHandler<LoginFormData> = async values => {
    try {
      await signIn(values);
    } catch {
      toast({
        position: 'top-right',
        title: 'Usuário ou senha inválidos',
        description: 'Não foi possível fazer o login',
        status: 'error',
        variant: 'left-accent',
        isClosable: true,
      });
    }
  };

  return (
    <Box as="form" onSubmit={handleSubmit(handleSignIn)} width="100%">
      <Stack spacing="6">
        <FormControl isInvalid={!!errors.username}>
          <FormLabel fontSize="sm" htmlFor="username">
            Usuário
          </FormLabel>

          <Input
            name="username"
            id="username"
            placeholder="Usuário"
            autoComplete="off"
            focusBorderColor="orange.300"
            {...register('username')}
          />

          <FormErrorMessage>
            {errors.username && errors.username.message}
          </FormErrorMessage>
        </FormControl>

        <FormControl isInvalid={!!errors.password}>
          <FormLabel fontSize="sm" htmlFor="password">
            Senha
          </FormLabel>

          <Input
            name="password"
            id="password"
            placeholder="Senha"
            type="password"
            autoComplete="off"
            focusBorderColor="orange.300"
            {...register('password')}
          ></Input>
          <FormErrorMessage>
            {errors.password && errors.password.message}
          </FormErrorMessage>
        </FormControl>

        <Button
          type="submit"
          colorScheme="teal"
          size="md"
          fontSize="sm"
          isLoading={isSubmitting}
        >
          Entrar
        </Button>
      </Stack>
    </Box>
  );
};

export default LoginForm;
