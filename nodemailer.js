'use strict';

module.exports = function (options) {
  if (!options.transform) {
    options.transform = function () {};
  }

  return {
    name: 'nodemailer',
    send: async function (model, done) {
      const images = model.images ? model.images : [];

      //add header image if set
      if (model._header) {
        images.unshift({
          name: '_header',
          data: model._header.data,
          mime: model._header.mime
        });
      }

      const message = {
        from: model.from,
        to: model.to.join(', '),
        subject: model.subject,
        html: model.html,
        generateTextFromHTML: true,
        attachments: mapImageData(images)
      };
      const transformed = options.transform(message);
      options.transport.sendMail(transformed || message, done);
    }
  };

  function mapImageData (campaignImages) {
    return campaignImages.map(function campaignImageMapper (campaignImage) {
      return {
        filename: campaignImage.name,
        content: campaignImage.data,
        contentType: campaignImage.mime,
        encoding: 'base64',
        cid: campaignImage.name
      };
    });
  }
};
