const createReportingTypeTemplate = (heading, href) => { 
    var url_string = window.location.href;
    var url = new URL(url_string);
    
    url = url.pathname.includes('reportingType.html')? `onclick="setValue('sectionFor', '${heading}')"`: "";

    return `<div class="card shadow container" style="margin-bottom: 22px;">
    <div class="card-body">
        <div class="row">
            <div class="col-mg-10">
                <h3 class="card-title">${heading}</h3>
            </div>

            <a href="${href}?heading=${heading}"  ${url} class="btn btn-link ml-auto">
                <i class="fas fa-chevron-circle-right"></i>
            </a>
        </div>
    </div>
</div>`;
}
