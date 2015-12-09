/* jshint asi: true */

var UUID = require('node-uuid')
var _ = require('lodash')
var objectAssign = require('object-assign')

var example = require('../../examples/linked-proposal.json')

function genId (obj) {
  var id = '_:' + UUID.v4()
  if (obj) {
    var self = _.find(obj.links, function(link) { return link.rel === 'self' })
    if (self) {
      id = self.href
    }
  }
  return id
}

/*
 *
 */

function process(obj) {
 // 1) check if rel="self" and use href for @id
 return {
   '@id': genId (obj)
 }
}

module.exports = function(data, url) {
  var jsonld = { }
  jsonld['@context'] = require('./context.json')['@context']
  var graphName = '@graph'
  if (url) {
    graphName = url
  }
  jsonld[graphName] = []
  if (data.session) {
    var session = process({})
    if (data.session.presenters) {
      jsonld[graphName].presenter = []
      _.each(data.session.presenters, function(presenter) {
        jsonld[graphName].push(process(presenter))
      })
    }
  }
  return jsonld
}

console.log(JSON.stringify(module.exports(example)))
