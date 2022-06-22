import React from 'react';
import ReactDOM from 'react-dom';
import { Line } from '@antv/g2plot';
import { DataView } from '@antv/data-set';
import * as _ from '@antv/util';
import insertCss from 'insert-css';
const PouchDB = require('pouchdb').default;

var db = new PouchDB('test1');

class TrendChart extends React.Component {
  chartNodeRef = React.createRef();
  chartRef = React.createRef();

  state = {
    tooltipItems: [],
    activeTooltipTitle: null,
    activeSeriesList: []
  };
  async componentDidMount() {
    this.doShit()
  };
  async componentDidUpdate() {
    this.doShit()
  };
  async doShit() {
    const chartDom = this.chartNodeRef.current;
        let res = await db.allDocs({
          include_docs: true, 
          attachments: true
          })
          let rows = res.rows; 
          const dv = new DataView().source(rows); 
          let data = dv.rows.map((d) => ({
            doc: d.doc,
          })); 
          var i = 0;
          while (i < data.length) {
            data[i]=data[i].doc
            if (!Object.getOwnPropertyNames(data[i]).includes(this.props.x) || !Object.getOwnPropertyNames(data[i]).includes(this.props.y)) {
              data.splice(i, 1);
            } else {
              for(let key in data[i]) {
                const parsed = parseFloat(data[i][key], 10);
                data[i][key] = isNaN(parsed) ? data[i][key] : parsed;
              }
              data[i]["Time"] = data[i]["Time"].toFixed(3)
              ++i;
            }
          }
          console.log("Sorting by: " + this.props.x)
          console.log(data[0][this.props.x])
          data.sort((a,b) => (parseFloat(a[this.props.x]) > parseFloat(b[this.props.x])) ? 1 : -1)
          console.log(data[0][this.props.x])
            console.log(data);
            if (this.chartRef) {
              this.chartRef?.current?.clear();
            }

            //Remove this for infinite graphs
            // if(this.chartNodeRef.current.firstChild){
            //   this.chartNodeRef.current.removeChild(this.chartNodeRef.current.firstChild)
            // }

            const line = new Line(chartDom, {
              data,
              autoFit: false,
              xField: this.props.x,
              yField: this.props.y,
              seriesField: 'series',
              xAxis: {
                type: 'cat',
                label: {
                  autoRotate: true,
                  formatter: (v) => {
                    return v.split('/').reverse().join('-');
                  },
                },
                title: {
                  text: this.props.x + "(s)",
                  style: {
                    fontSize: 16,
                  },
                },
              },
              yAxis: {
                grid: {
                  line: {
                    style: {
                      lineWidth: 0.5,
                    },
                  },
                },
                title: {
                  text: this.props.y,
                  style: {
                    fontSize: 16,
                  },
                },
              },
              point: {
                shape: 'circle',
                size: 2,
                style: () => {
                  return {
                    fillOpacity: 0,
                    stroke: 'transparent',
                  };
                },
              },
              appendPadding: [0, 0, 0, 0],
              legend: false,
              smooth: false,
              lineStyle: {
                lineWidth: 1.5,
                stroke: "#fff"
              },
              tooltip: {
                showMarkers: false,
                follow: false,
                position: 'top',
                customContent: () => null,
              },
              theme: {
                geometries: {
                  point: {
                    circle: {
                      active: {
                        style: {
                          r: 4,
                          fillOpacity: 1,
                          stroke: '#000',
                          lineWidth: 1,
                        },
                      },
                    },
                  },
                },
              },
              interactions: [{ type: 'marker-active' }, { type: 'brush' }],
            });
     
            line.render();
            this.chartRef = line;
            const lastData = _.last(data);
            //const point = line.chart.getXY(lastData);
            //line.chart.showTooltip(point); 
            //const activeTooltipTitle = lastData.Time;
            //this.setState({ tooltipItems: data.filter((d) => d.Time === activeTooltipTitle), activeTooltipTitle });
            console.log("Created Graph!")
    
            line.on('plot:mouseleave', () => {
              line.chart.hideTooltip();
            });
            line.on('tooltip:change', (evt) => {
              const { title } = evt.data;
              //const tooltipItems = data.filter((d) => d.Time === title);
              //this.setState({ tooltipItems, activeTooltipTitle: title });
            });
  };
  changeActiveSeries = (activeSeries) => {
    const { activeTooltipTitle, activeSeriesList } = this.state;
    let newList = [];
    if (!activeSeriesList.includes(activeSeries)) {
      newList = [...activeSeriesList, activeSeries];
    } else {
      newList = activeSeriesList.filter((s) => s !== activeSeries);
    }
    this.setState({ activeSeriesList: newList }, () => {
      // @ts-ignore
      const chart = this.chartRef?.chart;
      if (chart && activeSeries) {
        chart.filter('series', (series) => {
          return newList.includes(series) ? false : true;
        });
        chart.render(true);
        chart.geometries
          .find((geom) => geom.type === 'point')
          .elements.forEach((ele) => {
            const { Date, series } = ele.getModel().data;
            if (Date === activeTooltipTitle && series === activeSeries) {
              ele.setState('active', true);
            }
          });
      }
    });
  };

