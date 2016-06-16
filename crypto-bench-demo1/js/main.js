/*jshint esversion: 6, strict: global, undef: true, unused: true */
/* globals React, Promise, fetch, document, _, ReactDOM, Chart, console */

"use strict";

var globalData = {
    // A list of machine names
    machines: [],

    // Map from machine name to a map from date name
    // to benchmarks for that machine for that date.
    machineBenchmarks: {},

    attributePivot: 'library',
};

fetch('data/manifest.json')
    .then(checkStatus)
    .then(parseJSON)
    .then(function (json) { globalData.machines = json.machines; })
    .then(function() {
        var machineFetches = globalData.machines.map(function (machine) {
            return loadMachineBenchmarks(machine);
        });
        return Promise.all(machineFetches);
    })
    .then(presentSuccess)
    .catch(presentFailure);

function checkStatus(response) {
    if (response.ok) {
        return response;
    } else {
        var error = new Error(response.statusText);
        error.response = response;
        throw error;
    }
}

function parseJSON(response) {
    return response.json();
}

class MasterView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            machines: globalData.machines,
            machineBenchmarks: globalData.machineBenchmarks,
            mode: 'compareAttribute',
        };

        this.handleModeChange = this.handleModeChange.bind(this);
    }

    render() {
        var modeSelect = React.createElement('select', {
                value: this.state.mode,
                onChange: this.handleModeChange,
            },
            React.createElement('option', {
                value: 'compareAttribute',
                key: 'compareAttribute',
            }, "Compare Each " + globalData.attributePivot),
            React.createElement('option', {
                value: 'compareRuns',
                key: 'compareRuns',
            }, "Compare Two Runs")
        );

        var modeView;
        if (this.state.mode === 'compareAttribute') {
            modeView = React.createElement(AttributeMode, {
                machines: this.state.machines,
                machineBenchmarks: this.state.machineBenchmarks,
            });
        } else {
            modeView = React.createElement(RunMode, {
                machines: this.props.machines,
                machineBenchmarks: this.state.machineBenchmarks,
            });
        }
        return React.createElement('div', {}, 'Select a Mode: ',
            modeSelect, modeView
        );
    }

    handleModeChange(event) {
        this.setState({mode: event.target.value});
    }

    // TODO: handleDBUpdate
}

class AttributeMode extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            attribute: globalData.attributePivot,
            machine: "heitmann-laptop",
            file: "20160616-2.json",
        };
        this.handleMachineChange = this.handleMachineChange.bind(this);
        this.handleRunChange = this.handleRunChange.bind(this);
    }

    render() {
        return React.createElement('div', {},
            React.createElement(MachineSelect, {
                selected: this.state.machine,
                machines: this.props.machines,
                handleMachineChange: this.handleMachineChange,
            }),
            React.createElement(RunSelect, {
                selected: this.state.file,
                machineBenchmarks: this.props.machineBenchmarks[this.state.machine],
                handleRunChange: this.handleRunChange,
            }),
            React.createElement(AttributeGraphsByPrefix, {
                benchmarks: this.props.machineBenchmarks[this.state.machine][this.state.file].benchmarks,
                attributePivot: globalData.attributePivot
            })
        );
    }

    handleMachineChange(event) {
        this.setState({machine: event.target.value});
    }

    handleRunChange(event) {
        this.setState({file: event.target.value});
    }

}

class MachineSelect extends React.Component {
    render() {
        var options = this.props.machines.map(function (machine) {
            return React.createElement('option', {key: machine, value: machine}, machine);
        }.bind(this));
        return React.createElement('div', {},
            'Select a Machine: ',
            React.createElement('select', {
                onChange: this.props.handleMachineChange,
                value: this.props.selected
            }, options)
        );
    }
}

