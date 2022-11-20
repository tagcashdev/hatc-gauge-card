# HATC-GAUGE-CARD

## Description

Carte personnalisée pour lovelace qui peut être utilisée comme carte ou élément dans une carte button-card par example.

### Fonctionnalité futures
- Choix des positions de l'Icon, État, Unité à l'intérieur de la jauge
- ...

### Fonctionnalité futures (peut-être)
- Posibilité de régler la luminosité, couleur d'une lumière grace à la gauge
- ...

## Options
| Name | Type | Requis | Default | Description | Options |
| ---- | ---- | ------ | ------- | ----------- | ------- |
| type | string | **Obligatoire** | - | `custom:hatc-gauge-card` | - |
| entity | string | **Obligatoire** | - | `sensor.processor_temperature` | - |
| [card](#card-options) | object | Optionnel | null | Permet de changer la hauteur de la carte, [voir exemple](#default) | px |
| [title](#title-options) | string/object | Optionnel | entity.attribute.friendly_name | Permet de changer le titre de la carte, [voir exemple](#titre-simple) | false, '', hide, string, object[voir configuration](#title-options) |
| [gauge](#gauge-options) | object | Optionnel | - | Configuration de la Jauge | - |

## Title Options
| Name | Type | Requis | Default | Description | Options |
| ---- | ---- | ------ | ------- | ----------- | ------- |
| name | string | Optionnel | - | Titre de la carte | - |
| text-align | string | Optionnel | left | Allignement du titre de la carte | left, center, right |
| font-size | string | Optionnel | 22px | Taille du texte du titre de la carte | px, em |
| text-color | string | Optionnel | var(--secondary-text-color) | Couleur du titre de la carte, à noter que severity permet de changer la couleur du texte automatiquement en fonction des couleurs choisi dans l'option severity | severity, red, #ff0000, rgb(255,0,0), var(--color) |
| icon | string | Optionnel | entity.attributes.icon; | Icon du titre de la carte, à noter que severity permet de changer l'icon automatiquement en fonction des icons choisi dans l'option severity | false, mdi:xxx, severity |
| icon-color | string | Optionnel | white | Couleur de l'icon du titre de la carte, à noter que severity permet de changer la couleur du texte automatiquement en fonction des couleurs choisi dans l'option severity | severity, red, #ff0000, rgb(255,0,0), var(--color) |

## Gauge Options
| Name | Type | Requis | Default | Description | Options |
| ---- | ---- | ------ | ------- | ----------- | ------- |
| max_value | string/integer | Optionnel | 100 | Permet de modifier la valeur maximum de la jauge et adapter automatiquement la position de la jauge | - |
| state | string | Optionnel | entity.state | Permet de modifier la valeur de l'état ou de cacher l'état dans la jauge | false, string |
| text-color | string | Optionnel | black | Permet de changer la couleur du text à l'intérieur du cercle de la jauge, à noter que severity permet de changer la couleur du texte automatiquement en fonction des couleurs choisi dans l'option severity | severity, red, #ff0000, rgb(255,0,0), var(--color) |
| font-size | string | Optionnel | 22px | Taille du texte de l'icon & l'état de la jauge | px, em |
| unit_of_measurement | string | Optionnel | hassEntity.attributes.unit_of_measurement | Permet de modifier la valeur de l'unité ou de cacher l'unité dans la jauge | false, string |
| icon | string | Optionnel | entity.attributes.icon; | Icon du de la jauge, à noter que severity permet de changer l'icon automatiquement en fonction des icons choisi dans l'option severity | false, mdi:xxx, severity |
| icon-color | string | Optionnel | white | Couleur de l'icon de la jauge, à noter que severity permet de changer la couleur du texte automatiquement en fonction des couleurs choisi dans l'option severity | severity, red, #ff0000, rgb(255,0,0), var(--color) |
| icon-size | string | Optionnel | 22px | Taille du texte de l'icon de la jauge | px, em |



## Examples


#### Minimum

```yaml
type: custom:hatc-gauge-card
entity: sensor.temperature_moyenne_hall_d_entree
```

#### Default

```yaml
type: custom:hatc-gauge-card
entity: sensor.temperature_moyenne_hall_d_entree

card:
  height: 150px

title: Titre de la carte

gauge:
  max_value: 50 
  text-color: severity
  unit_of_measurement: false
  severity:
    - color: blue
    - color: yellow
      from: 20
      to: 22
    - color: orange
      from: 22
      to: 24
    - color: var(--red)
      from: 24
      to: 26
    - color: purple
      from: 26
      to: 28
    - color: purple
      icon: mdi:xxx
      from: 28
      to: 50
```

#### Titre simple

```yaml
title: Titre de la carte
```

#### Titre options

```yaml
title:
  name: Titre de la carte
  text-align: center
  font-size: 20px
  text-color: red
  icon-color: severity
  icon: severity
```


#### Gauge options

```yaml
gauge:
  max_value: 50 
  text-color: severity
  unit_of_measurement: false
  state: false
  icon: severity
  icon-size: 12px
  icon-color: white
  severity:
    - color: blue
    - color: yellow
      from: 20
      to: 22
    - color: orange
      from: 22
      to: 24
    - color: var(--red)
      from: 24
      to: 26
    - color: purple
      from: 26
      to: 28
    - color: purple
      icon: mdi:xxx
      from: 28
      to: 50
```
