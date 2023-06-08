$(document).ready(function () {
  $("#startShow").persianDatepicker({
    formatDate: "YYYY/MM/DD",
    selectedBefore: !0,
    onSelect: function () {
      setValidDate("start");
      updateEndDate();
    },
  });

  const selectedPlan = getSelectedPlan();
  const endDate = new persianDate()
    .now()
    .addDay(selectedPlan.duration)
    .toString("YYYY/MM/DD");
  $("#endShow").persianDatepicker({
    formatDate: "YYYY/MM/DD",
    selectedBefore: !0,
    selectedDate: endDate,
    onSelect: function () {
      setValidDate("end");
    },
  });

  setValidDate("start");
  setValidDate("end");

  $("#plan").change(function () {
    updatePlan();
    updateEndDate();
  });
});

function updateEndDate() {
  const selectedPlan = getSelectedPlan();
  const selectedStartDate = $("#startShow").val();
  const startDate = new persianDate().parse(selectedStartDate);
  const endDate = startDate
    .addDay(selectedPlan.duration)
    .toString("YYYY/MM/DD");
  $("#endShow").val(endDate);
  setValidDate("end");
}

function getSelectedPlan() {
  return plansData.find((plan) => plan._id === $("#plan").val());
}
function updatePlan() {
  // update sessions count
  const selectedPlan = getSelectedPlan();
  $("#remainingSessions").val(selectedPlan.sessions);
  // update start date
  const startDate = new persianDate().now().toString("YYYY/MM/DD");
  $("#startShow").val(startDate);
}

function setValidDate(input) {
  const inputVal = $(`#${input}Show`).val();
  const validIsoString = new persianDate().parse(inputVal).gDate.toISOString();
  $(`#${input}`).val(validIsoString);
}
