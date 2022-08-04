const codeInfo = new (require("../../../../md/app.info"))().services.stock;
const Repository = require("../../../models/repositories/index.repository");
const Dto = require("../../../models/dtos/index.dto");
const daosFactory = require("../../../models/daos/daos.factory");

class StockServices {
	constructor() {
    this.dao = { 
      product: daosFactory().product, 
      stock: daosFactory().stock 
    };
    this.dto = {
      generate: new Dto().generate,
      generic: new Dto().generic
    }
    this.repo = { 
      cart: new Repository().cart, 
      product: new Repository().product, 
      stock: new Repository().stock 
    }
	}

  async getAllProductStock(maxPrice, searchName, category) {
    /**********************************/
    /*********** Learn More ***********/
    /**/ codeInfo.getAllProductStock  /**/
    /**********************************/
    const value = (maxPrice == undefined || null || NaN || "") ? 1000 : maxPrice;
    let nameProductFound;
    let products;
    let searchProducts;
    if(category) {
      const productCategory = await this.repo.stock.get({ category, all: true });
      const priceProduct = maxPrice ? (productCategory.filter(e => e.price < maxPrice) || []) :false;
      const nameProduct = searchName ? (
        nameProductFound = productCategory.find(e => e.title == searchName),
        nameProductFound == null ? [] : [nameProductFound]
      ) : false;
      searchProducts = priceProduct || nameProduct || productCategory;
      products = searchProducts || productCategory;
    } else {
      const priceProduct = maxPrice ? await this.repo.stock.get({ price: maxPrice, all: true }) : false;
      const nameProduct = searchName ? (
        nameProductFound = await this.dao.stock.getByTitle(searchName),
        nameProductFound == null ? [] : [nameProductFound]
      ) : false;
      searchProducts = priceProduct || nameProduct;
      products = searchProducts || await this.repo.stock.get({});
    }
    const message = searchProducts ? "Lo sentimos, no se encontró el producto." : "Ups! no tenemos productos hoy.";
    return { value, getProducts: products, message }
  }

  async getProductStock(idStock, idUser) {
    /********************************/
    /********** Learn More **********/
    /**/ codeInfo.getProductStock /**/
    /********************************/
    const cartFound = await this.repo.cart.get({ author: idUser });
    const stockProduct = await this.repo.stock.get({ id: idStock });
    const productStockFoundInCart = cartFound.items.find(e => e.product.toString() == stockProduct._id.toString());
    let inStock;
    if(productStockFoundInCart) inStock = stockProduct.items.length - productStockFoundInCart.amount;
    else inStock = stockProduct.items.length;
    return inStock;
  }

  async addProductToStock(product) {
    /**********************************/
    /*********** Learn More ***********/
    /**/ codeInfo.addProductToStock /**/
    /**********************************/
    const addIdProduct = async (stockProduct) => {
      const creatingProduct = this.dto.generate.product(stockProduct);
      const createdProduct = await this.repo.product.create(this.dto.generic.create(creatingProduct));
      stockProduct.items.push(createdProduct._id);
      stockProduct.stock = stockProduct.items.length;
      await this.repo.stock.update(stockProduct._id, stockProduct);
      return stockProduct;
    }
    const stockProductFound = await this.dao.stock.getByTitle(product.title);
    if(stockProductFound) return await addIdProduct(stockProductFound);
    const creatingStockProduct = this.dto.generate.stock(product);
    const createdStockProduct = await this.repo.stock.create(this.dto.generic.create(creatingStockProduct));
    return await addIdProduct(createdStockProduct);
  }

  async update(idStock, product) {
    /************************/
    /****** Learn More ******/
    /**/ codeInfo.update  /**/
    /************************/
    const updatingProduct = (dataToUpdate, updater) => {
      if(updater.title) dataToUpdate.title = updater.title;
      if(updater.price) dataToUpdate.price = +updater.price;
      if(updater.thumbnail) dataToUpdate.thumbnail = updater.thumbnail;
      if(updater.category) dataToUpdate.category = updater.category;
      return dataToUpdate;
    };
    const stockProductFound = await this.repo.stock.get({ id: idStock });
    const updatedStockProduct = updatingProduct(stockProductFound, product);
		const message = await this.repo.stock.update(idStock, this.dto.generic.update(updatedStockProduct));
    await updatedStockProduct.items.forEach(async idProd => {
      const productFound = await this.dao.product.getById(idProd);
      if(productFound) {
        const updatedProduct = updatingProduct(productFound, product);
        await this.repo.product.update(idProd, this.dto.generic.update(updatedProduct));
      }
    });
    return message;
  }
}

module.exports = StockServices;