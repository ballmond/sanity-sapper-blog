<script>

import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem  
} from 'sveltestrap/src';

  let isOpen = false;

  function handleUpdate(event) {
    isOpen = event.detail.isOpen;
  }
</script>

<style>

</style>

<Navbar color="light" light expand="md">
    <NavbarBrand href="/">Home</NavbarBrand>
    <NavbarToggler on:click={() => (isOpen = !isOpen)} />
    <Collapse {isOpen} navbar expand="md" on:update={handleUpdate}>
      <Nav class="ml-left" navbar>
          <UncontrolledDropdown nav inNavbar>
            <DropdownToggle nav class="nav-link" caret>About Us</DropdownToggle>
            <DropdownMenu right>
              <DropdownItem tag="a" href="pages/custom/what-we-believe/">What We Believe</DropdownItem>                
              <DropdownItem tag="a" href="pages/custom/our-staff/">Our Staff</DropdownItem>                
              <DropdownItem tag="a" href="pages/custom/grace-in-the-news/">Grace In The News</DropdownItem>
              <DropdownItem divider />
              <DropdownItem tag="a" href="pages/custom/contact-us">Contact Us</DropdownItem>
            </DropdownMenu>
          </UncontrolledDropdown>
          <UncontrolledDropdown nav inNavbar>
            <DropdownToggle nav class="nav-link" caret>Ministries</DropdownToggle>
            <DropdownMenu right>
              <DropdownItem tag="a" href="#/">Children</DropdownItem>
              <DropdownItem tag="a" href="#/">Student</DropdownItem>
              <DropdownItem tag="a" href="#/">Young Adult</DropdownItem>
              <DropdownItem tag="a" href="#/">Adult</DropdownItem>
              <DropdownItem tag="a" href="#/">Music</DropdownItem>
            </DropdownMenu>
          </UncontrolledDropdown>
          <NavItem>
            <NavLink href="/pages/contribute">Contribute</NavLink>
          </NavItem>
      </Nav>
    </Collapse>
  </Navbar>