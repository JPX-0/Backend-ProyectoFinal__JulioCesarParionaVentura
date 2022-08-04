const codeInfo = new (require("../../../../md/app.info"))().services.message;
const Repository = require("../../../models/repositories/index.repository");
const Dto = require("../../../models/dtos/index.dto");
const daosFactory = require("../../../models/daos/daos.factory");
const { normalizedMessages } = require("../../../models/normalizer/messages");
const env = require("../../../utils/config/env.config");
const sendEmail = require("../../../utils/sendEmail.utils");
const CustomError = require("../../../utils/error.utils");
const STATUS = require("../../../utils/constants/status.constants");

class MessageServices {
	constructor() {
    this.dao = { 
      message: daosFactory().message
    };
    this.dto = {
      generate: new Dto().generate,
      generic: new Dto().generic
    }
    this.repo = { 
      message: new Repository().message,
      user: new Repository().user
    }
	}

  async getAll(idUser, typeRender) {
    /************************/
    /****** Learn More ******/
    /**/ codeInfo.getAll  /**/
    /************************/
    if(typeRender.toLowerCase() == "all") 
      return normalizedMessages(await this.repo.message.populate({}, "author"));
    if(typeRender.toLowerCase() == "email") 
      return normalizedMessages(await this.repo.message.populate({ email: idUser, all: true }, "author"));
    if(typeRender.toLowerCase() == "account") 
      return normalizedMessages(await this.repo.message.populate({ renderUserAccount: idUser, all: true }, "author"));
  }

  async saveMessageAdmin(idUser, message, renderRoute) {
    /**********************************/
    /*********** Learn More ***********/
    /**/ codeInfo.saveMessageAdmin  /**/
    /**********************************/
    const userAdminFound = await this.repo.user.get({ email: env.ADMIN_EMAIL });
    const responseAdmin = { author: userAdminFound._id, message };
    if(renderRoute) responseAdmin.route = renderRoute;
    const creatingMessage = this.dto.generate.message(idUser, responseAdmin);
    const createdMessage = this.dto.generic.create(creatingMessage);
    await this.repo.message.create(createdMessage);
    return createdMessage;
  }

  async saveMessageUser(user, message) {
    /********************************/
    /********** Learn More **********/
    /**/ codeInfo.saveMessageUser /**/
    /********************************/
    const creatingMessage = this.dto.generate.message(user._id, {
      author: user._id, 
      nickname: user.email, 
      type: "usuario", 
      message
    });
    if(user.email == env.ADMIN_EMAIL) {
      creatingMessage.nickname = "e-Commerce"
      creatingMessage.type = "sistema";
    }
    const createdMessage = await this.repo.message.create(this.dto.generic.create(creatingMessage));
    return await this.repo.message.populate({ id: createdMessage._id }, "author");
  }

  async evaluateResponse(idUser, message) {
    /**********************************/
    /*********** Learn More ***********/
    /**/ codeInfo.evaluateResponse  /**/
    /**********************************/
    const responseUser = message.toLowerCase();
    if(responseUser == "a" || responseUser == "a)") {
      const responseSistema = `Ubíquese en la cabecera de la página y dele click a "Mi carrito" o ingrese a la siguiente ruta:`
      return { 
        response: await this.saveMessageAdmin(idUser, responseSistema, { path: "/cart", name: "Ir a mi Carrito" }), 
        listen: false 
      }
    } else if(responseUser == "b" || responseUser == "b)") {
      await sendEmail({ support: { emailAdmin: env.ADMIN_EMAIL, idUser } }, "Support request");
      const responseSistema = `Espere unos minutos por favor, un asesor se comunicara con Ud enseguida...`
      return { 
        response: await this.saveMessageAdmin(idUser, responseSistema), 
        listen: false 
      }
    } else if(responseUser == "c" || responseUser == "c)") {
      return { 
        response: await this.saveMessageAdmin(idUser, "Adios."), 
        listen: false 
      }
    } else {
      const responseSistema = `No se logró descifrar su mensaje, por favor vuelva a intentarlo.`
      return { 
        response: await this.saveMessageAdmin(idUser, responseSistema), 
        listen: true 
      }
    }
  }
  async validateEmail(email, emailUser) {
    /******************************/
    /********* Learn More *********/
    /**/ codeInfo.validateEmail /**/
    /******************************/
    await this.repo.user.get({ email });
    if(email != emailUser) throw new CustomError(STATUS.ACCESS_PROHIBITED, "The email you entered does not belong to you.")
  }
}

module.exports = MessageServices;