/*****************************************************
 * @file   Movie.c                                   *
 * @author Paterakis Giorgos <geopat@csd.uoc.gr>     *
 *                                                   *
 * @brief Implementation for Movie.h 				 *
 * Project: Winter 2023						         *
 *****************************************************/
#include "Movie.h"
#include <time.h>
#include <stdio.h>
#include <stdlib.h>
#include <time.h>

/**
 * @brief Creates a new user.
 * Creates a new user with userID as its identification.
 *
 * @param userID The new user's identification
 *
 * @return 1 on success
 *         0 on failure
 */
extern movieCategory_t *categoryArray[6]; /* The categories array (pinakas kathgoriwn)*/
extern new_movie_t *new_releases; /* New releases simply-linked binary tree*/
extern user_t **user_hashtable_p; /* The users hashtable. This is an array of chains (pinakas katakermatismoy xrhstwn)*/
extern int hashtable_size; /* The size of the users hashtable, parsed from the command line (>0)*/
extern int max_users; /* The maximum number of registrations (users)*/
extern int max_id; /* The maximum account ID */
extern int primes_g[170];
int newm = 0;
int numMovies = 0;
struct movie **F;
int p, a, b;

void initialize(void) {
    srand(time(0));
    for (int i = 0; i < 170; i++) {
        if (primes_g[i] >= max_users) {
            hashtable_size = primes_g[i];
            //printf("****%d*****\n", hashtable_size);
            break;
        }
    }
    user_hashtable_p = malloc(hashtable_size * (sizeof (struct user*)));
    F = malloc(numMovies * (sizeof (struct movie *)));
    for (int i = 0; i < hashtable_size; i++) {
        user_hashtable_p[i] = NULL;
    }

    for (int i = 0; i < 6; i++) {
        categoryArray[i] = malloc(sizeof (struct movie_category));
    }

    for (int i = 0; i < 6; i++) {
        struct movie *new = malloc(sizeof (struct movie));
        new->movieID = -1;
        new->sumScore = 0;
        new->watchedCounter = 0;
        new->year = 0;
        new->lc = NULL;
        new->rc = NULL;
        categoryArray[i]->sentinel = new;
        categoryArray[i]->movie = categoryArray[i]->sentinel;

    }
    new_releases = NULL;
    for (int i = 0; i < 170; i++) {
        if (primes_g[i] > max_id) {
            p = primes_g[i];
        }
    }
    a = (rand() % (p - 1 - 1 + 1)) + 1;
    b = (rand() % (p - 1 - 0 + 1)) + 0;
}

int universalHash(int uID) {

    return (((a * uID + b) % p) % max_users);
}

struct new_movie *ins_new_movie(struct new_movie *root, int mid, int year, int category) {
    newm++;
    struct new_movie *p = root;
    struct new_movie *Q = NULL;
    struct new_movie *prev = NULL;
    while (p != NULL) {
        prev = p;
        if (mid < p->movieID) {
            p = p->lc;
        } else {
            p = p->rc;
        }
    }
    Q = malloc(sizeof (struct new_movie));
    Q->movieID = mid;
    Q->category = category;
    Q->year = year;
    Q->sumScore = 0;
    Q->watchedCounter = 0;
    Q->lc = NULL;
    Q->rc = NULL;
    if (prev == NULL) {
        return Q;
    } else if (mid < prev->movieID) {
        prev->lc = Q;

    } else {
        prev->rc = Q;
    }
    return root;

}

void print_new_movies(struct new_movie *root) {
    struct new_movie *P = root;
    if (P == NULL) return;
    print_new_movies(P->lc);
    printf("<%d>, ", P->movieID);
    print_new_movies(P->rc);
}

int new_movie_Lookup(struct new_movie *root, int movieID) {
    int cnt = 0;

    struct new_movie *P = root;

    while (P != NULL) {
        if (P->movieID == movieID) {
            cnt++;
        }

        if (movieID < P->movieID) {
            P = P->lc;
        } else {
            P = P->rc;
        }
    }
    return cnt;
}

int HT_Search(int userID) {
    int cnt = 0;
    int hashIndex = universalHash(userID);
    struct user *tmp = user_hashtable_p[hashIndex];
    while (tmp != NULL) {

        if (tmp->userID == userID)
            cnt++;

        tmp = tmp->next;
    }

    return cnt;
}

