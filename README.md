# JavasScript_Virtualization_Challenge
BellyButton Data Analysis

![bellybutton_bacteria_pic](https://github.com/davisdw/JavasScript_Virtualization_Challenge/assets/104311388/58d409f1-9f23-4db8-8c6c-ca7b7c359a52)


**FACTS ABOUT BELLY BUTTON: 

Sometimes, an expanding belly can turn a pregnant woman's innie into an outie.

Belly buttons usually start out as "outies," and most pop in to form "innies." Only 10% of people have outies.

A couple thousand people get belly button plastic surgery every year. And many of the 180,000 people who get tummy tucks per year have their navels touched up, too.

Belly button lint comes from our clothes. Men tend to have more because it gets caught in their belly hairs.

Researchers studied 60 people's belly buttons and found almost 2,400 different species of bacteria.


**Source: https://www.businessinsider.com/belly-button-science-2016-3#researchers-studied-60-peoples-belly-buttons-and-found-almost-2400-different-species-of-bacteria-9

Below is the completed BellyButton Chart 

![D7BC9682-B11D-45BA-AB58-27CF24182B3C](https://github.com/davisdw/JavasScript_Virtualization_Challenge/assets/104311388/f10bdfd8-12ed-4532-8ea7-92faade94b1d)

To access and interact with the Dashboard go to: https://davisdw.github.io/JavasScript_Virtualization_Challenge/

Source from where the data came from: https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json

Code was divided into six different functions: 

    createBarPlot(id); -->> to create each paitent's top 10 OTUs bar charts (operational taxonomic units**)
    createBubbleChart(id); -->> creates an bubble chart based on each OTU's bacteria classifications for each paitent's ID bellybutton
    createMetadataInfo(id); -->> uses the display the paitent's demographic information
    initiateDataGauge(id); -->> created an gauge to monitor the times that an belly button washed per each week (used Math function to calculate the ranges in each set 
    init(); -->> imports the paitent ID data initalize and runs the other above four functions to display the default Paitent's ID data (beginning with 940 at it's default)
    optionChanged(id) -->> function to allow to select another patient ID to display it's data according to the data 

    each of the function takes an "id" or rather test subject's ID for each certain functions

    

**NOTE: OTU used to analyse gene sequence data sets obtained through the use of modern sequencing technologies
