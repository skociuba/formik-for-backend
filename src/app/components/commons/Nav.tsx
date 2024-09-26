'use client';
import Link from 'next/link';
import React, {useState, useEffect} from 'react';
import {AiOutlineMenu, AiOutlineClose} from 'react-icons/ai';

const Nav = () => {
  const [nav, setNav] = useState(false);
  const [color, setColor] = useState('transparent');
  const [textColor, setTextColor] = useState('white');

  const handleNav = () => {
    setNav(!nav);
  };

  useEffect(() => {
    const changeColor = () => {
      if (window.scrollY >= 90) {
        setColor('white');
        setTextColor('#000000');
      } else {
        setColor('transparent');
        setTextColor('white');
      }
    };
    window.addEventListener('scroll', changeColor);
  }, []);

  return (
    <nav
      style={{backgroundColor: `${color}`}}
      className="fixed left-0 top-0 z-10 w-full duration-300 ease-in">
      <div className="m-auto flex max-w-[1240px] items-center justify-between p-4 text-white">
        <h1 style={{color: `${textColor}`}} className="mt-3 text-5xl font-bold">
        </h1>
        <ul style={{color: `${textColor}`}} className="hidden sm:flex">
          <li className="p-4">
            <Link href="/#home">Home</Link>
          </li>
          <li className="p-4">
            <Link href="/#first">First section</Link>
          </li>
          <li className="p-4">
            <Link href="/#second">Second section</Link>
          </li>
          <li className="p-4">
            <Link href="/example">Example</Link>
          </li>
        
        </ul>

        {/* Mobile Button */}
        <div onClick={handleNav} className="z-10 block sm:hidden">
          {nav ? (
            <AiOutlineClose size={20} style={{color: `${textColor}`}} />
          ) : (
            <AiOutlineMenu size={20} style={{color: `${textColor}`}} />
          )}
        </div>
        {/* Mobile Menu */}
        <div
          className={
            nav
              ? 'absolute bottom-0 left-0 right-0 top-0 flex h-screen w-full items-center justify-center bg-black text-center duration-300 ease-in sm:hidden'
              : 'absolute bottom-0 left-[-100%] right-0 top-0 flex h-screen w-full items-center justify-center bg-black text-center duration-300 ease-in sm:hidden'
          }>
          <ul>
            <li
              onClick={handleNav}
              className="p-4 text-4xl hover:text-gray-500">
              <Link href="/">Home</Link>
            </li>
            <li
              onClick={handleNav}
              className="p-4 text-4xl hover:text-gray-500">
              <Link href="/#first">First section</Link>
            </li>
            <li
              onClick={handleNav}
              className="p-4 text-4xl hover:text-gray-500">
              <Link href="/#second">Second section</Link>
            </li>
            <li
              onClick={handleNav}
              className="p-4 text-4xl hover:text-gray-500">
              <Link href="/example">Example</Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Nav;
