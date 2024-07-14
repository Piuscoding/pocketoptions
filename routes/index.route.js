const router = require('express').Router();

router.get('/', (req, res, next) => {
  res.render('en/index');
});



router.get('/land', (req, res, next) => {
  res.render('en/land/010-QT-01');
});

router.get('/demo-high-low', (req, res, next) => {
  res.render('en/cabinet/demo-quick-high-low/index');
});

router.get('/market', (req, res, next) => {
  res.render('en/cabinet/profile/achievements/index');
});

router.get('/high-low', (req, res, next) => {
  res.render('en/cabinet/high-low/index');
});

router.get('/achievements', (req, res, next) => {
  res.render('en/cabinet/profile/achievements/index');
});

router.get('/applications', (req, res, next) => {
  res.render('en/cabinet/applications/index');
});

router.get('/platform-guide', (req, res, next) => {
  res.render('en/cabinet/platform-guide/index');
});

router.get('/', (req, res, next) => {
  res.render('en/password_recovery/index');
});


router.get('/support', (req, res, next) => {
  res.render('en/cabinet/support/index');
});

router.get('/responsibility-disclosure', (req, res, next) => {
  res.render('en/responsibility-disclosure/index');
});

router.get('/quick-start', (req, res, next) => {
  res.render('en/quick-start/index');
});

router.get('/about-us', (req, res, next) => {
  res.render('en/about-us/index');
});

router.get('/assets-current', (req, res, next) => {
  res.render('en/assets-current/index');
});

router.get('/platform-guide', (req, res, next) => {
  res.render('en/cabinet/platform-guide/index');
});

router.get('/reviews', (req, res, next) => {
  res.render('en/reviews/index');
});

router.get('/payment-methods', (req, res, next) => {
  res.render('en/payment-methods/index');
});

router.get('/try-demo', (req, res, next) => {
  res.render('en/cabinet/try-demo/index');
});

router.get('/contacts', (req, res, next) => {
  res.render('en/contacts/index');
});

router.get('/aml-policy', (req, res, next) => {
  res.render('en/aml-policy/index');
});

router.get('/payment-policy', (req, res, next) => {
  res.render('en/payment-policy/index');
});


router.get('/regulatory-environment', (req, res, next) => {
  res.render('en/about-us/regulatory-environment/index');
});



router.get('/public-offer', (req, res, next) => {
  res.render('en/public-offer/index');
});


module.exports = router;




// router.get('/', (req, res, next) => {
//   res.render('index');
// });

module.exports = router;
