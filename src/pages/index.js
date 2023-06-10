import Link from 'next/link';
import card from '../components/card/Card';

export default function Home() {
  return (
    <>
      <Link href="/newEvent">
        <button className="btn">New Event</button>
      </Link>
    </>
  );
}
