var nodemailer = require("nodemailer"); // khai báo sử dụng module nodemailer
const sendMailSuccess = (order, user) => {
  var transporter = nodemailer.createTransport({
    // config mail server
    service: "Gmail",
    auth: {
      user: "kenkentrang195@gmail.com",
      pass: "ztvbhrvhzycxbgzt",
    },
  });
  var mainOptions = {
    // thiết lập đối tượng, nội dung gửi mail
    from: "Thanh Batmon",
    to: "hongnhat.le190501@gmail.com",
    subject: "Test Nodemailer",
    text: "Notifying order status",
    html: `
    <html lang="en">
    
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Order Confirmation</title>
        <style>
            body {
                font-family: Arial, sans-serif;
                line-height: 1.6;
                color: #333;
                max-width: 600px;
                margin: 0 auto;
                padding: 20px;
            }
    
            h1 {
                color: #007BFF;
            }
    
            p {
                margin-bottom: 10px;
            }
    
            .success-message {
                background-color: #D4EDDA;
                border-color: #C3E6CB;
                color: #155724;
                padding: 15px;
                margin-bottom: 20px;
                border-radius: 4px;
            }
    
            .footer {
                margin-top: 30px;
                text-align: center;
                color: #888;
            }
        </style>
    </head>
    
    <body>
        <h1>Order Confirmation</h1>
        <h2>Dear ${user.name},</h2>
        <div class="success-message">
            <p>Your order has been successfully placed.</p>
            <p>Order ID: ${order.orderId}</p>
            <p>Total Quantity: ${order.totalQuantity} </p>
        </div>
    
        <p>Thank you for shopping with us. We hope to see you again soon!</p>
    
        <div class="footer">
            <p>This is an automated email, please do not reply.</p>
        </div>
    </body>
    
    </html>
    `,
  };
  transporter.sendMail(mainOptions, function (err, info) {
    if (err) {
      console.log(err);
      res.redirect("/");
    } else {
      console.log("Message sent: " + info.response);
      res.redirect("/");
    }
  });
};

const sendMailFailed = (order, user) => {
  var transporter = nodemailer.createTransport({
    // config mail server
    service: "Gmail",
    auth: {
      user: "kenkentrang195@gmail.com",
      pass: "ztvbhrvhzycxbgzt",
    },
  });
  var mainOptions = {
    // thiết lập đối tượng, nội dung gửi mail
    from: "Thanh Batmon",
    to: "hongnhat.le190501@gmail.com",
    subject: "Test Nodemailer",
    text: "Notifying order successfully",
    html: `
      <html lang="en">
      
      <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Order Confirmation</title>
          <style>
              body {
                  font-family: Arial, sans-serif;
                  line-height: 1.6;
                  color: #333;
                  max-width: 600px;
                  margin: 0 auto;
                  padding: 20px;
              }
      
              h1 {
                  color: #007BFF;
              }
      
              p {
                  margin-bottom: 10px;
              }
      
              .success-message {
                  background-color: #D4EDDA;
                  border-color: #C3E6CB;
                  color: #155724;
                  padding: 15px;
                  margin-bottom: 20px;
                  border-radius: 4px;
              }
      
              .footer {
                  margin-top: 30px;
                  text-align: center;
                  color: #888;
              }
          </style>
      </head>
      
      <body>
          <h1>Order Confirmation</h1>
          <h2>Dear ${user.name},</h2>
          <div class="success-message">
              <p>Your order has been canceled.</p>
              <p>Order ID: ${order.orderId}</p>
              <p>Reason: ${order.reason} </p>
          </div>
      
          <p>Thank you for shopping with us. Please contact for more detail!</p>
      
          <div class="footer">
              <p>This is an automated email, please do not reply.</p>
          </div>
      </body>
      
      </html>
      `,
  };
  transporter.sendMail(mainOptions, function (err, info) {
    if (err) {
      console.log(err);
      res.redirect("/");
    } else {
      console.log("Message sent: " + info.response);
      res.redirect("/");
    }
  });
};

const sendMailUpdateStatus = (order, user) => {
  var transporter = nodemailer.createTransport({
    // config mail server
    service: "Gmail",
    auth: {
      user: "kenkentrang195@gmail.com",
      pass: "ztvbhrvhzycxbgzt",
    },
  });
  var mainOptions = {
    // thiết lập đối tượng, nội dung gửi mail
    from: "Thanh Batmon",
    to: "hongnhat.le190501@gmail.com",
    subject: "Test Nodemailer",
    text: "Notifying order successfully",
    html: `
        <html lang="en">
        
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Order Confirmation</title>
            <style>
                body {
                    font-family: Arial, sans-serif;
                    line-height: 1.6;
                    color: #333;
                    max-width: 600px;
                    margin: 0 auto;
                    padding: 20px;
                }
        
                h1 {
                    color: #007BFF;
                }
        
                p {
                    margin-bottom: 10px;
                }
        
                .success-message {
                    background-color: #D4EDDA;
                    border-color: #C3E6CB;
                    color: #155724;
                    padding: 15px;
                    margin-bottom: 20px;
                    border-radius: 4px;
                }
        
                .footer {
                    margin-top: 30px;
                    text-align: center;
                    color: #888;
                }
            </style>
        </head>
        
        <body>
            <h1>Order Confirmation</h1>
            <h2>Dear ${user.name},</h2>
            <div class="success-message">
                <p>Your order has been update to ${order.status}</p>
                <p>Order ID: ${order.orderId}</p>
                <p>Reason: ${order.reason} </p>
            </div>
        
            <p>Thank you for shopping with us. Please contact for more detail!</p>
        
            <div class="footer">
                <p>This is an automated email, please do not reply.</p>
            </div>
        </body>
        
        </html>
        `,
  };
  transporter.sendMail(mainOptions, function (err, info) {
    if (err) {
      console.log(err);
      res.redirect("/");
    } else {
      console.log("Message sent: " + info.response);
      res.redirect("/");
    }
  });
};

module.exports = { sendMailSuccess, sendMailFailed, sendMailUpdateStatus };