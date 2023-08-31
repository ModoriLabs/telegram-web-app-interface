import ADVideo from '@/assets/videos/ad.mp4';
import { BackButton, MainButton } from '@vkruglikov/react-telegram-web-app';
import { useRouter } from 'next/router';
import { useRef, useState } from 'react';
import styled from 'styled-components';

const VideoWrapper = styled.article`
  margin-top: 10px;
  width: 100%;
  height: initial;
  position: relative;
  border-radius: 10px;
  &::before {
    content: '';
    display: block;
    padding-top: 80%;
  }
  > video {
    width: 100%;
    height: 100%;
    min-width: 100%;
    min-height: 100%;
    object-fit: cover;
    position: absolute;
    top: 0px;
    left: 0px;
    z-index: 0;
  }
`;
const Container = styled.article`
  width: 90%;
  margin: 25px auto 0;
  > b {
    font-size: 18px;
  }
`;

const ViewAd = () => {
  const router = useRouter();
  const [isWatchingAd, setWatchingAd] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleTimeUpdate = () => {
    if (!!!videoRef.current) return;

    // FIXME: Make sure isWatchingAd is true for the duration of the video, not just at the end.
    if (videoRef.current.currentTime >= videoRef.current.duration) {
      setWatchingAd(true);
    }
  };

  return (
    <Container>
      <BackButton onClick={() => router.back()} />
      <b>View ad!</b>
      <VideoWrapper>
        <video
          ref={videoRef}
          controls
          playsInline
          onTimeUpdate={handleTimeUpdate}
        >
          <source src={ADVideo} type="video/mp4" />
        </video>
      </VideoWrapper>
      {isWatchingAd && (
        <MainButton
          text="Claim"
          onClick={async () => {
            try {
              // TODO: Claim contract
            } catch (e: any) {
              console.error(e);
            }
          }}
        ></MainButton>
      )}
    </Container>
  );
};

export default ViewAd;
