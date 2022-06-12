import {
  NavLink
} from 'react-router-dom';
import { VscMenu } from 'react-icons/vsc';
import classNames from 'classnames';
import { SideMenuProps } from '../../types/interfaces';
import SideMenuItemView from '../SideMenuItemView';

const SideMenu = ({items, isOpen, handleOnClick}: SideMenuProps) => {
  const logo = <svg version="1.1" id="Wazuh-logo" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"viewBox="0 0 14.4 14.4" fill="#fff">
    <path d="M7.2,0.2c-3.8,0-7,3.2-7,7s3.1,7,7,7s7-3.1,7-7S11,0.2,7.2,0.2z M7.6,9.8L6.4,6L5.2,9.8H4.3L2.7,4.5h1l1.1,3.6l1.1-3.6h0.9
      l1.1,3.6L9,4.5h1L8.5,9.8H7.6z M10.8,9.9c-0.5,0-0.8-0.4-0.8-0.8c0-0.5,0.4-0.8,0.8-0.8s0.8,0.4,0.8,0.8C11.6,9.5,11.3,9.9,10.8,9.9
      z"/>
  </svg>
  return (
    <nav className={classNames("SideMenu", {"SideMenu-collapsed": !isOpen})}>
      <div className="SideMenu__button">
        <button className="SideMenu__button-icon" onClick={handleOnClick}>
          <VscMenu />
        </button>
      </div>
      <NavLink to="/" className={classNames("SideMenu__logo", {"SideMenu__logo-collapsed": !isOpen})} children={logo}></NavLink>
      {
        items.map(item => (
          <NavLink to={item.url} children={<SideMenuItemView key={item.id} item={item} isOpen={isOpen} />}></NavLink>
        ))
      }
    </nav>
  );
};

export default SideMenu;
