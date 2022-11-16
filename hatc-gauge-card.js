
var LitElement = LitElement || Object.getPrototypeOf(customElements.get("ha-panel-lovelace"));
var html = LitElement.prototype.html;
var css = LitElement.prototype.css;

function isObject(val) {
    return val instanceof Object; 
}

function calcPercent(sValue, sMax){
    return sValue / sMax * 100;
}

class HatcGaugeCard extends LitElement {
    static get properties() {
        return {
            hass: {},
            config: {}
        };
    }

    static getConfigElement() {
        console.log("getConfigElement");
    }

    static getStubConfig() {
        return { entity: "sun.sun" }
    }

    // Whenever the state changes, a new `hass` object is set. Use this to
    // update your content.
    render() {
        const hassEntity = this.hass.states[this.config.entity];
        if(hassEntity){
            var showTitleEntity = true;
            var showStateEntity = true; 
            var showIconEntity = true; 
            var showUnitOfMeasurmentEntity = true;

            var icon;
            var textFillColor;

            if(typeof hassEntity.attributes.icon !== 'undefined'){
                icon = hassEntity.attributes.icon;
            }

            // Header
            var h = {}; var hTitle = (typeof this.config.title !== 'undefined') ? this.config.title : '';
            if(isObject(hTitle)){
                h['font-size'] = (typeof hTitle['font-size'] !== 'undefined') ? "--mdc-icon-size:" + hTitle['font-size'] + "; font-size:" + hTitle['font-size'] + "; " : '';

                if(typeof hTitle['text-align'] !== 'undefined'){
                    if(hTitle['text-align'] == 'left'){
                        h['text-align'] = "justify-content: flex-start";
                    }else if(hTitle['text-align'] == 'right'){
                        h['text-align'] = "justify-content: flex-end";
                    }else{
                        h['text-align'] = "justify-content: center";
                    }
                }

                h['color'] = (typeof hTitle['text-color'] !== 'undefined') ? "color:" + hTitle['text-color'] + "; " : '';

                h['style'] = h['font-size'] + h['color'];

                h['name'] = (typeof hTitle.name !== 'undefined') ? hTitle.name : '';
                h['icon'] = (typeof hTitle.icon !== 'undefined') ? hTitle.icon : icon;
            }else{
                h['name'] = hTitle;
            }

            var heTitle = showTitleEntity ? hassEntity.attributes.friendly_name : '';
            var heUnitOfMeasurement = showUnitOfMeasurmentEntity ? hassEntity.attributes.unit_of_measurement : '';
            var heState = showStateEntity ? hassEntity.state : '';
            var heIcon = showIconEntity ? (typeof h.icon !== 'undefined' ? h.icon : icon) : '';


            // Gauge
            var g = {}; var hGauge = (typeof this.config.gauge !== 'undefined') ? this.config.gauge : '';
            if(isObject(hGauge)){
                g['textfillcolor'] = (typeof hGauge['text-color'] !== 'undefined') ? hGauge['text-color'] : '';
                g['fontsize'] = (typeof hGauge['font-size'] !== 'undefined') ? hGauge['font-size'] : '0.45em';
                //g['icon'] = (typeof hGauge['icon'] !== 'undefined') ? hGauge['icon'] : '';
                g['friendlyname'] = (typeof hGauge['friendly_name'] !== 'undefined') ? hGauge['friendly_name'] : heTitle;
                g['unitofmeasurement'] = (typeof hGauge['unit_of_measurement'] !== 'undefined') ? hGauge['unit_of_measurement'] : heUnitOfMeasurement;
                g['maxvalue'] = (typeof hGauge['max_value'] !== 'undefined') ? hGauge['max_value'] : '100';
            }
            this.config.gauge.severity.map(s => {
                if(typeof s.form === 'undefined' && typeof s.to === 'undefined' && typeof s.color !== 'undefined'){
                    textFillColor = s.color;
                }
                if(parseFloat(heState) >= s.from && parseFloat(heState) <= s.to){
                    textFillColor = s.color;
                }
            });
            if(g['textfillcolor'] == "severity" || g['textfillcolor'] == ""){
                g['textfillcolor'] = textFillColor;
            }

            var heTextFillColor = g['textfillcolor'];
            var hePathStrokeColor = textFillColor;

            var hE = {
                "heTitle": (g.friendlyname !== '' && g.friendlyname !== false && g.friendlyname !== 'hide') ? g.friendlyname : '',
                "heState": heState,
                "heUnitOfMeasurement": (g.unitofmeasurement !== '' && g.unitofmeasurement !== false && g.unitofmeasurement !== 'hide') ? g.unitofmeasurement : '',
                "heIcon": heIcon,
                "hePathStrokeColor" : hePathStrokeColor,
                "heTextFillColor" : heTextFillColor,
            }

            var hIconHTML = (hE.heIcon !== '' && hE.heIcon !== false && hE.heIcon !== 'hide') ? html`<ha-icon style="${h['font-size']}" .icon="${hE.heIcon}"></ha-icon>` : '';
            var hNameHTML = (h.name !== '' && h.name !== false && h.name !== 'hide') ? html`<div style="${h.style}" class="name">${h.name}</div>` : '';
            
            var innerHTML = html`
                <svg viewBox="0 0 36 36" style="display: block; margin: 10px auto; max-width: 100%; max-height: 100%;">
                    <path style="fill: none; stroke: #343434; stroke-width: 2.0;"
                          d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                    <path style="stroke: ${hE.hePathStrokeColor}; fill: none; stroke-width: 2.8; stroke-linecap: round; animation: progress 1s ease-out forwards;"
                          stroke-dasharray="${calcPercent(hE.heState, g.maxvalue)}, 100"
                          d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                    <text x="50%" y="50%" style="fill: ${hE.heTextFillColor}; font-family: sans-serif; text-anchor: middle;" font-size="${g.fontsize}" alignment-baseline="central">
                        ${hE.heState}${hE.heUnitOfMeasurement}
                    </text>
                    <text x="50%" y="55%" font-size="0.25em" alignment-baseline="central" style="fill: var(--secondary-text-color); font-family: sans-serif; text-anchor: middle; text-overflow: ellipsis; overflow: hidden; white-space: nowrap;">
                        ${hE.heTitle}
                    </text>
                </svg>
            `;

            return html`
                <ha-card class="HatcGaugeCard">
                    <div class="box">
                        <div class="header" style="${h['text-align']}">
                            ${hIconHTML}
                            ${hNameHTML}
                        </div>

                        <div class="entities">
                            ${innerHTML}
                        </div>
                    </div>
                </ha-card>
            `;
        }else{
            return html`
                <div class="not-found">l'entité "${this.config.entity}" n'à pas été trouvé.</div>
            `;
        }
    }

