import { useState } from 'react';

import { Case } from '@/components/features/Work/Case';
import { Filter } from '@/components/features/Work/Filter';

import { Flex } from '../../shared/Grid';

export interface WorkProps {
  data: Case[];
}

interface Case {
  id: string;
  title: string;
  content: string;
  link: string;
  imgAlt: string;
  type: string;
}

export function Work(props: WorkProps) {
  const [selectedFilter, setSelectedFilter] = useState('all');

  const getFilterValue = (d: string) => {
    setSelectedFilter(d);
  };

  const cases = props.data.map((d: Case) => {
    return (
      <Case
        key={d.id}
        title={d.title}
        content={d.content}
        link={d.link}
        imgAlt={d.imgAlt}
        type={d.type}
      />
    );
  });

  const selectedCases = cases.filter(d =>
    selectedFilter === 'all' ? d : d.props.type === selectedFilter,
  );
  return (
    <section>
      <Filter selected={selectedFilter} filterValue={getFilterValue} />
      <Flex flexWrap="wrap" pt="60px">
        {selectedCases}
      </Flex>
    </section>
  );
}
