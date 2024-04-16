import React, { useState, useEffect } from 'react';
import * as am5 from "@amcharts/amcharts5";

const DisplayStats = () => {
    const [averageWinRate, setAverageWinRate] = useState('');
    const [fieldGoalPercentage, setFieldGoalPercentage] = useState('');
    const [threePointPercentage, setThreePointPercentage] = useState('');

    useEffect(() => {
        // Fetch data from the backend for average win rate
        fetch('/api/teams/:teamId/average-win-rate')
            .then(response => response.json())
            .then(data => {
                console.log('Average Win Rate Data:', data);
                setAverageWinRate(data.averageWinRate);
            })
            .catch(error => {
                console.error('Error fetching average win rate:', error);
            });
    
        // Fetch data from the backend for field goal percentage
        fetch('/api/teams/:teamId/field-goal-percentage')
            .then(response => response.json())
            .then(data => {
                console.log('Field Goal Percentage Data:', data);
                setFieldGoalPercentage(data.fieldGoalPercentage);
            })
            .catch(error => {
                console.error('Error fetching field goal percentage:', error);
            });
    
        // Fetch data from the backend for three-point percentage
        fetch('/api/teams/:teamId/three-point-percentage')
            .then(response => response.json())
            .then(data => {
                console.log('Three-Point Percentage Data:', data); // Log data to check if it's correct
                setThreePointPercentage(data.threePointPercentage);
            })
            .catch(error => {
                console.error('Error fetching three-point percentage:', error);
            });
    
        // Fetch data for other statistics as needed
    }, []);    

    useEffect(() => {
        // Create a chart instance
        let chart = am5.create("chartDiv", am5.Charts.XYChart);

        // Add data
        chart.data = [
            {
                statistic: 'Average Win Rate',
                value: parseFloat(averageWinRate.replace('%', ''))
            },
            {
                statistic: 'Field Goal Percentage',
                value: parseFloat(fieldGoalPercentage.replace('%', ''))
            },
            {
                statistic: 'Three-Point Percentage',
                value: parseFloat(threePointPercentage.replace('%', ''))
            }
        ];

        // Create axes
        let categoryAxis = chart.xAxes.push(new am5.CategoryAxis());
        categoryAxis.dataFields.category = "statistic";

        let valueAxis = chart.yAxes.push(new am5.ValueAxis());

        // Create series
        let series = chart.series.push(new am5.ColumnSeries());
        series.dataFields.valueY = "value";
        series.dataFields.categoryX = "statistic";
        series.tooltipText = "{categoryX}: {valueY}";

        return () => {
            // Cleanup when component unmounts
            chart.dispose();
        };
    }, [averageWinRate, fieldGoalPercentage, threePointPercentage]);

    return (
        <div>
            <h2>Team Statistics</h2>
            <p>Average Win Rate: {averageWinRate}</p>
            <p>Field Goal Percentage: {fieldGoalPercentage}</p>
            <p>Three-Point Percentage: {threePointPercentage}</p>
            {/* Display other statistics here */}
            <div id="chartDiv" style={{ width: "100%", height: "500px" }}></div>
        </div>
    );
}

export default DisplayStats;