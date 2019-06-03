function init() {
    var w = 800;
    var h = 500;
    var padding = 50;
    var dataset;

    d3.csv("deaths_agegroup_states.csv", function (d) {
        return {
            year: new Date(d.years, 0),
            nswgroup1: parseFloat(d.nsw016),
            nswgroup2: parseFloat(d.nsw1725),
            nswgroup3: parseFloat(d.nsw2639),
            nswgroup4: parseFloat(d.nsw4064),
            nswgroup5: parseFloat(d.nsw6574),

            vicgroup1: parseFloat(d.vic016),
            vicgroup2: parseFloat(d.vic1725),
            vicgroup3: parseFloat(d.vic2639),
            vicgroup4: parseFloat(d.vic4064),
            vicgroup5: parseFloat(d.vic6574),

            qldgroup1: parseFloat(d.qld016),
            qldgroup2: parseFloat(d.qld1725),
            qldgroup3: parseFloat(d.qld2639),
            qldgroup4: parseFloat(d.qld4064),
            qldgroup5: parseFloat(d.qld6574),

            sagroup1: parseFloat(d.sa016),
            sagroup2: parseFloat(d.sa1725),
            sagroup3: parseFloat(d.sa2639),
            sagroup4: parseFloat(d.sa4064),
            sagroup5: parseFloat(d.sa6574),


            wagroup1: parseFloat(d.wa016),
            wagroup2: parseFloat(d.wa1725),
            wagroup3: parseFloat(d.wa2639),
            wagroup4: parseFloat(d.wa4064),
            wagroup5: parseFloat(d.wa6574),

            tasgroup1: parseFloat(d.tas016),
            tasgroup2: parseFloat(d.tas1725),
            tasgroup3: parseFloat(d.tas2639),
            tasgroup4: parseFloat(d.tas4064),
            tasgroup5: parseFloat(d.tas6574),

            ntgroup1: parseFloat(d.nt016),
            ntgroup2: parseFloat(d.nt1725),
            ntgroup3: parseFloat(d.nt2639),
            ntgroup4: parseFloat(d.nt4064),
            ntgroup5: parseFloat(d.nt6574),

            actgroup1: parseFloat(d.act016),
            actgroup2: parseFloat(d.act1725),
            actgroup3: parseFloat(d.act2639),
            actgroup4: parseFloat(d.act4064),
            actgroup5: parseFloat(d.act6474)








        }
    }).then(function (data) {
        dataset = data;
        linechart();


    }).catch(function (error) {
        console.log(error)

    })

    function linechart() {

        xScale = d3.scaleTime()
            .domain([
                d3.min(dataset, function (d) { return d.year; }),
                d3.max(dataset, function (d) { return d.year; })
            ])
            .range([padding, w - padding * 2]);

        //create a yScale for the graph
        yScale = d3.scaleLinear()
            .domain([0, d3.max(dataset, function (d) { return d.nswgroup4; })
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
            .y(function (d) { return yScale(d.nswgroup1); });

        line2 = d3.line()
            .x(function (d) { return xScale(d.year); })
            .y(function (d) { return yScale(d.nswgroup2); });

        line3 = d3.line()
            .x(function (d) { return xScale(d.year); })
            .y(function (d) { return yScale(d.nswgroup3); });

        line4 = d3.line()
            .x(function (d) { return xScale(d.year); })
            .y(function (d) { return yScale(d.nswgroup4); });

        line5 = d3.line()
            .x(function (d) { return xScale(d.year); })
            .y(function (d) { return yScale(d.nswgroup5); });

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

        d3.select("#nsw")
            .on("change", function () {
                d3.select("svg").remove();
                xScale = d3.scaleTime()
                    .domain([
                        d3.min(dataset, function (d) { return d.year; }),
                        d3.max(dataset, function (d) { return d.year; })
                    ])
                    .range([padding, w - padding * 2]);

                //create a yScale for the graph
                yScale = d3.scaleLinear()
                    .domain([0, d3.max(dataset, function (d) { return d.nswgroup4; })
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


                //create lines for the data    
                line1 = d3.line()
                    .x(function (d) { return xScale(d.year); })
                    .y(function (d) { return yScale(d.nswgroup1); });

                line2 = d3.line()
                    .x(function (d) { return xScale(d.year); })
                    .y(function (d) { return yScale(d.nswgroup2); });

                line3 = d3.line()
                    .x(function (d) { return xScale(d.year); })
                    .y(function (d) { return yScale(d.nswgroup3); });

                line4 = d3.line()
                    .x(function (d) { return xScale(d.year); })
                    .y(function (d) { return yScale(d.nswgroup4); });

                line5 = d3.line()
                    .x(function (d) { return xScale(d.year); })
                    .y(function (d) { return yScale(d.nswgroup5); });

                //appends lines
                svg.append("path")
                    .datum(dataset)
                    .attr("class", "line1")
                    .attr("d", line1)
                    .transition()
                    .duration(1000)
                    .attrTween("stroke-dasharray", tweenDash);

                svg.append("path")
                    .datum(dataset)
                    .attr("class", "line2")
                    .attr("d", line2)
                    .transition()
                    .duration(1000)
                    .attrTween("stroke-dasharray", tweenDash);

                svg.append("path")
                    .datum(dataset)
                    .attr("class", "line3")
                    .attr("d", line3)
                    .transition()
                    .duration(1000)
                    .attrTween("stroke-dasharray", tweenDash);

                svg.append("path")
                    .datum(dataset)
                    .attr("class", "line4")
                    .attr("d", line4)
                    .transition()
                    .duration(1000)
                    .attrTween("stroke-dasharray", tweenDash);

                svg.append("path")
                    .datum(dataset)
                    .attr("class", "line5")
                    .attr("d", line5)
                    .transition()
                    .duration(1000)
                    .attrTween("stroke-dasharray", tweenDash);


            });

        d3.select("#vic")
            .on("change", function () {
                d3.select("svg").remove();
                xScale = d3.scaleTime()
                    .domain([
                        d3.min(dataset, function (d) { return d.year; }),
                        d3.max(dataset, function (d) { return d.year; })
                    ])
                    .range([padding, w - padding * 2]);

                //create a yScale for the graph
                yScale = d3.scaleLinear()
                    .domain([0, d3.max(dataset, function (d) { return d.vicgroup4; })
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


                //create lines for the data    
                line1 = d3.line()
                    .x(function (d) { return xScale(d.year); })
                    .y(function (d) { return yScale(d.vicgroup1); });

                line2 = d3.line()
                    .x(function (d) { return xScale(d.year); })
                    .y(function (d) { return yScale(d.vicgroup2); });

                line3 = d3.line()
                    .x(function (d) { return xScale(d.year); })
                    .y(function (d) { return yScale(d.vicgroup3); });

                line4 = d3.line()
                    .x(function (d) { return xScale(d.year); })
                    .y(function (d) { return yScale(d.vicgroup4); });

                line5 = d3.line()
                    .x(function (d) { return xScale(d.year); })
                    .y(function (d) { return yScale(d.vicgroup5); });

                //appends lines
                svg.append("path")
                    .datum(dataset)
                    .attr("class", "line1")
                    .attr("d", line1)
                    .transition()
                    .duration(1000)
                    .attrTween("stroke-dasharray", tweenDash);

                svg.append("path")
                    .datum(dataset)
                    .attr("class", "line2")
                    .attr("d", line2)
                    .transition()
                    .duration(1000)
                    .attrTween("stroke-dasharray", tweenDash);

                svg.append("path")
                    .datum(dataset)
                    .attr("class", "line3")
                    .attr("d", line3)
                    .transition()
                    .duration(1000)
                    .attrTween("stroke-dasharray", tweenDash);

                svg.append("path")
                    .datum(dataset)
                    .attr("class", "line4")
                    .attr("d", line4)
                    .transition()
                    .duration(1000)
                    .attrTween("stroke-dasharray", tweenDash);

                svg.append("path")
                    .datum(dataset)
                    .attr("class", "line5")
                    .attr("d", line5)
                    .transition()
                    .duration(1000)
                    .attrTween("stroke-dasharray", tweenDash);



            });



            d3.select("#qld")
            .on("change", function () {
                d3.select("svg").remove();
                xScale = d3.scaleTime()
                    .domain([
                        d3.min(dataset, function (d) { return d.year; }),
                        d3.max(dataset, function (d) { return d.year; })
                    ])
                    .range([padding, w - padding * 2]);

                //create a yScale for the graph
                yScale = d3.scaleLinear()
                    .domain([0, d3.max(dataset, function (d) { return d.qldgroup4; })
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


                //create lines for the data    
                line1 = d3.line()
                    .x(function (d) { return xScale(d.year); })
                    .y(function (d) { return yScale(d.qldgroup1); });

                line2 = d3.line()
                    .x(function (d) { return xScale(d.year); })
                    .y(function (d) { return yScale(d.qldgroup2); });

                line3 = d3.line()
                    .x(function (d) { return xScale(d.year); })
                    .y(function (d) { return yScale(d.qldgroup3); });

                line4 = d3.line()
                    .x(function (d) { return xScale(d.year); })
                    .y(function (d) { return yScale(d.qldgroup4); });

                line5 = d3.line()
                    .x(function (d) { return xScale(d.year); })
                    .y(function (d) { return yScale(d.qldgroup5); });

                //appends lines
                svg.append("path")
                    .datum(dataset)
                    .attr("class", "line1")
                    .attr("d", line1)
                    .transition()
                    .duration(1000)
                    .attrTween("stroke-dasharray", tweenDash);

                svg.append("path")
                    .datum(dataset)
                    .attr("class", "line2")
                    .attr("d", line2)
                    .transition()
                    .duration(1000)
                    .attrTween("stroke-dasharray", tweenDash);

                svg.append("path")
                    .datum(dataset)
                    .attr("class", "line3")
                    .attr("d", line3)
                    .transition()
                    .duration(1000)
                    .attrTween("stroke-dasharray", tweenDash);

                svg.append("path")
                    .datum(dataset)
                    .attr("class", "line4")
                    .attr("d", line4)
                    .transition()
                    .duration(1000)
                    .attrTween("stroke-dasharray", tweenDash);

                svg.append("path")
                    .datum(dataset)
                    .attr("class", "line5")
                    .attr("d", line5)
                    .transition()
                    .duration(1000)
                    .attrTween("stroke-dasharray", tweenDash);



            });

            d3.select("#sa")
            .on("change", function () {
                d3.select("svg").remove();
                xScale = d3.scaleTime()
                    .domain([
                        d3.min(dataset, function (d) { return d.year; }),
                        d3.max(dataset, function (d) { return d.year; })
                    ])
                    .range([padding, w - padding * 2]);

                //create a yScale for the graph
                yScale = d3.scaleLinear()
                    .domain([0, d3.max(dataset, function (d) { return d.sagroup2; })
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


                //create lines for the data    
                line1 = d3.line()
                    .x(function (d) { return xScale(d.year); })
                    .y(function (d) { return yScale(d.sagroup1); });

                line2 = d3.line()
                    .x(function (d) { return xScale(d.year); })
                    .y(function (d) { return yScale(d.sagroup2); });

                line3 = d3.line()
                    .x(function (d) { return xScale(d.year); })
                    .y(function (d) { return yScale(d.sagroup3); });

                line4 = d3.line()
                    .x(function (d) { return xScale(d.year); })
                    .y(function (d) { return yScale(d.sagroup4); });

                line5 = d3.line()
                    .x(function (d) { return xScale(d.year); })
                    .y(function (d) { return yScale(d.sagroup5); });

                //appends lines
                svg.append("path")
                    .datum(dataset)
                    .attr("class", "line1")
                    .attr("d", line1)
                    .transition()
                    .duration(1000)
                    .attrTween("stroke-dasharray", tweenDash);

                svg.append("path")
                    .datum(dataset)
                    .attr("class", "line2")
                    .attr("d", line2)
                    .transition()
                    .duration(1000)
                    .attrTween("stroke-dasharray", tweenDash);

                svg.append("path")
                    .datum(dataset)
                    .attr("class", "line3")
                    .attr("d", line3)
                    .transition()
                    .duration(1000)
                    .attrTween("stroke-dasharray", tweenDash);

                svg.append("path")
                    .datum(dataset)
                    .attr("class", "line4")
                    .attr("d", line4)
                    .transition()
                    .duration(1000)
                    .attrTween("stroke-dasharray", tweenDash);

                svg.append("path")
                    .datum(dataset)
                    .attr("class", "line5")
                    .attr("d", line5)
                    .transition()
                    .duration(1000)
                    .attrTween("stroke-dasharray", tweenDash);



            });

            d3.select("#wa")
            .on("change", function () {
                d3.select("svg").remove();
                xScale = d3.scaleTime()
                    .domain([
                        d3.min(dataset, function (d) { return d.year; }),
                        d3.max(dataset, function (d) { return d.year; })
                    ])
                    .range([padding, w - padding * 2]);

                //create a yScale for the graph
                yScale = d3.scaleLinear()
                    .domain([0, d3.max(dataset, function (d) { return d.wagroup3; })
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


                //create lines for the data    
                line1 = d3.line()
                    .x(function (d) { return xScale(d.year); })
                    .y(function (d) { return yScale(d.wagroup1); });

                line2 = d3.line()
                    .x(function (d) { return xScale(d.year); })
                    .y(function (d) { return yScale(d.wagroup2); });

                line3 = d3.line()
                    .x(function (d) { return xScale(d.year); })
                    .y(function (d) { return yScale(d.wagroup3); });

                line4 = d3.line()
                    .x(function (d) { return xScale(d.year); })
                    .y(function (d) { return yScale(d.wagroup4); });

                line5 = d3.line()
                    .x(function (d) { return xScale(d.year); })
                    .y(function (d) { return yScale(d.wagroup5); });

                //appends lines
                svg.append("path")
                    .datum(dataset)
                    .attr("class", "line1")
                    .attr("d", line1)
                    .transition()
                    .duration(1000)
                    .attrTween("stroke-dasharray", tweenDash);

                svg.append("path")
                    .datum(dataset)
                    .attr("class", "line2")
                    .attr("d", line2)
                    .transition()
                    .duration(1000)
                    .attrTween("stroke-dasharray", tweenDash);

                svg.append("path")
                    .datum(dataset)
                    .attr("class", "line3")
                    .attr("d", line3)
                    .transition()
                    .duration(1000)
                    .attrTween("stroke-dasharray", tweenDash);

                svg.append("path")
                    .datum(dataset)
                    .attr("class", "line4")
                    .attr("d", line4)
                    .transition()
                    .duration(1000)
                    .attrTween("stroke-dasharray", tweenDash);

                svg.append("path")
                    .datum(dataset)
                    .attr("class", "line5")
                    .attr("d", line5)
                    .transition()
                    .duration(1000)
                    .attrTween("stroke-dasharray", tweenDash);



            });

            d3.select("#tas")
            .on("change", function () {
                d3.select("svg").remove();
                xScale = d3.scaleTime()
                    .domain([
                        d3.min(dataset, function (d) { return d.year; }),
                        d3.max(dataset, function (d) { return d.year; })
                    ])
                    .range([padding, w - padding * 2]);

                //create a yScale for the graph
                yScale = d3.scaleLinear()
                    .domain([0, d3.max(dataset, function (d) { return d.tasgroup4; })
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


                //create lines for the data    
                line1 = d3.line()
                    .x(function (d) { return xScale(d.year); })
                    .y(function (d) { return yScale(d.tasgroup1); });

                line2 = d3.line()
                    .x(function (d) { return xScale(d.year); })
                    .y(function (d) { return yScale(d.tasgroup2); });

                line3 = d3.line()
                    .x(function (d) { return xScale(d.year); })
                    .y(function (d) { return yScale(d.tasgroup3); });

                line4 = d3.line()
                    .x(function (d) { return xScale(d.year); })
                    .y(function (d) { return yScale(d.tasgroup4); });

                line5 = d3.line()
                    .x(function (d) { return xScale(d.year); })
                    .y(function (d) { return yScale(d.tasgroup5); });

                //appends lines
                svg.append("path")
                    .datum(dataset)
                    .attr("class", "line1")
                    .attr("d", line1)
                    .transition()
                    .duration(1000)
                    .attrTween("stroke-dasharray", tweenDash);

                svg.append("path")
                    .datum(dataset)
                    .attr("class", "line2")
                    .attr("d", line2)
                    .transition()
                    .duration(1000)
                    .attrTween("stroke-dasharray", tweenDash);

                svg.append("path")
                    .datum(dataset)
                    .attr("class", "line3")
                    .attr("d", line3)
                    .transition()
                    .duration(1000)
                    .attrTween("stroke-dasharray", tweenDash);

                svg.append("path")
                    .datum(dataset)
                    .attr("class", "line4")
                    .attr("d", line4)
                    .transition()
                    .duration(1000)
                    .attrTween("stroke-dasharray", tweenDash);

                svg.append("path")
                    .datum(dataset)
                    .attr("class", "line5")
                    .attr("d", line5)
                    .transition()
                    .duration(1000)
                    .attrTween("stroke-dasharray", tweenDash);



            });

            d3.select("#nt")
            .on("change", function () {
                d3.select("svg").remove();
                xScale = d3.scaleTime()
                    .domain([
                        d3.min(dataset, function (d) { return d.year; }),
                        d3.max(dataset, function (d) { return d.year; })
                    ])
                    .range([padding, w - padding * 2]);

                //create a yScale for the graph
                yScale = d3.scaleLinear()
                    .domain([0, d3.max(dataset, function (d) { return d.ntgroup4; })
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


                //create lines for the data    
                line1 = d3.line()
                    .x(function (d) { return xScale(d.year); })
                    .y(function (d) { return yScale(d.ntgroup1); });

                line2 = d3.line()
                    .x(function (d) { return xScale(d.year); })
                    .y(function (d) { return yScale(d.ntgroup2); });

                line3 = d3.line()
                    .x(function (d) { return xScale(d.year); })
                    .y(function (d) { return yScale(d.ntgroup3); });

                line4 = d3.line()
                    .x(function (d) { return xScale(d.year); })
                    .y(function (d) { return yScale(d.ntgroup4); });

                line5 = d3.line()
                    .x(function (d) { return xScale(d.year); })
                    .y(function (d) { return yScale(d.ntgroup5); });

                //appends lines
                svg.append("path")
                    .datum(dataset)
                    .attr("class", "line1")
                    .attr("d", line1)
                    .transition()
                    .duration(1000)
                    .attrTween("stroke-dasharray", tweenDash);

                svg.append("path")
                    .datum(dataset)
                    .attr("class", "line2")
                    .attr("d", line2)
                    .transition()
                    .duration(1000)
                    .attrTween("stroke-dasharray", tweenDash);

                svg.append("path")
                    .datum(dataset)
                    .attr("class", "line3")
                    .attr("d", line3)
                    .transition()
                    .duration(1000)
                    .attrTween("stroke-dasharray", tweenDash);

                svg.append("path")
                    .datum(dataset)
                    .attr("class", "line4")
                    .attr("d", line4)
                    .transition()
                    .duration(1000)
                    .attrTween("stroke-dasharray", tweenDash);

                svg.append("path")
                    .datum(dataset)
                    .attr("class", "line5")
                    .attr("d", line5)
                    .transition()
                    .duration(1000)
                    .attrTween("stroke-dasharray", tweenDash);



            });

            d3.select("#act")
            .on("change", function () {
                d3.select("svg").remove();
                xScale = d3.scaleTime()
                    .domain([
                        d3.min(dataset, function (d) { return d.year; }),
                        d3.max(dataset, function (d) { return d.year; })
                    ])
                    .range([padding, w - padding * 2]);

                //create a yScale for the graph
                yScale = d3.scaleLinear()
                    .domain([0, d3.max(dataset, function (d) { return d.actgroup3; })
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


                //create lines for the data    
                line1 = d3.line()
                    .x(function (d) { return xScale(d.year); })
                    .y(function (d) { return yScale(d.actgroup1); });

                line2 = d3.line()
                    .x(function (d) { return xScale(d.year); })
                    .y(function (d) { return yScale(d.actgroup2); });

                line3 = d3.line()
                    .x(function (d) { return xScale(d.year); })
                    .y(function (d) { return yScale(d.actgroup3); });

                line4 = d3.line()
                    .x(function (d) { return xScale(d.year); })
                    .y(function (d) { return yScale(d.actgroup4); });

                line5 = d3.line()
                    .x(function (d) { return xScale(d.year); })
                    .y(function (d) { return yScale(d.actgroup5); });

                //appends lines
                svg.append("path")
                    .datum(dataset)
                    .attr("class", "line1")
                    .attr("d", line1)
                    .transition()
                    .duration(1000)
                    .attrTween("stroke-dasharray", tweenDash);

                svg.append("path")
                    .datum(dataset)
                    .attr("class", "line2")
                    .attr("d", line2)
                    .transition()
                    .duration(1000)
                    .attrTween("stroke-dasharray", tweenDash);

                svg.append("path")
                    .datum(dataset)
                    .attr("class", "line3")
                    .attr("d", line3)
                    .transition()
                    .duration(1000)
                    .attrTween("stroke-dasharray", tweenDash);

                svg.append("path")
                    .datum(dataset)
                    .attr("class", "line4")
                    .attr("d", line4)
                    .transition()
                    .duration(1000)
                    .attrTween("stroke-dasharray", tweenDash);

                svg.append("path")
                    .datum(dataset)
                    .attr("class", "line5")
                    .attr("d", line5)
                    .transition()
                    .duration(1000)
                    .attrTween("stroke-dasharray", tweenDash);



            });


    }






}

window.onload = init;