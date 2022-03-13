import { ReactNode } from 'react';
//@ts-ignore
import ReactModal from 'react-modal';
import { useSelector } from 'react-redux';
import { isShowModal } from '../store/features/config';

type Props = {
  children: ReactNode,
  closeHandler?: () => void,
}

const Modal = ({ closeHandler, children }: Props) => {
  const isModalActive = useSelector(isShowModal);

  return (
    <ReactModal
      isOpen={isModalActive}
      onRequestClose={closeHandler}
      shouldCloseOnOverlayClick
    >
      {children}
    </ReactModal>

  );
}

export default Modal;