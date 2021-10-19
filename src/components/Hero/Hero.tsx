import styled from '@emotion/styled';

import { Heading } from '@/components/shared/Text';

import heroImage from '../../../public/images/florensis.png';
import { Button } from '../shared/Button';
import { Box, Flex } from '../shared/Grid';

const HeroSection = styled.section`
  width: 100%;
  height: 97vh;
  margin-top: 16px;
  background-size: cover;
  background-image: url(${heroImage.src});
`;

const HeroArticle = styled.article`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 90%;
  padding-left: 10px;
  @media only screen and (max-width: 640px) {
    justify-content: center;
    padding-left: 0;
  }
`;

export function Hero() {
  return (
    <>
      <HeroSection>
        <Box maxWidth="800px" m="0 auto" h="90%">
          <HeroArticle>
            <Heading as="h1" fontSize={['4rem', '8rem']}>
              WORK
            </Heading>
          </HeroArticle>
          <Flex justify={['center', 'end']} pr="10px">
            <Button>VIEW CASE</Button>
          </Flex>
        </Box>
      </HeroSection>
    </>
  );
}
