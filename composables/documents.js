const document_types = {
  "annual": {
    "name": "Informe anual",
    "colors": ['#dabdff', '#c192ff', 'primary'],
    "v_color": "primary",
  },
  "quarterly": {
    "name": "Informe trimestral",
    "colors": ['#dabdff', '#c192ff', 'primary'],
    "v_color": "primary",
    "has_range": true,
  },
  "monthly": {
    "name": "Boletín Mensual",
    "colors": ['#dabdff', '#c192ff', 'primary'],
    "v_color": "primary",
    "has_range": true,
  },
}
const default_type = {
  name: "Informe",
  colors: ['#feaabc', '#fd7291', 'indigo'],
  v_color: "indigo",
  "has_range": false,
}

export function getDocumentType(type) {
  return document_types[type] || default_type
}

