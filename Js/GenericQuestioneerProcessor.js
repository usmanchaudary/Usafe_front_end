var _currentCheckList = "";
var responsiblePersons = [];
let sectionFor = getValue("sectionFor");
const GenericQuestioneerProcessor = (sectionName) => {
  sendRequest(`api/checklist/getQuestions?checkListFormName=${sectionFor}&formName=${sectionName}`, 'GET', null, (data) => {
    let section = data.find(x => x.sectionName == sectionName);
    _currentCheckList = section.sectionName; // this will be used at the time of submission
    let questions = section.questions;
    //need to create a form wizard which will be used to display the questions one by one with next and previous buttons
    //the form wizard will be created using the questions array
    const { wizardHtml, resultHtml } = createChecklistFormWizard(questions);
    $("#wizardContainer").html(wizardHtml);
    $("#resultContainer").html(resultHtml);
  });
};

let currentIndex = 0; // Current question index
let _questions = []; // Array of questions
let resultSet = [];
const createChecklistFormWizard = (questions) => {
  let wizardHtml = createInitialElements();

  _questions = questions;
  for (let i = 0; i < questions.length; i++) {
    const question = questions[i];
    const activeClass = i === 0 ? "" : "";
    const questionId = i + 1; // Generate unique question ID

    wizardHtml += `<div class="container wizard-form ${activeClass}">
        <h4 class="text-center" id="heading${questionId}" style="font-weight: bold;">${question.heading}</h4>
        <div class="form-group">
            <p id="question${questionId}">${question.question}</p>
        </div>

        <div class="form-group">
          <input id="compliance${questionId}" value="NonCompliant" type="radio" name="Compliance${questionId}" />
          <label>Non Compliant</label> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <input id="compliance${questionId}" checked value="Compliant" type="radio" name="Compliance${questionId}" />
          <label>Compliant</label> 
        </div>

        <div class="form-group">
          <label>Status</label>
          <textarea id="status${questionId}" class="form-control" rows="3" placeholder="Enter ..."></textarea>
        </div>
        
        <div class="form-group">
          <label>Actions / Remarks</label>
          <textarea id="actions${questionId}" class="form-control" rows="3" placeholder="Enter ..."></textarea>
        </div>
        
        <div class="form-group">
          <label>Responsibility</label>
          <select id="responsibility${questionId}" class="form-control responsiblity">
          <!-- write responsible person option here -->
          </select>
        </div>

        <button class="btn btn-secondary  float-right ml-lg-5" style="width: 20%; "  onclick="handleNext(${questions.length})"> Next </button>
        <button  class="btn btn-warning float-right" style="width: 20%;display:none" onclick="handleSkip(${questions.length})"> Skip </button>
        <button class="btn btn-warning float-left" style="width: 20%;" onclick="handleBack()"> Back </button>

        </div>`;
  }

  // Resulting page with accordion
  let resultHtml = "";
  resultHtml = createResultHtml(questions);
  resultHtml += `<button class="btn btn-dark btn-block mt-lg-3" style="background-color: black; color: white;" onclick="submitResultSet(this)">Submit</button>
  </div>
`;
  return { wizardHtml, resultHtml };
};

const showForm = (index) => {
  const forms = document.getElementsByClassName("wizard-form");
  for (let i = 0; i < forms.length; i++) {
    //forms[i].classList.remove("active-form");
    forms[i].classList.remove("active-form", "fade-in");
  }
  // forms[index].classList.add("active-form");
  forms[index].classList.add("active-form", "fade-in");
};

const handleNext = (length, questions) => {

  if (validateChecklist(currentIndex)) {
    if (currentIndex < length) {
      currentIndex++;
      showForm(currentIndex);
    } else {
      showForm(currentIndex);
      $("#wizardContainer").css("display", "none");
      $("#resultContainer").css("display", "block");
      displayResults(questions);
    }
  }
};

//write me a function which fetch all query parameters from url string

const handleSkip = (length) => {
  if (currentIndex < length) {
    currentIndex++;
    showForm(currentIndex);
  }
};

const handleBack = () => {
  if (currentIndex > 0) {
    currentIndex--;
    showForm(currentIndex);
  }
};

const displayResults = () => {
  for (let i = 0; i < _questions.length; i++) {
    const questionId = i + 1;

    const selectedCompliance = document.querySelector(
      `#compliance${questionId}:checked`
    );
    const status = document.getElementById(`status${questionId}`);
    const actions = document.getElementById(`actions${questionId}`);
    const responsibility = document.getElementById(
      `responsibility${questionId}`
    );

    const question = document.getElementById(`question${questionId}`);
    const heading = document.getElementById(`heading${questionId}`);

    const complianceValue = document.getElementById(
      `question${questionId}ComplianceValue`
    );
    const statusValue = document.getElementById(
      `question${questionId}StatusValue`
    );
    const actionsValue = document.getElementById(
      `question${questionId}ActionsValue`
    );
    const responsibilityValue = document.getElementById(
      `question${questionId}ResponsibilityValue`
    );

    complianceValue.textContent = selectedCompliance
      ? selectedCompliance.value
      : "";

    statusValue.textContent = status.value;
    actionsValue.textContent = actions.value;
    responsibilityValue.textContent = responsibility.value == "Select Responsible Person" ? "" : responsibility.value;

    //fill the data in resultSet
    resultSet.push({
      questionId: questionId,
      compliance: selectedCompliance ? selectedCompliance.value : "",
      status: status.value,
      actions: actions.value,
      responsibility: responsibility.value == "Select Responsible Person" ? "" : responsibility.value,
      question: question.innerText,
      heading: heading.innerText,
    });
  }
};

