import { forwardRef } from '@chakra-ui/react'
import styled from '@emotion/styled'

const Element = styled.div<{ isOrigin: boolean }>`
  width: 100%;
  height: 100%;
  border: 2px dashed ${(p) => (p.isOrigin ? 'yellow' : 'red')};
  opacity: 0;
  background: ${(p) =>
    p.isOrigin ? 'rgb(255, 255, 0, 0.2)' : 'rgb(255,0, 0, 0.2)'};

  transition: opacity 150ms ease-in-out;
  z-index: 9999999;
  pointer-events: none;
`

/**
 * i have no idea what is the meaning of this anymore
 */
export interface PositionReferenceObjectProps
  /** what the fuck are these types */
  extends Omit<React.ComponentProps<typeof Element>, 'isOrigin'> {
  id: string
  /**
   * id of a {@link PositionReferenceObject} as a target
   */
  refTo?: string
}

const PositionReferenceObject = forwardRef(
  ({ id, refTo, ...props }: PositionReferenceObjectProps, ref) => {
    return (
      <Element
        ref={ref}
        id={id}
        data-ref-to-id={refTo}
        {...props}
        className={`positioned-ref-obj ${props.className}`}
        isOrigin={!!refTo}
      />
    )
  }
)

export default PositionReferenceObject
