var taskId = 0;
var entity = null;
const createTasks = (tasks) => {
   let html = "";
   tasks.forEach(task => {
      html += `<div class='TaskContainer'>
      <div class='ReportContent'>

        <div class='TaskHeadings'>
          <p>Status:</p>
          <p>Type:</p>
          <p>Assigned to:</p>
          <p>Due Date:</p>
        </div>

        <div class='ReportDescriptions'>
          <p>${task.status}</p>
          <p>${task.formName}</p>
          <p>${task.assignedTo}</p>
          <p>${new Date(task.createdDate).toDateString()}</p>
        </div>

      </div>
      <div class='ReportBorder'> </div>
      <div class='TaskBtn'>
        <button class='ReportButton' onclick="NavigateToDetails('${task.entity}',${task.id})" data-toggle="modal" data-target="#taskModal')">VIEW DETAILS</button>
        <button class='ReportButton' data-toggle="modal" data-target="#taskModal" data-taskId=${task.id} onclick="setTaskId(${task.id}, '${task.entity}', '${task.status}')">CHANGE STATUS</button>
      </div>
    </div>
  `
  });
  return html;
  }
  const tasksCaller=(tasks)=>{
      $(".tasks").html(createTasks(tasks))
  }
  function setTaskId(id,et, status){
    taskId = id;
    entity = et;
    showNextStatus(status);
  }

  function changeTaskStatus(){
    //get status value by name
    let status = $("input[name='status']:checked").val();
    sendRequest(`api/ChangeForm/changeTaskStatus?id=${taskId}&entity=${entity}&taskValue=${status}`,'POST',{},(data)=>{
      if(data){
        swalSuccess("Status Changed Successfully");
      }
    });
  }

  //create a function which takes a status string and only shows next status options. i.e if status is pending then only show in progress and completed and so on
  function showNextStatus(status){
    let statusArray = [];
    switch(status){
      case "Pending":
        statusArray = ["In Progress", "Completed"];
        break;
      case "In Progress":
        statusArray = ["Completed"];
        break;
      case "InProgress":
        statusArray = ["Completed"];
        break;
      case "Completed":
        statusArray = ["In Progress"];
        break;
    }
    let html = "";
    for (const iterator of statusArray) {
      html += `<input type="radio" id="status1" checked name="status" value="${iterator}">
      <label for="status1">${iterator}</label> <br>`
    }

    $("#changeStatusModalBody").html(html);
  }

  const NavigateToDetails = (entity,id) => {
    window.location.href = "/Pages/reportDeatails/reportDetails.html?entity="+entity+"&id="+id;
  };