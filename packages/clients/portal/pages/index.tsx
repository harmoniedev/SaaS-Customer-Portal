import { useMsal } from '@azure/msal-react';
import { useIsAuthenticated } from '@azure/msal-react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { Button } from '../components/buttons/Button';
import { Title } from '../components/title/Title';
import { Spinner } from '../components/loaders/Spinner';
import { Icon } from '../components/icons/Icon';
import { NavMemo as Nav } from '../layout/Nav/Nav';

export default function Page() {
  const { instance, inProgress } = useMsal();
  const router = useRouter();
  const isAuthenticated = useIsAuthenticated();

  useEffect(() => {
    if (isAuthenticated && inProgress === 'none') {
      debugger;
      router.push('/portal/dashboard');
    }
  });

  if (inProgress !== 'none') {
    return (
      <div className="w-24 h-24 m-auto mt-24">
        <Spinner />
      </div>
    );
  }

  if (isAuthenticated) return null;

  return (
    <div className="h-screen overflow-hidden grid grid-rows-[62px_1fr_96px] lg:grid-rows-[92px_1fr_105px]">
      <Head>
        <title>harmon.ie Login</title>
      </Head>
      <Nav showUserMenu={false} />
      <div className="flex flex-col gap-6 justify-center items-center px-4 mx-auto w-11/12 md:w-3/6 xl:w-4/12 md:max-w-md">
        <div>
          <Icon name="HarmonieIcon" className="w-12 h-12" />
        </div>
        <Title size="lg" className="text-indigo-500 text-center font-extrabold">
          Sign in to the harmon.ie Customer Portal{' '}
        </Title>
        <Button
          label="Sign in with Microsoft"
          onClick={() => instance.loginRedirect()}
          theme="white"
          icon="MicrosoftIcon"
          iconPosition="before"
          as="button"
          stretch
        />
      </div>
      <div className="flex justify-center items-center bg-gray-50 border-t">
        <p className="text-indigo-200">© harmon.ie 2022</p>
      </div>
    </div>
  );
}
