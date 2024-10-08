import React, { useState, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Container, Nav, Navbar, NavDropdown } from 'react-bootstrap';
import { motion, transform } from 'framer-motion';
import 'bootstrap/dist/css/bootstrap.min.css';
import logo from "./../../assets/logo.png";
import Buttongrid from '../buttons/buttongrid/Buttongrid';
import "./NavBar.css";

const navbarVariants = {
  hidden: { opacity: 0, y: -50 },
  visible: { opacity: 1, y: 0 },
};

const linkVariants = {
  hover: { scale: 1.1, transition: { duration: 0.3 } },
  tap: { scale: 0.95 },
};

const dropdownItemVariants = {
  fromBottom: {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  },
  fromTop: {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0 },
  },
  fromOrigin: {
    hidden: { opacity: 0, scale: 0.5 },
    visible: { opacity: 1, scale: 1 },
  },
};

function NavBar() {
  const [scrolled, setScrolled] = useState(false);
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleToggle = () => {
    setExpanded(!expanded);
  };

  const handleSelect = () => {
    setExpanded(false);
  };

  return (
    <motion.div
      className={`fixed top-0 w-full z-50 transition-colors duration-500 ${scrolled ? 'bg-white md:bg-gradient-to-b md:to-[#fdebea] md:from-[#ea271d]' : ' md:bg-transparent'}`}
      variants={navbarVariants}
      initial="hidden"
      animate="visible"
      transition={{ duration: 0.5 }}
    >
      <Navbar expand="lg" expanded={expanded} onToggle={handleToggle}>
        <Container className='w-full flex justify-between'>
          <Navbar.Brand 
            as={Link} 
            to="/" 
            className="relative transform md:skew-x-[-0deg] p-2 inline-block"
          >
         <div className="transform md:skew-x-[0deg] bg-[#ffffff] rounded-2xl p-2 px-4 shadow-[5px_5px_#ea261d4d,_10px_10px_#ea261d33,_15px_15px_#ea261d1a,_20px_20px_#ea261d0d,_25px_25px_#ea261d05]">
  <img 
    className="max-h-10 md:max-h-[60px]" 
    src={logo} 
    alt="Logo" 
  />
</div>

          </Navbar.Brand>

          <Navbar.Toggle 
            className='mr-10 border-none outline-none' 
            aria-controls="responsive-navbar-nav" 
            onClick={handleToggle}
          />
          <Navbar.Collapse id="responsive-navbar-nav">
            <div className='md:flex justify-end md:w-full pl-10'>
              <Nav className='bg-[#060101b8] md:bg-transparent rounded-xl py-4 pl-5'>
                <motion.div
                className=' '
                  whileHover="hover"
                  whileTap="tap"
                  variants={linkVariants}
                 >
                  <Nav.Link as={NavLink} to="/" onClick={handleSelect}>
                    <Buttongrid text="ACCEUIL" />
                  </Nav.Link>
                </motion.div>

                <NavDropdown
                  className='w-full md:w-full'
                  title={<Buttongrid text="ASSOCIATION >" />}
                  id="association-dropdown"
                >
                  <motion.div
                    whileInView="visible"
                    initial="hidden"
                    animate="visible"
                    variants={dropdownItemVariants.fromBottom}
                    transition={{ duration: 0.3, delay: 0.1 }}
                  >
                    <NavDropdown.Item 
                      as={NavLink} 
                      to="/association/about" 
                      className='bg-transparent text-black' 
                      onClick={handleSelect}
                    >
                      <Buttongrid text="L'ASSOCIATION" />
                    </NavDropdown.Item>
                  </motion.div>
                  <motion.div
                    whileInView="visible"
                    initial="hidden"
                    animate="visible"
                    variants={dropdownItemVariants.fromTop}
                    transition={{ duration: 0.3, delay: 0.2 }}
                  >
                    <NavDropdown.Item 
                      as={NavLink} 
                      to="/association/bureau" 
                      className='w-full bg-transparent text-black'
                      onClick={handleSelect}
                    >
                      <Buttongrid text="BUREAU" />
                    </NavDropdown.Item>
                  </motion.div>
                  <motion.div
                    whileInView="visible"
                    initial="hidden"
                    animate="visible"
                    variants={dropdownItemVariants.fromOrigin}
                    transition={{ duration: 0.3, delay: 0.3 }}
                  >
                    <NavDropdown.Item 
                      as={NavLink} 
                      to="/association/membres" 
                      className='bg-transparent text-black'
                      onClick={handleSelect}
                    >
                      <Buttongrid text="MEMBRES" />
                    </NavDropdown.Item>
                  </motion.div>
                  <motion.div
                    whileInView="visible"
                    initial="hidden"
                    animate="visible"
                    variants={dropdownItemVariants.fromBottom}
                    transition={{ duration: 0.3, delay: 0.4 }}
                  >
                    <NavDropdown.Item  
                      as={NavLink} 
                      to="/association/statuts" 
                      className='bg-transparent text-black'
                      onClick={handleSelect}
                    >
                      <Buttongrid text="STATUTS" />
                    </NavDropdown.Item>
                  </motion.div>
                </NavDropdown>

                <NavDropdown
                  title={<Buttongrid text="VIDÉOTHEQUE >" />}
                  id="videotheque-dropdown"
                >
                  <motion.div
                    whileInView="visible"
                    initial="hidden"
                    animate="visible"
                    variants={dropdownItemVariants.fromBottom}
                    transition={{ duration: 0.3, delay: 0.1 }}
                  >
                    <NavDropdown.Item 
                      as={NavLink} 
                      to="/conferences/agpc" 
                      className='bg-transparent text-black'
                      onClick={handleSelect}
                    >
                      <Buttongrid text="CONFÉRENCES AGPC" />
                    </NavDropdown.Item>
                  </motion.div>
                  <motion.div
                    whileInView="visible"
                    initial="hidden"
                    animate="visible"
                    variants={dropdownItemVariants.fromTop}
                    transition={{ duration: 0.3, delay: 0.2 }}
                  >
                    <NavDropdown.Item 
                      as={NavLink} 
                      to="/conferences/echographie_digestive" 
                      className='bg-transparent text-black'
                      onClick={handleSelect}
                    >
                      <Buttongrid text="ECHOGRAPHIE DIGESTIVE" />
                    </NavDropdown.Item>
                  </motion.div>
                  <motion.div
                    whileInView="visible"
                    initial="hidden"
                    animate="visible"
                    variants={dropdownItemVariants.fromOrigin}
                    transition={{ duration: 0.3, delay: 0.3 }}
                  >
                    <NavDropdown.Item 
                      as={NavLink} 
                      to="/conferences/journees_hepatologie" 
                      className='bg-transparent text-black'
                      onClick={handleSelect}
                    >
                      <Buttongrid text="JOURNÉES D'HÉPATOLOGIE" />
                    </NavDropdown.Item>
                  </motion.div>
                  <motion.div
                    whileInView="visible"
                    initial="hidden"
                    animate="visible"
                    variants={dropdownItemVariants.fromBottom}
                    transition={{ duration: 0.3, delay: 0.4 }}
                  >
                    <NavDropdown.Item 
                      as={NavLink} 
                      to="/conferences/authers_conferences" 
                      className='bg-transparent text-black'
                      onClick={handleSelect}
                    >
                      <Buttongrid text="AUTRES CONFÉRENCES" />
                    </NavDropdown.Item>
                  </motion.div>
                </NavDropdown>

                <motion.div
                  whileHover="hover"
                  whileTap="tap"
                  variants={linkVariants}
                >
                  <Nav.Link as={NavLink} to="/agenda" onClick={handleSelect}>
                    <Buttongrid text="AGENDA" />
                  </Nav.Link>
                </motion.div>
                
                <motion.div
                  whileHover="hover"
                  whileTap="tap"
                  variants={linkVariants}
                >
                  <Nav.Link as={NavLink} to="/contact" onClick={handleSelect}>
                    <Buttongrid text="CONTACT" />
                  </Nav.Link>
                </motion.div>

                <motion.div
                  whileHover="hover"
                  whileTap="tap"
                  variants={linkVariants}
                >
                  <Nav.Link as={NavLink} to="/partenaires" onClick={handleSelect}>
                    <Buttongrid text="PARTENAIRES" />
                  </Nav.Link>
                </motion.div>
              </Nav>
            </div>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </motion.div>
  );
}

export default NavBar;
