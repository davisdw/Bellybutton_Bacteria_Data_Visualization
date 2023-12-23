// PLACED HERE UNTIL COMPLETE BONUS: (ADD THIS IN index.html) <script src="./static/js/bonus.js"></script>
// Use the D3 library to read in samples.json from the 
// URL https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json


createBarPlot(); //Plots and Displays the Bar Charts
createBubbleChart(); //Plots and Displays the Bubble Charts
createDropdownOption(); //display list of paitent names (in IDs) in dropdown box
getDemographicDataInfo(); // displays metadata of each paitent's demographic information 

//importing the sample.json data file to verify data validity
d3.json("samples.json").then(readSampleData => {
    console.log(readSampleData);
});

/**
 *  First thing need is to read the sample data json file and validate 
    by displaying the samples json data
    Then Plot the Charts specified by requirements 
    Test and Display the Charts
 */
  
function createBarPlot() { 
//plotting the values in a bar chart 

    d3.json("samples.json").then(readSampleData =>  { 
    //console.log(readSampleData)
 
    //sort and slice data for top 10 OTU Data for sample_values, otu_labels and otu_ids
    let sampleValues = readSampleData.samples[0].sample_values.slice(0, 10).reverse();
    let otuLabels = readSampleData.samples[0].otu_labels.slice(0, 10).reverse();
    let sortOtuIds = readSampleData.samples[0].otu_ids.slice(0, 10).reverse();
    
    //  Map the OTU IDs by creating the OTU Labeling  
    let otuIdsLabels = sortOtuIds.map(d => "OTU " + d);
    //console.log(otuIdsLabels);

        let data = [{
            x: sampleValues, 
            y: otuIdsLabels, 
            text: otuLabels,  
            marker: {
                color: "orangered"
            },
           type: "bar",
           orientation: "h"
        }]
        //setup the layout bar chart format
        let pltLayout = {
           title: "Top 10 of OTUs",
           xaxis: {title: "Sample Values"},
           yaxis: {title: "OTU IDs"},
           margin: {
                l: 100,
                r: 100,
                t: 100,
                b: 100
            }
        };
    
        Plotly.newPlot("bar", data, pltLayout);

    });

};

function createBubbleChart() {

    d3.json("samples.json").then(readSampleData =>  { 
        //console.log(readSampleData)
         
        //sort and slice data for top 10 OTU Data for sample_values, otu_labels and otu_ids
        let sampleValues = readSampleData.samples[0].sample_values.slice(0, 10).reverse();
        let otuLabels = readSampleData.samples[0].otu_labels.slice(0, 10).reverse();
        let sortOtuIds = readSampleData.samples[0].otu_ids.slice(0, 10).reverse();
        
        //  Map the OTU IDs by creating the OTU Labeling  
        let otuIdsLabels = sortOtuIds.map(d => "OTU " + d);
        //console.log(otuIdsLabels);
        
            //Ceating an bubble chart to display each sample data 
            // Makered color coded the OTU IDs by the sample data
            let data2 = [{
                x: readSampleData.samples[0].otu_ids,
                y: readSampleData.samples[0].sample_values,
                mode: "markers",
                marker: {
                    color: readSampleData.samples[0].otu_ids,
                    size: readSampleData.samples[0].sample_values,
                }
            }];
            //Bubble Plot Layout
            let pltLayout2 = {
                title: "Total OTU Count IDs",
                xaxis: {title: "OTU IDs"},
                yaxis: {title: "Sample Data for Each OTU IDs"},
                height: 600,
                width: 1000
            };
        //Creates the Plots
        Plotly.newPlot("bubble", data2, pltLayout2);

    });
        
}

/***
 * Creating an dropdown menu to select the "names" from the samples data
 * each name denoted as "id" will display the metadata information in 
 * Demographic Info Box 
 * Changing ID will display different metadata
 * ***/

//retrive demographic metadata information and displays in box chart
function getDemographicDataInfo() {

    d3.json("samples.json").then((readMetaData) => {

        let metaData = readMetaData.metadata;
        //console.log(metaData); 


    });
    
}

function createDropdownOption() {

    let dropDownMenu = d3.select('selDataset')
    d3.json("samples.json").then((readSampleData) =>  { 

        //Loop through each name and append the name associated with value
        //readSampleData.names.forEach(function (sample) {
            //dropDownMenu.append('option').text(sample).property("value")    
       // });

    });

};


    //Creating an Dropdown menu to display each demographic data samples
        //let metadataDropdown = document.getElementById('selDataset');
        //let metadataDefaultOpt = document.getElementById('option');
        //let options = readSampleData.names

        //for(i = 0; i < options.length; i++) {
          //let option = document.getElementById('option');
              //option.text = options[i];
             // option.value = options[i];
           // metadataDropdown.add(option);
       // };

        //let metadata = readSampleData.metadata;
       // console.log(metadata)






