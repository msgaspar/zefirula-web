import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input as ChakraInput,
  InputProps as ChakraInputProps,
} from '@chakra-ui/react';
import { FieldError } from 'react-hook-form';
import { forwardRef, ForwardRefRenderFunction } from 'react';

interface FormInputProps extends ChakraInputProps {
  name: string;
  label?: string;
  error?: FieldError;
}

const InputBase: ForwardRefRenderFunction<HTMLInputElement, FormInputProps> = (
  { name, label, error, ...rest },
  ref
) => {
  return (
    <FormControl isInvalid={!!error}>
      {!!label && <FormLabel htmlFor="email">{label}</FormLabel>}

      <ChakraInput
        name={name}
        id={name}
        focusBorderColor="orange.500"
        bgColor="white"
        variant="filled"
        _hover={{
          bgColor: 'gray.50',
        }}
        size="lg"
        fontSize="md"
        autoComplete="off"
        border="1px"
        {...rest}
        ref={ref}
      />

      {!!error && <FormErrorMessage>{error.message}</FormErrorMessage>}
    </FormControl>
  );
};

export default forwardRef(InputBase);
