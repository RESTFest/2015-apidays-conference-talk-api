# Translators

Online services which translate *conference-talk* media type to other
media types. Example usage to advertise known service translating to
[JSON-LD](http://www.w3.org/TR/json-ld/)


```
GET /2015/paris HTTP/1.1
Host: api.apidays.io
Accept: application/ld+json

HTTP/1.1 200 OK 
Content-Type: application/vnd.conference-talk+json; charset=UTF-8
Link: <https://media-type-translator.example/conftalk2jsonld?url=https%3A%2F%2Fapi.apidays.io%2F2015%2Fparis>;
      rel="alternate"; type="application/ld+json"

```

translator.example would provide [URI
template](https://tools.ietf.org/html/rfc6570)
`https://media-type-translator.example/conftalk2jsonld{?url}`
 which api.apidays.io
would use for generating links `rel="alternate"; type="application/ld+json"`
