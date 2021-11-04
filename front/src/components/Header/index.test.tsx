import React from 'react';
import { render, screen } from '@testing-library/react';
import Place from './Place';
import UserInfo from './UserInfo';

describe('Header 컴포넌트 테스트', function () {
  it('Place 컴포넌트는 서식지를 받아서 화면에 출력한다', function () {
    render(<Place habitat={'강남역'} />);
    const text = screen.getByText(/강남역/i);
    expect(text).toBeInTheDocument();
  });
  it('UserInfo 컴포넌트는 유저 네임을 받아서 화면에 출력한다', function () {
    render(<UserInfo username={'핑핑이'} />);
    const text = screen.getByText(/핑핑이/i);
    expect(text).toBeInTheDocument();
  });

  it('Header 컴포넌트는 Logo, UserInfo, Avatar, Place를 렌더링한다', function () {
    //todo: 테스트 작성해야함
  });
});
