/**
 * Created by SveXteZ on 14-8-1.
 */
define([], function () {
    "use strict";

    return {
        shell: {
            shell: {
                subroutes: {
                    project: {
                        new: 'Създай',
                        destroy: 'Изтрий',
                        index: 'Проекти',
                        show: 'Покажи Проект'
                    },
                    infopage: {
                        new: 'Създай',
                        destroy: 'Изтрий',
                        index: 'Инфо Страници',
                        show: 'Покажи страница',
                        edit: 'Редактирай Страница'
                    },
                    language: {
                        new: 'Създай'
                    }
                },
                routes: {
                    project: 'Проекти',
                    infopage: 'Инфо Страници',
                    language: 'Езици',
                    contact: 'Контакти',
                    signIn: 'Влез',
                    signOut: 'Излез'
                }
            }
        },

        project: {
            projectIndex: {
                actionMessages: {
                    created: 'Създадохте нов проект',
                    destroyed: 'Изтрихте проекта'
                },
                buttons: {
                    viewMore: 'Виж още'
                },
                title: 'Проекти'
            },
            projectShow: {
                confirmDeletion: 'Сигурни ли сте, че искате да изтриете този проект ?',
                title: 'Разглеждане на проект',
                destroy: 'Изтрий'
            },
            projectCreate: {
                title: 'Създай нов проект',
                save: 'Запиши',
                placeholders: {
                    title: 'Въведи заглавие на проекта',
                    description: 'Въведи описание на проекта'
                }
            }
        },

        infoPage: {
            infoPageIndex: {
                actionMessages: {
                    created: 'Създадохте нова страница',
                    destroyed: 'Изтрихте страницата'
                },
                title: 'Списък Страници',
                buttons: {
                    viewMore: 'Виж още'
                }
            },
            infoPageCreate: {
                title: 'Създай нова Инфо Страница'
            },
            infoPageEdit: {
                title: 'Редактирай Страницата'
            },
            pageFromTemplate: {
                title: 'Въведи заглавие на страницата',
                content: 'Въведи съдържание на страницата',
                status: 'Избери статус',
                seoDescription: 'Въведи СЕО описание',
                seoKeyWords: 'Въведи СЕО ключови думи',
                save: 'Запиши'
            },
            infoPageShow: {
                confirmDeletion: 'Сигурни ли сте, че искате да изтриете тази страницата ?',
                title: 'Разглеждане на страницата',
                destroy: 'Изтрий',
                edit: 'Редактирай'
            }
        },

        contact: {
            contactIndex: {
                actionMessages: {
                    destroyed: 'Изтрихте съобщението'
                },
                title: 'Съобщения',
                sent: 'Изпратено на',
                subject: 'Тема',
                email: 'Email',
                content: 'Съдържание',
                noMessages: 'Няма съобщения'
            }
        },

        language: {
            languageIndex: {
                title: 'Списък Езици',
                confirmDeletion: 'Сигурни ли сте, че искате да изтриете този език ?',
                destroy: 'Delete'
            },
            languageCreate: {
                title: 'Създай нов Език',
                placeholders: {
                    name: 'Въведи кратко наименование на езика',
                    fullName: 'Въведи пълното име на езика',
                    save: 'Запиши'
                }
            }
        },

        sign: {
            signIn: {
                title: 'Вход',
                placeholders: {
                    username: 'Въведи потребителско име',
                    password: 'Въведи парола',
                    save: 'Влез !'
                }
            }
        }
    }
});