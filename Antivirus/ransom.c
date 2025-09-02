#include <ctype.h>
#include <curl/curl.h>
#include <dirent.h>
#include <math.h>
#include <openssl/evp.h>
#include <openssl/md5.h>
#include <openssl/sha.h>
#include <regex.h>
#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <sys/inotify.h>
#include <sys/stat.h>
#include <sys/types.h>
#include <time.h>
#include <unistd.h>

#define MD5_INF "85578cd4404c6d586cd0ae1b36c98aca"
#define SHA_INF                                                                \
  "d56d67f2c43411d966525b3250bfaa1a85db34bf371468df1b6a9882fee78849"
#define BITCOIN "bc1qa5wkgaew2dkv56kfvj49j0av5nml45x9ek9hz6"
#define REGEXP                                                                 \
  "((http|https)://)?([a-zA-Z0-9]([a-zA-Z0-9-]*[a-zA-Z0-9])?\\.)+com"
#define BUF_SIZE 1024

#define MD5_CHECK 1
#define SHA_CHECK 2
#define BTC_CHECK 3
#define VIRUS_CHECK 4

#define TRUE 1
#define FALSE 0

char VIRUS[] = {0x98, 0x1d, 0x00, 0x00, 0xec, 0x33, 0xff, 0xff,
                0xfb, 0x06, 0x00, 0x00, 0x00, 0x46, 0x0e, 0x10};

typedef struct logs {
  char buff[1024];
  int modified;
  struct logs *next;
} Logs;

typedef struct Node {
  char domain[256];
  char path[256];
  char file[256];
  int malicious;
  int exec;
  struct Node *next;
} Node;

Node *node_head = NULL;

struct board {
  double member;
  double share;
  struct board *next;
};

struct board *board_head = NULL;
struct board *args_head = NULL;

char *localTime(void) {
  char *ctime_no_newline;
  time_t tm = time(NULL);

  ctime_no_newline = strtok(ctime(&tm), "\n");
  return ctime_no_newline;
}

////////////////////////////////////////////////////////////////////////////////
//    Generic functions                                                       //
////////////////////////////////////////////////////////////////////////////////

static void vp_log(char *format, ...) __attribute__((format(printf, 1, 2)));
static void vp_log(char *format, ...) {
  char temp[200];
  va_list va;
  va_start(va, format);
  vsprintf(temp, format, va);
  va_end(va);
  printf("[INFO] [9046] [%s] %s\n", localTime(), temp);
}

int is_exec(char *filename) {
  if (strstr(filename, ".exe") || strstr(filename, ".sh")) {
    return TRUE;
  } else {
    return FALSE;
  }
}

// Count files in a directory - inluding subdirectories

void count_files(const char *path, int *file_counter) {
  DIR *dir;
  struct dirent *entry;
  struct stat statbuf;

  dir = opendir(path);
  if (dir == NULL) {
    perror("Unable to open directory");
    return;
  }

  while ((entry = readdir(dir)) != NULL) {
    // Ignore "." and ".." entries
    if (strcmp(entry->d_name, ".") == 0 || strcmp(entry->d_name, "..") == 0) {
      continue;
    }

    char full_path[1024];
    snprintf(full_path, sizeof(full_path), "%s/%s", path, entry->d_name);

    if (stat(full_path, &statbuf) == -1) {
      perror("Unable to get file status");
      continue;
    }

    // Check if it's a regular file
    if (S_ISREG(statbuf.st_mode))
      (*file_counter)++;
    else if (S_ISDIR(statbuf.st_mode))
      count_files(full_path, file_counter);
  }
}

////////////////////////////////////////////////////////////////////////////////
//   Q1                                                                       //
//   Check for md5, sha256, bitcoin, virus                                    //
////////////////////////////////////////////////////////////////////////////////

//
//   Virus check
//   Looking inside the file for the exact virus signature
//

