import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { flexBox } from '@lib/styles/mixin';
import Input from '@common/Input/Input';
import Select from '@common/Select/Select';
import Button from '@components/Button/Button';
import logo from '@assets/images/logo2.png';
import { SpeciesList } from '@src/types/Species';
import { HabitatList } from '@src/types/Habitat';
import { ReactComponent as AddCircle } from '@assets/icons/add_circle.svg';
import useModal from '@common/Modal/useModal';
import Modal from '@common/Modal/Modal';
import SelectMake from '@components/Register/SelectMake';
import { RegisterState } from '@src/contexts/RegisterContext';
import useForm, { Validation } from '@components/Register/useForm';

interface MoreInfoProps {
  handleMoreInfoClick: React.MouseEventHandler<HTMLButtonElement>;
}

const validations: Validation<RegisterState>[] = [
  { value: 'nickname', check: (values) => values['nickname'].length <= 4, message: '아이디는 4자를 넘어야합니다.' },
  { value: 'habitat', check: (values) => values['habitat'].length === 0, message: '서식지를 선택해야합니다.' },
  { value: 'category', check: (values) => values['category'].length === 0, message: '동물을 선택해야합니다.' },
];

const MoreInfo = ({ handleMoreInfoClick }: MoreInfoProps) => {
  const [speciesOptions, setSpeciesOptions] = useState<SpeciesList>([]);
  const [habitatOptions, setHabitatOptions] = useState<HabitatList>([]);
  const { toggle, isShowing } = useModal();
  useEffect(() => {
    fetchSpecies();

    async function fetchSpecies() {
      const response = await fetch('/api/species/cursor');
      const speciesData: SpeciesList = await response.json();
      setSpeciesOptions(speciesData);
    }
  }, []);
  useEffect(() => {
    fetchHabitats();
    async function fetchHabitats() {
      const response = await fetch('/api/habitat?skip=1&take=10');
      const habitats: HabitatList = await response.json();
      setHabitatOptions(habitats);
    }
  }, []);

  const { registerState, handleChange, errors, flag } = useForm(validations);
  const { nickname } = registerState;

  return (
    <MoreInfoBlock>
      <Header>
        <img className={'logo'} src={logo} alt={'로고'} />
        <div className={'title'}>추가 정보 입력하기</div>
      </Header>
      <Form>
        <Input name={'nickname'} placeholder={'유저 아이디'} value={nickname} handleChange={handleChange} errorMessage={errors.nickname} />
        <SelectContainer>
          <Select name={'habitat'} id={'habitat'} options={habitatOptions} label={'서식지'} handleChange={handleChange} errorMessage={errors.habitat} />
          <AddCircle onClick={toggle} />
        </SelectContainer>
        <SelectContainer>
          <Select name={'category'} id={'category'} options={speciesOptions} label={'동물 카테고리'} handleChange={handleChange} errorMessage={errors.category} />
          <AddCircle />
        </SelectContainer>
        <ButtonContainer>
          <Button borderColor={'none'} onClick={handleMoreInfoClick}>
            뒤로 가기
          </Button>
          <Button className={`${flag && 'active'}`} onClick={handleMoreInfoClick}>
            가입
          </Button>
        </ButtonContainer>
      </Form>
      <Modal hide={toggle} isShowing={isShowing}>
        <SelectMake placeholder={'종류'} title={'animal'} />
      </Modal>
    </MoreInfoBlock>
  );
};

export default MoreInfo;

const MoreInfoBlock = styled.div`
  position: absolute;
  padding: 0 40px;
  width: 370px;
  height: 420px;
`;

const SelectContainer = styled.div`
  ${flexBox('center', 'center', 'row')};
  padding-left: 30px;
  svg {
    margin: 25px 0 0 5px;
    &:hover {
      cursor: pointer;
    }
  }
`;
const Header = styled.div`
  ${flexBox('space-between', 'flex-start', 'column')};
  .logo {
    height: 80px;
    object-fit: cover;
  }
  .title {
    margin: 15px 0;
    font-size: 24px;
  }
`;
const Form = styled.form`
  ${flexBox('center', 'center', 'column')};

  & > * {
    margin: 15px;
  }
`;
const ButtonContainer = styled.div`
  ${flexBox('space-between', 'center')};
  width: 100%;
  margin-top: 35px;
`;
