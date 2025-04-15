import { useState, useRef, useEffect, useContext } from "react";
import { FaSignInAlt, FaUserPlus, FaBars, FaTimes, FaSignOutAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import AuthContext from "../Providers/AuthContext";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const dropdownRefs = useRef({});
  const navbarRef = useRef(null);
  const {user:isLoggedIn, logOut} = useContext(AuthContext);

  // Mock user data
  const user = {
    name: "John Doe",
    email: "john@example.com",
    avatar: "https://randomuser.me/api/portraits/men/1.jpg",
  };

  const toggleDropdown = (dropdown) => {
    setActiveDropdown(activeDropdown === dropdown ? null : dropdown);
  };

  const handleLogout = () => {
    logOut();
  };

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      // Close mobile menu if open
      if (
        isOpen &&
        navbarRef.current &&
        !navbarRef.current.contains(event.target)
      ) {
        setIsOpen(false);
      }

      // Close dropdown if click is outside
      if (activeDropdown) {
        const dropdownElement = dropdownRefs.current[activeDropdown];
        if (dropdownElement && !dropdownElement.contains(event.target)) {
          // Check if we clicked on the dropdown button
          const button = event.target.closest("button");
          if (!button || !button.textContent.includes(activeDropdown)) {
            setActiveDropdown(null);
          }
        }
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [activeDropdown, isOpen]);

  const navItems = [
    {
      name: "Products",
      dropdown: [
        { name: "Product 1", link: "#" },
        { name: "Product 2", link: "#" },
        { name: "Product 3", link: "#" },
      ],
    },
    {
      name: "Services",
      dropdown: [
        { name: "Service 1", link: "#" },
        { name: "Service 2", link: "#" },
        { name: "Premium Service", link: "#" },
      ],
    },
    {
      name: "Company",
      dropdown: [
        { name: "About Us", link: "#" },
        { name: "Team", link: "#" },
        { name: "Contact", link: "#" },
      ],
    },
  ];

  return (
    <nav className="bg-base-200 shadow-lg" ref={navbarRef}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo/Brand */}
          <div className="flex-shrink-0">
            <span className="text-xl font-bold text-primary">YourLogo</span>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-4">
            {navItems.map((item) => (
              <div key={item.name} className="relative">
                <button
                  onClick={() => toggleDropdown(item.name)}
                  className="text-gray-700 hover:text-primary px-3 py-2 rounded-md text-sm font-medium flex items-center"
                >
                  {item.name}
                  <svg
                    className="ml-1 h-4 w-4"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>

                {activeDropdown === item.name && (
                  <div
                    ref={(el) => (dropdownRefs.current[item.name] = el)}
                    className="absolute z-10 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5"
                  >
                    <div className="py-1">
                      {item.dropdown.map((subItem) => (
                        <a
                          key={subItem.name}
                          href={subItem.link}
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                          onClick={() => setActiveDropdown(null)}
                        >
                          {subItem.name}
                        </a>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Auth Section */}
          <div className="hidden md:block">
            {isLoggedIn ? (
              <div className="flex items-center space-x-4">
                <button
                  onClick={handleLogout}
                  className="btn btn-ghost btn-sm flex items-center text-error"
                  title="Logout"
                >
                  <FaSignOutAlt className="mr-1" /> Logout
                </button>

                <div className="dropdown dropdown-end">
                  <div
                    tabIndex={0}
                    className="avatar cursor-pointer tooltip tooltip-bottom"
                    data-tip={user.name}
                  >
                    <div className="w-10 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                      <img src={user.avatar} alt="Profile" />
                    </div>
                  </div>
                  <ul
                    tabIndex={0}
                    className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52 mt-4"
                  >
                    <li className="px-4 py-2 border-b border-gray-200">
                      <div className="text-sm font-medium">{user.name}</div>
                      <div className="text-xs text-gray-500">{user.email}</div>
                    </li>
                    <li>
                      <a>Profile</a>
                    </li>
                    <li>
                      <a>Settings</a>
                    </li>
                    <li>
                      <a onClick={handleLogout}>Logout</a>
                    </li>
                  </ul>
                </div>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <Link
                  to="/auth/login"
                  className="btn btn-ghost btn-sm flex items-center"
                >
                  <FaSignInAlt className="mr-1" /> Login
                </Link>
                <a
                  href="#register"
                  className="btn btn-primary btn-sm flex items-center"
                >
                  <FaUserPlus className="mr-1" /> Register
                </a>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-primary focus:outline-none"
            >
              {isOpen ? (
                <FaTimes className="h-6 w-6" />
              ) : (
                <FaBars className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-base-100">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navItems.map((item) => (
              <div key={item.name} className="relative">
                <button
                  onClick={() => toggleDropdown(item.name)}
                  className="w-full text-left text-gray-700 hover:text-primary block px-3 py-2 rounded-md text-base font-medium flex justify-between items-center"
                >
                  {item.name}
                  <svg
                    className="ml-1 h-4 w-4"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>

                {activeDropdown === item.name && (
                  <div
                    ref={(el) => (dropdownRefs.current[item.name] = el)}
                    className="pl-4"
                  >
                    {item.dropdown.map((subItem) => (
                      <a
                        key={subItem.name}
                        href={subItem.link}
                        className="block px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md"
                        onClick={() => {
                          setActiveDropdown(null);
                          setIsOpen(false);
                        }}
                      >
                        {subItem.name}
                      </a>
                    ))}
                  </div>
                )}
              </div>
            ))}

            {/* Mobile Auth Section */}
            <div className="pt-4 pb-2 border-t border-gray-200">
              {isLoggedIn ? (
                <>
                  <div className="flex items-center space-x-2 mb-3">
                    <div className="avatar">
                      <div className="w-8 rounded-full">
                        <img src={user.avatar} alt="Profile" />
                      </div>
                    </div>
                    <div>
                      <div className="text-sm font-medium">{user.name}</div>
                      <div className="text-xs text-gray-500">{user.email}</div>
                    </div>
                  </div>
                  <div className="space-y-1">
                    <a className="block px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md">
                      Profile
                    </a>
                    <a className="block px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md">
                      Settings
                    </a>
                    <a
                      onClick={handleLogout}
                      className="block px-3 py-2 text-sm text-error hover:bg-gray-100 rounded-md flex items-center"
                    >
                      <FaSignOutAlt className="mr-2" /> Logout
                    </a>
                  </div>
                </>
              ) : (
                <div className="flex space-x-2">
                  <Link
                    to="/auth/login"
                    className="btn btn-ghost btn-sm flex items-center"
                  >
                    <FaSignInAlt className="mr-1" /> Login
                  </Link>
                  <a
                    href="#register"
                    className="btn btn-primary btn-sm flex items-center"
                  >
                    <FaUserPlus className="mr-1" /> Register
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
