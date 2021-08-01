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
} from '@chakra-ui/react';
import { useState } from 'react';
import dayjs from 'dayjs';

export default function Add() {
  const [year, setYear] = useState<string>('');
  const [gender, setGender] = useState<string>('');

  return (
    <>
      <Head>
        <title>建西同学录 - 登记</title>
      </Head>
      <Flex alignItems="center" justifyContent="center" height="100vh">
        <Stack backgroundColor="gray.100" p={5} spacing={3}>
          <Input placeholder="姓名" maxLength={4} />
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
            {Array.from({ length: dayjs().year() - 2020 + 1 }, (_, i: number) => 2020 + i)
              .reverse()
              .map((year: number) => (
                <option value={`${year}`} key={year}>
                  {year}届
                </option>
              ))}
          </Select>
          <InputGroup>
            <NumberInput>
              <NumberInputField placeholder="班级" maxLength={2} />
            </NumberInput>
            <InputRightAddon>班</InputRightAddon>
          </InputGroup>
          <Input placeholder="就读高中" maxLength={30} />
          <InputGroup>
            <InputLeftAddon>QQ</InputLeftAddon>
            <Input placeholder="QQ" maxLength={20} />
          </InputGroup>
          <InputGroup>
            <InputLeftAddon>微信</InputLeftAddon>
            <Input placeholder="微信" maxLength={50} />
          </InputGroup>
          <Textarea resize="none" placeholder="对大家说" rows={5} maxLength={800} />
          <Button colorScheme="blue">登记</Button>
        </Stack>
      </Flex>
    </>
  );
}
