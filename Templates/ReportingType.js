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
          <a href="${href}?heading=${heading}"  ${url} class="btn btn-link ml-auto">
            <div class="col-mg-10">
                <h3 class="card-title">${title}</h3>
            </div>
            <i class="fas fa-chevron-circle-right"></i>
          </a>
        </div>
    </div>
</div>`;
};
