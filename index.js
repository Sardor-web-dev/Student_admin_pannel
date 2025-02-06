document.addEventListener("DOMContentLoaded", function () {
    let app = document.getElementById("app");

    // Создание контейнера
    let container = document.createElement("div");
    container.className = "container";
    app.appendChild(container);

    // Заголовок
    let title = document.createElement("h1");
    title.textContent = "Добавление, изменение и удаление элемента из таблицы";
    container.appendChild(title);

    // Форма ввода
    let formGroup = document.createElement("div");
    formGroup.className = "form-group";

    let inputName = document.createElement("input");
    inputName.placeholder = "Имя";
    formGroup.appendChild(inputName);

    let inputAge = document.createElement("input");
    inputAge.placeholder = "Возраст";
    inputAge.type = "number";
    formGroup.appendChild(inputAge);

    let addButton = document.createElement("button");
    addButton.textContent = "Добавить";
    formGroup.appendChild(addButton);

    container.appendChild(formGroup);

    // Создание таблицы
    let table = document.createElement("table");
    container.appendChild(table);

    let thead = document.createElement("thead");
    let headerRow = document.createElement("tr");
    let headers = ["No", "Имя студента", "Год рождения", "Действия"];
    
    headers.forEach(text => {
        let th = document.createElement("th");
        th.textContent = text;
        headerRow.appendChild(th);
    });

    thead.appendChild(headerRow);
    table.appendChild(thead);

    let tbody = document.createElement("tbody");
    table.appendChild(tbody);

    let students = [];
    let count = 1;

    // Функция добавления студента
    addButton.addEventListener("click", function () {
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
    });

    // Функция обновления таблицы
    function updateTable() {
        tbody.innerHTML = "";

        students.forEach((student, index) => {
            let row = document.createElement("tr");

            let cellNumber = document.createElement("td");
            cellNumber.textContent = index + 1;
            row.appendChild(cellNumber);

            let cellName = document.createElement("td");
            cellName.textContent = student.name;
            row.appendChild(cellName);

            let cellYear = document.createElement("td");
            cellYear.textContent = student.yearOfBirth;
            row.appendChild(cellYear);

            let cellActions = document.createElement("td");
            cellActions.className = "actions";

            let editButton = document.createElement("button");
            editButton.className = "edit-btn";
            editButton.textContent = "✏️";
            editButton.addEventListener("click", function () {
                let newName = prompt("Введите новое имя:", student.name);
                let newAge = prompt("Введите новый возраст:", new Date().getFullYear() - student.yearOfBirth);

                if (newName && newAge) {
                    student.name = newName;
                    student.yearOfBirth = new Date().getFullYear() - parseInt(newAge);
                    updateTable();
                }
            });
            cellActions.appendChild(editButton);

            let deleteButton = document.createElement("button");
            deleteButton.className = "delete-btn";
            deleteButton.textContent = "🗑️";
            deleteButton.addEventListener("click", function () {
                students = students.filter(s => s.id !== student.id);
                updateTable();
            });
            cellActions.appendChild(deleteButton);

            row.appendChild(cellActions);
            tbody.appendChild(row);
        });
    }
});
