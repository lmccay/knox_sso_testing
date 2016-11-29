# Knox SSO Testing

## Getting Started
1. `docker-compose up -d`
2. add an /etc/hosts entry for www.local.com -> 127.0.0.1
3. Open https://www.local.com:8443/gateway/admin/admin-ui/index.html from browser
4. Use the credentials admin:admin-password

## Development
1. Edit `topologies/knoxsso.xml` to use different IdPs
2. Use the knoxcli.sh export-cert command to export the public cert of the gateway
3. Copy the public cert without BEGIN and END headers from 'keystores/gateway.pem' for configuration in your application
4. https://www.local.com:8443/gateway/knoxsso/api/v1/websso is the SSO provider URL to use in your application

## References
[KnoxSSO for Apache Ambari with Form-based IdP](https://cwiki.apache.org/confluence/display/KNOX/Ambari+via+KnoxSSO+and+Default+IDP)
[KnoxSSO for Apache Ambari with SAML v2 (Okta)](https://cwiki.apache.org/confluence/display/KNOX/Ambari+via+KnoxSSO+and+Okta)

