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
                        show: 'Show Project',
                        index: 'List Projects'
                    },
                    infopage: {
                        new: 'Create',
                        destroy: 'Destroy',
                        index: 'List Info Pages',
                        show: 'Show Page',
                        edit: 'Edit Page'
                    },
                    language: {
                        new: 'Create',
                        index: 'List Languages'
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
                save: 'Save',
                placeholders: {
                    title: 'Enter Project\'s title',
                    description: 'Enter Project\'s description'
                },
                labels: {
                    title: 'Title',
                    description: 'Description'
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
            },
            infoPageCreate: {
                title: 'Create new Info Page'
            },
            infoPageEdit: {
                title: 'Edit Page'
            },
            pageFromTemplate: {
                title: 'Enter Page\'s title',
                content: 'Enter Page\'s content',
                status: 'Select Status',
                seoDescription: 'Enter Seo Description',
                seoKeyWords: 'Enter Seo Keywords',
                save: 'Save'
            },
            infoPageShow: {
                confirmDeletion: 'Are you sure you want to delete this page ?',
                title: 'View Page',
                destroy: 'Delete',
                edit: 'Edit'
            }
        },

        contact: {
            contactIndex: {
                actionMessages: {
                    destroyed: 'You have destroyed a message'
                },
                title: 'Messages',
                sent: 'Sent at',
                subject: 'Subject',
                email: 'Email',
                content: 'Content',
                noMessages: 'There aren\'t any messages yet'
            }
        },

        language: {
            languageIndex: {
                title: 'List Languages',
                confirmDeletion: 'Are you sure you want to delete this language ?',
                destroy: 'Delete'
            },
            languageCreate: {
                title: 'Create new Language',
                placeholders: {
                    name: 'Enter language\'s short name',
                    fullName: 'Enter language\'s full name',
                    save: 'Save'
                }
            }
        },

        sign: {
            signIn: {
                title: 'Sign In',
                placeholders: {
                    username: 'Enter your username',
                    password: 'Enter your password',
                    save: 'Sign in !'
                }
            }
        }
    }
});