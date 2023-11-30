import styled from '@emotion/styled'
import { LastfmUserInfo } from '@musicorum/lastfm/dist/types/packages/user'
import {
  getImage,
  ImageType,
  imageTypeDefaultImages
} from '../../modules/lastfmImage'
import { Image } from '@chakra-ui/image'

const Wrapper = styled.div`
  display: flex;
  width: 100%;
  margin-bottom: 24px;
  align-items: center;

  & img {
    width: 64px;
    height: 64px;
    border-radius: 64px;
  }

  & h2 {
    margin: 0 18px;
  }
`

export interface UserCardProps {
  user: LastfmUserInfo
}

const defaultUserImage = imageTypeDefaultImages[ImageType.USER]

export default function UserCard({ user }: UserCardProps) {
  return (
    <Wrapper>
      <Image src={user.images[3]?.url} fallbackSrc={defaultUserImage} />
      <h2>{user.name}</h2>
    </Wrapper>
  )
}
