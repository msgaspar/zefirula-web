import { Stack } from '@chakra-ui/react'
import { RiDashboardLine, RiGitMergeLine, RiInputMethodLine, RiTrophyLine } from 'react-icons/ri'
import { NavSection } from './NavSection'
import { NavLink } from './NavLink'

export function SidebarNav() {
  return (
    <Stack spacing="12" align="flex-start" pt="14">
        <NavSection title="GERAL">
          <NavLink icon={RiTrophyLine} href="/leagues">Ligas</NavLink>
        </NavSection>
      </Stack>
  )
}