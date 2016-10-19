# Knox SSO Testing

## Getting Started
1. `docker-compose up -d`
2. add an /etc/hosts entry for www.local.com -> 127.0.0.1
3. Open https://www.local.com:8443/gateway/admin/admin-ui/index.html from browser

## Development
1. Edit `topologies/knoxsso.xml` to use different IdPs
2. Copy the public cert from 'data/security/keystores/gateway.pem' for configuration in your application
3. https://www.local.com:8443/gateway/knoxsso/api/v1/websso is the SSO provider URL to use in your application

## References


