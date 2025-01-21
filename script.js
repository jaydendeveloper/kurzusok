let selectedCourse = 0;

function editCourse(e) {
  selectedCourse =
    e.target.parentElement.parentElement.querySelector(".courseId").innerText;
  console.log(selectedCourse);
  showEditModal();
}

function showEditModal() {
  document.querySelector("#editModal").style.display = "flex";
}
function showAddModal() {
  document.querySelector("#addModal").style.display = "flex";
}

async function getCourses() {
  const data = await fetch("https://vvri.pythonanywhere.com/api/courses");
  return data.json();
}

async function printCourses() {
  let courses = await getCourses();

  const courseList = document.querySelector("#courseList");
  let courseHtml = "";
  courses.forEach((element) => {
    courseHtml += `
        <div class="course">
            <div class="courseName">${element.name}</div>
            <div class="courseId">${element.id}</div>
            <div>
                <button class="editBtn" onClick="editCourse(event)">Szerkesztés</button>
                <button class="deleteBtn" onClick="deleteCourse(this.parentElement.parentElement.querySelector('.courseId').innerText)">Törlés</button>
            </div>
        </div>`;
  });

  courseList.innerHTML = courseHtml;
}

printCourses();

async function deleteCourse(courseId) {
  console.log("asd", courseId);
  try {
    await fetch(`https://vvri.pythonanywhere.com/api/courses/${courseId}`, {
      method: "DELETE",
    }).then(() => {
      console.log("deleted course " + courseId);
      printCourses();
    });
  } catch (err) {
    console.error(err);
  }
}

const editFrom = document.querySelector("#editForm");
const addForm = document.querySelector("#addForm");

async function updateCourse(event) {
  console.log("asd", selectedCourse);
  event.preventDefault();
  try {
    await fetch(
      `https://vvri.pythonanywhere.com/api/courses/${selectedCourse}`,
      {
        method: "PATCH",
        body: JSON.stringify({
          name: editFrom["name"].value,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    ).then(() => {
      console.log("updated course " + selectedCourse);
      printCourses();
    });
  } catch (err) {
    console.error(err);
  }
}

async function addCourse(event) {
  event.preventDefault();
  try {
    await fetch(`https://vvri.pythonanywhere.com/api/courses`, {
      method: "POST",
      body: JSON.stringify({
        name: addForm["name"].value,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    }).then(() => {
      console.log("added course");
      printCourses();
    });
  } catch (err) {
    console.error(err);
  }
}
