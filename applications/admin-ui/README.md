<!--
  Licensed to the Apache Software Foundation (ASF) under one or more
  contributor license agreements.  See the NOTICE file distributed with
  this work for additional information regarding copyright ownership.
  The ASF licenses this file to You under the Apache License, Version 2.0
  (the "License"); you may not use this file except in compliance with
  the License.  You may obtain a copy of the License at

      http://www.apache.org/licenses/LICENSE-2.0

  Unless required by applicable law or agreed to in writing, software
  distributed under the License is distributed on an "AS IS" BASIS,
  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
  See the License for the specific language governing permissions and
  limitations under the License.
-->
# Knox Admin UI

A Webapp which provides a user interface for the Knox Admin API to upload/download/save/edit Knox configuration parameters

### Pre-Requisites

- A compiled and working installation of Knox 0.9.0 or higher
- The KnoxSSO topology (`knoxsso.xml`) which is provided with the standard Knox installation
- The knoxauth webapp deployed under the KnoxSSO topology
- A topology which utilizes `admin.xml`
- Add `www.local.com` to your computer's host database
  - Typically on \*nix/OS X you can find this at `/etc/hosts`

## Deploying the Application
Replace the value of `KNOX_HOME` with the location of your knox installation

```sh
export KNOX_HOME=~/Documents/Projects/gh-knox/install/knox-0.10.0-SNAPSHOT
git clone https://github.com/zacblanco/knox-admin-ui.git $KNOX_HOME/data/applications/knox-manager
```

**Note** - Sample topologies can be found below. They should work out of the box with a knox installation and the Demo LDAP server.

Add the following to the `admin.xml` topology

```xml
<application>
  <name>knox-manager</name>
</application>
```

Finally if you haven't started the Knox and LDAP servers already

```sh
ant start-test-servers
```

### Admin Configuration Parameters

Under `app/js` there is a file named `config.js`. This contains a JSON object with some configuration parameters. They should work out of the box but may need to be configured for your environment.


## Sample KnoxSSO Topology

```xml
<topology>
    <gateway>
      <provider>
        <role>webappsec</role>
        <name>WebAppSec</name>
        <enabled>true</enabled>
        <param><name>xframe.options.enabled</name><value>true</value></param>
      </provider>

        <provider>
            <role>authentication</role>
            <name>ShiroProvider</name>
            <enabled>true</enabled>
            <param>
                <!-- 
                session timeout in minutes,  this is really idle timeout,
                defaults to 30mins, if the property value is not defined,, 
                current client authentication would expire if client idles contiuosly for more than this value
                -->
                <name>sessionTimeout</name>
                <value>30</value>
            </param>
            <param>
                <name>redirectToUrl</name>
                <value>/gateway/knoxsso/knoxauth/login.html</value>
            </param>
            <param>
                <name>restrictedCookies</name>
                <value>rememberme,WWW-Authenticate</value>
            </param>
            <param>
                <name>main.ldapRealm</name>
                <value>org.apache.hadoop.gateway.shirorealm.KnoxLdapRealm</value>
            </param>
            <param>
                <name>main.ldapContextFactory</name>
                <value>org.apache.hadoop.gateway.shirorealm.KnoxLdapContextFactory</value>
            </param>
            <param>
                <name>main.ldapRealm.contextFactory</name>
                <value>$ldapContextFactory</value>
            </param>
            <param>
                <name>main.ldapRealm.userDnTemplate</name>
                <value>uid={0},ou=people,dc=hadoop,dc=apache,dc=org</value>
            </param>
            <param>
                <name>main.ldapRealm.contextFactory.url</name>
                <value>ldap://localhost:33389</value>
            </param>    
            <param>
                <name>main.ldapRealm.authenticationCachingEnabled</name>
                <value>false</value>
            </param>
            <param>
                <name>main.ldapRealm.contextFactory.authenticationMechanism</name>
                <value>simple</value>
            </param>
            <param>
                <name>urls./**</name>
                <value>authcBasic</value>
            </param>
        </provider>

        <provider>
            <role>identity-assertion</role>
            <name>Default</name>
            <enabled>true</enabled>
        </provider>

        <provider>
            <role>hostmap</role>
            <name>static</name>
            <enabled>true</enabled>
            <param><name>localhost</name><value>sandbox,sandbox.hortonworks.com</value></param>
        </provider>

    </gateway>

    <application>
      <name>knoxauth</name>
    </application>

    <service>
        <role>KNOXSSO</role>
        <param>
            <name>knoxsso.cookie.secure.only</name>
            <value>true</value>
        </param>
<!-- 5 minutes-->
        <param>
            <name>knoxsso.token.ttl</name>
            <value>300000</value>
        </param>
<!-- 1 minute -->
<!--
		<param>
            <name>knoxsso.token.ttl</name>
            <value>60000</value>
        </param>
-->
        <param>
           <name>knoxsso.redirect.whitelist.regex</name>
           <value>^https?:\/\/(www\.local\.com|localhost|127\.0\.0\.1|sandbox\.hortonworks\.com|0:0:0:0:0:0:0:1|::1):[0-9].*$</value>
        </param>
    </service>

</topology>
```

