import React from 'react';
import { Button, Modal, ModalBody, ModalFooter, Spinner } from 'reactstrap';

interface ModalProps {
  isOpen: boolean;
  toggle: () => void;
  onDestroy: () => void;
  loading: boolean;
}

export const ModalDelete = (props: ModalProps) => {
  const { toggle, onDestroy, isOpen, loading } = props;

  return (
    <Modal isOpen={isOpen} centered toggle={toggle}>
      <ModalBody>
        <h5 className="text-danger">Bạn có muốn xóa hay không</h5>
      </ModalBody>
      <ModalFooter>
        <Button color="primary" onClick={onDestroy} disabled={loading}>
          {loading ? <Spinner>Loading...</Spinner> : 'Đông ý'}
        </Button>{' '}
        <Button color="secondary" onClick={toggle}>
          Hủy
        </Button>
      </ModalFooter>
    </Modal>
  );
};
