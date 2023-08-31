import ADVideo from '@/assets/videos/ad.mp4';
import styled from 'styled-components';

export const VideoWrapper = styled.article`
  width: 100%;
  position: relative;
  &::before {
    content: '';
    display: block;
    padding-top: 80%;
  }
  > video {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: inherit;
  }
`;
const ViewAd = () => {
  return (
    <section>
      View ad!
      <VideoWrapper>
        <video controls playsInline>
          <source src={ADVideo} type="video/mp4" />
        </video>
      </VideoWrapper>
    </section>
  );
};

export default ViewAd;
