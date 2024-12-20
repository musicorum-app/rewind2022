import styled from '@emotion/styled'
import Flex from '@react-css/flex'
import Centered from '@rewind/core/src/components/Centered'
import { sheetObjectValuesToStyle } from '@rewind/core/src/modules/sheetObject'
import Button from '../../components/Button'
import { TextInput } from '../../components/Input'
import { useEffect, useRef, useState } from 'react'
import { lastfmClient } from '../../modules/lastfm'
import { Collapse } from 'react-collapse'
import {
  LastfmError,
  LastfmErrorCode
} from '@musicorum/lastfm/dist/error/LastfmError'
import { ReactComponent as WarnIcon } from '../../assets/icons/warn.svg'
import { DataResolveStep, useDataResolve } from './useDataResolve'
import { animate } from 'motion'
import { Palettes } from '../../theme/colors'
import { useTranslation } from 'react-i18next'

const UserTextInput = styled(TextInput)`
  width: 100%;
  margin: 20px;
`

const ErrorAlert = styled.div`
  background: ${Palettes.Gold.color};
  width: 100%;
  max-width: 260px;
  padding: 15px;
  border-radius: 8px;
  font-weight: 800;
  display: flex;
  align-items: center;

  & > svg {
    margin-right: 8px;
  }
`

interface ErrorValue {
  show: boolean
  text: string
}

export default function UserInput() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<ErrorValue>({
    show: false,
    text: ''
  })
  const formRef = useRef<HTMLFormElement>(null)
  const [setStep, setUser, step] = useDataResolve((s) => [
    s.setStep,
    s.setUser,
    s.step
  ])

  const { t } = useTranslation()

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const inputs = event.target as unknown as HTMLInputElement[]
    if (!inputs[0].value) return

    setLoading(true)
    try {
      const user = await lastfmClient.user.getInfo(inputs[0].value)

      setError((s) => ({
        show: false,
        text: s.text
      }))
      setUser(user)
      if (formRef.current) {
        animate(
          formRef.current,
          {
            opacity: 0,
            x: -80
          },
          {
            easing: 'ease-out',
            duration: 0.4
          }
        ).finished.then(() => {
          setStep(DataResolveStep.USER_CONFIRM)
        })
      }
    } catch (err) {
      if (err instanceof LastfmError) {
        console.log(err, err.error)
        if (err.error === LastfmErrorCode.INVALID_PARAMETER) {
          setError({
            show: true,
            text: t('errors.user_not_found')
          })
        } else {
          console.error(err)
          setError({
            show: true,
            text: t('errors.generic')
          })
        }
      }
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (step === DataResolveStep.USER_INPUT && formRef.current) {
      animate(
        formRef.current,
        {
          opacity: [0, 1],
          x: [-100, 0]
        },
        {
          easing: 'ease-out',
          duration: 0.4
        }
      ) 
    }
  }, [])

  return (
    <Centered pointerEvents>
      <form onSubmit={handleSubmit} ref={formRef}>
        <div
          style={{
            marginLeft: -15
          }}
        >
          <Collapse isOpened={!!error.show}>
            <ErrorAlert>
              <WarnIcon />
              {error.text}
            </ErrorAlert>
          </Collapse>
        </div>
        <Flex
          column
          alignItemsCenter
          style={{
            // ...sheetObjectValuesToStyle(startValues),
            display: 'flex',
            width: '100vw',
            maxWidth: '260px'
          }}
        >
          <UserTextInput
            name="user"
            placeholder={t('begin.lastfm_user') || ''}
          />
          <Button disabled={loading} type="submit">
            {t('common.continue')}
          </Button>
        </Flex>
      </form>
    </Centered>
  )
}
