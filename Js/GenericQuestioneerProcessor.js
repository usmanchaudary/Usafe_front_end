var _currentCheckList = "";

const GenericQuestioneerProcessor = (sectionName) => {
  $.get("../../configuration/CheckListQuestions.json", (data) => {
    let sectionFor = getValue("sectionFor");
    
    let sections = data.find((x) => x.sectionFor == sectionFor)?.sections;
    let section = sections.find((x) => x.sectionName == sectionName);
    _currentCheckList = section.sectionName; // this will be used at the time of submission
    let questions = section.questions;
    //need to create a form wizard which will be used to display the questions one by one with next and previous buttons
    //the form wizard will be created using the questions array
    const {wizardHtml, resultHtml} = createChecklistFormWizard(questions);
    $("#wizardContainer").html(wizardHtml);
    $("#resultContainer").html(resultHtml);
  });
};

let currentIndex = 0; // Current question index
let _questions = []; // Array of questions
let resultSet = [];
const createChecklistFormWizard = (questions) => {
    
  let wizardHtml = "";
  _questions = questions;
  for (let i = 0; i < questions.length; i++) {
    const question = questions[i];
    const activeClass = i === 0 ? 'active-form' : '';
    const questionId = i + 1; // Generate unique question ID
    wizardHtml += `<div class="container wizard-form ${activeClass}">
        <h4 class="text-center" id="heading${questionId}" style="font-weight: bold;">${question.heading}</h4>
        <div class="form-group">
            <p id="question${questionId}">${question.question}</p>
        </div>

        <div class="form-group">
          <input id="compliance${questionId}" value="NonCompliant" type="radio" name="Compliance${questionId}" />
          <label>Non Compliant</label> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <input id="compliance${questionId}" value="Compliant" type="radio" name="Compliance${questionId}" />
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
          <select id="responsibility${questionId}" class="form-control">
          <!-- write responsible person option here -->
          </select>
        </div>

        <button class="btn btn-secondary  float-right ml-lg-5" style="width: 20%;" onclick="handleNext(${questions.length})"> Next </button>
        <button  class="btn btn-warning float-right" style="width: 20%;" onclick="handleSkip(${questions.length})"> Skip </button>
        <button class="btn btn-warning float-left" style="width: 20%;" onclick="handleBack()"> Back </button>

        </div>`;

    }

// Resulting page with accordion
  const resultHtml = `
  <div id="resultContainer">
    <h2>Checklist Results</h2>
    <div class="accordion" id="accordionResults">
      ${questions
        .map((question, index) => `
          <div class="card">
            <div class="card-header" id="questionHeading${index}">
              <h5 class="mb-0">
                <button class="btn btn-link" type="button" data-toggle="collapse" data-target="#questionCollapse${index}" aria-expanded="true" aria-controls="questionCollapse${index}">
                  ${question.heading}
                </button>
              </h5>
            </div>
            <div id="questionCollapse${index}" class="collapse" aria-labelledby="questionHeading${index}" data-parent="#accordionResults">
              <div class="card-body">
                <!-- Display input values for question ${index + 1} -->
                <p>Compliance: <span id="question${index + 1}ComplianceValue"></span></p>
                <p>Status: <span id="question${index + 1}StatusValue"></span></p>
                <p>Actions / Remarks: <span id="question${index + 1}ActionsValue"></span></p>
                <p>Responsibility: <span id="question${index + 1}ResponsibilityValue"></span></p>
              </div>
            </div>
          </div>
        `)
        .join('')}
    </div>
    <button class="btn btn-dark btn-block mt-lg-3" style="background-color: black; color: white;" onclick="submitResultSet()">Submit</button>
  </div>
`;
  return {wizardHtml, resultHtml};
};

const showForm = (index) => {
    const forms = document.getElementsByClassName("wizard-form");
    for (let i = 0; i < forms.length; i++) {
      //forms[i].classList.remove("active-form");
      forms[i].classList.remove('active-form', 'fade-in');
    }
   // forms[index].classList.add("active-form");
   forms[index].classList.add('active-form', 'fade-in');
  };

  const handleNext = (length,questions) => {
    if (currentIndex < length - 1) {
      currentIndex++;
      showForm(currentIndex);
    }
    else{
        showForm(currentIndex);
        $('#wizardContainer').css('display', 'none');
        $('#resultContainer').css('display', 'block');
        displayResults(questions);
    }
  };

//write me a function which fetch all query parameters from url string

  const handleSkip = (length) => {
    if (currentIndex < length - 1) {
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

        const selectedCompliance = document.querySelector(`#compliance${questionId}:checked`);
        const status = document.getElementById(`status${questionId}`);
        const actions = document.getElementById(`actions${questionId}`);
        const responsibility = document.getElementById(`responsibility${questionId}`);
        const question = document.getElementById(`question${questionId}`);
        const heading  = document.getElementById(`heading${questionId}`);

        const complianceValue = document.getElementById(`question${questionId}ComplianceValue`);
        const statusValue = document.getElementById(`question${questionId}StatusValue`);
        const actionsValue = document.getElementById(`question${questionId}ActionsValue`);
        const responsibilityValue = document.getElementById(`question${questionId}ResponsibilityValue`);
    
        complianceValue.textContent = selectedCompliance ? selectedCompliance.value : '';
        statusValue.textContent = status.value;
        actionsValue.textContent = actions.value;
        responsibilityValue.textContent = responsibility.value;

        //fill the data in resultSet
        resultSet.push({
            questionId: questionId,
            compliance: selectedCompliance ? selectedCompliance.value : '',
            status: status.value,
            actions: actions.value,
            responsibility: responsibility.value,
            question: question.innerText,
            heading: heading.innerText
        });
    }
  };

  const submitResultSet = () => {
    let parent = getValue('sectionFor');
    //add checkList Name in resultSet
    let reportedBy = localStorage.getItem("userName");
    
    resultSet = {parentCheckList: parent, checkListName: _currentCheckList, reportedBy, checkListData : resultSet};
    console.log(resultSet);
    sendRequest(`api/checklist/saveCheckList`, 'POST', JSON.stringify(resultSet));
  }
  