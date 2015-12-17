# conference-talk
Media Type Specification for information related to conference talks.

The specification is written as a Markdown document with [Kramdown-rfc2629](https://github.com/cabo/kramdown-rfc2629) notation. This Ruby library will generate an XML document structured based on the [RFC2629](http://tools.ietf.org/html/rfc2629) semantics. This XML can be used as input to the [xml2Rfc](http://xml2rfc.ietf.org/) tool.

A powershell script is included for Windows users:

    kramdown-rfc2629 conference-talk.md > output/conference-talk.xml
    python.exe c:\bin\python2\scripts\xml2rfc output/conference-talk.xml --html

Paths may need to be changed. 

## Related Projects

* [Jekyll-Conference-Talk](https://github.com/switzersc/jekyll-conference-talk) - This is a jekyll blog template that helps you incorporate your conference-talk json into a Jekyll blog to display talks you've given. 
