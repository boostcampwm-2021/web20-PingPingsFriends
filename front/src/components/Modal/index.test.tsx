import React from 'react';
import { render, screen } from '@testing-library/react';
import Modal from './Modal';
import userEvent from '@testing-library/user-event';

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

  it('모달창의 검은 부분을 클릭하면 모달창이 닫힌다', async function () {
    const { container } = render(
      <div>
        <Modal>contents</Modal>
      </div>
    );

    userEvent.click(container);

    expect(screen.queryByText('contents')).not.toBeInTheDocument();
  });

  it('컨텐츠 창에서 ESC를 누르면 모달창이 닫힌다', async function () {
    render(
      <div>
        <Modal>
          <div tabIndex={0}>contents</div>
        </Modal>
      </div>
    );

    const contents = screen.getByText('contents');

    userEvent.type(contents, '{esc}');

    expect(screen.queryByText('contents')).not.toBeInTheDocument();
  });
});
