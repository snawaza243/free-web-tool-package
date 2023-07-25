function addSemesterFields() {
	const semester = document.getElementById("semester").value;
	const semesterFields = document.getElementById("semester-fields");
	while (semesterFields.childElementCount > 1) {
		semesterFields.removeChild(semesterFields.lastChild);
	}
	for (let i = 2; i <= semester; i++) {
		const div = document.createElement("div");
		div.classList.add("semester-field");
		div.innerHTML = `<label for="cgpa${i}">CGPA for Semester ${i}:</label>
						 <input type="number" class="cgpa" id="cgpa${i}" min="0" max="10" step="0.01" value="0" onchange="calculateCGPA()">
						 <button class="add-btn" onclick="addSemester()">+</button>`;
		semesterFields.appendChild(div);
	}
	calculateCGPA();
}

function addSemester() {
	const semesterFields = document.getElementById("semester-fields");
	const div = document.createElement("div");
	div.classList.add("semester-field");
	div.innerHTML = `<label for="cgpa${semesterFields.childElementCount + 1}">CGPA for Semester ${semesterFields.childElementCount + 1}:</label>
					 <input type="number" class="cgpa" id="cgpa${semesterFields.childElementCount + 1}" min="0" max="10" step="0.01" value="0" onchange="calculateCGPA()">
					 <button class="add-btn" onclick="addSemester()">+</button>`;
	semesterFields.appendChild(div);
}

function calculateCGPA() {
	const baseCGPA = parseFloat(document.getElementById("base-cgpa").value);
	const cgpaInputs = document.getElementsByClassName("cgpa");
	let sum = 0;
	for (let i = 0; i < cgpaInputs.length; i++) {
		sum += parseFloat(cgpaInputs[i].value);
	}
	const cgpa = sum / cgpaInputs.length;
	document.getElementById("cgpa").value = cgpa.toFixed(2);
	document.getElementById("percentage").value = ((cgpa * baseCGPA * 10).toFixed(2)/10);
}

addSemesterFields();