import { Flex, Text } from '@chakra-ui/react'

export default function Header() {
  return (
    <Flex
      as="header"
      w="100%"
      maxWidth={1480}
      h="20"
      mx="auto"
      mt="4"
      px="6"
      align="center"  
    >
      <Text
        fontSize="3xl"
        fontWeight="bold"
        letterSpacing="tight"
        w="64">
        zéfirula
        <Text as="span" ml="1" color="orange.500">.</Text>
      </Text>
    </Flex>
  )
}