#include <ctype.h>
#include <stdio.h>
#include <stdlib.h>
#include "streaming_service.h"

struct user *user_head;
struct user *user_sentinel;
struct new_movie *movies_head;
struct movie *categories[6];

void init_structures(void) {
    struct user *new = malloc(sizeof (struct user));
    new->uid = -1;
    new->suggestedHead = NULL;
    new->suggestedTail = NULL;
    new->watchHistory = NULL;
    new->next = NULL;
    user_sentinel = new;
    user_head = user_sentinel;
    movies_head = NULL;
    int i;
    for (i = 0; i < 6; i++) {
        categories[i] = NULL;
    }
}

int register_user(int uid) {
    struct user *tmp = user_head;
    user_sentinel->uid = uid;
    while (tmp->uid != uid) {
        tmp = tmp->next;
    }
    user_sentinel->uid = -1;
    if (tmp == user_sentinel) {
        struct user *new = malloc(sizeof (struct user));
        new->uid = uid;
        new->suggestedHead = NULL;
        new->suggestedTail = NULL;
        new->watchHistory = NULL;
        new->next = user_head;
        user_head = new;
    }
    tmp = user_head;
    printf("R <%d>\n\tUsers = ", uid);
    while (tmp->uid != -1) {
        printf("<%d>, ", tmp->uid);
        tmp = tmp->next;
    }
    printf("\nDONE\n\n");
    return 0;
}

void unregister_user(int uid) {
    struct user *tmp = user_head, *prev = NULL;
    user_sentinel->uid = uid;
    while (tmp->uid != uid) {
        prev = tmp;
        tmp = tmp->next;
    }
    user_sentinel->uid = -1;
    if (tmp != user_sentinel) {
        struct suggested_movie *tmp2 = tmp->suggestedHead, *prev2 = NULL;
        struct movie *tmp3 = tmp->watchHistory, *prev3 = NULL;
        while (tmp2) {
            prev2 = tmp2;
            tmp2 = tmp2->next;
            free(prev2);
        }
        while (tmp3) {
            prev3 = tmp3;
            tmp3 = tmp3->next;
            free(prev3);
        }
        if (prev == NULL) {
            user_head = tmp->next;
        } else {
            prev->next = tmp->next;
        }
        free(tmp);
    }
    tmp = user_head;
    printf("U <%d>\n\tUsers = ", uid);
    while (tmp->uid != -1) {
        printf("<%d>, ", tmp->uid);
        tmp = tmp->next;
    }
    printf("\nDONE\n\n");
}

int add_new_movie(unsigned int mid, movieCategory_t category1, unsigned int year) {
    struct new_movie *tmp;
    struct new_movie *newM = malloc(sizeof (struct new_movie));
    newM->info.mid = mid;
    newM->category = category1;
    newM->info.year = year;
    if (movies_head == NULL || mid <= movies_head->info.mid) {
        newM->next = movies_head;
        movies_head = newM;
    } else {
        tmp = movies_head;
        while (tmp->next != NULL && mid > tmp->next->info.mid) {
            tmp = tmp->next;
        }
        newM->next = tmp->next;
        tmp->next = newM;
    }
    tmp = movies_head;
    printf("A <%u> <%d> <%u>\n\tNew movies = ", mid, category1, year);
    while (tmp != NULL) {
        printf("<%u,%d,%u>, ", tmp->info.mid, tmp->category, tmp->info.year);
        tmp = tmp->next;
    }
    printf("\nDONE\n\n");
}

