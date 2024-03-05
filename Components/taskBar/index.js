const taskBar = () => {
  const activeClass = 'active';
    return (
      `<div class='taskBarContainer'>

      <div class='taskIconContainer'>

          <div class='taskIcons'>
          <a href='/Pages/reporting/reporting.html'>  
            <i class="fa fa-calendar faIcon" id="reportingPage" aria-hidden="true"></i>
            My Reporting
            </a>
          
          </div>

          <div class='taskIcons'>
          <a href='/Pages/taskPage/taskPage.html'>
          <i class="fa fa-calendar-check-o faIcon" id="myTasksPage" aria-hidden="true"></i>
            My Tasks</a>
          
          </div>

          <div class='taskIcons'>
          <a href='/Pages/myProfile/myProfile.html'>
            <i class="fa fa-user faIcon" onclick="activateClass(this)" id="myProfilePage" aria-hidden="true"></i>
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
  
  function addActiveClassBasedOnURL(){
    let url = window.location.href;
    let activeClass = "active";
    if(url.includes("reporting")){
      $("#reportingPage").addClass(activeClass);
    }
    else if(url.includes("taskPage")){
      $("#myTasksPage").addClass(activeClass);
    }
    else if(url.includes("myProfile")){
      $("#myProfilePage").addClass(activeClass);
    }
  }
  addActiveClassBasedOnURL();
