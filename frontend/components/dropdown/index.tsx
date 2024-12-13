import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { ReactNode } from "react";
import { BiDownArrow } from "react-icons/bi";

type ButtonProps = {
  children: ReactNode | string;
  className?: string;
};
const Button = ({ children, className }: ButtonProps) => {
  return <MenuButton className={className}>{children}</MenuButton>;
};

const Items = ({ children }: { children: ReactNode }) => (
  <MenuItems
    transition
    anchor="bottom end"
    className="z-[5000] w-52 origin-top-right rounded-xl border bg-white p-1 text-sm/6 text-gray-400 shadow-md transition duration-100 ease-out [--anchor-gap:var(--spacing-1)] focus:outline-none data-[closed]:scale-95 data-[closed]:opacity-0"
  >
    {children}
  </MenuItems>
);
const Item = ({ children }: { children: ReactNode }) => (
  <MenuItem>{children}</MenuItem>
);

const Dropdown = ({ children }: { children: ReactNode }) => {
  return (
    <div className="inline-flex items-center">
      <Menu>{children}</Menu>
    </div>
  );
};

Dropdown.Button = Button;
Dropdown.Items = Items;
Dropdown.Item = Item;

export default Dropdown;
