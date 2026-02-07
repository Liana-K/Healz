import { useState } from "react";
import { startExerciseSession } from "../pose/exercisePoseLogic";
import { exercisesByWeek } from "../data/exercises";

export default function ExerciseSession() {
  const injury = "knee";
  const intensity = "low";
  const week = "week2";

  // 📌 Week 2 = Week 1 exercises + new ones
  const exercises = [
    ...exercisesByWeek[injury][intensity]["week1"],
    ...exercisesByWeek[injury][intensity]["week2"],
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [showRest, setShowRest] = useState(false);
  const [liveData, setLiveData] = useState(null);

  function startExercise() {
    startExerciseSession(
      exercises[currentIndex],
      (data) => setLiveData(data),
      () => {
        setShowRest(true);

        setTimeout(() => {
          setShowRest(false);
          setCurrentIndex((prev) => prev + 1);
        }, 60000);
      }
    );
  }

  // Auto-start next exercise
  if (currentIndex < exercises.length && !showRest && !liveData) {
    startExercise();
  }

  return (
    <div>
      <h2>Exercise Session</h2>

      <div id="camera-container" />

      {showRest && <h3>Rest for 1 minute</h3>}

      {liveData && (
        <div>
          <p>Angle: {liveData.angle.toFixed(1)}°</p>
          <p>Reps: {liveData.reps}</p>
          <p>{liveData.feedback}</p>
        </div>
      )}

      {currentIndex >= exercises.length && (
        <h3>All exercises complete 🎉</h3>
      )}
    </div>
  );
}
