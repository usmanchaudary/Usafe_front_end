const createHeader = (heading) => {
  return `<div class="navbar mb-lg-4">
  <i class="fas fa-arrow-left navbar-back btn-highlight" onclick="window.history.back()" style="cursor:pointer"></i>
  <i class="fas fa-home navbar-back btn-highlight" onclick="navigateToHome()" style="cursor:pointer"></i>
  <span class="mb-lg-3 text-center"></span>
 </div>`;
 
};
const navigateToHome = ()=>{
  window.location.href = "/Pages/reporting/reporting.html";
}
