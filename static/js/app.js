// PLACED HERE UNTIL COMPLETE BONUS: (ADD THIS IN index.html) <script src="./static/js/bonus.js"></script>
//Use the D3 library to read in samples.json from the 
//URL https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json

createPlot(); //Executes and Displays the Plots

function createPlot() { 
    //First thing need is to read the sample data json file and validate 
    //by displaying the samples json data
    d3.json("samples.json").then(readSampleData =>  { 
        console.log(readSampleData)
     
    //Next gathered requirement data: otu_ids, sample_values and otu_labels
     //sort and slice data for top 10 OTU Data
    let sampleValues = readSampleData.samples[0].sample_values.slice(0, 10).reverse();
    console.log(sampleValues);

    let otuLabels = readSampleData.samples[0].otu_labels.slice(0, 10).reverse();
    console.log(otuLabels);

    let sortOtuIds = readSampleData.samples[0].otu_ids.slice(0, 10).reverse();
    console.log(sortOtuIds);

    //Map the OTU IDs by creating the OTU Labeling  
    let otuIdsLabels = sortOtuIds.map(d => "OTU " + d);
    console.log(otuIdsLabels);

    //plotting the values in a bar chart 
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


