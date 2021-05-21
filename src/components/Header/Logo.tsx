import { Box, Image } from '@chakra-ui/react'

export function Logo() {
  return (
    <Box h="fit-content">
      <Image boxSize={["100px", "100px", "130px"]} src="/images/logo.png" alt="logo"/>
    </Box>
  )
}