long virus_check(char *filename, char *pattern) {
  FILE *file;
  size_t pattern_len = strlen(pattern);
  char buffer[1024];
  size_t read_bytes;
  long offset = 0;

  file = fopen(filename, "rb");
  if (file == NULL) {
    perror("Error opening file");
    return -1;
  }

  while ((read_bytes = fread(buffer, 1, sizeof(buffer), file)) > 0) {
    for (size_t i = 0; i < read_bytes - pattern_len + 1; ++i) {
      if (memcmp(buffer + i, pattern, pattern_len) == 0) {
        fclose(file);
        return offset + i;
      }
    }

    offset += read_bytes;
  }

  fclose(file);
  return -1;
}

//
//   Bitcoin signature check
//   Looking inside the file for the exact Bitcoin signature
//

int bitcoin_signatured(const char *filepath) {
  FILE *file = fopen(filepath, "rb");
  if (!file) {
    printf("filename %s\n", filepath);
    perror("Error opening file");
    return FALSE;
  }

  char buffer[1024];
  while (fread(buffer, 1, sizeof(buffer), file) > 0) {
    if (strstr(buffer, BITCOIN) != NULL) {
      return TRUE;
    }
  }

  fclose(file);
  return FALSE;
}

//
//   Calculate md5/sha256 signature based on choice argument
//

void calculate_signature(const char *filename, unsigned char *digest,
                         int choice) {
  FILE *file = fopen(filename, "rb");
  if (!file) {
    perror("Error opening file");
    return;
  }

  EVP_MD_CTX *ctx = EVP_MD_CTX_new();
  if (!ctx) {
    perror("Error creating EVP_MD_CTX");
    fclose(file);
    return;
  }

  EVP_MD_CTX_init(ctx);

  if (choice == MD5_CHECK)
    EVP_DigestInit(ctx, EVP_md5());
  if (choice == SHA_CHECK)
    EVP_DigestInit(ctx, EVP_sha256());

  unsigned char buf[BUF_SIZE];
  size_t len;
  while ((len = fread(buf, 1, sizeof(buf), file)) > 0)
    EVP_DigestUpdate(ctx, buf, len);

  EVP_DigestFinal(ctx, digest, NULL);

  EVP_MD_CTX_free(ctx);
  fclose(file);
}

//
//   Log infected files
//   Concat at the end of the filepath the type of the infection
//

void log_infected(Logs **head, char const *filepath, int choice) {
  Logs *new_log = (Logs *)malloc(sizeof(Logs));
  strcpy(new_log->buff, filepath);

  switch (choice) {
  case 1:
    strcat(new_log->buff, ":INFECTED_MD5_HASH");
    break;
  case 2:
    strcat(new_log->buff, ":INFECTED_SHA256_HASH");
    break;
  case 3:
    strcat(new_log->buff, ":INFECTED_BTC_HASH");
    break;
  case 4:
    strcat(new_log->buff, ":INFECTED_VIRUS");
    break;
  default:
    break;
  }

  new_log->next = *head;
  *head = new_log;
}

//
//   Check md5/sha256 infection
//   Return FALSE they are, TRUE if the are not infected
//

int check_infected(char const *output, int choice) {
  if (choice == MD5_CHECK) {
    if (strcmp(output, MD5_INF) == 0) {
      return FALSE;
    }
  } else if (choice == SHA_CHECK) {
    if (strcmp(output, SHA_INF) == 0) {
      return FALSE;
    }
  }

  return TRUE;
}

