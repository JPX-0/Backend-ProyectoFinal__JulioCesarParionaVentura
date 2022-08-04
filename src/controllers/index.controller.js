const codeInfo = new (require("../../md/app.info"))().controller;

class Controller {
  get json() {
    /**********************/
    /***** Learn More *****/
    /**/ codeInfo.json  /**/
    /**********************/
    return ({
      cart: require("./json/cart.controller"),
      product: require("./json/product.controller"),
      user: require("./json/user.controller")
    })
  }

  get authenticate() {
    /******************************/
    /********* Learn More *********/
    /**/ codeInfo.authenticate  /**/
    /******************************/
    return ({
      local: require("./passport/local.controller")
    })
  }

  get views() {
    /**********************/
    /***** Learn More *****/
    /**/ codeInfo.views /**/
    /**********************/
    return ({
      ...require("./views/chat.controller"),
      ...require("./views/server.controller"),
      ...require("./views/session.controller"),
      ...require("./views/store.controller")
    })
  }

  get ws() {
    /********************/
    /**** Learn More ****/
    /**/ codeInfo.ws  /**/
    /********************/
    return ({
      message: require("./ws/message.controller")
    })
  }
}

module.exports = Controller;