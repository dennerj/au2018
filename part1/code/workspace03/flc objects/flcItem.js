
//#region | Basic Item
var itemBasic = {
    performWorkflowTransitionByCustomID: function (customID, comments) { },
    descriptor: {
        descriptor: '',
        ownerID: '',
        workflowState: '',
    },
};
//#endregion

//#region | Complex Item
var itemComplex = {
    performWorkflowTransitionByCustomID: function (customID, comments) { },
    descriptor: {
        descriptor: '',
        ownerID: '',
        workflowState: '',
    },
    project: {
        addTask: function () { },
        clear: function () { },
        children: [{
            remove: function () { },
            status: '',
            end_date: new Date(),
            id: 123,
            state: '',
            title: '',
            type: '',
        }],
    },
    grid: {
        clear: function () { },
        0: {
            remove: function () { },
        }
    },
};

//#endregion

//#region | Item documented with JSDoc
/**
 * Almost anything you 
 */
var itemJSDoc = {
    /**
     * Performs a workflow transition by its Custom ID as specified by customID.
     * @param {string} customID
     * @param {string} [comments] - Optional. Saved with workflow step
     */
    performWorkflowTransitionByCustomID: function (customID, comments) { },
    /**
     * Descriptor properties on the item object (item.descriptor) represent item metadata.
     */
    descriptor: {
        descriptor: '',
        ownerID: '',
        /**
         * Item's current state in the workflow.
         * @example
         * println(item.descriptor.workflowState);
         * // Work In Progress
         */
        workflowState: '',
    },
    project: {
        /**
         * Adds a manual task (title) or a linked task (target) to the
         * associated item's Project Management tab, passing task
         * properties through properties on array objects.
         * @example
         * item.project.addTask('title', start_date, end_date, 'progress');
         * item.project.addTask(target, start_date, end_date, 'progress');
         */
        addTask: function ({ }) { },
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
            remove: function () { },
            /**
             * ### item.project.children[i].status (string)
             * Status of the specified task in the array (Status on the Project Management tab)
             */
            status: '',
            end_date: new Date(),
            /**
             * Number of the specified task in the array (#on the Project Management tab)
             */
            id: 123,
            state: '',
            title: '',
            type: '',
        }],
    },
    /**
     * **Array-like object** of individual rows from the grid tab. You get and set Grid row properties through field IDs the same way you access
     * Item Details fields (for example, `item.grid[0].DESCRIPTION`).
     * - You can assign values to Grid properties using properties on the item object. You can also assign values throug
     * variables declared in the script, including ones used to add other new rows. You can use this capability to add
     * multiple rows in a single script through cloning. You do not need to assign values to all fields in a row, only
     * to fields you want to populate.
     */
    grid: {
        /**
         * Empties the Grid array (removes all rows from the Grid tab)
         */
        clear: function () { },
        /**
         * **Example Array-like object index**
         */
        0: {
            /**
             * Removes the specified row in the array from the Grid tab.
             * @example
             * item.grid[0].remove
             */
            remove: function () { },
        }
    },
};
//#endregion