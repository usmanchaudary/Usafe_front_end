const taskBar = () => {
    return (
      `<div class='taskBarContainer'>

      <div class='taskIconContainer'>

          <div class='taskIcons'>
          <a href='/Pages/reporting/reporting.html'>  
            <i class="fa fa-calendar faIcon" aria-hidden="true"></i>
            My Reporting
            </a>
          
          </div>

          <div class='taskIcons'>
          <a href='/Pages/taskPage/taskPage.html'>
          <i class="fa fa-calendar-check-o faIcon" aria-hidden="true"></i>
            My Tasks</a>
          
          </div>

          <div class='taskIcons'>
          <a href='/Pages/myProfile/myProfile.html'>
            <i class="fa fa-user faIcon" onclick="activateClass(this)" aria-hidden="true"></i>
            My Profile</a>
          
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