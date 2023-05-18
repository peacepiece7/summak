import React from 'react'

export default function SlowProductTitle() {
  console.log('로딩 시작!')
  for (let i = 0; i < 10e8; i++) {
    i = i + 2
    i = i - 2
  }
  console.log('로딩 끝')
  console.log('로딩 시작! 2')
  for (let i = 0; i < 10e8; i++) {
    i = i + 2
    i = i - 2
  }
  console.log('로딩 끝! 2')

  return <div>SLOW PRODUCT TITLE</div>
}
