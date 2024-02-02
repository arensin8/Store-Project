const createHttpError = require("http-errors");
const Controller = require("../controller");
const { getBasketOfUser } = require("../../../utils/functions");
const { default: axios } = require("axios");

class PaymentController extends Controller {
  async paymentGateway(req, res, next) {
    try {
      const user = req.user;
      if (user.basket.courses.length && user.basket.products.length == 0)
        throw new createHttpError.BadRequest("Your basket is empty!");
      const basket = (await getBasketOfUser(user._id))[0];
      if (!basket?.paymentDetails?.paymentAmount)
        throw new createHttpError.BadRequest("Payment details not found");
      const zarinpal_request_url =
        "https://api.zarinpal.com/pg/v4/payment/request.json";
      const zapripal_options = {
        merchant_id: process.env.ZARINPAL_MERCHANTID,
        amount: basket?.paymentDetails?.paymentAmount,
        description : 'hhh',
        metadata: {
          email: user?.email || "example@domain.com",
          mobile: user.mobile,
        },
        callback_url: "http://localhost:4000/verify",
      };
      const RequestResult = await axios
        .post(zarinpal_request_url, zapripal_options)
        .then((result) => result.data);
      if (RequestResult.data.code == 100 && RequestResult.data.authority) {
        return res.status(HttpStatus.OK).json({
          statusCode: HttpStatus.OK,
          data: {
            // code,
            // basket,
            // gatewayURL: `${zarinpalGatewayURL}/${authority}`,
            RequestResult
          },
        });
      }
      throw createHttpError.BadRequest("Input parameters are invalid");
    } catch (error) {
      next(error);
    }
  }
}

module.exports = {
  PaymentController: new PaymentController(),
};
