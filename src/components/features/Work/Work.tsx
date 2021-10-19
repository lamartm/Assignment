import styled from '@emotion/styled';
import { useState } from 'react';

import { Case } from '@/components/features/Work/Case';
import { Filter } from '@/components/features/Work/Filter';
import { Button } from '@/components/shared/Button';
import { Heading, Paragraph } from '@/components/shared/Text';

import { Box, Flex } from '../../shared/Grid';

export interface WorkProps {
  work: Case[];
  sideArticles: Case[];
}

interface Case {
  id: string;
  title: string;
  content: string;
  link: string;
  imgAlt?: string;
  type: string;
}

const AllWork = styled.div<{ flexDirection: string }>`
  display: flex;
  flex-wrap: wrap;
  padding-top: 60px;
  align-content: center;
  flex-direction: ${props => props.flexDirection};
`;

export function Work(props: WorkProps) {
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [layout, setLayout] = useState(false);

  const FlexDirection = layout === true ? 'column' : 'row';
  const sideArticleVisibility = selectedFilter === 'all' ? 'flex' : 'none';
  const getFilterValue = (d: string) => {
    setSelectedFilter(d);
  };

  const cases = props.work.map((d: Case) => {
    return (
      <Case
        key={d.id}
        title={d.title}
        content={d.content}
        link={d.link}
        imgAlt={d.imgAlt}
        type={d.type}
        img="images/sky.jpeg"
      />
    );
  });

  const sideArticles = props.sideArticles.map((d: Case) => {
    return (
      <Case
        width="100%"
        imgWidth="0%"
        key={d.id}
        title={d.title}
        content={d.content}
        link={d.link}
        type={d.type}
      />
    );
  });

  const florensis = (
    <Case
      width="60%"
      key="o1"
      title="FLORENSIS"
      content="Rethinking the entire online ecosystem"
      link="https://www.florensis.com/nl-nl/"
      imgAlt="Florensis"
      type="E-Commerce"
      img="images/sky.jpeg"
    />
  );

  const selectedCases = cases.filter(d =>
    selectedFilter === 'all' ? d : d.props.type === selectedFilter,
  );
  return (
    <section>
      <Flex justifyContent="space-between" alignItems="flex-end">
        <Button
          sx={{ background: 'black', borderRadius: '0px' }}
          onClick={() => {
            setLayout(prevState => !prevState);
          }}>
          CHANGE LAYOUT
        </Button>
        <Filter selected={selectedFilter} filterValue={getFilterValue} />
      </Flex>
      <AllWork flexDirection={FlexDirection}>
        {selectedCases.slice(0, 4)}
        <Flex display={sideArticleVisibility} flexDirection={['column', 'row']}>
          {florensis}
          <Flex width={['100%', '40%']} flexDirection="column">
            {sideArticles.slice(0, 2)}
          </Flex>
        </Flex>
        {selectedCases.slice(4, 6)}
        <Flex display={sideArticleVisibility} flexDirection={['column', 'row']}>
          <Flex width={['100%', '40%']} flexDirection="column">
            {sideArticles.slice(2, 4)}
          </Flex>
          {florensis}
        </Flex>
        {selectedCases.slice(6, 10)}
        <Box
          as="article"
          maxW={['100%', '60%']}
          margin="0 auto"
          textAlign="center"
          p="50px 0 120px 0">
          <Heading as="h3" pb="20px">
            “Dept helped us tell our story through a bold new identity and a robust online
            experience. To the tune of 60% growth in online bookings in just one month.”
          </Heading>
          <Paragraph>MATTIJS TEN BRINK – CEO, TRANSAVIA</Paragraph>
        </Box>
        {selectedCases.slice(10, 12)}
      </AllWork>
    </section>
  );
}
