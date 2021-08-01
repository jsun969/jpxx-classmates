import Head from 'next/head';
import { Input, Heading, Flex, Center, Alert, AlertIcon, Text } from '@chakra-ui/react';
import NextLink from 'next/link';

export default function Home() {
  return (
    <>
      <Head>
        <title>同学录</title>
        <meta name="description" content="建平西校同学录" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <Flex backgroundColor="gray.100" direction="column" p={3} style={{ position: 'sticky', top: 0 }}>
          <Center>
            <Heading my={3}>同学录</Heading>
          </Center>
          <Input placeholder="搜索 (姓名/学校)" />
          <Alert status="info" my={3}>
            <AlertIcon />
            没有你的信息?
            <Text color="teal.500">
              <NextLink href="/add">点此添加</NextLink>
            </Text>
          </Alert>
        </Flex>
      </main>
      <footer></footer>
    </>
  );
}
