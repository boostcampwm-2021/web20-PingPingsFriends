import DetailModal from '@components/DetailModal/DetailModal';
import { Post } from '@src/types/Post';
import { formatDate } from '@lib/utils/time';
import styled from 'styled-components';
import { flexBox } from '@lib/styles/mixin';
import { ToggleHandler } from '@common/Modal/useModal';

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
}

const DetailContainer = ({ detailFeed, toggle }: DetailContainerProps) => {
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
        />
      </div>
    </DetailContainerBlock>
  );
};

export default DetailContainer;
