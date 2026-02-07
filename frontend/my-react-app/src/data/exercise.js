export const exercisesByWeek = {
  knee: {
    low: {
      week1: [
        {
          name: "Quad Set",
          jointAngle: {
            points: ["hip", "knee", "ankle"],
            angleRange: { min: 10, max: 25 },
          },
          speedRange: { min: 3, max: 10 },
          reps: 10,
        },
      ],
      week2: [
        {
          name: "Straight Leg Raise",
          jointAngle: {
            points: ["hip", "knee", "ankle"],
            angleRange: { min: 35, max: 55 },
          },
          speedRange: { min: 5, max: 25 },
          reps: 12,
        },
      ],
    },
  },
};
