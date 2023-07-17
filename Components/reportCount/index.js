const reportCount = () => {
    return (
      `<div class='ReportCountContainer'>
      <p class='ReportCountContent'>Total Submitted Report(s)</p>
      <p class='ReportCountContent'>292</p>
  </div>
  `
    )
  }
  const reportCountCaller=()=>{
      $(".reportCount").html(reportCount())
  }
  
  reportCountCaller();