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
 
 var HttpClient = function () {
	this.get = function (url, callback) {
		var req = new XMLHttpRequest();
		req.open('GET', url);
		for(i = 0; i < headers.length; i++) {
			req.setRequestHeader(headers[i].key, headers[i].value);
		}
		req.onreadystatechange = function () {
			if (req.status >= 300 && req.status < 400) {
				window.location.reload();
			}
			if (req.readyState === XMLHttpRequest.DONE) {
				if (req.status === 200) {
					callback({ status : req.status,
								  responseText : req.responseText
								 });
				} else {
					callback({ status : req.status,
								  responseText : "There was an error processing the request"
								 });
				}
			}
		};
		req.send();
	};
	var headers = [];
	this.addHeader = function (key, value) {
		headers.push({key: key,
					 value: value});
	};
};