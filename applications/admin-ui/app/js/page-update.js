/*
 * Licensed to the Apache Software Foundation (ASF) under one or more
 * contributor license agreements.  See the NOTICE file distributed with
 * this work for additional information regarding copyright ownership.
 * The ASF licenses this file to You under the Apache License, Version 2.0
 * (the "License"); you may not use this file except in compliance with
 * the License.  You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
 
 function updateVersion() {
  var api = new AdminApi();
  api.getVersion(function (res) {
    var text = "";
    if (res) {
      text = "Version: " + res.ServerVersion.version + "\n Hash: " + res.ServerVersion.hash;
    } else {
      text = "Could not get Server Version"
    }
    $("#knox-version").html(text);
  });
}

function updateTopologies() {
  var api = new AdminApi();
  api.getTopologies(function (res) {
    //    var tops = document.getElementById('topology-card-container');
    var tops = $('#topology-card-container')
    tops.html("");

    if (res) {
      for (i = 0; i < res.topologies.topology.length; i++) {
        var t = res.topologies.topology[i];
        tops.append(createTopologyCard(t.name, function (t) {
          this.name = t.name;
          //          console.log(this.name);
        }));
      }

    } else {
      tops.html("Failed to retrieve topologies.");
    }


  });
}

function hideTopology() {
  var c = document.getElementById('topology-container');
  c.style = "display:none";
}

function showTopology() {
  var c = document.getElementById('topology-container');
  c.style = "display:block";
}

function getTopology(name) {
  var api = new AdminApi();
  //  console.log(name);

  api.getTopology(name, function (res) {
    var container = $('#topology-data-json');
    var d = JSON.stringify(res, null, 2);
    d = '<br><pre>\n' + d + '\n</pre>'
    container.html(d);

    var topology = res.topology;
    console.log(topology);
    var container = $('#topology-data-pretty-container');
    container.html('');
    container.append('<h2>Topology Name: <code>' + topology.name + '</code></h2>');
    container.append('<label>Timestamp:</label>' + topology.timestamp);
    container.append('<h3>Providers</h3>');
    topology.providers.forEach(function (provider) {
      container.append('<h4>Role:</label> ' + provider.role + '<br>');
      container.append('<label>Name:</label> ' + provider.name + '</h4>' + '<br>');
      container.append('<label>enabled:</label> ' + provider.enabled + '<br>');
      if (provider.params) {
        container.append('<h5>Parameters</h5>');
        for (key in provider.params) {
          container.append('<label>' + key + ': </label> ' + provider.params[key] + '<br>')
        }
      }
    });

    container.append('<h3>Services</h3>');
    topology.services.forEach(function (service) {
      container.append('<h4><label>Role:</label> ' + service.role + '</h4>');
      if (service.urls) {
        service.urls.forEach(function (url) {
          container.append('<label>URL:</label> ' + url)
        });
      }

    });

    container.append('<h3>Applications</h3>');
    topology.applications.forEach(function (app) {
      container.append('<h4><label>name:</label> ' + app.name + '</h4>');
      container.append('');
      if (Object.keys(app.params) > 0) {
        container.append('<h5>Parameters</h5>');
        for (key in app.params) {
          container.append('<label>' + key + ': </label>' + app.params[key] + '<br>')
        }
      }
      if (app.urls) {
        app.urls.forEach(function (url) {
          container.append('<label>URL:</label> ' + url)
        });
      }
      
      
    });


  })

  api.getTopologyXml(name, function (res) {
    //    console.log(res);
    var container = $('#topology-data-xml');
    container.html('');
    container.append('<br>')
    container.append('<pre></pre>')
    var cpre = $('#topology-data-xml pre');
    cpre.text(res);
  })

  //  api.getTopology(name, function(res) {
  //    if(res) {
  //      var top = document.getElementById('topology-data');
  //      var nm = document.getElementById('topology-data-name');
  //      nm.innerHTML = name;
  //      
  //      top.innerHTML = JSON.stringify(res);
  //      console.log(res);
  //      showTopology();
  //    } else {
  //      hideTopology();
  //    }
  //  });
}

function updateHomePage() {
  updateVersion();
  updateTopologies();
}