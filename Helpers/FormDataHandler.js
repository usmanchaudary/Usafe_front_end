function getFormValues(formId, url) {
  var form = document.getElementById(formId);
  var elements = form.elements;
  let formName = localStorage.getItem("sectionFor");
  let reportedBy = localStorage.getItem("userName");
  let IsEnvironmental = localStorage.getItem("IsEnvironmental");
  let siteId = localStorage.getItem("siteId");
  var values = {formName};
  values["userName"] = reportedBy;
  values["IsEnvironmental"] = IsEnvironmental;
  values["siteId"] = siteId;
  
  let containFiles = false;
  for (var i = 0; i < elements.length; i++) {
    var element = elements[i];
    var fieldName = element.id || element.name;
    var fieldType = element.type;
    if(element.value === "Select"){
      alert("Please select a value for "+element.id);
      //border color change to red
      element.style.borderColor = "red";
      return;
    }
    if (
      fieldName &&
      fieldType !== "submit" &&
      fieldType !== "reset" &&
      fieldType !== "button"
    ) {
      if (fieldType === "checkbox") {
        values[fieldName] = element.checked;
      } else if (fieldType === "file") {
        containFiles = true;
      } else if (fieldType === "datetime-local") {
        values[fieldName] = element.value;
      } else if (element.multiple) {
        values[fieldName] = getMultipleSelectValues(element);
      }else if(fieldType === "radio"){
        values[fieldName] = $(`input[name="${fieldName}"]:checked`).val();
      }
      else {
        values[fieldName] = element.value;
      }
    }
  }

  if (containFiles) {
    var fileElement = Array.from(form.getElementsByTagName("input")).filter(
      function (element) {
        return element.type === "file";
      }
    )[0];

    var fieldName = fileElement.id || fileElement.name;
    let picturesFormData = getFileValues(fileElement);
    picturesFormData.append("values", JSON.stringify(values));

    values = picturesFormData;
  }
  if (url && values) {
    
    sendRequestWithFiles(url, "POST", values);
  }
  console.log(values);
  //prevent form from submitting

  return false;
}
function getFileValues(fileElement) {
  var formData = new FormData();

  for (var i = 0; i < fileElement.files.length; i++) {
    var file = fileElement.files[i];
    formData.append("pictures", file);
  }

  return formData;
}

function getMultipleSelectValues(selectElement) {
  var selectedOptions = Array.from(selectElement.selectedOptions).map(function (option) {
    return option.value;
  });

  return selectedOptions;
}