void distribute_new_movies() {
    struct new_movie *tmpm = movies_head, *prev = NULL;
    struct movie * tail[6];
    int i;
    for (i = 0; i < 6; i++)tail[i] = NULL;
    while (tmpm != NULL) {
        struct movie *newm = malloc(sizeof (struct movie));
        newm->info.mid = tmpm->info.mid;
        newm->info.year = tmpm->info.year;
        newm->next = NULL;
        if (categories[tmpm->category] == NULL) {
            categories[tmpm->category] = newm;
            tail[tmpm->category] = newm;
        } else {
            tail[tmpm->category]->next = newm;
            tail[tmpm->category] = newm;
        }
        prev = tmpm;
        tmpm = tmpm->next;
        free(prev);
    }
    printf("D\nCategorized Movies:\n");
    for (i = 0; i < 6; i++) {
        printf("\t");
        if (i == 0) {
            printf("Horror: ");
        } else if (i == 1) {
            printf("Sci-fi: ");
        } else if (i == 2) {
            printf("Drama: ");
        } else if (i == 3) {
            printf("Romance: ");
        } else if (i == 4) {
            printf("Documentary: ");
        } else if (i == 5) {
            printf("Comedy: ");
        }
        struct movie *tmp = categories[i];
        int counter = 1;
        while (tmp) {
            printf("<%u,%d>, ", tmp->info.mid, counter++);
            tmp = tmp->next;
        }
        printf("\n");
    }
    printf("\nDONE\n\n");
}

int watch_movie(int uid, unsigned int mid) {
    int i;
    struct movie *foundm;
    struct user *foundu = user_head;
    user_sentinel->uid = uid;
    for (i = 0; i < 6; i++) {
        foundm = categories[i];
        while (foundm != NULL && foundm->info.mid != mid) {
            foundm = foundm->next;
        }
        if (foundm != NULL) break;
    }
    while (foundu->uid != uid) {
        foundu = foundu->next;
    }
    user_sentinel->uid = -1;
    if (foundu != user_sentinel) {
        struct movie *newm = malloc(sizeof (struct movie));
        newm->info.mid = foundm->info.mid;
        newm->info.year = foundm->info.year;
        newm->next = foundu->watchHistory;
        foundu->watchHistory = newm;
    }
    printf("W <%d> <%u>\n\tUser <%d> Watch History = ", uid, mid, uid);
    struct movie *tmp = foundu->watchHistory;
    while (tmp != NULL) {
        printf("<%u>, ", tmp->info.mid);
        tmp = tmp->next;
    }
    printf("\nDONE\n\n");
    return 0;
}

int suggest_movies(int uid) {
    struct user *foundu = user_head, *tmp;
    user_sentinel->uid = uid;
    while (foundu->uid != uid) {
        foundu = foundu->next;
    }
    user_sentinel->uid = -1;
    if (foundu != user_sentinel) {
        tmp = user_head;
        struct suggested_movie *tailhead, *tailtail;
        int flag = 0;
        while (tmp->uid != -1) {
            if (tmp->uid != foundu->uid) {
                if (tmp->watchHistory != NULL) {
                    struct movie *popped = tmp->watchHistory;
                    tmp->watchHistory = tmp->watchHistory->next;
                    struct suggested_movie *newsugg = malloc(sizeof (struct suggested_movie));
                    newsugg->info.mid = popped->info.mid;
                    newsugg->info.year = popped->info.year;
                    free(popped);
                    if (flag == 0) {
                        if (foundu->suggestedHead == NULL) {
                            newsugg->next = NULL;
                            newsugg->prev = NULL;
                            foundu->suggestedHead = newsugg;
                            tailhead = newsugg;
                        } else {
                            tailhead->next = newsugg;
                            newsugg->prev = tailhead;
                            newsugg->next = NULL;
                            tailhead = newsugg;
                        }
                        flag = 1;
                    } else {
                        if (foundu->suggestedTail == NULL) {
                            newsugg->next = NULL;
                            newsugg->prev = NULL;
                            foundu->suggestedTail = newsugg;
                            tailtail = newsugg;
                        } else {
                            tailtail->prev = newsugg;
                            newsugg->next = tailtail;
                            newsugg->prev = NULL;
                            tailtail = newsugg;
                        }
                        flag = 0;
                    }
                }

            }
            tmp = tmp->next;
        }
        if (tailhead != NULL)tailhead->next = tailtail;
        if (tailtail != NULL)tailtail->prev = tailhead;
        printf("S <%d>\n\tUser <%d> Suggested Movies = ", uid, uid);
        struct suggested_movie *tmpsugg = foundu->suggestedHead;
        while (tmpsugg != NULL) {
            printf("<%u>, ", tmpsugg->info.mid);
            tmpsugg = tmpsugg->next;
        }
        printf("\nDONE\n\n");
    }
    return 0;
}

