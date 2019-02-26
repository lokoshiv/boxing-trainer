/*
A Web Bluetooth connection example
gathering three characteristics from a 3-axis accelerometer
created 6 Aug 2018
modified 14 Nov 2018
by Tom Igoe
modified by Shivani Prasad for Boxing Glove Tool
gathers characteristic for 3-axis accelerometer and an FSR sensor
13 Dec 2019
*/

var myDevice;


// fill your peripheral service and characteristic UUIDs here:
const accelService = '082b91ae-e83c-11e8-9f32-f2801f1b9fd1';
const accelX = '082b9438-e83c-11e8-9f32-f2801f1b9fd1';
const accelY = '082b9622-e83c-11e8-9f32-f2801f1b9fd1';
const accelZ = '082b976c-e83c-11e8-9f32-f2801f1b9fd1';
const fsr = '80b3f91e-dbfa-42df-8f66-c3df7e266836';

// a JSON object for the accelerometer data:

//create left accel & right accel
let rightGlove = {
  x: 0,
  y: 0,
  z: 0,
  fsr: 0
}

let leftGlove = {
  x: 0,
  y: 0,
  z: 0,
  fsr: 0
}

// connect to the peripheral:
function connect() {
  navigator.bluetooth.requestDevice({
    filters: [{ services: [accelService] }]
  })
    .then(function (device) {
      // save the device returned so you can disconnect later:
      myDevice = device;
      // connect to the device once you find it:
      return device.gatt.connect();
    })
    .then(function (server) {
      // get the primary service:
      return server.getPrimaryService(accelService);
    })
    .then(function (service) {
      // get the characteristic:
      return service.getCharacteristics();
    })
    .then(function (characteristics) {
      // subscribe to the characteristic:
      for (c in characteristics) {
        characteristics[c].addEventListener('characteristicvaluechanged', handleData);
        characteristics[c].startNotifications();
      }
    })
    .catch(function (error) {
      // catch any errors:
      console.error('Connection failed!', error);
    });
}

// handle incoming data:
function handleData(event) {
  // get the data  from the peripheral:
  var sensorVal = event.target.value.getInt32(0, true);
  console.log(event.target.service.device.name);
  if (event.target.service.device.name == 'rightGlove') {
    console.log('right glove');
    switch (event.target.uuid) {
      case accelX:
        rightGlove.x = sensorVal;
        break;
      case accelY:
        rightGlove.y = sensorVal;
        break;
      case accelZ:
        rightGlove.z = sensorVal;
        break;
      case fsr:
        rightGlove.fsr = sensorVal;
        break;
  	}
  }

  else if (event.target.service.device.name == 'leftGlove') {
    console.log('left glove');
    switch (event.target.uuid) {
    case accelX:
      leftGlove.x = sensorVal;
      break;
    case accelY:
      leftGlove.y = sensorVal;
      break;
    case accelZ:
      leftGlove.z = sensorVal;
      break;
    case fsr:
      leftGlove.fsr = sensorVal;
      break;
  	}
	}
}

// disconnect function:
function disconnect() {
  if (myDevice) {
    // disconnect:
    myDevice.gatt.disconnect();
  }
}