const submitResultSet = (obj) => {
  //disable button
  $(obj).attr("disabled", true);
  let parent = getValue("sectionFor");
  //add checkList Name in resultSet
  let reportedBy = localStorage.getItem("userName");
  let siteId = localStorage.getItem("siteId");
  let department = $("#department option:selected").text();
  let area = $("#area option:selected").text();
  console.log(department, area);
  if (!validateWholeCheckList(department, area)) {
    currentIndex = 0;
    handleNext(_questions.length, _questions);
    resultSet.length = 0;
    $(obj).attr("disabled", false);
    $("#wizardContainer").css("display", "block");
    $("#resultContainer").css("display", "none");
    return;
  }
  resultSet = {
    parentCheckList: parent,
    checkListName: _currentCheckList,
    reportedBy,
    department,
    area,
    siteId,
    checkListData: resultSet,
  };

  console.log(resultSet);
  sendRequest(`api/checklist/saveCheckList`, "POST", JSON.stringify(resultSet), result => {
    console.log(result);
    if (result.status == 200) {
      swalSuccess("Checklist Saved Successfully");
    }
  });
};

const validateWholeCheckList = (department, area) => {
  if (department == "Select Department") {
    swalNotification("Please select department", "warning");
  
    return false;
  }
  if (area == " Select Area ") {
    swalNotification("Please select area", "warning");
     
    return false;
  }

  //in resultSet every non-compliant should have value for responsibility and actions
  let nonCompliant = resultSet.filter((x) => x.compliance == "NonCompliant");
  let nonCompliantWithNoResponsibility = nonCompliant.filter(
    (x) => x.responsibility == ""
  );
  let nonCompliantWithNoActions = nonCompliant.filter((x) => x.actions == "");
  if (nonCompliantWithNoResponsibility.length > 0) {
    swalNotification("Please select responsible person for non-compliant checkpoint "+ nonCompliantWithNoResponsibility.map(x=>x.questionId).join(","), "warning");
     
    return false;
  }
  if (nonCompliantWithNoActions.length > 0) {
    swalNotification(`Please provide actions for non-compliant checkpoint ${nonCompliantWithNoActions.map(x=>x.questionId).join(",")}`, "warning");
   
    return false;
  }
  return true;
};

const validateChecklist = (index) => {
  let department = $("#department option:selected").text();
  let area = $("#area option:selected").text();
  if (index == 0) {

    if (department == "Select Department") {
      swalNotification("Please select department", "warning");
      return false;
    }
    if (area == " Select Area ") {
      swalNotification("Please select area", "warning");
      return false;
    }
  }
  else {
    //get the values of the current question
    const compliance = document.querySelector(`#compliance${index}:checked`);
    const status = document.getElementById(`status${index}`);
    const actions = document.getElementById(`actions${index}`);
    const responsibility = document.getElementById(`responsibility${index}`);
    //if compliance is set to non compliant then check for action value and responsibility value
    if (compliance.value == "NonCompliant") {
      if (actions.value == "") {
        swalNotification("Please enter actions", "warning");
        return false;
      }
      if (responsibility.value == "Select Responsible Person") {
        swalNotification("Please select responsible person", "warning");
        return false;
      }
    }
  }
  return true;
};


const createInitialElements = () => {
  let wizardHtml = `
    <div class="container wizard-form active-form">
    <div class="form-group">
    <label>Department</label>
    <select id="department" onchange="getAreas(this)" class="form-control">
    <option value="0" selected disabled hidden >Select Department</option>`;

  let departments = JSON.parse(getValue("departments"));

  departments.forEach((x) => {
    wizardHtml += `<option value="${x.id}">${x.name}</option>`;
  });
  wizardHtml += `</select>
    </div>`;
  wizardHtml += `<div class="form-group">
    <label>Area</label>
    <select id="area" class="form-control" onchange="getResponsiblePersons()">
    <option value="0" >Select Area</option>
    </select>
    </div>
    <button class="btn btn-primary btn-block mt-lg-3" style="background-color: black; color: white;" onclick="handleNext(1)">Next</button>
    </div>
      
      `;
  return wizardHtml;
};

const getAreas = (element) => {
  let siteId = getValue("siteId");
  let departmentId = element.value;
  sendRequest(
    `Area/getArea?siteId=${siteId}&deptId=${departmentId}`,
    "GET",
    null,
    (response) => {
      let areas = response;
      let areaHtml = "<option selected disabled hidden> Select Area </option>";
      areas.forEach((area) => {
        areaHtml += `<option value="${area.id}">${area.areaName}</option>`;
      });
      document.getElementById("area").innerHTML = areaHtml;
    }
  );
};

const getResponsiblePersons = (obj) => {
  let siteId = getValue("siteId");
  let departmentId = $("#department option:selected").val();
  let areaId = $("#area option:selected").val();
  sendRequest(`Employee/GetAllEmployeeOfSite?siteId=${siteId}&deptId=${departmentId}&areaId=${areaId}`, "GET", null, (response) => {
    let employees = response;
    let responsibilityElements = document.querySelectorAll('.responsiblity');

    responsibilityElements.forEach((element) => {
      let employeeHtml = "<option selected disabled hidden> Select Responsible Person </option>";
      employees.forEach((employee) => {
        employeeHtml += `<option value="${employee.id}">${employee.name}</option>`;
      });
      element.innerHTML = employeeHtml;
    });

  });
};

