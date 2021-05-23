import { FormControl, FormErrorMessage, FormLabel, Input as ChakraInput, InputProps as ChakraInputProps } from '@chakra-ui/react'
import { FieldError } from 'react-hook-form'
import { forwardRef, ForwardRefRenderFunction } from 'react'


interface LoginInputProps extends ChakraInputProps {
  name: string;
  label?: string;
  error?: FieldError;
}

const InputBase: ForwardRefRenderFunction<HTMLInputElement, LoginInputProps> = ({ name, label, error, ...rest }, ref) => {
  return (
    <FormControl isInvalid={!!error}>
      { !!label && <FormLabel fontSize="md" htmlFor={name}>{label}</FormLabel> }

      <ChakraInput
        name={name}
        id={name}
        focusBorderColor="orange.500"
        bgColor="white"
        variant="filled"
        _hover={{
          bgColor: 'white'
        }}
        size="md"
        _autofill={{
          WebkitBoxShadow: '0 0 10px 30px white inset'
        }}
        {...rest}
        ref={ref}
      />

      { !!error && (
        <FormErrorMessage>
          {error.message}
        </FormErrorMessage>)}
    </FormControl>
  )
}

export const LoginInput = forwardRef(InputBase)