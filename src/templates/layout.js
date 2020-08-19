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

  handleMenu = () => {
    this.setState({
      mobileMenuActive: !this.state.mobileMenuActive,
    });
  };

  render() {
    return (
      <>
        <SEO />

        <Header mobileMenuHandler={this.handleMenu} mobileMenuActive={this.state.mobileMenuActive} />

        {this.props.children}

        <Footer />
      </>
    );
  }
}
export default Layout;
