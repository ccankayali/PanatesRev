import React from "react";
import { Link } from "react-router-dom";
import {
  BsGrid1X2Fill,
  BsFillArchiveFill,
  BsFillGrid3X3GapFill,
  BsPeopleFill,
  BsMenuButtonWideFill,
  BsFillGearFill,
} from "react-icons/bs";

interface SidebarProps {
  openSidebarToggle: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({ openSidebarToggle }) => {
  return (
    <aside
      id="sidebar"
      className={openSidebarToggle ? "sidebar-responsive" : ""}
    >
      <div className="sidebar-title">
        <div className="sidebar-brand">
          <img
            src="https://avatars.githubusercontent.com/u/27950435?s=200&v=4"
            alt="Panates Logo"
            className="icon_header"
          />{" "}
          PANATES
        </div>
      </div>

      <ul className="sidebar-list">
        <li className="sidebar-list-item">
          <Link to="/provider" className="sidebar-link">
            <button className="sidebar-button">
              <BsGrid1X2Fill className="icon" /> Dashboard
            </button>
          </Link>
        </li>
        <li className="sidebar-list-item">
          <Link to="/services" className="sidebar-link">
            <button className="sidebar-button">
              <BsFillArchiveFill className="icon" /> Services
            </button>
          </Link>
        </li>
        <li className="sidebar-list-item">
          <Link to="/categories" className="sidebar-link">
            <button className="sidebar-button">
              <BsFillGrid3X3GapFill className="icon" /> Categories
            </button>
          </Link>
        </li>
        <li className="sidebar-list-item">
          <Link to="/customers" className="sidebar-link">
            <button className="sidebar-button">
              <BsPeopleFill className="icon" /> Customers
            </button>
          </Link>
        </li>
        <li className="sidebar-list-item">
          <Link to="/comments" className="sidebar-link">
            <button className="sidebar-button">
              <BsMenuButtonWideFill className="icon" /> Comments
            </button>
          </Link>
        </li>
        <li className="sidebar-list-item">
          <Link to="/settings" className="sidebar-link">
            <button className="sidebar-button">
              <BsFillGearFill className="icon" /> Settings
            </button>
          </Link>
        </li>
      </ul>
    </aside>
  );
};

export default Sidebar;
