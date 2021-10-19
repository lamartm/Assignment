import { Box, Flex } from '../../../shared/Grid';
import { Paragraph } from '../../../shared/Text';

export interface FilterProps {
  selected: string;
  filterValue: any;
}

export function Filter(props: FilterProps) {
  const filterResponse = (event: any) => {
    props.filterValue(event.target.value);
  };

  return (
    <Flex justifyContent="end" pt="44px">
      <Paragraph display="initial" pr="10px" fontSize="1.2rem" color="gray.400">
        Show me
      </Paragraph>
      <Box
        as="select"
        border="none"
        borderBottom="black 1.5px solid"
        value={props.selected}
        onChange={filterResponse}>
        <option value="all">all work</option>
        <option value="Culture">culture</option>
        <option value="E-Commerce">e-commerce</option>
        <option value="Banking">banking</option>
        <option value="Traveling">traveling</option>
      </Box>
    </Flex>
  );
}
