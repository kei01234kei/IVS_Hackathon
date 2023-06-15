import { useEffect } from 'react';

import router from 'next/router';

export default function Index() {
  useEffect(() => {
    router.replace('/menu');
  }, []);

  return null; // Render nothing
}
