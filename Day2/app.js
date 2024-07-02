// app.js
// const readCSVFile = () => {
//   const fileInput = document.getElementById("file");
//   const limitInput = document.getElementById("limit");
//   const offsetInput = document.getElementById("offset");
//   const searchInput = document.getElementById("search");

//   const file = fileInput.files[0];
//   const limit = parseInt(limitInput.value, 10) || 8807;
//   const offset = parseInt(offsetInput.value, 10) || 1;
//   const search = searchInput.value.trim().toLowerCase() || "";

//   const formData = new FormData();
//   formData.append("file", file);
//   formData.append("limit", limit);
//   formData.append("offset", offset);
//   formData.append("search", search);

//   fetch("/read-csv", {
//     method: "POST",
//     body: formData,
//   })
//     .then((response) => response.json())
//     .then((data) => {
//       const csvdata = data.csvdata;
//       const rows = csvdata.split("\n");
//       const tbodyEl = document
//         .getElementById("tblcsvdata")
//         .getElementsByTagName("tbody")[0];
//       tbodyEl.innerHTML = "";

//       let rowCount = 0;
//       for (let row = offset; row < rows.length && rowCount < limit; row++) {
//         let rowCols = [];
//         let col = "";
//         let inQuotes = false;

//         for (let i = 0; i < rows[row].length; i++) {
//           let char = rows[row][i];

//           if (char === '"') {
//             inQuotes = !inQuotes;
//           } else if (char === "," && !inQuotes) {
//             rowCols.push(col);
//             col = "";
//           } else {
//             col += char;
//           }
//         }

//         rowCols.push(col);

//         if (search && rowCols[2].toLowerCase().indexOf(search) === -1) {
//           continue;
//         }

//         let newRow = tbodyEl.insertRow();

//         for (let colIndex = 0; colIndex < rowCols.length; colIndex++) {
//           let newCell = newRow.insertCell();
//           newCell.innerHTML = rowCols[colIndex];
//         }

//         rowCount++;
//       }

//       const endTime = performance.now();
//       const executionTimeMs = endTime - startTime;
//       const executionTimeSec = executionTimeMs / 1000;
//       document.getElementById(
//         "execution-time"
//       ).innerHTML = `Execution time: ${executionTimeSec.toFixed(2)} seconds`;
//       document.getElementById(
//         "record-count"
//       ).innerHTML = `Number of records found: ${rowCount}`;
//     })
//     .catch((error) => {
//       console.error(error);
//     });
// };

// -----------------CLIENT SIDE------------------ //

function readCSVFile() {
  var startTime = performance.now();

  var files = document.querySelector('#file').files;

  if (files.length > 0) {
    var file = files[0];
    var reader = new FileReader();
    reader.readAsText(file);

    reader.onload = function(event) {
      var csvdata = event.target.result;
      var rows = csvdata.split('\n');
      var tbodyEl = document.getElementById('tblcsvdata').getElementsByTagName('tbody')[0];
      tbodyEl.innerHTML = "";

      var limitInput = document.getElementById('limit');
      var offsetInput = document.getElementById('offset');
      var searchInput = document.getElementById('search');

      var limit = parseInt(limitInput.value, 10) || 8807; // default limit
      var offset = parseInt(offsetInput.value, 10) || 1; // default offset
      var search = searchInput.value.trim().toLowerCase() || ''; // default search

      var rowCount = 0;
      for (var row = offset; row < rows.length && rowCount < limit; row++) {
        var rowCols = [];
        var col = '';
        var inQuotes = false;

        for (var i = 0; i < rows[row].length; i++) {
          var char = rows[row][i];

          if (char === '"') {
            inQuotes =!inQuotes;
          } else if (char === ',' &&!inQuotes) {
            rowCols.push(col);
            col = '';
          } else {
            col += char;
          }
        }

        rowCols.push(col);

        if (search && rowCols[2].toLowerCase().indexOf(search) === -1) {
          continue;
        }

        var newRow = tbodyEl.insertRow();

        for (var colIndex = 0; colIndex < rowCols.length; colIndex++) {
          var newCell = newRow.insertCell();
          newCell.innerHTML = rowCols[colIndex];
        }

        rowCount++;
      }

      var endTime = performance.now();
      var executionTimeMs = endTime - startTime;
      var executionTimeSec = executionTimeMs / 1000;
      document.getElementById('execution-time').innerHTML = `Execution time: ${executionTimeSec.toFixed(2)} seconds`;
      document.getElementById('record-count').innerHTML = `Number of records found: ${rowCount}`;
    };
  } else {
    alert("Please select a file.");
  }
}
