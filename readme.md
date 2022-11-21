# HATC-GAUGE-CARD

## Installation

Se rendre sur HACS, puis dépôt personnalisé ajouter https://github.com/tagcashdev/hatc-gauge-card au Dépot et choisir catégorie Lovelace

![Dépots personnalisé](https://github.com/tagcashdev/hatc-gauge-card/blob/main/img/installation.png)

Puis appuyer sur le bouton (+ Explorer et télécharger des dépôts), chercher HATC et installer.
Enjoy !

## Description

Carte personnalisée pour lovelace qui peut être utilisée comme carte ou élément dans une carte button-card par example.

### Fonctionnalité futures
- Choix des positions de l'Icon, État, Unité à l'intérieur de la jauge
- ...

### Fonctionnalité futures (peut-être)
- Posibilité de régler la luminosité, couleur d'une lumière grace à la gauge
- ...
- Contactez-moi pour proposer des idées

***
Merci de soutenir mon travail en téléchargeant cette carte personnalisé !
Si vous aimez mon travail likez, abonnez-vous au repo :) Et si vous souhaitez contribuer aux nombreux café que je consomme vous pouvez m'offrir 1 ct ou plus grâce à ce lien : https://www.paypal.me/tagcash
***

#### Options
| Name | Type | Requis | Default | Description | Options |
| ---- | ---- | ------ | ------- | ----------- | ------- |
| type | string | **Obligatoire** | - | `custom:hatc-gauge-card` | - |
| entity | string | **Obligatoire** | - | `sensor.processor_temperature` | - |
| [card](https://github.com/tagcashdev/hatc-gauge-card/#card-options) | object | Optionnel | null | Permet de changer la hauteur de la carte, [voir exemple](https://github.com/tagcashdev/hatc-gauge-card/#default) | px |
| [title](https://github.com/tagcashdev/hatc-gauge-card/#title-options) | string/object | Optionnel | entity.attribute.friendly_name | Permet de changer le titre de la carte, [voir exemple](https://github.com/tagcashdev/hatc-gauge-card/#titre-simple) | false, '', hide, string, object [voir configuration](https://github.com/tagcashdev/hatc-gauge-card/#title-options) |
| [gauge](https://github.com/tagcashdev/hatc-gauge-card/#gauge-options) | object | Optionnel | - | Configuration de la Jauge | - |

#### Card Options
| Name | Type | Requis | Default | Description | Options |
| ---- | ---- | ------ | ------- | ----------- | ------- |
| height | string | Optionnel | - | Hauteur de la carte | px |


#### Title Options
| Name | Type | Requis | Default | Description | Options |
| ---- | ---- | ------ | ------- | ----------- | ------- |
| name | string | Optionnel | - | Titre de la carte | - |
| text-align | string | Optionnel | left | Allignement du titre de la carte | left, center, right |
| font-size | string | Optionnel | 22px | Taille du texte du titre de la carte | px, em |
| text-color | string | Optionnel | var(--secondary-text-color) | Couleur du titre de la carte, à noter que severity permet de changer la couleur du texte automatiquement en fonction des couleurs choisi dans l'option severity | severity, red, #ff0000, rgb(255,0,0), var(--color) |
| icon | string | Optionnel | entity.attributes.icon; | Icon du titre de la carte, à noter que severity permet de changer l'icon automatiquement en fonction des icons choisi dans l'option severity | false, mdi:xxx, severity |
| icon-color | string | Optionnel | white | Couleur de l'icon du titre de la carte, à noter que severity permet de changer la couleur du texte automatiquement en fonction des couleurs choisi dans l'option severity | severity, red, #ff0000, rgb(255,0,0), var(--color) |

#### Gauge Options
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
| [severity](https://github.com/tagcashdev/hatc-gauge-card/#severity-options) | object | Optionnel | - | Configuration severity | - |

#### Severity Options
| Name | Type | Requis | Default | Description | Options |
| ---- | ---- | ------ | ------- | ----------- | ------- |
| color | string | Optionnel | - | couleur à utiliser | red, #ff0000, rgb(255,0,0), var(--color) |
| from | integer | Optionnel | - | A partir de | number |
| to | integer | Optionnel | - | jusqu'à | number |
| icon | integer | Optionnel | - | Icon à utiliser | mdi:xxx |

## Examples

#### Minimum

```yaml
type: custom:hatc-gauge-card
entity: sensor.temperature_moyenne_hall_d_entree
```
![Minimum](https://github.com/tagcashdev/hatc-gauge-card/blob/main/img/minimum.png)

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
![Titre Simple](https://github.com/tagcashdev/hatc-gauge-card/blob/main/img/titre-simple.png)

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
![Titre options](https://github.com/tagcashdev/hatc-gauge-card/blob/main/img/titre-options.png)

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
![Gauge Options](https://github.com/tagcashdev/hatc-gauge-card/blob/main/img/gauge-options.png)

#### Severity options

```yaml
gauge:
  severity:
    - color: #0000FF
    - color: rgb(0,255,00)
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
