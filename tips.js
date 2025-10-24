const tippingData = {
  "USA": {
    restaurant: "15–20% is standard. Tip bartenders $1–2 per drink.",
    taxi: "10–15% is typical, or round up to the nearest dollar.",
    hotel: "Bellhops: $1–2 per bag. Housekeeping: $2–5 per night.",
    bar: "Tip $1–2 per drink or 15–20% on a tab."
  },
  "Japan": {
    restaurant: "Tipping is not customary and may be seen as rude.",
    taxi: "No tipping expected — polite thanks is enough.",
    hotel: "No tipping; exceptional service may warrant a small gift.",
    bar: "Tipping not expected."
  },
  "France": {
    restaurant: "Service charge included. Add 5–10% for great service.",
    taxi: "Round up to the nearest euro.",
    hotel: "1–2€ per bag or per night for housekeeping.",
    bar: "Rounding up is appreciated but not required."
  },
  "UK": {
    restaurant: "10–12.5% is standard if service not included.",
    taxi: "Round up or add 10%.",
    hotel: "£1–2 per bag or per night for housekeeping.",
    bar: "Tipping not expected; round up occasionally."
  },
  "Mexico": {
    restaurant: "10–15% is appreciated. Check if service included.",
    taxi: "Round up fare or 10%.",
    hotel: "20–30 pesos per bag or night.",
    bar: "10–15% or round up."
  },
  "Australia": {
    restaurant: "Not mandatory. 10% for excellent service.",
    taxi: "Round up to nearest dollar.",
    hotel: "Rarely expected; optional small tip for great service.",
    bar: "No tipping custom."
  },
  "Italy": {
    restaurant: "Service charge ('coperto') often included. Add 5–10% if not.",
    taxi: "Round up to nearest euro.",
    hotel: "1–2€ per bag or night.",
    bar: "Rounding up small change is fine."
  },
  "Brazil": {
    restaurant: "10% usually added automatically. Extra tip optional.",
    taxi: "Round up fare.",
    hotel: "5–10 BRL per bag or night.",
    bar: "Tipping not required, but appreciated."
  },
  "India": {
    restaurant: "5–10% for table service; check bill for service charge.",
    taxi: "Round up or add 10%.",
    hotel: "50–100 INR for staff; housekeeping ₹100 per night.",
    bar: "10% if service good."
  },
  "South Africa": {
    restaurant: "10–15% is expected for good service.",
    taxi: "10% for private taxis; round up for others.",
    hotel: "10–20 ZAR per bag or night.",
    bar: "10% or round up."
  }
};

function showTipInfo() {
  const country = document.getElementById("country").value;
  const service = document.getElementById("service").value;
  const result = document.getElementById("result");

  if (!country || !service) {
    result.innerText = "Please select both a country and a service type.";
    return;
  }

  const info = tippingData[country]?.[service];
  result.innerText = info || "No data available for that combination.";
}
