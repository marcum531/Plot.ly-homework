function dataset(data) {
    d3.json(`/metadata/${sample}`).then(function(sampleData){
        console.log(sampleData);

        var panel = d3.select("#sample-metadata");

        panel.html("");

        Object.entries(sampleData).forEach(([key, value]) => {
            panel.append("h4").text('${key}, ${value}');
        })
    })
}

function buildCharts(data) {
    d3.json(`/samples/${sample}`).then(function(sampleData) {
        console.log(sampleData);

        const otu_ids = sampleData.otu_ids;
        const out_labels = sampleData.out_labels;
        const sample_values = sampleData.sample_values;

        var barData = [{
            x: sample_values,
            y: otu_ids,
            type: 'bar',
            text: otu_labels,
            marker: {
                color: 'rgb(142, 124, 195)'
            }
        }];

        var barLayout = {
            hovermode: 'closest',
            yaxis: {title: 'OTU ID', tickangle: -180},
            xaxis: {title: 'Sample Values'},
            bargap: 0.05
        };

        Plotly.newplot('myDiv', barData, barLayout);

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

    d3.json("/samples/${names}").then((sampleNames) => {
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

function  options(sampleNew) {
    buildCharts(sampleNew);
    dataset(sampleNew);
}

init();