void scan_directory(Logs **head, const char *dir_path, int *infected) {
  DIR *dir = opendir(dir_path);
  struct stat statbuf;

  if (dir == NULL) {
    perror("Error opening directory");
    return;
  }

  char full_path[1024];
  char output_md5[1024];
  char output_sha256[1024];
  struct dirent *entry;
  while ((entry = readdir(dir)) != NULL) {
    snprintf(full_path, sizeof(full_path), "%s/%s", dir_path, entry->d_name);

    if (stat(full_path, &statbuf) == -1) {
      perror("Unable to get file status");
      continue;
    }

    if (S_ISREG(statbuf.st_mode)) {
      unsigned char md5_digest[MD5_DIGEST_LENGTH];
      calculate_signature(full_path, md5_digest, MD5_CHECK);

      for (int i = 0; i < MD5_DIGEST_LENGTH; i++) {
        sprintf(output_md5 + i * 2, "%02x", md5_digest[i]);
      }

      unsigned char sha256_digest[SHA256_DIGEST_LENGTH];
      calculate_signature(full_path, sha256_digest, SHA_CHECK);
      for (int i = 0; i < SHA256_DIGEST_LENGTH; i++) {
        sprintf(output_sha256 + i * 2, "%02x", sha256_digest[i]);
      }

      // Bitcoin check
      if (bitcoin_signatured(full_path)) {
        log_infected(head, full_path, BTC_CHECK);
        (*infected)++;
      }

      if (virus_check(full_path, VIRUS) != -1) {
        log_infected(head, full_path, VIRUS_CHECK);
        (*infected)++;
      }

      if (!check_infected(output_md5, MD5_CHECK)) {
        log_infected(head, full_path, MD5_CHECK);
        (*infected)++;
      }

      if (!check_infected(output_sha256, SHA_CHECK)) {
        log_infected(head, full_path, SHA_CHECK);
        (*infected)++;
      }
    } else if (S_ISDIR(statbuf.st_mode)) {
      if (strcmp(entry->d_name, ".") != 0 && strcmp(entry->d_name, "..") != 0 &&
          strcmp(entry->d_name, ".git") != 0 &&
          strcmp(entry->d_name, ".vscode") != 0 &&
          strcmp(entry->d_name, "build") != 0 &&
          strcmp(entry->d_name, ".gitignore") != 0) {
        // Recurse into subdirectory
        scan_directory(head, full_path, infected);
      }
    }
  }

  closedir(dir);
}

////////////////////////////////////////////////////////////////////////////////
//   Q3                                                                       //
//   Monitor directory for file changes                                       //
////////////////////////////////////////////////////////////////////////////////

void check_for_virus(Logs **head_virus, const char *full_path,
                     const char *filename) {
  struct logs *tmp_virus = *head_virus;

  while (tmp_virus != NULL) {
    if (strcmp(filename, tmp_virus->buff) == 0) {
      tmp_virus->modified = 1;
      break;
    }

    tmp_virus = tmp_virus->next;
  }
}

void save_new_file_to_list(Logs **head_files, Logs **head_virus,
                           const char *filename) {
  Logs *new_virus = (Logs *)malloc(sizeof(Logs));
  Logs *new_file = (Logs *)malloc(sizeof(Logs));
  Logs *tmp_files = *head_files;

  while (tmp_files != NULL && strcmp(tmp_files->buff, filename)) {
    tmp_files = tmp_files->next;
  }

  if (tmp_files == NULL && !strstr(filename, ".locked")) {
    strcpy(new_file->buff, filename);
    new_file->next = *head_files;
    *head_files = new_file;
  } else if (tmp_files == NULL && strstr(filename, ".locked")) {
    char temp[60];
    int len = strlen(filename);
    strncpy(temp, filename, len - 7);
    temp[len - 7] = '\0';

    tmp_files = *head_files;
    while (tmp_files != NULL && strcmp(tmp_files->buff, temp)) {
      tmp_files = tmp_files->next;
    }

    if (tmp_files != NULL) {
      strcpy(new_virus->buff, filename);
      new_virus->modified = 0;
      new_virus->next = *head_virus;
      *head_virus = new_virus;
    }
  }
}

