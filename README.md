# campaign-nodemailer

> Nodemailer email provider for Campaign

# install

```shell
npm i campaign-nodemailer -S
```

# usage

using [`campaign`](https://github.com/bevacqua/campaign).

```js
var nodemailer = require('nodemailer');
var campaign = require('campaign');
var campaignNodemailer = require('campaign-nodemailer');
var smtp = nodemailer.createTransport('SMTP', {
  service: 'Gmail',
  auth: {
    user: 'gmail.user@gmail.com',
    pass: 'userpass'
  }
});
var client = campaign({
  provider: campaignNodemailer({
    transport: smtp,
    transform: function (options) {
      // add whatever options you want,
      // or return a completely different object
    }
  })
});
client.send(...) // as usual
```

That's that.

# `nodemailer(options)`

minimal configuration is involved.

## `options.transport`

nodemailer transport configuration.

## `options.transform`

receives model envelope and can modify or extend it.

# license

mit
