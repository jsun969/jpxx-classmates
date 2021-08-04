import Head from 'next/head';
import {
  Flex,
  Input,
  Stack,
  Textarea,
  RadioGroup,
  Radio,
  Select,
  InputGroup,
  InputRightAddon,
  InputLeftAddon,
  NumberInput,
  NumberInputField,
  Button,
  useToast,
} from '@chakra-ui/react';
import { useState } from 'react';
import dayjs from 'dayjs';
import server from '../lib/axios';
import GithubCorner from '../components/GithubCorner';

const years = Array.from({ length: dayjs().year() - 2020 + 1 }, (_, i: number) => 2020 + i).reverse();

export default function Add() {
  const [name, setName] = useState<string>('');
  const [gender, setGender] = useState<string>('');
  const [year, setYear] = useState<string>('');
  const [_class, _setClass] = useState<number>();
  const [school, setSchool] = useState<string>('');
  const [qq, setQQ] = useState<string>('');
  const [wechat, setWechat] = useState<string>('');
  const [content, setContent] = useState<string>('');

  const [loading, toggleLoading] = useState<boolean>(false);

  const toast = useToast();

  const handleSubmit = async () => {
    try {
      toggleLoading(true);
      const { status } = await server.post('/student', {
        name,
        gender: gender === 'girl',
        year: +year,
        class: _class,
        school,
        qq,
        wechat,
        content,
      });
      if (status === 201) {
        toast({
          title: '提交成功',
          description: '将在24小时内审核通过后展示',
          status: 'success',
        });
        toggleLoading(false);
      }
    } catch (error) {
      toast({
        title: '提交失败',
        description: '服务器错误',
        status: 'error',
      });
    }
  };

  return (
    <>
      <Head>
        <title>建西同学录 - 登记</title>
      </Head>
      <GithubCorner />
      <Flex alignItems="center" justifyContent="center" height="100vh">
        <Stack backgroundColor="gray.100" p={5} spacing={3}>
          <Input
            placeholder="姓名"
            maxLength={4}
            onChange={(event) => {
              setName(event.target.value);
            }}
          />
          <RadioGroup onChange={setGender} value={gender}>
            <Stack direction="row">
              <Radio value="girl" colorScheme="pink" id="girl" name="girl">
                女
              </Radio>
              <Radio value="boy" colorScheme="blue" id="boy" name="boy">
                男
              </Radio>
            </Stack>
          </RadioGroup>
          <Select
            placeholder="毕业年份"
            value={year}
            onChange={(event) => {
              setYear(event.target.value);
            }}
          >
            {years.map((year: number) => (
              <option value={`${year}`} key={year}>
                {year}届
              </option>
            ))}
          </Select>
          <InputGroup>
            <NumberInput>
              <NumberInputField
                placeholder="班级"
                maxLength={2}
                onChange={(event) => {
                  _setClass(+event.target.value);
                }}
              />
            </NumberInput>
            <InputRightAddon>班</InputRightAddon>
          </InputGroup>
          <Input
            placeholder="就读高中"
            maxLength={30}
            onChange={(event) => {
              setSchool(event.target.value);
            }}
          />
          <InputGroup>
            <InputLeftAddon>QQ</InputLeftAddon>
            <Input
              placeholder="QQ"
              maxLength={20}
              onChange={(event) => {
                setQQ(event.target.value);
              }}
            />
          </InputGroup>
          <InputGroup>
            <InputLeftAddon>微信</InputLeftAddon>
            <Input
              placeholder="微信"
              maxLength={50}
              onChange={(event) => {
                setWechat(event.target.value);
              }}
            />
          </InputGroup>
          <Textarea
            resize="none"
            placeholder="说点什么~"
            rows={5}
            maxLength={800}
            onChange={(event) => {
              setContent(event.target.value);
            }}
          />
          <Button
            isLoading={loading}
            loadingText="提交中"
            colorScheme="blue"
            onClick={handleSubmit}
            disabled={!name || !gender || !year || !_class || !school || loading}
          >
            登记
          </Button>
        </Stack>
      </Flex>
    </>
  );
}
