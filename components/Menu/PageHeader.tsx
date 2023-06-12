import { IconMenu2 } from '@tabler/icons-react';
import { useEffect, useState } from 'react';

import { useInterval } from '@/hooks/useInterval';

import AppNavbar from './AppNavbar';

import { ClientFactory } from '@/lib/clientFactory';
import {
  Box,
  Divider,
  Drawer,
  Flex,
  Group,
  Text,
  Title,
  createStyles,
  rem,
} from '@mantine/core';
import { useDisclosure, useMediaQuery } from '@mantine/hooks';

const useStyles = createStyles((theme) => ({
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    height: rem(30),
  },
}));

interface PageHeaderProps {
  label: string;
}

export const PageHeader = ({ label }: PageHeaderProps) => {
  const { classes, cx } = useStyles();
  const largeScreen = useMediaQuery('(min-width: 48em)');
  const [opened, { open, close }] = useDisclosure(false);
  const [endTime, setEndTime] = useState<Date | null>(null);
  const [startTime, setStartTime] = useState<Date | null>(null);
  const [countdown, setCountdown] = useState<string>('');
  const prompthonClient = ClientFactory.getPrompthonClient();

  // APIから終了時刻を取得する関数
  const fetchEndTime = async () => {
    prompthonClient.getCompetition(1).then((competition) => {
      setEndTime(new Date(competition.end_date));
      setStartTime(new Date(competition.start_date));
    });
  };

  const calculateCountdown = () => {
    if (!endTime) {
      return;
    }

    const now = new Date();
    if (now < startTime!) {
      setCountdown('開始前です');
      return;
    }
    const distance = endTime.getTime() - now.getTime();

    if (distance < 0) {
      setCountdown('終了しました');
      return;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor(
      (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
    );
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    if (distance < 60 * 60 * 1000) {
      // 残り1時間未満
      setCountdown(`終了まで残り${minutes}分${seconds}秒`);
    } else {
      // 残り1時間以上
      setCountdown(`終了まで残り${days}日${hours}時間${minutes}分`);
    }
  };

  // コンポーネントがマウントされたときAPIを叩く
  useEffect(() => {
    fetchEndTime();
  }, []);

  // 1秒ごとにカウントダウンを更新する
  useInterval(calculateCountdown, 1000);

  return (
    <>
      <Box className={classes.header}>
        {largeScreen ? (
          <Title order={4} ml={'lg'}>
            {label}
          </Title>
        ) : (
          <Flex>
            <IconMenu2 onClick={open} />
            <Drawer
              opened={opened}
              onClose={close}
              withCloseButton={false}
              size="50%"
            >
              <AppNavbar drawer={true} />
            </Drawer>
            <Title order={4} ml={'lg'}>
              {label}
            </Title>
          </Flex>
        )}
        <Group spacing={20} mr={'lg'}>
          <Text weight={700} color="gray">
            {countdown}
          </Text>
        </Group>
      </Box>
      <Divider my="sm" />
    </>
  );
};