struct user * HT_Search2(int userID) {
    int cnt = 0;
    int hashIndex = universalHash(userID);
    struct user *tmp = user_hashtable_p[hashIndex];
    while (tmp != NULL) {

        if (tmp->userID == userID)
            return tmp;

        tmp = tmp->next;
    }

    return NULL;
}

void print_m(struct movie *root, struct movie *sentinel) {
    struct movie *P = root;
    if (P == sentinel) return;
    print_m(P->lc, sentinel);
    printf("<%d>,", P->movieID);
    print_m(P->rc, sentinel);

}

int register_user(int userID) {
    int j = universalHash(userID);
    int dup = HT_Search(userID);
    if (j != -1 && dup == 0) {
        struct user *newu = malloc(sizeof (struct user));
        newu->userID = userID;
        newu->history = NULL;
        newu->next = user_hashtable_p[j];
        user_hashtable_p[j] = newu;
    }
    struct user *temp = NULL;

    printf("R <%d>\n", userID);
    printf("Chain <%d> of Users:\n", j);

    temp = user_hashtable_p[j];
    while (temp != NULL) {
        printf("\t<%d>\n", temp->userID);
        temp = temp->next;

    }
    printf("DONE\n\n");

    return 1;
}

/**
 * @brief Deletes a user.
 * Deletes a user with userID from the system, along with users' history tree.
 *
 * @param userID The new user's identification
 *
 * @return 1 on success
 *         0 on failure
 */
struct user_movie* LO_Delete(struct user_movie *root) {
    struct user_movie *P = root;
    if (P == NULL) return NULL;
    P->lc = LO_Delete(P->lc);
    P->rc = LO_Delete(P->rc);
    free(P);
    return NULL;


}

int unregister_user(int userID) {
    struct user *temp = NULL, *prev = NULL;
    int j = universalHash(userID);
    int dup = HT_Search(userID);
    if (dup == 1) {
        temp = user_hashtable_p[j];
        while (temp != NULL && temp->userID != userID) {
            prev = temp;
            temp = temp->next;
        }
        if (temp != NULL) {
            //struct user_movie *hist = temp->history;
            user_hashtable_p[j]->history = LO_Delete(user_hashtable_p[j]->history);
            if (prev == NULL) {
                user_hashtable_p[j] = temp->next;

            } else {
                prev->next = temp->next;

            }
        }

        struct user *tmp = NULL;

        printf("U <%d>\n", userID);
        printf("Chain <%d> of Users:\n", j);

        tmp = user_hashtable_p[j];
        while (tmp != NULL) {
            printf("\t<%d>\n", tmp->userID);
            tmp = tmp->next;

        }
        printf("DONE\n\n");
    }

    return 1;
}

/**
 * @brief Add new movie to new release binary tree.
 * Create a node movie and insert it in 'new release' binary tree.
 *
 * @param movieID The new movie identifier
 * @param category The category of the movie
 * @param year The year movie released
 *
 * @return 1 on success
 *         0 on failure
 */
int add_new_movie(int movieID, int category, int year) {
    struct new_movie *tmp = new_releases;
    int dup = new_movie_Lookup(tmp, movieID);
    if (dup == 0) {
        new_releases = ins_new_movie(new_releases, movieID, year, category);
    }
    struct new_movie *p = new_releases;
    printf("A <%d> <%d> <%d>\n", movieID, category, year);
    printf("New releases Tree:\n");
    printf("\t<%d>: ", newm);
    print_new_movies(p);
    printf("\nDONE\n\n");


    return 1;
}

/**
 * @brief Distribute the movies from new release binary tree to the array of categories.
 *
 * @return 0 on success
 *         1 on failure
 */
struct movie *ins_movie(int category, int mid, int year, int sumScore, int watchedCounter) {
    struct movie *Q = NULL;
    struct movie *P = categoryArray[category]->movie;
    Q = malloc(sizeof (struct movie));
    Q->movieID = mid;
    Q->year = year;
    Q->sumScore = sumScore;
    Q->watchedCounter = watchedCounter;
    Q->lc = categoryArray[category]->sentinel;
    Q->rc = categoryArray[category]->sentinel;
    struct movie *prev = NULL;
    while (P->movieID != -1) {
        prev = P;
        if (mid < P->movieID) {
            P = P->lc;
        } else {
            P = P->rc;
        }
    }
    if (prev == NULL) {
        return Q;
    } else if (mid < prev->movieID) {
        prev->lc = Q;

    } else {
        prev->rc = Q;
    }
    return categoryArray[category]->movie;

}

