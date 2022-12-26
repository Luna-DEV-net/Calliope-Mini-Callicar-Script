# Calliope Mini Callicar Script
Project "Car" for [IT4Kids](https://it-for-kids.org/)

## Content

- [Bedienungsanleitung](#bedienungsanleitung-german)
  * [Allgemeine Informationen](#allgemeine-informationen)
  * [Fernbedienung](#fernbedienung)
    + [Fähigkeiten](#fähigkeiten)
  * [Auto](#auto)
    + [Fähigkeiten](#fähigkeiten-1)
- [Operating Instructions](#operating-instructions)
  * [General information](#general-information)
  * [Remote control](#remote-control)
    + [Skills](#skills)
  * [Car](#car)
    + [Skills](#skills-1)
 
 
 
## Bedienungsanleitung (German)
[[english see here.]](#operating-instructions)
 
### Allgemeine Informationen
Die `.hex`-Dateien können einfach auf den Calliopen kopiert werden.
Diese wurden mit dem [Makecode]( https://makecode.calliope.cc/ )-Editor erstellt.
Die `.hex`-Dateien lassen sich mit diesem auch wieder öffnen.
 
### Fernbedienung
 
Modus "Gyrolenkung":
  
    Knopf A --> Hupe
    Knopf B --> Wecheln zur "Knopflenkung"
    Gyro --> Steuerung über Neigung
    Knopf Reset --> Setze das Programm zurück
 
Modus "Knopflenkung":
 
    Knopf A --> Nach links lenken
    Knopf B --> Nach rechts lenken
    Gyro --> /
    Knopf Reset --> Setze das Programm zurück (bzw. wechsele zu Gyrosteuerung)
 
#### Fähigkeiten:
- Fernsteuerung: Sendet die Steuerungsinformationen
- Zeige die Steuerungsinformationen auf der LED-Matrix
- Steuerungsmodus: Gyroslenkung / Knopflenkung
- Wechsle Lenkungsmodus per Knopfdruck
- Ausführung der Hupe

### Auto
   
    Knopf B (red) --> Stop und warte für Knopf A
    Knopf A (blue) --> Wenn "Stop und warte" zurück zu Betriebsmodus
    Gyro --> /
    Knopf Reset --> Setze das Programm zurück
     
#### Fähigkeiten:
- Steuerung der Automotoren
- Fernsteuerung: Bekommt die Steuerungsinformationen über die Fernbedienung
- Zeige die Steuerungsinformationen auf der LED-Matrix
- Erkenne einen Funkabbruch `(1.5 Sek. Stille)` -> stoppe!
- Manuelle Betriebsunterbrechung per Knopfdruck
- Ausführung der Hupe
- Schwellenwert für keine Bewegung
- Offset für die Lenkung
- Ladebildschirm

## Operating Instructions

### General information
The `.hex` files can simply be copied to the Calliope.
These were created with the [Makecode]( https://makecode.calliope.cc/ )-editor.
The `.hex` files can also be opened again with the editor.
 
### Remote control
 
"Gyro control" mode:
  
    Button A --> Horn
    Button B --> change to "button control"
    Gyro --> tilt control
    Reset button --> Reset the program
 
"Button control" mode:
 
    Button A --> Steer to the left
    Button B --> Steer to the right
    Gyro --> /
    Reset button --> Reset the program (so switch back to gyro control)
 
#### Skills:
- Remote control: Sends the control information
- Show the control information on the LED matrix
- Control mode: gyro steering / button steering
- Change control mode at the push of a button
- Execution of the horn

### Car
   
    Button B (red) --> Stop and wait for button A
    Button A (blue) --> If "Stop and wait" switch back to running mode
    Gyro --> /
    Reset button --> Reset the program
     
#### Skills:
- Control of car engines
- Remote control: receives the control information via the remote control
- Show the control information on the LED matrix
- Detect a radio interruption `(1.5 sec. Silence)` -> stop!
- Manual business interruption at the push of a button
- Execution of the horn
- No movement threshold
- steering offset
- loading screen


> Diese Seite bei [https://luna-dev-net.github.io/calliope-mini-callicar-script/](https://luna-dev-net.github.io/calliope-mini-callicar-script/) öffnen

## Als Erweiterung verwenden

Dieses Repository kann als **Erweiterung** in MakeCode hinzugefügt werden.

* öffne [https://makecode.calliope.cc/](https://makecode.calliope.cc/)
* klicke auf **Neues Projekt**
* klicke auf **Erweiterungen** unter dem Zahnrad-Menü
* nach **https://github.com/luna-dev-net/calliope-mini-callicar-script** suchen und importieren

## Dieses Projekt bearbeiten ![Build Status Abzeichen](https://github.com/luna-dev-net/calliope-mini-callicar-script/workflows/MakeCode/badge.svg)

Um dieses Repository in MakeCode zu bearbeiten.

* öffne [https://makecode.calliope.cc/](https://makecode.calliope.cc/)
* klicke auf **Importieren** und dann auf **Importiere URL**
* füge **https://github.com/luna-dev-net/calliope-mini-callicar-script** ein und klicke auf Importieren

## Blockvorschau

Dieses Bild zeigt den Blockcode vom letzten Commit im Master an.
Die Aktualisierung dieses Bildes kann einige Minuten dauern.

![Eine gerenderte Ansicht der Blöcke](https://github.com/luna-dev-net/calliope-mini-callicar-script/raw/master/.github/makecode/blocks.png)

#### Metadaten (verwendet für Suche, Rendering)

* for PXT/calliopemini
<script src="https://makecode.com/gh-pages-embed.js"></script><script>makeCodeRender("{{ site.makecode.home_url }}", "{{ site.github.owner_name }}/{{ site.github.repository_name }}");</script>
