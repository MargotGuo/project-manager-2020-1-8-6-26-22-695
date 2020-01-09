window.onload = () => {
  axios.get("http://localhost:3000/projects").then(response => {
    renderStatistic(response.data);
    rederProject(response.data);
  });
};

let rederProject = (project) => {
  project.forEach(item => {
    document.getElementById("tbody").innerHTML += 
      `<tr id=${item.id}>
        <td class="body-cell">${item.name}</td>
        <td class="body-cell"><p class="project-detail">${item.description}</p></td>
        <td class="body-cell">${item.endTime}</td>
        <td class="body-cell status-${item.status.toLowerCase()}">${item.status}</td>
        <td class="body-cell"><button class="delete" onclick="deleteProject(${item.id})">删除</button></td>
      </tr>`;
  });
};

let renderStatistic = (project) => {
  let countResult = count(project);
  let sum = project.length;
  document.getElementById("sum").innerHTML = sum;
  ["PENDING", "ACTIVE", "CLOSED"].forEach(status => {
    let numberInfo = document.getElementById(`${status.toLowerCase()}-number`);
    let percentInfo = document.getElementById(`${status.toLowerCase()}-percent`);
    if (countResult[status]) {
      numberInfo.innerHTML = countResult[status];
      percentInfo.innerHTML = `${Math.round(countResult[status] / sum * 100)}%`;
    } else {
      numberInfo.innerHTML = "0";
      percentInfo.innerHTML = "0%";
    }
  });
};

let count = (project) => {
  let result = {};
  project.forEach(item => {
    result[item.status] ? result[item.status]++ : result[item.status] = 1;
  });
  return result;
};

let deleteProject = (id) => {
  let alert = document.getElementById("confirm-delete");
  alert.setAttribute("class", "activate-alert");
  document.getElementById("confirm").onclick = () => {
    document.getElementById(id).remove();
    axios.delete(`http://localhost:3000/projects/${id}`).then(() => {
      axios.get("http://localhost:3000/projects/").then(response => {
        renderStatistic(response.data);
      });
    });
    removeFilter();
  };
};

let removeFilter = () => {
  let alert = document.getElementById("confirm-delete");
  alert.removeAttribute("class");
};