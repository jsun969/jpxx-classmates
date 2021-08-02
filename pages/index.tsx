import Head from 'next/head';
import { Input, Heading, Center, Alert, AlertIcon, Text, Stack } from '@chakra-ui/react';
import NextLink from 'next/link';
import StudentCard from '../components/StudentCard';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

type StudentBase = { id: string; name: string; gender: boolean; year: number; class: number; school: string };

export async function getStaticProps() {
  const students: StudentBase[] = await prisma.student.findMany({
    where: { status: true },
    orderBy: { createdAt: 'desc' },
    select: {
      id: true,
      name: true,
      gender: true,
      year: true,
      class: true,
      school: true,
    },
  });
  return {
    props: {
      students,
    },
  };
}

export default function Home({ students }: { students: StudentBase[] }) {
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
        {students.map(({ id, name, gender, year, school, class: _class }) => (
          <StudentCard key={id} name={name} gender={gender} year={year} school={school} _class={_class} />
        ))}
      </main>
    </>
  );
}