    // The user supplied configuration. Throw an exception and Home Assistant
    // will render an error card.
    setConfig(config) {
        if (!config.entity) {
            throw new Error('Veuillez ajouter un "Entity" dans votre configuration');
        }
        this.config = config;
    }

    // The height of your card. Home Assistant uses this to automatically
    // distribute all cards over the available columns.
    getCardSize() {
        return this.config.entities.length + 1;
    }

    _toggle(state, service) {
        this.hass.callService(service, "toggle", {
            entity_id: state.entity_id
        });
    }

    _handlePopup(e) {
        if (!this.config.tap_action) {
            return;
        }
        e.stopPropagation();
    }

    _handleEntities(e, entity) {
        var ent = entity || {};

        if (!ent['tap_action']) {
            ent = {
                tap_action: {
                    action: "more-info",
                    ...ent
                }
            }
        }
        
        e.stopPropagation();
    }

    static get styles() {
        return css`
            :root, .HatcGaugeCard *{
                --mdc-icon-size: 16px;   
                --card-padding: 8px;
            }
            .HatcGaugeCard .box{
                padding: var(--card-padding);
            }
            .HatcGaugeCard .box div.name{
                color: var(--secondary-text-color);
                line-height: 40px;
                font-weight: 500;
                font-size: 16px;
                overflow: hidden;
                white-space: nowrap;
                text-overflow: ellipsis;
            }

            .HatcGaugeCard .box .header{
                display: flex;
                flex-direction: row;
                flex-wrap: nowrap;
                align-content: center;
                justify-content: flex-start;
                align-items: center;
            }
        `;
    }
}

customElements.define('hatc-gauge-card', HatcGaugeCard);