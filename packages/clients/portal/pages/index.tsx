import Cookies from 'js-cookie';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { Button } from '../components/buttons/Button';
import { Title } from '../components/title/Title';
import { Spinner } from '../components/loaders/Spinner';
import { Icon } from '../components/icons/Icon';
import { NavMemo as Nav } from '../layout/Nav/Nav';
import { InputMemo } from '../components/input/Input';
import hash from 'object-hash';

export default function Page() {
  const router = useRouter();
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const token = Cookies.get('download-token');
  const msToken = Cookies.get('ms-token');

  const getTokenFromMsCode = async ({ code }) => {
    setIsLoading(true);
    // uncomment that and send this code to your api where you will recieve that jwt
    // const res = await fetch('');
    // const body = await res.json();
    // const { jwt } = body;
    const jwt = 'eyJhbGciOiJFUzUxMiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2NTc4NzUzMDgsImh0dHA6Ly9saWNlbnNlLW1hbmFnZXIuaGFybW9uLmllL2FsbC9yZWFkP2RvbWFpbnM9Ijp0cnVlLCJwcm92aWRlciI6Im1pY3Jvc29mdCIsInVpZCI6IjhhMGRmMjUzLTNhM2YtNDQwOC05Y2IxLTdmZjhlNWE0NTNmZiIsInVzZXJuYW1lIjoiYW1pdGFpYkBoYXJtb24uaWUifQ.AbLAOHun6JHOn0qLtwUxDsfmIYOqfGxcFPv752ngERbAubD2FMAVgCWablTCs2dXy-47_hcykhqhN10LjmkkWexAAABafBFFJTylPFHoYiA2jVHg_YYyXE8tCZVaYiiCYCvQO7QeUqJHhLGlCbgfu2aUGbM7jBPISoADb_U1tppJgyhw'
    if (jwt) {
      Cookies.set('ms-token', jwt);
      router.push('/portal/dashboard');
    }
    setIsLoading(false)
  }

  useEffect(() => {
    if (router.query.code) {
      getTokenFromMsCode({ code: router.query.code })
    }
  }, [router.query])

  useEffect(() => {
    if ((msToken || token) && ! isLoading) {
      router.push('/portal/dashboard');
    }
  });

  if (isLoading) {
    return (
      <div className="w-24 h-24 m-auto mt-24">
        <Spinner />
      </div>
    );
  }

  const onSubmit = async (ev) => {
    ev.preventDefault();
    setIsLoading(true);
    const hashedPassword = hash({ password });
    const options = {
      method: 'post',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password: hashedPassword }),
    };
    const res = await fetch(`api/salesforce-login`, options);
    if (res.status === 200) {
      router.push('/portal/dashboard');
    } else {
      setErrorMessage('Incorrect username or password');
      setIsLoading(false);
    }
  };

  const loginWithMicrosoft = async () => {
    setIsLoading(true);
    let queryParams = {
      tenant: `common`,
      client_id: process.env.CLIENT_ID,
      response_type: 'code',
      scope: `https://graph.microsoft.com/User.Read`,
      redirect_uri: `http://localhost:3000/portal/test`,
      navigate_to_login_request_url: 'true'
    };
    let url = `https://login.microsoftonline.com/common/oauth2/v2.0/authorize?`;
    let queryParamsString = new URLSearchParams(queryParams).toString();
    let authorizeEndpoint = url + queryParamsString;
    window.location.assign(authorizeEndpoint)
  }

  return (
    <div className="h-screen overflow-y-scroll scrollbar-invisible grid grid-rows-[62px_1fr_96px] lg:grid-rows-[92px_1fr_105px]">
      <Head>
        <title>harmon.ie Login</title>
      </Head>
      <Nav showUserMenu={false} />
      <div className="flex flex-col gap-6 justify-center items-center px-4 mx-auto w-11/12 md:w-3/6 xl:w-4/12 md:max-w-md py-4">
        <div>
          <Icon name="HarmonieIcon" className="w-12 h-12" />
        </div>
        <Title size="lg" className="text-indigo-500 text-center font-extrabold">
          Sign in to the harmon.ie Customer Portal{' '}
        </Title>
        <p className="text-indigo-300">Please enter your email and password</p>
        <form className="w-full" onSubmit={onSubmit}>
          <InputMemo
            className="w-full mb-4 border-indigo-50 placeholder-indigo-200"
            title="Email"
            name="email"
            placeholder="Email"
            required
            value={email}
            setValue={(value) => {
              setEmail(value);
              setErrorMessage('');
            }}
            onFocus={(ev) => ev.target.removeAttribute('readOnly')}
            readOnly={true}
          />
          <InputMemo
            className="w-full border-indigo-50 placeholder-indigo-200"
            title="Password"
            name="password"
            type="password"
            placeholder="Password"
            required
            value={password}
            setValue={(value) => {
              setPassword(value);
              setErrorMessage('');
            }}
            onFocus={(ev) => ev.target.removeAttribute('readOnly')}
            readOnly={true}
          />
          <div className="w-full flex justify-end">
            <Button
              label="Resend my password"
              onClick={() => router.push('/reset-password')}
              theme="blue"
              as="button"
              plain
              align="left"
            />
          </div>
          <Button
            label="Sign in"
            onClick={onSubmit}
            theme="blue"
            iconPosition="before"
            as="button"
            stretch
            disabled={password.trim() === '' || email.trim() === ''}
          />
        </form>
        <p className="text-left text-red-500">{errorMessage}</p>

        <div className="w-full h-px bg-indigo-50 my-4 relative">
          <span className="text-indigo-300 px-4 bg-white absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            or
          </span>
        </div>
        <Button
          label="Sign in with Microsoft (Coming soon)"
          // onClick={() => instance.loginRedirect()}
          onClick={loginWithMicrosoft}
          theme="lightblue"
          icon="MicrosoftIcon"
          iconPosition="before"
          as="button"
          stretch
          // disabled
        />
      </div>
      <div className="flex justify-center items-center bg-gray-50 border-t">
        <p className="text-indigo-200">© harmon.ie 2022</p>
      </div>
    </div>
  );
}