class RunSelect extends React.Component {
    render() {
        if (this.props.machineBenchmarks) {
            var runs = this.props.machineBenchmarks;
            var options = _.keys(runs).map(function (run) {
                return React.createElement('option', {key: run, value: run}, run);
            }.bind(this));
            return React.createElement('div', {},
                'Select a Run: ',
                React.createElement('select', {
                    onChange: this.props.handleRunChange,
                    value: this.props.selected
                }, options)
            );
        } else {
            return React.createElement('div', {},
                'Select a Run: ',
                React.createElement('select', {disabled: true},
                    React.createElement('option', {}, 'Loading...')
                )
            );
        }
    }
}

class AttributeSelect extends React.Component {

    render() {
        var label = 'Select a ' + globalData.attributePivot + ': ';
        if (this.props.benchmarks) {
            var values = this.getAttributeValues(this.props.benchmarks);
            var options = _.map(values, function (value) {
                return React.createElement('option', {key: value, value: value}, value);
            });
            return React.createElement('div', {},
                label,
                React.createElement('select', {
                    onChange: this.props.handleAttributeChange,
                    value: this.props.selected[globalData.attributePivot]
                }, options)
            );
        } else {
            return React.createElement('div', {},
                label,
                React.createElement('select', {disabled: true},
                    React.createElement('option', {}, 'Loading...')
                )
            );
        }
    }

    getAttributeValues(benchmarks) {
        return _.chain(benchmarks)
            .pluck('attributes')
            .pluck(globalData.attributePivot)
            .sort()
            .uniq(true)
            .value();
    }

}


class RunMode extends React.Component {

    constructor(props) {
        super(props);
        this.state = { runs: [] };
        this.handleMachineChangeFns = [];
        this.handleRunChangeFns = [];
        this.handleAttributeChangeFns = [];
        for (var i = 0; i < 2; i++) {
            this.state.runs[i] = { machine: "heitmann-laptop", file: "20160616-1.json", attributes: {library: "ring"}};
            this.handleMachineChangeFns[i] = this.handleMachineChange.bind(this, i);
            this.handleRunChangeFns[i] = this.handleRunChange.bind(this, i);
            this.handleAttributeChangeFns[i] = this.handleAttributeChange.bind(this, i);
        }
    }

    render() {
        var graphProps = { runs: [] };
        var elements = [];
        for (var i = 0; i < 2; i++) {
            graphProps.runs[i] = {
                benchmarks: this.props.machineBenchmarks[this.state.runs[i].machine][this.state.runs[i].file].benchmarks,
                attributePivot: this.state.runs[i].attributes,
            };
            elements.push( 
                React.createElement('div', {key: "run-select-" + i},
                    React.createElement(MachineSelect, {
                        selected: this.state.runs[i].machine,
                        machines: this.props.machines,
                        handleMachineChange: this.handleMachineChangeFns[i],
                    }),
                    React.createElement(RunSelect, {
                        selected: this.state.runs[i].file,
                        machineBenchmarks: this.props.machineBenchmarks[this.state.runs[i].machine],
                        handleRunChange: this.handleRunChangeFns[i],
                    }),
                    React.createElement(AttributeSelect, {
                        selected: this.state.runs[i].attributes,
                        benchmarks: this.props.machineBenchmarks[this.state.runs[i].machine][this.state.runs[i].file].benchmarks,
                        handleAttributeChange: this.handleAttributeChangeFns[i],
                    })
                )
            );
        }

        return React.createElement('div', {},
            elements,
            React.createElement(RunGraphsByPrefix, graphProps)
        );
    }

    handleMachineChange(pos, event) {
        var target = event.target.value;
        this.setState(function (previousState) {
            var runs = _.clone(previousState.runs);
            runs[pos] = _.clone(runs[pos]);
            runs[pos].machine = target;
            return {runs: runs};
        });
    }

    handleRunChange(pos, event) {
        var target = event.target.value;
        this.setState(function (previousState) {
            var runs = _.clone(previousState.runs);
            runs[pos] = _.clone(runs[pos]);
            runs[pos].file = target;
            return {runs: runs};
        });
    }

