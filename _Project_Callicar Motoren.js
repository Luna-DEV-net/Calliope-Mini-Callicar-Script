let LenkungRaw = 2000
let GeschwindigkeitRaw = 2000
let LenkungA = 2000
let LenkungB = 2000
let Geschwindigkeit = 2000
let Hupe = false
let show_led = [-1, -1]
let last_get = 0
let wait = true

const SCHWELLENWERT_KEINE_BEWEGUNG = 28
const OFFSET_LENKUNG = 80
//Gegenwirkung für schiefes Geradeausfahren: Positiv ist rechts

// Loading
let running = false
basic.setLedColor(Colors.Red)
basic.showLeds(`
    # # # # #
    # # # # #
    # # # # #
    # # # # #
    # # # # #
    `)
radio.setGroup(0)
radio.setTransmitPower(7)
basic.showLeds(`
    . . . . .
    . . . . .
    . . . . .
    . . . . .
    . . . . .
    `)

// Fernsteuerung
radio.onDataPacketReceived( ({ receivedString: m, receivedNumber: d }) => {
	if (!running && !wait) {
		Run()
	}
    let DataInt = d
    let Mode = m
    if (DataInt != DataInt) {
        // DataInt is NaN
        DataInt = 0
    }
    if (Mode == "Hupe") {
		Hupe = true
    }
    if (Mode == "Lenkung") {
		LenkungRaw = DataInt
		DataInt = DataInt + OFFSET_LENKUNG
		if (DataInt > 1023) {
			DataInt = 1023
		} else if (DataInt < -1023) {
			DataInt = -1023
		}
		let Lenkung = pins.map(
			DataInt,
			-1023,
			1023,
			-10,
			10
		)
		LenkungA = 10
		LenkungB = 10
		if (Lenkung > 0) {
			// rechts - MotorA weniger
			LenkungA = pins.map(
				Lenkung,
				0,
				10,
				10,
				0
			)
		}
		if (Lenkung < 0) {
			// links - MotorB weniger
			LenkungB = pins.map(
				Lenkung,
				-10,
				0,
				0,
				10
			)
		}
    }
    if (Mode == "speed") {
		GeschwindigkeitRaw = DataInt
		Geschwindigkeit = pins.map(
			DataInt,
			1023,
			-1023,
			0,
			10
		)
    }
	last_get = input.runningTime()
})

// Steuerung
basic.forever(() => {
	if (last_get + 1500 < input.runningTime()) {
		// Wenn 1.5 Sekunden keine neue Info --> Stop!
		Stop()
	}
	if (running && Geschwindigkeit != 2000 && LenkungA != 2000 && LenkungB != 2000) {
		let MotorA = Geschwindigkeit * LenkungA
		let MotorB = Geschwindigkeit * LenkungB
		if (MotorA > SCHWELLENWERT_KEINE_BEWEGUNG) {
			motors.dualMotorPower(Motor.A, MotorA)
		} else {
            motors.dualMotorPower(Motor.A, 0)
        }
		if (MotorB > SCHWELLENWERT_KEINE_BEWEGUNG) {
			motors.dualMotorPower(Motor.B, MotorB)
		} else {
            motors.dualMotorPower(Motor.B, 0)
        }
	}
})

// Buttons and LED-Matrix
basic.forever(() => {
	if (input.buttonIsPressed(Button.B)) {
		// Unterbreche alles und warte auf start per ButtonA
		Stop()
		wait = true
	}
	if (input.buttonIsPressed(Button.A) && wait) {
		Run()
	}
	if (running && LenkungRaw != 2000 && GeschwindigkeitRaw != 2000) {
		led.unplot(show_led[0], show_led[1])
		show_led[0] = pins.map(
			LenkungRaw,
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
			GeschwindigkeitRaw,
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
	}
})

// Hupe
basic.forever(() => {
    if (Hupe) {
		Hupe = false
        //music.playTone(262, music.beat(BeatFraction.Quarter))
        //Der Lautsprecher hängt am Motortreiber mit an, deswegen geht das hier nicht. See: https://calliope-mini.github.io/assets/v10/img/Calliope%20mini%20rev1.3-2.png
		basic.setLedColor(Colors.Purple)
        basic.showLeds(`
			# # # # #
			# # # # #
			# # # # #
			# # # # #
			# # # # #
		`)
		basic.pause(500)
		if (!Hupe) {
			basic.showLeds(`
				. . . . .
				. . . . .
				. . . . .
				. . . . .
				. . . . .
			`)
			RGBLedClear()
		}
    }
})

function Stop() {
    running = false
	motors.dualMotorPower(Motor.A, 0)
	motors.dualMotorPower(Motor.B, 0)
	led.unplot(show_led[0], show_led[1])
	basic.setLedColor(Colors.Red)
}

function Run() {
	running = true
	RGBLedClear()
}

function RGBLedClear() {
	if (running == false) {
		basic.setLedColor(Colors.Red)
	} else {
		basic.setLedColor(0)
	}
}

wait = false
