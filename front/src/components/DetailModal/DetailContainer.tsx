import DetailModal from '@components/DetailModal/DetailModal';
import { Post, Posts } from '@src/types/Post';
import { formatDate } from '@lib/utils/time';
import styled from 'styled-components';
import { flexBox } from '@lib/styles/mixin';
import { ToggleHandler } from '@common/Modal/useModal';
import React, { Dispatch, SetStateAction } from 'react';

const DetailContainerBlock = styled.div`
  ${flexBox('center', 'center')};
  position: absolute;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  background: rgba(0, 0, 0, 0.4);
  z-index: 10;
`;

interface DetailContainerProps {
  detailFeed: Post;
  toggle: ToggleHandler;
  setTotalPosts: Dispatch<SetStateAction<Posts>>;
  setFeeds: Dispatch<SetStateAction<Posts>>;
}

const DetailContainer = ({ detailFeed, toggle, setTotalPosts, setFeeds }: DetailContainerProps) => {
  const ago = formatDate(detailFeed!.created_at);

  return (
    <DetailContainerBlock onClick={toggle}>
      <div className={'contents'}>
        <DetailModal
          feedId={detailFeed.post_id}
          userId={detailFeed.user_id}
          userImgURL={detailFeed.user_image_url}
          imageURLs={detailFeed.contents_url_array}
          text={detailFeed.human_content}
          nickname={detailFeed.nickname}
          numOfHearts={detailFeed.numOfHearts}
          isHeart={detailFeed.is_heart}
          ago={ago}
          setTotalPosts={setTotalPosts}
          setFeeds={setFeeds}
        />
      </div>
    </DetailContainerBlock>
  );
};

export default DetailContainer;