void inorderCopy(struct new_movie *root) {
    if (root != NULL) {
        inorderCopy(root->lc);
        categoryArray[root->category]->movie = ins_movie(root->category, root->movieID, root->year, root->sumScore, root->watchedCounter);
        inorderCopy(root->rc);
        free(root->lc);
        free(root->rc);
    }
}

int distribute_movies(void) {
    struct new_movie *tmp = new_releases;
    inorderCopy(tmp);
    printf("D\nMovie Category Array:\n");
    for (int i = 0; i < 6; i++) {
        struct movie *tmp = categoryArray[i]->movie;
        struct movie *sentinel = categoryArray[i]->sentinel;
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
        print_m(tmp, sentinel);
        printf("\n");
    }
    printf("\nDONE\n\n");

    return 1;
}

/**
 * @brief User rates the movie with identification movieID with score
 *
 * @param userID The identifier of the user
 * @param category The Category of the movie
 * @param movieID The identifier of the movie
 * @param score The score that user rates the movie with id movieID
 *
 * @return 1 on success
 *         0 on failure
 */
int min(int mid1, int mid2) {
    if (mid1 < mid2)
        return mid1;
    else
        return mid2;

}

int max(int mid1, int mid2) {
    if (mid1 > mid2)
        return mid1;
    else
        return mid2;

}

struct user_movie *LO_Insert(int movieID, int category, int score, struct user_movie *root) {
    struct user_movie *P = root;
    struct user_movie *Q = NULL;
    struct user_movie *prev = NULL;
    struct user_movie *prevF = NULL;
    struct user_movie *pprevF = NULL;
    while (P != NULL) {
        prev = P;
        if (movieID <= P->movieID) {
            P = P->lc;

        } else {
            prevF = P;
            P = P->rc;
        }
    }
    Q = malloc(sizeof (struct user_movie));
    if (root == NULL) {
        Q->movieID = movieID;
        Q->category = category;
        Q->score = score;
        Q->lc = NULL;
        Q->rc = NULL;
        Q->parent = NULL;
        return Q;
    } else {
        Q->movieID = min(movieID, prev->movieID);
        Q->lc = malloc(sizeof (struct user_movie));
        Q->lc->movieID = min(movieID, prev->movieID);
        Q->rc = malloc(sizeof (struct user_movie));
        Q->rc->movieID = max(movieID, prev->movieID);
        Q->lc->lc = NULL;
        Q->lc->rc = NULL;
        Q->rc->rc = NULL;
        Q->rc->lc = NULL;
        Q->parent = prev->parent;
        Q->lc->parent = Q;
        Q->rc->parent = Q;
        Q->category = category;
        Q->score = score;

        if (Q->movieID != movieID) {
            Q->category = prev->category;
            Q->score = prev->score;
        }
        Q->lc->score = score;
        Q->lc->category = category;
        if (Q->lc->movieID != movieID) {
            Q->lc->score = prev->score;
            Q->category = prev->category;
        }
        Q->rc->category = category;
        Q->rc->score = score;
        if (Q->rc->movieID != movieID) {
            Q->rc->score = prev->score;
            Q->rc->category = prev->category;
        }
        prev = prev->parent;
        if (prev == NULL) {
            return Q;
        } else if (movieID < prev->movieID) {
            if (prevF != NULL)
                prevF = prevF->lc;
            prev->lc = Q;
        } else {
            prevF = prev->lc;
            prev->rc = Q;
        }

        while (prevF) {
            pprevF = prevF;
            prevF = prevF->rc;
        }

    }


    return root;

}

void LO_print(struct user_movie *root) {
    struct user_movie *P = root;
    if (P == NULL) return;
    LO_print(P->lc);
    if (P->rc == NULL && P->lc == NULL)printf("\t<%d, %d>\n", P->movieID, P->score);
    LO_print(P->rc);

}

