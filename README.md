# Projekt im Kurs "Auswahl und Anpassung von IT-Diensten" für K&G Webservice
## Allgemein
Ziel ist die Implementierung eines Demo-Prozesses (BPMN-Notation) innerhalb Camunda BPM. Zu nutzen sind dabei:
- User Task
- Service Task (worker.js)
- Send Task (Mail Connector innerhalb Camunda BPM)
## Umgebung
- Camunda BPM 7.10.0 (auf Apache Tomcat)
- Send Task benötigt:
  - Folgende .jar in /lib
    - camunda-connect-core >= 1.0.3
    - JavaMail >= 1.5.5
    - slf4j-api >= 1.7.21
  - in /conf 'mail-config.properties' erstellen
    - Inhalt siehe: [klick](https://github.com/camunda/camunda-bpm-mail#how-to-configure-it)
  - Umgebungsvariable in startup.sh setzen
    - An erste Stelle einfügen: export MAIL_CONFIG="../conf/email-config.properties"
  - Komplettes Repository: [klick](https://github.com/camunda/camunda-bpm-mail#camunda-bpm-mail)
## Dependencies für worker.js (NodeJS)
- camunda-external-task-client-js
## Bilder 
![Prozess](../master/images/crm_bpmn.png)
![Prozess](../master/images/crm_dmn.png)

