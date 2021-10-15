import React from "react";
import { Navbar, NavbarBrand } from "reactstrap";

class Header extends React.Component {
  render() {
  return (
    <Navbar color="dark" dark expand="md">
      <div style={{ marginLeft: '25px'}}>
        <NavbarBrand href="#">Zoho Invoice Integration</NavbarBrand>
      </div>
    </Navbar>
  );
  }
}

export default Header;