import React, { useRef, useState } from 'react';
import { HabitatInfo } from '@src/types/Habitat';
import styled from 'styled-components';
import { Palette } from '@lib/styles/Palette';
import useFetchTotalFeeds from '@hooks/useFetchTotalFeeds';
import Cell from './Cell';
import { prettyScroll } from '@src/lib/styles/mixin';
import Warning from '@common/Indicator/Warning';
import { Post } from '@src/types/Post';
import Modal from '@common/Modal/Modal';
import useModal from '@common/Modal/useModal';
import DetailModal from '@components/DetailModal/DetailModal';
import { formatDate } from '@lib/utils/time';
import { ReactComponent as ExploreSvg } from '@assets/icons/explore.svg';

const Explore = ({ habitatInfo }: { habitatInfo: HabitatInfo | undefined | null }) => {
  const divRef = useRef<HTMLDivElement>(null);
  const [totalFeed] = useFetchTotalFeeds(habitatInfo?.habitat.id);
  const [isReady, setReady] = useState(false);
  const [test, setTest] = useState<Post | null>(null);
  const { isShowing, toggle } = useModal();

  const modalToggle = (e: React.MouseEvent<Element> | React.KeyboardEvent<Element> | 'off', feed: Post) => {
    setTest(feed);
    toggle(e);
  };

  return (
    <ExploreDiv ref={divRef} color={habitatInfo?.habitat.color} onAnimationEnd={() => setReady(true)}>
      {isReady && totalFeed.length ? (
        totalFeed.map((feedInfo) => {
          return feedInfo.contents_url_array.map((url, idx) => {
            return <Cell feedInfo={feedInfo} url={url} key={idx} toggle={modalToggle} />;
          });
        })
      ) : isReady ? (
        <Warning width={'200px'} height={'200px'} />
      ) : (
        <ExploreSvg className={'explore'} />
      )}
      <Modal isShowing={isShowing} hide={toggle}>
        {test && (
          <DetailModal
            feedId={test.post_id}
            nickname={test.nickname}
            ago={formatDate(test.created_at)}
            text={test.human_content}
            imageURLs={test.contents_url_array}
            userId={test.user_id}
            userImgURL={test.user_image_url}
            numOfHearts={test.numOfHearts}
            isHeart={test.is_heart}
          />
        )}
      </Modal>
    </ExploreDiv>
  );
};

export default Explore;

const ExploreDiv = styled.div<{ color: string | undefined }>`
  ${prettyScroll()};
  width: 100%;
  margin: auto;
  background-color: ${(props) => (props.color !== undefined ? props.color : Palette.PINK)};
  z-index: 1;
  height: 100%;
  text-align: center;
  overflow-y: scroll;
  padding: 5px 5px;
  animation-duration: 1s;
  animation-name: zoomout;
  @keyframes zoomout {
    from {
      width: 300px;
    }
    to {
      width: 100%;
    }
  }

  .explore {
    fill: ${Palette.RED};
    width: 100px;
    height: 100px;
    margin: auto;
  }
`;
