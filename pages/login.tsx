import { useEffect } from 'react';

import { GetServerSideProps } from 'next';

import { useLoginUser } from '@/services/hooks/loginUser';

import { LoginPaper } from '@/components/Login/LoginPaper';

import { createStyles, rem } from '@mantine/core';
import { createServerSupabaseClient } from '@supabase/auth-helpers-nextjs';

const useStyles = createStyles((theme) => ({
  wrapper: {
    minHeight: rem(900),
    backgroundSize: 'cover',
    backgroundImage:
      'url(https://images.unsplash.com/photo-1484242857719-4b9144542727?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1280&q=80)',
  },
}));

export default function Login() {
  const { classes } = useStyles();

  return (
    <div className={classes.wrapper}>
      <LoginPaper />
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const supabase = createServerSupabaseClient(context);
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (user)
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  return {
    props: {},
  };
};
