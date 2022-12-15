import styled from '@emotion/styled'
import Flex from '@react-css/flex'
import { useTranslation } from 'react-i18next'
import { LoadingIndicator } from '../../components/LoadingIndicator'
import { PlaylistData } from './common'

const Container = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;

  & h2 {
    margin: 0.3em;
  }

  & p {
    color: rgba(255, 255, 255, 0.7);
    font-size: 0.95em;
  }

  & iframe {
    height: 500px;
  }

  @media only screen and (max-height: 800px) {
    & iframe {
      height: 400px;
    }
  }

  @media only screen and (max-height: 700px) {
    & iframe {
      height: 152px;
    }
  }
`

interface DialogContentProps {
  loading: boolean
  error: string | null
  playlist: PlaylistData | null
}

export function DialogContent(props: DialogContentProps) {
  console.log(JSON.stringify(props.playlist))
  const { t } = useTranslation()

  if (props.loading) {
    return (
      <Flex justifyCenter>
        <LoadingIndicator />
      </Flex>
    )
  } else if (props.error) {
    return <span>Something went wrong</span>
  } else if (props.playlist) {
    const { missingTracks } = props.playlist
    const embedUrl =
      props.playlist.service === 'spotify'
        ? `https://open.spotify.com/embed/playlist/${props.playlist.id}`
        : `https://widget.deezer.com/widget/dark/playlist/${props.playlist.id}`

    return (
      <Container>
        <h2>{t('playlist.created.title')}</h2>
        {missingTracks.length > 0 && (
          <p>
            {t('playlist.created.missing', {
              count: missingTracks.length,
              service: props.playlist.service,
              names: missingTracks.join(', ')
            })}
          </p>
        )}

        <iframe
          src={embedUrl}
          width="100%"
          height="100%"
          frameBorder="0"
          allowTransparency={true}
          allow="encrypted-media"
        />
      </Container>
    )
  } else {
    return null
  }
}
