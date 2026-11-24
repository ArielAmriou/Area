/*
** EPITECH PROJECT, 2026
** AreaProject
** File description:
** server.go
*/

package main

import (
    "fmt"
    "log"
    "net/http"
)

func main() {

    http.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
        fmt.Fprintf(w, "status : ok")
    })

    port := ":8080"
    log.Fatal(http.ListenAndServe(port, nil))
}
