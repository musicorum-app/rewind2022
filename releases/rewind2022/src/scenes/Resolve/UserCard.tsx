import styled from '@emotion/styled'
import { LastfmUserInfo } from '@musicorum/lastfm/dist/types/packages/user'

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

export default function UserCard({ user }: UserCardProps) {
  return (
    <Wrapper>
      <img src={user.images[2].url} />
      <h2>{user.name}</h2>
    </Wrapper>
  )
}
