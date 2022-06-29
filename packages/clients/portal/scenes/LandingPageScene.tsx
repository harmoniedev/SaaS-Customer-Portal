import React, { useEffect, useState } from 'react';
import { Button } from '../components/buttons/Button';
import { Dialog } from '../components/dialog/Dialog';
import { Spinner } from '../components/loaders/Spinner';
import { Title } from '../components/title/Title';

export type LandingPageSceneProps = {
  slug?: string;
};

export const LandingPageScene = ({ slug }: LandingPageSceneProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isConsent, setIsConsent] = useState(false);
  const [noUrl, setNoUrl] = useState(''); // variables provided in sanity
  const [yesUrl, setYesUrl] = useState(''); // variables provided in sanity

  const handleLoad = () => {
    const isIFrame = (input: HTMLElement | null): input is HTMLIFrameElement => input !== null && input.tagName === 'IFRAME';
    const frame = document.getElementById('iframe');
    if (frame && isIFrame(frame)) {
      frame.contentWindow.postMessage(process.env.IFRAME_KEY, process.env.BASE_IFRAME_API);
      setIsLoading(false);
    }
  }

  useEffect(() => {
    if (typeof window !== undefined) {
      window.addEventListener('message', event => {
        if (typeof event.data === 'string' && event.origin.startsWith(`${process.env.BASE_IFRAME_API}`)) {
          const data = JSON.parse(event.data)
          if (data.token !== process.env.IFRAME_KEY) {
            console.log('key was not accepted')
            return;
          }
          if (data.action === 'Open consent') {
            setIsConsent(true);
            setNoUrl(data.noUrl);
            setYesUrl(data.yesUrl);
          }
        }
      }); 
    }
  }, [])

  return (
    <div>
      {
        isLoading && (
          <div className="w-24 h-24 m-auto mt-24">
            <Spinner />
          </div>
        )
      }
      {/* here instead of Dialog you need to open consent window if isConsent === true, and can pass there redirect urls if user press yes ir no */}
      <Dialog mode="form" onOpenChange={(value) => setIsConsent(value)} open={isConsent}>
        <div className='lg:max-w-lg shadow-xl bg-white border border-black border-opacity-5 px-8 py-4 lg:px-16 lg:py-10'>
          <Title size='xs'>
            <p>Consent window</p>
          </Title>
          <p className='mt-4'>
            Some question placeholder goes here Some question placeholder goes here Some question placeholder goes here
            Some question placeholder goes here Some question placeholder goes here Some question placeholder goes here
          </p>
          <div className='mt-8 flex space-x-4 justify-end'>
            <Button
              label='Reject all'
              theme='white'
              href={noUrl}
            />
            <Button
              label='Accept all'
              href={yesUrl}
            />
          </div>
        </div>
      </Dialog>
      <iframe
        onLoad={() => handleLoad()}
        id="iframe"
        className='w-full h-screen'
        src={`${process.env.BASE_IFRAME_API}/${slug}`}
      />
    </div>
  );
};

export const LandingPageSceneMemo = React.memo(LandingPageScene);
