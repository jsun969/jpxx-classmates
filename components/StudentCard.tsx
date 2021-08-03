import { Box, Heading, Text, Flex, Spacer } from '@chakra-ui/react';
import NextLink from 'next/link';

export default function StudentCard({
  id,
  name,
  gender,
  year,
  _class,
  school,
}: {
  id: string;
  name: string;
  gender: boolean;
  year: number;
  _class: number;
  school: string;
}) {
  return (
    <Box as="article" p={5} borderWidth="2px" rounded="md" m={5} boxShadow="lg" borderColor={gender ? 'pink.50' : 'blue.50'}>
      <Heading>{name}</Heading>
      <Text>{school}</Text>
      <Flex mt={3}>
        <Text color="cyan.500">
          <NextLink href={`/student/${id}`}>查看更多</NextLink>
        </Text>
        <Spacer />
        <Text color="gray.400">
          {year}届{_class}班
        </Text>
      </Flex>
    </Box>
  );
}
