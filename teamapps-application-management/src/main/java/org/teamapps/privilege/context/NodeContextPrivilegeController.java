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
package org.teamapps.privilege.context;

import org.teamapps.privilege.Privilege;
import org.teamapps.privilege.PrivilegeController;
import org.teamapps.privilege.PrivilegeGroup;
import org.teamapps.ux.session.SessionContext;

import java.util.Set;

public interface NodeContextPrivilegeController<NODE> extends PrivilegeController {

	boolean isAllowedInNode(NODE node, SessionContext context, String applicationNamespace, PrivilegeGroup privilegeGroup, Privilege privilege);

	Set<NODE> getAllowedNodes(SessionContext context, String applicationNamespace, PrivilegeGroup privilegeGroup, Privilege privilege);

}
