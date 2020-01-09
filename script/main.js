window.onload = () => {
  axios.get("http://localhost:3000/projects")
    .then(response => {
      let project = response.data;
      rederTask(project);
      renderStatistic(project);
    });
};

let rederTask = (project) => {
  project.forEach(item => {
    document.getElementById("main-table").innerHTML += 
      `<tr>
        <td class="body-cell">${item.name}</td>
        <td class="body-cell">
          <p class="project-detail">${item.description}</p>
        </td>
        <td class="body-cell">${item.endTime}</td>
        <td class="body-cell ${item.status === "ACTIVE" ? "status-active" : (item.status === "PENDING" ? "status-pending" : "status-close")}">${item.status}</td>
        <td class="body-cell"><button class="delete">删除</button></td>
      </tr>`;
  });
};

let renderStatistic = (project) => {
  let sum = project.length;
  let countResult = count(project);
  document.getElementById("sum").innerHTML = sum;
  document.getElementById("pending-number").innerHTML = countResult.PENDING;
  document.getElementById("active-number").innerHTML = countResult.ACTIVE;
  document.getElementById("close-number").innerHTML = countResult.CLOSED;
  document.getElementById("pending-percent").innerHTML = `${countResult.PENDING/sum * 100}%`;
  document.getElementById("active-percent").innerHTML = `${countResult.ACTIVE/sum * 100}%`;
  document.getElementById("close-percent").innerHTML = `${countResult.CLOSED/sum * 100}%`;
};

let count = (project) => {
  let result = {};
  project.forEach(item => {
    result[item.status] ? result[item.status]++ : result[item.status] = 1;
  });
  return result;
};