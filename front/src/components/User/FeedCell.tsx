import React, { useState } from 'react';
import styled from 'styled-components';
import Modal from '@common/Modal/Modal';
import useModal from '@common/Modal/useModal';
import DetailModal from '@components/DetailModal/DetailModal';
import { Post } from '@src/types/Post';
import { formatDate } from '@lib/utils/time';

interface FeedCellProps {
  url: string;
  feedId: number;
}

const FeedCell = ({ url, feedId }: FeedCellProps) => {
  const { toggle, isShowing } = useModal();
  const [feedInfo, setFeedInfo] = useState<Post | null>(null);

  const handleClick = async (e: React.MouseEvent) => {
    const res: Response = await fetch(`/api/posts/${feedId}`);
    if (res.ok) {
      const data: Post = await res.json();
      setFeedInfo(data);
      toggle(e);
    } else {
      return;
    }
  };

  return (
    <CellDiv>
      <img src={url.replace('.webp', '-feed.webp')} alt={'feed thumbnail'} onClick={handleClick} />
      <Modal hide={toggle} isShowing={isShowing}>
        {feedInfo ? (
          <DetailModal
            feedId={feedInfo.post_id}
            ago={formatDate(feedInfo.created_at)}
            imageURLs={feedInfo.post_contents_urls.split(',')}
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