## Sample Admin Topology

```xml
<topology> 

    <gateway>
		<provider>
			<role>webappsec</role>
			<name>WebAppSec</name>
			<enabled>true</enabled>
			<param>
				<name>xframe.options.enabled</name>
				<value>true</value>
			</param>
			<param>
            	<name>cors.enabled</name>
            	<value>true</value>
          </param>
		</provider>
		<provider>
			<role>federation</role>
			<name>SSOCookieProvider</name>
			<enabled>true</enabled>
			<param>
				<name>sso.authentication.provider.url</name><value>/gateway/knoxsso/api/v1/websso</value>
			</param>
		</provider>
        <provider>
            <role>authentication</role>
            <name>ShiroProvider</name>
            <enabled>true</enabled>
            <param>  
<!--
                session timeout in minutes,  this is really idle timeout,
                defaults to 30mins, if the property value is not defined,, 
                current client authentication would expire if client idles contiuosly for more than this value
-->
				
                <name>sessionTimeout</name>
                <value>30</value>
            </param>
            <param>
                <name>main.ldapRealm</name>
                <value>org.apache.hadoop.gateway.shirorealm.KnoxLdapRealm</value>
            </param>
            <param>
                <name>main.ldapContextFactory</name>
                <value>org.apache.hadoop.gateway.shirorealm.KnoxLdapContextFactory</value>
            </param>
            <param>
                <name>main.ldapRealm.contextFactory</name>
                <value>$ldapContextFactory</value>
            </param>
            <param>
                <name>main.ldapRealm.userDnTemplate</name>
                <value>uid={0},ou=people,dc=hadoop,dc=apache,dc=org</value>
            </param>
            <param>
                <name>main.ldapRealm.contextFactory.url</name>
                <value>ldap://localhost:33389</value>
            </param>
            <param>
                <name>main.ldapRealm.contextFactory.authenticationMechanism</name>
                <value>simple</value>
            </param>
            <param>
                <name>urls./**</name>
                <value>authcBasic</value>
            </param>
        </provider>

        <provider>
            <role>authorization</role>
            <name>AclsAuthz</name>
            <enabled>true</enabled>
            <param>
                <name>knox.acl</name>
                <value>admin;*;*</value>
            </param>
        </provider>

        <provider>
            <role>identity-assertion</role>
            <name>Default</name>
            <enabled>true</enabled>
        </provider>

        <!--
        Defines rules for mapping host names internal to a Hadoop cluster to externally accessible host names.
        For example, a hadoop service running in AWS may return a response that includes URLs containing the
        some AWS internal host name.  If the client needs to make a subsequent request to the host identified
        in those URLs they need to be mapped to external host names that the client Knox can use to connect.

        If the external hostname and internal host names are same turn of this provider by setting the value of
        enabled parameter as false.

        The name parameter specifies the external host names in a comma separated list.
        The value parameter specifies corresponding internal host names in a comma separated list.

        Note that when you are using Sandbox, the external hostname needs to be localhost, as seen in out
        of box sandbox.xml.  This is because Sandbox uses port mapping to allow clients to connect to the
        Hadoop services using localhost.  In real clusters, external host names would almost never be localhost.
        -->
        <provider>
            <role>hostmap</role>
            <name>static</name>
            <enabled>true</enabled>
            <param><name>localhost</name><value>sandbox,sandbox.hortonworks.com</value></param>
        </provider>

    </gateway>
	<application>
		<name>knox-manager</name>
	</application>
	
    <service>
        <role>KNOX</role>
    </service>

</topology>
```
