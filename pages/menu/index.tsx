import { useEffect } from 'react';

import { useRouter } from 'next/router';

const MenuIndexPage = () => {
  const router = useRouter();

  useEffect(() => {
    router.replace('/menu/problems');
  }, []);

  return null;
};

export default MenuIndexPage;
