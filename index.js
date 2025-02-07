    let app = document.getElementById("app");


    let container = document.createElement("div");
    container.className = "container";
    app.append(container);


    let title = document.createElement("h1");
    title.innerHTML = "Добавление, изменение и удаление элемента из таблицы";
    container.append(title);

    let formGroup = document.createElement("div");
    formGroup.className = "form-group";

    let inputName = document.createElement("input");
    inputName.placeholder = "Имя";
    formGroup.append(inputName);

    let inputAge = document.createElement("input");
    inputAge.placeholder = "Возраст";
    inputAge.type = "number";
    formGroup.append(inputAge);

    let showBtn = document.createElement("button");
    showBtn.innerHTML = "Показать";
    formGroup.append(showBtn);

    container.append(formGroup);

    let table = document.createElement("table");
    container.append(table);

    let thead = document.createElement("thead");
    let headerRow = document.createElement("tr");
    let headers = ["No", "Имя студента", "Год рождения", "Действия"];
    
    headers.forEach(text => {
        let th = document.createElement("th");
        th.innerHTML = text;
        headerRow.append(th);
    });

    thead.append(headerRow);
    table.append(thead);

    let tbody = document.createElement("tbody");
    table.append(tbody);

    let students = [];
    let count = 1;

    showBtn.onclick = () => {
        let name = inputName.value.trim();
        let age = inputAge.value.trim();

        if (name === "" || age === "") {
            alert("Введите имя и возраст!");
            return;
        }

        let yearOfBirth = new Date().getFullYear() - parseInt(age);
        let student = { id: count++, name, yearOfBirth };
        students.push(student);

        updateTable();
        inputName.value = "";
        inputAge.value = "";
    };

    function updateTable() {
        tbody.innerHTML = "";

        students.forEach((student, index) => {
            let row = document.createElement("tr");

            let cellNumber = document.createElement("td");
            cellNumber.innerHTML = index + 1;
            row.append(cellNumber);

            let cellName = document.createElement("td");
            cellName.innerHTML = student.name;
            row.append(cellName);

            let cellYear = document.createElement("td");
            cellYear.innerHTML = student.yearOfBirth;
            row.append(cellYear);

            let cellActions = document.createElement("td");
            cellActions.className = "actions";

            let editBtn = document.createElement("button");
            editBtn.className = "edit-btn";
            editBtn.innerHTML = `<?xml version="1.0" encoding="utf-8"?><svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 121.48 122.88" style="enable-background:new 0 0 121.48 122.88" xml:space="preserve"><style type="text/css">.st0{fill-rule:evenodd;clip-rule:evenodd;}</style><g><path class="st0" d="M96.84,2.22l22.42,22.42c2.96,2.96,2.96,7.8,0,10.76l-12.4,12.4L73.68,14.62l12.4-12.4 C89.04-0.74,93.88-0.74,96.84,2.22L96.84,2.22z M70.18,52.19L70.18,52.19l0,0.01c0.92,0.92,1.38,2.14,1.38,3.34 c0,1.2-0.46,2.41-1.38,3.34v0.01l-0.01,0.01L40.09,88.99l0,0h-0.01c-0.26,0.26-0.55,0.48-0.84,0.67h-0.01 c-0.3,0.19-0.61,0.34-0.93,0.45c-1.66,0.58-3.59,0.2-4.91-1.12h-0.01l0,0v-0.01c-0.26-0.26-0.48-0.55-0.67-0.84v-0.01 c-0.19-0.3-0.34-0.61-0.45-0.93c-0.58-1.66-0.2-3.59,1.11-4.91v-0.01l30.09-30.09l0,0h0.01c0.92-0.92,2.14-1.38,3.34-1.38 c1.2,0,2.41,0.46,3.34,1.38L70.18,52.19L70.18,52.19L70.18,52.19z M45.48,109.11c-8.98,2.78-17.95,5.55-26.93,8.33 C-2.55,123.97-2.46,128.32,3.3,108l9.07-32v0l-0.03-0.03L67.4,20.9l33.18,33.18l-55.07,55.07L45.48,109.11L45.48,109.11z M18.03,81.66l21.79,21.79c-5.9,1.82-11.8,3.64-17.69,5.45c-13.86,4.27-13.8,7.13-10.03-6.22L18.03,81.66L18.03,81.66z"/></g></svg>`;
            editBtn.onclick = () => {
                let newName = prompt("Введите новое имя:", student.name);
                let newAge = prompt("Введите новый возраст:", new Date().getFullYear() - student.yearOfBirth);

                if (newName && newAge) {
                    student.name = newName;
                    student.yearOfBirth = new Date().getFullYear() - parseInt(newAge);
                    updateTable();
                }
            }
            cellActions.append(editBtn);

            let deleteBtn = document.createElement("button");
            deleteBtn.className = "delete-btn";
            deleteBtn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="100" height="100" viewBox="0 0 24 24"><path d="M 10.806641 2 C 10.289641 2 9.7956875 2.2043125 9.4296875 2.5703125 L 9 3 L 4 3 A 1.0001 1.0001 0 1 0 4 5 L 20 5 A 1.0001 1.0001 0 1 0 20 3 L 15 3 L 14.570312 2.5703125 C 14.205312 2.2043125 13.710359 2 13.193359 2 L 10.806641 2 z M 4.3652344 7 L 5.8925781 20.263672 C 6.0245781 21.253672 6.877 22 7.875 22 L 16.123047 22 C 17.121047 22 17.974422 21.254859 18.107422 20.255859 L 19.634766 7 L 4.3652344 7 z"></path></svg>`;
            deleteBtn.onclick = () => {
                students = students.filter(s => s.id !== student.id);
                updateTable();
            }
            cellActions.append(deleteBtn);

            row.append(cellActions);
            tbody.append(row);
        });
    };

