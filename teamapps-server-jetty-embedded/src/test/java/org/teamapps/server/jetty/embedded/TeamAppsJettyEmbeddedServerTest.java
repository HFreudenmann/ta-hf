/*-
 * ========================LICENSE_START=================================
 * TeamApps
 * ---
 * Copyright (C) 2014 - 2023 TeamApps.org
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
package org.teamapps.server.jetty.embedded;

import org.teamapps.icon.material.MaterialIcon;
import org.teamapps.ux.component.field.TextField;
import org.teamapps.ux.component.rootpanel.RootPanel;
import org.teamapps.ux.component.table.ListTableModel;
import org.teamapps.ux.component.table.Table;
import org.teamapps.ux.session.SessionContext;
import org.teamapps.webcontroller.WebController;

import java.util.Arrays;

public class TeamAppsJettyEmbeddedServerTest {

	public static void main(String[] args) throws Exception {

		WebController controller = (SessionContext sessionContext) -> {
			sessionContext.onDestroyed.addListener(uiSessionClosingReason -> System.out.println("Session destroyed: " + uiSessionClosingReason));
			RootPanel rootPanel = sessionContext.addRootPanel();

			Table<String> table = new Table<>();
			table.addColumn("a", MaterialIcon.TITLE, "ASDF", new TextField()).setValueExtractor(s -> s);

			table.setModel(new ListTableModel<>(Arrays.asList("a", "b", "c", "d")));
			table.setAllowMultiRowSelection(true);

//			table.onRowsSelected.addListener((eventData) -> System.out.println("rows: " + eventData.size()));
			table.onSingleRowSelected.addListener((eventData) -> System.out.println("single"));
			table.onMultipleRowsSelected.addListener((eventData) -> System.out.println("multi: " + eventData.size()));

			rootPanel.setContent(table);
		};

		TeamAppsJettyEmbeddedServer jettyServer = new TeamAppsJettyEmbeddedServer(controller, 8082);
		jettyServer.start();

	}

}
