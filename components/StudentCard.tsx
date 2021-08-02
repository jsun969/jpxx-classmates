import { LinkBox, Heading, Text } from '@chakra-ui/react';

export default function StudentCard({
  key,
  name,
  gender,
  year,
  _class,
  school,
}: {
  key: string;
  name: string;
  gender: boolean;
  year: number;
  _class: number;
  school: string;
}) {
  return (
    <LinkBox
      as="article"
      p={5}
      borderWidth="2px"
      rounded="md"
      m={5}
      boxShadow="lg"
      borderColor={gender ? 'pink.50' : 'blue.50'}
    >
      <Heading>{name}</Heading>
      <Text>{school}</Text>
      <Text align="end" color="gray.400">
        {year}届{_class}班
      </Text>
    </LinkBox>
  );
}
