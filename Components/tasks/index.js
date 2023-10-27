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
        <button class='ReportButton' data-toggle="modal" data-target="#taskModal" data-taskId=${task.id} onclick="setTaskId(${task.id}, '${task.entity}')">CHANGE STATUS</button>
      </div>
    </div>
  `
  });
  return html;
  }
  const tasksCaller=(tasks)=>{
      $(".tasks").html(createTasks(tasks))
  }
  function setTaskId(id,et){
    taskId = id;
    entity = et;
  }

  function changeTaskStatus(){
    //get status value by name
    let status = $("input[name='status']:checked").val();
    sendRequest(`api/ChangeForm/changeTaskStatus?id=${taskId}&entity=${entity}&taskValue=${status}`,'POST',{},(data)=>{
      if(data){
        alert("Status Changed Successfully");
        window.location.reload();
      }
    });
  }

  const NavigateToDetails = (entity,id) => {
    window.location.href = "/Pages/reportDeatails/reportDetails.html?entity="+entity+"&id="+id;
  };