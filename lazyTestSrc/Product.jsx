import React, { Suspense } from 'react'
const SlowProductTitle = React.lazy(() => import('./SlowProductTitle'))
import Loading from './Loading'

export default function Product() {
  return (
    <div>
      <h1>Product페이지 입니다!</h1>
      <Suspense fallback={<Loading />}>
        <SlowProductTitle></SlowProductTitle>
      </Suspense>
    </div>
  )
}
