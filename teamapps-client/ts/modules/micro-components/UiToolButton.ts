/*-
 * ========================LICENSE_START=================================
 * TeamApps
 * ---
 * Copyright (C) 2014 - 2025 TeamApps.org
 * ---
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 * 
 *      http://www.apache.org/licenses/LICENSE-2.0
 * 
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =========================LICENSE_END==================================
 */

import {TeamAppsUiContext} from "../TeamAppsUiContext";
import {
	UiToolButton_ClickedEvent,
	UiToolButton_DropDownOpenedEvent,
	UiToolButtonCommandHandler,
	UiToolButtonConfig,
	UiToolButtonEventSource
} from "../../generated/UiToolButtonConfig";
import {AbstractUiComponent} from "../AbstractUiComponent";
import {TeamAppsEvent} from "../util/TeamAppsEvent";
import {UiDropDown} from "./UiDropDown";
import {UiItemView} from "../UiItemView";
import {bind} from "../util/Bind";
import {TeamAppsUiComponentRegistry} from "../TeamAppsUiComponentRegistry";
import {parseHtml, stopEventPropagations} from "../Common";
import {UiComponent} from "../UiComponent";

export class UiToolButton extends AbstractUiComponent<UiToolButtonConfig> implements UiToolButtonEventSource, UiToolButtonCommandHandler {

	public readonly onClicked: TeamAppsEvent<UiToolButton_ClickedEvent> = new TeamAppsEvent();
	public readonly onDropDownOpened: TeamAppsEvent<UiToolButton_DropDownOpenedEvent> = new TeamAppsEvent();

	private $button: HTMLElement;
	private $icon: HTMLElement;
	private $caption: HTMLElement;

	private _dropDown: UiDropDown; // lazy-init!
	private dropDownComponent: UiComponent;
	private minDropDownWidth: number;
	private minDropDownHeight: number;
	private openDropDownIfNotSet: boolean;

	constructor(config: UiToolButtonConfig, context: TeamAppsUiContext) {
		super(config, context);

		this.minDropDownWidth = config.minDropDownWidth;
		this.minDropDownHeight = config.minDropDownHeight;
		this.openDropDownIfNotSet = config.openDropDownIfNotSet;

		this.$button = parseHtml(`<div class="UiToolButton" title="${config.title ?? ''}">
	<div class="img ${config.grayOutIfNotHovered ? 'gray-out-if-not-hovered' : ''}" style="background-image: url('${config.icon}');"></div>
	<div class="caption">${config.caption ?? ""}</div>
</div>`);
		this.$icon = this.$button.querySelector(":scope .img");
		this.$caption = this.$button.querySelector(":scope .caption");
		this.$button.addEventListener('click', () => {
			if (this.dropDownComponent != null || this.openDropDownIfNotSet) {
				if (!this.dropDown.isOpen) {
					const width = this.getMainElement().offsetWidth;
					this.dropDown.open({
						$reference: this.getMainElement(),
						width: Math.max(this.minDropDownWidth, width),
						minHeight: this.minDropDownHeight
					});
					this.onDropDownOpened.fire({});
					this.getMainElement().classList.add("open");
				} else {
					this.dropDown.close(); // not needed for clicks, but for keydown!
				}
			}
			this.onClicked.fire({});
		});
		stopEventPropagations(this.$button, "mousedown", "pointerdown", "click")
		this.setIconSize(config.iconSize);
		this.setDropDownComponent(config.dropDownComponent as UiComponent);
	}

	private get dropDown(): UiDropDown {
		// lazy-init!
		if (this._dropDown == null) {
			this._dropDown = new UiDropDown();
			this._dropDown.getMainDomElement().classList.add("UiButton-dropdown");
			this._dropDown.onClose.addListener(() => this.getMainElement().classList.remove("open"))
		}
		return this._dropDown;
	}

	doGetMainElement(): HTMLElement {
		return this.$button;
	}

	setDropDownSize(minDropDownWidth: number, minDropDownHeight: number): void {
		this.minDropDownWidth = minDropDownWidth;
		this.minDropDownHeight = minDropDownHeight;
	}

	setDropDownComponent(component: UiComponent): void {
		if (this.dropDownComponent != null && this.dropDownComponent instanceof UiItemView) {
			this.dropDownComponent.onItemClicked.removeListener(this.closeDropDown);
		}
		if (component != null) {
			this.dropDownComponent = component;
			if (this.dropDownComponent instanceof UiItemView) {
				this.dropDownComponent.onItemClicked.addListener(this.closeDropDown);
			}
			this.dropDown.setContentComponent(this.dropDownComponent);
		} else {
			this.dropDownComponent = null;
			this.dropDown.setContentComponent(null);
		}
	}

	@bind
	public closeDropDown() {
		this.dropDown.close();
	}

	setOpenDropDownIfNotSet(openDropDownIfNotSet: boolean): void {
		this.openDropDownIfNotSet = openDropDownIfNotSet;
	}

	setGrayOutIfNotHovered(grayOutIfNotHovered: boolean): void {
		// TODO
	}

	setIcon(icon: string): void {
		this.$icon.style.backgroundImage = `url('${icon}')`;
	}

	setIconSize(iconSize: number | null): any {
		if (iconSize != null) {
			this.$icon.style.width = `${iconSize}px`;
			this.$icon.style.height = `${iconSize}px`;
			this.$icon.style.backgroundSize = `${iconSize}px`;
		} else {
			this.$icon.style.width = null;
			this.$icon.style.height = null;
			this.$icon.style.backgroundSize = null;
		}
	}

	setCaption(caption: string) {
		this.$caption.innerText = caption;
	}

	setTitle(title: string) {
		this.getMainElement().title = title;
	}


}

TeamAppsUiComponentRegistry.registerComponentClass("UiToolButton", UiToolButton);
