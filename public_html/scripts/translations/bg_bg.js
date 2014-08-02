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
                        index: 'Списък Проекти',
                        show: 'Разглеждане на проект'
                    },
                    infopage: {
                        new: 'Създай',
                        destroy: 'Изтрий',
                        index: 'Списък Инфо Страници',
                        show: 'Покажи страница',
                        edit: 'Редактирай Страница'
                    },
                    language: {
                        new: 'Създай',
                        index: 'Списък Езици'
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
                }
            },
            projectShow: {
                confirmDeletion: 'Сигурни ли сте, че искате да изтриете този проект ?',
                destroy: 'Изтрий'
            },
            projectCreate: {
                save: 'Запиши',
                placeholders: {
                    title: 'Въведи заглавие на проекта',
                    description: 'Въведи описание на проекта'
                },
                labels: {
                    title: 'Заглавие',
                    description: 'Описание'
                }
            }
        },

        infoPage: {
            infoPageIndex: {
                actionMessages: {
                    created: 'Създадохте нова страница',
                    destroyed: 'Изтрихте страницата'
                },
                buttons: {
                    viewMore: 'Виж още'
                }
            },
            pageFromTemplate: {
                title: 'Въведи заглавие на страницата',
                content: 'Въведи съдържание на страницата',
                status: 'Избери статус',
                seoDescription: 'Въведи СЕО описание',
                seoKeyWords: 'Въведи СЕО ключови думи',
                save: 'Запиши',
                labels: {
                    title: 'Заглавие на страницата',
                    content: 'Съдържание на страницата',
                    status: 'Статус',
                    seoDescription: 'СЕО описание',
                    seoKeyWords: 'СЕО ключови думи'
                }
            },
            infoPageShow: {
                confirmDeletion: 'Сигурни ли сте, че искате да изтриете тази страницата ?',
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
                action: 'Действия',
                noMessages: 'Няма съобщения',
                actions: {
                    destroy: 'Изтрий',
                    answer: 'Отговори'
                }
            }
        },

        language: {
            languageIndex: {
                title: 'Списък Езици',
                confirmDeletion: 'Сигурни ли сте, че искате да изтриете този език ?',
                destroy: 'Delete',
                tableHeaders: {
                    action: 'Действия',
                    name: 'Кратко име',
                    fullName: 'Пълно име'
                }
            },
            languageCreate: {
                title: 'Създай нов Език',
                placeholders: {
                    name: 'Въведи кратко наименование на езика',
                    fullName: 'Въведи пълното име на езика',
                    save: 'Запиши'
                },
                labels: {
                    name: 'Крако наименование',
                    fullName: 'Пълно наименование'
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