import Link from 'next/link';

function DashboardHeader() {
  return (
    <>
      <section>
        <div className="max-w-7xl mx-auto px-6 md:px-6 lg:px-8 pt-24 pb-14">
          <div className="flex justify-between items-baseline	">
            <h2 className="text-xl font-bold">Events</h2>
            <Link href="/newEvent">
              <button className="btn capitalize btn-primary text-white">
                <span className="text-2xl"> &#43;</span>
                New Event
              </button>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

export default DashboardHeader;
