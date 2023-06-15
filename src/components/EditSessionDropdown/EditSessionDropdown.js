import { Menu, Transition } from "@headlessui/react";
import {
  DotsHorizontalIcon,
  Pencil2Icon,
  TrashIcon,
} from "@radix-ui/react-icons";
import { useRouter } from "next/router";
import { Fragment } from "react";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function EditSessionDropdown({ sessionID }) {
  const router = useRouter();
  const deleteDocument = async () => {
    const res = await fetch(`/api/sessions?sessionId=${sessionID}`, {
      method: "DELETE",
    });
    router.reload();
  };
  return (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        <Menu.Button className="">
          <DotsHorizontalIcon className="w-10 h-7" />
        </Menu.Button>
      </div>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-black bg-opacity-80 drop-shadow-orange ring-1 ring-black ring-opacity-5 focus:outline-none font-bold cursor-pointer">
          <div className="py-1">
            <Menu.Item>
              {({ active }) => (
                <div
                  onClick={() =>
                    window[`edit_session_${sessionID}_modal`].showModal()
                  }
                  className={classNames(
                    active ? "bg-orange text-white" : "text-white",
                    "block px-4 py-2 text-sm"
                  )}
                >
                  <div className="flex items-center space-x-3">
                    <Pencil2Icon />
                    <span>Edit</span>
                  </div>
                </div>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <a
                  href="#"
                  className={classNames(
                    active ? "bg-red-500 text-white" : "text-white",
                    "block px-4 py-2 text-sm"
                  )}
                >
                  <div
                    className="flex items-center space-x-3"
                    onClick={deleteDocument}
                  >
                    <TrashIcon />
                    <span>Delete</span>
                  </div>
                </a>
              )}
            </Menu.Item>
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
}
