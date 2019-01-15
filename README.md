# Projekt im Kurs "Auswahl und Anpassung von IT-Diensten" für K&G Webservice
## Allgemein
Ziel ist die Implementierung eines Demo-Prozesses (BPMN-Notation) innerhalb Camunda BPM. Zu nutzen sind dabei:
- User Task
- Service Task
- Send Task
## Anforderungen
- Camunda BPM 7.9.0 (auf Apache Tomcat)
- Camunda Modeler
- SSH-Client
- Texteditor
- NodeJS & NPM
## Vorgehen
### User Task
Erlaubt das direkte Eingaben von Daten durch einen Benutzer auf der Camunda BPM Plattform durch Formulare.
- Benötigtes Programm: Camunda Modeler
- Camunda Docs: [klick](https://docs.camunda.org/get-started/quick-start/user-task/)
  - Im Camunda Modeler
    - Task als User Task definieren 
    - Task auswählen und "Properties Panel" öffnen
    - Reiter "Forms" öffnen und Formularfelder anlegen
### Service Task
Ist eine Schnittstelle für einen externen Service, z.B. das Bearbeiten einer Zahlung durch einen Kreditkartenanbieter. Dies wird im folgenden Beispiel durch ein NodeJS-Skript simuliert.
- Benötigte Programme: Camunda Modeler, Texteditor, NodeJS & NPM
- Ausführliche Erklärung in den Camunda Docs: [klick](https://docs.camunda.org/get-started/quick-start/service-task/#configure-the-service-task)
  - Im Camunda Modeler
    - Task als Service Task definieren
    - Task auswählen und "Properties Panel" öffnen
    - Im Reiter "General"
      - Implementation auf "External" setzen
      - Topic festlegen, woran die Task erkannt werden kann (z.B. "karte-belasten")
  - Im Terminal/ Eingabeauffoderung
    - [NodeJS & NPM installieren](https://nodejs.org/en/download/)
    - [Arbeitsbereich vorbereiten](https://docs.camunda.org/get-started/quick-start/service-task/#create-a-new-nodejs-project)
    - [Camunda External Task Client JS installieren](https://docs.camunda.org/get-started/quick-start/service-task/#add-camunda-external-task-client-js-library)
  - Im Texteditor
    - Beispiel aus den [Camunda Docs](https://docs.camunda.org/get-started/quick-start/service-task/#implement-the-nodejs-script) übernehmen 
    - URL der REST Engine anpassen:
    ```javascript
    const config = { baseUrl: 'http://example.com:8080/engine-rest', use: logger, asyncResponseTimeout: 10000 };
    ```
    - Im Camunda Modeler gesetztes Topic einpflegen:
    ```javascript
    client.subscribe('topic hier einsetzen', async function({ task, taskService }) { ... });
    ```  
    - Eventuell Prozessvariablen und Ausgabe anpassen 
    - Dokument als "worker.js" im vorbereiteten Arbeitsbereich speichern
  - Im Terminal/ Eingabeaufforderung
    - Wenn nötig in das Arbeitsverzeichnis mit Hilfe von "cd" wechseln
    - mit "node ./worker.js" das angelegte NodeJS-Skript ausführen
- Beim Ausführen des BPMN-Prozesses in Camunda BPM wird die Service Task nun von dem angelegten Skript bedient
### Send Task
Erlaubt z.B. des automatisierte Senden von E-Mails auf der Camunda BPM Plattform. Konkret wird dies durch einen Connector implementiert, was keinerlei Programmierkenntnisse benötigt.
- Benötigte Programme: Camunda Modeler, SSH-Client
- Mehr oder weniger gute (vollständige) Dokumentation: [klick](https://github.com/camunda/camunda-bpm-mail#camunda-bpm-mail))
  - Im Camunda Modeler
    - Task als Send Task definieren 
    - Task auswählen und "Properties Panel" öffnen
    - Im Reiter "General"
      - Implementation auf "Connector" setzen
    - Im Reiter "Connector"
      - Bei "Input Parameters" auf "+" klicken und folgende Parameter anlegen
      
        Name | Type | Value
        ---- | ---- | ----- 
        to | Text  | Empfänger E-Mail-Adresse
        subject | Text | Betreff
        fileNames | Text | Anhang (im Zweifelsfall den Value freilassen)
        text | Text | Inhalt der E-Mail
   - Im SSH-Client
    - Ins Verzeichnis "/lib" der Camunda BPM Installation wechseln (bei der predeployten Version /server/apache-tomcat-8.0.47/lib)
    - Prüfen, ob folgenden Bibliotheken (.jar) vorhanden sind und beim Fehlen runterladen:
      - camunda-connect-core >= 1.0.3
      - JavaMail >= 1.5.5
      - slf4j-api >= 1.7.21
    - Ins Verzeichnis "/conf" der Camunda BPM Installation wechseln (bei der predeployten Version /server/apache-tomcat-8.0.47/conf)
    - "mail-config.properties" erstellen mit folgendem Kommando: ```nano mail-config.properties```
    - Inhalt aus [diesem Beispiel](https://github.com/camunda/camunda-bpm-mail#how-to-configure-it) in den Editor einfügen, ```mail.user``` und ```mail.password```mit Login-Daten des Sender-Mailkontos. (In diesem Beispiel ein Gmail-Konto)
    - Datei speichern (STRG+X und mit Y bestätigen)
    - Umgebungsvariable in startup.sh setzen, dazu ins Verzeichnis "/bin" der Camunda BPM Installation wechseln (bei der predeployten Version /server/apache-tomcat-8.0.47/bin)
    - "startup.sh" öffnen durch das Kommando ```nano startup.sh
    - An erste Stelle einfügen: export MAIL_CONFIG="../conf/mail-config.properties"
    - Camunda BPM neustarten    
## Prozess 
![Prozess](../master/images/crm_bpmn.png)
![Prozess](../master/images/crm_dmn.png)

