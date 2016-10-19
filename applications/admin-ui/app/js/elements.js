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
 
 function createTopologyButton(name, callback) {
  var btn = document.createElement('a');
  btn.setAttribute('onclick', 'getTopology(\'' + name + '\')');
  btn.className = "btn btn-default btn-block"
  btn.setAttribute("data-toggle", "modal")
  btn.setAttribute("data-target", "#topology-view-modal")
  btn.innerHTML = "View"
  return btn
}

function createSimpleElement(tagName, text) {
  var el = document.createElement(tagName);
  if (text) {
    el.innerHTML = text;
  }
  return el;
}

function createTopologyCard(topologyName, callback) {
  var top = createSimpleElement("div", "");
  top.className = "col-sm-3"
  
  var btn = createTopologyButton(topologyName);
  var pan = createPanel(topologyName, 'default', btn.outerHTML);
  
  top.appendChild(pan)
  return top;
}


function createPanel(title, type, bodyContent) {
  var panel = createSimpleElement('div');
  panel.className = "panel panel-" + type;
  
  var panelHeader = createSimpleElement('div');
  panelHeader.className = "panel-heading";
  
  var panelTitle = createSimpleElement('p', title)
  panelTitle.className = 'panel-title'
  
  var panelBody = createSimpleElement('div', bodyContent)
  panelBody.className = "panel-body";
  
  panelHeader.appendChild(panelTitle);
  panel.appendChild(panelHeader);
  panel.appendChild(panelBody);
  
  return panel
}