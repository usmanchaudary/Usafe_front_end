const dropDown = () => {
    return (
      `<div class='DropContainer'>
      <p class='DropHeaders'>Responsibility</p>
      <div class='dropContent'>
          <p>Prod Area Manager</p>
          <i class="fa fa-angle-down" aria-hidden="true"></i>


      </div>
  </div>
  `
    )
  }
  const dropDownCaller=()=>{
      $(".dropDown").html(dropDown())
  }
  
  dropDownCaller();