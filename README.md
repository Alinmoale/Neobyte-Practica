CSV File Reader
This is a JavaScript function that reads a CSV file and displays its contents in a HTML table. The function also provides features to limit the number of records displayed, offset the starting record, and search for specific records by title.

How to Use
Select a CSV file using the file input field.
Optionally, set the limit, offset, and search criteria using the input fields.
Click the "Submit" button to read the CSV file and display its contents.
Functionality
The readCSVFile() function performs the following tasks:

Reads the selected CSV file using the FileReader API.
Parses the CSV data into an array of rows.
Applies the limit, offset, and search criteria to filter the records.
Displays the filtered records in a HTML table.
Calculates and displays the execution time and number of records found.
Configuration
The function uses the following default values:

Limit: 8807 records
Offset: 1 record
Search: empty string (no search criteria)
You can modify these default values by changing the input field values.

Technical Details
The function uses the following technologies:

JavaScript (ES5)
HTML5
CSS3 (for styling)
The function is designed to work in modern web browsers that support the FileReader API and HTML5 features.