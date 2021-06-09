import Router from 'next/router'
import MainLayout from '../components/layouts/mainLayout'

export default function Karaoke() {
  const toHomeHandler = () => {
    Router.push('/')
  }
  return (
    <MainLayout title={'Караоке'}>
      <h1>Karaoke</h1>
      <button onClick={toHomeHandler}>Go to home</button>
      <button onClick={() => Router.push('/reviews')}>
        Go to home reviews
      </button>
    </MainLayout>
  )
}
