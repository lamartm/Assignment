import styled from '@emotion/styled';

import { Box, Container, Flex } from '../shared/Grid';

const OverlaySection = styled.section`
  position: fixed;
  opacity: 1;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: black;
`;

const NavigationLinks = () => {
  const items = [
    {
      href: '/about',
      title: 'About',
      id: '1',
    },
    {
      href: '/blog',
      title: 'Blog',
      id: '2',
    },
    {
      href: '/examples',
      title: 'Examples',
      id: '3',
    },
    {
      href: '/form',
      title: 'Example form',
      id: '4',
    },
    {
      href: '/assignment',
      title: 'Assignment',
      id: '5',
    },
  ];

  return (
    <Box as="ul" listStyleType="none">
      {items.map(d => {
        return (
          <Box as="li" key={d.id} borderBottom="2px grey solid">
            <Box
              as="a"
              textDecoration="none"
              color="gray.400"
              _hover={{ color: 'white' }}
              transition="color 0.3s"
              href={d.href}>
              {d.title}
            </Box>
          </Box>
        );
      })}
    </Box>
  );
};

export function Overlay() {
  return (
    <OverlaySection>
      <Container height="100%">
        <Flex justifyContent="center" flexDirection="column" height="100%" p="0 16px 0 16px">
          <Box as="nav" alignSelf="center" textAlign="right" fontSize="5.2vh" w="100%">
            <NavigationLinks></NavigationLinks>
          </Box>
        </Flex>
      </Container>
    </OverlaySection>
  );
}
