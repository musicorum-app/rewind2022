import Flex from '@react-css/flex'
import Centered from '@rewind/core/src/components/Centered'
import { ResolveStep, StatusUpdatePayload } from '@rewind/resolver'
import { motion, AnimatePresence } from 'framer-motion'
import { Collapse } from 'react-collapse'
import { Trans, useTranslation } from 'react-i18next'
import ProgressBar from '../../components/ProgressBar'
import { DataResolveStep, useDataResolve } from './useDataResolve'
import { ReactComponent as WarnIcon } from '../../assets/icons/warn.svg'
import Button from '../../components/Button'

function parseStatus(status: StatusUpdatePayload) {
  let value = 0
  let title = 'loading.generic'
  let subTitle = null as string | null

  if (status.step === ResolveStep.FETCHING_PAGES) {
    title = 'loading.fetching_pages'
    subTitle = `${status.value}/${status.maxValue}`
  } else if (status.step === ResolveStep.FETCHING_RESOURCES) {
    title = 'loading.fetching_resources'
    subTitle = `loading.wait`
  } else if (status.step === ResolveStep.FINALIZING) {
    title = 'loading.drawing'
    subTitle = `loading.wait`
  }
  value =
    status.value && status.maxValue ? (status.value / status.maxValue) * 100 : 0

  console.log({ value, title, subTitle })
  return { value, title, subTitle }
}

export default function UserLoading() {
  const [loadingStatus, error, setError, setStep] = useDataResolve((s) => [
    s.loadingStatus,
    s.error,
    s.setError,
    s.setStep
  ])

  const { value, title, subTitle } = parseStatus(loadingStatus)

  const { t } = useTranslation()

  const tryAgain = () => {
    setError(null)
    setStep(DataResolveStep.USER_CONFIRM)
  }

  return (
    <Centered pointerEvents>
      <div
        style={{
          maxWidth: 350,
          width: '100%'
        }}
      >
        <Collapse isOpened={!!error}>
          <Flex column alignItemsCenter>
            <WarnIcon width={40} height={40} />
            <h4
              style={{
                textAlign: 'center'
              }}
            >
              {error?.includes('private_scrobbles') ? (
                <Trans
                  i18nKey="errors.private_scrobbles"
                  components={[
                    <a
                      href="https://www.last.fm/settings/privacy"
                      target="_blank"
                      rel="noopener noreferrer"
                    ></a>
                  ]}
                />
              ) : (
                t(error ?? 'errors.generic')
              )}
            </h4>
            <Button
              style={{
                marginTop: 10,
                display: 'block'
              }}
              onClick={tryAgain}
            >
              {t('common.try_again')}
            </Button>
          </Flex>
        </Collapse>
        <Collapse isOpened={!error}>
          <h3>{t(title)}</h3>

          <p
            style={{
              marginBottom: 6
            }}
          >
            {subTitle?.includes('loading.') ? t(subTitle) : subTitle}
          </p>

          <ProgressBar value={value} />
          <p
            style={{
              fontSize: 14,
              opacity: 0.9
            }}
          >
            {t('loading.note')}
          </p>
        </Collapse>
      </div>
    </Centered>
  )
}
