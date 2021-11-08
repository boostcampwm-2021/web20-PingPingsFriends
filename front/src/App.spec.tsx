import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';
import { MemoryRouter } from 'react-router-dom';

describe('Modal 컴포넌트 테스트', function () {
  it('클릭시 모달이 열린다', async function () {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    );

    const habitat = await screen.getByText('서식지');

    userEvent.click(habitat);

    const modal = screen.queryByText('contents');

    expect(modal).toBeInTheDocument();
  });
});
