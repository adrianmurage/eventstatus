import Header from '@/components/Header/Header';
import SignIn from '../../components/SignIn/SignIn';

export default function signin() {
  return (
    <>
      <Header />
      <div className="container max-w-xs mx-auto mt-20">
        <SignIn />
      </div>
    </>
  );
}
