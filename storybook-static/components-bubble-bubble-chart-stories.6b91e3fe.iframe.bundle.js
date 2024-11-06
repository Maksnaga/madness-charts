(self.webpackChunk_mozaic_ds_angular_chart=self.webpackChunk_mozaic_ds_angular_chart||[]).push([[350],{"./src/services/color-function.service.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";__webpack_require__.d(__webpack_exports__,{S:()=>ColorFunctionsService});var tslib__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/tslib/tslib.es6.mjs"),_angular_core__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./node_modules/@angular/core/fesm2022/core.mjs");let ColorFunctionsService=class ColorFunctionsService{constructor(){}addAlpha(color,opacity){return color+Math.round(255*Math.min(Math.max(opacity||1,0),1)).toString(16).toUpperCase()}static ctorParameters=()=>[]};ColorFunctionsService=(0,tslib__WEBPACK_IMPORTED_MODULE_0__.Cg)([(0,_angular_core__WEBPACK_IMPORTED_MODULE_1__.Injectable)({providedIn:"root"})],ColorFunctionsService)},"./src/components/bubble/bubble-chart.stories.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{Default:()=>Default,__namedExportsOrder:()=>__namedExportsOrder,default:()=>bubble_chart_stories});var tslib_es6=__webpack_require__("./node_modules/tslib/tslib.es6.mjs");var bubble_chart_componentngResource=__webpack_require__("./src/components/bubble/bubble-chart.component.scss?ngResource"),bubble_chart_componentngResource_default=__webpack_require__.n(bubble_chart_componentngResource),core=__webpack_require__("./node_modules/@angular/core/fesm2022/core.mjs"),ng2_charts=__webpack_require__("./node_modules/ng2-charts/fesm2022/ng2-charts.mjs"),chart_design=__webpack_require__("./src/patterns/chart-design.ts"),color_function_service=__webpack_require__("./src/services/color-function.service.ts"),format_utilities_service=__webpack_require__("./src/services/format-utilities.service.ts"),generic_tooltip_service=__webpack_require__("./src/services/generic-tooltip.service.ts");const tooltipLineStyle="background: white; border-bottom: 1px solid #CCCCCC; border-radius: 5px; padding: 10px 20px";let BubbleTooltipService=class BubbleTooltipService extends generic_tooltip_service.w{fontProperties="font-family: Arial; font-size: 16px";createBubbleTooltip(context,lines,title){if(!title||""===title)return;let tooltipEl=document.querySelector("#chartjs-tooltip");tooltipEl||(tooltipEl=this.createNewTooltipElement());const tooltipModel=context.tooltip;if(0!==tooltipModel.opacity){if(tooltipModel.body){this.titleLines=tooltipModel.title||[];const body=tooltipModel.body.map(this.getBody)[0];this.addBubbleLegendToDom(lines,body,tooltipEl,title)}this.handleTooltipPosition(context,tooltipModel,tooltipEl)}else tooltipEl.style.opacity="0"}addBubbleLegendToDom(lines,body,tooltipEl,title){body[0].split(":")[0];const spanText=`<span style="${this.fontProperties}">${title}</span>`;let innerHtml=`<div style="${tooltipLineStyle}; font-weight: bold" class="tooltipTitle">${spanText}</div>`;innerHtml+=this.getBubbleInnerHtml(lines);const tableRoot=tooltipEl?.querySelector(".tooltipCtn");tableRoot.innerHTML=innerHtml}getBubbleInnerHtml(lines){let innerLinesHtml="";return lines.forEach((line=>{innerLinesHtml+=`<div style="${this.fontProperties}; ${tooltipLineStyle}; display:flex; justify-content: space-between;">`,innerLinesHtml+=`<div>${line.label}</div>`,innerLinesHtml+=`<div>${line.value}${line.unit}</div>`,innerLinesHtml+="</div>"})),`<div>${innerLinesHtml}</div>`}};BubbleTooltipService=(0,tslib_es6.Cg)([(0,core.Injectable)({providedIn:"root"})],BubbleTooltipService);let BubbleChartComponent=class BubbleChartComponent{bubbleTooltipService;colorFunctionService;formatUtilitiesService;chartId="bubble-chart";labels=[];colourSet=0;colours=[];shapes=[];datasets=[];width="400px";height="300px";cssClasses=void 0;styles={};bubbleMin=10;bubbleMax=40;plugins=[];displayBubbleLabel=!1;xAxis=null;yAxis=null;rAxis=null;displayAxisLabels=!0;bubbleChartOptions;colourSets=(0,chart_design.A)().colourSets;patternsStandardList=(0,chart_design.A)().patternsStandardList;constructor(bubbleTooltipService,colorFunctionService,formatUtilitiesService){this.bubbleTooltipService=bubbleTooltipService,this.colorFunctionService=colorFunctionService,this.formatUtilitiesService=formatUtilitiesService}ngAfterViewInit(){this.initializeChartOptions(),this.bubbleChartOptions.onHover=(event,elements,chart)=>{chart&&(chart.canvas.style.cursor=0!==elements.length?"pointer":"default")}}chartData(){const chartColourSet=this.colourSets[this.colourSet];return{datasets:this.normalizeDatasets(this.datasets).map(((data,index)=>({data,pointStyle:this.shapes[index],backgroundColor:this.colorFunctionService.addAlpha(chartColourSet[this.colours[index]],.2),borderColor:chartColourSet[this.colours[index]],label:this.labels[index]})))}}initializeChartOptions(){this.bubbleChartOptions={responsive:!0,scales:{x:{offset:!0,title:{display:this.displayAxisLabels,text:this.xAxis?.title}},y:{offset:!0,title:{display:this.displayAxisLabels,text:this.yAxis?.title}}},plugins:{responsive:!0,maintainAspectRatio:!1,legend:{display:!1},title:{display:!1},datalabels:{display:this.displayBubbleLabel,anchor:"end",align:"end",color:"black",formatter:function(_value,context){return context.dataset.label},padding:0},tooltip:{enabled:!1,position:"nearest",external:context=>{const datasetIndex=context.tooltip?.dataPoints?.[0].datasetIndex??0,dataIndex=context.tooltip.dataPoints?.[0].dataIndex??0,currentBubble=this.datasets[datasetIndex][dataIndex];this.bubbleTooltipService.createBubbleTooltip(context,[{label:this.xAxis?.title??"",value:`${this.formatUtilitiesService.formatWithThousandsSeparators(currentBubble.x)}`,unit:this.xAxis?.unit??""},{label:this.yAxis?.title??"",value:`${this.formatUtilitiesService.formatWithThousandsSeparators(currentBubble.y)}`,unit:this.yAxis?.unit??""},{label:this.rAxis?.title??"",value:`${this.formatUtilitiesService.formatWithThousandsSeparators(currentBubble.r)}`,unit:this.rAxis?.unit??""}],this.labels[datasetIndex])}}}}}normalizeDatasets(dataSets){const rValues=[];dataSets.forEach((dataSerie=>{dataSerie.forEach((item=>{rValues.push(item.r)}))}));const max=Math.max(...rValues),min=Math.min(...rValues),rMax=this.bubbleMax,rMin=this.bubbleMin;return dataSets.map((dataSerie=>max===min?dataSerie.map((item=>({x:item.x,y:item.y,r:rMin+(rMax-rMin)/2}))):dataSerie.map((item=>({x:item.x,y:item.y,r:rMin+(item.r-min)*(rMax-rMin)/(max-min)})))))}static ctorParameters=()=>[{type:BubbleTooltipService},{type:color_function_service.S},{type:format_utilities_service.D}];static propDecorators={chartId:[{type:core.Input}],labels:[{type:core.Input}],colourSet:[{type:core.Input}],colours:[{type:core.Input}],shapes:[{type:core.Input}],datasets:[{type:core.Input}],width:[{type:core.Input}],height:[{type:core.Input}],cssClasses:[{type:core.Input}],styles:[{type:core.Input}],bubbleMin:[{type:core.Input}],bubbleMax:[{type:core.Input}],plugins:[{type:core.Input}],displayBubbleLabel:[{type:core.Input}],xAxis:[{type:core.Input}],yAxis:[{type:core.Input}],rAxis:[{type:core.Input}],displayAxisLabels:[{type:core.Input}]}};BubbleChartComponent=(0,tslib_es6.Cg)([(0,core.Component)({selector:"moz-ng-bubble",standalone:!0,imports:[ng2_charts.FR],template:'<div class="container">\r\n  <div class="main">\r\n    <canvas\r\n      baseChart\r\n      [id]="chartId"\r\n      [data]="chartData()"\r\n      [options]="bubbleChartOptions"\r\n      [type]="\'bubble\'"\r\n    >\r\n    </canvas>\r\n  </div>\r\n  <div class="chart-legend">\r\n    <img\r\n      src="../../assets/img/bubbles.svg"\r\n      :alt="rAxis?.title"\r\n      class="bubble-icon mu-mr-025"\r\n    />\r\n    <div class="size-legend-label">\r\n      {{ rAxis?.title }}\r\n    </div>\r\n  </div>\r\n</div>\r\n',styles:[bubble_chart_componentngResource_default()]})],BubbleChartComponent);const bubble_chart_stories={title:"Charts/Bubble",component:BubbleChartComponent,tags:["autodocs"]},Default={args:{width:"800px",height:"500px",labels:["Serie 1","Serie 2","Serie 3","Serie 4"],colours:[0,4,1,2],shapes:["rectRot","triangle","circle","rect"],colourSet:4,datasets:[[{x:2e4,y:25,r:5},{x:1e4,y:505,r:15}],[{x:1e4,y:30,r:20},{x:10,y:300,r:200}],[{x:5e3,y:320,r:100}],[{x:18e3,y:8,r:30}]],xAxis:{title:"Data 1",unit:"€"},yAxis:{title:"Data 2",unit:"D"},rAxis:{title:"Data 3",unit:"%"}}},__namedExportsOrder=["Default"];Default.parameters={...Default.parameters,docs:{...Default.parameters?.docs,source:{originalSource:'{\n  args: {\n    width: "800px",\n    height: "500px",\n    labels: ["Serie 1", "Serie 2", "Serie 3", "Serie 4"],\n    colours: [0, 4, 1, 2],\n    shapes: ["rectRot", "triangle", "circle", "rect"],\n    colourSet: 4,\n    datasets: [[{\n      x: 20000,\n      y: 25,\n      r: 5\n    }, {\n      x: 10000,\n      y: 505,\n      r: 15\n    }], [{\n      x: 10000,\n      y: 30,\n      r: 20\n    }, {\n      x: 10,\n      y: 300,\n      r: 200\n    }], [{\n      x: 5000,\n      y: 320,\n      r: 100\n    }], [{\n      x: 18000,\n      y: 8,\n      r: 30\n    }]],\n    xAxis: {\n      title: "Data 1",\n      unit: "€"\n    },\n    yAxis: {\n      title: "Data 2",\n      unit: "D"\n    },\n    rAxis: {\n      title: "Data 3",\n      unit: "%"\n    }\n  }\n} satisfies Story',...Default.parameters?.docs?.source}}}},"./src/components/bubble/bubble-chart.component.scss?ngResource":(module,__unused_webpack_exports,__webpack_require__)=>{var ___CSS_LOADER_API_NO_SOURCEMAP_IMPORT___=__webpack_require__("./node_modules/css-loader/dist/runtime/noSourceMaps.js"),___CSS_LOADER_EXPORT___=__webpack_require__("./node_modules/css-loader/dist/runtime/api.js")(___CSS_LOADER_API_NO_SOURCEMAP_IMPORT___);___CSS_LOADER_EXPORT___.push([module.id,"/* stylelint-disable max-line-length */\n/* create columns */\n/* create columns */\n/* create custom named columns with custom content */\n/* mqp:start */\n/* stylelint-disable no-descending-specificity */\n.mc-checkbox {\n  align-items: center;\n  display: flex;\n}\n.mc-checkbox__label {\n  font-size: 1rem;\n  line-height: 1.125;\n  cursor: pointer;\n  margin-left: 0.5rem;\n  color: #000000;\n}\n.mc-checkbox__input {\n  font-family: \"LeroyMerlin\", sans-serif;\n  font-weight: 400;\n  box-sizing: border-box;\n  outline: none;\n  appearance: none;\n  padding: 0;\n  margin: 0;\n  box-shadow: none;\n  border: none;\n  /* for mozilla */\n  /* stylelint-disable-next-line */\n  min-width: 20px;\n  min-height: 20px;\n  width: 1.25rem;\n  height: 1.25rem;\n  border-radius: 4px;\n  border: 2px solid #666666;\n  background-color: #ffffff;\n  position: relative;\n  transition: all 200ms ease;\n  cursor: pointer;\n}\n.mc-checkbox__input[type=number]::-webkit-inner-spin-button, .mc-checkbox__input[type=number]::-webkit-outer-spin-button {\n  appearance: none;\n  margin: 0;\n}\n.mc-checkbox__input[type=number] {\n  -moz-appearance: textfield;\n}\n.mc-checkbox__input[type=search]::-webkit-search-decoration:hover, .mc-checkbox__input[type=search]::-webkit-search-cancel-button:hover {\n  cursor: pointer;\n}\n.mc-checkbox__input::-ms-check {\n  background-color: #ffffff;\n  border: 2px solid #666666;\n  border-radius: 4px;\n  color: #ffffff;\n}\n.mc-checkbox__input:hover {\n  border-color: #191919;\n}\n.mc-checkbox__input:hover::-ms-check {\n  border-color: #191919;\n}\n.mc-checkbox__input:focus {\n  box-shadow: 0 0 0 0.125rem #ffffff, 0 0 0 0.25rem #0b96cc;\n}\n.mc-checkbox__input:focus::-ms-check {\n  box-shadow: 0 0 0 0.125rem #ffffff, 0 0 0 0.25rem #0b96cc;\n}\n.mc-checkbox__input:checked, .mc-checkbox__input:indeterminate {\n  background-color: #46a610;\n  border-color: #46a610;\n  background-size: 1rem 1rem;\n}\n.mc-checkbox__input:checked {\n  background-image: url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' height='1rem' width='1rem' fill='%23ffffff' viewBox='0 0 16 16'%3E%3Cpath d='M7.63 11.21a1 1 0 0 1-1.38 0l-2.92-2.6a1 1 0 1 1 1.34-1.48l2.22 2 4.41-4.34a1 1 0 1 1 1.4 1.42z'/%3E%3C/svg%3E\");\n  background-position: center center;\n}\n.mc-checkbox__input:checked::-ms-check {\n  background-color: #46a610;\n  border-color: #46a610;\n}\n.mc-checkbox__input:checked:hover:not(:disabled) {\n  border-color: #035010;\n}\n.mc-checkbox__input:checked:hover:not(:disabled)::-ms-check {\n  border-color: #035010;\n}\n.mc-checkbox__input:indeterminate {\n  background-image: url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' height='1rem' width='1rem' fill='%23ffffff' viewBox='0 0 16 16'%3E%3Cpath d='M12 9H4a1 1 0 010-2h8a1 1 0 010 2z'/%3E%3C/svg%3E\");\n}\n.mc-checkbox__input:disabled {\n  background-color: #e6e6e6;\n  border-color: #e6e6e6;\n  cursor: not-allowed;\n}\n.mc-checkbox__input:disabled::-ms-check {\n  background-color: #e6e6e6;\n  border-color: #e6e6e6;\n}\n.mc-checkbox__input:disabled:checked {\n  background-image: url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' height='1rem' width='1rem' fill='%23999999' viewBox='0 0 16 16'%3E%3Cpath d='M7.63 11.21a1 1 0 0 1-1.38 0l-2.92-2.6a1 1 0 1 1 1.34-1.48l2.22 2 4.41-4.34a1 1 0 1 1 1.4 1.42z'/%3E%3C/svg%3E\");\n}\n.mc-checkbox__input:disabled:indeterminate {\n  background-image: url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' height='1rem' width='1rem' fill='%23999999' viewBox='0 0 16 16'%3E%3Cpath d='M12 9H4a1 1 0 010-2h8a1 1 0 010 2z'/%3E%3C/svg%3E\");\n}\n.mc-checkbox__input:disabled + .mc-checkbox__label {\n  color: #808080;\n}\n.mc-checkbox__input.is-invalid {\n  border-color: #c61112;\n}\n.mc-checkbox__input.is-invalid::-ms-check {\n  border-color: #c61112;\n}\n.mc-checkbox__input.is-invalid:hover {\n  border-color: #530000;\n}\n.mc-checkbox__input.is-invalid:hover::-ms-check {\n  border-color: #530000;\n}\n\n/* stylelint-enable */\n/* mqp:end */\n.container {\n  -moz-osx-font-smoothing: grayscale;\n  -webkit-font-smoothing: antialiased;\n  font-weight: 400;\n  font-family: \"Roboto\", sans-serif;\n}\n\n.main {\n  display: flex;\n  flex-direction: column;\n  justify-content: center;\n  align-items: center;\n  margin-bottom: 20px;\n}\n\n.chart-legend {\n  display: flex;\n  gap: 4px;\n  font-size: 14px;\n  align-items: center;\n  margin: 1.375rem 1.0625rem;\n  color: rgb(102, 102, 102);\n}\n\n.bubble-icon {\n  width: 16px;\n  height: 16px;\n}",""]),module.exports=___CSS_LOADER_EXPORT___.toString()}}]);