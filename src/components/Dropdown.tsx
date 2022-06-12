import React, { Fragment, useState } from "react";
import { Menu, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/solid";

// Components
import LoadingSpinner from "./LoadingSpinner";

// Utils
import { classNames } from "../utils/style.util";

interface DropdownProps<T> {
  name: string;
  items: T[];
  loading: boolean;
  onSelect: (item: T) => void;
}

const Dropdown = ({ name, items, loading, onSelect }: DropdownProps<any>) => {
  const [selectedId, setSelectedId] = useState<number>(0);

  const getItemName = (index: number): any => {
    return items[index - 1].name;
  };

  const onClickItem = (index: number) => {
    setSelectedId(index);
    onSelect(items[index - 1]);
  };

  return (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        <Menu.Button className="inline-flex justify-center w-full rounded-md bg-wgreen-400 px-4 py-2 text-sm text-white font-medium  focus:outline-none focus:right-0 focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-wgreen-500">
          {selectedId !== 0 ? getItemName(selectedId) : `All ${name}`}
          <div className="-mr-1 ml-2 h-5 w-5">
            {loading ? (
              <LoadingSpinner />
            ) : (
              <ChevronDownIcon aria-hidden="true" />
            )}
          </div>
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
        <Menu.Items className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="py-1">
            <Menu.Item key={0}>
              {({ active }) => (
                <span
                  className={classNames(
                    active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                    "block px-4 py-2 text-sm cursor-pointer"
                  )}
                  onClick={() => onClickItem(0)}
                >
                  All {name}
                </span>
              )}
            </Menu.Item>
            {items &&
              items.map((item, index) => (
                <Menu.Item key={index + 1}>
                  {({ active }) => (
                    <span
                      className={classNames(
                        active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                        "block px-4 py-2 text-sm cursor-pointer"
                      )}
                      onClick={() => onClickItem(index + 1)}
                    >
                      {item.name}
                    </span>
                  )}
                </Menu.Item>
              ))}
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
};

export default Dropdown;
