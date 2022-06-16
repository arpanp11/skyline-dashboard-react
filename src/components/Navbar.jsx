import React, { useEffect } from 'react';
import { AiOutlineMenu } from 'react-icons/ai';
import { FiShoppingCart } from 'react-icons/fi';
import { BsChatLeft } from 'react-icons/bs';
import { RiNotification3Line } from 'react-icons/ri';
import { MdKeyboardArrowDown } from 'react-icons/md';
import { TooltipComponent } from '@syncfusion/ej2-react-popups';

import avatar from '../data/avatar.jpg';
import { useStateContext } from '../contexts/ContextProvider';
import { Cart, Chat, Notification, UserProfile } from '.';

// nav button component
const NavButton = ({ title, customFn, icon, color, dotColor }) => (
  <TooltipComponent content={title} position='BottomCenter'>
    <button
      type='button'
      onClick={customFn}
      style={{ color }}
      className='relative text-xl rounded-full p-3 hover:bg-light-gray'
    >
      <span
        style={{ background: dotColor }}
        className='absolute inline-flex rounded-full h-2 w-2 right-2 top-2'
      />
      {icon}
    </button>
  </TooltipComponent>
);

const Navbar = () => {
  const {
    activeMenu,
    setActiveMenu,
    isClicked,
    setIsClicked,
    menuClickHandler,
    screenSize,
    setScreenSize,
    currentColor,
  } = useStateContext();

  // find out the screen size
  useEffect(() => {
    const handleResize = () => setScreenSize(window.innerWidth);

    // when we use addEventListener, we need to remove it when we unmount
    window.addEventListener('resize', handleResize);

    handleResize();

    // clean up the event listener
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (screenSize <= 900) {
      setActiveMenu(false);
    } else {
      setActiveMenu(true);
    }
  }, [screenSize]);

  const activeMenuHandler = () => {};

  return (
    <div className='flex justify-between p-2 md:mx-6 relative'>
      {/* menu */}
      <NavButton
        title='Menu'
        customFn={() => setActiveMenu((prevActiveMenu) => !prevActiveMenu)}
        color={currentColor}
        icon={<AiOutlineMenu />}
      />

      <div className='flex'>
        {/* cart */}
        <NavButton
          title='Cart'
          customFn={() => menuClickHandler('cart')}
          color={currentColor}
          icon={<FiShoppingCart />}
        />
        {/* chat */}
        <NavButton
          title='Chat'
          dotColor='#03c9d7'
          customFn={() => menuClickHandler('chat')}
          color={currentColor}
          icon={<BsChatLeft />}
        />
        {/* notification */}
        <NavButton
          title='Notification'
          dotColor='#03c9d7'
          customFn={() => menuClickHandler('notification')}
          color={currentColor}
          icon={<RiNotification3Line />}
        />
        {/* profile */}
        <TooltipComponent content='Profile' position='BottomCenter'>
          <div
            className='flex items-center gap-2 cursor-pointer p-1 hover:bg-light-gray rounded-lg'
            onClick={() => menuClickHandler('userProfile')}
          >
            <img src={avatar} className='w-8 h-8 rounded-full' />
            <p>
              <span className='text-gray-400 text-14'>Hi, </span>
              {''}
              <span className='text-gray-400 font-bold text-14 ml-1'>Dizy</span>
            </p>
            <MdKeyboardArrowDown className='text-gray-400 text-14' />
          </div>
        </TooltipComponent>

        {isClicked.cart && <Cart />}
        {isClicked.chat && <Chat />}
        {isClicked.notification && <Notification />}
        {isClicked.userProfile && <UserProfile />}
      </div>
    </div>
  );
};

export default Navbar;