int watch_movie(int userID, int category, int movieID, int score) {
    struct movie *tmp = categoryArray[category]->movie;
    categoryArray[category]->sentinel->movieID = movieID;
    while (tmp->movieID != movieID) {
        if (movieID < tmp->movieID) {
            tmp = tmp->lc;
        } else {
            tmp = tmp->rc;
        }
    }
    categoryArray[category]->sentinel->movieID = -1;
    if (tmp != categoryArray[category]->sentinel) {
        tmp->watchedCounter = tmp->watchedCounter + 1;
        tmp->sumScore += score;
        struct user *tmpu = HT_Search2(userID);
        if (tmpu != NULL) {
            tmpu->history = LO_Insert(movieID, category, tmp->sumScore, tmpu->history);
            printf("W <%d> <%d> <%d> <%d>\n", userID, category, movieID, score);
            printf("History Tree of user <%d>:\n", userID);
            struct user_movie *head = tmpu->history;
            if (head != NULL) {
                LO_print(head);
            }
        }

    }
    printf("\nDONE\n\n");


    return 1;
}

/**
 * @brief Identify the best rating score movie and cluster all the movies of a category.
 *
 * @param userID The identifier of the user
 * @param score The minimum score of a movie
 *
 * @return 1 on success
 *         0 on failure
 */
void BST_LookUp(struct movie *root, int score) {
    if (root->movieID != -1) {
        BST_LookUp(root->lc, score);
        if (root->watchedCounter != 0) {
            if (root->sumScore / root->watchedCounter >= score) {
                numMovies++;
                F = realloc(F, numMovies * (sizeof (struct movie*)));
                F[numMovies - 1] = root;

            }
        }
        BST_LookUp(root->rc, score);
    }
}

int filter_movies(int userID, int score) {

    for (int i = 0; i < 6; i++) {
        struct movie *tmp = categoryArray[i]->movie;
        BST_LookUp(tmp, score);
    }
    printf("F <%d> <%d>\n\t", userID, score);
    for (int i = 0; i < numMovies; i++) {
        struct movie *temp = F[i];
        float avg = (float) temp->sumScore / (float) temp->watchedCounter;
        printf("<%d, %.2f>, ", temp->movieID, avg);
    }
    printf("\nDONE\n\n");
    numMovies = 0;

    return 1;
}

/**
 * @brief Find movies from categories withn median_score >= score t
 *
 * @param userID The identifier of the user
 * @param category Array with the categories to search.
 * @param score The minimum score the movies we want to have
 *
 * @return 1 on success
 *         0 on failure
 */

int user_stats(int userID) {
    struct user *tmpu = HT_Search2(userID);
    if (tmpu != NULL) {

    }
    printf("\nDONE\n\n");

    return 1;
}

/**
 * @brief Search for a movie with identification movieID in a specific category.
 *
 * @param movieID The identifier of the movie
 * @param category The category of the movie
 *
 * @return 1 on success
 *         0 on failure
 */

int search_movie(int movieID, int category) {
    struct movie *tmp = categoryArray[category]->movie;
    categoryArray[category]->sentinel->movieID = movieID;
    while (tmp->movieID != movieID) {
        if (movieID < tmp->movieID) {
            tmp = tmp->lc;
        } else {
            tmp = tmp->rc;
        }
    }
    categoryArray[category]->sentinel->movieID = -1;
    if (tmp != categoryArray[category]->sentinel) {
        printf("I <%d> <%d> <%d>\n", movieID, category, tmp->year);
    }
    printf("\nDONE\n\n");
    return 1;
}

/**
 * @brief Prints the movies in movies categories array.
 * @return 1 on success
 *         0 on failure
 */

int print_movies(void) {
    printf("M\nMovie Category Array:\n");
    for (int i = 0; i < 6; i++) {
        struct movie *tmp = categoryArray[i]->movie;
        struct movie *sentinel = categoryArray[i]->sentinel;
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
        print_m(tmp, sentinel);
        printf("\n");
    }
    printf("\nDONE\n\n");
    return 1;
}

/**
 * @brief Prints the users hashtable.
 * @return 1 on success
 *         0 on failure
 */

int print_users(void) {
    struct user *temp = NULL;
    struct user_movie *tmp = NULL;
    for (int i = 0; i < hashtable_size; i++) {
        temp = user_hashtable_p[i];
        printf("Chain <%d> of Users:\n", i);
        while (temp != NULL) {
            tmp = temp->history;
            printf("User:<%d>\n", temp->userID);
            printf("\tHistory Tree:\n");
            if (tmp != NULL) {
                LO_print(tmp);
            }
            temp = temp->next;
        }
    }
    printf("\nDONE\n\n");
    return 1;
}

