import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

type User = {
  displayName: string
  email: string
  profileImg: string
}

function App() {
  const [user, setUser] = useState({} as User)
  const [password, setPassword] = useState('')
  const [email, setEmail] = useState('')
  const [displayName, setDisplayName] = useState('')
  const [profileImage, setProfileImage] = useState('')

  const headers = {
    'content-type': 'application/json',
    apikey: 'KDT5_nREmPe9B',
    username: 'KDT5_Summak6Jo',
  }
  async function signUp(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    console.log('sign up')
    try {
      const res = await fetch(
        'https://asia-northeast3-heropy-api.cloudfunctions.net/api/auth/signup',
        {
          method: 'POST',
          headers,
          body: JSON.stringify({
            email,
            password,
            displayName,
            profileImgBase64: profileImage,
          }),
        }
      )
      const json = await res.json()
      localStorage.setItem('token', json.accessToken)
      console.log('회원가입 성공 : ', json)
    } catch (err) {
      console.error(err)
    }
  }
  async function signIn(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    console.log('sign up')
    try {
      const res = await fetch(
        'https://asia-northeast3-heropy-api.cloudfunctions.net/api/auth/login',
        {
          method: 'POST',
          headers,
          body: JSON.stringify({
            email,
            password,
          }),
        }
      )
      const json = await res.json()
      localStorage.setItem('token', json.accessToken)

      console.log('로그인 성공 : ', json)

      setUser(json.user)
    } catch (err) {
      console.error(err)
    }
  }
  async function authenticate() {
    const res = await fetch(
      'https://asia-northeast3-heropy-api.cloudfunctions.net/api/auth/me',
      {
        method: 'POST',
        headers: {
          ...headers,
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      }
    )

    const json = await res.json()
    console.log('미들웨어 동작! : ', json)
  }
  async function logout(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    e.preventDefault()
    const res = await fetch(
      'https://asia-northeast3-heropy-api.cloudfunctions.net/api/auth/logout',
      {
        method: 'POST',
        headers: {
          ...headers,
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      }
    )
    const json = await res.json()
    localStorage.removeItem('token')
    console.log('로그아웃 성공 : ', json)
  }
  async function uploadImage(event: React.ChangeEvent<HTMLInputElement>) {
    //
    const files = event.target.files as FileList
    for (const file of files) {
      const reader = new FileReader()
      reader.readAsDataURL(file)
      reader.addEventListener('load', async (ev: ProgressEvent<FileReader>) => {
        setProfileImage(ev.target?.result as string)
      })
    }
  }
  async function getBanks() {
    const res = await fetch(
      'https://asia-northeast3-heropy-api.cloudfunctions.net/api/account/banks',
      {
        method: 'GET',
        headers: {
          ...headers,
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      }
    )
    const json = await res.json()
    console.log('get banks : ', json)
  }

  async function getAccounts() {
    const res = await fetch(
      ' https://asia-northeast3-heropy-api.cloudfunctions.net/api/account',
      {
        method: 'GET',
        headers: {
          ...headers,
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      }
    )
    const json = await res.json()
    console.log('등록된 계좌를 확인해보세요! : ', json)
  }

  async function connectAccount() {
    try {
      const res = await fetch(
        'https://asia-northeast3-heropy-api.cloudfunctions.net/api/account',
        {
          method: 'POST',
          headers: {
            ...headers,
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
          body: JSON.stringify({
            bankCode: '088', // 신한은행
            accountNumber: '123456789012',
            phoneNumber: '01012345678',
            signature: true, // 사인 필수 동의
          }),
        }
      )

      const json = await res.json()
      console.log('계좌 등록 : ', json)
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <>
      {user.displayName && <h1>{user.displayName}</h1>}
      {user.email && <p>{user.email}</p>}
      {user.profileImg && <img src={user.profileImg} alt='profile' />}
      <form onSubmit={signUp}>
        <input
          type='text'
          defaultValue={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder='Email'
        />
        <input
          type='text'
          defaultValue={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder='password'
        />
        <input type='file' onChange={uploadImage} />
        <input
          type='text'
          defaultValue={displayName}
          onChange={(e) => setDisplayName(e.target.value)}
          placeholder='displayName'
        />
        <input type='submit' value='Sign up' />
      </form>
      <button type='button' value='Sign up' onClick={authenticate}>
        Authenticate check
      </button>
      <form onSubmit={signIn}>
        <input
          type='text'
          defaultValue={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder='Email'
        />
        <input
          type='text'
          defaultValue={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder='password'
        />
        <input type='submit' value='Sign In' />
      </form>
      <button onClick={logout}>logout</button>
      <div>
        <button type='button' onClick={getBanks}>
          사용 가능한 은행 목록
        </button>
      </div>
      <div>
        <button type='button' onClick={getAccounts}>
          내 계좌 목록
        </button>
      </div>
      <div>
        <button type='button' onClick={connectAccount}>
          신한 카드 연결하기!
        </button>
      </div>
    </>
  )
}

export default App

// peacepiece7@naver.com
// 12345678
// foo

// localstorage 24시간 마다 accessToken이 무효화 됨

// localstorage에 저장해서 로그인 상태 유지
// cookie에 만료일 같이 넣는게 좋지 않을까..
// 쿠키는 용량이 적고, 용도에 맞지 않다고함, 세션은 꺼지면 사라짐