void del_locked(Logs **head_virus, const char *filename) {
  Logs *tmp_virus = *head_virus;
  Logs *prev_virus = NULL;
  while (tmp_virus != NULL && strcmp(tmp_virus->buff, filename)) {
    prev_virus = tmp_virus;
    tmp_virus = tmp_virus->next;
  }

  if (tmp_virus != NULL) {
    if (prev_virus == NULL) {
      *head_virus = tmp_virus->next;
    } else {
      prev_virus->next = tmp_virus->next;
    }

    free(tmp_virus);
  }
}

void del_unlocked(Logs **head_files, Logs *head_virus, const char *filename) {
  Logs *tmp_files = *head_files;
  Logs *tmp_virus = head_virus;
  Logs *prev_files = NULL;
  Logs *prev_virus = NULL;

  while (tmp_files != NULL && strcmp(tmp_files->buff, filename)) {
    prev_files = tmp_files;
    tmp_files = tmp_files->next;
  }

  while (tmp_virus != NULL && !strstr(tmp_virus->buff, tmp_files->buff)) {
    tmp_virus = tmp_virus->next;
  }

  if (tmp_virus != NULL && tmp_virus->modified == 1) {
    if (tmp_files != NULL) {
      if (prev_files == NULL) {
        *head_files = tmp_files->next;
      } else {
        prev_files->next = tmp_files->next;
      }

      free(tmp_files);
    }
    printf("[WARN] Ransomware attack detected on file %s\n", filename);
  } else {
    if (tmp_files != NULL) {
      if (prev_files == NULL) {
        *head_files = tmp_files->next;
      } else {
        prev_files->next = tmp_files->next;
      }

      free(tmp_files);
    }
  }
}

void monitor_directory(const char *full_path) {
  Logs *head = NULL;
  Logs *head_files = NULL;
  Logs *head_virus = NULL;

  int fd = inotify_init();
  if (fd < 0) {
    perror("inotify_init");
  }

  int wd = inotify_add_watch(fd, full_path, IN_ALL_EVENTS);
  if (wd < 0) {
    perror("inotify_add_watch");
  }

  char buffer[1024];
  while (1) {

    ssize_t len = read(fd, buffer, sizeof(buffer) - 1);
    if (len < 0) {
      perror("read");
      break;
    }

    const struct inotify_event *event = (const struct inotify_event *)buffer;
    while (len > 0) {
      if (event->mask & IN_OPEN) {
        vp_log("File %s was opened", event->name);
      }
      if (event->mask & IN_CREATE) {
        vp_log("File %s was created", event->name);

        save_new_file_to_list(&head_files, &head_virus, event->name);
      }
      if (event->mask & IN_MODIFY) {
        vp_log("File %s was modified", event->name);
        check_for_virus(&head_virus, full_path, event->name);
      }
      if (event->mask & IN_DELETE) {
        vp_log("File %s was deleted from watched directory", event->name);
        if (strstr(event->name, ".locked"))
          del_locked(&head_files, event->name);
        else
          del_unlocked(&head_files, head_virus, event->name);
      }
      if (event->mask & IN_ACCESS) {
        vp_log("File %s was accessed", event->name);
      }
      if (event->mask & IN_CLOSE_WRITE) {
        vp_log("File %s that was opened for writing was closed", event->name);
      }

      len -= sizeof(struct inotify_event) + event->len;
      event = (const struct inotify_event *)((const char *)event +
                                             sizeof(struct inotify_event) +
                                             event->len);
    }

    usleep(500);
  }

  inotify_rm_watch(fd, wd);
  close(fd);
}

////////////////////////////////////////////////////////////////////////////////
//   Q4                                                                       //
//   Polynomial interpolation and Cramer's rule                               //
////////////////////////////////////////////////////////////////////////////////

int polynomial(int a1, int a2, int a0, int x) {
  return a2 * x * x + a1 * x + a0;
}

//
// Calculate determinant of a matrix
//

