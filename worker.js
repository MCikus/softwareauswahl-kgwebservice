/*
Dies könnte die Bank sein, welche die Zahlung verarbeitet
 */
const { Client, logger } = require('camunda-external-task-client-js');
const config = { baseUrl: 'http://bolte.cloud:8080/engine-rest/', use: logger };
const client = new Client(config);

client.subscribe('rechnungsbetrag', async function({ task, taskService }) {

  const preis = task.variables.get('preis');
  const rabatt = task.variables.get('rabatt')
  const name = task.variables.get('name');
  const mail = task.variables.get('mail');

  console.log(`Der Betrag von ${preis-(preis*(rabatt/100))}€ für das Projekt '${name}' (${mail}) wurde erfolgreich eingezogen`);

  await taskService.complete(task);
});
