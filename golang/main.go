package main

import "github.com/vladbielievtsov/sneakers/app"

func main() {
	err := app.Start()
	if err != nil {
		panic(err)
	}
}
