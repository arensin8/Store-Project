const Controller = require("../controller");

class PaymentController extends Controller{
    paymentGateway(req,res,next){
        try {
            
        } catch (error) {
            next(error)
        }
    }
}

module.exports = {
    PaymentController : new PaymentController()
}