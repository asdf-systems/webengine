package main

import (
	"os"
	"io/ioutil"
	"json"
	"bytes"
)

func main() {
	out := bytes.NewBufferString("")
	data, _ := ioutil.ReadAll(os.Stdin)
	json.Indent(out, data, "", "  ")
	os.Stdout.Write(out.Bytes())

}
