window.addEventListener("load", () => {
  const initialAnswers = getAnswers();

  updateRiskScore(initialAnswers);

  handleChangesToAnswer({
    selector: 'input[name="date_of_birth"]',
    initialValue: initialAnswers.date_of_birth,
    property: "date_of_birth",
    onChange: updateRiskScore,
  });
  handleChangesToAnswer({
    selector: 'input[name="race"]',
    initialValue: initialAnswers.race,
    property: "race",
    onChange: updateRiskScore,
  });
  handleChangesToAnswer({
    selector: 'input[name="participates_in_wic"]',
    initialValue: initialAnswers.participates_in_wic,
    property: "participates_in_wic",
    valueSelector: (str) => str === "true",
    onChange: updateRiskScore,
  });
  handleChangesToAnswer({
    selector: 'input[name="has_diabetes"]',
    initialValue: initialAnswers.has_diabetes,
    property: "has_diabetes",
    valueSelector: (str) => str === "true",
    onChange: updateRiskScore,
  });
  handleChangesToAnswer({
    selector: 'input[name="has_hypertension"]',
    initialValue: initialAnswers.has_hypertension,
    property: "has_hypertension",
    valueSelector: (str) => str === "true",
    onChange: updateRiskScore,
  });
  handleChangesToAnswer({
    selector: 'input[name="previous_delivery_method"]',
    initialValue: initialAnswers.previous_delivery_method,
    property: "previous_delivery_method",
    onChange: updateRiskScore,
  });
  handleChangesToAnswer({
    selector: 'input[name="has_std"]',
    initialValue: initialAnswers.has_std,
    property: "has_std",
    valueSelector: (str) => str === "true",
    onChange: updateRiskScore,
  });
});

/**
 * @typedef Answers
 * @property {string} date_of_birth
 * @property {string[]} race
 * @property {boolean} participates_in_wic
 * @property {boolean} has_diabetes
 * @property {boolean} has_hypertension
 * @property {string[]} previous_delivery_method
 * @property {boolean} has_std
 */

/**
 * Key used to identify answers stored in the browser's local storage
 */
const LOCAL_STORAGE_KEY = "answers/v1";

/**
 * Gets answers recorded in the browser's local storage
 * @returns {Answers}
 */
function getAnswers() {
  const json = window.localStorage.getItem(LOCAL_STORAGE_KEY);
  const answers = json
    ? JSON.parse(json)
    : {
        date_of_birth: null,
        race: [],
        participates_in_wic: null,
        has_diabetes: null,
        has_hypertension: null,
        previous_delivery_method: [],
        has_std: null,
      };
  return answers;
}

/**
 * Records answers in the browser's local storage
 * @param {Answers} answers
 * @param {() => void} onChange
 */
function setAnswers(answers, onChange) {
  const json = JSON.stringify(answers);
  window.localStorage.setItem(LOCAL_STORAGE_KEY, json);
  onChange(answers);
}

/**
 * Updates a single answer in the browser's local storage
 * @param {string} property
 * @param {string | string[] | boolean | null} value
 * @param {() => void} onChange
 */
function setAnswer(property, value, onChange) {
  const oldAnswers = getAnswers();
  const newAnswers = {
    ...oldAnswers,
    [property]: value,
  };
  setAnswers(newAnswers, onChange);
}

/**
 * Updates the risk score on the page
 * @param {Answers} answers
 */
function updateRiskScore(answers) {
  const { score, explanation } = calculateRiskScore(answers);
  document.getElementById("risk_score").textContent = score;
  document.getElementById("risk_score_description").textContent = explanation;
}

/**
 * Sets the initial value and configures the event listeners to handle a user's changes to the answers
 * @param {Object} options
 * @param {string} options.selector
 * @param {string | string[] | boolean | null} options.initialValue
 * @param {string} options.property
 * @param {(value: any) => any} options.valueSelector
 * @param {() => void} options.onChange
 */
function handleChangesToAnswer({
  selector,
  initialValue,
  property,
  valueSelector = (v) => v,
  onChange,
}) {
  const elements = document.querySelectorAll(selector);
  for (const element of elements) {
    let listener;
    switch (element.type) {
      case "checkbox":
        element.checked = initialValue.includes(element.value);
        listener = () => {
          const value = Array.from(elements)
            .filter((e) => e.checked)
            .map((e) => valueSelector(e.value));
          setAnswer(property, value, onChange);
        };
        break;
      case "radio":
        element.checked = element.value === `${initialValue}`;
        listener = () => {
          const [value = null] = Array.from(elements)
            .filter((e) => e.checked)
            .map((e) => valueSelector(e.value));
          setAnswer(property, value, onChange);
        };
        break;
      default:
        element.value = `${initialValue}`;
        listener = ({ currentTarget: { value } }) => {
          setAnswer(property, valueSelector(value), onChange);
        };
        break;
    }

    element.addEventListener("change", listener);
    element.addEventListener("blur", listener);
  }
}

/**
 * Calculates a risk score and explanation
 * @param {Answers} answers
 * @returns {{score: number, explanation: string}}
 */
function calculateRiskScore({
  date_of_birth,
  race,
  participates_in_wic,
  has_diabetes,
  has_hypertension,
  previous_delivery_method,
  has_std,
}) {
  const now = new Date();
  const utcDateOfBirth = new Date(date_of_birth);
  const dateOfBirth = new Date(
    utcDateOfBirth.getUTCFullYear(),
    utcDateOfBirth.getUTCMonth(),
    utcDateOfBirth.getUTCDate()
  );

  const birthdayHasPassed =
    getComparableBirthday(dateOfBirth) <= getComparableBirthday(now);
  const birthdayAdjustment = birthdayHasPassed ? 0 : -1;
  const age =
    now.getFullYear() - dateOfBirth.getFullYear() + birthdayAdjustment;

  let score = 0;

  if (age < 15) {
    score += 1;
  } else if (age <= 30) {
    score += 0;
  } else if (age <= 45) {
    score += 1.5;
  } else {
    score += 2;
  }

  const atRiskRaces = new Set([
    "african_american",
    "native_american",
    "hispanic",
    "other",
  ]);
  if (race.some((r) => atRiskRaces.has(r))) {
    score += 1;
  }

  if (participates_in_wic) {
    score += 1;
  }

  if (has_diabetes) {
    score += 1;
  }

  if (has_hypertension) {
    score += 1;
  }

  const atRiskDeliveryMethods = new Set(["caesarean"]);
  if (previous_delivery_method.some((dm) => atRiskDeliveryMethods.has(dm))) {
    score += 1;
  }

  if (has_std) {
    score += 1;
  }

  let explanation;
  if (score < 3) {
    explanation = "your risk score is low";
  } else if (score <= 6) {
    explanation =
      "your risk score is medium. You should consult with your medical practitioner";
  } else {
    explanation =
      "your risk score is high. You should consult with your medical practitioner";
  }

  return {
    score,
    explanation,
  };
}

/**
 * Gets a number based on month and day that can be easily compared
 * @param {Date} date
 * @returns
 */
function getComparableBirthday(date) {
  return (date.getMonth() + 1) * 100 + date.getDate();
}
