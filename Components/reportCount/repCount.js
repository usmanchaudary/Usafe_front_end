const reportCount = (repCount) => {
  return (
    `<div class='ReportCountContainer' style="background-color:whitesmoke;">
      <table class="table table-borderless table-sm" >
      <tbody>
      <tr style="text-align:center">
      <td style="font-weight:bold">${repCount}</td>
      <td style="font-weight:bold">0</td>
    </tr>
        <tr style="text-align:center">
          <td style="font-size:14px">Submitted Reports</td>
          <td style="font-size:14px">Offline Reports</td>
          </tr>
          </tbody>
      </div>
  `
  )
}
const reportCountCaller = (repCount) => {
  $(".reportCount").html(reportCount(repCount))
}
