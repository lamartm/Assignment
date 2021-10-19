import styled from '@emotion/styled';
import { FaCaretRight } from 'react-icons/fa';

import { Image } from '@/components/shared/Image';

import { Box, Flex } from '../../../shared/Grid';
import { Heading, Paragraph } from '../../../shared/Text';

export interface CaseProps {
  link: string;
  imgAlt?: string;
  title: string;
  content: string;
  key: string;
  type: string;
  img?: string;
  imgWidth?: string;
  width?: string;
}

const CaseArticle = styled.article<{ articleWidth: string }>`
  width: ${props => props.articleWidth || '50%'};
  padding: 0 16px 48px 16px;
  align-self: center;

  &:hover {
    img {
      transition: transform 0.3s ease-in-out;
      transform: scale(0.95, 0.95);
    }
  }

  @media only screen and (max-width: 600px) {
    width: 100%;
  }
`;

export function Case(props: CaseProps) {
  return (
    <>
      <CaseArticle articleWidth={props.width!}>
        <a href={props.link}>
          <Image src={props.img} alt={props.imgAlt!} width={props.imgWidth}></Image>
          <Heading color="gray.200" m="8px 0 8px 0" pt="20px" as="h4">
            {props.title}
          </Heading>
          <Paragraph>
            <b>{props.content}</b>
          </Paragraph>
          <Box>
            <Paragraph as="small">
              <Flex
                alignItems="center"
                color="blue"
                transition="transform .3s ease"
                _hover={{ transform: 'translateX(10px)' }}>
                <FaCaretRight />
                VIEW CASE
              </Flex>
            </Paragraph>
          </Box>
        </a>
      </CaseArticle>
    </>
  );
}
