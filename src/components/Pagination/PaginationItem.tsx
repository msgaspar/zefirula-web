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
      colorScheme="gray"
      border="1px"
      borderColor="gray.300"
      disabled
      _disabled={{
        bgColor: "white",
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