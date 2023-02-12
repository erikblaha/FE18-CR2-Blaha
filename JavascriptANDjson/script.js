fetch('/JavascriptAndjson/data.json')
  .then((response) => response.json())
  .then((data) => {
    let weeklyTasks = data.tasks;
    for (let val of weeklyTasks) {
      document.getElementById('result').innerHTML += `
      <div class="mb-2 col-lg-4 col-md-6 col-sm-12">
        <div class="card" style="width: 18rem;">
          <img src="${val.pic}" class="card-img-top" alt="${val.taskName}">
          <div class="card-body">
            <h5 class="card-title">${val.taskName}</h5>
            <p class="card-text">${val.description} </p>
            <p> ${val.duration} </p>
            <p class="importance">Importance: <span>${val.importance}</span></p>
            <button class="btn btn-success increase-importance">Priority Level</button>
          </div>
        </div>
      </div>
        `;

      // increase button and change the color

      let increaseImportanceButtons = document.getElementsByClassName(
        'increase-importance'
      );

      const importanceTextElements =
        document.querySelectorAll('.importance > span');

      for (let i = 0; i < increaseImportanceButtons.length; i++) {
        increaseImportanceButtons[i].addEventListener('click', function () {
          weeklyTasks[i].importance++;

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
            weeklyTasks[i].importance >= 4 &&
            weeklyTasks[i].importance <= Infinity
          ) {
            color = 'btn-danger';
          }

          importanceTextElements[i].className = `btn ${color}`;
        });
      }
    }

    // how to sort

    let sortButton = document.getElementById('sortButton');

    sortButton.addEventListener('click', function () {
      weeklyTasks.sort(function (a, b) {
        return a.importance - b.importance;
      });
      displayTasks();
    });

    function displayTasks() {
      document.getElementById('result').innerHTML = '';
      for (let val of weeklyTasks) {
        document.getElementById('result').innerHTML += `
        <div class="mb-2">
          <div class="card" style="width: 18rem;">
            <img src="${val.pic}" class="card-img-top" alt="${val.taskName}">
            <div class="card-body">
              <h5 class="card-title">${val.taskName}</h5>
              <p class="card-text">${val.description} </p>
              <p> ${val.duration} </p>
              <p class="importance">Importance: <span>${val.importance}</span></p>
              <button class="btn btn-success increase-importance">Priority Level</button>
            </div>
          </div>
        </div>
        `;
      }
      let btns = document.getElementsByClassName('likeBtn');
      for (let i = 0; i < btns.length; i++) {
        btns[i].addEventListener('click', function () {
          weeklyTasks[i].importance++;
          document.getElementsByClassName('likes')[i].innerHTML =
            weeklyTasks[i].importance;
        });
      }
    }
  });