    handleAttributeChange(pos, event) {
        var target = event.target.value;
        this.setState(function (previousState) {
            var runs = _.clone(previousState.runs);
            runs[pos] = _.clone(runs[pos]);
            runs[pos].attributes = _.clone(runs[pos].attributes);
            runs[pos].attributes[globalData.attributePivot] = target;
            return {runs: runs};
        });
    }
}

class AttributeGraphsByPrefix extends React.Component {
    render() {
        var datasets = {};
        var benchmarks = this.props.benchmarks;
        var attributePivot = this.props.attributePivot;

        var attributeValues = _.chain(benchmarks)
            .pluck('attributes')
            .pluck(attributePivot)
            .sort()
            .uniq(true /* isSorted */)
            .value();

        attributeValues.forEach(function (attributeValue) {
            datasets[attributeValue] = _.chain(benchmarks)
                .filter(function (benchmark) {
                    return benchmark.attributes[attributePivot] == attributeValue;
                })
                .value();
        });

        return React.createElement(DatasetsGraphsByPrefix, {datasets: datasets});
    }
}

class RunGraphsByPrefix extends React.Component {
    render() {
        var datasets = {};

        for (var i = 0; i < this.props.runs.length; i++) {
            var run = this.props.runs[i];
            var attributePivot = run.attributePivot;
            datasets["Run " + (i + 1)] = _.chain(run.benchmarks)
                .filter(function (benchmark) {
                    return _.chain(attributePivot)
                        .pairs()
                        .every(function(pair) {
                            var attributeValue = benchmark.attributes[pair[0]];
                            return attributeValue && attributeValue === pair[1];
                        })
                        .value();
                })
                .value();
        }

        return React.createElement(DatasetsGraphsByPrefix, {datasets: datasets});
    }
}

class DatasetsGraphsByPrefix extends React.Component {
    render() {
        var prefixToDatasets = {};
        _.chain(this.props.datasets)
            .pairs()
            .each(function (entry) {
                var datasetName = entry[0];
                var datasetBenchmarks = entry[1];

                datasetBenchmarks.forEach(function (benchmark) {
                    var match = benchmark.name.match(/(.*?)::(.+)/);
                    var prefix = match[1];
                    var suffix = match[2];
                    if (!prefixToDatasets[prefix]) {
                        prefixToDatasets[prefix] = {};
                    }
                    if (!prefixToDatasets[prefix][datasetName]) {
                        prefixToDatasets[prefix][datasetName] = [];
                    }

                    var cloned = _.clone(benchmark); // Shallow, but that's fine since we're not mutating nested data
                    cloned.name = suffix;
                    prefixToDatasets[prefix][datasetName].push(cloned);
                });
            })
            .value();

        var elements = _.chain(prefixToDatasets)
            .keys()
            .sort()
            .map(function (prefix) {
                return React.createElement('div', {key: prefix},
                    React.createElement('h2', {}, prefix),
                    React.createElement(DatasetsGraph, {
                        datasets: prefixToDatasets[prefix]
                    })
                );
            }.bind(this))
            .value();

        return React.createElement('div', {}, elements);
    }
}

