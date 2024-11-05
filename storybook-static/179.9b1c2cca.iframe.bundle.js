"use strict";(self.webpackChunk_mozaic_ds_angular_chart=self.webpackChunk_mozaic_ds_angular_chart||[]).push([[179],{"./src/patterns/chart-design.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{function PatternCircles(hover,color="#095359",disableAccessibility=!1){const canvasPattern=document.createElement("canvas"),ctx=canvasPattern.getContext("2d");if(!ctx)return new CanvasPattern;canvasPattern.width=50,canvasPattern.height=50,!0===disableAccessibility?(ctx.beginPath(),ctx.fillStyle=color,ctx.rect(0,0,50,50),ctx.fill()):(ctx.beginPath(),ctx.fillStyle="#FFFFFF",ctx.lineWidth=5.025,ctx.rect(0,0,50,50),ctx.fill(),ctx.beginPath(),ctx.globalAlpha=.1,ctx.fillStyle=color,ctx.lineWidth=5.025,ctx.rect(0,0,50,50),ctx.fill(),ctx.beginPath(),ctx.globalAlpha=.3,ctx.strokeStyle=color,ctx.lineWidth=2,ctx.arc(5,5,3,0,2*Math.PI),ctx.stroke(),ctx.beginPath(),ctx.globalAlpha=.7,ctx.strokeStyle=color,ctx.lineWidth=2,ctx.arc(2+.56*50,5,3,0,2*Math.PI),ctx.stroke(),ctx.beginPath(),ctx.globalAlpha=.3,ctx.strokeStyle=color,ctx.lineWidth=2,ctx.arc(20,2+.56*50,3,0,2*Math.PI),ctx.stroke(),ctx.beginPath(),ctx.globalAlpha=.7,ctx.strokeStyle=color,ctx.lineWidth=2,ctx.arc(45,2+.56*50,3,0,2*Math.PI),ctx.stroke()),hover&&(ctx.beginPath(),ctx.globalAlpha=.5,ctx.fillStyle="#FFFFFF",ctx.lineWidth=.3,ctx.rect(0,0,50,50),ctx.fill());const canvas=document.createElement("canvas"),context=canvas.getContext("2d");if(!context)return new CanvasPattern;const pattern=context.createPattern(canvasPattern,"repeat");return pattern?(context.fillStyle=pattern,context.fillRect(0,0,canvas.width,canvas.height),pattern):new CanvasPattern}function PatternDashedDiagonals(hover,color="#F255A3",disableAccessibility=!1){const canvasPattern=document.createElement("canvas"),ctx=canvasPattern.getContext("2d");if(!ctx)return new CanvasPattern;const matrix=new DOMMatrix;canvasPattern.width=21,canvasPattern.height=21,!0===disableAccessibility?(ctx.beginPath(),ctx.fillStyle=color,ctx.rect(0,0,21,21),ctx.fill()):(ctx.beginPath(),ctx.fillStyle="#FFFFFF",ctx.lineWidth=.105,ctx.rect(0,0,21,21),ctx.fill(),ctx.beginPath(),ctx.globalAlpha=.1,ctx.fillStyle=color,ctx.lineWidth=.105,ctx.rect(0,0,21,21),ctx.fill(),ctx.beginPath(),ctx.globalAlpha=.3,ctx.strokeStyle=color,ctx.lineWidth=2.1,ctx.moveTo(2.1,0),ctx.lineTo(2.1,10.5),ctx.stroke(),ctx.beginPath(),ctx.globalAlpha=.7,ctx.strokeStyle=color,ctx.lineWidth=2.1,ctx.moveTo(12.6,0),ctx.lineTo(12.6,10.5),ctx.stroke()),hover&&(ctx.beginPath(),ctx.fillStyle="#FFFFFF",ctx.globalAlpha=.5,ctx.lineWidth=.126,ctx.rect(0,0,21,21),ctx.fill());const canvas=document.createElement("canvas"),context=canvas.getContext("2d");if(!context)return new CanvasPattern;const pattern=context.createPattern(canvasPattern,"repeat");return pattern?(context.fillStyle=pattern,context.fillRect(0,0,canvas.width,canvas.height),pattern.setTransform(matrix.rotate(45)),pattern):new CanvasPattern}function PatternDiagonals(hover,color="#143666",disableAccessibility=!1){const patternCanvas=document.createElement("canvas"),ctx=patternCanvas.getContext("2d");if(!ctx)return new CanvasPattern;patternCanvas.width=50,patternCanvas.height=50,!0===disableAccessibility?(ctx.beginPath(),ctx.fillStyle=color,ctx.rect(0,0,50,50),ctx.fill()):(ctx.beginPath(),ctx.fillStyle="#FFFFFF",ctx.lineWidth=.25,ctx.rect(0,0,50,50),ctx.fill(),ctx.beginPath(),ctx.globalAlpha=.1,ctx.fillStyle=color,ctx.lineWidth=.25,ctx.rect(0,0,50,50),ctx.fill(),ctx.save(),ctx.beginPath(),ctx.transform(.708293,.705919,-.666352,.745637,0,0),ctx.globalAlpha=.7,ctx.fillStyle=color,ctx.lineWidth=3.75,ctx.miterLimit=4,ctx.rect(-1.5,-.5,75,2),ctx.fill(),ctx.restore(),ctx.save(),ctx.beginPath(),ctx.transform(.708293,.705919,-.666352,.745637,0,0),ctx.globalAlpha=.3,ctx.fillStyle=color,ctx.lineWidth=3.75,ctx.miterLimit=4,ctx.rect(.29*50,16.5,75,2),ctx.fill(),ctx.restore(),ctx.save(),ctx.beginPath(),ctx.transform(.708293,.705919,-.666352,.745637,0,0),ctx.globalAlpha=.7,ctx.fillStyle=color,ctx.lineWidth=3.75,ctx.miterLimit=4,ctx.rect(31.5,34.5,75,2),ctx.fill(),ctx.restore(),ctx.save(),ctx.beginPath(),ctx.transform(.708293,.705919,-.666352,.745637,0,0),ctx.globalAlpha=.3,ctx.fillStyle=color,ctx.lineWidth=3.75,ctx.miterLimit=4,ctx.rect(16.5,-18.5,75,2),ctx.fill(),ctx.restore(),ctx.save(),ctx.beginPath(),ctx.transform(.708293,.705919,-.666352,.745637,0,0),ctx.globalAlpha=.7,ctx.fillStyle=color,ctx.lineWidth=3.75,ctx.miterLimit=4,ctx.rect(35.5,-36,75,2),ctx.fill(),ctx.restore()),hover&&(ctx.beginPath(),ctx.globalAlpha=.5,ctx.fillStyle="#FFFFFF",ctx.lineWidth=.3,ctx.rect(0,0,50,50),ctx.fill());const context=document.createElement("canvas").getContext("2d");if(!context)return new CanvasPattern;const pattern=context.createPattern(patternCanvas,"repeat");return pattern||new CanvasPattern}function PatternSquares(hover,color="#A274FF",disableAccessibility=!1){const patternCanvas=document.createElement("canvas"),ctx=patternCanvas.getContext("2d");if(!ctx)return new CanvasPattern;patternCanvas.width=50,patternCanvas.height=50,!0===disableAccessibility?(ctx.beginPath(),ctx.fillStyle=color,ctx.rect(0,0,50,50),ctx.fill()):(ctx.beginPath(),ctx.fillStyle="#FFFFFF",ctx.lineWidth=.25,ctx.rect(0,0,50,50),ctx.fill(),ctx.beginPath(),ctx.globalAlpha=.1,ctx.fillStyle=color,ctx.lineWidth=.25,ctx.rect(0,0,50,50),ctx.fill(),ctx.beginPath(),ctx.globalAlpha=.7,ctx.fillStyle=color,ctx.lineWidth=.3,ctx.rect(25,0,7.5,7.5),ctx.fill(),ctx.beginPath(),ctx.globalAlpha=.7,ctx.fillStyle=color,ctx.lineWidth=.3,ctx.rect(37.5,25,7.5,7.5),ctx.fill(),ctx.beginPath(),ctx.globalAlpha=.3,ctx.fillStyle=color,ctx.lineWidth=.3,ctx.rect(0,0,7.5,7.5),ctx.fill(),ctx.beginPath(),ctx.globalAlpha=.3,ctx.fillStyle=color,ctx.lineWidth=.3,ctx.rect(12.5,25,7.5,7.5),ctx.fill()),hover&&(ctx.beginPath(),ctx.globalAlpha=.5,ctx.fillStyle="#FFFFFF",ctx.lineWidth=.3,ctx.rect(0,0,50,50),ctx.fill());const context=document.createElement("canvas").getContext("2d");if(!context)return new CanvasPattern;const pattern=context.createPattern(patternCanvas,"repeat");return pattern||new CanvasPattern}function PatternVerticalLines(hover,color="#8C1551",disableAccessibility=!1){const canvasPattern=document.createElement("canvas"),ctx=canvasPattern.getContext("2d");if(!ctx)return new CanvasPattern;canvasPattern.width=50,canvasPattern.height=50,!0===disableAccessibility?(ctx.beginPath(),ctx.fillStyle=color,ctx.rect(0,0,50,50),ctx.fill()):(ctx.beginPath(),ctx.fillStyle="#FFFFFF",ctx.lineWidth=.25,ctx.rect(0,0,50,50),ctx.fill(),ctx.beginPath(),ctx.globalAlpha=.1,ctx.fillStyle=color,ctx.lineWidth=.25,ctx.rect(0,0,50,50),ctx.fill(),ctx.beginPath(),ctx.globalAlpha=.3,ctx.fillStyle=color,ctx.lineWidth=.25,ctx.rect(0,0,7.5,50),ctx.fill(),ctx.beginPath(),ctx.globalAlpha=.7,ctx.fillStyle=color,ctx.lineWidth=.25,ctx.rect(25,0,7.5,50),ctx.fill()),hover&&(ctx.beginPath(),ctx.globalAlpha=.5,ctx.fillStyle="#FFFFFF",ctx.lineWidth=.3,ctx.rect(0,0,50,50),ctx.fill());const context=document.createElement("canvas").getContext("2d");if(!context)return new CanvasPattern;const pattern=context.createPattern(canvasPattern,"repeat");return pattern?(context.fillStyle=pattern,context.fillRect(0,0,50,50),pattern):new CanvasPattern}function PatternZigzag(hover,color="#00A3B2",disableAccessibility=!1){const canvasPattern=document.createElement("canvas"),ctx=canvasPattern.getContext("2d");if(!ctx)return new CanvasPattern;canvasPattern.width=50,canvasPattern.height=50,!0===disableAccessibility?(ctx.beginPath(),ctx.fillStyle=color,ctx.rect(0,0,50,50),ctx.fill()):(ctx.beginPath(),ctx.fillStyle="#FFFFFF",ctx.lineWidth=.25,ctx.rect(0,0,50,50),ctx.fill(),ctx.beginPath(),ctx.globalAlpha=.1,ctx.fillStyle=color,ctx.lineWidth=.25,ctx.rect(0,0,50,50),ctx.fill(),ctx.beginPath(),ctx.globalAlpha=.7,ctx.strokeStyle=color,ctx.lineWidth=4,ctx.moveTo(-25,25),ctx.lineTo(0,0),ctx.lineTo(25,25),ctx.lineTo(50,0),ctx.stroke(),ctx.beginPath(),ctx.globalAlpha=.3,ctx.strokeStyle=color,ctx.lineWidth=4,ctx.moveTo(-25,50),ctx.lineTo(0,25),ctx.lineTo(25,50),ctx.lineTo(50,25),ctx.lineTo(75,50),ctx.stroke(),ctx.beginPath(),ctx.globalAlpha=.3,ctx.strokeStyle=color,ctx.lineWidth=4,ctx.moveTo(-25,111e-6),ctx.lineTo(4e-6*50,-25),ctx.lineTo(25,111e-6),ctx.lineTo(50,-25),ctx.lineTo(75,111e-6),ctx.stroke(),ctx.beginPath(),ctx.globalAlpha=.7,ctx.strokeStyle=color,ctx.lineWidth=4,ctx.moveTo(-25,75),ctx.lineTo(0,50),ctx.lineTo(25,75),ctx.lineTo(50,50),ctx.lineTo(75,75),ctx.stroke()),hover&&(ctx.beginPath(),ctx.globalAlpha=.5,ctx.fillStyle="#FFFFFF",ctx.lineWidth=.3,ctx.rect(0,0,50,50),ctx.fill());const context=document.createElement("canvas").getContext("2d");if(!context)return new CanvasPattern;const pattern=context.createPattern(canvasPattern,"repeat");return pattern||new CanvasPattern}function chart_design(){return{patternsStandardList:[PatternSquares,PatternDiagonals,PatternZigzag,PatternVerticalLines,PatternDashedDiagonals,PatternCircles],colourSets:[["#393879","#006974","#405D68","#005C91","#8C3500","#8C0003"],["#A274FF","#143666","#00A3B2","#8C1551","#F255A3","#095359"],["#00A3B2","#143666","#3D993D","#8C1551","#E56D17","#4C3380"],["#8C1551","#E56D17","#4C3380","#4588E5","#095359","#F255A3"],["#4588E5","#4C3380","#E56D17","#143666","#D94141","#8C1551"],["#143666","#F255A3","#095359","#4588E5","#8C1551","#E56D17"],["#A274FF","#B0BBC0","#B0BBC0","#B0BBC0","#B0BBC0","#B0BBC0"]]}}__webpack_require__.d(__webpack_exports__,{A:()=>chart_design})},"./src/services/chart-legend.service.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{bR:()=>ChartLegendService});var tslib__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./node_modules/tslib/tslib.es6.mjs"),_angular_core__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__("./node_modules/@angular/core/fesm2022/core.mjs"),_pattern_service__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./src/services/pattern.service.ts"),_format_utilities_service__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./src/services/format-utilities.service.ts");let ChartLegendService=class ChartLegendService{patternService;formatUtilitiesService;constructor(patternService,formatUtilitiesService){this.patternService=patternService,this.formatUtilitiesService=formatUtilitiesService}getHtmlLegendPlugin(legendContainer,selectMode,onHoverIndex,disableAccessibility,patternsColors,patternsList,enableHoverFeature,maxValueToDisplay,chartData){const chartLegendService=this;return{id:"htmlLegend",afterUpdate(chart){const flexDirection="doughnut"===chart.config.type?"column":"row",ul=chartLegendService.getOrCreateLegendList(legendContainer,flexDirection);for(ul.style.margin="1.375rem 1.0625rem";ul.firstChild;)ul.firstChild.remove();chart.options.plugins.legend.labels.generateLabels(chart).forEach((item=>{const isDoughnut="doughnut"===chart.config.type,index=isDoughnut?item.index:item.datasetIndex,li=chartLegendService.createHtmlLegendListElement(chart,selectMode,index);if(isDoughnut){const isOthersElement=index+1===maxValueToDisplay;li.style.marginTop="12px",isOthersElement&&(li.style.position="relative")}else li.style.marginRight="10px";let liContent;li.style.width="max-content",li.style.cursor="pointer",liContent=selectMode.value?chartLegendService.createLegendElementWithCheckbox(chart,item,selectMode,onHoverIndex,patternsColors,enableHoverFeature):chartLegendService.createLegendElementWithPatterns(item,chart,onHoverIndex,disableAccessibility,patternsColors,patternsList,enableHoverFeature),liContent.style.boxSizing="border-box",li.appendChild(liContent),li.appendChild(chartLegendService.createHtmlLegendItemText(item)),isDoughnut&&maxValueToDisplay&&chartLegendService.hasOthersTooltipToDisplay(chartData,maxValueToDisplay,index)&&li.appendChild(chartLegendService.createTooltipAndItsIcon(chartData,maxValueToDisplay)),ul.appendChild(li)}))}}}hasOthersTooltipToDisplay(doughnutData,maxValueToDisplay,index){return doughnutData.data.length>maxValueToDisplay&&index===maxValueToDisplay-1}getOrCreateLegendList(legendContainer,flexDirection){let listContainer=legendContainer?.value?.querySelector("ul");return listContainer||(listContainer=document.createElement("ul"),listContainer.style.display="flex",listContainer.style.flexDirection=flexDirection,listContainer.style.margin="0",listContainer.style.padding="0",legendContainer.value?.appendChild(listContainer)),listContainer}createHtmlLegendListElement(chart,selectMode,elementIndex){const li=document.createElement("li");return li.style.alignItems="center",li.style.cursor=selectMode.value?"":"pointer",li.style.display="flex",li.style.flexDirection="row",li.setAttribute("data-test-id",`legend-item-${elementIndex}`),li.onclick=()=>{selectMode.value?this.switchItemVisibility(chart,elementIndex,selectMode):(this.hideAllButThis(chart,elementIndex,selectMode),chart.update())},li}hideAllButThis(chart,elementIndex,selectMode){if(!selectMode.value){const dataSets=this.getChartsData(chart);selectMode.next(!0),dataSets.forEach(((_data,index)=>{index!==elementIndex&&this.switchItemVisibility(chart,index)}))}}switchItemVisibility(chart,elementIndex,selectMode){this.isMonoDataSetChart(chart)?chart.toggleDataVisibility(elementIndex):chart.setDatasetVisibility(elementIndex,!chart.isDatasetVisible(elementIndex)),selectMode&&this.allDataVisible(chart)&&selectMode.next(!1),chart.update()}createLegendElementWithPatterns(item,chart,onHoverIndex,disableAccessibility,patternsColors,patternsList,enableHoverFeature){const isDoughnut="doughnut"===chart.config.type,index=isDoughnut?item.index:item.datasetIndex,img=new Image,boxSpan=this.createHtmlLegendLine(item,chart.config.type),pattern=patternsList[index](!1,patternsColors[index],disableAccessibility),patternCanvas=this.patternService.getPatternCanvas(pattern);return img.src=patternCanvas.toDataURL(),boxSpan.style.background=`url(${img.src})`,boxSpan.style.backgroundSize="cover",boxSpan.style.borderColor=patternsColors[index],boxSpan.style.borderWidth="2px",enableHoverFeature&&(boxSpan.onmouseover=()=>{isDoughnut?onHoverIndex.next(index):onHoverIndex.next({...onHoverIndex.value,dataSetIndex:index})},boxSpan.onmouseleave=()=>{onHoverIndex.next(null)}),boxSpan}createHtmlLegendLine(item,type){const boxSpan=document.createElement("div");return"doughnut"!==type&&(boxSpan.style.background="rgba(0, 0, 0, 0.1)",boxSpan.style.borderColor=item.strokeStyle,boxSpan.style.borderWidth="2px"),boxSpan.style.borderRadius="5px",boxSpan.style.borderStyle="solid",boxSpan.style.display="flex",boxSpan.style.justifyContent="center",boxSpan.style.alignItems="center",boxSpan.style.minWidth="22px",boxSpan.style.marginRight="6px",boxSpan.style.minHeight="22px",boxSpan}createLegendElementWithCheckbox(chart,item,selectMode,onHoverIndex,patternsColors,enableHoverFeature){const isDoughnut="doughnut"===chart.config.type,index=isDoughnut?item.index:item.datasetIndex,checkbox=this.createLegendCheckbox(chart,item,patternsColors),allCheckBoxesVisible=chart.config.data.labels.every(((_,index)=>chart.getDataVisibility(index)));return allCheckBoxesVisible?(isDoughnut&&(selectMode.next(!1),onHoverIndex.next(-1)),checkbox):(enableHoverFeature&&(checkbox.onmouseover=()=>{isDoughnut?onHoverIndex.next(index):onHoverIndex.next({...onHoverIndex.value,dataSetIndex:index}),chart.update()},checkbox.onmouseleave=()=>{isDoughnut?onHoverIndex.next(null):onHoverIndex.next({...onHoverIndex.value,dataSetIndex:-1}),chart.update()}),checkbox)}createLegendCheckbox(chart,item,patternsColors){const index="doughnut"===chart.config.type?item.index:item.datasetIndex,checkbox=document.createElement("input");checkbox.setAttribute("type","checkbox"),checkbox.setAttribute("data-test-id",`legend-checkbox-${index}`);const isDataSetVisible=this.isChartDataVisible(chart,index),patternColor=patternsColors?patternsColors[index]:void 0;return this.addCheckboxStyle(isDataSetVisible,item,checkbox,patternColor),checkbox}addCheckboxStyle(isDataSetVisible,item,checkbox,patternColor){let backgroundColor="#fff",borderColor="#666";isDataSetVisible&&(backgroundColor=this.isDefaultWhiteColor(item.strokeStyle)?patternColor:item.strokeStyle,borderColor=this.isDefaultWhiteColor(item.strokeStyle)?patternColor:item.strokeStyle,checkbox.setAttribute("checked",""+isDataSetVisible)),checkbox.setAttribute("class","mc-checkbox__input"),checkbox.setAttribute("style",`background-color: ${backgroundColor};\n      min-width: 22px;\n      min-height: 22px;\n      margin-right: 6px;\n      border-color: ${borderColor};`)}createHtmlLegendItemText(item){const textContainer=document.createElement("p");textContainer.style.color=item.fontColor,textContainer.style.fontSize="14px",textContainer.style.margin="0",textContainer.style.padding="0";const text=document.createTextNode(item.text);return textContainer.appendChild(text),textContainer}createTooltipAndItsIcon(doughnutData,maxValueToDisplay){const iconTopWrapper=document.createElement("div"),iconWrapper=document.createElement("div"),icon=document.createElement("img");iconTopWrapper.style.position="absolute",iconTopWrapper.style.right="-32px",icon.src="src/assets/icons/Navigation_Notification_Question_24px.svg",icon.style.top="0",icon.style.width="1.5rem",icon.style.filter="invert(38%) sepia(19%) saturate(18%) hue-rotate(337deg) brightness(97%) contrast(85%)",iconWrapper.style.position="relative",iconWrapper.style.display="flex";const tooltip=this.createLegendOthersTooltip(doughnutData,maxValueToDisplay);return icon.onmouseover=()=>{iconWrapper.firstElementChild.style.visibility="visible"},icon.onmouseleave=()=>{iconWrapper.firstElementChild.style.visibility="hidden"},iconTopWrapper.appendChild(iconWrapper),iconWrapper.appendChild(tooltip),iconWrapper.appendChild(icon),iconTopWrapper}createLegendOthersTooltip(doughnutData,maxValueToDisplay){const tooltip=document.createElement("div");return tooltip.style.visibility="hidden",tooltip.style.position="absolute",tooltip.style.zIndex="10",tooltip.style.width="350px",tooltip.style.bottom="100%",tooltip.style.left="50%",tooltip.style.marginLeft="-150px",tooltip.style.background="#FFFFFF",tooltip.style.boxShadow="0px 1px 5px rgba(0, 0, 0, 0.2)",tooltip.style.borderRadius="0.5rem",tooltip.style.fontSize="14px",tooltip.style.overflow="hidden",this.addOthersTooltipLines(doughnutData,maxValueToDisplay,tooltip),tooltip}addOthersTooltipLines(doughnutData,maxValueToDisplay,tooltip){const startIndex=maxValueToDisplay-1;doughnutData.data.slice(startIndex).forEach(((_ignore,index)=>{const dataIndex=startIndex+index,textWrapper=document.createElement("div");textWrapper.style.display="flex",textWrapper.style.justifyContent="space-between",textWrapper.style.padding="0.5rem",textWrapper.style.border="1px solid #CCCCCC";const label=document.createElement("span");label.appendChild(document.createTextNode(doughnutData.labels[dataIndex]));const value=document.createElement("span");value.appendChild(document.createTextNode(this.formatUtilitiesService.formatValueAndRate(doughnutData,dataIndex))),textWrapper.appendChild(label),textWrapper.appendChild(value),tooltip.appendChild(textWrapper)}))}getChartsData(chart){let dataSets=chart.config.data.datasets;return this.isMonoDataSetChart(chart)&&(dataSets=chart.config.data.datasets[0].data),dataSets}isMonoDataSetChart(chart){const{type}=chart.config;return"pie"===type||"doughnut"===type}allDataVisible(chart){let allVisible=!0;return this.getChartsData(chart).forEach(((_data,dataIndex)=>{allVisible=allVisible&&this.isChartDataVisible(chart,dataIndex)})),allVisible}isChartDataVisible(chart,dataIndex){return this.isMonoDataSetChart(chart)?chart.getDataVisibility(dataIndex):chart.isDatasetVisible(dataIndex)}isDefaultWhiteColor(color){return"#00000000"===color}static ctorParameters=()=>[{type:_pattern_service__WEBPACK_IMPORTED_MODULE_0__.s},{type:_format_utilities_service__WEBPACK_IMPORTED_MODULE_1__.D}]};ChartLegendService=(0,tslib__WEBPACK_IMPORTED_MODULE_2__.Cg)([(0,_angular_core__WEBPACK_IMPORTED_MODULE_3__.Injectable)({providedIn:"root"})],ChartLegendService)},"./src/services/color-function.service.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{S:()=>ColorFunctionsService});var tslib__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/tslib/tslib.es6.mjs"),_angular_core__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./node_modules/@angular/core/fesm2022/core.mjs");let ColorFunctionsService=class ColorFunctionsService{constructor(){}addAlpha(color,opacity){return color+Math.round(255*Math.min(Math.max(opacity||1,0),1)).toString(16).toUpperCase()}static ctorParameters=()=>[]};ColorFunctionsService=(0,tslib__WEBPACK_IMPORTED_MODULE_0__.Cg)([(0,_angular_core__WEBPACK_IMPORTED_MODULE_1__.Injectable)({providedIn:"root"})],ColorFunctionsService)},"./src/services/format-utilities.service.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{D:()=>FormatUtilitiesService});var tslib__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/tslib/tslib.es6.mjs"),_angular_core__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./node_modules/@angular/core/fesm2022/core.mjs");let FormatUtilitiesService=class FormatUtilitiesService{formatTicks(val,unit){const fixedValue=parseInt(val.toFixed());return`${(new Intl.NumberFormat).format(fixedValue)}${unit?" "+unit:""}`}formatWithThousandsSeparators(value){return Math.abs(Number(value))>=1e6?this.formatDecimalNumber(value/1e6)+" M":Math.abs(Number(value))>=1e3?this.formatDecimalNumber(value/1e3)+" K":this.formatDecimalNumber(value)}numberWithThousandSeparators(value,unit){const formattedValue=parseFloat(value).toFixed(2).replace(/\B(?=(\d{3}){1,5}(?!\d))/g," ");return unit?formattedValue+" "+unit:formattedValue}getPatternIndexWithShift(dataSetIndex,patternShifting){return patternShifting?(dataSetIndex+patternShifting)%6:dataSetIndex}formatValueAndRate(doughnutData,dataIndex){return`${this.formatWithThousandsSeparators(doughnutData.data[dataIndex].value)} (${this.formatWithThousandsSeparators(doughnutData.data[dataIndex].rate)}%)`}formatDecimalNumber(value){return new Intl.NumberFormat((new Intl.NumberFormat).resolvedOptions().locale,{style:"decimal",minimumFractionDigits:2,maximumFractionDigits:2}).format(value)}};FormatUtilitiesService=(0,tslib__WEBPACK_IMPORTED_MODULE_0__.Cg)([(0,_angular_core__WEBPACK_IMPORTED_MODULE_1__.Injectable)({providedIn:"root"})],FormatUtilitiesService)},"./src/services/generic-tooltip.service.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{w:()=>GenericTooltipService});var tslib__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./node_modules/tslib/tslib.es6.mjs"),_angular_core__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./node_modules/@angular/core/fesm2022/core.mjs"),_pattern_service__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./src/services/pattern.service.ts");let GenericTooltipService=class GenericTooltipService{patternService;chartType="";datasetIndex=0;dataIndex=0;titleLines=[""];dataToDisplay="";xValue="";yValue="";patternShifting=0;constructor(patternService){this.patternService=patternService}createTooltip(context,retrieveData,tooltipInputElements,patternsColors,patternsList,disableAccessibility=!1){if(!context.tooltip.dataPoints)return;this.datasetIndex=context.tooltip?.dataPoints[0].datasetIndex??0,this.dataIndex=context.tooltip.dataPoints[0].dataIndex??0,this.xValue=tooltipInputElements.firstLineLabel??"",this.yValue=tooltipInputElements.secondLineLabel??"",this.chartType=tooltipInputElements.chartType,this.dataToDisplay=retrieveData(context),this.patternShifting=tooltipInputElements.patternShifting??0;let tooltipEl=document.querySelector("#chartjs-tooltip");tooltipEl||(tooltipEl=this.createNewTooltipElement());const tooltipModel=context.tooltip;if(0!==tooltipModel.opacity){if(tooltipModel.body){this.titleLines=tooltipModel.title||[];const bodyLines=tooltipModel.body.map(this.getBody);let style="background: white;";style+="border-bottom: 1px solid #CCCCCC;",style+="border-radius: 5px;",style+="padding: 10px 20px";const innerHtml=`<div style="${style}" class="tooltipTitle">`,body="DOUGHNUT"===this.chartType?[tooltipModel.title[0].split("(")[0].trim()]:bodyLines[0];let legendIconStyle="",legendInnerStyle="";const datasetType=context.tooltip?.dataPoints[0]?.dataset?.type;"RADAR"===this.chartType||"LINE_CHART"===this.chartType?(legendIconStyle=this.createLegendStyle(context),legendInnerStyle=this.createLegendInnerStyle(context)):"BAR_CHART"===this.chartType||"DETAILS_BAR_CHART"===this.chartType||"DOUGHNUT"===this.chartType?legendIconStyle=this.createPatternLegendStyle(context):"MIXED_BAR_LINE_CHART"===this.chartType&&("bar"===datasetType?legendIconStyle=this.createPatternLegendStyle(context):(legendIconStyle=this.createLegendStyle(context),legendInnerStyle=this.createLegendInnerStyle(context))),this.addLegendToDom(innerHtml,legendIconStyle,legendInnerStyle,body,style,tooltipEl,patternsColors,patternsList,disableAccessibility,datasetType)}this.handleTooltipPosition(context,tooltipModel,tooltipEl)}else tooltipEl.style.opacity="0"}handleTooltipPosition(context,tooltipModel,tooltipEl){const position=context.chart.canvas.getBoundingClientRect(),screenWidth=window.innerWidth,left=position.left+window.scrollX+tooltipModel.caretX,top=position.top+window.scrollY+tooltipModel.caretY;tooltipEl.style.left=left+"px",tooltipEl.style.top=top+"px",tooltipEl.style.height="auto",tooltipEl.style.minWidth="17rem",tooltipEl.style.opacity="1",tooltipEl.style.position="absolute",tooltipEl.style.zIndex="99",tooltipEl.style.backgroundColor="white",tooltipEl.style.pointerEvents="none",tooltipEl.getBoundingClientRect().width+left>screenWidth&&(tooltipEl.style.left=left-tooltipEl.getBoundingClientRect().width+"px")}createNewTooltipElement(){const tooltipEl=document.createElement("div");return tooltipEl.id="chartjs-tooltip",tooltipEl.style.backgroundColor="white",tooltipEl.style.borderRadius="5px",tooltipEl.style.transition="opacity .5s",tooltipEl.style.boxShadow="0px 1px 5px rgba(0, 0, 0, 0.2)",tooltipEl.innerHTML='<div class="tooltipCtn"></div>',document.body.appendChild(tooltipEl),tooltipEl}createPatternLegendStyle(context){return this.createCommonLegendSquareStyle(context)}createLegendStyle(context){let legendIconStyle=`background-color:${context.tooltip.labelColors[0].backgroundColor}`;return legendIconStyle+=this.createCommonLegendSquareStyle(context),legendIconStyle}createCommonLegendSquareStyle(context){let style=`;border: 2px solid ${context.tooltip.labelColors[0].borderColor}`;return style+=";min-height: 20px",style+=";min-width: 20px",style+=";border-radius: 5px",style+=";margin-right: 10px",style+=";display: flex",style+=";align-items: center",style+=";justify-content: center",style+=";background: rgba(0, 0, 0, 0.1);",style}createLegendInnerStyle(context){let legendIconInnerStyle="height: 12px";return legendIconInnerStyle+=";width: 12px",legendIconInnerStyle+=";background-color: #FFF",legendIconInnerStyle+=`;border: 2px solid ${context.tooltip.labelColors[0].borderColor};`,"circle"===context.tooltip.labelPointStyles[0].pointStyle?legendIconInnerStyle+="border-radius: 25px;":"rectRot"===context.tooltip.labelPointStyles[0].pointStyle&&(legendIconInnerStyle+="transform: rotate(45deg);"),legendIconInnerStyle}addLegendToDom(innerHTMLtext,legendIconStyle,legendIconInnerStyle,body,style,tooltipEl,patternsColors,patternsList,disableAccessibility=!1,datasetType){let innerHtml=innerHTMLtext,legendImage=`<div class="legendIcon" style="${legendIconStyle}">`;legendImage+=`${`<div style="${legendIconInnerStyle}"></div>`}</div>`;innerHtml+=this.setInnerHtmlToAdd(body,style,legendImage);const tableRoot=tooltipEl?.querySelector(".tooltipCtn");null!=tableRoot?.innerHTML&&(datasetType?this.setInnerHtmlAndPattern(tableRoot,innerHtml,patternsColors,patternsList,disableAccessibility,datasetType):this.setInnerHtmlAndPattern(tableRoot,innerHtml,patternsColors,patternsList,disableAccessibility))}setInnerHtmlToAdd(body,style,legendImage){const spanText=`<span style="font-family: Arial; font-size: 16px">${body[0].split(":")[0]}</span>`;return"RADAR"===this.chartType?this.returnRadarHtml(style,legendImage,spanText):"DOUGHNUT"===this.chartType?this.returnDoughnutHtml(legendImage,spanText):this.returnDetailsBarchartHtml(style,legendImage,spanText)}returnDoughnutHtml(legendImage,spanText){const fontProperties="font-family: Arial; font-size: 16px";let doughnutHtml=`<div style="${fontProperties}; display: flex; align-items: center; justify-content: space-between">`;return doughnutHtml+=`<div style="display:flex; align-items: center;" >${legendImage+`<span style="${fontProperties}">${spanText.split("(")[0]}</span>`}</div>`,doughnutHtml+=`<div style="${fontProperties}; margin-left:3rem;">${this.dataToDisplay}</div>`,doughnutHtml+="</div></div>",doughnutHtml}returnRadarHtml(style,legendImage,spanText){let radarHtml=`<div style="font-family: Arial; font-size: 16px; display: flex; align-items: center;">${legendImage+spanText}</div>`;return radarHtml+="</div>",radarHtml+=`<div style="font-family: Arial; font-size: 16px; ${style}; border: none; display:flex; justify-content: space-between;">`,radarHtml+=`<div>${this.titleLines[0]}</div>`,radarHtml+=`<div style="margin-left: 20px;">${this.dataToDisplay}</div>`,radarHtml+="</div>",radarHtml+="</div><div>",radarHtml}returnDetailsBarchartHtml(style,legendImage,spanText){const fontProperties="font-family: Arial; font-size: 16px";let barChartHtml=`<div style="${fontProperties}; display: flex; align-items: center;">${legendImage+spanText}</div>`;return barChartHtml+="</div>",barChartHtml+=`<div style="${fontProperties}; ${style}; display:flex; justify-content: space-between;">`,barChartHtml+=`<div>${this.xValue}</div>`,barChartHtml+=`<div style="margin-left: 20px;">${this.titleLines[0]}</div>`,barChartHtml+="</div>",barChartHtml+=`<div style="${fontProperties}; ${style}; border-: none; display:flex; justify-content: space-between;">`,barChartHtml+=`<div>${this.yValue}</div>`,barChartHtml+=`<div style="margin-left: 20px;">${this.dataToDisplay}</div>`,barChartHtml+="</div>",barChartHtml}setInnerHtmlAndPattern(tableRoot,innerHtml,patternsColors,patternsList,disableAccessibility=!1,datasetType){tableRoot.innerHTML=innerHtml;const legendIconHtml=document.querySelector(".legendIcon"),img=new Image;let index;index="DOUGHNUT"===this.chartType?this.dataIndex+1:this.datasetIndex+1;const patternIndex=this.patternService.getPatternIndexWithShift(index,this.patternShifting);if("LINE_CHART"!==this.chartType&&"RADAR"!==this.chartType&&"line"!==datasetType){const pattern=patternsList[patternIndex-1](!1,patternsColors[patternIndex-1],disableAccessibility),patternCanvas=this.patternService.getPatternCanvas(pattern,22,22);img.src=patternCanvas.toDataURL(),legendIconHtml.style.backgroundImage=`url(${img.src})`}}getBody(bodyItem){return bodyItem.lines}static ctorParameters=()=>[{type:_pattern_service__WEBPACK_IMPORTED_MODULE_0__.s}]};GenericTooltipService=(0,tslib__WEBPACK_IMPORTED_MODULE_1__.Cg)([(0,_angular_core__WEBPACK_IMPORTED_MODULE_2__.Injectable)({providedIn:"root"})],GenericTooltipService)},"./src/services/pattern.service.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{s:()=>PatternService});var tslib__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/tslib/tslib.es6.mjs"),_angular_core__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./node_modules/@angular/core/fesm2022/core.mjs");let PatternService=class PatternService{constructor(){}getPatternCanvas(pattern,width=50,height=50){const canvas=document.createElement("canvas"),ctx=canvas.getContext("2d");return ctx?(canvas.width=width,canvas.height=height,ctx.fillStyle=pattern,ctx.fillRect(0,0,width,height),canvas):canvas}getPatternIndexWithShift(dataSetIndex,patternShifting){return(patternShifting?dataSetIndex+patternShifting:dataSetIndex)%6}static ctorParameters=()=>[]};PatternService=(0,tslib__WEBPACK_IMPORTED_MODULE_0__.Cg)([(0,_angular_core__WEBPACK_IMPORTED_MODULE_1__.Injectable)({providedIn:"root"})],PatternService)},"./src/types/tooltip-chart-type.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{var TooltipChartType;__webpack_require__.d(__webpack_exports__,{Y:()=>TooltipChartType}),function(TooltipChartType){TooltipChartType.RADAR="RADAR",TooltipChartType.BAR_CHART="BAR_CHART",TooltipChartType.MIXED_BAR_LINE_CHART="MIXED_BAR_LINE_CHART",TooltipChartType.DETAILS_BAR_CHART="DETAILS_BAR_CHART",TooltipChartType.LINE_CHART="LINE_CHART",TooltipChartType.DOUGHNUT="DOUGHNUT"}(TooltipChartType||(TooltipChartType={}))}}]);