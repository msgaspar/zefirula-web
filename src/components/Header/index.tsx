import { Flex, IconButton, useBreakpointValue, Icon } from '@chakra-ui/react'
import { RiMenuLine } from 'react-icons/ri'
import { useSidebarDrawer } from '../../contexts/SidebarDrawerContext'
import { Logo } from './Logo'

export default function Header() {
  const { onOpen } = useSidebarDrawer()

  const isWideVersion = useBreakpointValue({
    base: false,
    lg: true
  })

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

    { !isWideVersion && (
      <IconButton
        icon={<Icon as={RiMenuLine} />}
        fontSize="24"
        variant="unstyled"
        onClick={onOpen}
        aria-label="Open navigation"
        mr="2"
      />
    )}

    <Logo />

    </Flex>
  )
}