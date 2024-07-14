const mongoose = require('mongoose');
const router = require('express').Router();
const User = require('../models/user.model');
const Deposit = require('../models/upgradeSchema');
const Widthdraw = require('../models/widthdrawSchema');
const Trade = require('../models/livetradingSchema');
const Upgrade = require('../models/upgradeSchema');
const Verify = require('../models/verifySchema');
const { roles } = require('../utils/constants');
const Livetrading = require('../models/livetradingSchema');

router.get('/adminRoute', async (req, res, next) => {
  try {
    const users = await User.find();
    // res.send(users);
    res.render('admin/adminDashboard', { users });
  } catch (error) {
    next(error);
  }
});

router.get('/viewUser/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      req.flash('error', 'Invalid id');
      res.redirect('/admin/adminRoute');
      return;
    }
    const user = await User.findById(id);
    res.render('admin/viewUser', { user });
  } catch (error) {
    next(error);
  }
});

router.get('/editUser/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      req.flash('error', 'Invalid id');
      res.redirect('/admin/adminRoute');
      return;
    }
    const user = await User.findById(id);
    res.render('admin/editUser', { user });
  } catch (error) {
    next(error);
  }
});

router.post('/editUser/:id', async (req, res, next) => {
  try {
    // Finally update the user
   const user = await User.findByIdAndUpdate(req.params.id,{
       role: req.body.role,
        balance: req.body.balance,
        widthdrawBalance: req.body.widthdrawBalance,
        bonus: req.body.bonus,
        email: req.body.email,
        available: req.body.available,
        session: req.body.session, 
         profit: req.body.profit,
        totalDeposit: req.body.totalDeposit,
        verifiedStatus: req.body.verifiedStatus,
        totalWidthdraw: req.body.totalWidthdraw,
        account: req.body.account,
        updatedAt: Date.now()
      });
    req.flash('info', `updated details for ${user.email}`);
    res.redirect('back');
  } catch (error) {
    next(error);
  }
});


router.post('/deleteUser/:id', async (req, res, next) => {
  try {
    await User.deleteOne({ _id: req.params.id });
      res.redirect("/admin/adminRoute")
    } catch (error) {
      console.log(error);
    }

});

router.get('/allFunding', async (req, res, next) => {
  try {
    const deposits = await Deposit.find()
    res.render('admin/allFunding',{
    deposits
   });
  } catch (error) {
    next(error);
  }
});

router.get('/viewDeposit/:id', async (req, res, next) => {

  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      req.flash('error', 'Invalid id');
      res.redirect('/admin/adminRoute');
      return;
    }
    const deposit = await Deposit.findById(id);
    res.render('admin/viewDeposits', { deposit });
  } catch (error) {
    next(error);
  }
  
});

router.get('/editDeposit/:id', async (req, res, next) => {
 
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      req.flash('error', 'Invalid id');
      res.redirect('/admin/adminRoute');
      return;
    }
    const deposit = await Deposit.findById(id);
    res.render('admin/editDeposit', { deposit });
  } catch (error) {
    next(error);
  }

});

router.post('/editDeposit/:id', async (req, res, next) => {
  try {
 const deposit = await Deposit.findByIdAndUpdate(req.params.id,{
    type: req.body.type,
    amount: req.body.amount,
    status: req.body.status,
    narration: req.body.narration,
    updatedAt: Date.now()
  });
  req.flash('info', `updated deposit for ${deposit._id} sucessfully`);
  res.redirect('back');
  } catch (error) {
    next(error);
  }
});

router.post('/deleteDeposit/:id', async (req, res, next) => {
  try {
    await Deposit.deleteOne({ _id: req.params.id });
      res.redirect("/admin/allFunding")
    } catch (error) {
      console.log(error);
    }

});



router.get('/allWidthdrawals', async (req, res, next) => {
  try {
  const widthdraws = await Widthdraw.find()
res.render('admin/allWidthdrawals',{
  widthdraws
});
  } catch (error) {
    next(error);
  }
});

router.get('/viewWidthdrawals/:id', async (req, res, next) => {

  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      req.flash('error', 'Invalid id');
      res.redirect('/admin/adminRoute');
      return;
    }
    const widthdraw = await Widthdraw.findById(id);
    res.render('admin/viewWidthdrawals', { widthdraw });
  } catch (error) {
    next(error);
  }
  
});

router.get('/editWidthdrawals/:id', async (req, res, next) => {
 
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      req.flash('error', 'Invalid id');
      res.redirect('/admin/adminRoute');
      return;
    }
    const widthdraw = await Widthdraw.findById(id);
    res.render('admin/editWidthdrawals', { widthdraw });
  } catch (error) {
    next(error);
  }

});


router.post('/editWidthdrawals/:id', async (req, res, next) => {
  try {
 const widthdraw = await Widthdraw.findByIdAndUpdate(req.params.id,{
    amount: req.body.amount,
    type: req.body.type,
    status: req.body.status,
    narration: req.body.narration,
    updatedAt: Date.now()
  });
  req.flash('info', `updated widthdrawal for ${widthdraw._id} sucessfully`);
  res.redirect('back');
  } catch (error) {
    next(error);
  }
});

