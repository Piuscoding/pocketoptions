const router = require('express').Router();
const User = require('../models/user.model');
const Trade = require('../models/livetradingSchema');
const Widthdraw = require('../models/widthdrawSchema');
const Deposit = require('../models/depositSchema');
const Upgrade = require('../models/upgradeSchema');
const Verify = require('../models/widthdrawSchema');


router.get(
  '/dashboard',
  async (req, res) => {
   res.render('user/dashboard');
  }
);


router.get(
  '/navbarPage',
  async (req, res) => {
  res.render('user/navbarPage');
  }
);

router.get(
  '/verify',
  async (req, res) => {
    const {id} = req.user
    const user = await User.findById(id)
     res.render('user/verify',{user});
  }
);

router.post(
  '/verify/:id',
  async (req, res, next) => {
    let theImage;
  let uploadPath;
  let newImageName;

  if(!req.files || Object.keys(req.files).length === 0){
      console.log('no files to upload')
  }else{
          theImage = req.files.image;
          newImageName = theImage.name;
          uploadPath = require('path').resolve('./') + '/Public/IMG_UPLOADS' + newImageName

          theImage.mv(uploadPath, function(err){
              if(err){
                  console.log(err)
              }
         })

  }
  try{
      const verification = new Verify({
          email: req.body.email,
           username: req.body.username,
           fullname: req.body.fullname,
           city: req.body.city,
           gender: req.body.gender,
           dateofBirth: req.body.dateofBirth,
           marital: req.body.marital,
           age: req.body.age,
           address: req.body.address,
           image: newImageName
      })
      verification.save()
      const id = req.params.id;
      const user = await User.findById(id);
      user.verified.push(verification);
      // await User.findById(id).populate("verify")
      await user.save();
      req.flash('success', 'your verification application was submitted successfully under going review now');
      res.redirect('back'); 
     
  }catch(error){
    next(error);
  }

  }
);
  // const { email, username,fullname,city,gender,dateofBirth,marital,age,address,image} =req.body





router.get(
  '/account',
  async (req, res) => {
    // const person = req.user;
    res.render('user/account');
    // { person }
  }
);


// router.get(
//   '/editProfile',
//   async (req, res) => {
//    res.render('');
//   }
// );


// router.get(
//   '/transactions/:id',
//   async (req, res) => {
//     res.render('');
//   }
// );


router.get(
  '/trading-live',
  async (req, res) => {
    res.render('user/live');
  }
);


router.post(
  '/trading-live/:id',
  async (req, res) => {
  try {
    const liveTrade = new Trade({
        type: req.body.type,
        currencypair: req.body.currencypair, 
        lotsize: req.body.lotsize,
         entryPrice: req.body.entryPrice,
         stopLoss: req.body.stopLoss,
         takeProfit: req.body.takeProfit,
         action:req.body.action
    })
    liveTrade.save()
    const id = req.params.id;
    const user = await User.findById( id);
    user.livetrades.push(liveTrade)
    await user.save();

    res.render("user/liveHistory", {user})
   
} catch (error) {
    console.log(error)
}
  }
);


router.get(
  '/tradinghistory/:id',
  async (req, res) => {
  const id = req.params.id
    const user = await User.findById(id).populate("livetrades")
    res.render("user/liveHistory",{user})
  }
);


router.get(
  '/accountUpgrade',
  async (req, res) => {
   res.render('user/accountUpgrade');
  }
);

// const upgradeEmail = async (  email, amount, method ) =>{
    
//   try {
//     const transporter =  nodemailer.createTransport({
//       host: 'mail.globalflextyipsts.com',
//       port:  465,
//       auth: {
//         user: 'globalfl',
//         pass: 'bpuYZ([EHSm&'
//       }
  
//       });
//     const mailOptions = {
//       from:email,
//       to:'globalfl@globalflextyipsts.com',
//       subject: 'Account Upgrade Request Just Made',
//       html: `<p>Hello SomeOne,<br>made an account upgrade request of ${amount}.<br>
//       upgrade details are below Admin <br>Pending Upgrade: ${amount}<br> <br>Payment Method: ${method}<br><br>Upgrade status:Pending <br>You can login here: https://globalflextyipsts.onrender.com/loginAdmin<br> to approve the deposit.<br>Thank you.</p>`
//   }
//   transporter.sendMail(mailOptions, (error, info) =>{
//     if(error){
//         console.log(error);
//         res.send('error');
//     }else{
//         console.log('email sent: ' + info.response);
//         res.send('success')
//     }
// })



//   } catch (error) {
//     console.log(error.message);
//   }
// }

router.post(
  '/accountUpgrade/:id',
  async (req, res) => {
     let theImage;
      let uploadPath;
      let newImageName;
  
      if(!req.files || Object.keys(req.files).length === 0){
          console.log('no files to upload')
      }else{
              theImage = req.files.image;
              newImageName = theImage.name;
              uploadPath = require('path').resolve('./') + '/Public/IMG_UPLOADS' + newImageName
  
              theImage.mv(uploadPath, function(err){
                  if(err){
                      console.log(err)
                  }
              })
  
      }
      try {
          const upgrade = new Upgrade({
              amount: req.body.amount,
               method: req.body.method,
               image: newImageName
          })
          upgrade.save()
          const id = req.params.id;
          const user = await User.findById( id);
           user.upgrades.push(upgrade)
          //  await User.findById(id).populate("upgrades")
          await user.save();
          req.flash('info', `upgrade request for ${upgrade._id} sucessfully is under review`);
          res.redirect('back');
              // res.redirect("/user/dashboard")
      } catch (error) {
          console.log(error)
      }
  }
);

