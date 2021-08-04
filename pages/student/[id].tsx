import { Table, Tbody, Tr, Td, Box, Text, Heading } from '@chakra-ui/react';
import { GetServerSidePropsContext } from 'next';
import prisma from '../../lib/prisma';
import Head from 'next/head';
import GithubCorner from '../../components/GithubCorner';

type StudentInfo = {
  name: string;
  gender: boolean;
  year: number;
  class: number;
  school: string;
  qq: string | null;
  wechat: string | null;
  content: string | null;
};

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const student: StudentInfo | null = await prisma.student.findFirst({
    where: { id: context.params?.id as string, status: true },
    select: {
      name: true,
      gender: true,
      year: true,
      class: true,
      school: true,
      qq: true,
      wechat: true,
      content: true,
    },
  });
  return {
    props: {
      student,
    },
  };
}

export default function StudentInfo({ student }: { student: StudentInfo | null }) {
  return (
    <>
      <Head>
        <title>建西同学录 - {student ? student?.name : '查询中...'}</title>
      </Head>
      <GithubCorner />
      <Box m={8}>
        {student ? (
          <>
            <Table>
              <Tbody>
                <Tr>
                  <Td>姓名</Td>
                  <Td isNumeric>{student?.name}</Td>
                </Tr>
                <Tr>
                  <Td>性别</Td>
                  <Td isNumeric>{student?.gender ? '女' : '男'}</Td>
                </Tr>
                <Tr>
                  <Td>毕业年份</Td>
                  <Td isNumeric>{student?.year}</Td>
                </Tr>
                <Tr>
                  <Td>班级</Td>
                  <Td isNumeric>{student?.class}</Td>
                </Tr>
                <Tr>
                  <Td>就读高中</Td>
                  <Td isNumeric>{student?.school}</Td>
                </Tr>
                {student?.qq ? (
                  <Tr>
                    <Td>QQ</Td>
                    <Td isNumeric>{student?.qq}</Td>
                  </Tr>
                ) : (
                  <Tr></Tr>
                )}
                {student?.wechat ? (
                  <Tr>
                    <Td>微信</Td>
                    <Td isNumeric>{student?.wechat}</Td>
                  </Tr>
                ) : (
                  <Tr></Tr>
                )}
              </Tbody>
            </Table>
            {student?.content && (
              <Text mt={5} as="pre">
                {student?.content}
              </Text>
            )}
          </>
        ) : (
          <Heading textAlign="center">查询中...</Heading>
        )}
      </Box>
    </>
  );
}
