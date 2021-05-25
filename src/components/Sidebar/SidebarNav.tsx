import { Stack, Button, Link, Icon, Text } from '@chakra-ui/react'
import { RiLogoutBoxLine, RiTrophyLine } from 'react-icons/ri'
import { NavSection } from './NavSection'
import { NavLink } from './NavLink'
import { useContext } from 'react'
import { AuthContext } from '../../contexts/AuthContext'

export function SidebarNav() {
  const { signOut } = useContext(AuthContext)

  return (
    <Stack spacing="12" align="flex-start" pt="14">
        <NavSection title="GERAL">
          <NavLink icon={RiTrophyLine} href="/leagues">Ligas</NavLink>
          <Link display="flex" onClick={signOut} align="center">
            <Icon as={RiLogoutBoxLine} fontSize="20" mt="0.5"/>
            <Text ml="4" fontWeight="600">Logout</Text>
          </Link>
        </NavSection>
      </Stack>
  )
}