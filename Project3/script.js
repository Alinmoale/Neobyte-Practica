function search() {
  const offset = document.getElementById('offset-input').value;
  const limit = document.getElementById('limit-input').value;
  fetch(`index.php?offset=${offset}&limit=${limit}`)
    .then(response => response.json())
    .then(data => {
      const tableBody = document.getElementById('table-body');
      tableBody.innerHTML = '';
      data.forEach(item => {
        const row = document.createElement('tr');
        row.innerHTML = `
          <td>${item.id}</td>
          <td>${item.title}</td>
          <td>${item.category}</td>
        `;
        tableBody.appendChild(row);
      });
    })
    .catch(error => console.error('Error:', error));
}