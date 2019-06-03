function init() {
    var w = 800;
    var h = 500;
    var padding = 50;
    var dataset;
    

    d3.csv("deaths_agegroup_roaduser.csv", function (d) {
        return {
            year: new Date(d.years, 0),
            drivergroup1: parseFloat(d.driver016),
            drivergroup2: parseFloat(d.driver1725),
            drivergroup3: parseFloat(d.driver2639),
            drivergroup4: parseFloat(d.driver4064),
            drivergroup5: parseFloat(d.driver6574),

            passgroup1: parseFloat(d.pass016),
            passgroup2: parseFloat(d.pass1725),
            passgroup3: parseFloat(d.pass2639),
            passgroup4: parseFloat(d.pass4064),
            passgroup5: parseFloat(d.pass6574),

            pedesgroup1: parseFloat(d.pedes016),
            pedesgroup2: parseFloat(d.pedes1725),
            pedesgroup3: parseFloat(d.pedes2639),
            pedesgroup4: parseFloat(d.pedes4064),
            pedesgroup5: parseFloat(d.pedes6574),

            motorgroup1: parseFloat(d.motor016),
            motorgroup2: parseFloat(d.motor1725),
            motorgroup3: parseFloat(d.motor2639),
            motorgroup4: parseFloat(d.motor4064),
            motorgroup5: parseFloat(d.motor6574),

            pedalgroup1: parseFloat(d.pedal016),
            pedalgroup2: parseFloat(d.pedal1725),
            pedalgroup3: parseFloat(d.pedal2639),
            pedalgroup4: parseFloat(d.pedal4064),
            pedalgroup5: parseFloat(d.pedal6574)





        }
    }).then(function (data) {
        dataset = data;
        linechart();


    }).catch(function (error) {
        console.log(error)

    })


    function linechart() {




        //create a xScale for the graph
        xScale = d3.scaleTime()
            .domain([
                d3.min(dataset, function (d) { return d.year; }),
                d3.max(dataset, function (d) { return d.year; })
            ])
            .range([padding, w - padding * 2]);

        //create a yScale for the graph
        yScale = d3.scaleLinear()
            .domain([0, d3.max(dataset, function (d) { return d.drivergroup4; })
            ])
            .range([h - padding, padding]);

        // create a x-axis
        var xAxis = d3.axisBottom()
            .ticks(10)
            .scale(xScale);

        // create a y-axis
        var yAxis = d3.axisLeft()
            .ticks(10)
            .scale(yScale);

        //create a svg
        var svg = d3.select("#chart")
            .attr("align", "center")
            .append("svg")
            .attr("width", w)
            .attr("height", h);

        svg.append("g")
            .attr("transform", "translate(0, " + (h - padding) + ")")
            .call(xAxis);

        svg.append("g")
            .attr("id", "y-axis")
            .attr("transform", "translate(" + padding + ",0)")
            .call(yAxis);

        //Name the X-axis
        svg.append("text")
            .attr("class", "xlabel")
            .attr("text-anchor", "end")
            .attr("x", w / 2)
            .attr("y", h - 10)
            .text("Years");


        //Name the Y-axis
        svg.append("text")
            .attr("class", "ylabel")
            .attr("text-anchor", "end")
            .attr("y", 7)
            .attr("dy", "0.4em")
            .attr("x", -250)
            .attr("transform", "rotate(-90)")
            .text("Road Accidents");

        //create lines for the data    
        line1 = d3.line()
            .x(function (d) { return xScale(d.year); })
            .y(function (d) { return yScale(d.drivergroup1); });

        line2 = d3.line()
            .x(function (d) { return xScale(d.year); })
            .y(function (d) { return yScale(d.drivergroup2); });

        line3 = d3.line()
            .x(function (d) { return xScale(d.year); })
            .y(function (d) { return yScale(d.drivergroup3); });

        line4 = d3.line()
            .x(function (d) { return xScale(d.year); })
            .y(function (d) { return yScale(d.drivergroup4); });

        line5 = d3.line()
            .x(function (d) { return xScale(d.year); })
            .y(function (d) { return yScale(d.drivergroup5); });


        //appends lines
        svg.append("path")
            .datum(dataset)
            .attr("class", "line1")
            .attr("d", line1);

        svg.append("path")
            .datum(dataset)
            .attr("class", "line2")
            .attr("d", line2);

        svg.append("path")
            .datum(dataset)
            .attr("class", "line3")
            .attr("d", line3);

        svg.append("path")
            .datum(dataset)
            .attr("class", "line4")
            .attr("d", line4);

        svg.append("path")
            .datum(dataset)
            .attr("class", "line5")
            .attr("d", line5);

            //function that to make the line graph transition
            function tweenDash() {
                var l = this.getTotalLength(),
                    i = d3.interpolateString("0," + l, l + "," + l);
                return function (t) { return i(t); };
            }


        //ratio button click event
        d3.select("#driver")
            .on("change", function () {

                d3.select("svg").remove();

                xScale = d3.scaleTime()
                    .domain([
                        d3.min(dataset, function (d) { return d.year; }),
                        d3.max(dataset, function (d) { return d.year; })
                    ])
                    .range([padding, w - padding * 2]);

                yScale = d3.scaleLinear()
                    .domain([0, d3.max(dataset, function (d) { return d.drivergroup4; })
                    ])
                    .range([h - padding, padding]);




                var xAxis = d3.axisBottom()
                    .ticks(10)
                    .scale(xScale);

                var yAxis = d3.axisLeft()
                    .ticks(10)
                    .scale(yScale);

                

                //create a svg
                var svg = d3.select("#chart")
                    .attr("align", "center")
                    .append("svg")
                    .attr("width", w)
                    .attr("height", h);

                svg.append("g")
                    .attr("transform", "translate(0, " + (h - padding) + ")")
                    .call(xAxis);

                svg.append("g")
                    .attr("id", "y-axis")
                    .attr("transform", "translate(" + padding + ",0)")
                    .transition()
                    .duration(750)
                    .call(yAxis);

                //Name the X-axis
                svg.append("text")
                    .attr("class", "xlabel")
                    .attr("text-anchor", "end")
                    .attr("x", w / 2)
                    .attr("y", h - 10)
                    .text("Years");


                //Name the Y-axis
                svg.append("text")
                    .attr("class", "ylabel")
                    .attr("text-anchor", "end")
                    .attr("y", 10)
                    .attr("dy", "0.4em")
                    .attr("x", -250)
                    .attr("transform", "rotate(-90)")
                    .text("Road Accidents");

                line1 = d3.line()
                    .x(function (d) { return xScale(d.year); })
                    .y(function (d) { return yScale(d.drivergroup1); });

                line2 = d3.line()
                    .x(function (d) { return xScale(d.year); })
                    .y(function (d) { return yScale(d.drivergroup2); });

                line3 = d3.line()
                    .x(function (d) { return xScale(d.year); })
                    .y(function (d) { return yScale(d.drivergroup3); });

                line4 = d3.line()
                    .x(function (d) { return xScale(d.year); })
                    .y(function (d) { return yScale(d.drivergroup4); });

                line5 = d3.line()
                    .x(function (d) { return xScale(d.year); })
                    .y(function (d) { return yScale(d.drivergroup5); });

                svg.append("path")
                    .datum(dataset)
                    .attr("class", "line1")
                    .attr("d", line1)
                    .transition()
                    .duration(1000)
                    .attrTween("stroke-dasharray",tweenDash);

                svg.append("path")
                    .datum(dataset)
                    .attr("class", "line2")
                    .attr("d", line2)
                    .transition()
                    .duration(1000)
                    .attrTween("stroke-dasharray",tweenDash);

                svg.append("path")
                    .datum(dataset)
                    .attr("class", "line3")
                    .attr("d", line3)
                    .transition()
                    .duration(1000)
                    .attrTween("stroke-dasharray",tweenDash);

                svg.append("path")
                    .datum(dataset)
                    .attr("class", "line4")
                    .attr("d", line4)
                    .transition()
                    .duration(1000)
                    .attrTween("stroke-dasharray",tweenDash);

                svg.append("path")
                    .datum(dataset)
                    .attr("class", "line5")
                    .attr("d", line5)
                    .transition()
                    .duration(1000)
                    .attrTween("stroke-dasharray",tweenDash);



            });


        d3.select("#passenger")
            .on("change", function () {

                d3.select("svg").remove();

                xScale = d3.scaleTime()
                    .domain([
                        d3.min(dataset, function (d) { return d.year; }),
                        d3.max(dataset, function (d) { return d.year; })
                    ])
                    .range([padding, w - padding * 2]);

                yScale = d3.scaleLinear()
                    .domain([0, d3.max(dataset, function (d) { return d.passgroup2; })
                    ])
                    .range([h - padding, padding]);




                var xAxis = d3.axisBottom()
                    .ticks(10)
                    .scale(xScale);

                var yAxis = d3.axisLeft()
                    .ticks(10)
                    .scale(yScale);

                

                //create a svg
                var svg = d3.select("#chart")
                    .attr("align", "center")
                    .append("svg")
                    .attr("width", w)
                    .attr("height", h);

                svg.append("g")
                    .attr("transform", "translate(0, " + (h - padding) + ")")
                    .call(xAxis);

                svg.append("g")
                    .attr("id", "y-axis")
                    .attr("transform", "translate(" + padding + ",0)")
                    .transition()
                    .duration(750)
                    .call(yAxis);

                //Name the X-axis
                svg.append("text")
                    .attr("class", "xlabel")
                    .attr("text-anchor", "end")
                    .attr("x", w / 2)
                    .attr("y", h - 10)
                    .text("Years");


                //Name the Y-axis
                svg.append("text")
                    .attr("class", "ylabel")
                    .attr("text-anchor", "end")
                    .attr("y", 10)
                    .attr("dy", "0.4em")
                    .attr("x", -250)
                    .attr("transform", "rotate(-90)")
                    .text("Road Accidents");

                line1 = d3.line()
                    .x(function (d) { return xScale(d.year); })
                    .y(function (d) { return yScale(d.passgroup1); });

                line2 = d3.line()
                    .x(function (d) { return xScale(d.year); })
                    .y(function (d) { return yScale(d.passgroup2); });

                line3 = d3.line()
                    .x(function (d) { return xScale(d.year); })
                    .y(function (d) { return yScale(d.passgroup3); });

                line4 = d3.line()
                    .x(function (d) { return xScale(d.year); })
                    .y(function (d) { return yScale(d.passgroup4); });

                line5 = d3.line()
                    .x(function (d) { return xScale(d.year); })
                    .y(function (d) { return yScale(d.passgroup5); });

                svg.append("path")
                    .datum(dataset)
                    .attr("class", "line1")
                    .attr("d", line1)
                    .transition()
                    .duration(1000)
                    .attrTween("stroke-dasharray",tweenDash);

                svg.append("path")
                    .datum(dataset)
                    .attr("class", "line2")
                    .attr("d", line2)
                    .transition()
                    .duration(1000)
                    .attrTween("stroke-dasharray",tweenDash);

                svg.append("path")
                    .datum(dataset)
                    .attr("class", "line3")
                    .attr("d", line3)
                    .transition()
                    .duration(1000)
                    .attrTween("stroke-dasharray",tweenDash);

                svg.append("path")
                    .datum(dataset)
                    .attr("class", "line4")
                    .attr("d", line4)
                    .transition()
                    .duration(1000)
                    .attrTween("stroke-dasharray",tweenDash);

                svg.append("path")
                    .datum(dataset)
                    .attr("class", "line5")
                    .attr("d", line5)
                    .transition()
                    .duration(1000)
                    .attrTween("stroke-dasharray",tweenDash);


            });

        d3.select("#pedestrian")
            .on("change", function () {

                d3.select("svg").remove();

                xScale = d3.scaleTime()
                    .domain([
                        d3.min(dataset, function (d) { return d.year; }),
                        d3.max(dataset, function (d) { return d.year; })
                    ])
                    .range([padding, w - padding * 2]);

                yScale = d3.scaleLinear()
                    .domain([0, d3.max(dataset, function (d) { return d.pedesgroup4; })
                    ])
                    .range([h - padding, padding]);




                var xAxis = d3.axisBottom()
                    .ticks(10)
                    .scale(xScale);

                var yAxis = d3.axisLeft()
                    .ticks(10)
                    .scale(yScale);

                

                //create a svg
                var svg = d3.select("#chart")
                    .attr("align", "center")
                    .append("svg")
                    .attr("width", w)
                    .attr("height", h);

                svg.append("g")
                    .attr("transform", "translate(0, " + (h - padding) + ")")
                    .call(xAxis);

                svg.append("g")
                    .attr("id", "y-axis")
                    .attr("transform", "translate(" + padding + ",0)")
                    .transition()
                    .duration(750)
                    .call(yAxis);

                //Name the X-axis
                svg.append("text")
                    .attr("class", "xlabel")
                    .attr("text-anchor", "end")
                    .attr("x", w / 2)
                    .attr("y", h - 10)
                    .text("Years");


                //Name the Y-axis
                svg.append("text")
                    .attr("class", "ylabel")
                    .attr("text-anchor", "end")
                    .attr("y", 10)
                    .attr("dy", "0.4em")
                    .attr("x", -250)
                    .attr("transform", "rotate(-90)")
                    .text("Road Accidents");

                line1 = d3.line()
                    .x(function (d) { return xScale(d.year); })
                    .y(function (d) { return yScale(d.pedesgroup1); });

                line2 = d3.line()
                    .x(function (d) { return xScale(d.year); })
                    .y(function (d) { return yScale(d.pedesgroup2); });

                line3 = d3.line()
                    .x(function (d) { return xScale(d.year); })
                    .y(function (d) { return yScale(d.pedesgroup3); });

                line4 = d3.line()
                    .x(function (d) { return xScale(d.year); })
                    .y(function (d) { return yScale(d.pedesgroup4); });

                line5 = d3.line()
                    .x(function (d) { return xScale(d.year); })
                    .y(function (d) { return yScale(d.pedesgroup5); });

                svg.append("path")
                    .datum(dataset)
                    .attr("class", "line1")
                    .attr("d", line1)
                    .transition()
                    .duration(1000)
                    .attrTween("stroke-dasharray",tweenDash);

                svg.append("path")
                    .datum(dataset)
                    .attr("class", "line2")
                    .attr("d", line2)
                    .transition()
                    .duration(1000)
                    .attrTween("stroke-dasharray",tweenDash);

                svg.append("path")
                    .datum(dataset)
                    .attr("class", "line3")
                    .attr("d", line3)
                    .transition()
                    .duration(1000)
                    .attrTween("stroke-dasharray",tweenDash);

                svg.append("path")
                    .datum(dataset)
                    .attr("class", "line4")
                    .attr("d", line4)
                    .transition()
                    .duration(1000)
                    .attrTween("stroke-dasharray",tweenDash);

                svg.append("path")
                    .datum(dataset)
                    .attr("class", "line5")
                    .attr("d", line5)
                    .transition()
                    .duration(1000)
                    .attrTween("stroke-dasharray",tweenDash);



            });


        d3.select("#motorcyclist")
            .on("change", function () {
                d3.select("svg").remove();

                xScale = d3.scaleTime()
                    .domain([
                        d3.min(dataset, function (d) { return d.year; }),
                        d3.max(dataset, function (d) { return d.year; })
                    ])
                    .range([padding, w - padding * 2]);

                yScale = d3.scaleLinear()
                    .domain([0, d3.max(dataset, function (d) { return d.motorgroup4; })
                    ])
                    .range([h - padding, padding]);




                var xAxis = d3.axisBottom()
                    .ticks(10)
                    .scale(xScale);

                var yAxis = d3.axisLeft()
                    .ticks(10)
                    .scale(yScale);

                

                //create a svg
                var svg = d3.select("#chart")
                    .attr("align", "center")
                    .append("svg")
                    .attr("width", w)
                    .attr("height", h);

                svg.append("g")
                    .attr("transform", "translate(0, " + (h - padding) + ")")
                    .call(xAxis);

                svg.append("g")
                    .attr("id", "y-axis")
                    .attr("transform", "translate(" + padding + ",0)")
                    .transition()
                    .duration(750)
                    .call(yAxis);

                //Name the X-axis
                svg.append("text")
                    .attr("class", "xlabel")
                    .attr("text-anchor", "end")
                    .attr("x", w / 2)
                    .attr("y", h - 10)
                    .text("Years");


                //Name the Y-axis
                svg.append("text")
                    .attr("class", "ylabel")
                    .attr("text-anchor", "end")
                    .attr("y", 10)
                    .attr("dy", "0.4em")
                    .attr("x", -250)
                    .attr("transform", "rotate(-90)")
                    .text("Road Accidents");

                line1 = d3.line()
                    .x(function (d) { return xScale(d.year); })
                    .y(function (d) { return yScale(d.motorgroup1); });

                line2 = d3.line()
                    .x(function (d) { return xScale(d.year); })
                    .y(function (d) { return yScale(d.motorgroup2); });

                line3 = d3.line()
                    .x(function (d) { return xScale(d.year); })
                    .y(function (d) { return yScale(d.motorgroup3); });

                line4 = d3.line()
                    .x(function (d) { return xScale(d.year); })
                    .y(function (d) { return yScale(d.motorgroup4); });

                line5 = d3.line()
                    .x(function (d) { return xScale(d.year); })
                    .y(function (d) { return yScale(d.motorgroup5); });

                svg.append("path")
                    .datum(dataset)
                    .attr("class", "line1")
                    .attr("d", line1)
                    .transition()
                    .duration(1000)
                    .attrTween("stroke-dasharray",tweenDash);

                svg.append("path")
                    .datum(dataset)
                    .attr("class", "line2")
                    .attr("d", line2)
                    .transition()
                    .duration(1000)
                    .attrTween("stroke-dasharray",tweenDash);

                svg.append("path")
                    .datum(dataset)
                    .attr("class", "line3")
                    .attr("d", line3)
                    .transition()
                    .duration(1000)
                    .attrTween("stroke-dasharray",tweenDash);

                svg.append("path")
                    .datum(dataset)
                    .attr("class", "line4")
                    .attr("d", line4)
                    .transition()
                    .duration(1000)
                    .attrTween("stroke-dasharray",tweenDash);

                svg.append("path")
                    .datum(dataset)
                    .attr("class", "line5")
                    .attr("d", line5)
                    .transition()
                    .duration(1000)
                    .attrTween("stroke-dasharray",tweenDash);


            });





           

        d3.select("#pedal_cyclist")
            .on("change", function () {

               d3.select("svg").remove();

                xScale = d3.scaleTime()
                    .domain([
                        d3.min(dataset, function (d) { return d.year; }),
                        d3.max(dataset, function (d) { return d.year; })
                    ])
                    .range([padding, w - padding * 2]);

                yScale = d3.scaleLinear()
                    .domain([0, d3.max(dataset, function (d) { return d.pedalgroup4; })
                    ])
                    .range([h - padding, padding]);




                var xAxis = d3.axisBottom()
                    .ticks(10)
                    .scale(xScale);

                var yAxis = d3.axisLeft()
                    .ticks(10)
                    .scale(yScale);

                

                //create a svg
                var svg = d3.select("#chart")
                    .attr("align", "center")
                    .append("svg")
                    .attr("width", w)
                    .attr("height", h);

                svg.append("g")
                    .attr("transform", "translate(0, " + (h - padding) + ")")
                    .call(xAxis);

                svg.append("g")
                    .attr("id", "y-axis")
                    .attr("transform", "translate(" + padding + ",0)")
                    .transition()
                    .duration(750)
                    .call(yAxis);

                //Name the X-axis
                svg.append("text")
                    .attr("class", "xlabel")
                    .attr("text-anchor", "end")
                    .attr("x", w / 2)
                    .attr("y", h - 10)
                    .text("Years");


                //Name the Y-axis
                svg.append("text")
                    .attr("class", "ylabel")
                    .attr("text-anchor", "end")
                    .attr("y", 7)
                    .attr("dy", "0.4em")
                    .attr("x", -250)
                    .attr("transform", "rotate(-90)")
                    .text("Road Accidents");

                line1 = d3.line()
                    .x(function (d) { return xScale(d.year); })
                    .y(function (d) { return yScale(d.pedalgroup1); });

                line2 = d3.line()
                    .x(function (d) { return xScale(d.year); })
                    .y(function (d) { return yScale(d.pedalgroup2); });

                line3 = d3.line()
                    .x(function (d) { return xScale(d.year); })
                    .y(function (d) { return yScale(d.pedalgroup3); });

                line4 = d3.line()
                    .x(function (d) { return xScale(d.year); })
                    .y(function (d) { return yScale(d.pedalgroup4); });

                line5 = d3.line()
                    .x(function (d) { return xScale(d.year); })
                    .y(function (d) { return yScale(d.pedalgroup5); });

                svg.append("path")
                    .datum(dataset)
                    .attr("class", "line1")
                    .attr("d", line1)
                    .transition()
                    .duration(1000)
                    .attrTween("stroke-dasharray",tweenDash);

                svg.append("path")
                    .datum(dataset)
                    .attr("class", "line2")
                    .attr("d", line2)
                    .transition()
                    .duration(1000)
                    .attrTween("stroke-dasharray",tweenDash);

                svg.append("path")
                    .datum(dataset)
                    .attr("class", "line3")
                    .attr("d", line3)
                    .transition()
                    .duration(1000)
                    .attrTween("stroke-dasharray",tweenDash);

                svg.append("path")
                    .datum(dataset)
                    .attr("class", "line4")
                    .attr("d", line4)
                    .transition()
                    .duration(1000)
                    .attrTween("stroke-dasharray",tweenDash);

                svg.append("path")
                    .datum(dataset)
                    .attr("class", "line5")
                    .attr("d", line5)
                    .transition()
                    .duration(1000)
                    .attrTween("stroke-dasharray",tweenDash);


            });











    }




}
window.onload = init;