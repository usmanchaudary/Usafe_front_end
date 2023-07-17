const floatBtn = () => {
    return (
      `<button class="btnFloat">+</button>
  `
    )
  }
  const floatBtnCaller=()=>{
      $(".floatBtn").html(floatBtn())
  }
  
  floatBtnCaller();