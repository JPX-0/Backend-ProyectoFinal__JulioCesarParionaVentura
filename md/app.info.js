class ShowInfo {
  get index() {
    /**********************************************************************************/
    /* -Description:                                                                  */
    /*    Corre el servidor en modo Fork o Cluster de acuerdo la configuracion        */
    /*    ingresada previamente.                                                      */
    /* -Input:                                                                        */
    /*    [argv] >>> "cluster" || "fork"                                              */
    /* -Output:                                                                       */
    /*    --none--                                                                    */
    /**********************************************************************************/
  }
  get appServer() {
    /**********************************************************************************/
    /* -Description:                                                                  */
    /*    Ejecuta el servidor usando Express.                                         */
    /* -Input:                                                                        */
    /*    --none--                                                                    */
    /* -Output:                                                                       */
    /*    --none--                                                                    */
    /**********************************************************************************/
  }
  get middleware() {
    return ({
      get auth() {
        /**********************************************************************************/
        /* -Description:                                                                  */
        /*    Verifica si el usuario está autenticado.                                    */
        /* -Input:                                                                        */
        /*    [app parameters] >>> req, res, next                                         */
        /* -Output:                                                                       */
        /*    [middleware?]                                                               */
        /*    [redirect] >>> "/"                                                          */
        /**********************************************************************************/
      },
      get errorMiddleware() {
        /**********************************************************************************/
        /* -Description:                                                                  */
        /*    Retorna una respuesta tipo json para todos los errores generados.           */
        /* -Input:                                                                        */
        /*    [app parameters] >>> error, req, res, next                                  */
        /* -Output:                                                                       */
        /*    [error] >>> "Error controlado"                                              */
        /*    [errorBack] >>> "Error no controlado"                                       */
        /**********************************************************************************/
      },
      get isAdmin() {
        /**********************************************************************************/
        /* -Description:                                                                  */
        /*    Verifica si el usuario es admin.                                            */
        /* -Input:                                                                        */
        /*    [app parameters] >>> req, res, next                                         */
        /* -Output:                                                                       */
        /*    [middleware?]                                                               */
        /*    [error] >>> ACCESS_PROHIBITED                                               */
        /**********************************************************************************/
      },
      get passport() {
        /**********************************************************************************/
        /* -Description:                                                                  */
        /*    Middleware que provee un mecanismo de autenticacion para el usuario.        */
        /* -Input:                                                                        */
        /*    [Class] >>> Strategy("login" || "signup")                                   */
        /*    [serializer] >>> ID                                                         */
        /*    [deserializer] >>> user                                                     */
        /* -Output:                                                                       */
        /*    [auth] >>> redirect >>> "/products"                                         */
        /*    [middleware]                                                                */
        /*    [error] >>> redirect >>> "/login-error" || "/signup-error"                  */
        /**********************************************************************************/
        // xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
      },
      get routeExist() {
        /**********************************************************************************/
        /* -Description:                                                                  */
        /*    Verifica si la ruta existe.                                                 */
        /* -Input:                                                                        */
        /*    [app parameters] >>> req, res, next                                         */
        /* -Output:                                                                       */
        /*    [middleware]                                                                */
        /*    [error?] >>> NOT_FOUND                                                      */
        /**********************************************************************************/
      }
    })
  }
  get services() {
    return ({
      get cart() {
        return ({
          get getCartById() {
            /**********************************************************************************/
            /* -Description:                                                                  */
            /*    Retorna un carrito encontrado por un ID.                                    */
            /* -Input:                                                                        */
            /*    [ID] >>> cart || user                                                       */
            /*    [notReturnError?] >>> Boolean                                               */
            /* -Output:                                                                       */
            /*    [Object] >>> GET >>> cart                                                   */
            /*    [Boolean] >>> false                                                         */
            /*    [error?] >>> NOT_FOUND >>> cart                                             */
            /**********************************************************************************/
          },
          get createCart() {
            /**********************************************************************************/
            /* -Description:                                                                  */
            /*    Crea un carrito asignado a un unico usuario existente.                      */
            /* -Input:                                                                        */
            /*    [ID] >>> user                                                               */
            /* -Output:                                                                       */
            /*    [error?] >>> NOT_FOUND >>> user                                             */
            /*    [Object?] >>> POST >>> cart                                                 */
            /*    [error] >>> ACCESS_PROHIBITED                                               */
            /**********************************************************************************/
          },
          get getProductInCartById() {
            /**********************************************************************************/
            /* -Description:                                                                  */
            /*    Retorna un producto en stock encontrado en su respectivo carrito.           */
            /* -Input:                                                                        */
            /*    [ID] >>> cart || user                                                       */
            /*    [ID] >>> stock                                                              */
            /* -Output:                                                                       */
            /*    [error] >>> NOT_FOUND >>> cart                                              */
            /*    [error?] >>> NOT_FOUND >>> stock                                             */
            /*    [Object] >>> GET >>> stock                                                  */
            /**********************************************************************************/
          },
          get getVoucher() {
            /**********************************************************************************/
            /* -Description:                                                                  */
            /*    Genera un voucher especial para enviar el mail de la orden y para           */
            /*    renderizar una vista de los productos comprados.                            */
            /* -Input:                                                                        */
            /*    [ID] >>> order                                                              */
            /*    [Object] >>> user                                                           */
            /* -Output:                                                                       */
            /*    [error] >>> NOT_FOUND >>> order                                             */
            /*    [Object] >>> DTO >>> voucher                                                */
            /**********************************************************************************/
          },
          get removeOneProductFromCart() {
            /**********************************************************************************/
            /* -Description:                                                                  */
            /*    Simula la eliminacion de un producto del carrito.                           */
            /* -Input:                                                                        */
            /*    [ID] >>> stock                                                              */
            /*    [ID] >>> user                                                               */
            /* -Output:                                                                       */
            /*    [error] >>> NOT_FOUND >>> cart                                              */
            /*    [error?] >>> NOT_FOUND >>> stock                                            */
            /*    [Object] >>> PUT >>> cart                                                   */
            /**********************************************************************************/
          },
          get addToCart() {
            /**********************************************************************************/
            /* -Description:                                                                  */
            /*    Agrega un stock de productos al carrito y aumenta la cantidad de productos  */
            /*    solicitados por el usuario simulando la cantidad de productos a comprar.    */
            /* -Input:                                                                        */
            /*    [ID] >>> stock                                                              */
            /*    [ID] >>> cart                                                               */
            /*    [qty] >>> Number                                                            */
            /* -Output:                                                                       */
            /*    [error] >>> NOT_FOUND >>> stock                                             */
            /*    [error] >>> NOT_FOUND >>> cart                                              */
            /*    [error?] >>> BAD_REQUEST >>> stock                                          */
            /*    [Object] >>> PUT >>> cart                                                   */
            /**********************************************************************************/
          },
          get generatingOrder() {
            /**********************************************************************************/
            /* -Description:                                                                  */
            /*    Crea una nueva orden siempre y cuando el carrito tenga 1 o más productos,   */
            /* -Input:                                                                        */
            /*    [ID] >>> cart                                                               */
            /*    [Object] >>> user                                                           */
            /* -Output:                                                                       */
            /*    [error] >>> NOT_FOUND >>> cart                                              */
            /*    [error?] >>> BAD_REQUEST >>> cart                                           */
            /*    [error?] >>> NOT_AUTHORIZED >>> user                                        */
            /*    [error] >>> NOT_FOUND >>> order                                             */
            /*    [Object] >>> POST >>> order                                                 */
            /**********************************************************************************/
          }
        })
      },
      get message() {
        return ({
          get getAll() {
            /**********************************************************************************/
            /* -Description:                                                                  */
            /*    Retorna todos los los mensajes populando al usuario.                        */
            /* -Input:                                                                        */
            /*    [ID] >>> user                                                               */
            /*    [typeRender] >>> String >>> "all" || "email" || "account"                   */
            /* -Output:                                                                       */
            /*    [Object?] >>> normalized(POPULATE >>> message("author"))                    */
            /**********************************************************************************/
          },
          get saveMessageAdmin() {
            /**********************************************************************************/
            /* -Description:                                                                  */
            /*    Genera una respuesta como admin/support.                                    */
            /* -Input:                                                                        */
            /*    [ID] >>> user                                                               */
            /*    [message] >>> String                                                        */
            /*    [renderRoute?] >>> Object = { path >>> String, name >>> String }            */
            /* -Output:                                                                       */
            /*    [error] >>> NOT_FOUND >>> user >>> ADMIN_EMAIL                              */
            /*    [Object] >>> POST >>> message                                               */
            /**********************************************************************************/
          },
          get saveMessageUser() {
            /**********************************************************************************/
            /* -Description:                                                                  */
            /*    Genera una respuesta como usuario.                                          */
            /* -Input:                                                                        */
            /*    [Object] >>> user                                                           */
            /*    [message] >>> String                                                        */
            /* -Output:                                                                       */
            /*    [Object] >>> POST && POPULATE >>> message("author")                         */
            /**********************************************************************************/
          },
          get evaluateResponse() {
            /**********************************************************************************/
            /* -Description:                                                                  */
            /*    Retorna respuestas de acuerdo a los mensajes recibidos por el usuario.      */
            /* -Input:                                                                        */
            /*    [ID] >>> user                                                               */
            /*    [message] >>> String                                                        */
            /* -Output:                                                                       */
            /*    [error?] >>> NOT_FOUND >>> user >>> ADMIN_EMAIL                             */
            /*    [Object?] >>> { response >>> POST >>> message, listen >>> Boolean }         */
            /**********************************************************************************/
          },
          get validateEmail() {
            /**********************************************************************************/
            /* -Description:                                                                  */
            /*    Evalua si el email existe y si le pertenece al usuario.                     */
            /* -Input:                                                                        */
            /*    [email] >>> Any                                                             */
            /*    [email] >>> user                                                            */
            /* -Output:                                                                       */
            /*    [error] >>> NOT_FOUND                                                       */
            /*    [error?] >>> ACCESS_PROHIBITED                                              */
            /**********************************************************************************/
          }
        })
      },
      get stock() {
        return ({
          get getAllProductStock() {
            /**********************************************************************************/
            /* -Description:                                                                  */
            /*    Retorna todos los stock de productos solicitados por el usaurio.            */
            /* -Input:                                                                        */
            /*    [maxPrice] >>> Number                                                       */
            /*    [searchName] >>> String                                                     */
            /*    [category?] >>> String                                                      */
            /* -Output:                                                                       */
            /*    [error?] >>> NOT_FOUND >>> stock                                            */
            /*    [Object] >>> {                                                              */
            /*                   value >>> Number,                                            */
            /*                   getProducts >>> Object >>> GET >>> stock                     */
            /*                   message >>> String                                           */
            /*                 }                                                              */
            /**********************************************************************************/
          },
          get getProductStock() {
            /**********************************************************************************/
            /* -Description:                                                                  */
            /*    Indica cuantos productos en stock tiene actualmente el producto solicitado  */
            /*    por el cliente.                                                             */
            /* -Input:                                                                        */
            /*    [ID] >>> stock                                                              */
            /*    [ID] >>> user                                                               */
            /* -Output:                                                                       */
            /*    [error] >>> NOT_FOUND >>> cart                                              */
            /*    [error] >>> NOT_FOUND >>> stock                                             */
            /*    [Number]                                                                    */
            /**********************************************************************************/
          },
          get addProductToStock() {
            /**********************************************************************************/
            /* -Description:                                                                  */
            /*    Agrega un nuevo stock de productos, y en caso ya exista uno aumentara su.   */
            /*    stock en uno.                                                               */
            /* -Input:                                                                        */
            /*    [Object] >>> req.body                                                       */
            /* -Output:                                                                       */
            /*    [Object] >>> POST || PUT >>> stock                                          */
            /**********************************************************************************/
          },
          get update() {
            /**********************************************************************************/
            /* -Description:                                                                  */
            /*    Actualiza el stock del producto solicitado y todos los productos            */
            /*    pertenecientes.                                                             */
            /* -Input:                                                                        */
            /*    [ID] >>> stock                                                              */
            /*    [object] >>> req.body                                                       */
            /* -Output:                                                                       */
            /*    [error] >>> NOT_FOUND >>> stock                                             */
            /*    [String] >>> PUT >>> stock                                                  */
            /**********************************************************************************/
          }
        })
      },
      get user() {
        return ({
          get login() {
            /**********************************************************************************/
            /* -Description:                                                                  */
            /*    Logeo del usuario.                                                          */
            /* -Input:                                                                        */
            /*    [Object] >>> { email >>> String, password >>> String }                      */
            /* -Output:                                                                       */
            /*    [Object] >>> { user >>> Object >>> GET >>> user, error >>> Boolean }        */
            /**********************************************************************************/
          },
          get signup() {
            /**********************************************************************************/
            /* -Description:                                                                  */
            /*    Registra el usuario y se genera un carrito. (se puede ignorar la creación   */
            /*    del carrito desde variable de entorno ".env")                               */
            /* -Input:                                                                        */
            /*    [email] >>> String                                                          */
            /*    [Object] >>> { password >>> String, repeatPassword >>> String }             */
            /*    [Object] >>> req.body                                                       */
            /*    [env?] >>> CREATE_CART_TOGETHER_WITH_USER                                   */
            /* -Output:                                                                       */
            /*    [Object] >>> {                                                              */
            /*                   user >>> Object >>> POST >>> user                            */
            /*                   cart >>> Object >>> POST >>> cart                            */
            /*                   error >>> Boolean                                            */
            /*                 }                                                              */
            /**********************************************************************************/
          },
          get unregistered() {
            /**********************************************************************************/
            /* -Description:                                                                  */
            /*    Se asegura de eliminar el usuario y el carrito en caso fueran creados luego */
            /*    de detectar un error al registrar un usuario.                               */
            /* -Input:                                                                        */
            /*    [ID?] >>> user                                                              */
            /*    [ID?] >>> cart                                                              */
            /* -Output:                                                                       */
            /*    [Boolean]                                                                   */
            /**********************************************************************************/
          },
          get update() {
            /**********************************************************************************/
            /* -Description:                                                                  */
            /*    Se asegura de eliminar el usuario y el carrito en caso fueran creados luego */
            /*    de detectar un error al registrar un usuario.                               */
            /* -Input:                                                                        */
            /*    [ID] >>> user                                                               */
            /*    [ID] >>> cart                                                               */
            /* -Output:                                                                       */
            /*    [error] >>> NOT_FOUND >>> stock                                             */
            /*    [error?] >>> NOT_FOUND >>> order                                            */
            /*    [error?] >>> NOT_FOUND >>> cart                                             */
            /*    [String] >>> PUT >>> user                                                   */
            /**********************************************************************************/
          }
        })
      }
    })
  }
  get controller() {
    return ({
      get json() {
        /**********************************************************************************/
        /* -Description:                                                                  */
        /*    Retorna respuestas tipo json. (Pensado para api-restfull).                  */
        /* -Input:                                                                        */
        /*    --none--                                                                    */
        /* -Output:                                                                       */
        /*    [Class] >>> cart >>> {                                                      */
        /*                           getCart >>> GET >>> cart                             */
        /*                           getProduct >>> GET >>> cart >>> stock                */
        /*                           postCart >>> POST >>> cart                           */
        /*                           createOrder >>> send >>> nodemailer(DTO >>> voucher) */
        /*                                       >>> POST >>> order                       */
        /*                           addProduct >>> PUT >>> cart                          */
        /*                           removeProduct >>> PUT >>> cart                       */
        /*                           deleteCart >>> DELETE >>> cart                       */
        /*                         }                                                      */
        /*    [Class] >>> product >>> {                                                   */
        /*                              getProduct >>> GET >>> stock                      */
        /*                              postProduct >>> POST || PUT >>> stock             */
        /*                                          >>> POST >>> product                  */
        /*                              putProduct >>> PUT >>> stock && product           */
        /*                              deleteProduct >>> DLETE >>> stock && product      */
        /*                            }                                                   */
        /*    [Class] >>> user >>> {                                                      */
        /*                           getUser >>> GET >>> user                             */
        /*                           postUser >>> POST >>> user && cart?                  */
        /*                           putUser >>> PUT >>> user && order? && cart?          */
        /*                           deleteUser >>> DELETE >>> user                       */
        /*                         }                                                      */
        /**********************************************************************************/
      },
      get authenticate() {
        /**********************************************************************************/
        /* -Description:                                                                  */
        /*    Retorna un middleware de autenticación.                                     */
        /* -Input:                                                                        */
        /*    --none--                                                                    */
        /* -Output:                                                                       */
        /*    [Object] >>> local >>> {                                                    */
        /*                             login >>> GET >>> user                             */
        /*                             signup >>> send >>> nodemailer(user)               */
        /*                                    >>> POST >>> user && cart?                  */
        /*                           }                                                    */
        /**********************************************************************************/
      },
      get views() {
        /**********************************************************************************/
        /* -Description:                                                                  */
        /*    Retorna vistas.                                                             */
        /* -Input:                                                                        */
        /*    --none--                                                                    */
        /* -Output:                                                                       */
        /*    [Object] >>> {                                                              */
        /*                   renderChat >>> render >>> hbs                                */
        /*                   renderConfig >>> render >>> hbs                              */
        /*                   renderInfo >>> render >>> pug                                */
        /*                   renderSessions >>> send >>> html                             */
        /*                                  >>> redirect? >>> "/products"                 */
        /*                   renderProfile >>> render >>> ejs                             */
        /*                   renderProfilePicture >>> render >>> ejs                      */
        /*                   renderLogout >>> render >>> ejs                              */
        /*                                >>> redirect? >>> "/"                           */
        /*                   renderError >>> render >>> ejs                               */
        /*                   renderProducts >>> render >>> ejs                            */
        /*                   renderProduct >>> render >>> ejs                             */
        /*                   renderCart >>> render >>> ejs                                */
        /*                   addToCart >>> redirect >>> "/cart"                           */
        /*                   buyCart >>> send >>> nodemailer(DTO >>> voucher)             */
        /*                           >>> redirect >>> "/cart?myOrder"                     */
        /*                 }                                                              */
        /**********************************************************************************/
      },
      get ws() {
        /**********************************************************************************/
        /* -Description:                                                                  */
        /*    Inicializa la app con socke.io.                                             */
        /* -Input:                                                                        */
        /*    --none--                                                                    */
        /* -Output:                                                                       */
        /*    [Class] >>> message >>> { init >>> socket.io && express-session }           */
        /**********************************************************************************/
      }
    })
  }
}

module.exports = ShowInfo;