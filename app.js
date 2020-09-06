function dataset(data) {
    d3.json('Plot.ly-homework/samples.json').then(function(sampleData){
        console.log(sampleData);

        var panel = d3.select("#sample-metadata");

        panel.html("");

        Object.entries(sampleData).forEach(([key, value]) => {
            panel.append("h4").text('${key}, ${value}');
        })
    })
}

function buildCharts(data) {
    d3.json('Plot.ly-homework/samples.json').then(function(sampleData) {
        console.log(sampleData);

        const otu_ids = sampleData.otu_ids;
        const out_labels = sampleData.out_labels;
        const sample_values = sampleData.sample_values;

        var circleData = [{
            x: otu_ids,
            y: sample_values,
            text: out_labels,
            mode: 'markers',
            marker: {
                size: sample_values,
                color: otu_ids,
            }
        }];

        var circleLayout = {
            margin: {t: 0},
            hovermode: 'closest',
            xaxis: {title: 'OTU ID'}
        };

        Plotly.plot('bubble', circleData, circleLayout);
    })
}