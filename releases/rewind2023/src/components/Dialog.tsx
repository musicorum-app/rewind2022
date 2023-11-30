import { Modal, ModalContent, ModalOverlay } from '@chakra-ui/react'
import styled from '@emotion/styled'

interface DialogProps {
  disableClose?: boolean
  open: boolean
  onClose: () => void
  children?: React.ReactNode
}

const Overlay = styled(ModalOverlay)`
  background: rgba(0, 0, 0, 0.8);
  backdrop-filter: blur(2px);
  z-index: 999;
`

const Content = styled(ModalContent)`
  display: flex;
  justify-content: center;
  align-items: center;
  height: var(--h);
  pointer-events: none;
  padding: 14px;
`

const Container = styled.div`
  max-width: 460px;
  box-sizing: border-box;
  width: 100%;
  background: #2e2e2e;
  padding: 24px 20px;
  border-radius: 22px;
  box-shadow: 3px 3px 30px 5px rgba(0, 0, 0, 0.3);
  pointer-events: all;
`

export default function Dialog({
  disableClose,
  open,
  onClose,
  children
}: DialogProps) {
  const closeFn = () => {
    if (!disableClose) {
      onClose()
    }
  }
  return (
    <Modal isOpen={open} onClose={closeFn} onEsc={closeFn}>
      <Overlay onClick={onClose} />
      <Content>
        <Container>{children}</Container>
      </Content>
    </Modal>
  )
}
