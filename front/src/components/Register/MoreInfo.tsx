import React from 'react';
import styled from 'styled-components';
import { flexBox } from '@lib/styles/mixin';
import Input from '@common/Input/Input';
import { InfoData } from '@components/Register/Register';
import { ErrorType } from '@hooks/useForm';
import Select from '@common/Select/Select';
import Button from '@components/Button/Button';
import { ReactComponent as PhotoCameraSvg } from '@assets/icons/photo_camera.svg';
import defaultImage from '@assets/images/default_avatar.png';
import useReadFileURL from '@hooks/useReadFileURL';

interface MoreInfoProps {
  values: InfoData;
  handleChange: React.ChangeEventHandler<HTMLInputElement | HTMLSelectElement>;
  errors: ErrorType<InfoData>;
  flag: boolean;
  handleMoreInfoClick: React.MouseEventHandler<HTMLButtonElement>;
}

const habitatOptions = ['강남역 뒷골목', '부산 해운대', '서울숲'];
const animalOptions = ['고양이', '강아지', '돌멩이'];

const MoreInfo = ({ values, flag, handleMoreInfoClick, errors, handleChange }: MoreInfoProps) => {
  const { username, profile } = values;
  const imageURL = useReadFileURL({ file: profile });

  return (
    <MoreInfoBlock>
      <Header>
        <div className={'logo'}>핑핑이와 친구들</div>
        <div className={'title'}>추가 정보 입력하기</div>
      </Header>
      <Form>
        <FileInsertLabel htmlFor="profile" imageURL={imageURL}>
          <SvgContainer>
            <PhotoCameraSvg />
          </SvgContainer>
        </FileInsertLabel>
        <FileInput id="profile" type="file" accept="image/*" name="contents" form="write" onChange={handleChange} />
        <Input name={'username'} placeholder={'유저 아이디'} value={username} handleChange={handleChange} errorMessage={errors.username} />
        <Select name={'habitat'} id={'habitat'} options={habitatOptions} label={'서식지'} handleChange={handleChange} />
        <Select name={'category'} id={'category'} options={animalOptions} label={'동물 카테고리'} handleChange={handleChange} />
        <ButtonContainer>
          <Button borderColor={'none'} onClick={handleMoreInfoClick}>
            뒤로 가기
          </Button>
          <Button className={`${flag && 'active'}`} onClick={handleMoreInfoClick}>
            가입
          </Button>
        </ButtonContainer>
      </Form>
    </MoreInfoBlock>
  );
};

export default MoreInfo;

const FileInsertLabel = styled.label<{ imageURL?: string | null }>`
  width: 100px;
  height: 100px;
  border: 1px solid black;
  border-radius: 50%;
  text-align: center;
  flex-shrink: 0;
  position: relative;
  margin: 0;
  &::after {
    padding-bottom: 100%;
    border-radius: 50%;
    content: '';
    background-image: url(${({ imageURL }) => (imageURL ? imageURL : defaultImage)});
    background-size: cover;
    display: block;
  }
`;

const SvgContainer = styled.div`
  ${flexBox('center', 'center')};
  position: absolute;
  z-index: 1;
  width: 30px;
  height: 30px;
  background: white;
  border-radius: 50%;
  bottom: 0;
  right: 0;
`;

const FileInput = styled.input`
  display: none;
`;

const MoreInfoBlock = styled.div`
  position: absolute;
  padding: 0 40px;
  width: 370px;
  height: 420px;
`;
const Header = styled.div`
  ${flexBox('space-between', 'flex-start', 'column')};
  .logo {
    font-size: 18px;
  }
  .title {
    margin: 15px 0;
    font-size: 24px;
  }
`;
const Form = styled.form`
  ${flexBox('center', 'center', 'column')};

  & > * {
    margin: 20px;
  }
`;
const ButtonContainer = styled.div`
  ${flexBox('space-between', 'center')};
  width: 100%;
`;
