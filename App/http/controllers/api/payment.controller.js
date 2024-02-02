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
        throw new createHttpError.BadRequest("Your basket is empty!");
      const basket = (await getBasketOfUser(user._id))?.[0];
      if (!basket?.paymentDetails?.paymentAmount)
        throw new createHttpError.BadRequest("Payment details not found!");
      const zarinpal_request_url =
        "https://api.zarinpal.com/pg/v4/payment/request.json";
      const zarinpalGatewayURL = "https://www.zarinpal.com/pg/StartPay";
      const description = "For purchasing course or product",
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
      throw createHttpError.BadRequest("Connecting tp gateway failed");
    } catch (error) {
      next(error);
    }
  }

  async verifyPayment(req, res, next){
    try {
        const {Authority: authority} = req.query;
        const verifyURL = "https://api.zarinpal.com/pg/v4/payment/verify.json";
        const payment = await PaymentModel.findOne({authority});
        if(!payment) throw createHttpError.NotFound("Pending transaction not found!")
        if(payment.verify) throw createHttpError.BadRequest("Your transaction has been already paid!")
        const verifyBody = JSON.stringify({
            authority,
            amount: payment.amount,
            merchant_id: process.env.ZARINPAL_MERCHANTID,
        })
        const verifyResult = await fetch(verifyURL, {
            method: "POST",
            headers: {
                'Content-Type': "application/json"
            },
            body: verifyBody
        }).then(result => result.json())
        if(verifyResult.data.code == 100){
            await PaymentModel.updateOne({authority}, {
                $set: {
                    refID: verifyResult.data.ref_id,
                    cardHash: verifyResult.data.card_hash,
                    verify: true
                }
            })
            const user = await UserModel.findById(payment.user)
            await UserModel.updateOne({_id: payment.user}, {
                $set: {
                    Courses: [...payment?.basket?.payDetail?.courseIds || [], ...user.Courses],
                    Products: [...payment?.basket?.payDetail?.productIds || [], ...user.Products],
                    basket: {
                        courses: [],
                        products: []
                    }
                }
            })
            return res.status(HttpStatus.OK).json({
                statusCode: HttpStatus.OK,
                data: {
                    message: "Payment completed successfully"
                }
            })
        }
        throw createHttpError.BadRequest("Payment unseccessfull!")
    } catch (error) {
        next(error)
    }
}
}

module.exports = {
  PaymentController: new PaymentController(),
};
