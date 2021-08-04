import Head from 'next/head';
import { Input, Heading, Center, Alert, AlertIcon, Text, Stack } from '@chakra-ui/react';
import NextLink from 'next/link';
import StudentCard from '../components/StudentCard';
import prisma from '../lib/prisma';
import { useState } from 'react';
import GithubCorner from '../components/GithubCorner';

type StudentBase = { id: string; name: string; gender: boolean; year: number; class: number; school: string };

export async function getStaticProps() {
  const studentsTotal: StudentBase[] = await prisma.student.findMany({
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
      studentsTotal,
    },
  };
}

export default function Home({ studentsTotal }: { studentsTotal: StudentBase[] }) {
  const [students, setStudents] = useState<StudentBase[]>(studentsTotal);

  return (
    <>
      <Head>
        <title>建西同学录</title>
      </Head>
      <GithubCorner />
      <main>
        <Stack backgroundColor="gray.100" p={5} spacing={3} pos="sticky" top={0} zIndex={233}>
          <Center>
            <Heading my={3} size="lg">
              建平西校同学录
            </Heading>
          </Center>
          <Alert status="warning" my={3}>
            <AlertIcon />
            如遇问题, 请联系QQ1351083056
          </Alert>
          <Alert status="info" my={3}>
            <AlertIcon />
            没有你的信息?
            <Text color="teal.500">
              <NextLink href="/add">点此登记</NextLink>
            </Text>
          </Alert>
          <Input
            placeholder="搜索 (姓名/学校/xx届xx班)"
            onChange={(event) => {
              setStudents(
                studentsTotal.filter(
                  ({ name, school, year, class: _class }) =>
                    name.includes(event.target.value) ||
                    school.includes(event.target.value) ||
                    `${year}届${_class}班`.includes(event.target.value)
                )
              );
            }}
          />
        </Stack>
        {students.map(({ id, name, gender, year, school, class: _class }) => (
          <StudentCard key={id} id={id} name={name} gender={gender} year={year} school={school} _class={_class} />
        ))}
      </main>
    </>
  );
}
