import { Button } from '@chakra-ui/react'

interface PaginationItemProps {
  isCurrent?: boolean;
  number: number;
}

export function PaginationItem({ isCurrent = false, number }: PaginationItemProps) {
  if (isCurrent) {
    return (
      <Button
      size="sm"
      fontSize="xs"
      w="4"
      colorScheme="teal"
      disabled
      _disabled={{
        bgColor: "teal.500",
        cursor: 'default'
      }}  
    >{number}</Button>
    )
  }

  return (
    <Button
      size="sm"
      fontSize="xs"
      w="4"
      bgColor="gray.700"
      _hover={{
        bg: 'gray:500'
      }}
    >
      {number}
    </Button>
  )
}