int filtered_movie_search(int uid, movieCategory_t category1, movieCategory_t category2, unsigned int year) {
    struct movie *tmp1 = categories[category1], *tmp2 = categories[category2];
    struct suggested_movie *list = NULL, *tail;
    while (tmp1 != NULL || tmp2 != NULL) {
        while (tmp1 != NULL && tmp1->info.year < year) {
            tmp1 = tmp1->next;
        }
        while (tmp2 != NULL && tmp2->info.year < year) {
            tmp2 = tmp2->next;
        }
        if (tmp2 != NULL && tmp1 != NULL) {
            if (tmp1->info.mid < tmp2->info.mid) {
                struct suggested_movie *newsugg = malloc(sizeof (struct suggested_movie));
                newsugg->info.mid = tmp1->info.mid;
                newsugg->info.year = tmp1->info.year;
                newsugg->next = NULL;
                if (list == NULL) {
                    newsugg->prev = NULL;
                    list = newsugg;
                    tail = newsugg;
                } else {
                    tail->next = newsugg;
                    newsugg->prev = tail;
                    tail = newsugg;
                }
                tmp1 = tmp1->next;
            } else {
                struct suggested_movie *newsugg = malloc(sizeof (struct suggested_movie));
                newsugg->info.mid = tmp2->info.mid;
                newsugg->info.year = tmp2->info.year;
                newsugg->next = NULL;
                if (list == NULL) {
                    newsugg->prev = NULL;
                    list = newsugg;
                    tail = newsugg;
                } else {
                    tail->next = newsugg;
                    newsugg->prev = tail;
                    tail = newsugg;
                }
                tmp2 = tmp2->next;
            }
        } else {
            if (tmp1 != NULL) {
                struct suggested_movie *newsugg = malloc(sizeof (struct suggested_movie));
                newsugg->info.mid = tmp1->info.mid;
                newsugg->info.year = tmp1->info.year;
                newsugg->next = NULL;
                if (list == NULL) {
                    newsugg->prev = NULL;
                    list = newsugg;
                    tail = newsugg;
                } else {
                    tail->next = newsugg;
                    newsugg->prev = tail;
                    tail = newsugg;
                }
                tmp1 = tmp1->next;
            } else if (tmp2 != NULL) {
                struct suggested_movie *newsugg = malloc(sizeof (struct suggested_movie));
                newsugg->info.mid = tmp2->info.mid;
                newsugg->info.year = tmp2->info.year;
                newsugg->next = NULL;
                if (list == NULL) {
                    newsugg->prev = NULL;
                    list = newsugg;
                    tail = newsugg;
                } else {
                    tail->next = newsugg;
                    newsugg->prev = tail;
                    tail = newsugg;
                }
                tmp2 = tmp2->next;
            }
        }
    }
    struct user *foundu = user_head;
    user_sentinel->uid = uid;
    while (foundu->uid != uid) {
        foundu = foundu->next;
    }
    user_sentinel->uid = -1;
    if (foundu != user_sentinel) {
        if (foundu->suggestedHead != NULL) {
            foundu->suggestedTail->next = list;
            list->prev = foundu->suggestedTail;
            foundu->suggestedTail = list;
        } else {
            foundu->suggestedHead = list;
            foundu->suggestedTail = tail;
        }
        printf("F <%d> <%d> <%d> <%u>\n\tUser <%d> Suggested Movies = ", uid, category1, category2, year, uid);
        struct suggested_movie *tmpsugg = foundu->suggestedHead;
        while (tmpsugg != NULL) {
            printf("<%u>, ", tmpsugg->info.mid);
            tmpsugg = tmpsugg->next;
        }
        printf("\nDONE\n\n");
    }
    return 0;
}

