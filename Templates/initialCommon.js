const selectedLanguage = localStorage.getItem("previousLanguage");
const createInitialCommonTemplate = (element) => {
  var html = "";
  switch (element.elementTag) {
    case "input":
    case "textarea":
      html = createInputElements(element);
      break;
    case "select":
      html = createSelectElements(element);
      break;
  }
  return html;
};

const createInputElements = (element) => {
  const name =
    selectedLanguage === "ur" && element.urdu ? element.urdu : element.name;
  if (element.type == "file") {

    return createFileInput(element);
  }
  return `<div class="form-group">
    <label for="${element.name}">${name}</label>
    <${element.elementTag} type="${element.type}" accept="image/png, image/gif, image/jpeg" ${element.multiple} class="form-control" id="${element.name}" placeholder="${element.name}" col="10" row="20" ></${element.elementTag}>
    </div>`;
};

const createFileInput = (element) => {
  return `<div id="fileuploader-container">
    <div id="file-uploader"></div>
  </div>`;
}; 

const createDevExtremeFileUploader = (element) => {
  $("#file-uploader").dxFileUploader({
    selectButtonText: "Select photo",
    labelText: '',
    accept: "image/*",
    uploadMode: "useForm",
    name:"pictures",
    multiple: true,
  });
};

const createSelectElements = (element) => {
  const name =
    selectedLanguage === "ur" && element.urdu ? element.urdu : element.name;
  let html = `<div class="form-group">
                <label for="${element.name}">${name}</label>
                <select class="form-control" id="${element.name}" data-api="${
    element.api
  }"  data-textField=${element.textField} data-valueField=${
    element.valueField
  } data-childName="${element.child}" ${
    element.type === "cascaded"
      ? `onchange="${element.populateFunction}(this)"`
      : ""
  }>
                <option selected disabled hidden>Select</option>
                `;
  if (!element.Parent) {
    let departments = JSON.parse(localStorage.getItem("departments"));
    for (let i = 0; i < departments.length; i++) {
      // const depName = selectedLanguage === 'ur' && departments.urdu ? departments.urdu : departments.name;
      html += `<option value="${departments[i].id}"> ${departments[i].name} </option>`;
    }
  } else {
    for (let i = 0; i < element.options.length; i++) {
      // const text = selectedLanguage === 'ur' && element.options[i].urText ? element.options[i].urText : element.options[i].text;
      html += `<option value="${element.options[i].val}"> ${element.options[i].text} </option>`;
    }
  }
  html += `</select>
            </div>`;
  return html;
};
