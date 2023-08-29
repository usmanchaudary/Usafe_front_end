const createReportingTypeTemplate = (heading, href, urdu) => {
  const selectedLanguage = localStorage.getItem("previousLanguage");
  let title = ";";
  if (urdu) {
    title = selectedLanguage === "ur" ? urdu : heading;
  } else {
    title = heading;
  }
  var url_string = window.location.href;
  var url = new URL(url_string);

  url = url.pathname.includes("reportingType.html") || url.pathname.includes("EnvironmentalChanges.html") ? `onclick="setValue('sectionFor', '${heading}')"` : "";

  return `<div class="card shadow container" style="margin-bottom: 22px;">
    <div class="card-body">
<div class="row">
    <a href="${href}?heading=${heading}"  ${url} class="btn btn-link ml-auto" style="width:100%">
        <div style="display: flex; justify-content: space-between; align-items: center; width: 100%;">
            <div style="display: flex; align-items: center;">
                <h3 class="card-title" style="margin: 0;">${title}</h3>
            </div>
            <div style="display: flex; align-items: center;">
                <i class="fas fa-chevron-circle-right" aria-hidden="true"></i>
            </div>
        </div>
    </a>
</div>





    
    
</div>`;
};
