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
package org.teamapps.uisession;

import org.teamapps.dto.UiEvent;
import org.teamapps.dto.UiQuery;
import org.teamapps.dto.UiSessionClosingReason;

import java.util.function.Consumer;

public interface UiSessionListener {

	default void onUiEvent(String sessionId, UiEvent event) {
	}

	default void onUiQuery(String sessionId, UiQuery query, Consumer<Object> resultCallback) {
	}

	default void onStateChanged(String sessionId, UiSessionState state) {
	}

	/**
	 * Additional state change callback method for sessions that got closed, but with a reason code.
	 * Note that this will be executed AFTER {@link #onStateChanged(String, UiSessionState)}.
	 */
	default void onClosed(String sessionId, UiSessionClosingReason reason) {
	}
}
