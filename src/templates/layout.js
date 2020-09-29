import React from "react";
import SEO from "../components/seo";
import Header from "../components/header";
import Footer from "../components/footer";
// Import fontawesome library files
import "../components/icons";

class Layout extends React.Component {
  state = {
    mobileMenuActive: false,
  };

  toggleMenu = () => {
    this.setState({
      mobileMenuActive: !this.state.mobileMenuActive,
    });
  };

  hideMenu = () => {
    this.setState({
      mobileMenuActive: false,
    });
  };

  render() {
    return (
      <>
        <SEO />

        <Header
          mobileMenuActive={this.state.mobileMenuActive}
          toggleMenuHandler={this.toggleMenu}
          hideMenuHandler={this.hideMenu}
        />

        {this.props.children}

        <Footer />
      </>
    );
  }
}
export default Layout;
