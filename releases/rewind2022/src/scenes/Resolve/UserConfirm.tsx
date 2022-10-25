import Centered from '@rewind/core/src/components/Centered'
import Button from '../../components/Button'
import { DataResolveStep, useDataResolve } from './useDataResolve'
import { animate } from 'motion'
import { useEffect, useRef } from 'react'
import Flex from '@react-css/flex'

export default function UserConfirm() {
  const [setStep, user, step, resolve] = useDataResolve((s) => [
    s.setStep,
    s.user,
    s.step,
    s.resolve
  ])

  const containerRef = useRef<HTMLDivElement>(null)

  const goBack = () => {
    animate(
      containerRef.current!,
      {
        opacity: 0,
        x: 80
      },
      {
        easing: 'ease-in',
        duration: 0.4
      }
    ).finished.then(() => {
      setStep(DataResolveStep.USER_INPUT)
    })
  }

  useEffect(() => {
    if (step === DataResolveStep.USER_CONFIRM && containerRef.current) {
      animate(
        containerRef.current,
        {
          opacity: [0, 1],
          x: [80, 0]
        },
        {
          easing: 'ease-out',
          duration: 0.4
        }
      )
    }
  }, [])

  console.log(user)

  return (
    <Centered>
      <div ref={containerRef}>
        {user?.name}
        <Flex>
          <Button background="rgba(255, 255, 255, 0.2)" onClick={goBack}>
            Back
          </Button>
          <Button
            style={{
              marginLeft: 10
            }}
            onClick={resolve}
          >
            Continue
          </Button>
        </Flex>
      </div>
    </Centered>
  )
}
