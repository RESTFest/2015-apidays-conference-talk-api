#!/bin/bash

kramdown-rfc2629 conference-talk.md > output/conference-talk.xml
xml2rfc output/conference-talk.xml --html
