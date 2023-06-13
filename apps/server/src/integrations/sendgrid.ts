// To use sendgrid and use these prebuilt functions, you need to install the sendgrid npm package:
// npm install --save @sendgrid/mail @sendgrid/helpers
// Then create a sendgrid acount and get an api key. You can then use the sendgrid api key in your .env file:
// SENDGRID_API_KEY=your_api_key
// You must create a sender identity (where your email is being sent from) in sendgrid.
// Then create an email template in sendgrid, they make it easy for you to do this.
// Once all that is complete you can call the function sendDynamicEmail in one of your backend routes.


import sgMail from '@sendgrid/mail';
import sgHelpers from '@sendgrid/helpers';

const settings = {
  sendgrid: {
    api_key: '',
  },
};

if (process.env.SENDGRID_API_KEY) {
  settings.sendgrid.api_key = process.env.SENDGRID_API_KEY;
}

const Personalization = sgHelpers.classes.Personalization;
sgMail.setApiKey(settings.sendgrid.api_key);

export async function sendBasicEmail(msg) {
  return sgMail.send(msg);
}
export async function sendScheduleEmail() {
  const msg = {
    to: 'recipient@example.org',
    from: 'sender@example.org',
    subject: 'Hello delayed email',
    html: '<p>Some email content</p>',
    sendAt: 1500077141,
  };

  return sgMail.send(msg);
}
export async function sendPersonalizations() {
  const msg = {
    from: 'sender1@example.org',
    subject: 'Hello world',
    text: 'Hello plain world!',
    html: '<p>Hello HTML world!</p>',
    personalizations: [],
  };

  const personalization1 = new Personalization();
  personalization1.setTo(['recipient2@example.org', 'recipient3@example.org']);
  personalization1.setCc('recipient4@example.org');
  msg.personalizations.push(personalization1);

  const personalization2 = new Personalization();
  personalization2.setTo([
    'recipient5@example.org',
    'recipient6@example.org',
    'recipient7@example.org',
  ]);
  personalization2.setFrom('sender2@example.org');
  personalization2.setCc('recipient8@example.org');
  msg.personalizations.push(personalization2);

  const personalization3 = new Personalization();
  personalization3.setTo('recipient9@example.org');
  personalization3.setFrom('sender3@example.org');
  personalization3.setCc('recipient10@example.org');
  personalization3.setSubject('Greetings world');
  msg.personalizations.push(personalization3);

  return sgMail.send(msg);
}
export async function sendDynamicEmail({
  templateId,
  from,
  to,
  replyTo,
  dynamicTemplateData,
}) {
  try {
    console.log('sendDynamicEmail')
    return sgMail
      .send({
        to: to,
        from: from,
        replyTo: replyTo,
        templateId: templateId,
        dynamicTemplateData: dynamicTemplateData,
      })
      .then(() => 'message succesful')
      .catch((error) => {
        if (error.response) {
          const { message, code, response } = error;

          // Extract response msg
          const { headers, body } = response;
          console.error(error.response.body);
          return { message, code, headers, body };
        } else {
          return error;
        }
      });
  } catch (error) {
    return error;
  }
}