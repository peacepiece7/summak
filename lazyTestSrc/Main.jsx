import React, { Suspense } from 'react'
const FastMainTitle = React.lazy(() => import('./FastMainTitle'))
import Loading from './Loading'

export default function Main() {
  return (
    <div>
      <h1>MAIN페이지 입니다!</h1>
      <Suspense fallback={<Loading />}>
        <FastMainTitle></FastMainTitle>
      </Suspense>
    </div>
  )
}
