#include <Keyboard.h>

#define joyX A0
#define joyY A1

int xValue, yValue, swVal;
const int swPin = 2;
int initX, initY, offX, offY;
int xMap, yMap;
boolean swPrev = 0;
int xPrev, yPrev = 0;
boolean key1, key2, key3, key4, key5, key6, key7, key8, key9, key0 = 0;
float joyAngle;
int segment;



void setup() {
  pinMode(swPin, INPUT_PULLUP);
  pinMode(joyX, INPUT);
  pinMode(joyY, INPUT);
  Serial.begin(9600);
  Keyboard.begin();
  initX = analogRead(joyX);
  initY = analogRead(joyY);
}

void loop() {
  offX = initX - 512;
  offY = initY - 512;

  // put your main code here, to run repeatedly:
  xValue = analogRead(joyX);
  yValue = analogRead(joyY);
  swVal = digitalRead(swPin);

  //calibration
  if (offX < 0) {
    xValue = xValue + abs(offX);
  } else {
    xValue = xValue - abs(offX);
  }
  if (offY < 0) {
    yValue = yValue + abs(offY);
  } else {
    yValue = yValue - abs(offY);
  }

  //map to 0,0
  xMap = map(xValue, 0, 1023, 512, -512);
  yMap = map(yValue, 0, 1023, -512, 512);

  if (swPrev != swVal) {
    swPrev = swVal;
    press();
  }

  if (xPrev != xValue && xPrev != (xMap - 1) && xPrev != (xMap + 1)) {
    xPrev = xMap;
    press();
  }
  if (yPrev != yValue && yPrev != (yMap - 1) && yPrev != (yMap + 1)) {
    yPrev = yMap;
    press();
  }

  delay(100);
}

void press() {
  joyAngle = atan2(xMap, yMap);
  segment = round(joyAngle * 5 / PI);
  Serial.println(segment);
  if (segment == 1) {
    key1 = 1;
  } else {
    key1 = 0;
  }
  if (segment == 2) {
    key2 = 1;
  } else {
    key2 = 0;
  }
  if (segment == 3) {
    key3 = 1;
  } else {
    key3 = 0;
  }
  if (segment == 4) {
    key4 = 1;
  } else {
    key4 = 0;
  }
  if (segment == 5) {
    key5 = 1;
  } else {
    key5 = 0;
  }
  if (segment == -5) {
    key6 = 1;
  } else {
    key6 = 0;
  }
  if (segment == -4) {
    key7 = 1;
  } else {
    key7 = 0;
  }
  if (segment == -3) {
    key8 = 1;
  } else {
    key8 = 0;
  }
  if (segment == -2) {
    key9 = 1;
  } else {
    key9 = 0;
  }
  if (segment == -1) {
    key0 = 1;
  } else {
    key0 = 0;
  }

  if (key1 == 1) {
    Keyboard.press('1');
  } else {
    Keyboard.release('1');
  }
  if (key2 == 1) {
    Keyboard.press('2');
  } else {
    Keyboard.release('2');
  }
  if (key3 == 1) {
    Keyboard.press('3');
  } else {
    Keyboard.release('3');
  }
  if (key4 == 1) {
    Keyboard.press('4');
  } else {
    Keyboard.release('4');
  }
  if (key5 == 1) {
    Keyboard.press('5');
  } else {
    Keyboard.release('5');
  }
  if (key6 == 1) {
    Keyboard.press('6');
  } else {
    Keyboard.release('6');
  }
  if (key7 == 1) {
    Keyboard.press('7');
  } else {
    Keyboard.release('7');
  }
  if (key8 == 1) {
    Keyboard.press('8');
  } else {
    Keyboard.release('8');
  }
  if (key9 == 1) {
    Keyboard.press('9');
  } else {
    Keyboard.release('9');
  }
  if (key0 == 1) {
    Keyboard.press('0');
  } else {
    Keyboard.release('0');
  }

  if (swVal == 0) {
    Keyboard.press(' ');
  } else {
    Keyboard.release(' ');
  }
}

void print() {
  Serial.println("X: " + String(xMap) + " | Y: " + String(yMap) + " | Button: " + String(swVal));
}
