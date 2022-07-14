import type { AppProps } from 'next/app';
import React, { useEffect, useState } from 'react';
import 'tailwindcss/tailwind.css';

import '../styles/styles.css';

function MyApp({ Component, pageProps }: AppProps) {
  const [showChild, setShowChild] = useState(false);
  useEffect(() => {
    setShowChild(true);
  }, []);

  if (!showChild) {
    return null;
  }

  if (typeof window === 'undefined') {
    return <></>;
  }
  return (
    <Component {...pageProps} />
  );
}

export default MyApp;
