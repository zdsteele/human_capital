document.addEventListener('DOMContentLoaded', function() {
    // Use d3.json to fetch the data for the table
    d3.json("/data").then(function(data) {
      // Extract the relevant data from the JSON array
      var payData = data.map(function(obj) {
        return {
          date: obj.DateofHire,
          payRate: obj.PayRate,
          department: obj.Department
        };
      });
  
      // Group the data by department and calculate the sum of pay rates for each department
      var groupedData = Array.from(d3.group(payData, d => d.department), ([key, values]) => ({
        department: key,
        sumPayRate: d3.sum(values, d => parseFloat(d.payRate))
      }));
  
      // Sort the grouped data in descending order of pay sums
      groupedData.sort(function(a, b) {
        return b.sumPayRate - a.sumPayRate;
      });
  
      // Take the top 3 departments
      var topDepartments = groupedData.slice(0, 3).map(function(obj) {
        return obj.department;
      });
  
      // Create an empty array to store the traces
      var traces = [];
  
      // Define the colors for the traces
      var colors = ['#6B3E99', '#1F77B4', '#FF6F91'];
      
  
      // Iterate over the top 3 departments
      topDepartments.forEach(function(department, index) {
        // Filter the data for the current department
        var filteredData = payData.filter(function(obj) {
          return obj.department === department;
        });
  
        // Group the filtered data by year and calculate the sum of pay rates for each year
        var groupedDataByYear = Array.from(d3.group(filteredData, d => new Date(d.date).getFullYear()), ([key, values]) => ({
          year: key,
          sumPayRate: d3.sum(values, d => parseFloat(d.payRate))
        }));
  
        // Filter out objects with NaN years
        groupedDataByYear = groupedDataByYear.filter(function(obj) {
          return !isNaN(obj.year);
        });
  
        // Sort the grouped data by year (from lowest to largest)
        groupedDataByYear.sort(function(a, b) {
          return a.year - b.year;
        });
  
        // Extract the years and pay sums from the grouped data
        var years = groupedDataByYear.map(function(obj) {
          return obj.year;
        });
        var paySums = groupedDataByYear.map(function(obj) {
          return obj.sumPayRate;
        });
  
        // Sort the years and pay sums in ascending order of years
        var sortedIndices = years.map(function(_, index) {
          return index;
        }).sort(function(a, b) {
          return years[a] - years[b];
        });
  
        years = sortedIndices.map(function(index) {
          return years[index];
        });
        paySums = sortedIndices.map(function(index) {
          return paySums[index];
        });
  
        // Create a trace for the current department
        var trace = {
          x: years,
          y: paySums,
          type: 'scatter',
          name: department, // Set the name for the legend
          line: {
            color: colors[index] // Set the line color
          },
          fill: 'tonexty', // Fill the area between each line and the next line
          fillcolor: colors[index] + '50' // Set the fill color with reduced opacity (80 in RGBA)
        };
  
        // Add the trace to the array
        traces.push(trace);
      });
  
      // Set the layout options for the filled area graph
      var layout = {
        title: 'Pay Roll Cost by Department',
        xaxis: {
          title: 'Year'
        },
        yaxis: {
          title: 'Sum of Pay Rates',
          range: [0, 10000] 
        },
        plot_bgcolor: '#222', // Set plot background color to match body background color
        paper_bgcolor: '#222', // Set paper background color to match body background color
        font: {
          color: '#fff' // Set font color to match body font color
        },
        legend: {
            x: .75, // Adjust the x position of the legend
            y: .9  // Adjust the y position of the legend
          },
      };
  
      // Render the filled area graph using Plotly.js
      Plotly.newPlot('area_graph', traces, layout);
    });
  });