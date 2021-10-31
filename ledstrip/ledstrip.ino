#include <Adafruit_NeoPixel.h>
#ifdef __AVR__
#endif

#include "Ultrasonic.h"
Ultrasonic ultrasonic(7);

#define LED_PIN    6

#define LED_COUNT 15


Adafruit_NeoPixel strip(LED_COUNT, LED_PIN, NEO_GRB + NEO_KHZ800);


int buttonState;

int drinkTimer = 0;
int loopTimer = 0;
int afstand;


void setup() {
  Serial.begin(9600);
  strip.begin();
  strip.show();
  strip.setBrightness(50);
  rainbow();
}

void loop() {
    for(int i=0; i<strip.numPixels(); i++) {
      strip.setPixelColor(i,0, 0, 0);
    }
  
  afstand = ultrasonic.MeasureInCentimeters();
  buttonState = digitalRead(4);

//  if(buttonState == LOW){
//    drinkTimer = 0;
//    }
  
  if(afstand < 50) {
    drinkTimer += 1;
    loopTimer += 1;    
  } else {
    loopTimer = 0;
    }

  if(drinkTimer > 1980) {
  digitalWrite(3, HIGH);
  } else if(drinkTimer > 2) {
    strobe(0, 255);
    } else if(drinkTimer > 1800) {
        for(int i=0; i<strip.numPixels(); i++) {
      strip.setPixelColor(i,0, 0, 255);
      }
      trillen();
}

if(loopTimer > 2860) {
  digitalWrite(3, HIGH);
  } else if(loopTimer == 2760) {
    strobe(255, 0);
    }  else if(loopTimer == 2700) {
     for(int i=0; i<strip.numPixels(); i++) {
      strip.setPixelColor(i ,0, 255, 0);
      }
      trillen();
}

  strip.show();
  Serial.println(drinkTimer);
  Serial.println(afstand);
  delay(1000);
}

void trillen() {
  if(drinkTimer == 1801 || loopTimer == 2701) {
    digitalWrite(3, HIGH);
    } else {
      digitalWrite(3, LOW);
      }
  }

void rainbow() {
  for(long firstPixelHue = 0; firstPixelHue < 1.5*65536; firstPixelHue += 256) {
    for(int i=0; i<strip.numPixels(); i++) {
      int pixelHue = firstPixelHue + (i * 65536L / strip.numPixels());
      strip.setPixelColor(i, strip.gamma32(strip.ColorHSV(pixelHue)));
    }
    strip.show();
    delay(5);
    }
    for(int i=0; i<strip.numPixels(); i++) {
      strip.setPixelColor(i,0, 0, 0);
      strip.show();
    }
}

void strobe(byte green, byte blue){
    for(int i=0; i<strip.numPixels(); i++) {
    strip.setPixelColor (i, 0, 0, 0);
    strip.show();
    delay(10);
    strip.setPixelColor (i, 0, green, blue);
    strip.show();
  }
}

  
