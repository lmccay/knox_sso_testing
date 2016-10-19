# Knox SSO Testing

## Getting Started
1. `docker-compose up -d`
2. add an /etc/hosts entry for www.local.com -> 127.0.0.1
3. Open https://www.local.com:8443/gateway/sandbox/webhdfs/v1?op=LISTSTATUS from browser

## Development
1. `docker-compose -f docker-compose.yml -f docker-compose-dev.yml build`
2. `docker-compose -f docker-compose.yml -f docker-compose-dev.yml up -d`
3. Edit `topologies/knoxsso.xml` to use different IdPs
4. `docker-compose exec knox sh -c "touch conf/topologies/sandbox.xml"`

## References


