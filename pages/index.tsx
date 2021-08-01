import Head from 'next/head';
import { Input, Heading, Flex, Center, Alert, AlertIcon, Text, Stack } from '@chakra-ui/react';
import NextLink from 'next/link';

export default function Home() {
  return (
    <>
      <Head>
        <title>建西同学录</title>
      </Head>
      <main>
        <Stack backgroundColor="gray.100" p={5} spacing={3} style={{ position: 'sticky', top: 0 }}>
          <Center>
            <Heading my={3} size="lg">
              建平西校同学录
            </Heading>
          </Center>
          <Alert status="info" my={3}>
            <AlertIcon />
            没有你的信息?
            <Text color="teal.500">
              <NextLink href="/add">点此登记</NextLink>
            </Text>
          </Alert>
          <Input placeholder="搜索 (姓名/学校)" />
        </Stack>
      </main>
      <footer></footer>
    </>
  );
}
