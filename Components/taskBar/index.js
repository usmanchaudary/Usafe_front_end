const taskBar = () => {
    return (
      `<div class='taskBarContainer'>

      <div class='taskIconContainer'>

          <div class='taskIcons'>
            <i class="fa fa-calendar faIcon" aria-hidden="true"></i>
            <a href='/Pages/reporting/reporting.html'>My Reporting</a>
          
          </div>

          <div class='taskIcons'>
          <i class="fa fa-calendar-check-o faIcon" aria-hidden="true"></i>
            <a href='/Pages/taskPage/taskPage.html'>My Tasks</a>
          
          </div>

          <div class='taskIcons'>
            <i class="fa fa-user faIcon" onclick="activateClass(this)" aria-hidden="true"></i>
            <a href='/Pages/myProfile/myProfile.html'>My Profile</a>
          
          </div>
        </div>

      </div>
  `
    )
  }
  const taskBarCaller=()=>{
      $(".taskBar").html(taskBar())
  }

  taskBarCaller();

  function activateClass(obj){
    $(obj).addClass('active');
  }