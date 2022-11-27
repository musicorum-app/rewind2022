import styled from '@emotion/styled'
import { FiChevronUp } from 'react-icons/fi'

const PullerWrapper = styled.button<{ opened: boolean }>`
  background: var(--background);
  border: 2px solid var(--border);
  border-bottom: none;
  border-radius: var(--border-radius) var(--border-radius) 0 0;

  width: 36px;
  height: 50px;
  margin-top: auto;
  margin-right: 8px;
  cursor: pointer;
  pointer-events: all;
  display: flex;
  justify-content: center;
  padding: 6px 0 0 0;
  transform: translateY(14px);
  transition: all 150ms ease-in-out;

  &:hover {
    transform: translateY(4px);
  }

  & > svg {
    width: 22px;
    height: 22px;
    transition: all 300ms ease-in-out;
    transform: rotate(${(p) => (p.opened ? 180 : 0)}deg);
  }
`

export default function Puller({
  opened,
  onClick
}: {
  opened: boolean
  onClick: () => void
}) {
  return (
    <PullerWrapper onClick={onClick} opened={opened}>
      <FiChevronUp />
    </PullerWrapper>
  )
}
