const { Client, logger } = require('camunda-external-task-client-js');

// configuration for the Client:
//  - 'baseUrl': url to the Process Engine
//  - 'logger': utility to automatically log important events
const config = { baseUrl: 'http://bolte.cloud:8080/engine-rest/', use: logger };

// create a Client instance with custom configuration
const client = new Client(config);

// susbscribe to the topic: 'charge-card'
client.subscribe('karte-belasten', async function({ task, taskService }) {
  // Put your business logic here

  // Get a process variable
  const amount = task.variables.get('amount');
  const item = task.variables.get('item');

  console.log(`Charging credit card with an amount of ${amount}€ for the item '${item}'...`);

  // Complete the task
  await taskService.complete(task);
});

// susbscribe to the topic: 'send-mail'
client.subscribe('send-mail', async function({ task, taskService }) {
  var nodemailer = require('nodemailer');

  var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'infodsp.bot@gmail.com',
      pass: 'FT4-kTK-rE6-bLD'
    }
  });

  var mailOptions = {
    from: 'infodsp.bot@gmail.com',
    to: 'bolte@th-brandenburg.de',
    subject: 'Bestellung bestätigt.',
    text: 'Bestellung bestätigt.'
  };

  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
    await taskService.complete(task);
});
