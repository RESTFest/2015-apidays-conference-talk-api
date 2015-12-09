import uuid from 'uuid';

const PRESENTATION_KEYS = [
  'title',
  'brief-description',
  'full-description',
  'keywords'
];

export default function(json) {
  let doc = { data: {}, included: [] };

  doc.data = sessionDocument();

  let presentation = presentationDocument();

  let presenters = json.session.presenters.map((presenter) => {
    let doc = presenterDocument();

    doc.attributes.name = presenter.name;
    doc.attributes.email = presenter.email;

    return doc;
  });

  doc.data.relationships = {
    presentation: {
      data: {
        id: presentation.id,
        type: presentation.type
      }
    },
    presenters: {
      data: presenters.map((presenter) => {
        return {
          id: presenter.id,
          type: presenter.type
        }
      })
    }
  };

  PRESENTATION_KEYS.forEach((key) => {
    presentation.attributes[key] = json.session.presentation[key];
  });

  doc.included.push(presentation);

  doc.included.push(...presenters);

  return doc;
}

function sessionDocument() {
  return baseDocument('session');
}

function presentationDocument() {
  return baseDocument('presentation');
}

function presenterDocument() {
  return baseDocument('presenter');
}

function baseDocument(type) {
  return {
    id: uuid.v4(),
    type: type,
    attributes: {},
    relationships: {}
  };
}