void take_off_movie(unsigned int mid) {
    int i;
    struct movie *tmpm, *prev;
    for (i = 0; i < 6; i++) {
        prev = NULL;
        tmpm = categories[i];
        while (tmpm != NULL && tmpm->info.mid != mid) {
            prev = tmpm;
            tmpm = tmpm->next;
        }
        if (tmpm != NULL) {
            if (prev != NULL) {
                prev->next = tmpm->next;
            } else {
                categories[i] = tmpm->next;
            }
            free(tmpm);
            break;
        }
    }
    printf("T <%u>", mid);
    struct user *tmpu = user_head;
    while (tmpu->uid != -1) {
        struct suggested_movie *tmpsugg = tmpu->suggestedHead;
        while (tmpsugg != NULL && tmpsugg->info.mid != mid) {
            tmpsugg = tmpsugg->next;
        }
        if (tmpsugg != NULL) {
            if (tmpsugg->prev == NULL) {
                tmpu->suggestedHead = tmpsugg->next;
                if (tmpsugg->next != NULL) {
                    tmpsugg->next->prev = NULL;
                } else {
                    tmpu->suggestedTail = NULL;
                }
            } else if (tmpsugg->next == NULL) {
                tmpu->suggestedTail = tmpsugg->prev;
                tmpsugg->prev->next = NULL;
            } else {
                tmpsugg->next->prev = tmpsugg->prev;
                tmpsugg->prev->next = tmpsugg->next;
            }
            free(tmpsugg);
            printf("\n\t<%u> removed from <%d> suggested list.", mid, tmpu->uid);
        }
        tmpu = tmpu->next;
    }
    printf("\n\tCategory list = ");
    tmpm = categories[i];
    while (tmpm != NULL) {
        printf("<%u>, ", tmpm->info.mid);
        tmpm = tmpm->next;
    }
    printf("\nDONE\n\n");
}

void print_movies() {
    int i;
    printf("M\nCategorized Movies:\n");
    for (i = 0; i < 6; i++) {
        printf("\t");
        if (i == 0) {
            printf("Horror: ");
        } else if (i == 1) {
            printf("Sci-fi: ");
        } else if (i == 2) {
            printf("Drama: ");
        } else if (i == 3) {
            printf("Romance: ");
        } else if (i == 4) {
            printf("Documentary: ");
        } else if (i == 5) {
            printf("Comedy: ");
        }
        struct movie *tmp = categories[i];
        int counter = 1;
        while (tmp) {
            printf("<%u,%d>, ", tmp->info.mid, counter++);
            tmp = tmp->next;
        }
        printf("\n");
    }
    printf("\nDONE\n\n");

}

void print_users() {
    struct user *tmp = user_head;
    printf("P\nUsers:\n");
    while (tmp->uid != -1) {
        int counter = 1;
        printf("\t<%d>:\n\tSuggested: ", tmp->uid);
        struct suggested_movie *tmpsugg = tmp->suggestedHead;
        while (tmpsugg != NULL) {
            printf("<%u,%d>, ", tmpsugg->info.mid, counter++);
            tmpsugg = tmpsugg->next;
        }
        printf("\n\tWatch History: ");
        counter = 1;
        struct movie *tmpm = tmp->watchHistory;
        while (tmpm != NULL) {
            printf("<%u,%d>, ", tmpm->info.mid, counter++);
            tmpm = tmpm->next;
        }
        printf("\n");
        tmp = tmp->next;
    }
    printf("\nDONE\n\n");
}