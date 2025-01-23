let selectedStudent = 0;

function editStudent(e) {
  selectedStudent =
    e.target.parentElement.parentElement.querySelector(".studentId").innerText;
  console.log(selectedStudent);
  showEditModal();
}

function showEditModal() {
  document.querySelector("#editModal").style.display = "flex";
}
function showAddModal() {
  document.querySelector("#addModal").style.display = "flex";
}

async function getStudents() {
  const data = await fetch("https://vvri.pythonanywhere.com/api/students");
  return data.json();
}

async function printStudents() {
  let students = await getStudents();

  const studentList = document.querySelector("#studentList");
  let studentHtml = "";
  students.forEach((element) => {
    studentHtml += `
        <div class="student">
            <div class="studentName">${element.name}</div>
            <div class="studentId">${element.id}</div>
            <div>
                <button class="editBtn" onClick="editStudent(event)">Szerkesztés</button>
                <button class="deleteBtn" onClick="deleteStudent(this.parentElement.parentElement.querySelector('.studentId').innerText)">Törlés</button>
            </div>
        </div>`;
  });

  studentList.innerHTML = studentHtml;
}

printStudents();

async function deleteStudent(studentId) {
  console.log("asd", studentId);
  try {
    await fetch(`https://vvri.pythonanywhere.com/api/students/${studentId}`, {
      method: "DELETE",
    }).then(() => {
      console.log("deleted student " + studentId);
      printStudents();
    });
  } catch (err) {
    console.error(err);
  }
}

const editFrom = document.querySelector("#editForm");
const addForm = document.querySelector("#addForm");

async function updateStudent(event) {
  console.log("asd", selectedStudent);
  event.preventDefault();
  try {
    await fetch(
      `https://vvri.pythonanywhere.com/api/students/${selectedStudent}`,
      {
        method: "PUT",
        body: JSON.stringify({
          name: editFrom["name"].value,
          course_id: 0
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    ).then(() => {
      console.log("updated student " + selectedStudent);
      printStudents();
    });
  } catch (err) {
    console.error(err);
  }
}

async function addStudent(event) {
  event.preventDefault();
  try {
    await fetch(`https://vvri.pythonanywhere.com/api/students`, {
      method: "POST",
      body: JSON.stringify({
        name: addForm["name"].value,
        course_id: 0
      }),
      headers: {
        "Content-Type": "application/json",
      },
    }).then(() => {
      console.log("added student");
      printStudents();
    });
  } catch (err) {
    console.error(err);
  }
}