double determinant(double **matrix, int n) {
  double det = 0.0;
  if (n == 1)
    return matrix[0][0];

  double **submatrix = (double **)malloc((n - 1) * sizeof(double *));
  for (int i = 0; i < n - 1; i++)
    submatrix[i] = (double *)malloc((n - 1) * sizeof(double));

  if (n == 2)
    return ((matrix[0][0] * matrix[1][1]) - (matrix[1][0] * matrix[0][1]));

  else {
    for (int x = 0; x < n; x++) {
      int subi = 0;
      for (int i = 1; i < n; i++) {
        int subj = 0;
        for (int j = 0; j < n; j++) {
          if (j == x)
            continue;
          submatrix[subi][subj] = matrix[i][j];
          subj++;
        }
        subi++;
      }
      det = det + (pow(-1, x) * matrix[0][x] * determinant(submatrix, n - 1));
    }
  }
  return det;
}

//
// Function to solve the system of linear equations using Cramer's rule
//

void cramer(double coeffs[], double constants[], int n) {
  double **matrix = (double **)malloc(n * sizeof(double *));
  for (int i = 0; i < n; i++)
    matrix[i] = (double *)malloc(n * sizeof(double));

  // Constructing the coefficient matrix
  for (int i = 0; i < n; i++)
    for (int j = 0; j < n; j++)
      matrix[i][j] = coeffs[i * n + j];

  // Calculating the determinant of the coefficient matrix
  double det = determinant(matrix, n);

  // Checking if the system of equations is solvable
  if (det == 0) {
    printf("The system of equations is not solvable.\n");
    return;
  }

  // Calculating the solutions using Cramer's rule
  double *solutions = (double *)malloc(n * sizeof(double));
  for (int i = 0; i < n; i++) {
    double **temp = (double **)malloc(n * sizeof(double *));
    for (int j = 0; j < n; j++)
      temp[j] = (double *)malloc(n * sizeof(double));

    for (int j = 0; j < n; j++) {
      for (int k = 0; k < n; k++) {
        if (k == i)
          temp[j][k] = constants[j];
        else
          temp[j][k] = matrix[j][k];
      }
    }
    solutions[i] = determinant(temp, n) / det;
  }

  vp_log("Computed that a=%.2f and b=%.2f", solutions[n - 2], solutions[n - 3]);
  vp_log("Encryption key is: %.2f", solutions[n - 1]);
}

//
// Calculate coefficients of the polynomial using the given points
//

void calculateCoefficients(struct board *points, int n) {
  double *coeffs = (double *)malloc(n * n * sizeof(double));
  double *constants = (double *)malloc(n * sizeof(double));

  // Set up the system of equations
  for (int i = 0; i < n; i++) {
    for (int j = 0; j < n; j++) {
      coeffs[i * n + j] = pow(points[i].member, n - j - 1);
    }

    constants[i] = points[i].share;
  }

  // Solve the system of equations using Cramer's rule
  cramer(coeffs, constants, n);
}

////////////////////////////////////////////////////////////////////////////////
//   Q2                                                                       //
//   Extract domain names from files                                          //
////////////////////////////////////////////////////////////////////////////////

size_t write_callback(void *contents, size_t size, size_t nmemb, void *userp) {
  size_t realsize = size * nmemb;
  char **buffer_ptr = (char **)userp;
  *buffer_ptr = realloc(*buffer_ptr, realsize + 1);
  if (*buffer_ptr == NULL)
    return 0; /* out of memory! */

  memcpy(*buffer_ptr, contents, realsize);
  (*buffer_ptr)[realsize] = '\0';

  return realsize;
}

