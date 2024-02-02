const createHttpError = require("http-errors");
const Controller = require("../controller");
const { getBasketOfUser, invoiceNumberGenerator } = require("../../../utils/functions");
const { default: axios } = require("axios");
const moment = require("moment-jalali");
const { PaymentModel } = require("../../../models/payments");

class PaymentController extends Controller {
  async PaymentGateway(req, res, next) {
    try {
      const user = req.user;
      if (user.basket.courses.length == 0 && user.basket.products.length == 0)
        throw new createHttpError.BadRequest("سبد خرید شما خالی میباشد");
      const basket = (await getBasketOfUser(user._id))?.[0];
      if (!basket?.paymentDetails?.paymentAmount)
        throw new createHttpError.BadRequest("مشخصات پرداخت یافت نشد");
      const zarinpal_request_url =
        "https://api.zarinpal.com/pg/v4/payment/request.json";
      const zarinpalGatewayURL = "https://www.zarinpal.com/pg/StartPay";
      const description = "بابت خرید دوره یا محصولات",
        amount = basket?.paymentDetails?.paymentAmount;
      const zapripal_options = {
        merchant_id:  'xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx',
        amount,
        description,
        metadata: {
          email: user?.email || "example@domain.com",
          mobile: user.mobile,
        },
        callback_url: "http://localhost:3000/verify",
      };
      const RequestResult = await axios
        .post(zarinpal_request_url, zapripal_options)
        .then((result) => result.data)
        .catch((error) => {
            console.error("Axios Error:", error.response.data);
            throw error;
        });
      const { authority, code } = RequestResult.data;

        await PaymentModel.create({
          invoiceNumber: invoiceNumberGenerator(),
          paymentDate: moment().format("YYYYMMDDHHmmss"),
          amount,
          user: user._id,
          description,
          authority,
          verify: false,
          basket,
        });
      if (code == 100 && authority) {
        return res.status(HttpStatus.OK).json({
          statusCode: HttpStatus.OK,
          data: {
            code,
            basket,
            gatewayURL: `${zarinpalGatewayURL}/${authority}`,
          },
        });
      }
      throw createHttpError.BadRequest("اتصال به درگاه پرداخت انجام نشد");
    } catch (error) {
      next(error);
    }
  }
}

module.exports = {
  PaymentController: new PaymentController(),
};
