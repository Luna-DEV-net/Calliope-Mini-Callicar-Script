let directionRaw = 2000
let speedRaw = 2000
let directionA = 2000
let directionB = 2000
let speed = 2000
let alarm = false
let show_led = [-1, -1]
let last_get = 0
let wait = true

// Schwellenwert für keine Bewegung
const THRESHOLD_NO_MOVE = 30  // Default: 30 - Scope:0-100

// Offset für die Lenkung
//Gegenwirkung für schiefes Geradeausfahren: Positiv ist nach rechts, negativ ist nach links
const OFFSET_DIRECTION = 80  // Default: 0 - Scope:(-1023)-1023

// Loading Screen
let running = false
basic.setLedColor(Colors.Red)
basic.showLeds(`
    # # # # #
    # # # # #
    # # # # #
    # # # # #
    # # # # #
    `)
// Einstellungen für die Drahtlosverbindung
radio.setGroup(0)
radio.setTransmitPower(7)  // Max=7
basic.showLeds(`
    . . . . .
    . . . . .
    . . . . .
    . . . . .
    . . . . .
    `)

// Fernsteuerung
radio.onDataPacketReceived(({ receivedString: m, receivedNumber: d }) => {
    if (!running && !wait) {
        Run()
    }
    let dataInt = d
    let mode = m
    if (dataInt != dataInt) {
        // dataInt is NaN
        dataInt = 0
    }
    if (mode == "alarm") {
        // Alarm wurde geschickt -> Alarm an
        alarm = true
    }
    if (mode == "direction") {
        // Neue Lenkungsdaten wurden geschickt - update
        directionRaw = dataInt
        dataInt = dataInt + OFFSET_DIRECTION
        if (dataInt > 1023) {
            dataInt = 1023
        } else if (dataInt < -1023) {
            dataInt = -1023
        }
        let direction = pins.map(
            dataInt,
            -1023,
            1023,
            -10,
            10
        )
        directionA = 10
        directionB = 10
        if (direction > 0) {
            // rechts - MotorA weniger
            directionA = pins.map(
                direction,
                0,
                10,
                10,
                0
            )
        }
        if (direction < 0) {
            // links - MotorB weniger
            directionB = pins.map(
                direction,
                -10,
                0,
                0,
                10
            )
        }
    }
    if (mode == "speed") {
        // Neue Geschwindigkeitsdaten wurden geschickt - update
        speedRaw = dataInt
        speed = pins.map(
            dataInt,
            1023,
            -1023,
            0,
            10
        )
        newSpeed = pins.map(
            dataInt,
            1023,
            -1023,
            0,
            100
        )
        radio.sendValue("retunspeed", newSpeed)
    }
    last_get = input.runningTime()  // Zeit in Millisekunden seit Programmstart
})

// Motoren
basic.forever(() => {
    if (last_get + 1500 < input.runningTime()) {
        // Wenn seit 1.5 Sekunden keine neue Info --> Funkabbruch Stop!
        Stop()
    }
    if (running && speed != 2000 && directionA != 2000 && directionB != 2000) {
        let motorA = speed * directionA
        let motorB = speed * directionB
        if (motorA > THRESHOLD_NO_MOVE) {
            motors.dualMotorPower(Motor.A, motorA)
        } else {
            motors.dualMotorPower(Motor.A, 0)
        }
        if (motorB > THRESHOLD_NO_MOVE) {
            motors.dualMotorPower(Motor.B, motorB)
        } else {
            motors.dualMotorPower(Motor.B, 0)
        }
    }
})

// Buttons und LED-Matrix
basic.forever(() => {
    if (input.buttonIsPressed(Button.B)) {
        // Unterbreche alles und warte auf ButtonA
        Stop()
        wait = true
    }
    if (input.buttonIsPressed(Button.A) && wait) {
        Run()
    }
    if (running && directionRaw != 2000 && speedRaw != 2000) {
        // Setze neue LED-Koordinate
        led.unplot(show_led[0], show_led[1])
        show_led[0] = pins.map(
            directionRaw,
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
            speedRaw,
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
    if (alarm) {
        alarm = false
        // music.playTone(262, music.beat(BeatFraction.Quarter))
        // Der Lautsprecher hängt am Motortreiber mit an, deswegen geht das hier nicht.
        // Siehe: https://calliope-mini.github.io/assets/v10/img/Calliope%20mini%20rev1.3-2.png
        basic.setLedColor(Colors.Purple)
        basic.showLeds(`
			# # # # #
			# # # # #
			# # # # #
			# # # # #
			# # # # #
		`)
        basic.pause(500)
        if (!alarm) {
            // Ende Hupe
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

// Stoppe alles und RGB Rot
function Stop() {
    running = false
    motors.dualMotorPower(Motor.A, 0)
    motors.dualMotorPower(Motor.B, 0)
    led.unplot(show_led[0], show_led[1])
    basic.setLedColor(Colors.Red)
}

// Starte (wieder)
function Run() {
    running = true
    RGBLedClear()
}

// Setze die RGB-LED wieder auf den Ursprung zurück
function RGBLedClear() {
    if (running == false) {
        basic.setLedColor(Colors.Red)
    } else {
        basic.setLedColor(0)
    }
}

wait = false
