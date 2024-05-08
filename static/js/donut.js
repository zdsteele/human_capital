document.addEventListener('DOMContentLoaded', function () {

// Use d3.json to fetch the data for the table
d3.json("/data").then(function(data) {
    // Calculate the average pay rate for each unique department
    var departmentPay = d3.group(data, d => d.Department);
    var departmentAverages = Array.from(departmentPay, ([department, payRates]) => ({
      department: department,
      averagePay: d3.mean(payRates, d => d.PayRate)
    }));
  
    // Sort the departmentAverages array in descending order by average pay rate
    departmentAverages.sort(function(a, b) {
      return b.averagePay - a.averagePay;
    });
  
    // Take the top 3 departments by average pay rate
    var topDepartments = departmentAverages.slice(0, 3);
  
    // Extract the department names and average pay rates for the chart
    var labels = topDepartments.map(obj => obj.department);
    var values = topDepartments.map(obj => obj.averagePay);
  
  // Create the data trace for the donut chart
  var data = [{
    type: 'pie',
    labels: labels,
    values: values,
    hole: 0.5,
    marker: {
      colors: ['#6B3E99', '#1F77B4', '#FF6F91'] // Dark purple, dark blue, and dark pink colors
    }
  }];
  
  // Set the layout options for the donut chart
  var layout = {
    title: 'Top Departments by Average Pay',
    font: {
      color: '#fff' // Set font color to match body font color
    },
    showlegend: true, // Display the legend
    legend: {
      x: .75, // Adjust the x position of the legend
      y: 1  // Adjust the y position of the legend
    },
    plot_bgcolor: '#222',        // Set the plot background color to black
    paper_bgcolor: '#222'        // Set the paper background color to black
  };
  
  // Render the donut chart using Plotly.js
  Plotly.newPlot('donut', data, layout);
  

   
  });

    });
    