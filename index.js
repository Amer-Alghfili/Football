let openedOptionsElement;
document.addEventListener(
  "click",
  function removeOpenedOptions() {
    if (
      openedOptionsElement &&
      openedOptionsElement.style.display === "block"
    ) {
      openedOptionsElement.style.display = "none";
    }
  },
  true
);

function showOptions(event) {
  openedOptionsElement = event.target.firstElementChild;
  openedOptionsElement.style.display = "block";
}

const YELLOW_CARDS = "yellowCards";
const RED_CARDS = "redCards";
const GOALS = "goals";
const PASSES = "passes";
const RED_TEAM = "redTeam";
const BLUE_TEAM = "blueTeam";
const actions = [YELLOW_CARDS, RED_CARDS, PASSES, GOALS];

const totalStats = {
  redTeam: {
    goals: 0,
    passes: 0,
    yellowCards: 0,
    redCards: 0,
  },
  blueTeam: {
    goals: 0,
    passes: 0,
    yellowCards: 0,
    redCards: 0,
  },
};

const playersOptions = document.querySelectorAll(".member__options");
let team;
let options;
let playerFunction;
for (let i = 0; i < playersOptions.length; i++) {
  if (i > 10) {
    team = BLUE_TEAM;
  } else {
    team = RED_TEAM;
  }
  options = playersOptions[i].children;
  playerFunction = playerClosure(team);

  for (let j = 0; j < options.length; j++) {
    options[j].addEventListener("click", playerFunction[actions[j]]);
  }
}

function playerClosure(team) {
  let playerStats = {
    goals: 0,
    passes: 0,
    yellowCards: 0,
    redCards: 0,
  };
  return {
    yellowCards: function () {
      if (playerStats.yellowCards === 1) {
        playerStats = { ...playerStats, redCards: 1 };
        totalStats[team].redCards = totalStats[team].redCards + 1;
        openedOptionsElement.parentElement.classList.add("player-disabled");
        openedOptionsElement.parentElement.classList.remove("yellow-card");
        openedOptionsElement.parentElement.classList.add("red-card");
        openedOptionsElement.remove();
        const { redCards } = totalStats[team];
        document.querySelector(
          `#${team} .results__red-cards`
        ).innerHTML = `Red Cards: ${redCards}`;
      } else {
        playerStats = { ...playerStats, yellowCards: 1 };
        totalStats[team].yellowCards = totalStats[team].yellowCards + 1;
        openedOptionsElement.parentElement.classList.add("yellow-card");
        const { yellowCards } = totalStats[team];
        document.querySelector(
          `#${team} .results__yellow-cards`
        ).innerHTML = `Yellow Cards: ${yellowCards}`;
      }
      console.log("🤽‍♀️", totalStats);
    },
    redCards: function () {
      playerStats = { ...playerStats, redCards: 1 };
      totalStats[team].redCards = totalStats[team].redCards + 1;
      openedOptionsElement.parentElement.classList.add("player-disabled");
      openedOptionsElement.parentElement.classList.remove("yellow-card");
      openedOptionsElement.parentElement.classList.add("red-card");
      openedOptionsElement.remove();
      const { redCards } = totalStats[team];
      document.querySelector(
        `#${team} .results__red-cards`
      ).innerHTML = `Red Cards: ${redCards}`;
      console.log("🤽‍♀️", totalStats);
    },
    goals: function () {
      playerStats = { ...playerStats, goals: playerStats.goals + 1 };
      totalStats[team].goals = totalStats[team].goals + 1;
      const { goals } = totalStats[team];
      document.querySelector(
        `#${team} .results__goals`
      ).innerHTML = `Goals: ${goals}`;
      console.log("🤽‍♀️", totalStats);
    },
    passes: function () {
      playerStats = { ...playerStats, passes: playerStats.passes + 1 };
      totalStats[team].passes = totalStats[team].passes + 1;
      const { passes } = totalStats[team];
      document.querySelector(
        `#${team} .results__passes`
      ).innerHTML = `Passes: ${passes}`;
      console.log("🤽‍♀️", totalStats);
    },
  };
}
