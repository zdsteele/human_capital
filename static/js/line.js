document.addEventListener('DOMContentLoaded', function () {
    // Use d3.json to fetch the data
    d3.json("/data").then(function(data) {
      // Step 2: Extract the year from the "DateofTermination" field
      var terminationYears = data
        .filter(employee => employee.DateofTermination !== null)
        .map(employee => new Date(employee.DateofTermination).getFullYear());
  
      // Step 3: Count terminations per year
      var terminationCounts = {};
      terminationYears.forEach(year => {
        terminationCounts[year] = (terminationCounts[year] || 0) + 1;
      });
  
      // Step 4: Prepare data for Plotly
      var xData = Object.keys(terminationCounts);
      var yData = Object.values(terminationCounts);
  
      // Step 5: Create a line plot using Plotly
      var data = [{
        x: xData,
        y: yData,
        type: 'line'
      }];
  
      var layout = {
        plot_bgcolor: '#222', // Set plot background color to match body background color
        paper_bgcolor: '#222', // Set paper background color to match body background color
        font: {
          color: '#fff' // Set font color to match body font color
        },
        yaxis: {
          range: [0, 200] // Set the range of the y-axis
        },
        title: 'Employee Depatures Per Year',
      };
  
      Plotly.newPlot('line', data, layout);
    });
  });