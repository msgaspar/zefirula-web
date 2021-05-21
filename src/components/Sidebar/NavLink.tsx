import { Link as ChakraLink, Icon, Text, LinkProps as ChakraLinkProps } from '@chakra-ui/react'
import { ElementType } from 'react'
import { ActiveLink } from '../ActiveLink'

interface NavLinkProps extends ChakraLinkProps {
  icon: ElementType;
  children: string;
  href: string;
}

export function NavLink({ icon, children, href, ...rest }: NavLinkProps) {
  return (
    <ActiveLink href={href} passHref>
      <ChakraLink display="flex" align="center" {...rest}>
        <Icon as={icon} fontSize="20" mt="0.5"/>
        <Text ml="4" fontWeight="600">{children}</Text>
      </ChakraLink>
    </ActiveLink>
  )
}