function init() {
    var w = 800;
    var h = 500;

    var padding = 50;
    var dataset;
    var tooltip = d3.select("body").append("div").attr("class", "toolTip");

    d3.csv("death_gender_roaduser.csv", function (d) {
        return {
            user: d.roaduser,
            Mvalue: parseFloat(d.Male),
            Fvalue: parseFloat(d.Female)





        }
    }).then(function (data) {
        dataset = data;

        barchart();
        console.log(dataset);


    }).catch(function (error) {
        console.log(error)

    })

    function barchart() {
        var AnotherName = ["Drivers", "Passengers", "Pedestrians", "Motorcyclists", "Pedal cyclists"];
        var xAnotherScale = d3.scalePoint()
            .domain(AnotherName)
            .range([padding, w - padding * 2 + 30])
            .padding(0.5);

        var xScale = d3.scaleBand()
            .domain(d3.range(dataset.length))
            .range([padding, w - padding * 2 + 15])
            .paddingInner(0.2);

        var yScale = d3.scaleLinear()
            .domain([0,
                d3.max(dataset, function (d) { return d.Mvalue })
            ])
            .range([h - padding, padding]);

        // create a x-axis
        var xAxis = d3.axisBottom()
            .ticks(5)
            .scale(xAnotherScale);

        // create a y-axis
        var yAxis = d3.axisLeft()
            .ticks(10)
            .scale(yScale);

        var svg = d3.select("#bar")
            .attr("align", "center")
            .append("svg:svg")
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
            .text("Road users");


        //Name the Y-axis
        svg.append("text")
            .attr("class", "ylabel")
            .attr("text-anchor", "end")
            .attr("y", 4)
            .attr("dy", "0.4em")
            .attr("x", -250)
            .attr("transform", "rotate(-90)")
            .text("Road Accidents");






        svg.selectAll("rect")

            .data(dataset)
            .enter()
            .append("rect")
            .attr("x", function (d, i) {
                return 10 + xScale(i);
            })
            .attr("y", function (d) {
                return yScale(d.Mvalue);
            })
            .attr("width", xScale.bandwidth())
            .attr("height", function (d) {
                return 450 - yScale(d.Mvalue);
            })
            .attr("class", "chart")
            .attr("fill", "rgb(165, 196, 247)")
            .on("mousemove", function (d) {
                tooltip
                    .style("left", d3.event.pageX - 50 + "px")
                    .style("top", d3.event.pageY - 70 + "px")
                    .style("display", "inline-block")
                    .html(d.Mvalue);
            })
            .on("mouseover", function () {
                d3.select(this)
                    .transition()
                    .delay(50)
                    .attr("fill", "rgb(86, 150, 255)");
            })
            .on("mouseout", function (d) {
                tooltip.style("display", "none");
                d3.select(this)
                    .transition()
                    .delay(50)
                    .attr("fill", "rgb(165, 196, 247)");
            });


        //button click event    
        d3.select("#Male")
            .on("click", function () {


                var rects = svg.selectAll("rect")
                    .data(dataset)
                    .transition()
                    .delay(function (d, i) {
                        return i / dataset.length * 1000;
                    })
                    .duration(1000)
                    .attr("y", function (d) {
                        return yScale(d.Mvalue);
                    })
                    .attr("width", xScale.bandwidth())
                    .attr("height", function (d) {
                        return 450 - yScale(d.Mvalue);
                    })
                    .attr("class", "chart")
                    .attr("fill", "rgb(165, 196, 247)");

                svg.selectAll("rect")
                    .data(dataset)
                    .on("mousemove", function (d) {
                        tooltip
                            .style("left", d3.event.pageX - 50 + "px")
                            .style("top", d3.event.pageY - 70 + "px")
                            .style("display", "inline-block")
                            .html(d.Mvalue);
                    })
                    .on("mouseover", function () {
                        d3.select(this)
                            .transition()
                            .delay(50)
                            .attr("fill", "rgb(86, 150, 255)");
                    })
                    .on("mouseout", function (d) {
                        tooltip.style("display", "none");
                        d3.select(this)
                            .transition()
                            .delay(50)
                            .attr("fill", "rgb(165, 196, 247)");
                    });




            });


        d3.select("#Female")
            .on("click", function () {


                svg.selectAll("rect")

                    .data(dataset)
                    .transition()
                    .delay(function (d, i) {
                        return i / dataset.length * 1000;
                    })
                    .duration(1000)
                    .attr("y", function (d) {
                        return yScale(d.Fvalue);
                    })
                    .attr("width", xScale.bandwidth())
                    .attr("height", function (d) {
                        return 450 - yScale(d.Fvalue);
                    })
                    .attr("class", "chart")
                    .attr("fill", "rgb(244, 159, 184)")


                svg.selectAll("rect")
                    .data(dataset)
                    .on("mousemove", function (d) {
                        tooltip
                            .style("left", d3.event.pageX - 50 + "px")
                            .style("top", d3.event.pageY - 70 + "px")
                            .style("display", "inline-block")
                            .html(d.Fvalue);
                    })
                    .on("mouseover", function () {
                        d3.select(this)
                            .transition()
                            .delay(50)
                            .attr("fill", "rgb(249, 99, 144)");
                    })
                    .on("mouseout", function (d) {
                        tooltip.style("display", "none");
                        d3.select(this)
                            .transition()
                            .delay(50)
                            .attr("fill", "rgb(244, 159, 184)");
                    });




            });



    }
}
window.onload = init;