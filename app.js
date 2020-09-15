function dataset(data) {
    d3.json("samples.json").then(function(sampleData){
        // console.log(sampleData);
        var metadata = sampleData.metadata;
        var resultArray = metadata.filter(sampleObj => sampleObj.id == data);
        var result = resultArray[0];
        var panel = d3.select("#sample-metadata");
        //console.log(sampleData);
        panel.html("");
        
        Object.entries(result).forEach(([key, value]) => {
            panel.append("h4").text(`${key.toUpperCase()}: ${value}`);
        });
    })
}

function buildCharts(data) {
    d3.json("samples.json").then((sampleData) =>{
        //console.log(sampleData);

        var samples = sampleData.samples;
        var resultArray = samples.filter(sampleObj => sampleObj.id ==data);
        var result = resultArray[0];
        dataset(result.id)
        console.log(result);
        var otu_ids = result.otu_ids;
        var otu_labels = result.otu_labels;
        var sample_values = result.sample_values;
        //console.log(otu_ids)

        var barData = [{
            y: otu_ids.slice(0,10).map(otuID => `OTU ${otuID}`).reverse(),
            x: sample_values.slice(0,10).reverse(),
            type: 'bar',
            text: otu_labels.slice(0,10).reverse(),
            orientation: "h",
            marker: {
                color: 'rgb(142, 124, 195)'
            }

        }];

        var barLayout = {
            hovermode: 'closest',
            yaxis: {title: 'OTU ID'},
            xaxis: {title: 'Sample Values'},
            bargap: 0.05
        };                          
        
        Plotly.newPlot('bar', barData, barLayout);

        var bubbleData = [{
            x: otu_ids,
            y: sample_values,
            text: otu_labels,
            mode: 'markers',
            marker: {
                colorscale: 'sunset',
                size: sample_values,
                color: otu_ids 
            }
        }];

        var bubbleLayout = {
            margin: {t: 0},
            hovermode: 'closest',
            xaxis: {title: 'OTU ID'}
        };

        Plotly.plot('bubble', bubbleData, bubbleLayout);

    });
}

function init() {
    var selector = d3.select("#selDataset");

    d3.json("samples.json").then((sampleNames) => {
        var sampleNames = sampleNames.names;
        sampleNames.forEach((sample) => {
            selector.append("option")
                .text(sample)
                .property("value", sample);
        });

    const sampleOne = sampleNames[0];
    buildCharts(sampleOne);
    dataset(sampleOne);

    });
}
d3.selectAll("#selDataset").on("change", optionChanged);

function optionChanged(sampleNew) {
    buildCharts(sampleNew);
}

init();
