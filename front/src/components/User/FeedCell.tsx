import React, { useState } from 'react';
import styled from 'styled-components';
import Modal from '@common/Modal/Modal';
import useModal from '@common/Modal/useModal';
import DetailModal from '@components/DetailModal/DetailModal';
import { Post } from '@src/types/Post';
import { formatDate } from '@lib/utils/time';
import { fetchAPI, getAuthOption } from '@src/lib/utils/fetch';
import { useUserState } from '@src/contexts/UserContext';

interface FeedCellProps {
  url: string;
  feedId: number;
}

const FeedCell = ({ url, feedId }: FeedCellProps) => {
  const { toggle, isShowing } = useModal();
  const [feedInfo, setFeedInfo] = useState<Post | null>(null);
  const userState = useUserState();

  const handleClick = async (e: React.MouseEvent) => {
    fetchAPI(
      `/api/posts/${feedId}`,
      async (okRes) => {
        const data: Post = await okRes.json();
        data.contents_url_array = data.post_contents_urls.split(',').map((url) => url.replace('.webp', '-feed.webp'));
        setFeedInfo(data);
        toggle(e);
      },
      (failRes) => {},
      (err) => {},
      getAuthOption('GET', userState.data?.accessToken)
    );
  };

  return (
    <CellDiv>
      <img src={url.replace('.webp', '-feed.webp')} alt={'feed thumbnail'} onClick={handleClick} />
      <Modal hide={toggle} isShowing={isShowing}>
        {feedInfo ? (
          <DetailModal
            feedId={feedInfo.post_id}
            ago={formatDate(feedInfo.created_at)}
            imageURLs={feedInfo.contents_url_array}
            nickname={feedInfo.nickname}
            numOfHearts={feedInfo.numOfHearts}
            text={feedInfo.human_content}
            userId={feedInfo.user_id}
            userImgURL={feedInfo.user_image_url}
            isHeart={feedInfo.is_heart}
          />
        ) : null}
      </Modal>
    </CellDiv>
  );
};

export default FeedCell;

const CellDiv = styled.div`
  width: 150px;
  height: 150px;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    cursor: pointer;
  }
`;
