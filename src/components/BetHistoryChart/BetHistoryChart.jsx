import {useSelector} from 'react-redux';
import Chart from "react-apexcharts";
import moment from 'moment';
import './BetHistoryChart.css';

function BetHistoryChart(){

    let labels = [];
    let betData = [];

    const options = {
        chart: {
            animations: {
            enabled: true,
            easing: 'easeinout',
            speed: 1000,
            animateGradually: {
                enabled: true,
                delay: 100
            },
            dynamicAnimation: {
                enabled: true,
                speed: 1000
            }
        }},
        colors: ['#FFF500'],
        // fill:{type: 'solid'},
        // chart: {background: '#bfbfbf'},
        xaxis: {categories: labels,
        labels: {
            show: true,
            rotate: -45,
            rotateAlways: false,
            hideOverlappingLabels: true,
            showDuplicates: false,
            trim: false,
            minHeight: undefined,
            maxHeight: 120,
            style: {
                colors: '#fff',
                fontSize: '12px',
                fontFamily: 'Helvetica, Arial, sans-serif',
                fontWeight: 400,
                cssClass: 'apexcharts-xaxis-label',
            }
        }
        },
        yaxis: {
            
            labels: {
                style: {
                    colors: '#fff',
                    fontSize: '12px',
                fontFamily: 'Helvetica, Arial, sans-serif',
                fontWeight: 400,
                },
              formatter: function(val, index) {
                return formatter.format(val)
              }
              }
            }            
          }

    const series = [{
          name: "Proft Total",
          data: betData
        }]

    const animations = {
        enabled: true,
        easing: 'easeinout',
        speed: 80,
        animateGradually: {
            enabled: true,
            delay: 150
        },
        dynamicAnimation: {
            enabled: true,
            speed: 35
        }
    }
// formats currency to USD
    const formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 2
        })

    const bets = useSelector(store => store.betHistory);

    let runningTotal = 0

    return(
        <>
            {bets.map(bet => {
                if( bet.profit > 0 || bet.profit < 0 ){
                runningTotal = runningTotal + bet.profit;
                const date = moment(bet.time).format('ll')
                labels.push(date)
                betData.push(runningTotal);
                }
            })}
         <Chart className='chart'
              options={options}
              series={series}
              animations={animations}
              type="line"
              width="70%"
            />
        </>
    )
}

export default BetHistoryChart;