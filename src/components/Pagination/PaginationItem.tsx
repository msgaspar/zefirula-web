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
      colorScheme="white"
      disabled
      _disabled={{
        bgColor: "gray.700",
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
      bgColor="gray.200"
      _hover={{
        bg: 'gray.300'
      }}
    >
      {number}
    </Button>
  )
}