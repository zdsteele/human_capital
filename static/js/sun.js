document.addEventListener('DOMContentLoaded', function() {
    // Use d3.json to fetch the data for the table
    d3.json("/data").then(function(data) {
      // Compute the sum of SpecialProjectsCount per department
      var departmentData = d3.rollups(data, v => d3.sum(v, d => d.SpecialProjectsCount), d => d.Department);
  
      // Sort the departmentData by the sum of SpecialProjectsCount in descending order
      departmentData.sort((a, b) => b[1] - a[1]);
  
      // Get the top 3 departments with the highest number of special projects
      var topDepartments = departmentData.slice(0, 5);
  
      // Create the bubble chart data array
      var bubbleData = topDepartments.map(function(department) {
        return {
          x: [department[0]], // Using department name on x-axis
          y: [department[1]], // Using number of special projects on y-axis
          text: [department[1]], // Displaying number of special projects on bubble popup
          mode: "markers",
          marker: {
            size: [Math.sqrt(department[1]) * .25], // Scaling down bubble size
            sizemode: "diameter",
            sizeref: 0.1,
            sizemin: 5,
            color: "#9467bd" // Bubble color
          }
        };
      });
  
      // Define the bubble chart layout
      var layout = {
        title: "Special Projects",
        showlegend: false,
        xaxis: {
          title: "Department",
          autorange: "reversed" // Reverse the x-axis
        },
        yaxis: {
          title: "Number of Special Projects"
        },
        plot_bgcolor: '#222', // Set plot background color to match body background color
        paper_bgcolor: '#222', // Set paper background color to match body background color
        font: {
          color: '#fff' // Set font color to match body font color
        }
      };
  
      // Create the bubble chart using Plotly.js
      Plotly.newPlot('bubble', bubbleData, layout);
    });
  });