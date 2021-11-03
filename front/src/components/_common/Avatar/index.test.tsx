import React from 'react';
import { render, screen } from '@testing-library/react';
import Avatar, { DEFAULT_IMG_SRC } from './Avatar';

describe('Avatar 컴포넌트 테스트', function () {
  it('Avatar 이미지 url을 받아서 화면에 출력한다', function () {
    const testURL = `https://testURL.png/`;
    render(<Avatar imgSrc={testURL} />);
    const urlText = screen.getByRole('img') as HTMLImageElement;
    expect(urlText.src).toBe(testURL.toLowerCase());
  });
  it('Avatar 이미지 url을 받지 않으면 기본 url을 출력한다', function () {
    render(<Avatar />);
    const urlText = screen.getByRole(`img`) as HTMLImageElement;
    expect(urlText.src).toBe(DEFAULT_IMG_SRC);
  });
});
