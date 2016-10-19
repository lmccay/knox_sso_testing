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

var loginURL = "/gateway/knoxsso/api/v1/websso?originalUrl=";
var userAgent = navigator.userAgent.toLowerCase();
var firstLogIn = true;

function get(name){
   if(name=(new RegExp('[?&]'+encodeURIComponent(name)+'=([^&]*)')).exec(location.search))
      return decodeURIComponent(name[1]);
}

function testSameOrigin(url) {
    var loc = window.location,
        a = document.createElement('a');
    a.href = url;
    return a.hostname == loc.hostname &&
           a.port == loc.port &&
           a.protocol == loc.protocol;
}

function redirect(redirectUrl) {
  try { window.location.replace(redirectUrl); } 
  catch(e) { window.location = redirectUrl; }
}

var keypressed = function(event) {
    if (event.keyCode == 13) {
        login();
    }
}

var login = function() {
    var form = document.forms[0];
    var username = form.username.value;
    var password = form.password.value;
    var _login = function() {
    var originalUrl = get("originalUrl");
    var idpUrl = loginURL + originalUrl;
    var redirectUrl = originalUrl;
      //Instantiate HTTP Request
        var request = ((window.XMLHttpRequest) ? new XMLHttpRequest() : new ActiveXObject("Microsoft.XMLHTTP"));
        request.open("POST", loginURL + originalUrl, true);
        request.setRequestHeader("Authorization", "Basic " + btoa(username + ":" + password))
        request.send(null);

      //Process Response
        request.onreadystatechange = function(){
            if (request.readyState == 4) {
                if (request.status==0 || request.status==200 || request.status==204 || request.status==307 || request.status==303) {
                  if (testSameOrigin(originalUrl) == false) {
                    redirectUrl = "redirecting.html?originalUrl=" + originalUrl;
                  }
                  redirect(redirectUrl);
                }
                else {
                  if (request.status==401) {
                    $('#errorBox').show();
                    $('#signInLoading').hide();
                    $('#signIn').removeAttr('disabled');
                    $('#errorBox .errorMsg').text("The username or password you entered is incorrect.");
                  }
                }
            }
        }
    }

    if (userAgent.indexOf("firefox") != -1){ //TODO: check version number
        if (firstLogIn) _login();
        else logoff(_login);
    }
    else{
        _login();
    }

    if (firstLogIn) firstLogIn = false;
}