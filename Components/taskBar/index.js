const taskBar = () => {
    return (
      `<div class='taskBarContainer'>

      <div class='taskIconContainer'>

          <div class='taskIcons'>
            <i class="fa fa-calendar faIcon" aria-hidden="true"></i>
            <p>My Reporting</p>
          
          </div>

          <div class='taskIcons'>
          <i class="fa fa-calendar-check-o faIcon" aria-hidden="true"></i>
            <p>My Tasks</p>
          
          </div>

          <div class='taskIcons'>
            <i class="fa fa-user faIcon" aria-hidden="true"></i>
            <p>My Profile</p>
          
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