---
title: Conference Talk Media Type
abbrev:
docname: draft-miller-conference-talk-01
date: 2015
category: info

ipr: trust200902
area: General
workgroup:
keyword: Internet-Draft

stand_alone: yes
pi: [toc, tocindent, sortrefs, symrefs, strict, compact, subcompact, comments, inline]

author:
 -
    ins: D. Miller
    name: Darrel Miller
    organization: Tavis Software Inc.
    email: darrel@tavis.ca
    uri: http://www.bizcoder.com


--- abstract

This draft document is a media type specification for describing a conference talk proposals, presenters and presentations.  This format aims to standardize the format of information shared between software components used by conference organizers, speakers and attendees. It is intended to reduce the effort required for speakers to submit session proposals and for conference organizers to process those submissions.

--- note_Note_to_Readers

The issues list for this draft can be found at <https://github.com/darrelmiller/conference-talk/issues>.


--- middle

# Introduction
In the technology world, one way we share knowledge is via conferences.  In order to have a conference we need speakers to do talks.  Conferences commonly go through a process called _call for proposals_ (CFP) where speakers who are interested submit talk proposals to the conference and then the conference organizers sift through these proposals and select the talks they believe will provide the best value to their attendees.

There are a very wide range of methods used by conferences for collecting these proposals:  Google docs, Excel spreadsheets, plain text emails, wikis, custom web sites, commercial conference management systems.  Each of these systems have slightly different ways of collecting information that is mostly the same.  

Many conferences are run by volunteers with minimal budgets and many speakers do so at their own expense.  Any possibility to improve the efficiency of the process of submitting proposals and processing them could provide significant value to a large number of conference participants.

## Goals
Easier for speakers to submit

 - Easy for authoring tools to generate
 - Minimal formatting capability
 - Author once, submit anywhere with minimal changes
 - Hypermedia links to presenter info.

Easier for conference organizers to process

 - Simple for conference organizers to import
 - Zero UI submission process.
 - Easier to process submissions (queryable structures)
 - Standard UIs can be built to process submission format

## Usage Scenarios

There are a wide range of scenarios that could be enabled by this common format:

- Client Authoring tools that offer a good editing experience for creating new proposals.  (Maybe not, because it is not a content creation format)
- Conference API for accepting proposals.
- Convert to HTML/PDF for submission to non-automated conferences or for publication of selected talks on conference website.
- Searchable repository of past talks with links to slides and videos.
- Central repository of available speakers talks.  Reverse the process so that conferences go looking for speakers instead of the other way around.

## Notational Conventions

The key words \"MUST\", \"MUST NOT\", \"REQUIRED\", \"SHALL\", \"SHALL NOT\", \"SHOULD\", \"SHOULD NOT\",
\"RECOMMENDED\", \"MAY\", and \"OPTIONAL\" in this document are to be interpreted as described in
{{!RFC2119}}.


# Conference Talk JSON Document

The canonical model for a conference-talk document is a JSON object as defined in the I-JSON specification {{!RFC7493}}. The properties of the JSON object can be any valid vocabulary term from this specification. Unrecognized vocabulary should be ignored unless a consumer explicitly requests strict processing of the document.

A minimal submission might look like this:

~~~~~~~~~~

    { "proposal" : {
     "title" : "An Introduction To Media Type Design",
     "brief-description" : "Blah Blah Blah",
     "presenter" : {
       "name" : "Darrel Miller",
       }
      }}

~~~~~~~~~~

A more complete proposal might look like,

~~~~~~~~~~

{
  "proposal": {
    "title": "An Introduction To Media Type Design",
    "brief-description": "Blah Blah Blah",
    "full-description": "Even longer blah Blah Blah",
    "keywords": ["javascript", "java", "http"],
    "length": {
      "preferred": 60,
      "min": 45,
      "max": 90
    },
    "presenters": [{
      "name": "Darrel Miller",
      "email": "darrel@example.com"
    },
    {
      "name" : "Bob Brown",
      "email" : "bob@yahoo.com"
      }]
  },

  "past-presentations": [{
    "presentation-date": "20150911",
    "conference": "UberConf"
  }]
}

~~~~~~~~~~

This specification is intended primarily to describe a message format that only exists to transfer information between two independent systems. It is not intended as a persistence format or a content creation format. JSON is ideal for this purpose. However, it should be fairly straightforward to apply the structure and semantics defined in this document to other formats.

