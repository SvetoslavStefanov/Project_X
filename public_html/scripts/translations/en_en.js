/**
 * Created by SveXteZ on 14-7-29.
 */
define([], function () {
    "use strict";

    return {
        shell: {
            shell: {
                subroutes: {
                    project: {
                        new: 'Create',
                        destroy: 'Destroy',
                        index: 'Projects',
                        show: 'Show Project'
                    },
                    infopage: {
                        new: 'Create',
                        destroy: 'Destroy',
                        index: 'Info Pages',
                        show: 'Show Page',
                        edit: 'Edit Page'
                    },
                    language: {
                        new: 'Create'
                    }
                },
                routes: {
                    project: 'Projects',
                    infopage: 'Info Pages',
                    language: 'Languages',
                    contact: 'Contacts',
                    signIn: 'Login',
                    signOut: 'Logout'
                }
            }
        },

        project: {
            projectIndex: {
                actionMessages: {
                    created: 'You have created new project',
                    destroyed: 'You have destroyed a project'
                },
                buttons: {
                    viewMore: 'View More'
                },
                title: 'Projects'
            },
            projectShow: {
                confirmDeletion: 'Are you sure you want to delete this project ?',
                title: 'View Project',
                destroy: 'Delete'
            },
            projectCreate: {
                title: 'Create new Project',
                save: 'Save',
                placeholders: {
                    title: 'Enter Project\'s title',
                    description: 'Enter Project\'s description'
                }
            }
        },

        infoPage: {
            infoPageIndex: {
                actionMessages: {
                    created: 'You have created new page',
                    destroyed: 'You have destroyed a page'
                },
                title: 'List Info Pages',
                buttons: {
                    viewMore: 'View More'
                }
            }
        }
    }
});