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
 
 var AdminApi = function() {
  function getProto() {
    return window.location.protocol;
  }

  function getServer() {
    return window.location.hostname;
  }

  function getPort() {
    return window.location.port;
  }

  function getKnoxUrl() {
    return getProto() + "//" + getServer() + ":" + getPort();
  }

  function getAdminApiUrl() {
    return getKnoxUrl() + "/" + config.gatewayPath + "/" + config.topology + "/api/v1/";
  }

  function getAppUrl() {
    return getKnoxUrl() + "/" + config.gatewayPath + "/" + config.topology + "/" + config.appName;
  }
  
  function parseResponse(res) {
    if (res.status === 200) {
      this.resp = JSON.parse(res.responseText);
      return this.resp;
    } else {
      return undefined
    }
  }
  
  var url = getAdminApiUrl();
  
  this.getTopologies = function(callback) {
    var c = new HttpClient();
    c.addHeader('Accept', "application/json");
    c.get(url + 'topologies', function(res) {
      callback(parseResponse(res));
    });
  }
  
  this.getTopology = function(topologyName, callback) {
    var c = new HttpClient();
    c.addHeader('Accept', "application/json");
    c.get(url + 'topologies/' + topologyName, function (res) {
      callback(parseResponse(res));
    });
  }
  this.getTopologyXml = function(topologyName, callback) {
    var c = new HttpClient();
    c.addHeader('Accept', "application/xml");
    c.get(url + 'topologies/' + topologyName, function (res) {
      if (res.status == 200) {
        callback(res.responseText);
      } else {
        callback(res.status);
      }
      
    });
  }

  this.getVersion = function(callback) {
    var c = new HttpClient();
    c.addHeader('Accept', "application/json");
    c.get(url + 'version', function(res) {
      callback(parseResponse(res));
    });
  }
}
