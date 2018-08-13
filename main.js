
// Read csv
// Create empty array
var dataset_large = [];
var read_data = d3.csv("data/match1-cleaned.csv",
//Read data and assign names
  function(error, rows) {
    rows.forEach(function(r) {
      dataset_large.push({
        time: +r.time,
        bnetid: r.bnetid,
        playerid: +r.playerid,
        heroid: r.heroid,
        teamid: r.teamid,
        pos_x: +r.pos_x,
        pos_z: +r.pos_z,
      })
    });

// Sort dataset based on time
var sort_data = dataset_large.sort(
  function(a,b) { return d3.ascending(a.time, b.time) });
// Call main function
main_function();
});

function main_function() {
  // Set max/min time scale
  var min_time = d3.min(dataset_large,function(d){ return d.time; });
  var max_time = d3.max(dataset_large,function(d){ return d.time; });
  var max_pos_x = d3.max(dataset_large,function(d){ return d.pos_x; });
  var min_pos_x = d3.min(dataset_large,function(d){ return d.pos_x; });
  var max_pos_z = d3.max(dataset_large,function(d){ return d.pos_z; });
  var min_pos_z = d3.min(dataset_large,function(d){ return d.pos_z; });

  // Log main dataset, for debugging
  console.log(dataset_large);

  // Setup window dataset for initial rendering
  var num_values = 12;  // Set number of players
  dataset = [];  // Initialize empty array
  // For each item in array, assign min time per player
  for(var i=1; i<=num_values; i++) {
    // Filter for player
    var init_data = dataset_large.filter(
      function(d) { return d.playerid == i}
    );
    // Find min time for player
    var init_data_min_time = d3.min(init_data,
      function(d) { return d.time }
    );
    // Filter data for min time for player
    var init_data_player = init_data.filter(
      function(d) { return d.time == init_data_min_time }
    );
    // Push initial data to dynamic dataset
    dataset.push([
      i,
      init_data_player[0].pos_x,
      init_data_player[0].pos_z,
      init_data_player[0].heroid,
      init_data_player[0].heroid
    ]);
  }
  // Log starting dynamic dataset
  console.log(dataset)

  // Setup settings for viz
  // Setup margins and canvas dimensions
  var y_padding = 100;
  var x_padding = 30;
  var padding = 30;
  var canvas_width = 1600 + x_padding * 2;
  var canvas_height = 900 + y_padding *2;
  var slider_height = 30;
  var map_y_squeeze = 150;

  // Scale dataset to image dimensions
  var x_scale = d3.scaleLinear()
    .domain([0, max_pos_x]) // data domain
    .range([
      x_padding,
      canvas_width - x_padding
    ]); // output range
  var y_scale = d3.scaleLinear()
    .domain([0, max_pos_z]) // data domain
    .range([
      canvas_height - y_padding - map_y_squeeze,
      y_padding + map_y_squeeze + 150
    ]); // invert y since y axis is top down

  // Execute scale function for data domain
  x_scale.domain([0, max_pos_x]);
  y_scale.domain([0, max_pos_z]);

  // Define X axis
  var xAxis = d3.axisBottom()
    .scale(x_scale)
    .ticks(5);
  // Define Y axis
  var yAxis = d3.axisLeft()
    .scale(y_scale)
    .ticks(5);

  // Create main canvas SVG element
  var svg = d3.select("h3")  // This is where we put our vis
    .append("svg")
    .attr("width", canvas_width)
    .attr("height", canvas_height);

  // Append definitions for icons
  var defs = svg.append("defs");

  defs.append("pattern")
    .attr("id", "207165582859042824")
    .attr("height", "100%")
    .attr("width", "100%")
    .attr("patternContentUInits", "objectBoundingBox")
    .append("image")
    .attr("height", 40)
    .attr("width", 40)
    .attr("preserveAspectRatio", "none")
    .attr("xmlns:xlink", "http://www.w3.org/1999/xlink")
    .attr("xlink:href", "assets/icons_pharah_40.png");

  defs.append("pattern")
    .attr("id", "207165582859042848")
    .attr("height", "100%")
    .attr("width", "100%")
    .attr("patternContentUInits", "objectBoundingBox")
    .append("image")
    .attr("height", 40)
    .attr("width", 40)
    .attr("preserveAspectRatio", "none")
    .attr("xmlns:xlink", "http://www.w3.org/1999/xlink")
    .attr("xlink:href", "assets/icons_zenyatta_40.png");

  defs.append("pattern")
    .attr("id", "207165582859042825")
    .attr("height", "100%")
    .attr("width", "100%")
    .attr("patternContentUInits", "objectBoundingBox")
    .append("image")
    .attr("height", 40)
    .attr("width", 40)
    .attr("preserveAspectRatio", "none")
    .attr("xmlns:xlink", "http://www.w3.org/1999/xlink")
    .attr("xlink:href", "assets/icons_winston_40.png");

  defs.append("pattern")
    .attr("id", "207165582859042818")
    .attr("height", "100%")
    .attr("width", "100%")
    .attr("patternContentUInits", "objectBoundingBox")
    .append("image")
    .attr("height", 40)
    .attr("width", 40)
    .attr("preserveAspectRatio", "none")
    .attr("xmlns:xlink", "http://www.w3.org/1999/xlink")
    .attr("xlink:href", "assets/icons_reaper_40.png");

  defs.append("pattern")
    .attr("id", "207165582859042820")
    .attr("height", "100%")
    .attr("width", "100%")
    .attr("patternContentUInits", "objectBoundingBox")
    .append("image")
    .attr("height", 40)
    .attr("width", 40)
    .attr("preserveAspectRatio", "none")
    .attr("xmlns:xlink", "http://www.w3.org/1999/xlink")
    .attr("xlink:href", "assets/icons_mercy_40.png");

  defs.append("pattern")
    .attr("id", "207165582859042821")
    .attr("height", "100%")
    .attr("width", "100%")
    .attr("patternContentUInits", "objectBoundingBox")
    .append("image")
    .attr("height", 40)
    .attr("width", 40)
    .attr("preserveAspectRatio", "none")
    .attr("xmlns:xlink", "http://www.w3.org/1999/xlink")
    .attr("xlink:href", "assets/icons_hanzo_40.png");

  defs.append("pattern")
    .attr("id", "207165582859042822")
    .attr("height", "100%")
    .attr("width", "100%")
    .attr("patternContentUInits", "objectBoundingBox")
    .append("image")
    .attr("height", 40)
    .attr("width", 40)
    .attr("preserveAspectRatio", "none")
    .attr("xmlns:xlink", "http://www.w3.org/1999/xlink")
    .attr("xlink:href", "assets/icons_torbjorn_40.png");

  defs.append("pattern")
    .attr("id", "207165582859042857")
    .attr("height", "100%")
    .attr("width", "100%")
    .attr("patternContentUInits", "objectBoundingBox")
    .append("image")
    .attr("height", 40)
    .attr("width", 40)
    .attr("preserveAspectRatio", "none")
    .attr("xmlns:xlink", "http://www.w3.org/1999/xlink")
    .attr("xlink:href", "assets/icons_genji_40.png");

  defs.append("pattern")
    .attr("id", "207165582859042937")
    .attr("height", "100%")
    .attr("width", "100%")
    .attr("patternContentUInits", "objectBoundingBox")
    .append("image")
    .attr("height", 40)
    .attr("width", 40)
    .attr("preserveAspectRatio", "none")
    .attr("xmlns:xlink", "http://www.w3.org/1999/xlink")
    .attr("xlink:href", "assets/icons_lucio_40.png");

  defs.append("pattern")
    .attr("id", "207165582859042819")
    .attr("height", "100%")
    .attr("width", "100%")
    .attr("patternContentUInits", "objectBoundingBox")
    .append("image")
    .attr("height", 40)
    .attr("width", 40)
    .attr("preserveAspectRatio", "none")
    .attr("xmlns:xlink", "http://www.w3.org/1999/xlink")
    .attr("xlink:href", "assets/icons_tracer_40.png");

  defs.append("pattern")
    .attr("id", "207165582859042823")
    .attr("height", "100%")
    .attr("width", "100%")
    .attr("patternContentUInits", "objectBoundingBox")
    .append("image")
    .attr("height", 40)
    .attr("width", 40)
    .attr("preserveAspectRatio", "none")
    .attr("xmlns:xlink", "http://www.w3.org/1999/xlink")
    .attr("xlink:href", "assets/icons_reinhardt_40.png");

  defs.append("pattern")
    .attr("id", "207165582859042882")
    .attr("height", "100%")
    .attr("width", "100%")
    .attr("patternContentUInits", "objectBoundingBox")
    .append("image")
    .attr("height", 40)
    .attr("width", 40)
    .attr("preserveAspectRatio", "none")
    .attr("xmlns:xlink", "http://www.w3.org/1999/xlink")
    .attr("xlink:href", "assets/icons_mccree_40.png");

  defs.append("pattern")
    .attr("id", "207165582859042920")
    .attr("height", "100%")
    .attr("width", "100%")
    .attr("patternContentUInits", "objectBoundingBox")
    .append("image")
    .attr("height", 40)
    .attr("width", 40)
    .attr("preserveAspectRatio", "none")
    .attr("xmlns:xlink", "http://www.w3.org/1999/xlink")
    .attr("xlink:href", "assets/icons_zarya_40.png");

  defs.append("pattern")
    .attr("id", "207165582859042926")
    .attr("height", "100%")
    .attr("width", "100%")
    .attr("patternContentUInits", "objectBoundingBox")
    .append("image")
    .attr("height", 40)
    .attr("width", 40)
    .attr("preserveAspectRatio", "none")
    .attr("xmlns:xlink", "http://www.w3.org/1999/xlink")
    .attr("xlink:href", "assets/icons_76_40.png");

  defs.append("pattern")
    .attr("id", "207165582859042917")
    .attr("height", "100%")
    .attr("width", "100%")
    .attr("patternContentUInits", "objectBoundingBox")
    .append("image")
    .attr("height", 40)
    .attr("width", 40)
    .attr("preserveAspectRatio", "none")
    .attr("xmlns:xlink", "http://www.w3.org/1999/xlink")
    .attr("xlink:href", "assets/icons_junkrat_40.png");

  defs.append("pattern")
    .attr("id", "207165582859042938")
    .attr("height", "100%")
    .attr("width", "100%")
    .attr("patternContentUInits", "objectBoundingBox")
    .append("image")
    .attr("height", 40)
    .attr("width", 40)
    .attr("preserveAspectRatio", "none")
    .attr("xmlns:xlink", "http://www.w3.org/1999/xlink")
    .attr("xlink:href", "assets/icons_dva_40.png");

  defs.append("pattern")
    .attr("id", "207165582859042837")
    .attr("height", "100%")
    .attr("width", "100%")
    .attr("patternContentUInits", "objectBoundingBox")
    .append("image")
    .attr("height", 40)
    .attr("width", 40)
    .attr("preserveAspectRatio", "none")
    .attr("xmlns:xlink", "http://www.w3.org/1999/xlink")
    .attr("xlink:href", "assets/icons_bastion_40.png");

  defs.append("pattern")
    .attr("id", "207165582859042826")
    .attr("height", "100%")
    .attr("width", "100%")
    .attr("patternContentUInits", "objectBoundingBox")
    .append("image")
    .attr("height", 40)
    .attr("width", 40)
    .attr("preserveAspectRatio", "none")
    .attr("xmlns:xlink", "http://www.w3.org/1999/xlink")
    .attr("xlink:href", "assets/icons_widow_40.png");

  defs.append("pattern")
    .attr("id", "207165582859042838")
    .attr("height", "100%")
    .attr("width", "100%")
    .attr("patternContentUInits", "objectBoundingBox")
    .append("image")
    .attr("height", 40)
    .attr("width", 40)
    .attr("preserveAspectRatio", "none")
    .attr("xmlns:xlink", "http://www.w3.org/1999/xlink")
    .attr("xlink:href", "assets/icons_symmetra_40.png");

  defs.append("pattern")
    .attr("id", "207165582859043037")
    .attr("height", "100%")
    .attr("width", "100%")
    .attr("patternContentUInits", "objectBoundingBox")
    .append("image")
    .attr("height", 40)
    .attr("width", 40)
    .attr("preserveAspectRatio", "none")
    .attr("xmlns:xlink", "http://www.w3.org/1999/xlink")
    .attr("xlink:href", "assets/icons_mei_40.png");

  defs.append("pattern")
    .attr("id", "207165582859042880")
    .attr("height", "100%")
    .attr("width", "100%")
    .attr("patternContentUInits", "objectBoundingBox")
    .append("image")
    .attr("height", 40)
    .attr("width", 40)
    .attr("preserveAspectRatio", "none")
    .attr("xmlns:xlink", "http://www.w3.org/1999/xlink")
    .attr("xlink:href", "assets/icons_roadhog_40.png");

  // Append Map Background
  defs.append("pattern")
    .attr("id", "ruins")
    .attr("height", "100%")
    .attr("width", "100%")
    .attr("patternContentUInits", "objectBoundingBox")
    .append("image")
    .attr("height", 900)
    .attr("width", 1600)
    .attr("preserveAspectRatio", "none")
    .attr("xmlns:xlink", "http://www.w3.org/1999/xlink")
    .attr("xlink:href", "assets/ruins1600.png");

  // Append map object
  var map = svg.append("rect")
      .attr("height", "100%")
      .attr("width", "100%")
      .attr("y", y_padding)
      .attr("x", x_padding)
      .attr("fill", "url(#ruins)")
      .attr("fill-opacity", .75);

  // Add X axis
  svg.append("g")
      .attr("class", "xaxis")
      .attr("transform", "translate(0," + (canvas_height - y_padding) +")")
      .call(xAxis);

  // Add Y axis
  svg.append("g")
      .attr("class", "yaxis")
      .attr("transform", "translate(" + x_padding +",0)")
      .call(yAxis);

  // Create map icons
  var circles = svg.selectAll("circle")
    // Join to dynamic dataset
    .data(dataset)
    .enter()
    .append("circle")
    // Return position based on scaled data
    .attr("cx", function(d) {
        return x_scale(d[1]);
    })
    .attr("cy", function(d) {
        return y_scale(d[2]);
    })
    .attr("r", 20)
    // Stroke color based on team
    .attr("stroke", function(d) {
      if (d[0] > 6)
      { return "#870000"; }
      else
      { return "#0062A2"; }
    })
    .attr("stroke-width", 3)
    // Fill pattern based on hero
    .style("fill", function(d) {
        return String("url(#"+d[3]+")");
    })
    .attr("render-order", 1);

// Create progress slider

  // Mark inverted moving status
  var moving = true;
  // Set starting value
  var currentValue = 0;
  // Set maximum slider value based on canvas size
  var targetValue = canvas_width - (x_padding*2);
  // Scale data for slider value
  var x = d3.scaleLinear()
    .domain([min_time, max_time])
    .range([0, targetValue])
    .clamp(true);
  var slider = svg.append("g")
    .attr("class", "slider")
    .attr(
    "transform",
    "translate(" + padding /*margin*/ + "," + 40 /*height*/ + ")"
    );
  // Create track for slider
  slider.append("line")
    .attr("class", "track")
    .attr("x1", x.range()[0])
    .attr("x2", x.range()[1])
    .select(function() {
      return this.parentNode.appendChild(this.cloneNode(true));
    })
    .attr("class", "track-inset")
    .select(function() {
      return this.parentNode.appendChild(this.cloneNode(true));
    })
    .attr("class", "track-overlay")
    // Create dragging functionality
    .call(d3.drag()
      .on("start.interrupt", function() { slider.interrupt(); })
      .on("start drag", function() {
        currentValue = d3.event.x;
        update(x.invert(currentValue));
      })
    );
  // Create ticks for slider
  slider.insert("g", ".track-overlay")
    .attr("class", "ticks")
    .attr("transform", "translate(0," + 18 + ")")
    .selectAll("text")
      .data(x.ticks(10))
      .enter()
      .append("text")
      .attr("x", x)
      .attr("y", 10)
      .attr("text-anchor", "middle")
      .text(function(d) { return d/2; });
  // Create handle
  var handle = slider.insert("circle", ".track-overlay")
    .attr("class", "handle")
    .attr("r", 9);
  var label = slider.append("text")
    .attr("class", "label")
    .attr("text-anchor", "middle")
    .text(min_time)
    .attr("transform", "translate(0," + (-25) + ")");

  // Create function to update canvas based on slider position
  function update(h) {
    // Read handle position
    handle.attr("cx", x(h));
    label
      .attr("x", x(h))
      .text(Math.round(h/2));
    // Filter and redraw plot
    var new_data = dataset_large.filter(function(d) {
      return d.time == Math.round(h);
    })
    // Log handle position, round to nearest whole number
    console.log(Math.round(h));
    // Run update function
    update_circles_dynamic(new_data,dataset)
  }
  // On click, playback data from current position
  d3.select("#play-button")
    .on("click", function() {
      var button = d3.select(this);
      // Flip from pause to play and back
      if (button.text() == "Pause") {
        moving = false;
        clearInterval(timer);
        button.text("Play");
      } else {
        moving = true;
        // Set increment interval; dataset time unit is half second
        // hence 500ms is used for step
        timer = setInterval(step, 500);
        button.text("Pause");
      }
    })

  // Create step function
  function step() {
    update(x.invert(currentValue));
    // Set slider increment amount
    currentValue = currentValue + (
      targetValue/(canvas_width - (x_padding*2))
    );
    if (currentValue > targetValue) {
      moving = false;
      currentValue = 0;
      clearInterval(timer);
      playButton.text("Play");
    }
  }

  function update_circles_dynamic(incoming_data,old_data) {
    // Reset number of players
    var num_values = 12;
    // Update each icon
    for(var i=1; i<=num_values; i++) {
      // Filter data to player
      var filtered_data = incoming_data.filter(function(d) {
        return d.playerid == i
      });
      // Add new data to array if available
      try {
        dataset.splice(
          i-1,
          1, [
            i,
            filtered_data[0].pos_x,
            filtered_data[0].pos_z,
            filtered_data[0].heroid,
            old_data[i-1][3]
          ]);  // Add new numbers to array
      }
      // If new data is not available, grab original dataset positions
      catch(e) {
        dataset.splice(
          i-1,
          1, [
            old_data[i-1][0],
            old_data[i-1][1],
            old_data[i-1][2],
            old_data[i-1][3],
            old_data[i-1][4]
          ])
      }

      // Update circles based on new dataset
      svg.selectAll("circle")
        .data(dataset)  // Update with new data
        .transition()  // Transition from old to new
        .duration(300)  // Length of animation to match step interval
        // Transition easing options:
        // default is variable, has acceleration,
        // easeElastic, easeBounce, easeLinear,
        // easeSin, easeQuad, easeCubic, easePoly,
        // easeCircle, easeExp, easeBac
        .ease(d3.easeSin)
        // .attr("r", 20)  // Change size
        // .style("opacity", .2) // Set the element opacity
        .on("start", function(d) {
          // If statement to evaluate whether hero has changed
          if (d[3] == d[4]) {
            // If old hero is equal to new hero, do nothing
            d3.select(this)
              // Change background based on hero
              // .style("fill", String("url(#"+d[3]+")"));
              // .attr("r", 5)  // Change size
              // .style("fill", "black");  // Change color
          } else {
            // If old hero is not equal to new hero, change fill and
            // animate transition with size
            d3.select(this)
              // Change background based on hero
              .style("fill", String("url(#"+d[3]+")"))
              .transition()
              .attr("r", 5);  // Change size
              // .style("fill", "black");  // Change color
          }
        })
        // Dynamic delay (i.e. each item delays a little longer)
        // .delay(function(d, i) {
        //   return i / dataset.length * 500;
        // })
        .attr("cx", function(d) {
          return x_scale(d[1]);  // Circle's X
        })
        .attr("cy", function(d) {
          return y_scale(d[2]);  // Circle's Y
        })
        // Animation ending transition
        .on("end", function(d) {  // End animation
          d3.select(this)
            .transition()
            .duration(200)
            // Revert to regular size
            .attr("r", 20);  // Change size
        });
    }
  }
};
