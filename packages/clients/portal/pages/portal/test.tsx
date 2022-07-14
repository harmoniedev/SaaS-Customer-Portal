import { useRouter } from "next/router";
import { useEffect } from "react";

///change please redirect url to http://localhost:3000 in your azure app, so we don't need this page
export default function Page() {
  const router = useRouter()
  useEffect(() => {
    if (!router.query.code) return
    router.push(`/?code=${router.query.code}`)
  }, [router.query])
  return (
      <p>test</p>
  );
}
