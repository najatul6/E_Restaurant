// Header.jsx
import { useState, useEffect } from 'react';
import { Menu, X, ChevronDown, Search, User, ShoppingCart, LogOut, Settings, Bell } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { NavLink, useLocation } from 'react-router-dom';
import useAuth from '@/hooks/useAuth';
// import logo from "@/assets/Greene_King-Logo.wine.svg";
import navItems from '@/lib/navItems';
import { toast } from 'react-toastify';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [mobileDropdown, setMobileDropdown] = useState(null);
  const [userDropdown, setUserDropdown] = useState(false);
  const { user, logOut } = useAuth(); 
  const location = useLocation();

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      setScrolled(isScrolled);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Animation variants
  const mobileMenuVariants = {
    closed: {
      height: 0,
      opacity: 0,
      transition: {
        duration: 0.3,
        ease: "easeInOut"
      }
    },
    open: {
      height: "auto",
      opacity: 1,
      transition: {
        duration: 0.3,
        ease: "easeInOut"
      }
    }
  };

  const dropdownVariants = {
    closed: {
      opacity: 0,
      y: -10,
      scale: 0.95,
      transition: {
        duration: 0.2,
        ease: "easeOut"
      }
    },
    open: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.2,
        ease: "easeOut"
      }
    }
  };

  const itemVariants = {
    closed: { 
      opacity: 0,
      x: -20
    },
    open: { 
      opacity: 1,
      x: 0
    }
  };

  const underlineVariants = {
    hidden: { width: 0 },
    visible: { width: "100%" }
  };

  const handleLogin = () => {
    window.location.href = '/login';
    setUserDropdown(false);
  };

  const handleLogout = () => {
    toast.promise(logOut(), {
      pending: "Logging out...",
      success: "Logged out successfully",
      error: "Error logging out",
    }); 
    setUserDropdown(false);
  };
  

  // Custom Logo Component
  const Logo = () => (
    <motion.div
      className="flex items-center space-x-3"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <img 
        src="#" 
        alt="Greene King Logo" 
        className="h-10 w-auto object-contain"
      />
    </motion.div>
  );

  // User Avatar Component
  const UserAvatar = () => (
    <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-sm font-medium shadow-md">
      {user?.avatar ? (
        <img src={user.avatar} alt={user.name || 'User'} className="w-full h-full rounded-full object-cover" />
      ) : (
        user?.name ? user.name.charAt(0).toUpperCase() : 'U'
      )}
    </div>
  );

  // Custom Active Styles with Underline
  const desktopActiveStyles = {
    normal: "text-gray-700 hover:text-blue-600 relative",
    active: "text-blue-600 font-semibold relative"
  };

  const desktopDropdownActiveStyles = {
    normal: "text-gray-700 hover:text-blue-600 hover:bg-gray-50 relative",
    active: "text-blue-600 bg-blue-50 relative"
  };

  const mobileActiveStyles = {
    normal: "text-gray-700 hover:text-blue-600 relative",
    active: "text-blue-600 font-semibold relative"
  };

  const mobileDropdownActiveStyles = {
    normal: "text-gray-600 hover:text-blue-600 relative",
    active: "text-blue-600 font-semibold bg-blue-25 relative"
  };

  // Underline Component
  const Underline = () => (
    <motion.div
      className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-blue-600 to-purple-600"
      variants={underlineVariants}
      initial="hidden"
      animate="visible"
      transition={{ duration: 0.3, ease: "easeOut" }}
    />
  );

  // NavLink with underline animation for Desktop
  const NavLinkItem = ({ href, children, className = "", onClick, isDropdownItem = false }) => (
    <NavLink
      to={href}
      className={({ isActive }) => 
        `flex items-center px-3 py-2 text-sm font-medium transition-all duration-200 relative ${
          isActive 
            ? isDropdownItem ? desktopDropdownActiveStyles.active : desktopActiveStyles.active
            : isDropdownItem ? desktopDropdownActiveStyles.normal : desktopActiveStyles.normal
        } ${className}`
      }
      onClick={onClick}
    >
      {children}
      {!isDropdownItem && (
        <AnimatePresence>
          {location.pathname === href && <Underline />}
        </AnimatePresence>
      )}
    </NavLink>
  );

  // Mobile NavLink with underline
  const MobileNavLink = ({ href, children, className = "", onClick, isDropdownItem = false }) => (
    <NavLink
      to={href}
      className={({ isActive }) => 
        `block py-3 text-base font-medium transition-all duration-200 relative px-4 ${
          isActive 
            ? isDropdownItem ? mobileDropdownActiveStyles.active : mobileActiveStyles.active
            : isDropdownItem ? mobileDropdownActiveStyles.normal : mobileActiveStyles.normal
        } ${className}`
      }
      onClick={onClick}
    >
      {children}
      {!isDropdownItem && (
        <AnimatePresence>
          {location.pathname === href && (
            <motion.div
              className="absolute left-0 bottom-2 h-0.5 bg-gradient-to-r from-blue-600 to-purple-600"
              variants={underlineVariants}
              initial="hidden"
              animate="visible"
              transition={{ duration: 0.3, ease: "easeOut" }}
              style={{ width: 'calc(100% - 2rem)' }}
            />
          )}
        </AnimatePresence>
      )}
    </NavLink>
  );

  return (
    <header 
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled 
          ? 'bg-white/90 backdrop-blur-lg shadow-lg py-3 border-b border-gray-200' 
          : 'bg-white py-4'
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <NavLink to="/">
              <Logo />
            </NavLink>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex space-x-1">
            {navItems.map((item) => (
              <div 
                key={item.name}
                className="relative"
                onMouseEnter={() => setActiveDropdown(item.name)}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                {item.dropdown ? (
                  <div className="flex items-center">
                    <NavLinkItem href={item.path}>
                      {item.name}
                      <motion.div
                        animate={{ rotate: activeDropdown === item.name ? 180 : 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <ChevronDown className="ml-1 h-4 w-4" />
                      </motion.div>
                    </NavLinkItem>
                  </div>
                ) : (
                  <NavLinkItem href={item.path}>
                    {item.name}
                  </NavLinkItem>
                )}

                {/* Dropdown Menu */}
                <AnimatePresence>
                  {item.dropdown && activeDropdown === item.name && (
                    <motion.div
                      variants={dropdownVariants}
                      initial="closed"
                      animate="open"
                      exit="closed"
                      className="absolute left-0 mt-1 w-56 bg-white/95 backdrop-blur-md rounded-md shadow-xl border border-gray-200 py-1 z-20"
                    >
                      {item.dropdown.map((dropdownItem, index) => (
                        <NavLink
                          key={dropdownItem.name}
                          to={dropdownItem.path}
                          className={({ isActive }) => 
                            `block px-4 py-2 text-sm transition-all duration-200 relative ${
                              isActive
                                ? desktopDropdownActiveStyles.active
                                : desktopDropdownActiveStyles.normal
                            }`
                          }
                        >
                          <motion.div
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="block"
                          >
                            {dropdownItem.name}
                          </motion.div>
                          <AnimatePresence>
                            {location.pathname === dropdownItem.path && (
                              <motion.div
                                className="absolute left-0 bottom-0 h-0.5 bg-gradient-to-r from-blue-600 to-purple-600"
                                variants={underlineVariants}
                                initial="hidden"
                                animate="visible"
                                transition={{ duration: 0.3, ease: "easeOut" }}
                                style={{ width: 'calc(100% - 2rem)' }}
                              />
                            )}
                          </AnimatePresence>
                        </NavLink>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </nav>

          {/* Right side actions */}
          <div className="hidden lg:flex items-center space-x-4">
            <motion.button 
              className="p-2 text-gray-500 hover:text-gray-700 transition-colors duration-200 relative"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <Search className="h-5 w-5" />
            </motion.button>
            
            <motion.button 
              className="p-2 text-gray-500 hover:text-gray-700 transition-colors duration-200 relative"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <ShoppingCart className="h-5 w-5" />
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                3
              </span>
            </motion.button>

            {user ? (
              <div className="relative">
                <motion.button 
                  className="flex items-center space-x-2 text-gray-700 hover:text-blue-600 transition-colors duration-200"
                  whileHover={{ scale: 1.05 }}
                  onClick={() => setUserDropdown(!userDropdown)}
                >
                  <UserAvatar />
                  <span className="text-sm font-medium hidden xl:block">
                    {user.name || user.email?.split('@')[0]}
                  </span>
                  <motion.div
                    animate={{ rotate: userDropdown ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <ChevronDown className="h-4 w-4" />
                  </motion.div>
                </motion.button>

                {/* User Dropdown Menu */}
                <AnimatePresence>
                  {userDropdown && (
                    <motion.div
                      variants={dropdownVariants}
                      initial="closed"
                      animate="open"
                      exit="closed"
                      className="absolute right-0 mt-2 w-64 bg-white/95 backdrop-blur-md rounded-md shadow-xl border border-gray-200 py-2 z-20"
                    >
                      <div className="px-4 py-3 border-b border-gray-100">
                        <div className="flex items-center space-x-3">
                          <UserAvatar />
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-gray-900 truncate">
                              {user.name || 'User'}
                            </p>
                            <p className="text-sm text-gray-500 truncate">
                              {user.email}
                            </p>
                          </div>
                        </div>
                      </div>
                      
                      <div className="py-1">
                        <NavLink 
                          to="/profile" 
                          className={({ isActive }) => 
                            `flex items-center px-4 py-2 text-sm transition-all duration-200 relative ${
                              isActive ? desktopDropdownActiveStyles.active : desktopDropdownActiveStyles.normal
                            }`
                          }
                          onClick={() => setUserDropdown(false)}
                        >
                          <User className="h-4 w-4 mr-3" />
                          Profile
                          <AnimatePresence>
                            {location.pathname === '/profile' && (
                              <motion.div
                                className="absolute left-0 bottom-0 h-0.5 bg-gradient-to-r from-blue-600 to-purple-600"
                                variants={underlineVariants}
                                initial="hidden"
                                animate="visible"
                                transition={{ duration: 0.3, ease: "easeOut" }}
                                style={{ width: 'calc(100% - 2rem)' }}
                              />
                            )}
                          </AnimatePresence>
                        </NavLink>
                        <NavLink 
                          to="/settings" 
                          className={({ isActive }) => 
                            `flex items-center px-4 py-2 text-sm transition-all duration-200 relative ${
                              isActive ? desktopDropdownActiveStyles.active : desktopDropdownActiveStyles.normal
                            }`
                          }
                          onClick={() => setUserDropdown(false)}
                        >
                          <Settings className="h-4 w-4 mr-3" />
                          Settings
                          <AnimatePresence>
                            {location.pathname === '/settings' && (
                              <motion.div
                                className="absolute left-0 bottom-0 h-0.5 bg-gradient-to-r from-blue-600 to-purple-600"
                                variants={underlineVariants}
                                initial="hidden"
                                animate="visible"
                                transition={{ duration: 0.3, ease: "easeOut" }}
                                style={{ width: 'calc(100% - 2rem)' }}
                              />
                            )}
                          </AnimatePresence>
                        </NavLink>
                        <NavLink 
                          to="/notifications" 
                          className={({ isActive }) => 
                            `flex items-center px-4 py-2 text-sm transition-all duration-200 relative ${
                              isActive ? desktopDropdownActiveStyles.active : desktopDropdownActiveStyles.normal
                            }`
                          }
                          onClick={() => setUserDropdown(false)}
                        >
                          <Bell className="h-4 w-4 mr-3" />
                          Notifications
                          <AnimatePresence>
                            {location.pathname === '/notifications' && (
                              <motion.div
                                className="absolute left-0 bottom-0 h-0.5 bg-gradient-to-r from-blue-600 to-purple-600"
                                variants={underlineVariants}
                                initial="hidden"
                                animate="visible"
                                transition={{ duration: 0.3, ease: "easeOut" }}
                                style={{ width: 'calc(100% - 2rem)' }}
                              />
                            )}
                          </AnimatePresence>
                        </NavLink>
                      </div>
                      
                      <div className="border-t border-gray-100 py-1">
                        <button 
                          onClick={handleLogout}
                          className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-all duration-200"
                        >
                          <LogOut className="h-4 w-4 mr-3" />
                          Sign out
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <div className="flex items-center space-x-3">
                <NavLink 
                  to="/login"
                  className={({ isActive }) => 
                    `px-3 py-2 text-sm font-medium transition-all duration-200 relative ${
                      isActive 
                        ? 'text-blue-600 font-semibold' 
                        : 'text-gray-700 hover:text-blue-600'
                    }`
                  }
                >
                  <motion.span
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Sign In
                  </motion.span>
                  <AnimatePresence>
                    {location.pathname === '/login' && (
                      <motion.div
                        className="absolute left-3 bottom-1 h-0.5 bg-gradient-to-r from-blue-600 to-purple-600"
                        variants={underlineVariants}
                        initial="hidden"
                        animate="visible"
                        transition={{ duration: 0.3, ease: "easeOut" }}
                        style={{ width: 'calc(100% - 1.5rem)' }}
                      />
                    )}
                  </AnimatePresence>
                </NavLink>
                <NavLink 
                  to="/register"
                  className={({ isActive }) => 
                    `px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 relative overflow-hidden ${
                      isActive
                        ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg'
                        : 'bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:shadow-lg'
                    }`
                  }
                >
                  <motion.span
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Get Started
                  </motion.span>
                </NavLink>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden flex items-center space-x-2">
            <motion.button 
              className="p-2 text-gray-500 hover:text-gray-700 transition-colors duration-200"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <Search className="h-5 w-5" />
            </motion.button>
            <motion.button
              className="p-2 text-gray-700 hover:text-blue-600 transition-colors duration-200"
              onClick={() => setIsOpen(!isOpen)}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </motion.button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isOpen && (
            <motion.div 
              variants={mobileMenuVariants}
              initial="closed"
              animate="open"
              exit="closed"
              className="lg:hidden overflow-hidden bg-white/95 backdrop-blur-lg rounded-lg mt-2 shadow-xl border border-gray-200"
            >
              <nav className="flex flex-col space-y-0 py-4">
                {navItems.map((item, index) => (
                  <motion.div 
                    key={item.name}
                    variants={itemVariants}
                    initial="closed"
                    animate="open"
                    transition={{ delay: index * 0.1 }}
                  >
                    <div className="flex flex-col">
                      <div className="flex items-center justify-between">
                        <MobileNavLink href={item.path}>
                          {item.name}
                        </MobileNavLink>
                        {item.dropdown && (
                          <button
                            onClick={() => setMobileDropdown(mobileDropdown === item.name ? null : item.name)}
                            className="p-2 mr-2"
                          >
                            <motion.div
                              animate={{ rotate: mobileDropdown === item.name ? 180 : 0 }}
                              transition={{ duration: 0.2 }}
                            >
                              <ChevronDown className="h-4 w-4" />
                            </motion.div>
                          </button>
                        )}
                      </div>
                      
                      {/* Mobile dropdown items */}
                      <AnimatePresence>
                        {item.dropdown && mobileDropdown === item.name && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            className="ml-6 overflow-hidden border-l-2 border-gray-100"
                          >
                            {item.dropdown.map((dropdownItem, subIndex) => (
                              <NavLink
                                key={dropdownItem.name}
                                to={dropdownItem.path}
                                className={({ isActive }) => 
                                  `block px-4 py-2 text-sm transition-all duration-200 relative pl-3 ${
                                    isActive
                                      ? mobileDropdownActiveStyles.active
                                      : mobileDropdownActiveStyles.normal
                                  }`
                                }
                                onClick={() => setIsOpen(false)}
                              >
                                <motion.span
                                  initial={{ opacity: 0, x: -10 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  transition={{ delay: subIndex * 0.1 }}
                                  className="block"
                                >
                                  {dropdownItem.name}
                                </motion.span>
                                <AnimatePresence>
                                  {location.pathname === dropdownItem.path && (
                                    <motion.div
                                      className="absolute left-3 bottom-2 h-0.5 bg-gradient-to-r from-blue-600 to-purple-600"
                                      variants={underlineVariants}
                                      initial="hidden"
                                      animate="visible"
                                      transition={{ duration: 0.3, ease: "easeOut" }}
                                      style={{ width: 'calc(100% - 2rem)' }}
                                    />
                                  )}
                                </AnimatePresence>
                              </NavLink>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </motion.div>
                ))}
                
                {/* Mobile User Section */}
                <motion.div 
                  className="pt-4 border-t border-gray-200 flex flex-col space-y-1 px-4"
                  variants={itemVariants}
                  initial="closed"
                  animate="open"
                  transition={{ delay: navItems.length * 0.1 }}
                >
                  {user ? (
                    <>
                      <div className="flex items-center space-x-3 py-3">
                        <UserAvatar />
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-gray-900">
                            {user.name || 'User'}
                          </p>
                          <p className="text-sm text-gray-500">
                            {user.email}
                          </p>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-2 py-2">
                        <NavLink 
                          to="/profile" 
                          className={({ isActive }) => 
                            `text-left p-2 text-sm rounded-md transition-all duration-200 relative ${
                              isActive ? mobileDropdownActiveStyles.active : mobileDropdownActiveStyles.normal
                            }`
                          }
                          onClick={() => setIsOpen(false)}
                        >
                          Profile
                          <AnimatePresence>
                            {location.pathname === '/profile' && (
                              <motion.div
                                className="absolute left-2 bottom-1 h-0.5 bg-gradient-to-r from-blue-600 to-purple-600"
                                variants={underlineVariants}
                                initial="hidden"
                                animate="visible"
                                transition={{ duration: 0.3, ease: "easeOut" }}
                                style={{ width: 'calc(100% - 1rem)' }}
                              />
                            )}
                          </AnimatePresence>
                        </NavLink>
                        <NavLink 
                          to="/settings" 
                          className={({ isActive }) => 
                            `text-left p-2 text-sm rounded-md transition-all duration-200 relative ${
                              isActive ? mobileDropdownActiveStyles.active : mobileDropdownActiveStyles.normal
                            }`
                          }
                          onClick={() => setIsOpen(false)}
                        >
                          Settings
                          <AnimatePresence>
                            {location.pathname === '/settings' && (
                              <motion.div
                                className="absolute left-2 bottom-1 h-0.5 bg-gradient-to-r from-blue-600 to-purple-600"
                                variants={underlineVariants}
                                initial="hidden"
                                animate="visible"
                                transition={{ duration: 0.3, ease: "easeOut" }}
                                style={{ width: 'calc(100% - 1rem)' }}
                              />
                            )}
                          </AnimatePresence>
                        </NavLink>
                      </div>
                      <button 
                        onClick={handleLogout}
                        className="w-full text-left p-3 text-sm text-red-600 hover:bg-red-50 rounded-md border-t border-gray-100 mt-2 transition-all duration-200"
                      >
                        Sign Out
                      </button>
                    </>
                  ) : (
                    <div className="flex flex-col space-y-3 pt-2">
                      <NavLink 
                        to="/login"
                        className={({ isActive }) => 
                          `w-full text-center p-3 border border-gray-200 rounded-md transition-all duration-200 relative ${
                            isActive 
                              ? 'text-blue-600 border-blue-600' 
                              : 'text-gray-700 hover:text-blue-600 hover:border-blue-200'
                          }`
                        }
                        onClick={() => setIsOpen(false)}
                      >
                        Sign In
                        <AnimatePresence>
                          {location.pathname === '/login' && (
                            <motion.div
                              className="absolute left-3 bottom-2 h-0.5 bg-gradient-to-r from-blue-600 to-purple-600"
                              variants={underlineVariants}
                              initial="hidden"
                              animate="visible"
                              transition={{ duration: 0.3, ease: "easeOut" }}
                              style={{ width: 'calc(100% - 1.5rem)' }}
                            />
                          )}
                        </AnimatePresence>
                      </NavLink>
                      <NavLink 
                        to="/register"
                        className={({ isActive }) => 
                          `w-full text-center p-3 rounded-md transition-all duration-200 ${
                            isActive
                              ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg'
                              : 'bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:shadow-md'
                          }`
                        }
                        onClick={() => setIsOpen(false)}
                      >
                        Get Started
                      </NavLink>
                    </div>
                  )}
                </motion.div>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
};

export default Header;