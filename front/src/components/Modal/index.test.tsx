import React from 'react';
import { render, screen } from '@testing-library/react';
import Modal from './Modal';

describe('Modal 컴포넌트 테스트', function () {
  it('Modal 컴포넌트 생성 ', function () {
    const { container } = render(<Modal>test</Modal>);

    expect(container.firstChild).toHaveClass('modal-container');
  });

  it('Modal에 다른 컴포넌트를 붙일 수 있다', function () {
    render(
      <Modal>
        <div>test</div>
      </Modal>
    );

    const content = screen.getByText('test');

    expect(content).toBeInTheDocument();
  });
});