router.post('/deleteWidthdrawal/:id', async (req, res, next) => {
  try {
    await Widthdraw.deleteOne({ _id: req.params.id });
      res.redirect("/admin/allWidthdrawals")
    } catch (error) {
      console.log(error);
    }

});



router.get('/allVerify', async (req, res, next) => {
  try {
  const verifys = await Verify.find()
  res.render('admin/allVerification',{verifys});
  } catch (error) {
    next(error);
  }
});


router.get('/viewVerify/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      req.flash('error', 'Invalid id');
      res.redirect('/admin/adminRoute');
      return;
    }
    const verify = await Verify.findById(id);
    res.render('admin/viewVerification', { verify });
  } catch (error) {
    next(error);
  }
});



router.get('/editVerification/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      req.flash('error', 'Invalid id');
      res.redirect('/admin/adminRoute');
      return;
    }
    const verify= await Verify.findById(id);
    res.render('admin/editVerification', { verify });
  } catch (error) {
    next(error);
  }
});

router.post('/editVerification/:id', async (req, res, next) => {
  try {
 const verify =  await Verify.findByIdAndUpdate(req.params.id,{
    email: req.body.email,
    username: req.body.username,
    fullname: req.body.fullname,
    city: req.body.city,
    gender: req.body.gender,
    dateofBirth: req.body.dateofBirth,
    marital: req.body.marital,
    age: req.body.age,
    address: req.body.address,
     updatedAt: Date.now()
   });
   req.flash('info', `updated verification for ${verify._id} sucessfully`);
   res.redirect('back');
  } catch (error) {
    next(error);
  }
});


router.post('/deleteVerification/:id', async (req, res, next) => {
  try {
  await Verify.deleteOne({ _id: req.params.id });
  res.redirect("/admin/allVerify")
  } catch (error) {
    next(error);
  }
});






router.get('/all-livetrade', async (req, res, next) => {
  try {
  const livetrade = await Trade.find()

    res.render('admin/allliveTrades',{
      livetrade
    });
  } catch (error) {
    next(error);
  }
});


router.get('/view-livetrade/:id', async (req, res, next) => {
  try {
    
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      req.flash('error', 'Invalid id');
      res.redirect('/admin/adminRoute');
      return;
    }
    const livetrade = await Livetrading.findById(id);
    res.render('admin/viewallliveTrades', { livetrade });
  } catch (error) {
    next(error);
  }
});


router.get('/edit-livetrade/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      req.flash('error', 'Invalid id');
      res.redirect('/admin/adminRoute');
      return;
    }
    const livetrade = await Livetrading.findById(id);
    res.render('admin/editallliveTrades', { livetrade });
  } catch (error) {
    next(error);
  }
});

router.post('/edit-livetrade/:id', async (req, res, next) => {
  try {
 const trade =  await Trade.findByIdAndUpdate(req.params.id,{
    type: req.body.amount,
    currencypair: req.body.currencypair,
    lotsize: req.body.lotsize,
    entryPrice: req.body.entryPrice,
    stopLoss: req.body.stopLoss,
    takeProfit: req.body.takeProfit,
    action: req.body.action,
    updatedAt: Date.now()
  });
  req.flash('info', `updated livetrade for sucessfully`);
   res.redirect('back');
  } catch (error) {
    next(error);
  }
});

router.post('/deletelivetrade/:id', async (req, res, next) => {
  try {
  await Trade.deleteOne({ _id: req.params.id });
  res.redirect("/admin/all-livetrade")
  } catch (error) {
    next(error);
  }
});

router.get('/all-accountUpgrade', async (req, res, next) => {

  try {
  const upgrade = await Upgrade.find()
res.render('admin/allAccountsUpgrade',{
  upgrade
});
  } catch (error) {
    next(error);
  }
});

router.get('/viewUpgrade/:id', async (req, res, next) => {
  try {
  
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      req.flash('error', 'Invalid id');
      res.redirect('/admin/adminRoute');
      return;
    }
    const upgrade = await Upgrade.findById(id);

    res.render('admin/viewallAccountsUpgrade',{
     upgrade
    })
  } catch (error) {
    next(error);
  }
});

router.get('/editUpgrade/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      req.flash('error', 'Invalid id');
      res.redirect('/admin/adminRoute');
      return;
    }
    const upgrade = await Upgrade.findById(id);
    res.render('admin/editallAccountsUpgrade',{
    upgrade
    })
  } catch (error) {
    next(error);
  }
});

router.post('/editUpgrade/:id', async (req, res, next) => {
  try {
 const upgrade = await Upgrade.findByIdAndUpdate(req.params.id,{
    amount: req.body.amount,
    method: req.body.method,
    status: req.body.status,
    updatedAt: Date.now()
  });
  req.flash('info', `updated account-upgrade for ${upgrade._id} sucessfully`);
  res.redirect('back');

  } catch (error) {
    next(error);
  }
});


router.post('/deleteUpgrade/:id', async (req, res, next) => {
  try {
  await Upgrade.deleteOne({ _id: req.params.id });
  res.redirect("/admin/all-accountUpgrade")
  } catch (error) {
    next(error);
  }
});



module.exports = router;
