document.addEventListener('DOMContentLoaded', function () {

  // Use d3.json to fetch the data for the table
  d3.json("/data").then(function(data) {
    // Get unique pay rates
    var uniquePayRates = [...new Set(data.map(obj => obj.PayRate))];

    // Sort the unique pay rates in descending order
    uniquePayRates.sort(function(a, b) {
      return b - a;
    });

    // Take the top 5 unique pay rates
    var topPayRates = uniquePayRates.slice(0, 10);

    // Create the table structure
    var table = d3.select('#table')
      .append('table');

    // Add a caption to the table
    table.append('caption')
      .text('Top Salaries')
      .style('caption-side', 'top')
      .style('text-align', 'center')
      .style('font-size', '20px');

    var thead = table.append('thead');
    var tbody = table.append('tbody');

    // Create the table header
    thead.append('tr')
      .selectAll('th')
      .data(['First Name', 'Last Name', 'Pay Rate', 'Position', 'Years Employed'])
      .enter()
      .append('th')
      .text(function(column) { return column; });

    // Create table rows for the top employees
    var rows = tbody.selectAll('tr')
      .data(topPayRates)
      .enter()
      .append('tr');

    // Add cells to the table rows
    rows.append('td')
      .text(function(payRate) {
        var employee = data.find(function(obj) {
          return obj.PayRate === payRate;
        });
        var fullName = employee.Employee_Name;
        var nameParts = fullName.split(', ');
        return nameParts[1];
      });

    rows.append('td')
      .text(function(payRate) {
        var employee = data.find(function(obj) {
          return obj.PayRate === payRate;
        });
        var fullName = employee.Employee_Name;
        var nameParts = fullName.split(', ');
        return nameParts[0];
      });

    rows.append('td')
      .text(function(payRate) {
        var employee = data.find(function(obj) {
          return obj.PayRate === payRate;
        });
        return '$' + employee.PayRate;
      })
      .style('color', '#9AFEFF');

    rows.append('td')
      .text(function(payRate) {
        var employee = data.find(function(obj) {
          return obj.PayRate === payRate;
        });
        return employee.Position;
      });

    rows.append('td')
      .text(function(payRate) {
        var employee = data.find(function(obj) {
          return obj.PayRate === payRate;
        });
        var dateOfHireParts = employee.DateofHire.split('-');
        var hireYear = parseInt(dateOfHireParts[2]) + 2000;
        var hireMonth = parseInt(dateOfHireParts[1]) - 1;
        var hireDay = parseInt(dateOfHireParts[0]);

        var dateOfHire = new Date(hireYear, hireMonth, hireDay);
        var currentDate = new Date();
        var yearsAtCompany = currentDate.getFullYear() - dateOfHire.getFullYear();

        return yearsAtCompany;
      })
      .style('text-align', 'center'); // Center the text in the "Years Employed" column
  });

});