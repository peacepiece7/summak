import React from 'react'

function LargeTitle() {
  console.log('계산 중 1 ...')
  for (let i = 0; i < 10e8; i++) {
    i++
    i--
  }
  console.log('계산 끝 1')

  console.log('계산 중 2 ...')
  for (let i = 0; i < 10e8; i++) {
    i++
    i--
  }
  console.log('계산 끝 2')

  return <div>Title</div>
}

export default LargeTitle