  generateTooltip = () => {
    // @ts-ignore
    const chart = this.chartRef?.chart;
    if (!chart) {
      return;
    }
    const { tooltipItems, activeSeriesList, activeTooltipTitle } = this.state;
    const { colors10 } = chart.themeObject;
    return (
      <div className="g2-tooltip">
        <div className="g2-tooltip-title">{activeTooltipTitle}</div>
        <div className="g2-tooltip-items">
          {tooltipItems.map((item, idx) => {
            const changeActiveSeries = () => this.changeActiveSeries(item.series);
            return (
              <div
                className={`g2-tooltip-item tooltip-${item.series} ${
                  activeSeriesList.includes(item.series) ? 'inactive' : ''
                }`}
                onClick={changeActiveSeries}
              >
                <div className="g2-tooltip-item-marker" style={{ background: colors10[idx] }}></div>
                <div className="g2-tooltip-item-label">{item.series}</div>
                <div className="g2-tooltip-item-value">{item.value || '-'}</div>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  render() {
    return (
      <section className={'wrapper trend-wrapper'}>
        {this.generateTooltip()}
        <div className={'chart-wrapper'} ref={this.chartNodeRef} />
      </section>
    );
  }
}

// 我们用 insert-css 演示引入自定义样式
// 推荐将样式添加到自己的样式文件中
// 若拷贝官方代码，别忘了 npm install insert-css
// We use 'insert-css' to insert custom styles
// It is recommended to add the style to your own style sheet files
// If you want to copy the code directly, please remember to install the npm package 'insert-css
insertCss(`
  .trend-wrapper .g2-tooltip {
    position: absolute;
    z-index: 8;
    transition: left 0.4s cubic-bezier(0.23, 1, 0.32, 1) 0s, top 0.4s cubic-bezier(0.23, 1, 0.32, 1) 0s;
    background-color: transparent;
    color: rgb(225, 243, 165);
    padding: 0px 12px;
    margin: 0px;
    overflow-x: auto;
    width: 100%;
    left: 0px;
    top: 0px;
    pointer-events: auto;
  }
  .trend-wrapper .g2-tooltip-title {
    margin: 10px 0;
    font-weight: 700;
    height: 12px;
    line-height: 12px;
  }
  .trend-wrapper .g2-tooltip-items {
    display: flex;
    flex-direction: row;
    align-items: center;
    overflow: auto;
    width: 100%;
  }
  .trend-wrapper .g2-tooltip-item {
    opacity: 1;
    cursor: pointer;
    position: relative;
    display: flex;
    flex-direction: column;
    width: 92px;
    min-width: 92px;
    padding-left: 12px;
    justify-content: space-between;
  }
  .trend-wrapper .g2-tooltip-item.inactive {
    opacity: 0.25;
  }
  .trend-wrapper .g2-tooltip-item-marker {
    width: 3px;
    position: absolute;
    top: 0px;
    right: 0px;
    bottom: 0px;
    height: 48px;
    left: 0px;
  }
  .trend-wrapper .g2-tooltip-item-label {
    font-size: 14px;
    line-height: 14px;
    margin: 2px 0px 12px;
  }
  .trend-wrapper .g2-tooltip-item-value {
    font-weight: 700;
    font-size: 18px;
    line-height: 18px;
    color: rgba(0, 0, 0, 0.65);
    margin: 0px 0px 4px;
  }
  #container {
    width: 100%;
    height: 100%;
  }
  .wrapper {
    position: relative;
    width: 100%;
    height: 100%;
  }
  .wrapper .chart-wrapper {
    position: absolute !important;
    top: 94px;
    bottom: 0px;
    right: 10px;
    left: 10px;
    height: calc(100% - 88px);
  }
`);

export default TrendChart;
