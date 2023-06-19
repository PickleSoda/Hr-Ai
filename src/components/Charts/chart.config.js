export const chartColors = {
  default: {
    EmotionalTone: "#209CEE",
    Negative: "#800080",
    Problem: "#FF3860",
    Positive: "#00D1B2",
  },
};
const datasetObject = (color, points) => {
  return {
    fill: true,
    borderColor: chartColors.default[color],
    borderWidth: 2,
    borderDash: [],
    borderDashOffset: 0.0,
    pointBackgroundColor: chartColors.default[color],
    pointBorderColor: "rgba(255,255,255,0)",
    pointHoverBackgroundColor: chartColors.default[color],
    pointBorderWidth: 20,
    pointHoverRadius: 4,
    pointHoverBorderWidth: 15,
    pointRadius: 4,
    data: points,
    tension: 0.5,
    cubicInterpolationMode: "default",
    label: color,
  };
};

export const sampleChartData = (analysis) => {
  // console.log(analysis)
  const labels = analysis.date.map((date) => date.split(" ")[1]);

  return {
    labels,
    datasets: [
      datasetObject("EmotionalTone", analysis["Emotional Tone"]),
      datasetObject("Negative", analysis.Negative),
      datasetObject("Problem", analysis.Problem),
      datasetObject("Positive", analysis.Positive),
    ],
  };
};
