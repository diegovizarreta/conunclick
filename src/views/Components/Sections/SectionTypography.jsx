import React from "react";

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";

// @material-ui/icons

// core components
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import Slide from "@material-ui/core/Slide";
import IconButton from "@material-ui/core/IconButton";
import Small from "components/Typography/Small.jsx";
import Danger from "components/Typography/Danger.jsx";
import Warning from "components/Typography/Warning.jsx";
import Success from "components/Typography/Success.jsx";
import Info from "components/Typography/Info.jsx";
import Primary from "components/Typography/Primary.jsx";
import Muted from "components/Typography/Muted.jsx";
import Quote from "components/Typography/Quote.jsx";
import typographyStyle from "assets/jss/material-kit-react/views/componentsSections/typographyStyle.jsx";
import image from "assets/img/faces/avatar.jpg";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "components/CustomButtons/Button.jsx";
import Close from "@material-ui/icons/Close";
import javascriptStyles from "assets/jss/material-kit-react/views/componentsSections/javascriptStyles.jsx";
import Paginations from "components/Pagination/Pagination.jsx";
import CustomDropdown from "components/CustomDropdown/CustomDropdown.jsx";

var WooCommerceAPI = require('woocommerce-api');

var WooCommerce = new WooCommerceAPI({
  url: 'http://myshop.wmperu.com',
  consumerKey: 'ck_c6d6aeadaab71a0c5189634d573f512a413a60b9',
  consumerSecret: 'cs_777bb27631ebddcc5939496e55ddeb9d8dfcb37d',
  wpAPI: true,
  version: 'wc/v3'
});

function Transition(props) {
  return <Slide direction="down" {...props} />;
}

class SectionTypography extends React.Component {

  anchorElLeft = null;
  anchorElTop = null;
  anchorElBottom = null;
  anchorElRight = null;

  constructor(props) {

    super(props);

    this.popout = this.popout.bind(this);
    this.popoutClosed = this.popoutClosed.bind(this);

    this.state = {
      items: [],
      categories: ["zapatillas","Bolsos","Carteras","Relojes","lentes","Laptops","Electronicos"],
      classicModal: false,
      openLeft: false,
      openTop: false,
      openBottom: false,
      openRight: false,
      isPoppedOut: false,
      cart: false
    };
  }
  handleClickOpen(modal) {
    var x = [];
    x[modal] = true;
    this.setState(x);
  }
  handleClose(modal) {
    var x = [];
    x[modal] = false;
    this.setState(x);
  }
  handleClosePopover(state) {
    this.setState({
      [state]: false
    });
  }
  handleClickButton(state) {
    this.setState({
      [state]: true
    });
  }

  popout() {
    this.setState({ isPoppedOut: true });
  }

  popoutClosed() {
    this.setState({ isPoppedOut: false });
  }

  getProducts(page_number) {
    let promise = new Promise(function (resolve, reject) {
      const array = WooCommerce.getAsync('products?per_page=12&page=' + page_number).then(function (result) {

        const arrayProduct = JSON.parse(result.toJSON().body);
        // console.log(arrayProduct);
        resolve(arrayProduct);
        return arrayProduct;
      });

    });

    promise.then(res => {
      this.setState({
        items: res
      });
    });
  }

  getCategories(){
    let promise = new Promise(function (resolve, reject) {
      const array = WooCommerce.getAsync('products/categories').then(function (result) {
        const arrayCategories = JSON.parse(result.toJSON().body);
        const arrayCategoriesf = arrayCategories.map((categorie,i)=>{
          return categorie.name;
        });
        
        resolve(arrayCategoriesf);
        return arrayCategories;
      });

    });

    promise.then(res => {
      this.setState({
        categories: res
      });
    });
  }

  getAddCart(id) {
    var w = window.open("http://myshop.wmperu.com/cart/?add-to-cart=" + id + "&quantity=1", 'callScriptPopup', 'directories=no,titlebar=no,toolbar=no,location=no,status=no,menubar=no,scrollbars=no,resizable=no,width=400,height=350');
    w.close();
  }

  printClick(){
    
    console.log('sdsd');
  }

  render() {

    const { classes } = this.props;

    this.getProducts(1, true);
    this.getCategories();

    return (
      <div className={classes.section}>
        <CustomDropdown
          buttonText="Categorias"
          buttonProps={{
            className: classes.navLink,
            color: "transparent"
          }}
          dropdownList={this.state.categories}
          // onClick={() => this.printClick(key)}
        />
        <div className={classes.container}>
          <div className={classes.space50} />
          <div id="products" className={"products"}>
            <GridContainer>
              {
                this.state.items.map((item, i) => {
                  return (
                    <GridItem xs={12} sm={6} md={3} className={classes.marginLeft + " product"}>
                      <img
                        src={item.images[0].src}
                        alt="..."
                        className={
                          classes.imgFluid
                        }
                        onClick={() => this.handleClickOpen("" + item.id)}
                      />
                      <h3>{item.name}</h3>
                      <h5>{item.brands[0].name}</h5>
                      <h4>S./ {item.price}</h4>
                      <Button
                        onClick={() => this.getAddCart(item.id)}
                        target="_blank"
                      >
                        Agregar al carrito
                      </Button>

                      <Dialog
                        classes={{
                          root: classes.center,
                          paper: classes.modal
                        }}

                        open={this.state[item.id]}
                        TransitionComponent={Transition}
                        keepMounted
                        onClose={() => this.handleClose("" + item.id)}
                        aria-labelledby="classic-modal-slide-title"
                        aria-describedby="classic-modal-slide-description"
                      >
                        <DialogTitle
                          id="classic-modal-slide-title"
                          disableTypography
                          className={classes.modalHeader}
                        >
                          <div className={"left product"}>
                            <h2 className={classes.modalTitle}>{item.name}</h2>
                            <h5>{item.brands[0].name}</h5>
                            <h4>S./ {item.price}</h4>
                          </div>
                          <div className={"right"}>
                            <Button
                              onClick={() => this.getAddCart(item.id)}
                              target="_blank"
                              color={"primary"}
                            >
                              Agregar al carrito
                          </Button>
                          </div>
                        </DialogTitle>
                        <DialogContent
                          id="classic-modal-slide-description"
                          className={classes.modalBody}
                        >
                          <div>
                            <img
                              height="100px"
                              weight="80px"
                              src={item.images[0].src}
                              alt="..."
                              className={
                                classes.imgFluid
                              }
                            />
                          </div>
                          <div dangerouslySetInnerHTML={{ __html: item.description }} />

                        </DialogContent>
                        <DialogActions className={classes.modalFooter}>

                          <Button
                            onClick={() => this.handleClose("" + item.id)}
                            color="danger"
                            simple
                          >
                            Close
                          </Button>
                        </DialogActions>
                      </Dialog>

                    </GridItem>

                  )
                })
              }
            </GridContainer>
            <GridContainer>
              <GridItem xs={12} sm={12} md={6}>
                <Paginations
                  pages={[
                    { text: "PREV" },
                    { active: true, text: 1 },
                    { text: 2 },
                    { text: 3 },
                    { text: 4 },
                    { text: 5 },
                    { text: "NEXT" }
                  ]}
                  color="info"
                />
              </GridItem>
            </GridContainer>
          </div>
          <div className={classes.space50} />
        </div>
      </div>
    );
  }
}

export default withStyles(typographyStyle)(SectionTypography);
