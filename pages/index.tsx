import router from "next/router";
import { useEffect } from "react";

export default function Index() {
  useEffect(() => {
    router.replace('/menu');
  }, []);

  return null; // Render nothing
}
