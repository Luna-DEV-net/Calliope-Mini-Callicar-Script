let y_achse = 0
let x_achse = 0
let Hupe = false
let show_led = [-1, -1]
let play_mode = 0
radio.setGroup(0)
radio.setTransmitPower(7)

// Buttons
basic.forever(() => {
	if (play_mode == 0) {
		if (input.buttonIsPressed(Button.A)) {
			radio.sendValue("Hupe", 1)
			music.playTone(262, music.beat(BeatFraction.Quarter))
			basic.setLedColor(Colors.Purple)
			Hupe = true
		} else if (Hupe) {
			Hupe = false
			basic.setLedColor(0)
		}
		if (input.buttonIsPressed(Button.B)) {
			// wechsele zu Knopfsteuerung
			play_mode = 1
			basic.pause(300)
		}
	} else if (play_mode == 1) {
		if (input.buttonIsPressed(Button.A) && input.buttonIsPressed(Button.B)) {
			x_achse = 0
			y_achse = -1023			
		} else if (input.buttonIsPressed(Button.A)) {
			x_achse = -800
			y_achse = -1023
		} else if (input.buttonIsPressed(Button.B)) {
			x_achse = 800
			y_achse = -1023
		} else {
			x_achse = 0
			y_achse = 1023
		}
		basic.setLedColor(Colors.Yellow)
	}
})

//Calculation, Fernsteuerung & LED-Matrix
basic.forever(() => {
	led.unplot(show_led[0], show_led[1])
	if (play_mode == 0) {
		x_achse = input.acceleration(Dimension.X)
		y_achse = input.acceleration(Dimension.Y)
	}
	
	show_led[0] = pins.map(
		x_achse,
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
		y_achse,
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
	radio.sendValue("Lenkung", x_achse)
	radio.sendValue("speed", y_achse)
})
