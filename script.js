let selectedCourse = 0;

function editCourse(e) {
    selectedCourse = e.target.parentElement.querySelector('.courseId').innerText;
    showEditModal();
}

async function getCourses(){
    const data = await fetch("https://vvri.pythonanywhere.com/api/courses");
    return data.json();
}

async function printCourses(){
    let courses = await getCourses();

    const courseList = document.querySelector("#courseList");
    let courseHtml = "";
    courses.forEach(element => {
        courseHtml += `
        <div class="course">
            <div class="courseName">${element.name}</div>
            <div class="courseId">${element.id}</div>
            <div>
                <button class="editBtn" onClick="editCourse(event)">Szerkesztés</button>
                <button class="deleteBtn" onClick="deleteCourse(this.parentElement.querySelector('.courseId').innerText)">Törlés</button>
            </div>
        </div>
        `
    });

    courseList.innerHTML = courseHtml;
}

printCourses();

async function deleteCourse(courseId){
    console.log("asd", courseId);
   try{
    await fetch(`https://vvri.pythonanywhere.com/api/courses/${courseId}`, {
        method: "DELETE"
    })
    .then(()=>{
        console.log("deleted course " + courseId);
        printCourses();
    })
   } catch(err) {
    console.error(err);
   }
}

const editFrom = document.querySelector("#editForm");

async function updateCourse(courseId){
    console.log("asd", courseId);
   try{
    await fetch(`https://vvri.pythonanywhere.com/api/courses/${courseId}`, {
        method: "PUT",
        body: JSON.stringify({
            name: editFrom.querySelector("#name").value
        }),
        headers: {
            "Content-Type": "application/json"
        }
    })
    .then(()=>{
        console.log("updated course " + courseId);
        printCourses();
    })
   } catch(err) {
    console.error(err);
   }
}