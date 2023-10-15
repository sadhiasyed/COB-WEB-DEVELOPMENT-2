var propertyNew = ["Length", "Volume", "Speed", "Weight"];
var unitNew = [
  ["Meter", "Centimeter", "Kilometer", "Foot", "Inch"],
  ["Cubic Meter", "Cubic centimeter", "Liter"],
  ["Meter/second", "Kilometer/hour", "Mile"],
  ["Kilogram", "Gram", "Pound"],
];

var factorNew = [
  [1, 100, 0.001, 3.28084, 39.3701],
  [1, 1000000, 1000],
  [1, 3.6, 2.2369],
  [1, 1000, 2.20462],
];
function updateUnitMenu(propMenu, unitMenu) {
  var propIndex = propMenu.selectedIndex;
  fillMenuWithArray(unitMenu, unitNew[propIndex]);
}

function fillMenuWithArray(myMenu, myArray) {
  var i;
  myMenu.length = myArray.length;
  for (i = 0; i < myArray.length; i++) {
    myMenu.options[i].text = myArray[i];
  }
}
function calculateUnit(sourceForm, targetForm) {
  var sourceValue = sourceForm.unit_input_new.value;
  sourceValue = parseFloat(sourceValue);
  if (!isNaN(sourceValue) || sourceValue == 0) {
    sourceForm.unit_input_new.value = sourceValue;
    convertFromTo(sourceForm, targetForm);
  }
}

function convertFromTo(sourceForm, targetForm) {
  var propIndex = document.property_form_new.the_menu_new.selectedIndex;
  var sourceIndex = sourceForm.unit_menu_new.selectedIndex;
  var sourceFactor = factorNew[propIndex][sourceIndex];
  var targetIndex = targetForm.unit_menu_new.selectedIndex;
  var targetFactor = factorNew[propIndex][targetIndex];
  var result = sourceForm.unit_input_new.value;
  result = result / sourceFactor;
  result = result * targetFactor;
  targetForm.unit_input_new.value = result;
}
window.onload = function (e) {
  fillMenuWithArray(document.property_form_new.the_menu_new, propertyNew);
  updateUnitMenu(
    document.property_form_new.the_menu_new,
    document.form_A_new.unit_menu_new
  );
  updateUnitMenu(
    document.property_form_new.the_menu_new,
    document.form_B_new.unit_menu_new
  );
};
document
  .querySelector(".numbersonly-new")
  .addEventListener("keydown", function (e) {
    var key = e.keyCode ? e.keyCode : e.which;
    if (
      !(
        [8, 9, 13, 27, 46, 110, 190].indexOf(key) !== -1 ||
        (key == 65 && (e.ctrlKey || e.metaKey)) ||
        (key == 67 && (e.ctrlKey || e.metaKey)) ||
        (key == 86 && (e.ctrlKey || e.metaKey)) ||
        (key >= 35 && key <= 40) ||
        (key >= 48 && key <= 57 && !(e.shiftKey || e.altKey)) ||
        (key >= 96 && key <= 105)(key == 190)
      )
    )
      e.preventDefault();
  });
