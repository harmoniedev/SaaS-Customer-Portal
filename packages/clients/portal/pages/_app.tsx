import type { AppProps } from 'next/app';
import { MsalProvider } from '@azure/msal-react';
import { msalInstance } from '../services/msal';
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
    <MsalProvider instance={msalInstance}>
      <Component {...pageProps} />
    </MsalProvider>
  );
}

export default MyApp;