# Structure
This media type is designed to hold information related to conference proposals, their presenters and the presentations of those sessions.  However, it imposes minimal structural constraints on the document. This is done in order to support as many scenarios as possible. A document instance may be used to submit a new proposal to a conference. Or it may be used to return a list of presentations that were held at a conference. It can also be used to return a list of presenters who will be speaking at a conference. The overall structure is fairly flexible, but the semantics of the named structures within the document are well defined.  

A conference-talk document may be valid, but still incompatible with a particular resource that only accepts `conference-talk` documents structured in a certain way.

## Root
The root of the document MUST be a JSON object, whose properties names are structures defined in this vocabulary.

~~~~~~~~~~
    {
      "presenter" : {...} },
      "proposals" : [...] },
      "presentations" : [...] },
    }
~~~~~~~~~~

There is no fixed structure to the root object. It can contain any number of properties that are either objects or arrays.

## 1:1 Relationships
Certain structures can contain other structures in a 1:1 relationship. E.g.

- A `proposal` structure can contain a `presenter` structure or `presenters` array to indicate the  presenter(s).  
- A `presentation` structure can contain a `presenter` structure indicating who was the primary presenter of a past presentation.
- A `presentation` structure can contain a `proposal` structure indicating the proposal that was submitted and selected for the presentation.
- A `presentation` structure can contain a `conference` structure indicating the conference at which the presentation was presented.

## 1:M Relationships
Lists of structures can be contained as an attribute of other structures to indicate a relationship between the structures.  For example:

- `presenter` can have a list attribute called `proposals` containing `proposal` structures.
- `presenter` can have a list attribute called `presentations` containing `presentation` structures.
- `proposal` can have a list attribute called `past-presentations` containing `presentation` structures.
- `proposal` can have a list attribute called `presenters` containing `presenter` structures.

## Links
All structures defined in this vocabulary can contain a property called  `links`.  This property contains an array of `link` objects.  Links are a way to break apart pieces of the document for the purposes of reuse and controlling granularity.  Through the use of relative URIs and fragments we can use links with the document to reduce redundancy.

~~~~~~~
links : [
          { "rel" : "",
            "href" : ""},
          { "rel" : "",
            "href" : ""}
          ]
~~~~~~~

Note: There was no need to adopt the HAL convention of using _Links as the allowed vocabulary is explicitly defined for this media type.  The array of links was chosen instead of an object to allow multiple link relations of the same type without having to define multiple arrays.

### link

#### rel
Link relations values defined in the `conference-talk` conference talk document can be used as simple strings as long as they are prefixed with a period. However, any parsing tool must map them to a URI using the following URI template https://tavis.net/rels/conference-talk/{relname}.

#### href
The href property can resolve to a relative URI and use relative fragment identifiers to point to content within the current document. Fragment identifiers follow the scheme defined by the JSON-Pointer specification. This prevents the need to duplicate content within a document.

For example, the sample below has an array of proposals, and each one points to a presenter structure and conference structure.
~~~~~~~~~~

    { "proposals" : [{
     "title" : "An Introduction To Media Type Design",
     "brief-description" : "Blah Blah Blah",
    "links" [
      { "rel" : ".presenter", "href" : "#presenter"},
      { "rel" : ".conference", "href" : "#conference"}
    ]
    },
    {
    "title" : "Crafting Evolvable Representations",
    "brief-description" : "Double blah",
    "links" [
      { "rel" : ".presenter", "href" : "#presenter"},
      { "rel" : ".conference", "href" : "#conference"}
    ]
    },
    ],
  "presenter" : {
      "name" : "Darrel Miller",
      "bio"  : "blah blah blah"
    },
  "conference" : {
      "name" : "The Meta Conference",
      "description"  : "The conference about conferences"
     }
    }

~~~~~~~~~~

# Vocabulary

## Arrays of Structures

### proposals
An array of `proposal` structures.

### presentations
An array of `presentation` structures.

### presenters
An array of `presenter` structures.

### conferences
An array of `conference` structures.

## proposal
The proposal structure represents a description of a single conference session.  The only required property of the proposal structure is the title property.

### title
The title property is a single sentence description of the talk, normally used as a heading.  This is a required property.  Physical limits on the size of descriptive fields like this one are left to the choice of implementers.  If a specific implementation chooses to limit titles to 80 characters and it subsequently receives a document with a title that exceeds that amount, the implementation must choose whether to refuse the content, or to truncate it.