class DatasetsGraph extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        var numBenchmarks = _.keys(this.props.datasets).length * this.getBenchmarkNames().length;
        var height = 80 + (numBenchmarks* 20);
        return React.createElement('canvas', {
            ref: 'chart-canvas',
            height: height,
            width: '1000',
            style: {maxHeight: height + 'px'}
        });
    }

    getBenchmarkNames() {
        // Get all the benchmark names ahead of time
        // so that we can place empty spaces for datasets
        // that don't have a particular benchmark
        return _.chain(this.props.datasets)
            .values()
            .flatten()
            .pluck('name')
            .sort()
            .uniq(true /* isSorted */)
            .value();
    }

    initializeChart(props) {
        var datasetNames = _.chain(props.datasets)
            .keys()
            .sort()
            .value();

        // Get all the benchmark names ahead of time
        // so that we can place empty spaces for datasets
        // that don't have a particular benchmark
        var benchmarkNames = this.getBenchmarkNames();

        var colorsClone = chartColors.slice(0);

        var datasets = _.chain(datasetNames)
            .map(function(datasetName) {
                var colors = colorsClone.shift();
                var dataset = {
                    label: datasetName,
                    data: [],
                    backgroundColor: colors.backgroundColor,
                    borderColor: colors.borderColor,
                    borderWidth: 1,
                };
                var benchmarks = props.datasets[datasetName];
                for (var benchmarkName of benchmarkNames) {
                    var benchmark = _.find(benchmarks, function(benchmark) {
                        return benchmark.name === benchmarkName;
                    });
                    if (benchmark) {
                        dataset.data.push(benchmark.average_ns);
                    } else {
                        dataset.data.push(undefined);
                    }
                }
                return dataset;
            })
            .value();

        var el = ReactDOM.findDOMNode(this);
        var chartCtx = el.getContext("2d");
        var chart = new Chart(chartCtx, {
            type: 'horizontalBar',
            data: {
                labels: benchmarkNames,
                datasets: datasets,
            },
            options: {
                animation: {
                    duration: 0,
                },
                maintainAspectRatio: false,
                scales: {
                    xAxes: [{
                        ticks: {
                            beginAtZero:true,
                        },
                        scaleLabel: {
                            display: true,
                            labelString: "Average ns per iteration",
                        },
                    }],
                },
            },
        });
        this.state.chart = chart;
    }

    componentWillReceiveProps(nextProps) {
        this.state.chart.destroy();
        this.initializeChart(nextProps);
    }

    componentDidMount() {
        this.initializeChart(this.props);
    }

    componentDidUpdate() {
        this.state.chart.destroy();
        this.initializeChart(this.props);
    }

    componentWillUnmount() {
        this.state.chart.destroy();
    }

}

function presentSuccess() {
    ReactDOM.render(
        React.createElement(MasterView, globalData),
        document.getElementById('content')
    );
}

// Populates globalData.machineBenchmarks[machine]
// with benchmark data. Returns a Promise to track
// completion. The Promise is also temporarily stored
// in the globalData.machineBenchmarks slot for debouncing.
function loadMachineBenchmarks(machine) {
    var preexisting = globalData.machineBenchmarks[machine];
    if (preexisting instanceof Promise) {
        return preexisting;
    }
    if (preexisting && preexisting !== {}) {
        return Promise.resolve(preexisting);
    }
    return fetch('data/' + machine + '/manifest.json')
        .then(checkStatus)
        .then(parseJSON)
        .then(function (json) { return json.runs; })
        .then(function (files) {
            globalData.machineBenchmarks[machine] = {};
            var runFetches = files.map(function (file) {
                return loadRunBenchmarks(machine, file);
            });
            return Promise.all(runFetches);
        });
}

function loadRunBenchmarks(machine, file) {
    return fetch('data/' + machine + '/' + file)
        .then(checkStatus)
        .then(parseJSON)
        .then(function (json) {
            globalData.machineBenchmarks[machine][file] = json;
        });
}

function presentFailure(ex) {
    // TODO: escape, test, clean up
    console.log(ex);
    document.getElementById('fetch-failure').innerHTML =
        '<p>Failed!</p>' +
        '<p>Details: ' + ex + '</p>';
}

var chartColors = [
    {
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        borderColor: 'rgba(255,99,132,1)',
    },
    {
        backgroundColor: 'rgba(54, 162, 235, 0.2)',
        borderColor: 'rgba(54, 162, 235, 1)',
    },
    {
        backgroundColor: 'rgba(255, 206, 86, 0.2)',
        borderColor: 'rgba(255, 206, 86, 1)',
    },
    {
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
    },
    {
        backgroundColor: 'rgba(153, 102, 255, 0.2)',
        borderColor: 'rgba(153, 102, 255, 1)',
    },
    {
        backgroundColor: 'rgba(255, 159, 64, 0.2)',
        borderColor: 'rgba(255, 159, 64, 1)',
    },
];
