/* eslint-disable no-unused-vars, no-new-wrappers */

/**
 * ### item
 */
var item = {
    addMileStone: function addMileStone() { },
    deleteItem: function deleteItem() { },
    performWorkflowTransition: function performWorkflowTransition(transID, comment) { },
    /**
     * item.performWorkflowTransitionByCustomID('CUSTOM_ID', 'COMMENTS')
     * - Performs a workflow transition by its Custom ID as specified by 'CUSTOM_ID'.
     * - The 'COMMENTS' parameter is optional. If comments are specified, they are saved with the workflow step
     * in the Workflow Actions tab..
     * @param {string} customID
     * @param {string} [comments]
     */
    performWorkflowTransitionByCustomID: function performWorkflowTransitionByCustomID(customID, comments) { },
    /**
     * Descriptor properties on the item object (item.descriptor) represent item metadata.
     */
    descriptor: {
        createdBy: new String(),
        /**
         * System datetime (in the current users timezone?) that the record was created.
         */
        createdDate: new Date(),
        deleted: new Boolean(),
        descriptor: new String(),
        lastModifiedOn: new Date(),
        ownerID: new String(),
        /**
         * Item's current state in the workflow.
         * @example
         * println(item.descriptor.workflowState);
         * // Work In Progress
         */
        workflowState: new String(),
    },
    /**
     * - The item object Grid array (item.grid) is a standard JavaScript array of objects that represent individual rows
     * in the associated item's Grid tab. You get and set Grid row properties through field IDs the same way you access
     * Item Details fields (for example, item.grid[0].DESCRIPTION).
     * - You can assign values to Grid properties using properties on the item object. You can also assign values throug
     * variables declared in the script, including ones used to add other new rows. You can use this capability to add
     * multiple rows in a single script through cloning. You do not need to assign values to all fields in a row, only
     * to fields you want to populate.
     * @param {string} PHASE
     * @param {string} STATUS
     * @param {date} TASK_START
     * @param {date} TASK_END
     * @param {string} ASSIGNED_DEPARTMENT
     * @param {string} DETAILS
     */
    grid: {
        addRows: function addRows(PHASE, STATUS, TASK_START, TASK_END, ASSIGNED_DEPARTMENT, ASSIGNED_USER, DETAILS) { },
        /**
         * ### `item.grid.clear()`
         * Empties the Grid array (removes all rows from the Grid tab)
         */
        clear: function clear() { },
        /**
         * ### !! Requires array item
         * ### `item.grid[i].remove()`
         * Removes the specified row in the array from the Grid tab
         */
        remove: function remove() { },
    },
    /**
     * ### item.project
     */
    project: {
        /**
         * Adds a manual task (title) or a linked task (target) to the
         * associated item's Project Management tab, passing task
         * properties through properties on array objects.
         * @example
         * item.project.addTask('title', start_date, end_date, 'progress');
         * item.project.addTask(target, start_date, end_date, 'progress');
         */
        addTask: function addTask() { },
        /**
         * Empties the tasks array (removes all tasks from the Project Management tab)
         */
        clear: function clear() { },
        /**
         * ### item.project.children[i] (JavaScript array)
         * Array of children of the specified task in the array (sub-tasks); only on tasks linked to
         * other project items (project tasks); children tasks can be manual, workflow/revision-controlled,
         * milestone, or other project tasks
         */
        children: [{
            /**
             * Percentage completed to date of the specified task in the array (% Complete on the Project Management tab)
             */
            progress: function progress(progress) { },
            /**
             * Removes the specified task in the array from the Project Management tab
             */
            remove: function remove() { },
            /**
             * ### item.project.children[i].status (string)
             * Status of the specified task in the array (Status on the Project Management tab)
             */
            status: '',
            duration: '',
            end_date: new Date(),
            /**
             * Number of the specified task in the array (#on the Project Management tab)
             */
            id: 123,
            owner: '',
            owner_descriptor: '',
            /**
             * dmsID of the item that owns the specified task in the array
             */
            owner_id: 123456,
            predecessors: [],
            priority: '',
            start_date: new Date(),
            state: '',
            subTasks: [],
            target: {},
            target_descriptor: '',
            target_id: 123456,
            title: '',
            type: '',
        },
        ],
    },
    /**
     * ### item.relationships
     */
    relationships: {
        /**
         * ### addRelated()
         * @example
         * // Example
         * var workFlowItem = item.workflowItems.addItem({RELATED:targetItem, [...etc...] });
         */
        addRelated: function addRelated() { },
    },
    /**
     * ### item Workflow Actions array
     * The item object Workflow Actions array (item.workflowActions) is an array of workflow actions that have been
     * performed on the associated item. You can get workflow item values using properties on array objects.
     * - **Important:** The last performed workflow action is at the 0 index position in the array.
     */
    workflowActions: {
        /**
         * Comments saved with the specified workflow action in the array.
         * @example // Get the last transition comment.
         * println(item.workflowActions[0].comments);
         * // Hello world!
         */
        comments: '', // hi
        step: 123456789,
        /**
         * Date and time the specified workflow action in the array was performed.
         * @example
         * println(item.workflowActions[0].timeStamp);
         * // Thu Feb 01 2018 11:08:33 GMT-0500 (EST)
         */
        timeStamp: new Date(),
        /** Transition associated with the specified workflow action in the array */
        transition: {
            /** Custom ID of the transition. See State Properties in the Workflow Editor. */
            customID: '',
            shortName: '',
            userID: '',
            fromState: {
                customID: '',
                longName: '',
                shortName: '',
                stateID: 123456789,
            },
            toState: {
                customID: '',
                longName: '',
                shortName: '',
                stateID: 123456789,
            },
        },
    },
    /**
     * ### workFlowItems
     */
    workflowItems: {
        /**
         * ### addItem()
         * @example
         * // Example
         * var workFlowItem = item.workflowItems.addItem({RELATED:targetItem, [...etc...] });
         */
        addItem: function addItem() { },
        /**
         * ### clear()
         * Empties the workflow items array (removes all workflow items from the **Workflow Items** tab)
         * @example
         * item.workflowItems.clear();
         */
        clear: function clear() { },
        /**
         * ### !! Requires array item
         * ### .remove()
         * Removes the specified workflow item in the array from the **Workflow Items** tab
         * @example
         * item.workflowItems[i].remove();
         */
        remove: function remove() { },
        item: { ENTER_CUSTOM_FIELD_ID_HERE: '', },
        descriptor: '',
        id: 1234,
        lifecycle: '',
    },
    milestones: [{
        /**
         * Sets the workflow state of the milestone specified in the array
         * (item.milestones[i].workflowState property) to 'Workflow State Name', which takes
         * as its value the item's milestones[i].workflowState.workflowStateName property.
         * @param {string} wfStateName
         */
        setWorkflowState: function setWorkflowState(wfStateName) { },
        milestoneDate: '',
        milestoneType: '',
        progress: 123,
        warnThreshold: 123,
        worflowState: '',
        worflowStateName: '',
        worflowStateID: 123456,
    },
    ],
};