const adminModel = require("../models/adminModel");
const { responseReturn } = require("../utiles/response");
const bcrpty = require("bcrypt");
const { createToken } = require("../utiles/tokenCreate");
const {
  default: Register,
} = require("../../dashboard/src/views/auth/Register");
const {
  seller_register,
} = require("../../dashboard/src/store/Reducers/authReducer");

class authControllers {
  admin_login = async (req, res) => {
    const { email, password } = req.body;
    try {
      const admin = await adminModel.findOne({ email }).select("+password");
      // console.log(admin);
      if (admin) {
        const match = await bcrpty.compare(password, admin.password);
        // console.log(match);
        if (match) {
          const token = await createToken({
            id: admin.id,
            role: admin.role,
          });
          res.cookie("accessToken", token, {
            expires: new Date(Date.now() + 7 * 24 * 60 * 1000),
          });
          responseReturn(res, 200, { token, message: "Login Successs" });
        } else {
          responseReturn(res, 404, { error: "password wrong" });
        }
      } else {
        responseReturn(res, 404, { error: "Email not Found" });
      }
    } catch (error) {
      responseReturn(res, 500, { error: error.message });
    }
  };
  // end methode

  seller_register = async (req, res) => {
    const { email, name, password } = req.body;
  };
  getUser = async (req, res) => {
    const { id, role } = req;

    try {
      if (role === "admin") {
        const user = await adminModel.findById(id);
        responseReturn(res, 200, { userInfo: user });
      } else {
        console.log("seller info");
      }
    } catch (error) {
      console.log(error.message);
    }
  };
}

module.exports = new authControllers();
