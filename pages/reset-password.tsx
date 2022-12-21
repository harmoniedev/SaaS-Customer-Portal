import Head from 'next/head';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { Button } from '../components/buttons/Button';
import { Title } from '../components/title/Title';
import { Spinner } from '../components/loaders/Spinner';
import { Icon } from '../components/icons/Icon';
import { NavMemo as Nav } from '../layout/Nav/Nav';
import { InputMemo } from '../components/input/Input';

export default function Page()
{
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  if (isLoading)
  {
    return (
      <div className="w-24 h-24 m-auto mt-24">
        <Spinner />
      </div>
    );
  }

  const onSubmit = async (ev) =>
  {
    try
    {
      const response = await fetch(`${process.env.API_URL}/reset_password?email=` + "" + email + "", {
      });
      if (response.status === 200)
      {
        router.push("/");
      }
    } catch (err)
    {
      console.log(err);
      setErrorMessage('user not exist')
    }
  }

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
          Password Recovery{' '}
        </Title>
        <p className='text-indigo-300'>
          Please enter your email
        </p>
        <form className='w-full' onSubmit={onSubmit}>
          <InputMemo
            className='w-full mb-4 border-indigo-50 placeholder-indigo-200'
            title="Email"
            name="email"
            placeholder="Email"
            required
            value={email}
            setValue={(value) =>
            {
              setEmail(value)
              setErrorMessage('')
            }}
            onFocus={(ev) => ev.target.removeAttribute('readOnly')}
            readOnly={true}
          />
          <Button
            label="Send"
            onClick={onSubmit}
            theme="blue"
            iconPosition="before"
            as="button"
            stretch
            disabled={email.trim() === ''}
          />
          <div className='w-full flex justify-end'>
            <Button
              label="Back to Login"
              onClick={() => router.push('/')}
              theme="blue"
              as="button"
              plain
              align='left'
            />
          </div>
        </form>
        <p className='text-left text-red-500'>{errorMessage}</p>
      </div>
      <div className="flex justify-center items-center bg-gray-50 border-t">
        <p className="text-indigo-200">© harmon.ie {new Date().getFullYear()}</p>
      </div>
    </div>
  );
}