void sendGetRequest(char *domain, int *malicious) {
  CURL *curl;
  CURLcode res;
  char *readBuffer = NULL;

  curl_global_init(CURL_GLOBAL_DEFAULT);
  curl = curl_easy_init();
  if (curl) {
    char url[512];
    sprintf(url, "https://1.1.1.3/dns-query?name=%s", domain);

    struct curl_slist *headers = NULL;
    headers = curl_slist_append(headers, "accept: application/dns-json");

    curl_easy_setopt(curl, CURLOPT_HTTPHEADER, headers);
    curl_easy_setopt(curl, CURLOPT_URL, url);
    curl_easy_setopt(curl, CURLOPT_WRITEFUNCTION, write_callback);
    curl_easy_setopt(curl, CURLOPT_WRITEDATA, &readBuffer);

    res = curl_easy_perform(curl);
    if (res != CURLE_OK)
      fprintf(stderr, "curl_easy_perform() failed: %s\n",
              curl_easy_strerror(res));

    curl_easy_cleanup(curl);
    curl_slist_free_all(headers);

    // printf ( "%s", readBuffer);
    char *com = "Comment";
    char *comment_start = strstr(readBuffer, com);
    if (comment_start) {
      comment_start += strlen("\"Comment\":\"");
      char *comment_end = strchr(comment_start, '\"');
      if (comment_end) {
        *comment_end = '\0';
        *malicious = 1;
      }
    }

    free(readBuffer);
  }
}

// Function to print the domain names in the linked list
void send_cloudflare_requests(Node *head) {
  Node *current = head;
  while (current != NULL) {
    // Send a GET request for the domain
    sendGetRequest(current->domain, &current->malicious);
    current = current->next;
  }
}

void check_file_for_domain(char *full_path, char *dir_path, char *file_name) {
  Node *head = NULL;

  FILE *file = fopen(full_path, "r");
  if (file == NULL) {
    perror("Unable to open file");
    return;
  }

  char *line = NULL;
  size_t len = 0;
  ssize_t read;

  regex_t regex;
  int reti;
  char msgbuf[100];

  // Compile regular expression
  reti = regcomp(&regex, REGEXP, REG_EXTENDED);
  if (reti) {
    fprintf(stderr, "Could not compile regex\n");
    return;
  }

  // Execute regular expression
  while ((read = getline(&line, &len, file)) != -1) {
    regmatch_t pmatch[1];
    reti = regexec(&regex, line, 1, pmatch, 0);
    if (!reti) {
      char domain[256];
      strncpy(domain, line + pmatch[0].rm_so,
              pmatch[0].rm_eo - pmatch[0].rm_so);
      domain[pmatch[0].rm_eo - pmatch[0].rm_so] = '\0';

      Node *node = (Node *)malloc(sizeof(Node));
      Node *tmp = node_head;
      while (tmp != NULL && strcmp(domain, tmp->domain) != 0) {
        tmp = tmp->next;
      }
      if (tmp == NULL) {
        strcpy(node->domain, domain);
        strcpy(node->path, dir_path);
        strcpy(node->file, file_name);
        node->malicious = 0;

        if (is_exec(file_name))
          node->exec = 1;
        else
          node->exec = 0;

        node->next = node_head;
        node_head = node;
      }

    } else if (reti == REG_NOMATCH) {
      continue;
    } else {
      regerror(reti, &regex, msgbuf, sizeof(msgbuf));
      fprintf(stderr, "Regex match failed: %s\n", msgbuf);
      return;
    }
  }

  send_cloudflare_requests(node_head);


  regfree(&regex);

  if (line)
    free(line);

  fclose(file);
}

void inspect_directory(char *dir_path, int *infected) {
  DIR *dir = opendir(dir_path);
  struct dirent *entry;
  struct stat statbuf;

  char full_path[1024];

  if (dir == NULL) {
    perror("Error opening directory");
    return;
  }

  while ((entry = readdir(dir)) != NULL) {
    // Ignore the entries "." and ".."
    if (strcmp(entry->d_name, ".") == 0 || strcmp(entry->d_name, "..") == 0)
      continue;

    snprintf(full_path, sizeof(full_path), "%s/%s", dir_path, entry->d_name);

    if (stat(full_path, &statbuf) == -1) {
      perror("Unable to get file status");
      continue;
    }

    // If the entry is a directory, call this function recursively
    if (S_ISDIR(statbuf.st_mode)) {
      inspect_directory(full_path, infected);
    } else if (S_ISREG(statbuf.st_mode)) {
      FILE *file = fopen(full_path, "r");
      if (file == NULL) {
        perror("Unable to open file");
        continue;
      }

      check_file_for_domain(full_path, dir_path, entry->d_name);

      fclose(file);
    }
  }

  closedir(dir);
}

