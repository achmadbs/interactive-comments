import React from 'react';
import { BackDrop, CardBox, StyledButton, ActionDiv } from './element';

interface ModalProps {
  isModalShow: boolean;
  handleCloseModal: () => void;
  handleDelete: () => void;
}

const Modal = ({ isModalShow, handleCloseModal, handleDelete }: ModalProps) => {
  return isModalShow ? (
    <BackDrop onClick={handleCloseModal}>
      <CardBox>
        <h2>Delete Comment</h2>
        <p>
          Are you sure you want to delete this comment? This will remove the
          comment and can't be undone.
        </p>
        <ActionDiv>
          <StyledButton buttonColor="--neutral-blue" onClick={handleCloseModal}>
            No, Cancel
          </StyledButton>
          <StyledButton buttonColor="--primary-soft-red" onClick={handleDelete}>
            Yes, Delete
          </StyledButton>
        </ActionDiv>
      </CardBox>
    </BackDrop>
  ) : null;
};

export default Modal;
