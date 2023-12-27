// Use the D3 library to read in samples.json from the 
// URL https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json

//list of colors for the gauge
var arrColorsG = ["#5899DA", "#E8743B", "#19A979", "#ED4A7B", "#945ECF", "#13A4B4", "#525DF4", "#BF399E", "#6C8893", "white"];

init(); //runs data

// function to handle the event change each time an new ID is selected, which will also reflect the rest of the data
function optionChanged(id) {
    
    createBarPlot(id);
    createBubbleChart(id);
    createMetadataInfo(id);
    initiateDataGauge(id);
}

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
        createMetadataInfo(readSampleData.names[0]);
        initiateDataGauge(readSampleData.names[0]);
    });
}

//Plots and Displays the Bar Charts
function createBarPlot(id) { 
    d3.json("samples.json").then(readSampleData =>  { 
    //console.log(readSampleData)
    let sampleData = readSampleData.samples.filter(sampleObj => sampleObj.id === id);
        let results = sampleData[0];
    //sort and slice data for top 10 OTU Data for sample_values, otu_labels and otu_ids
    let sampleValues = results.sample_values.slice(0, 10).reverse();
    let otuLabels = results.otu_labels.slice(0, 10).reverse();
    let sortOtuIds = results.otu_ids.slice(0, 10).reverse();
    
    //  Map the OTU IDs by creating the OTU Labeling  
    let otuIdsLabels = sortOtuIds.map(d => "OTU " + d);
        
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
                b: 95
            }
        };
        Plotly.newPlot("bar", data, pltLayout);
    });
};

//Plots and Displays the Bubble Charts
function createBubbleChart(id) {
    d3.json("samples.json").then(readSampleData =>  { 
        let sampleData = readSampleData.samples.filter(sampleObj => sampleObj.id === id);
        let results = sampleData[0];
        //console.log(results);
        //sort and slice data for top 10 OTU Data for sample_values, otu_labels and otu_ids
        let sampleValues = results.sample_values;
        let otuIds = results.otu_ids;
        let otuLabels = results.otu_labels;
            //Ceating an bubble chart to display each sample data 
            // Makered color coded the OTU IDs by the sample data
            let data2 = [{
                x: otuIds,
                y: sampleValues,
                mode: "markers",
                marker: {
                    color: otuIds,
                    size:  sampleValues,
                },
                text: otuLabels

            }];
            //Bubble Plot Layout
            let pltLayout2 = {
                title: "Total OTU Count IDs",
                xaxis: {title: "OTU IDs"},
                yaxis: {title: "Sample Data for Each OTU IDs"},
                height: 600,
                width: 1200
            };
        //Creates the Plots
        Plotly.newPlot("bubble", data2, pltLayout2);

    });
        
}

/***
 * Creating an dropdown menu to select the "names" from the samples data
 * each name denoted as "id" will display the metadata information in 
 * Demographic Info Box 
 * ***/

// displays metadata of each paitent's demographic information 
function createMetadataInfo(idName) {
    d3.json("samples.json").then((readSampleData) =>  { 
        let metaData = readSampleData.metadata;
        let displayMetaData = metaData.filter(info => info.id == idName) 
        let result = displayMetaData[0];
        let panel = d3.select("#sample-metadata");
        panel.html("");
        Object.entries(result).forEach(([key, value]) => {
        panel.append("h5").text(`${key}: ${value}`);
        });
    });      
};

/***
 * BONUS CONTENT to create an gauge display 
 * to determine frequent number of belly button washes
 * requires modding the gauge meter for values 0 thru 9
 * And update the gauge when an new sample is selected from dropdown
 */


//function to retrive metadata for gauge chart
function initiateDataGauge (data) {
    //console.log("sample", data);

    d3.json("samples.json").then((GaugeData) => {
        let dataGauge = GaugeData.metadata;
        //console.log(dataGauge);
        let matchDataGauge = dataGauge.filter(sampleData => sampleData["id"] === parseInt(data));
            createGaugeDisplay(matchDataGauge[0])
    });
}

//create and display the gauge plot chart
function createGaugeDisplay(data) {
    //checks data wfreq (wash frequency)
    if (data.wfreq === null) {
        data.wfreq = 0;
    }
    //measures each degree of gauge
    let degree = data.wfreq * (180/10); 

    /**
     * Initiates and setup the Data Gauge (using Math PI, cos and sin )
     * Calculates the Tick Marker Position on the gauge
     */
    let degreeTick = 180 - degree;
    let radius = .5;
    let radiusDegree = degreeTick * Math.PI/180;
    let x = radius * Math.cos(radiusDegree);
    let y = radius * Math.sin(radiusDegree);

    let mainPath = 'M -.0 -0.025 L .0 0.025 L ',
        pathX = String(x),
        space = ' ',
        pathY = String(y),
        pathEnd = ' Z';
    let path = mainPath.concat(pathX, space, pathY, pathEnd);

    let trace = [{ 
        type: 'scatter',
        x: [0], y:[0],
        marker: {size: 50, color:'2F6497'},
        showlegend: false,
        name: 'WASH FREQ',
        text: data.wfreq,
        hoverinfo: 'text+name' },
        { 
        values: [1, 1, 1, 1, 1, 1, 1, 1, 1, 9],
        rotation: 90,
        text: ['8-9', '7-8', '6-7', '5-6', '4-5', '3-4', '2-3', '1-2', '0-1',''],
        textinfo: 'text',
        textposition:'inside',
        textfont:{size : 16},
        marker: {colors:[...arrColorsG]},
        labels: ['8-9', '7-8', '6-7', '5-6', '4-5', '3-4', '2-3', '2-1', '0-1',''],
        hoverinfo: 'text',
        hole: .5,
        type: 'pie',
        showlegend: false
    }];

    let layout = {
        shapes:[{
            type: 'path',
            path: path,
            fillcolor: '#2F6497',
            line: {
              color: '#2F6497'
            }
          }],
    
        title: '<b>Belly Button Washing Frequency</b> <br> <b>Scrub Per Week</b>',
        height: 550,
        width: 550,
        xaxis: {zeroline:false, showticklabels:false,
                   showgrid: false, range: [-1, 1]},
        yaxis: {zeroline:false, showticklabels:false,
                   showgrid: false, range: [-1, 1]},
      };
    
      Plotly.newPlot('gauge', trace, layout, {responsive: true});

}