////////////////////////////////////////////////////////////////////////////////
//    Main function                                                           //
////////////////////////////////////////////////////////////////////////////////

int main(int argc, char *argv[]) {
  int infected = 0, file_counter = 0;

  vp_log("Application Started");

  if (strcmp(argv[1], "scan") == 0) {
    Logs *head = NULL;
    vp_log("Scanning directory \n%s", argv[2]);

    count_files(argv[2], &file_counter);

    vp_log("Found %d files", file_counter);
    vp_log("Searching...");

    scan_directory(&head, argv[2], &infected);

    vp_log("Processed %d files. Found %d infected...", file_counter, infected);

    Logs *temp = head;
    while (temp != NULL) {
      printf("%s\n", temp->buff);
      temp = temp->next;
    }
  } else if (strcmp(argv[1], "monitor") == 0) {
    vp_log("Monitoring directory %s", argv[2]);
    vp_log("Waiting for events...");

    while (1) {
      monitor_directory(argv[2]);
    }
  } else if (strcmp(argv[1], "slice") == 0) {
    vp_log("Generating shares for key %d", atoi(argv[2]));
    srand(time(NULL));
    int num1 = rand() % 15 + 1;
    int num2 = rand() % 15 + 1;
    int key = atoi(argv[2]);
    int res;

    for (int i = 1; i <= 10; i++) {
      res = polynomial(num1, num2, key, i);
      printf("[%d, %d]\n", i, res);
    }

  } else if (strcmp(argv[1], "unlock") == 0) {
    if (argc < 5) {
      vp_log("Cannot reconstruct key.");
      return 1;
    } else {
      int count = 0;
      int numPoints = argc - 2;

      vp_log("Received %d different shares", numPoints);

      int degree = argc - 3;
      struct board *points = malloc(numPoints * sizeof(struct board));
      for (int i = 2; i < argc; i++) {

        char params[100];
        char *token;
        strcpy(params, argv[i]);

        // Remove leading '[' and trailing ']'
        memmove(params, params + 1, strlen(params) - 1);

        // Tokenize the string based on the delimiter ','
        token = strtok(params, ",");
        int num1 = atoi(token);
        token = strtok(NULL, ",");
        int num2 = atoi(token);

        points[i - 2].member = (double)num1;
        points[i - 2].share = (double)num2;
      }

      calculateCoefficients(points, numPoints);
      free(points);
    }
  } else if (strcmp(argv[1], "inspect") == 0) {
    vp_log("Scanning directory \n%s", argv[2]);
    count_files(argv[2], &file_counter);
    vp_log("Found %d files", file_counter);
    vp_log("Searching...");

    inspect_directory(argv[2], &infected);

    vp_log("Operation finished.");
    vp_log("Processed %d files.", file_counter);
    printf("| FILE\t\t\t\t\t| PATH\t\t\t\t\t\t\t\t\t\t| DOMAIN\t\t\t\t| "
           "EXECUTABLE\t| RESULT\t"
           "|\n================================================================"
           "==================================================================="
           "=========================================================="
           "====\n");
    Node *temp = node_head;
    char *tr = "True";
    char *fl = "False";
    char *mal = "Malware";
    char *sf = "Safe";
    while (temp) {
      printf("| %-37s | %-77s | %-37s ", temp->file, temp->path, temp->domain,
             temp->exec, temp->malicious);

      if (temp->exec == 1)
        printf("| %-14s", tr); else printf("| %-14s", fl);
      if (temp->malicious == 1)
        printf("|  %-11s  |\n", mal); else printf("|  %-11s  |\n", sf);
      temp = temp->next;
    }
  }

  return 0;
}