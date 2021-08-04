import Head from 'next/head';
import prisma from '../lib/prisma';
import { Flex, Input, Button, Stack, Heading, Table, Thead, Tbody, Tfoot, Tr, Th, Td, Switch } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import server from '../lib/axios';

type Student = {
  id: string;
  name: string;
  year: number;
  class: number;
  school: string;
  qq: string | null;
  wechat: string | null;
  content: string | null;
  status: boolean;
};

export async function getStaticProps() {
  const students: Student[] = await prisma.student.findMany({
    orderBy: { createdAt: 'desc' },
    select: {
      id: true,
      name: true,
      year: true,
      class: true,
      school: true,
      qq: true,
      wechat: true,
      content: true,
      status: true,
    },
  });
  return {
    props: {
      students,
    },
  };
}

export default function Admin({ students }: { students: Student[] }) {
  const [loginKey, setLoginKey] = useState<string>('');
  const [isLogin, setIsLogin] = useState<number>(0);
  const [statuses, setStatuses] = useState<boolean[]>(students.map(({ status }) => status));
  const [disableStatus, toggleDisableStatus] = useState<boolean>(false);

  useEffect(() => {
    (async () => {
      try {
        if (localStorage.getItem('adminKey')) {
          const { status } = await server.post('/auth', { key: localStorage.getItem('adminKey') });
          setIsLogin(status === 200 ? 2 : 1);
        } else {
          setIsLogin(1);
        }
      } catch {
        setIsLogin(1);
      }
    })();
  }, []);

  const handleLogin = async () => {
    try {
      setIsLogin(0);
      const { status } = await server.post('/auth', { key: loginKey });
      if (status === 200) {
        setIsLogin(2);
        localStorage.setItem('adminKey', loginKey);
      } else {
        setIsLogin(1);
      }
    } catch {
      setIsLogin(1);
    }
  };

  return (
    <>
      <Head>
        <title>建西同学录 - 后台</title>
      </Head>
      {
        [
          <main key={1}>
            <Flex alignItems="center" justifyContent="center" height="100vh">
              <Heading>Loading...</Heading>
            </Flex>
          </main>,
          <main key={2}>
            <Flex alignItems="center" justifyContent="center" height="100vh">
              <Stack backgroundColor="gray.100" p={5} spacing={3}>
                <Input
                  placeholder="管理员KEY"
                  value={loginKey}
                  onChange={(event) => {
                    setLoginKey(event.target.value);
                  }}
                />
                <Button colorScheme="blue" onClick={handleLogin}>
                  确定
                </Button>
              </Stack>
            </Flex>
          </main>,
          <main key={3}>
            <Table size="sm">
              <Thead>
                <Tr>
                  <Th>显示</Th>
                  <Th>姓名</Th>
                  <Th>班级</Th>
                  <Th>学校</Th>
                  <Th>QQ</Th>
                  <Th>微信</Th>
                  <Th>内容</Th>
                </Tr>
              </Thead>
              <Tbody>
                {students.map((student, index) => (
                  <Tr key={student.id}>
                    <Td>
                      <Switch
                        isDisabled={disableStatus}
                        isChecked={statuses[index]}
                        onChange={async () => {
                          try {
                            toggleDisableStatus(true);
                            const { status: reqStatus } = await server.patch(
                              '/status',
                              {
                                id: student.id,
                                status: !statuses[index],
                              },
                              { headers: { 'admin-key': localStorage.getItem('adminKey') } }
                            );
                            if (reqStatus === 200) {
                              setStatuses(statuses.map((status, i) => (i === index ? !statuses[index] : status)));
                              toggleDisableStatus(false);
                            } else {
                              toggleDisableStatus(false);
                            }
                          } catch {
                            toggleDisableStatus(false);
                          }
                        }}
                      />
                    </Td>
                    <Td>{student.name}</Td>
                    <Td>
                      {student.year} / {student.class}
                    </Td>
                    <Td>{student.school}</Td>
                    <Td>{student.qq}</Td>
                    <Td>{student.wechat}</Td>
                    <Td>{student.content}</Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </main>,
        ][isLogin]
      }
    </>
  );
}
