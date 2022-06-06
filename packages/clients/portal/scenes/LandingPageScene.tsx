import React, { useEffect, useState } from 'react';
import { Spinner } from '../components/loaders/Spinner';

export type LandingPageSceneProps = {
  slug?: string;
};


export const LandingPageScene = ({ slug }: LandingPageSceneProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isConsent, setIsConsent] = useState(false);

  const handleLoad = () => {
    const isIFrame = (input: HTMLElement | null): input is HTMLIFrameElement => input !== null && input.tagName === 'IFRAME';
    const frame = document.getElementById('iframe');
    if (frame && isIFrame(frame)) {
      frame.contentWindow.postMessage(process.env.IFRAME_KEY, process.env.BASE_IFRAME_API);
      setIsLoading(false);
    }
  }

  console.log({isLoading})


  useEffect(() => {
    if (typeof window !== undefined) {
      window.addEventListener('message', event => {

        if (typeof event.data === 'string') {
          const data = JSON.parse(event.data)
          console.log(data, 'in parent data')
          setIsConsent(true)
        }

        // console.log('in parent', event.origin.startsWith(`${process.env.CUSTOMER_PORTAL_URL}`), event.origin, process.env.CUSTOMER_PORTAL_URL)
        // if (event.origin.startsWith(`${process.env.CUSTOMER_PORTAL_URL}`)) {
        //   console.log('got the message')
        //   if (event.data !== process.env.IFRAME_KEY) {
        //     console.log('key was not accepted')
        //     router.push('/404');
        //     return;
        //   }
        //   setIsAllowedAsIframe(true);
        // }
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
      {
        isConsent && (
          <div className='w-48 h-48 absolute z-500 top-0 right-48 bg-white'>HETHBJHBJBJ</div>
        )
      }
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
