let y_axis = 0
let x_axis = 0
let alarm = false
let show_led = [-1, -1]

// Um Gyrosteuerung zu deaktivieren und Knopfsteuerung als Startmodus zu wählen - setze diesen Wert zu 1
// To deactivate gyro-control and to set the startmode to button-control - set this to 1
let play_mode = 0  // Default: 0

// Wenn das Auto im Modus Knopfsteuerung ist, wie sehr soll dann zu Seite gelenkt werden? Standard: 800
const DIRECTION_BUTTON_CONTROL = 800  // Default: 800

// Einstellungen für die Drahtlosverbindung
radio.setGroup(0)
radio.setTransmitPower(7)  // Max=7

// Buttons
basic.forever(() => {
	if (play_mode == 0) {
		if (input.buttonIsPressed(Button.A)) {
			alarm = true
			radio.sendValue("alarm", 1)
			music.playTone(262, music.beat(BeatFraction.Quarter))
			basic.setLedColor(Colors.Purple)
		} else if (alarm) {
			alarm = false
			basic.setLedColor(0)
		}
		if (input.buttonIsPressed(Button.B)) {
			// wechsele zu Knopfsteuerung
			play_mode = 1
			basic.pause(300) // Diese Pause ist notwendig, weil sonst der B-Knopf direkt als Steuerung erkannt wird
		}
	} else if (play_mode == 1) {
		// manuelles Fahren
		if (input.buttonIsPressed(Button.A) && input.buttonIsPressed(Button.B)) {
			x_axis = 0
			y_axis = -1023
		} else if (input.buttonIsPressed(Button.A)) {
			x_axis = -1 * DIRECTION_BUTTON_CONTROL
			y_axis = -1023
		} else if (input.buttonIsPressed(Button.B)) {
			x_axis = DIRECTION_BUTTON_CONTROL
			y_axis = -1023
		} else {
			x_axis = 0
			y_axis = 1023
		}
		basic.setLedColor(Colors.Yellow)
	}
})

// LED-Matrix & Fernsteuerung
basic.forever(() => {
	if (play_mode == 0) {
		// Sensordaten
		x_axis = input.acceleration(Dimension.X)
		y_axis = input.acceleration(Dimension.Y)
	}

	// Setze neue LED-Koordinate
	led.unplot(show_led[0], show_led[1])
	show_led[0] = pins.map(
		x_axis,
		-1023,
		1023,
		-1,
		5
	)
	if (show_led[0] == -1) {
        show_led[0] = 0
    }
	if (show_led[0] == 5) {
		show_led[0] = 4
	}
	show_led[1] = pins.map(
		y_axis,
		1023,
		-1023,
		5,
		-1
	)
	if (show_led[1] == -1) {
        show_led[1] = 0
    }
	if (show_led[1] == 5) {
		show_led[1] = 4
	}	
	led.plot(show_led[0], show_led[1])

	// Sende Daten an Auto
	radio.sendValue("direction", x_axis)
	radio.sendValue("speed", y_axis)
})