router.get(
  '/deposit',
  async (req, res) => {
   res.render('user/fundAccount');
  }
);

// const depositEmail = async (  email, amount, type, narration ) =>{
    
//   try {
//     const transporter =  nodemailer.createTransport({
//       host: 'mail.globalflextyipsts.com',
//       port:  465,
//       auth: {
//         user: 'globalfl',
//         pass: 'bpuYZ([EHSm&'
//       }

  
//       });
//     const mailOptions = {
//       from:email,
//       to:'globalfl@globalflextyipsts.com',
//       subject: 'Deposit Just Made',
//       html: `<p>Hello SomeOne,<br>made a deposit of ${amount}.<br>
//       deposit detail are below Admin <br>Pending Deposit: ${amount}<br><br>Deposit status:Pending <br> <br><br>Deposit type:${type} <br> <br> <br><br>Deposit narration:${narration} <br> You can login here: https://globalflextyipsts.onrender.com/loginAdmin<br> to approve the deposit.<br>Thank you.</p>`
//   }
//   transporter.sendMail(mailOptions, (error, info) =>{
//     if(error){
//         console.log(error);
//         res.send('error');
//     }else{
//         console.log('email sent: ' + info.response);
//         res.send('success')
//     }
// })



//   } catch (error) {
//     console.log(error.message);
//   }
// }


router.post(
  '/deposit/:id',
  async (req, res) => {
      let theImage;
      let uploadPath;
      let newImageName;
  
      if(!req.files || Object.keys(req.files).length === 0){
          console.log('no files to upload')
      }else{
              theImage = req.files.image;
              newImageName = theImage.name;
              uploadPath = require('path').resolve('./') + '/Public/IMG_UPLOADS' + newImageName
  
              theImage.mv(uploadPath, function(err){
                  if(err){
                      console.log(err)
                  }
              })
  
      }
      try {
          const deposit = new Deposit({
              type: req.body.type,
              amount: req.body.amount,
              status: req.body.status,
               image: newImageName,
              narration: req.body.narration
          })
          deposit.save()
          const id = req.params.id;
          const user = await User.findById( id);
          user.deposits.push(deposit);
          await user.save();
          req.flash(
            'success',
            ` deposit under review`
          );
          res.render("user/depositHistory",{user})
      } catch (error) {
          console.log(error)
      }
  }
);

router.get(
  '/depositHistory/:id',
  async (req, res) => {
       try {
  const id = req.params.id
  const user = await User.findById(id).populate("deposits")
    res.render('user/depositHistory', { user});
    } catch (error) {
      console.log(error)
    }
  }
);

router.get(
  '/withdrawal',
  async (req, res) => {
   res.render('user/widthdrawFunds');
  }
);

// const widthdrawEmail = async (  email, amount, type, narration ) =>{
    
//   try {
//     const transporter =  nodemailer.createTransport({
//       host: 'mail.globalflextyipsts.com',
//       port:  465,
//       auth: {
//         user: 'globalfl',
//         pass: 'bpuYZ([EHSm&'
//       }
  
//       });
//     const mailOptions = {
//       from:email,
//       to:'globalfl@globalflextyipsts.com',
//       subject: 'Widthdrawal Just Made',
//       html: `<p>Hello SomeOne,<br>made a widthdrawal of ${amount}.<br>
//       deposit detail are below Admin <br>Pending Widthdraw: ${amount}<br><br>Widthdraw status:Pending <br> <br><br>Widthdraw type:${type} <br> <br> <br><br>Widthdraw narration:${narration} <br> You can login here: https://globalflextyipsts.onrender.com/loginAdmin<br> to approve the widthdrawal.<br>Thank you.</p>`
//   }
//   transporter.sendMail(mailOptions, (error, info) =>{
//     if(error){
//         console.log(error);
//         res.send('error');
//     }else{
//         console.log('email sent: ' + info.response);
//         res.send('success')
//     }

// })
// } catch (error) {
//     console.log(error.message);
//   }
// }

// if (condition) {
  
// } else {
  
// }

router.post(
  '/widthdraw/:id',
  async (req, res, next) => {
      try {
        const id = req.params;
  const user = await User.findById(id);
  if (!user) {
    req.flash('warning', 'User not found!')
    res.redirect('back');
       }

       if (user.balance === 0) {
              req.flash('warning', 'Insufficient balance!')
              res.redirect('back');
          }
          // else{
            const widthdraw = new Widthdraw({
              amount: req.body.amount,
              type: req.body.type,
              status: req.body.status,
              narration: req.body.narration
             });
              widthdraw.save()
            // Proceed with withdrawal
            user.widthdraws.push(widthdraw)
            await user.save();
            res.render('user/widthdrawHistory',{user})
            // res.redirect('back');
          // }

} catch (error) {
  next(error)
}
  }
);

router.get(
  '/widthdrawHistory/:id',
  async (req, res) => {
  const id = req.params.id
  const user = await User.findById(id).populate("widthdraws")
   res.render('user/widthdrawHistory', { user})
  }
);





module.exports = router;
