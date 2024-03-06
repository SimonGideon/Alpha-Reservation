import { useState, useEffect, useCallback } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { HiOutlineMenuAlt4 } from 'react-icons/hi';
import { IoMdClose } from 'react-icons/io';
import { links } from '../constants';

const Navbar = () => {
  const [open, setOpen] = useState(true);
  const location = useLocation();

  const openMenu = () => {
    setOpen(!open);
    const nav = document.querySelector('nav');
    nav.style.display = 'flex';
  };

  const closeMenu = useCallback(() => {
    setOpen(!open);
    if (window.innerWidth < 1340) {
      const nav = document.querySelector('nav');
      nav.style.display = 'none';
      nav.style.position = 'absolute';
    }
  }, [open]);

  useEffect(() => {
    closeMenu();
    setOpen(true);
  }, [location, closeMenu]);

  useEffect(() => {
    const mediaQuery1 = window.matchMedia('(min-width: 1340px)');

    const handleMediaQueryChange = (event) => {
      if (event.matches) {
        const nav = document.querySelector('nav');
        nav.style.display = 'flex';
        nav.style.position = 'static';
      }
    };

    mediaQuery1.addEventListener('change', handleMediaQueryChange);

    return () => {
      mediaQuery1.removeEventListener('change', handleMediaQueryChange);
    };
  }, []);

  useEffect(() => {
    const mediaQuery1 = window.matchMedia('(max-width: 1340px)');

    const handleMediaQueryChange = (event) => {
      if (event.matches) {
        const nav = document.querySelector('nav');
        nav.style.display = 'none';
        setOpen(true);
      }
    };

    mediaQuery1.addEventListener('change', handleMediaQueryChange);

    return () => {
      mediaQuery1.removeEventListener('change', handleMediaQueryChange);
    };
  }, []);

  return (
    <>
      {open ? (
        <HiOutlineMenuAlt4
          id="menu"
          size={30}
          className="absolute z-20 top-8 left-8 xl:hidden cursor-pointer"
          onClick={openMenu}
        />
      ) : (
        <IoMdClose
          id="close"
          size={30}
          className="xl:hidden z-20 absolute top-4 left-52 cursor-pointer"
          onClick={closeMenu}
        />
      )}
      <nav className={`${window.innerWidth < 1340 ? 'absolute' : 'static'} bg-white z-10 w-1/6 min-w-[250px] max-w-[280px] h-screen flex-col p-2 pl-6 pt-28 border-r-2 hidden xl:flex`}>
        <div className="w-1/4">
          <h1 className="font-kaushan text-3xl font-bold -rotate-12 mb-20 pl-4 underline decoration-4 underline-offset-4">Alpha Reservations</h1>
        </div>
        <ul className="flex flex-col w-full justify-evenly gap-5">
          {links.map((link) => (
            <button
              type="button"
              className="w-[210px] flex justify-start"
              key={link.text}
            >
              <NavLink
                to={link.path}
                onClick={() => {
                  closeMenu();
                }}
                style={({ isActive }) => ({
                  backgroundColor: isActive ? '#97bf0f' : '#fff',
                  color: isActive ? '#fff' : '#000',
                })}
                className="text-start w-full text-xl font-black py-2 px-2 uppercase"
              >
                {link.text}
              </NavLink>
            </button>
          ))}
        </ul>
      </nav>
    </>
  );
};

export default Navbar;
