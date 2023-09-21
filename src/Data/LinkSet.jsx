
import { Component } from "react";
import Link from "react-dom";

import axios from "axios";

export const BUTTON_ELEMENT = "button";
export const LABEL_ELEMENT = "label";
export const CATEGORY_ELEMENT = "category";

class Telemetry {
    constructor(props) {
        this.url = props.url;
    }

    onClick() {
        // axios.post("/api/telemetry", {
        //     "type": "click_url",
        //     "url": this.url
        // });
    }
}

export class LayoutElement extends Telemetry {
    constructor(props) {
        super(props);
        const { type, label, icon, url } = props;

        this.url = url;
        this.icon = icon;
        this.hasBackground = type === BUTTON_ELEMENT;
        this.type = type;
        this.label = label;
    }

    render(key) {
        let iconComp = (this.icon ? <img src={this.icon} alt={this.label} /> : (<div style={{ width: "48px", height: this.type === BUTTON_ELEMENT ? "48px" : "0px" }}></div>));

        return (
            <div className={"layout-element-parent layout-element-" + this.type + "-parent"}>
                <a key={key} target="_blank" href={this.url} className={"layout-element layout-element-" + this.type} onClick={() => this.onClick()}>
                    {iconComp}
                    <span>{this.label}</span>
                </a>
            </div>
        );
    }
}

export class SocialLink extends Telemetry {
    constructor(props) {
        super(props);
        const { url, label, icon } = props;

        this.url = url;
        this.label = label;
        this.icon = icon;
    }

    render(key) {
        return (
            <div className="social-link-icon">
                <a key={key} target="_blank" href={this.url} onClick={() => this.onClick()}>
                    <img src={this.icon} alt={this.label} title={this.label} />
                </a>
            </div>
        );
    }
}

export function parseLayoutElementsFromJSON(json) {
    return json.map((element) => {
        let type = element.type;
        let label = element.label;
        let icon = element.icon;
        let url = element.url;
        return new LayoutElement({ type, label, icon, url });
    });
}

export function parseSocialLinksFromJSON(json) {
    return json.map((link) => {
        let url = link.url;
        let label = link.label;
        let icon = link.icon;
        return new SocialLink({ url, label, icon });
    });
}

export class LinkSet {
    constructor(props) {
        this.layout = [];
        this.socials = [];
    }

    fromJson(json) {
        this.layout = parseLayoutElementsFromJSON(json.layout);
        this.socials = parseSocialLinksFromJSON(json.socials);
        return this;
    }

    addLayoutElement(element) {
        this.layout.push(element);
        return this;
    }

    addSocial(social) {
        this.socials.push(social);
        return this;
    }

    toReact() {
        return (
            <div className="link-set">
                <div className="link-layout">{this.layout.map((l, idx) => l.render(idx))}</div>
                <div className="social-media">{this.socials.map((l, idx) => l.render(idx))}</div>
            </div>
        );
    }
}