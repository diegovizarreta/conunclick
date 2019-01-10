/*eslint-disable*/
import React from "react";
// react components for routing our app without refresh
import { Link } from "react-router-dom";

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Tooltip from "@material-ui/core/Tooltip";

import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";

import Slide from "@material-ui/core/Slide";

// @material-ui/icons
import { ShoppingCart } from "@material-ui/icons";

// core components
import CustomDropdown from "components/CustomDropdown/CustomDropdown.jsx";
import Button from "components/CustomButtons/Button.jsx";

import headerLinksStyle from "assets/jss/material-kit-react/components/headerLinksStyle.jsx";
import $ from 'jquery';

function Transition(props) {
  return <Slide direction="down" {...props} />;
}

class HeaderLinks extends React.Component {

  constructor(props){
    
    super(props);

    this.state = {
      cart: false
    };

  }

  handleClickOpen(modal) {
    var w = window.open("http://myshop.wmperu.com/cart/", 'callScriptPopup', 'directories=no,titlebar=no,toolbar=no,location=no,status=no,menubar=no,scrollbars=no,resizable=no,width=500,height=500');
    // var html = $("#toCartWindow").html();
    // $(w.document.body).html(html);

    // var x = [];
    // x[modal] = true;
    // this.setState(x);
  }
  handleClose(modal) {
    // var x = [];
    // x[modal] = false;
    // this.setState(x);
  }

render() {

  const { classes } = this.props;

  return (
    <List className={classes.list}>
      <ListItem className={classes.listItem}>
        <Button
          onClick={() => this.handleClickOpen("cart")}
          color="transparent"
          target="_blank"
          className={"cart-button"}
        >
          <ShoppingCart className={classes.icons} /> VER CARRITO
        </Button>
      </ListItem>
      <Dialog
        classes={{
          root: classes.center,
          paper: classes.modal
        }}

        open={this.state.cart}
        TransitionComponent={Transition}
        keepMounted
        onClose={() => this.handleClose("cart")}
        aria-labelledby="classic-modal-slide-title"
        aria-describedby="classic-modal-slide-description"
      >
        <DialogTitle
          id="classic-modal-slide-title"
          disableTypography
          className={classes.modalHeader}
        >
          <div className={"left product"}>
            <h2 className={classes.modalTitle}>Carrito de Compra</h2>
          </div>
          <div className={"right"} id="toCartWindow">
          </div>
        </DialogTitle>
        <DialogContent
          id="classic-modal-slide-description"
          className={classes.modalBody}
        >
          <div></div>

        </DialogContent>
        <DialogActions className={classes.modalFooter}>

          <Button
            onClick={() => this.handleClose("cart")}
            color="danger"
            simple
          >
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </List>
  )
}
}

export default withStyles(headerLinksStyle)(HeaderLinks);
