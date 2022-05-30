import React, { useEffect, useState } from 'react';
import { Spinner } from '../components/loaders/Spinner';

export type LandingPageSceneProps = {
  slug?: string;
};


export const LandingPageScene = ({ slug }: LandingPageSceneProps) => {
  const [isLoading, setIsLoading] = useState(true);

  const handleLoad = () => {
    const isIFrame = (input: HTMLElement | null): input is HTMLIFrameElement => input !== null && input.tagName === 'IFRAME';
    const frame = document.getElementById('iframe');
    if (frame && isIFrame(frame)) {
      frame.contentWindow.postMessage(process.env.IFRAME_KEY, process.env.BASE_IFRAME_API);
      setIsLoading(false);
    }
  }

  return (
    <div>
      {
        isLoading && (
          <div className="w-24 h-24 m-auto mt-24">
            <Spinner />
          </div>
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
