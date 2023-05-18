import React from 'react'
import { lazy } from '@loadable/component'
const FastMainTitle = lazy(() => import('./FastMainTitle'))

export default function Main() {
  return (
    <div>
      <h1>MAIN페이지 입니다!</h1>
      <FastMainTitle />
    </div>
  )
}
