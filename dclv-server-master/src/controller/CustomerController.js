const { Customer } = require("../models/Customer");
const {
  registerValidationCustomer,
  loginValidation,
} = require("../auth/validation");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const createNewCustomer = async (req, res) => {
  // Validate user
  const { error } = registerValidationCustomer(req.body.data);
  if (error) return res.status(400).send(error.details[0].message);

  // Kiểm tra email có tồn tại hay không
  const emailExist = await Customer.findOne({ email: req.body.email });
  if (emailExist) return res.status(400).send("Email đã tồn tại");

  // Kiểm tra số điện thoại có tồn tại hay không
  const phoneExist = await Customer.findOne({ phone: req.body.phone });
  if (phoneExist) return res.status(400).send("Số điện thoại đã tồn tại");

  // Mã hóa password
  const salt = await bcrypt.genSalt(10);
  const hashPass = await bcrypt.hash(req.body.password, salt);

  const newCustomer = new Customer();
  newCustomer.id = "KH" + (new Date().getTime() % 10000);
  newCustomer.name = req.body.name;
  newCustomer.email = req.body.email;
  newCustomer.password = hashPass;
  newCustomer.phone = req.body.phone;
  newCustomer.address = req.body.address;
  newCustomer.type = true;
  try {
    const Customer = await newCustomer.save();
    res.status(201).send(Customer);
  } catch (err) {
    res.status(400).send(err);
  }
};

const login = async (req, res) => {
  // Validate user
  const { error } = loginValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  // Kiểm tra email
  const userLogin = await Customer.findOne({ email: req.body.email });
  if (!userLogin) return res.status(400).send("Không tìm thấy email");

  // Kiểm tra password
  //const passLogin = await bcrypt.compare(req.body.password, userLogin.password);

  const passLogin = bcrypt.compareSync(req.body.password, userLogin.password);

  if (!passLogin) return res.status(400).send("Mật khẩu không hợp lệ");

  // Ký và tạo token
  const token = jwt.sign({ _id: userLogin._id }, process.env.SECRET_TOKEN);
  res.header("auth-token", token).send({ ...userLogin._doc, jwt: token });
};
const updatePassword = function (req, res) {};

module.exports = {
  createNewCustomer,
  login,
};
