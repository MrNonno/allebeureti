import React, { useState, useEffect } from 'react';
import * as am5 from "@amcharts/amcharts5";

const DisplayStats = () => {
    const [averageWinRate, setAverageWinRate] = useState('');
    const [fieldGoalPercentage, setFieldGoalPercentage] = useState('');
    const [threePointPercentage, setThreePointPercentage] = useState('');
    // Add state variables for other statistics as needed

    useEffect(() => {
        // Fetch data from the backend for average win rate
        fetch('/api/teams/:teamId/average-win-rate')
            .then(response => response.json())
            .then(data => {
                console.log('Average Win Rate Data:', data); // Log data to check if it's correct
                setAverageWinRate(data.averageWinRate);
            })
            .catch(error => {
                console.error('Error fetching average win rate:', error);
            });
    
        // Fetch data from the backend for field goal percentage
        fetch('/api/teams/:teamId/field-goal-percentage')
            .then(response => response.json())
            .then(data => {
                console.log('Field Goal Percentage Data:', data); // Log data to check if it's correct
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

    return (
        <div>
            <h2>Team Statistics</h2>
            <p>Average Win Rate: {averageWinRate}</p>
            <p>Field Goal Percentage: {fieldGoalPercentage}</p>
            <p>Three-Point Percentage: {threePointPercentage}</p>
            {/* Display other statistics here */}
            <Chart
                dataProvider={[
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

                ]}
                categoryField="statistic"
                type="serial"
            />
        </div>
    );
}

export default DisplayStats;