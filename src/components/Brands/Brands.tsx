import { Box, Flex } from '../shared/Grid';
import { Heading } from '../shared/Text';

export function Brands() {
  const dummyBrands = [
    {
      link: 'images/zalando.svg',
      alt: 'Zalando',
      id: '1',
    },
    {
      link: 'images/nivea.svg',
      alt: 'Niveau',
      id: '2',
    },
    {
      link: 'images/transavia.svg',
      alt: 'Transavia',
      id: '3',
    },
    {
      link: 'images/mona.svg',
      alt: 'mona',
      id: '4',
    },
  ];

  const logo = dummyBrands.map(d => {
    return (
      <Box
        as="img"
        w={['35%', '10vw']}
        h="auto"
        pt={['50px', '0']}
        key={d.id}
        src={d.link}
        alt={d.alt}></Box>
    );
  });

  return (
    <Box as="section" p="76px 0 100px 0">
      <article>
        <Heading textAlign="center" as="h1" pb="20px">
          CLIENTS
        </Heading>
        <Box
          as="p"
          maxW="60ch"
          p={['0 16px 0px 16px', '0 16px 80px 16px']}
          m="0 auto"
          textAlign="center">
          We value a great working relationship with our clients above else. It&#39;s why they often
          come to our parties. It&#39;s also why we&#39;re able to challenge and inspire them to
          reach for the stars.
        </Box>
        <Flex wrap={['wrap', 'nowrap']} justifyContent="space-around">
          {logo}
        </Flex>
      </article>
    </Box>
  );
}
