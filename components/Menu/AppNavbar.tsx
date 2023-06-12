import { useSupabaseClient } from '@supabase/auth-helpers-react';
import {
  IconFileCheck,
  IconFilePencil,
  IconInfoSquare,
  IconList,
  IconSquareLetterP,
} from '@tabler/icons-react';
import { useState } from 'react';

import { useRouter } from 'next/router';

import { useLoginUser } from '@/services/hooks/loginUser';

import {
  Group,
  Navbar,
  Text,
  createStyles,
  getStylesRef,
  rem,
} from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';

const useStyles = createStyles((theme) => ({
  header: {
    paddingBottom: theme.spacing.md,
    marginBottom: `calc(${theme.spacing.md} * 1.5)`,
    borderBottom: `${rem(1)} solid ${
      theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[2]
    }`,
  },

  footer: {
    paddingTop: theme.spacing.md,
    marginTop: theme.spacing.md,
    borderTop: `${rem(1)} solid ${
      theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[2]
    }`,
  },

  link: {
    ...theme.fn.focusStyles(),
    display: 'flex',
    alignItems: 'center',
    textDecoration: 'none',
    fontSize: theme.fontSizes.sm,
    color:
      theme.colorScheme === 'dark'
        ? theme.colors.dark[1]
        : theme.colors.gray[7],
    padding: `${theme.spacing.xs} ${theme.spacing.sm}`,
    borderRadius: theme.radius.sm,
    fontWeight: 500,

    '&:hover': {
      backgroundColor:
        theme.colorScheme === 'dark'
          ? theme.colors.dark[6]
          : theme.colors.gray[0],
      color: theme.colorScheme === 'dark' ? theme.white : theme.black,

      [`& .${getStylesRef('icon')}`]: {
        color: theme.colorScheme === 'dark' ? theme.white : theme.black,
      },
    },
  },

  linkIcon: {
    ref: getStylesRef('icon'),
    color:
      theme.colorScheme === 'dark'
        ? theme.colors.dark[2]
        : theme.colors.gray[6],
    marginRight: theme.spacing.sm,
  },

  linkActive: {
    '&, &:hover': {
      backgroundColor: theme.fn.variant({
        variant: 'light',
        color: theme.primaryColor,
      }).background,
      color: theme.fn.variant({ variant: 'light', color: theme.primaryColor })
        .color,
      [`& .${getStylesRef('icon')}`]: {
        color: theme.fn.variant({ variant: 'light', color: theme.primaryColor })
          .color,
      },
    },
  },
}));

const competitions = [
  { link: '/menu/problems', label: '問題', icon: IconFilePencil },
  { link: '/menu/ranking', label: '順位', icon: IconList },
  { link: '/menu/submits', label: '提出結果', icon: IconFileCheck },
];

const abouts = [
  { link: '/menu/about', label: 'Prompthonとは', icon: IconInfoSquare },
];

interface AppNavbarProps {
  drawer?: boolean;
}

export default function AppNavbar(props: AppNavbarProps) {
  const { classes, cx } = useStyles();
  const [active, setActive] = useState('Billing');
  const router = useRouter();
  const supabaseClient = useSupabaseClient();
  const onClickLogout = () => {
    supabaseClient.auth.signOut().then(() => {
      router.push('/');
    });
  };
  const largeScreen = useMediaQuery('(min-width: 48em)');
  const { userSettings } = useLoginUser();

  const competitionNav = competitions.map((item) => (
    <a
      className={cx(classes.link, {
        [classes.linkActive]: item.label === active,
      })}
      href={item.link}
      key={item.label}
      onClick={(event) => {
        event.preventDefault();
        setActive(item.label);
        router.push(item.link);
      }}
    >
      <item.icon className={classes.linkIcon} stroke={1.5} />
      <span>{item.label}</span>
    </a>
  ));

  const aboutsNav = abouts.map((item) => (
    <a
      className={cx(classes.link, {
        [classes.linkActive]: item.label === active,
      })}
      href={item.link}
      key={item.label}
      onClick={(event) => {
        event.preventDefault();
        setActive(item.label);
        router.push(item.link);
      }}
    >
      <item.icon className={classes.linkIcon} stroke={1.5} />
      <span>{item.label}</span>
    </a>
  ));

  return (
    <>
      {(largeScreen || (!largeScreen && props.drawer)) && (
        <Navbar
          height={'100vh'}
          width={!props.drawer ? { base: 300 } : undefined}
          p="md"
        >
          <Navbar.Section grow>
            <Group className={classes.header}>
              <IconSquareLetterP />
              <Text sx={{ fontWeight: 700 }}>Prompthon</Text>
            </Group>
            <Text size="xs" weight={500} color="dimmed">
              コンペティション
            </Text>
            {competitionNav}
            <Text size="xs" weight={500} color="dimmed">
              Prompthon
            </Text>
            {aboutsNav}
          </Navbar.Section>
          {/* 
          <Navbar.Section className={classes.footer}>
            <a href="#" className={classes.link} onClick={onClickLogout}>
              <IconLogout className={classes.linkIcon} stroke={1.5} />
              <span>Logout</span>
            </a>
          </Navbar.Section> */}
        </Navbar>
      )}
    </>
  );
}
