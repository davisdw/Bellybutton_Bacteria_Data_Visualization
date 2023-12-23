// PLACED HERE UNTIL COMPLETE BONUS: (ADD THIS IN index.html) <script src="./static/js/bonus.js"></script>
// Use the D3 library to read in samples.json from the 
// URL https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json

/**
 *  First thing need is to read the sample data json file and validate 
    by displaying the samples json data
    Then Plot the Charts specified by requirements 
    Test and Display the Charts
    Create Dropdown and display each of the paitent's Demographic Info Data
**/

//initalizes the data to display the results
function init() { 
    //create the variable to store the drop down
    let dropDownMenu = d3.select('#selDataset');
    
    //reads the data and test to confirm the data 
    d3.json("samples.json").then((readSampleData) => {
        console.log(readSampleData);
        //
        readSampleData.names.forEach(function(name) {
            dropDownMenu.append("option").text(name).property("value");
        });
        createBarPlot(readSampleData.names[0]);
        createBubbleChart(readSampleData.names[0]);
        //dropDownOption(readSampleData.names[0]); 
        createMetadataInfo(readSampleData.names[0]);
    });
}
// function to handle the event change each time an new ID is selected, which will also reflect the rest of the data
function optionChanged(id) {
    createBarPlot(id);
    createBubbleChart(id);
    //dropDownOption(id); 
    createMetadataInfo(id);
}

init(); //runs data

//Plots and Displays the Bar Charts
function createBarPlot(id) { 

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

//Plots and Displays the Bubble Charts
function createBubbleChart(id) {

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

// displays metadata of each paitent's demographic information 
function createMetadataInfo(idName) {

    let dropDownMenu = d3.select('#selDataset');
    d3.json("samples.json").then((readSampleData) =>  { 

        let metaData = readSampleData.metadata;
        let displayMetaData = metaData.filter(info => info.id == idName)
        let result = displayMetaData[0];
        let panel = d3.select("#sample-metadata");
        panel.html("");
        Object.entries(result).forEach(([key, value]) => {
        panel.append("h6").text(`${key}: ${value}`);
        });
    });      
};

/********
 * function dropDownOption(id) {

    d3.json("samples.json").then((readMetaData) => {

        let metaData = readMetaData.metadata;
        //console.log(metaData); 
       
        //filters the data by id and compares the ID being selected to match
        let demoResult = metaData.filter(meta => meta.id.toString() === id)[0];
        //location where the Demographic Info Box is located in HTML
        let demographicInfoBox = d3.select("sample-metadata");
        //Clears the demographic data each time before selecting new ID
        demographicInfoBox.html("");
        //Grabs the Demographic Data with associated ID and appends it to box panel
        Object.entries(demoResult).forEach((key) => {
            demographicInfoBox.append("h5").text(key[0].toUpperCase() + ": " + key[1] + "\n");

        });
    });
    
}
 ********/



   






