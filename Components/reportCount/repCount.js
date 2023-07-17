const reportCount = (repCount) => {
    return (
      `<div class='ReportCountContainer'>
      <p class='ReportCountContent'>Total Submitted Report(s)</p>
      <p class='ReportCountContent'>${repCount}</p>
  </div>
  `
    )
  }
  const reportCountCaller=(repCount)=>{
      $(".reportCount").html(reportCount(repCount))
  }
