
// change the color
function setIncreaseColor(importanceTextElements, weeklyTasks, i) {
  importanceTextElements[i].innerHTML = weeklyTasks[i].importance;

  let color = '';

  if (
    weeklyTasks[i].importance >= 0 &&
    weeklyTasks[i].importance <= 1
  ) {
    color = 'btn-success';
  } else if (
    weeklyTasks[i].importance >= 2 &&
    weeklyTasks[i].importance <= 3
  ) {
    color = 'btn-warning';
  } else if (
    weeklyTasks[i].importance >= 4
  ) {
    color = 'btn-danger';
  }

  importanceTextElements[i].className = `btn ${color} importance-number`;
}

function displayTasks(weeklyTasks) {
  document.getElementById('result').innerHTML = '';
  for (let val of weeklyTasks) {
    document.getElementById('result').innerHTML += `
    <div class="mb-2 col-lg-4 col-md-6 col-sm-12">
      <div class="card shadow-lg bg-body">
        <img src="${val.pic}" class="card-img-top" alt="${val.taskName}">
        <div class="card-body">
          <h5 class="card-title">${val.taskName}</h5>
          <p class="card-text">${val.description} </p>
          <p> ${val.duration} </p>
          <p> ${val.deadline} <i class="fa-solid fa-calendar-days"></i></p>
          <p class="importance">
            <span class="increase-importance"><i class="fa-solid fa-triangle-exclamation"></i></span>
            Importance: <span class="importance-number">${val.importance}</span>
          </p>
        </div>
      </div>
    </div>
      `;
  }

  // increase button 
  let increaseImportanceButtons = document.getElementsByClassName(
    'increase-importance'
  );

  const importanceTextElements =
    document.querySelectorAll('.importance > .importance-number');

  for (let i = 0; i < increaseImportanceButtons.length; i++) {
    setIncreaseColor(importanceTextElements, weeklyTasks, i);

    increaseImportanceButtons[i].addEventListener('click', function () {
      weeklyTasks[i].importance++;

      setIncreaseColor(importanceTextElements, weeklyTasks, i);
    });
  }
}

fetch('/JavascriptAndjson/data.json')
  .then((response) => response.json())
  .then((data) => {
    let weeklyTasks = data.tasks;
    displayTasks(weeklyTasks);

    // how to sort

    let sortButton = document.getElementById('sortButton');

    let sortDirection;
    sortButton.addEventListener('click', function () {
      const sortButton = document.querySelectorAll(".sortButton > i")[0];
      if (sortDirection === "asc") {
        sortDirection = "desc";
        sortButton.classList = "fa-solid fa-arrow-up-wide-short";
      } else {
        sortDirection = "asc";
        sortButton.classList = "fa-solid fa-arrow-down-wide-short";
      }

      const sortedWeeklyTasks = weeklyTasks.sort(function (a, b) {
        if (sortDirection === "desc") {
          return a.importance - b.importance;
        }
        return b.importance - a.importance;
      });

      displayTasks(sortedWeeklyTasks);
    });


  });
