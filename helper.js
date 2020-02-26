export const scoreTable = level => {
  const table = {
    A1: 2,
    A2: 4,
    B1: 8,
    B2: 12,
    C1: 24,
    C2: 30
  };
  return table[level];
};

export const levelScoreTable = (userScore, sessionScore, difficulty) => {
  const levelTable = {
    0: "A1",
    800: "A2",
    2500: "B1",
    10000: "B2",
    50000: "C1",
    250000: "C2"
  };
  const scoreArray = [200, 800, 2500, 10000, 50000, 250000];
  let i = 0;
  const allScore = Number(userScore) + sessionScore;

  while (scoreArray[i] < userScore && i < scoreArray.length - 1) {
    if (scoreArray[i + 1] > userScore) {
      if (allScore >= scoreArray[i + 1]) {
        return {
          level: levelTable[scoreArray[i + 1]]
        };
      }
    }
    i++;
  }
  return {
    level: null
  };
};
