const tasks = () => {
    return (
      `<div class='TaskContainer'>
      <div class='ReportContent'>

        <div class='TaskHeadings'>
          <p>Status:</p>
          <p>Type:</p>
          <p>Assigned to:</p>
          <p>Due Date:</p>
        </div>

        <div class='ReportDescriptions'>
          <p>Pending</p>
          <p>Hazard Reporting</p>
          <p>Prod Area Manager</p>
          <p>2018-05-25</p>
        </div>

      </div>
      <div class='ReportBorder'/>
      <div class='TaskBtn'>
        <button class='ReportButton'}>VIEW DETAILS</button>
        <button class='ReportButton'}>CHANGE STATUS</button>
      </div>

    </div>
  `
    )
  }
  const tasksCaller=()=>{
      $(".tasks").html(tasks())
  }
  
  tasksCaller();