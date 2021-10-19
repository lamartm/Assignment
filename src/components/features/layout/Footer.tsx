import styled from '@emotion/styled';
import { FaFacebook, FaInstagram, FaLongArrowAltUp, FaTwitter } from 'react-icons/fa';

import { Box, Container, Flex } from '@/components/shared/Grid';
import { Heading, Paragraph } from '@/components/shared/Text';

const FooterListItem = styled.li`
  display: inline;
  padding-right: 16px;
  @media only screen and (max-width: 600px) {
    display: block;
  }
`;

const scrollTop = () => {
  document.documentElement.scrollTop = 0;
  document.body.scrollTop = 0;
};

export function Footer() {
  return (
    <Flex w="100%" backgroundColor="blackAlpha.900" color="whiteAlpha.900">
      <Container p="64px 32px 64px 32px" w="100%">
        <Flex as="article" justifyContent="space-between" borderBottom="1px gray solid">
          <Heading as="h1" display={['none', 'initial']}>
            DEPT
          </Heading>
          <Box as="ul" p="0" listStyleType="none">
            <FooterListItem>WORK</FooterListItem>
            <FooterListItem>SERVICES</FooterListItem>
            <FooterListItem>STORIES</FooterListItem>
            <FooterListItem>ABOUT</FooterListItem>
            <FooterListItem>CAREERS</FooterListItem>
            <FooterListItem>CONTACT</FooterListItem>
          </Box>
          <ul>
            <FooterListItem>
              <FaFacebook />
            </FooterListItem>
            <FooterListItem>
              <FaTwitter />
            </FooterListItem>
            <FooterListItem>
              <FaInstagram />
            </FooterListItem>
          </ul>
        </Flex>
        <Flex
          as="article"
          alignItems={['start', 'center']}
          justifyContent="space-between"
          pt="24px"
          flexDirection={['column', 'row']}>
          <Box as="ul" p="0">
            <FooterListItem>Chambers of Commerce: 6346101</FooterListItem>
            <FooterListItem>VAT: NL 8552.47.501.801</FooterListItem>
            <FooterListItem>Term and conditions</FooterListItem>
          </Box>
          <Paragraph>2018 Dept Agency</Paragraph>
        </Flex>
      </Container>
      <Box
        as="button"
        fontSize="1rem"
        padding="0 32px 0 32px"
        color="blue"
        border="none"
        cursor="pointer"
        display={['none', 'initial']}
        onClick={scrollTop}>
        <FaLongArrowAltUp />
        <Paragraph>TOP</Paragraph>
      </Box>
    </Flex>
  );
}
