import DetailModal from '@components/DetailModal/DetailModal';
import { Post } from '@src/types/Post';
import { formatDate } from '@lib/utils/time';
import { ToggleHandler } from '@common/Modal/useModal';
import React from 'react';
import { useScrollDispatch } from '@src/contexts/ScrollContext';

interface DetailContainerProps {
  detailFeed: Post;
  toggle: ToggleHandler;
}

const DetailContainer = ({ detailFeed }: DetailContainerProps) => {
  const ago = formatDate(detailFeed!.created_at);

  return (
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
    />
  );
};

export default DetailContainer;
