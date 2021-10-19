import styled from '@emotion/styled';

import { Image } from '@/components/shared/Image';

import { Box } from '../../../shared/Grid';
import { Heading, Paragraph } from '../../../shared/Text';

export interface CaseProps {
  link: string;
  imgAlt: string;
  title: string;
  content: string;
  key: string;
  type: string;
}

const CaseArticle = styled.article`
  width: 50%;
  padding: 0 16px 48px 16px;
  align-self: baseline;

  &:hover {
    img {
      transition: transform 0.3s ease-in-out;
      transform: scale(0.95, 0.95);
    }
    div p {
      transition: transform 0.3s ease-in-out;
      transform: translateX(8px);
    }
  }

  @media only screen and (max-width: 600px) {
    width: 100%;
  }
`;

export function Case(props: CaseProps) {
  return (
    <>
      <CaseArticle>
        <a href={props.link}>
          <Image src="images/sky.jpeg" alt={props.imgAlt}></Image>
          <Heading color="gray.200" m="8px 0 8px 0" pt="20px" as="h4">
            {props.title}
          </Heading>
          <Paragraph>
            <b>{props.content}</b>
          </Paragraph>
          <Box>
            <Paragraph as="small">VIEW CASE</Paragraph>
          </Box>
        </a>
      </CaseArticle>
    </>
  );
}
