import React from "react";
import Image from "next/image";
import avatar from "../public/avatar.png";
import Link from "next/link";
import logo from "../public/valor1.png";

const Navbar = () => {
  return (
    <>
      <div className="navbar bg-base-100 px-10">
        <div className="flex-1">
          <Link href="/">
            <a className="btn btn-ghost normal-case text-xl justify-center gap-3">
              <Image src={logo} alt="logo" width={35} height={35} />
              <p className="text-xl">Pokedex</p>
            </a>
          </Link>
        </div>
        <div className="flex-none gap-2">
          <div className="dropdown dropdown-end mt-1">
            <label tabIndex="0" className="btn btn-ghost btn-circle avatar">
              <div className="w-10 rounded-full">
                <Image src={avatar} alt="avatar" width={"80px"} height={"80px"} />
              </div>
            </label>
            <ul tabIndex="0" className="mt-3 p-2 shadow menu menu-compact dropdown-content bg-base-100 rounded-box w-52">
              <li>
                <a className="justify-between">
                  Profile
                  <span className="badge">New</span>
                </a>
              </li>
              <li>
                <a>Settings</a>
              </li>
              <li>
                <a>Logout</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
