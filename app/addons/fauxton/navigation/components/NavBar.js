// Licensed under the Apache License, Version 2.0 (the "License"); you may not
// use this file except in compliance with the License. You may obtain a copy of
// the License at
//
//   http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
// WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
// License for the specific language governing permissions and limitations under
// the License.

import React, { Component } from 'react';

import Footer from './Footer';
import Burger from './Burger';
import NavLink from './NavLink';
import Brand from './Brand';
import LogoutButton from './LogoutButton';
import LoginButton from './LoginButton';

import Actions from "../actions";

import classNames from 'classnames';

class NavBar extends Component {

  createLinks (links) {
    const { activeLink, isMinimized } = this.props;

    return links.map((link, i) => {
      return <NavLink
        key={i}
        link={link}
        active={activeLink}
        isMinimized={isMinimized} />;
    });
  }

  toggleMenu () {
    Actions.toggleNavbarMenu();
  }

  render () {
    const {
      isMinimized,
      version,
      isLoginSectionVisible,
      isLoginVisibleInsteadOfLogout,
      activeLink,
      username,
      isNavBarVisible
    } = this.props;

    if (!isNavBarVisible) {
      return null;
    }

    const navLinks = this.createLinks(this.props.navLinks);
    const bottomNavLinks = this.createLinks(this.props.bottomNavLinks);
    const footerNavLinks = this.createLinks(this.props.footerNavLinks);

    const navClasses = classNames(
      'faux-navbar',
      {'faux-navbar--wide':  !isMinimized},
      {'faux-navbar--narrow': isMinimized}
    );

    const loginSection = isLoginVisibleInsteadOfLogout ?
      <LoginButton active={activeLink} isMinimized={isMinimized} /> :
      <LogoutButton username={username} isMinimized={isMinimized} />;

    return (
      <div className={navClasses}>
        <nav>
          <div className="faux-navbar__linkcontainer">
            <Burger isMinimized={isMinimized} toggleMenu={this.toggleMenu}/>
            <div className="faux-navbar__links">
              {navLinks}
              {bottomNavLinks}
            </div>

            <div className="faux-navbar__footer">
              <Brand isMinimized={isMinimized} />

              <div>
                {footerNavLinks}
              </div>

              <Footer version={version}/>

              {isLoginSectionVisible ? loginSection : null}
            </div>
          </div>
        </nav>
        <div id="primary-nav-right-shadow"/>
      </div>
    );
  }
}

NavBar.propTypes = {
  activeLink: React.PropTypes.string,
  isMinimized: React.PropTypes.bool.isRequired,
  version: React.PropTypes.string,
  username: React.PropTypes.string,
  navLinks: React.PropTypes.array,
  bottomNavLinks: React.PropTypes.array,
  footerNavLinks: React.PropTypes.array,
  isNavBarVisible: React.PropTypes.bool,
  isLoginSectionVisible: React.PropTypes.bool.isRequired,
  isLoginVisibleInsteadOfLogout: React.PropTypes.bool.isRequired
};

export default NavBar;
