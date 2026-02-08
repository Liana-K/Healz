import { Pose } from "@mediapipe/pose";
import { Camera } from "@mediapipe/camera_utils";

export function startRecoveryTest(onComplete) {
  const container = document.getElementById("camera-container");

  if (!container) {
    console.error("camera-container not found!");
    return;
  }

  container.innerHTML = "";

  //creates a video
  const videoElement = document.createElement("video");
  videoElement.autoplay = true;
  videoElement.playsInline = true;
  videoElement.width = 1280;
  videoElement.height = 680;

  //creates a canvas
  const canvasElement = document.createElement("canvas");
  canvasElement.width = videoElement.width;
  canvasElement.height = videoElement.height;
  const canvasCtx = canvasElement.getContext("2d");

  //container.appendChild(videoElement);
  videoElement.style.display = "none";
  container.appendChild(canvasElement);

  let maxAngle = 0;
  let testing = true;

  function calculateAngle(a, b, c) {
    const radians =
      Math.atan2(c.y - b.y, c.x - b.x) -
      Math.atan2(a.y - b.y, a.x - b.x);
    let angle = Math.abs(radians * (180 / Math.PI));
    //if (angle > 180) 
    angle = 180 - (360 - angle);
    return angle;
  }

  const pose = new Pose({
    locateFile: (file) =>
      `https://cdn.jsdelivr.net/npm/@mediapipe/pose/${file}`,
  });

  pose.setOptions({
    modelComplexity: 1,
    smoothLandmarks: true,
    minDetectionConfidence: 0.5,
    minTrackingConfidence: 0.5,
  });

  pose.onResults((results) => {
    let displayedAngle = 0;
    let lastUpdateTime = 0;
    const UPDATE_INTERVAL = 10000; // 1000ms = 1 second

    if (!testing) return;

    canvasCtx.clearRect(0, 0, canvasElement.width, canvasElement.height);
    canvasCtx.drawImage(results.image, 0, 0, canvasElement.width, canvasElement.height);

    if (results.poseLandmarks) {
      const hip = results.poseLandmarks[23];
      const knee = results.poseLandmarks[25];
      const ankle = results.poseLandmarks[27];

      if (hip && knee && ankle) {
        const angle = calculateAngle(hip, knee, ankle);
      maxAngle = Math.max(maxAngle, angle);

const now = Date.now();

// Only update once every second
if (now - lastUpdateTime > UPDATE_INTERVAL) {
  displayedAngle = angle;
  lastUpdateTime = now;
}

canvasCtx.fillStyle = "red";
canvasCtx.font = "20px Arial";
canvasCtx.fillText(
  `Knee Angle: ${displayedAngle.toFixed(1)}°`,
  20,
  40
);

<<<<<<< Updated upstream
        canvasCtx.fillStyle = "white";
        canvasCtx.font = "40px Arial";
        canvasCtx.fillText(`Knee Angle: ${angle.toFixed(1)}°`, 20, 40);
=======
>>>>>>> Stashed changes
      }
    }
  });

  const camera = new Camera(videoElement, {
    onFrame: async () => {
      await pose.send({ image: videoElement });
    },
    width: canvasElement.width,
    height: canvasElement.height,
  });

  camera.start().catch(err => {
    console.error("Camera failed:", err);
    alert("Camera permission blocked — allow it in browser");
  });

  setTimeout(() => {
    testing = false;
    camera.stop();
    container.innerHTML = "";
    onComplete(maxAngle);
  }, 30000);
}