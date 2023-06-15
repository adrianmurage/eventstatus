import { UseUser } from '@/hooks/User';
import React from 'react';
import LogOut from '../LogOut/LogOut';

function Header() {
  const [navbarOpen, setNavbarOpen] = React.useState(false);
  const { user, loading } = UseUser();

  return (
    <>
      <div className="fixed top-0 w-full z-30 clearNav md:bg-white/90	 md:bg-opacity-90 transition duration-300 ease-in-out">
        <div className="flex flex-col px-4 pt-4 mx-auto md:items-baseline md:justify-between md:flex-row md:px-6 lg:px-8">
          <div className="flex flex-row items-center justify-between">
            <a
              href="/"
              className="text-lg font-semibold rounded-lg tracking-widest focus:outline-none focus:shadow-outline"
            >
              <h1 className="text-4xl tracking-tighter text-gray-900 md:text-4x1 lg:text-3xl">
                EventStatus
              </h1>
            </a>
            <button
              className="text-white cursor-pointer leading-none px-3 py-1 md:hidden outline-none focus:outline-none "
              type="button"
              aria-label="button"
              onClick={() => setNavbarOpen(!navbarOpen)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#191919"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="feather feather-menu"
              >
                <line x1="3" y1="12" x2="21" y2="12"></line>
                <line x1="3" y1="6" x2="21" y2="6"></line>
                <line x1="3" y1="18" x2="21" y2="18"></line>
              </svg>
            </button>
          </div>
          <div
            className={
              'md:flex flex-grow items-center pb-4' +
              (navbarOpen ? ' flex' : ' hidden')
            }
          >
            <nav className="flex-col flex-grow ">
              <ul className="flex flex-grow justify-end flex-wrap items-center">
                {!user && !loading && (
                  <>
                    <li>
                      <a
                        href="https://hashnode.com/"
                        className="font-medium text-gray-600 hover:text-gray-900 px-5 py-3 flex items-center transition duration-150 ease-in-out"
                      >
                        About Us
                      </a>
                    </li>
                    <li>
                      <a
                        className="inline-flex items-center px-4 py-2 mt-2 font-medium text-white transition duration-500 ease-in-out transform rounded-lg text-md md:mt-0 md:ml-4 bg-orange"
                        href="/auth/signin"
                      >
                        <span className="justify-center">Sign In</span>
                        <svg
                          className="w-3 h-3 fill-current  flex ml-2 -mr-1"
                          viewBox="0 0 12 12"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M11.707 5.293L7 .586 5.586 2l3 3H0v2h8.586l-3 3L7 11.414l4.707-4.707a1 1 0 000-1.414z"
                            fillRule="nonzero"
                          />
                        </svg>
                      </a>
                    </li>
                  </>
                )}
                {user && !loading && (
                  <>
                    <li>
                      <a
                        href="/dashboard"
                        className="font-medium text-gray-600 hover:text-gray-900 px-5 py-3 flex items-center transition duration-150 ease-in-out"
                      >
                        Dashboard
                      </a>
                    </li>
                    <li>
                      <LogOut />
                    </li>
                  </>
                )}
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </>
  );
}

export default Header;
