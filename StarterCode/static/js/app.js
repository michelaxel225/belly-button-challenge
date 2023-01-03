//Use the D3 library to read in samples.json from the URL
const url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json";


  
// Create a horizontal bar chart with a dropdown menu to display the top 10 OTUs found in that individual.
function Barchart(id){
  d3.json(url).then(function(data) {
    for (let i = 0; i<data["samples"].length; i++){
      if(data["samples"][i]["id"] == id) {
        let bar_data = data["samples"][i];
        let chart = {
          x: bar_data["sample_values"].slice(0,10).reverse(),
          y: bar_data["otu_ids"].slice(0,10).map(i => `OTU ${i}`).reverse(),
          
          text: String(bar_data["otu_labels"].slice(0,10).reverse()),
          type: "bar",
          orientation: "h",
        };

        let bar_trace = [chart];
        let bar_layout = {
            title: "Top 10 OTU's",
            xaxis: {title: 'Sample Values'}
                };
        Plotly.newPlot('bar',bar_trace, bar_layout);
      }
    }
  });
}




// Create a bubble chart that displays each sample.

function Bubblechart(id){
  d3.json(url).then(function(data) {
    for (let i = 0; i<data["samples"].length; i++){
      if(data["samples"][i]["id"] == id) {
        let bubble_data = data["samples"][i];
        console.log(bubble_data["otu_ids"]);
        console.log(bubble_data.otu_ids);
        let bubble = {
          x: (bubble_data["otu_ids"]),
          y: bubble_data["sample_values"],
          text: bubble_data["otu_labels"],
          mode:"markers",
          marker:{
            color: bubble_data["otu_ids"],
            size: bubble_data["sample_values"]
          }
        };

        let bubble_trace = [bubble];
        let bubble_layout = {
            title: 'Belly Button Samples by OTU ID',
            xaxis: {title: 'OTU ID'},
            yaxis: {title: 'Sample Values'}
    
        };
        Plotly.newPlot('bubble', bubble_trace, bubble_layout);
      }
    }
  });
}
//Display the sample metadata, i.e., an individual's demographic information.
//Display each key-value pair from the metadata JSON object somewhere on the page.
function demographic_info(id){
    d3.json(url).then(function(data) {
      
      for (let i = 0; i < data["metadata"].length; i++){
        if(data["metadata"][i]["id"] == id){
          let metadata = data["metadata"][i];
          let demographic_data = d3.select('#sample-metadata');
          demographic_data.html("");
        
          Object.entries(metadata).forEach(function([key, value]){
            row = demographic_data.append("p");
            row.text(`${key}:${value}`);
          });
        }
      }
    });
  }
 
d3.json(url).then(function(data) {
    demographic_info("940");
    Barchart("940");
    Bubblechart("940");

 let dropdown = d3.select('#selDataset');

 
   
    for (let i = 0; i < data["names"].length; i++){
      
      let selector = dropdown.append("option").property("value", data.names[i]);
      selector.text(`${data.names[i]}`);
    }
  });
 
//Update all the plots when a new sample is selected. Additionally, you are welcome to create any layout that you would like for your dashboard. An example dashboard is shown as follows:
function optionChanged(id){
   
Barchart(id);
demographic_info(id)
  Bubblechart(id)
}





init();