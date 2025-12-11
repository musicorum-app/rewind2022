import styled from '@emotion/styled'
import { useTranslation } from 'react-i18next'
import { FiChevronsDown, FiX } from 'react-icons/fi'
import Dialog from './Dialog'

const DialogContent = styled.div`
  text-align: center;
  position: relative;

  & h2 {
    margin: 0 0 0.8em 0;
  }

  & p {
    margin: 0.4em;
  }
`

const LanguageSelect = styled.button<{ selected: boolean }>`
  width: 100%;
  background: ${(p) => (p.selected ? 'rgb(255 255 255 / 6%)' : 'transparent')};
  border: none;
  padding: 10px;
  font-size: 1em;
  cursor: pointer;
  border-radius: 6px;
  transition: 100ms ease-in-out;
  border-left: 6px solid
    rgb(255 255 255 / ${(p) => (p.selected ? '12%' : '0%')});

  &:hover {
    background: rgb(255 255 255 / 12%);
  }
`

const CloseButton = styled.button`
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 32px;
  padding: 5px;
  border: none;
  background: transparent;
  transition: background 150ms ease-in-out;
  cursor: pointer;
  position: absolute;
  top: 0;
  right: 0;

  &:hover {
    background: rgb(255 255 255 / 10%);
  }

  & svg {
    width: 90%;
    height: 90%;
    & * {
      fill: white;
    }
  }
`

interface LanguageSelectorProps {
  open: boolean
  onClose: () => void
}

const languages = {
  'pt-BR': 'Português',
  'en-US': 'English',
  'es-ES': 'Español'
}

export function LanguageSelector({ open, onClose }: LanguageSelectorProps) {
  const { t, i18n } = useTranslation()

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogContent>
        <h2>{t('common.select_language')}</h2>

        {Object.entries(languages).map(([key, name]) => (
          <LanguageSelect
            selected={key === i18n.language}
            onClick={() => i18n.changeLanguage(key)}
          >
            {name}
          </LanguageSelect>
        ))}
        <CloseButton onClick={onClose}>
          <FiX />
        </CloseButton>
      </DialogContent>
    </Dialog>
  )
}
