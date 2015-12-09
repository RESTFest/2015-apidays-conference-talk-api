# conftalk2jsonld translator

given `application/vnd.conference-talk+json`

```json
{
  "session": {
    "presentation": {
      "title": "An Introduction To Media Type Design",
      "brief-description": "Blah Blah Blah",
      "full-description": "Even longer blah Blah Blah",
      "keywords": [
        "javascript",
        "java",
        "http"
      ],
      "length": {
        "preferred": 60,
        "min": 45,
        "max": 90
      },
      "past-sessions": [
        {
          "presentation-date": "20150911",
          "conference": {
            "name": "UberConf"
          }
        }
      ]
    },
    "presenters": [
      {
        "name": "Darrel Miller",
        "email": "darrel@example.com",
        "links": [
          {
            "rel": "self",
            "href": "http://www.bizcoder.com/"
          }
        ]
      },
      {
        "name": "Bob Brown",
        "email": "bob@yahoo.com"
      }
    ]
  }
}
```

it returns `application/ld+json`

```json
{
  "@context": {
    "@vocab": "https://tavis.net/rels/conference-talk/"
  },
  "@graph": [
    {
      "presentation": {
        "title": "An Introduction To Media Type Design",
        "brief-description": "Blah Blah Blah",
        "full-description": "Even longer blah Blah Blah",
        "keywords": [
          "javascript",
          "java",
          "http"
        ],
        "length": {
          "preferred": 60,
          "min": 45,
          "max": 90
        },
        "past-sessions": [
          {
            "presentation-date": "20150911",
            "conference": {
              "name": "UberConf"
            }
          }
        ]
      },
      "presenter": [
        {
          "@id": "http://www.bizcoder.com/",
          "name": "Darrel Miller",
          "email": "darrel@example.com"
        },
        {
          "name": "Bob Brown",
          "email": "bob@yahoo.com"
        }
      ]
    }
  ]
}
```
