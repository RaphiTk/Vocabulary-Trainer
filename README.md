# Vocabulary Trainer

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 7.0.4.

## Deploy

ng build --prod
ngh --no-silent --cname=www.vocabulary-trainer.tk

## Installed Frameworks

ng add @angular/pwa  
ng add @angular/material
Google Fonts see src/index.html  
jsstore: npm install jsstore --save

## Todos

(check) adding login / signup page for sync over serveral devices
(check) Export Unit / class
(doing at the moment) adding sync functionality
turning app to an angular universal app

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).

##The sync process

###Workflow

1. We get the server Actions from the Rest Service (just the actions since last sync --> so just the actions from other devices)
2. We undo the local Actions (newest to oldest)
3. We perform the server Actions
4. For Version 2: Performance Improvements --> we perform not all actions (e.g. 2 Update Actions on 1 Vocabulary --> just the 2. Upadate is done, the first is discarded) 
5. We redo the local Actions (maybe not all actions can be done, e.g. the server Action deleted a Vocabulary. After this a update of course not works anymore. These actions are discarted)
6. We publish the local Actions to the server
   
###Challenges & Rules 

1. Through the server Actions, the deleted and then readded Vocabularies (local Actions with method "ADD") will have another Id after the insert --> if afterwards a update on this vocabulary is done, the id there must also be changed, that the action is performed on the correct Vocabulary.
2. Through the server Actions, a vocabulary could be deleted --> The Update must be discarded
...