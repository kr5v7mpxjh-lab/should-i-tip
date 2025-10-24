// tips.js
// Contains countriesList + minimal override summaries + default summary generator
// Short summaries, includes many territories. Edit overrides to refine specific countries.

const countriesList = [
  // UN member states (193) + common territories — not strictly alphabetical
  "Afghanistan","Albania","Algeria","Andorra","Angola","Antigua and Barbuda","Argentina",
  "Armenia","Aruba","Australia","Austria","Azerbaijan","Bahamas","Bahrain","Bangladesh",
  "Barbados","Belarus","Belgium","Belize","Benin","Bermuda","Bhutan","Bolivia",
  "Bosnia and Herzegovina","Botswana","Brazil","Brunei","Bulgaria","Burkina Faso",
  "Burundi","Cabo Verde","Cambodia","Cameroon","Canada","Cayman Islands","Central African Republic",
  "Chad","Chile","China","Colombia","Comoros","Congo (Brazzaville)","Congo (Kinshasa)",
  "Cook Islands","Costa Rica","Côte d'Ivoire","Croatia","Cuba","Curaçao","Cyprus","Czechia",
  "Denmark","Djibouti","Dominica","Dominican Republic","Ecuador","Egypt","El Salvador",
  "Equatorial Guinea","Eritrea","Estonia","Eswatini","Ethiopia","Falkland Islands","Faroe Islands",
  "Fiji","Finland","France","French Guiana","French Polynesia","Gabon","Gambia","Georgia",
  "Germany","Ghana","Gibraltar","Greece","Greenland","Grenada","Guadeloupe","Guam","Guatemala",
  "Guernsey","Guinea","Guinea-Bissau","Guyana","Haiti","Honduras","Hong Kong","Hungary",
  "Iceland","India","Indonesia","Iran","Iraq","Ireland","Isle of Man","Israel","Italy",
  "Jamaica","Japan","Jersey","Jordan","Kazakhstan","Kenya","Kiribati","Kosovo","Kuwait",
  "Kyrgyzstan","Laos","Latvia","Lebanon","Lesotho","Liberia","Libya","Liechtenstein",
  "Lithuania","Luxembourg","Macao","Madagascar","Malawi","Malaysia","Maldives","Mali",
  "Malta","Marshall Islands","Martinique","Mauritania","Mauritius","Mayotte","Mexico",
  "Micronesia","Moldova","Monaco","Mongolia","Montenegro","Montserrat","Morocco","Mozambique",
  "Myanmar","Namibia","Nauru","Nepal","Netherlands","New Caledonia","New Zealand","Nicaragua",
  "Niger","Nigeria","Niue","North Macedonia","Northern Mariana Islands","Norway","Oman",
  "Pakistan","Palestine","Panama","Papua New Guinea","Paraguay","Peru","Philippines","Pitcairn Islands",
  "Poland","Portugal","Puerto Rico","Qatar","Réunion","Romania","Russia","Rwanda","Saint Barthélemy",
  "Saint Kitts and Nevis","Saint Lucia","Saint Martin","Saint Pierre and Miquelon","Saint Vincent and the Grenadines",
  "Samoa","San Marino","Sao Tome and Principe","Saudi Arabia","Senegal","Serbia","Seychelles","Sierra Leone",
  "Singapore","Sint Maarten","Slovakia","Slovenia","Solomon Islands","Somalia","South Africa","South Korea",
  "South Sudan","Spain","Sri Lanka","Sudan","Suriname","Svalbard and Jan Mayen","Sweden","Switzerland",
  "Syria","Taiwan","Tajikistan","Tanzania","Thailand","Timor-Leste","Togo","Tokelau","Tonga","Trinidad and Tobago",
  "Tunisia","Turkey","Turkmenistan","Turks and Caicos Islands","Tuvalu","Uganda","Ukraine","United Arab Emirates",
  "United Kingdom","United States","Uruguay","US Virgin Islands","Uzbekistan","Vanuatu","Vatican City",
  "Venezuela","Vietnam","Wallis and Futuna","Western Sahara","Yemen","Zambia","Zimbabwe"
];

