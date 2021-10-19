import { ReactNode } from 'react';

import { Footer } from '../features/layout/Footer';
import { Header } from '../features/layout/Header';
import { Box, Flex, Container } from '../shared/Grid';
import { Modal } from '../shared/Modal';
import { Heading, Text } from '../shared/Text';

interface BaseLayoutProps {
  children?: ReactNode;
}

export function BaseLayout({ children }: BaseLayoutProps) {
  return (
    <Flex flexDirection="column" height="100vh">
      <Header />

      <Box as="main" flex="1 0 auto" display="block" pt="96px">
        <Container>{children}</Container>
      </Box>

      <Footer />

      <Modal id="error">
        <Box p={60}>
          <Heading mb={30}>Oops!</Heading>
          <Text>Somethign went wrong. Try to refresh the page</Text>
        </Box>
      </Modal>
    </Flex>
  );
}