### brief-description
Conferences often ask for short descriptions of sessions to be used on web sites or in promotional material. Some conferences insist on brief descriptions to reduce the time it takes for the selection committee to process the proposals.  This specification currently does not enforce the size of a brief description and therefore there may be cases where a brief-description submitted to one conference is not accepted to another because they have differing opinions on what brief means. Feedback will drive whether a hard limit is included in this specification.

### full-description
Sometimes a brief description is sufficient to spark interest in a talk, but the reader wishes to get more details.  The full-description of the session can be used to go into detail about the presentation.  Implementations can choose whether this description is made public or not.

### selection-notes
It is common for proposals to have additional information that is only directed at the selection committee. This information would not be made public.

### tags
The tags attribute contains an array of strings used for the purpose of classifying talks into categories. Although different conferences may use different sets of tags, in a communication between speaker and conference organizer, only one set of tags is valid.  For client applications that might store conference proposals for speakers, it may be necessary to store multiple sets of tags to accomadate submissions to different conferences.  However, this specification is not aiming to describe a storage format.

~~~~~~~

tags : ["testing","performance"]

~~~~~~~

### target-audience
Conference sessions are often rated based on their technical difficulty.This property is numeric value on the scale of 1 to 5, where 1 indicates no experience is required to benefit from the session, to 5 which indicates the audience require a strong knowledge in the subject matter to fully appreciate the talk.

~~~~~~~
target-audience : 1
~~~~~~~

Conference organizers are free to map this range of values to whatever equivalent ranking scheme they use.

### length
Different conferences have different sessions lengths.  Sometimes the same conference has sessions of different lengths.  It is not uncommon for speakers to have some flexibility in how long a particular talk can take.  In order to accomodate these different scenarios, the length property is defined using three values : `preferred-length`,`max-length` and `min-length`.  All three values are specified in integer minutes.
By specifying a range, conferences can determine if a talk can fit into the planned slots.

~~~~~~~
length : {
  "preferred" : 45,
  "max": 60,
  "min" : 30
}
~~~~~~~


### languages
Some conferences are multi-lingual and sometimes speakers are able to perform talks in multiple languages.  The language property contains an array of language codes as described in {{!RFC5646}}.

~~~~~~~
language : ["en","fr"]
~~~~~~~

### talk-style
Style is an identifier that classifies the type of talk being submitted.  This value is a string identifier from a set of valid values as defined by the conference being submitted to.

~~~~~~~
talk-style : "workshop"
~~~~~~~

## presenter
A `presenter` structure represents the information about a person who will or who has presented a conference talk.

### name
The name attribute is a string value that contains the name of the present for purposes of displaying the name.

### email
The email property

~~~~~~~
email = <addr-spec see {{!RFC2822}}, Section 3.4.1>
~~~~~~~

### airport
The home airport of the presenter. This information is used to approximate travel costs for speakers and aid in the selection process. This is a string value.

### dietary-requirement
An identifier selected from the list of available values as defined by the conference. This is a string value.

### t-shirt-preference
An identifier selected from the list of available values as defined by the conference. This is a string value.

## presentation
The `presentation` structure is a historical record of a talk described by a proposal structure that has been presented at a conference.

### presentation-date
This property represents the date that a particular talk was given. The date should be in ISO 8601 format as required by I-JSON.  

### conference
The name of the conference where the presentation was given. This is a string value.

### location
The physical location where conference is being held. This can simply country or city and country. This is a string value.  

### special-requirements
This is a free form text field used to communicate to the conference organizers any special hardware, setup, or environmental requirements needed for this talk to be presented. This is a string value.

### attendee-quantity
This field is a number that provides an approximate quantity of people who attended the presentation.

## conference
The `conference` structure is used to describe its purpose, its location, the timeline of events and the domains of valid values for properties like, `tags`, `talk-style` and `languages`.  It also can contain limits such as maximum lengths for `brief-description`, and `full-description`.   

### talk-style-domain
TK

### tags-domain
TK

### languages-domain
TK

### brief-description-max-size
TK

### full-description-max-size
TK

### t-shirt-domain
TK

### dietary-requirement-domain
TK

# Link Relations

### video-recording
This is a URL that points to a video recording of the presentation.

### slides
This is a URL that points to a the slide deck used in the presentation.

### presenter
This is a URL that points to the details relating to the presenter of the presentation.

### presentations
This is a URL that points to a list of presentations.

### conference
This is a URL that points to information about a conference.


# IANA Considerations {#iana}


## Registrations


# Security Considerations


# Appendix 1 : Mapping to HTML

# Appendix 2 : Mapping to ALPS

# Appendix 2 : Mapping to SIREN

--- back

# Acknowledgements