// concise override summaries for well-known/commonly-traveled countries
const overrides = {
  "USA": {
    restaurant: "15–20% typical.",
    taxi: "10–15% or round up.",
    hotel: "Bellhop $1–2/bag; housekeeping $2–5/night.",
    bar: "Tip $1–2/drink or 15–20% on tab."
  },
  "Canada": {
    restaurant: "15–20% typical.",
    taxi: "10–15% or round up.",
    hotel: "$2–5/bag or night.",
    bar: "15–20% or $1/drink."
  },
  "Japan": {
    restaurant: "Tipping not customary.",
    taxi: "No tipping expected.",
    hotel: "No tipping; gifts for exceptional service.",
    bar: "No tipping expected."
  },
  "United Kingdom": {
    restaurant: "10–12.5% if service not included.",
    taxi: "Round up or add ~10%.",
    hotel: "£1–2/bag or night.",
    bar: "Not usually expected."
  },
  "France": {
    restaurant: "Service usually included; 5–10% extra for great service.",
    taxi: "Round up small amount.",
    hotel: "€1–2/bag or night.",
    bar: "Round up small amount."
  },
  "Germany": {
    restaurant: "5–10% typical.",
    taxi: "Round up or 10%.",
    hotel: "€1–2/bag or night.",
    bar: "Round up small amount."
  },
  "Australia": {
    restaurant: "Not mandatory; 10% for excellent service.",
    taxi: "Round up.",
    hotel: "Not commonly expected.",
    bar: "Not customary."
  },
  "New Zealand": {
    restaurant: "Not expected; 10% appreciated.",
    taxi: "Round up.",
    hotel: "Small tip optional for great service.",
    bar: "Not expected."
  },
  "Mexico": {
    restaurant: "10–15% typical.",
    taxi: "Round up or ~10%.",
    hotel: "20–30 MXN/bag or night.",
    bar: "10–15% or round up."
  },
  "Brazil": {
    restaurant: "10% often added.",
    taxi: "Round up.",
    hotel: "5–10 BRL/bag or night.",
    bar: "Not required."
  },
  "China": {
    restaurant: "Tipping uncommon in many places.",
    taxi: "No tipping commonly expected.",
    hotel: "Small tips at luxury hotels only.",
    bar: "Not customary."
  },
  "India": {
    restaurant: "5–10% typical if service not included.",
    taxi: "Round up or add small percent.",
    hotel: "Small local currency amounts customary for staff.",
    bar: "10% if service good."
  },
  "Thailand": {
    restaurant: "5–10% for table service.",
    taxi: "Round up fare.",
    hotel: "20–50 THB/bag or night.",
    bar: "Small tip or round up."
  },
  "United States": {} // duplicate safe-guard
};

// default short summaries applied to all other countries/territories
const defaultSummaries = {
  restaurant: "Small tip or rounding appreciated; check bill for service charge.",
  taxi: "Round up fare or add a small percentage.",
  hotel: "Small tip for bellhop/housekeeping appreciated where customary.",
  bar: "Round up small amounts; tipping varies by venue."
};

// build tippingData object that the UI will use
const tippingData = {};
countriesList.forEach(country => {
  const ovr = overrides[country];
  if (ovr && Object.keys(ovr).length) {
    tippingData[country] = {
      restaurant: ovr.restaurant || defaultSummaries.restaurant,
      taxi: ovr.taxi || defaultSummaries.taxi,
      hotel: ovr.hotel || defaultSummaries.hotel,
      bar: ovr.bar || defaultSummaries.bar
    };
  } else {
    tippingData[country] = Object.assign({}, defaultSummaries);
  }
});

// expose helper function used by index.html
function showTipInfo() {
  const country = document.getElementById("country").value;
  const service = document.getElementById("service").value;
  const result = document.getElementById("result");

  if (!country || !service) {
    result.innerText = "Please select both a country/territory and a service type.";
    return;
  }

  const info = tippingData[country]?.[service];
  // add tiny contextual note for override countries for clarity
  if (overrides[country]) {
    result.innerText = `${info} (Info: common practice in ${country}.)`;
  } else {
    result.innerText = `${info} (General / regional guidance.)`;
  }
}
