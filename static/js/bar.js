document.addEventListener('DOMContentLoaded', function () {
    d3.json("/data").then(function(data) {
        console.log(data)
    })

    // Use d3.json to fetch the data
    d3.json("/data").then(function(data) {
        // Count the occurrences of each TermReason
        var counts = {};
        data.forEach(function(obj) {
          var termReason = obj.TermReason;
          if (termReason !== 'N/A - still employed' && termReason !== 'N/A - Has not started yet' && termReason !== 'null') {
            counts[termReason] = counts[termReason] ? counts[termReason] + 1 : 1;
          }
        });
  
        // Extract keys and values from counts
        var reasons = Object.keys(counts);
        var countValues = Object.values(counts);

         // Sort reasons and countValues in descending order based on countValues
      var sortedIndices = countValues.map(function(_, i) { return i; })
      .sort(function(a, b) { return countValues[b] - countValues[a]; });
    reasons = sortedIndices.map(function(i) { return reasons[i]; });
    countValues = sortedIndices.map(function(i) { return countValues[i]; });
  
      // Define dark purple color
      // var barColor = '#8B008B';

      function rgbToHex(rgb) {
        // Split the RGB values
        var rgbArray = rgb.match(/\d+/g);
      
        // Convert each RGB component to hexadecimal
        var r = parseInt(rgbArray[0], 10).toString(16).padStart(2, '0');
        var g = parseInt(rgbArray[1], 10).toString(16).padStart(2, '0');
        var b = parseInt(rgbArray[2], 10).toString(16).padStart(2, '0');
      
        // Combine the hexadecimal components
        var hex = '#' + r + g + b;
      
        return hex;
      }
      
      var rgbColor = 'rgb(178, 122, 243)';
      var hexColor = rgbToHex(rgbColor);

      var barColor = rgbToHex(rgbColor);

      // Create data array with customized colors
      var plotData = [{
        x: reasons,
        y: countValues,
        type: 'bar',
        marker: {
          color: barColor
        }
      }];

      // Set layout options
      var layout = {
        xaxis: {
          categoryorder: 'array',
          categoryarray: reasons  // Use the sorted reasons as the category order
        },
        yaxis: {
          title: 'Count'
        },
        title: 'Reasons for employee departure',
        margin: {
          t: 50  // Add top margin for the plot title
        },
        plot_bgcolor: '#222', // Set plot background color to match body background color
        paper_bgcolor: '#222', // Set paper background color to match body background color
        font: {
          color: '#fff' // Set font color to match body font color
        }
      };

      // Create plot
      Plotly.newPlot('bar', plotData, layout);
    });
});
