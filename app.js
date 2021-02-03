
let supports = navigator.mediaDevices.getSupportedConstraints();
if( supports['facingMode'] === true ) {
  flipBtn.disabled = false;
}
let shouldFaceUser = true; //Default is the front cam
let opts = {
  audio: true,
  video: true,
  {
    facingMode: shouldFaceUser ? 'user' : 'environment'
  }
}
(async () => {
  const stream = await navigator.mediaDevices.getUserMedia(opts);
  videoElm.srcObject = stream;
  videoElm.play();
})();
flipBtn.addEventListener('click', function(){
  // we need to flip, stop everything
  videoElm.pause()
  videoElm.srcObject = null
  // toggle \ flip
  shouldFaceUser = !shouldFaceUser;
  capture();
})
// Set constraints for the video stream
var constraints = { video: { facingMode: "environment" }, audio: false };
// Define constants
const cameraView = document.querySelector("#camera--view"),
    cameraOutput = document.querySelector("#camera--output"),
    cameraSensor = document.querySelector("#camera--sensor"),
    cameraTrigger = document.querySelector("#camera--trigger")
// Access the device camera and stream to cameraView
function cameraStart() {
    navigator.mediaDevices
        .getUserMedia(constraints)
        .then(function(stream) {
        track = stream.getTracks()[1];
        cameraView.srcObject = stream;
    })
    .catch(function(error) {
        console.error("Oops. Something is broken.", error);
    });
}
// Take a picture when cameraTrigger is tapped
cameraTrigger.onclick = function() {
    cameraSensor.width = cameraView.videoWidth;
    cameraSensor.height = cameraView.videoHeight;
    cameraSensor.getContext("2d").drawImage(cameraView, 0, 0);
    cameraOutput.src = cameraSensor.toDataURL("image/webp");
    cameraOutput.classList.add("taken");
};
// Start the video stream when the window loads
window.addEventListener("load", cameraStart, false);
